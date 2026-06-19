const fs = require('fs');

async function testJob(jobId) {
  try {
    // Write a temp file for testing
    fs.writeFileSync('temp.pdf', 'dummy pdf content');
    const fileBuffer = fs.readFileSync('temp.pdf');
    const fileBlob = new Blob([fileBuffer], { type: 'application/pdf' });
    const formData = new FormData();
    formData.append('FormFile', fileBlob, 'temp.pdf');
    formData.append('Firstname', 'Raja');
    formData.append('Lastname', 'Kumar');
    formData.append('Email', '200305105193@paruluniversity.ac.in');
    formData.append('Number', '1234567890');
    formData.append('CurrentLocation', 'Ranchi');
    formData.append('City', 'Daltonganj');
    formData.append('State', 'Please Select');
    formData.append('Country', 'India');
    formData.append('JobId', jobId);
    formData.append('AppliedFor', 'Software Engineer');
    formData.append('ExperienceYears', '0');
    formData.append('ExperienceMonths', '0');
    formData.append('WillingToWorkInRanchi', 'true');
    formData.append('TotalExperienceYears', '0');
    formData.append('StatusOfWorking', 'Not Currently Working');
    formData.append('CoverNote', 'Testing cover note');
    formData.append('HighestQualification', 'B.Tech / B.E.');
    formData.append('CurrentCtc', '0');
    formData.append('ExpectedCtc', '0');
    formData.append('NoticePeriod', 'Immediate');
    formData.append('LinkedInUrl', '');

    console.log(`Testing JobId "${jobId}"...`);
    const res = await fetch('https://interviewschedulerprodapi.azurewebsites.net/api/Career/apply', {
      method: 'POST',
      headers: { 'accept': '*/*' },
      body: formData
    });

    console.log(`JobId ${jobId} -> Status: ${res.status} ${res.statusText}`);
    const text = await res.text();
    console.log('Response:', text);
  } catch (err) {
    console.error(`Error testing JobId ${jobId}:`, err);
  }
}

async function run() {
  await testJob('16');
  await testJob('0');
  await testJob('9999');
  
  // Cleanup
  try { fs.unlinkSync('temp.pdf'); } catch(e){}
}

run();
