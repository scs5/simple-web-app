// === Setup ===
let uploadedData = null;

const fileInput = document.getElementById('csvFileInput');
const processButton = document.getElementById('processButton');

fileInput.addEventListener('change', handleFileUpload);
processButton.addEventListener('click', handleProcessAndDownload);

// === Handlers ===
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    uploadedData = parseCSV(text);
    console.log('CSV Loaded:', uploadedData);
  };
  reader.readAsText(file);
}

function handleProcessAndDownload() {
  if (!uploadedData) {
    alert('Please upload a CSV file first.');
    return;
  }

  const newData = uploadedData; // TODO: Add processing logic here later
  const csvString = convertToCSV(newData);
  triggerDownload(csvString, 'processed.csv');
}

// === Utilities ===
function parseCSV(csvText) {
  return csvText.split('\n').map(row => row.split(','));
}

function convertToCSV(data) {
  return data.map(row => row.join(',')).join('\n');
}

function triggerDownload(csvString, filename) {
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  console.log(`File "${filename}" downloaded.`);
}
