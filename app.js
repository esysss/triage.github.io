document.getElementById('welcomeToDemo').addEventListener('click', function() {
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('Demographics-page').style.display = 'block';
});

document.getElementById('demoToSymp').addEventListener('click', function () {
    if (filled(1)) {
        document.getElementById('Demographics-page').style.display = 'none';
        document.getElementById('symptoms-exam-page').style.display = 'block';
    } else {
        alert("Please Fill Out All The Items");
    }
});

document.getElementById('demoTowelcome').addEventListener('click', function() {
    document.getElementById('welcome-page').style.display = 'block';
    document.getElementById('Demographics-page').style.display = 'none';
});

document.getElementById('sympToInvest').addEventListener('click', function () {
    if (filled(2)) {
        document.getElementById('symptoms-exam-page').style.display = 'none';
        document.getElementById('investigation-page').style.display = 'block';
    } else {
        alert("Please Fill Out All The Items");
    }
});

document.getElementById('sympToDemo').addEventListener('click', function() {
    document.getElementById('Demographics-page').style.display = 'block';
    document.getElementById('symptoms-exam-page').style.display = 'none';
});

document.getElementById('investToSymp').addEventListener('click', function() {
    document.getElementById('symptoms-exam-page').style.display = 'block';
    document.getElementById('investigation-page').style.display = 'none';
});

document.getElementById('head').addEventListener('change', function() {
    changer = document.getElementById('divInfraction').style.display;
    if (changer == 'none') {
        document.getElementById('divInfraction').style.display = 'block';
        document.getElementById('divHemorrhage').style.display = 'block';
    } else {
        document.getElementById('divInfraction').style.display = 'none';
        document.getElementById('divHemorrhage').style.display = 'none';
    }
});

document.getElementById('finish-button').addEventListener('click', function () {

    demographicsData = getInfo("patient-info-form");
    symptomsData = getInfo("symptoms-exam-form");
    investigationData = getInfo("investigation-imaging-form");
    
    const summaryContent = `
      <h3>Demographics and Past Medical History</h3>
      <p>Age: ${demographicsData.age}</p>
      <p>Gender: ${demographicsData.gender}</p>
      <p>Myocardial Infarction: ${demographicsData.Myocardial}</p>
      <p>Arrhythmia: ${demographicsData.Arrhythmia}</p>
      <p>Stroke or TIA: ${demographicsData.Stroke}</p>
      <p>HTN: ${demographicsData.HTN}</p>
      <p>DM: ${demographicsData.DM}</p>
      <p>Smoking: ${demographicsData.Smoking}</p>
      <p>Functional Status: ${demographicsData.Functional}</p>
      <p>Code Status: ${demographicsData.Status}</p>

      <h3>Symptoms and Exam</h3>
      <p>Date/Time: ${symptomsData['date-time']}</p>
      <p>Weakness: ${symptomsData.Weakness}</p>
      <p>Side of Weakness: ${symptomsData.Side}</p>
      <p>Aphasia: ${symptomsData.Aphasia}</p>
      <p>Facial Drool: ${symptomsData.Facial}</p>
      <p>Visual Symptoms: ${symptomsData.Visual}</p>
      <p>Days of Symptoms: ${symptomsData.Days}</p>
      <p>Resolution of Symptoms: ${symptomsData.Resolution}</p>

      <h3>Investigation and Imaging</h3>
      <p>CTA-Carotid: ${investigationData.Carotid}</p>
      <p>CT-Head: ${investigationData.Head}</p>
      <p>Infraction: ${investigationData.Infraction}</p>
      <p>Hemorrhage: ${investigationData.Hemorrhage}</p>
      <p>ECG Atrial Fibrillation: ${investigationData.ECG}</p>
    `;

    document.getElementById('summary-content').innerHTML = summaryContent;

    document.getElementById('investigation-page').style.display = 'none';
    document.getElementById('summary-page').style.display = 'block';

    // Additional processing and triage logic here
});

function getInfo(path) {
    const form = document.getElementById(path);
    const formData = new FormData(form);
    const patientInfo = {};
  
    formData.forEach((value, key) => {
      // If the key already exists, it's a group of radio buttons, append the value to an array
      if (patientInfo[key]) {
        if (!Array.isArray(patientInfo[key])) {
          patientInfo[key] = [patientInfo[key]];
        }
        patientInfo[key].push(value);
      } else {
        patientInfo[key] = value;
      }
    });
  
    // Display the collected information
    // alert(JSON.stringify(patientInfo, null, 2));
  
    // You can also process this information as needed
    return patientInfo;
  }
  
  
function filled(formNumber) {
    if (formNumber === 1) {
        temp = getInfo("patient-info-form");
        if (Object.keys(temp).length != 10 || temp['age'] == '') {
            return false;
        }
    } else if (formNumber === 2) {
        temp = getInfo("symptoms-exam-form");
        if (Object.keys(temp).length != 8 || temp["date-time"] == '' || temp['Days'] == '') {
            return false;
        }
    } else if (formNumber === 3) {
        temp = getInfo("investigation-imaging-form");
    }
    return true
}
  
