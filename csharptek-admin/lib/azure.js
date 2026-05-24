import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob'
import { getSettings } from './db'

export async function getAzureClient() {
  const settings = await getSettings(['azure_storage_account', 'azure_storage_key', 'azure_container_name'])
  const account = settings.azure_storage_account
  const key = settings.azure_storage_key
  const container = settings.azure_container_name || 'blog-images'

  if (!account || !key) throw new Error('Azure storage not configured. Go to Settings.')

  const cred = new StorageSharedKeyCredential(account, key)
  const client = new BlobServiceClient(`https://${account}.blob.core.windows.net`, cred)
  const containerClient = client.getContainerClient(container)
  await containerClient.createIfNotExists({ access: 'blob' })
  return { containerClient, account, container }
}

export async function uploadBlob(buffer, filename, mimeType) {
  const { containerClient, account, container } = await getAzureClient()
  const ext = filename.split('.').pop()
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const blockClient = containerClient.getBlockBlobClient(unique)
  await blockClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: mimeType }
  })
  return {
    filename: unique,
    originalName: filename,
    url: `https://${account}.blob.core.windows.net/${container}/${unique}`
  }
}

export async function deleteBlob(filename) {
  const { containerClient } = await getAzureClient()
  const blockClient = containerClient.getBlockBlobClient(filename)
  await blockClient.deleteIfExists()
}
