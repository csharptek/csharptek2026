import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'csharptek-admin-secret-change-in-prod'
const COOKIE = 'cst_admin_token'

export function signToken() {
  return jwt.sign({ admin: true }, SECRET, { expiresIn: '12h' })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET)
  } catch {
    return null
  }
}

export function getTokenFromReq(req) {
  const cookie = req.cookies?.[COOKIE]
  if (cookie) return cookie
  const auth = req.headers?.authorization
  if (auth?.startsWith('Bearer ')) return auth.slice(7)
  return null
}

export function isAuthenticated(req) {
  const token = getTokenFromReq(req)
  if (!token) return false
  return !!verifyToken(token)
}

export function setCookieHeader(token) {
  return `${COOKIE}=${token}; HttpOnly; Path=/; Max-Age=43200; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
}

export function clearCookieHeader() {
  return `${COOKIE}=; HttpOnly; Path=/; Max-Age=0`
}

export const COOKIE_NAME = COOKIE
