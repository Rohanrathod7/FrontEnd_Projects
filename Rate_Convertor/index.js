// Conversion factors
const conversions = {
  meterToFeet: 3.28084,
  feetToMeter: 0.3048,
  literToGallon: 0.264172,
  gallonToLiter: 3.78541,
  kgToPound: 2.20462,
  poundToKg: 0.453592,
};

function convert() {
  const valueInput = document.getElementById("valueInput");
  const resultsSection = document.getElementById("results");

  let inputValue = parseFloat(valueInput.value);

  // If input is empty or invalid, default to 0
  if (isNaN(inputValue)) {
    inputValue = 0;
  }

  // Round input to 2 decimal places
  inputValue = Math.round(inputValue * 100) / 100;

  // Calculate conversions with 2 decimal places
  const results = {
    metersToFeet: Math.round(inputValue * conversions.meterToFeet * 100) / 100,
    feetToMeters: Math.round(inputValue * conversions.feetToMeter * 100) / 100,
    litersToGallons:
      Math.round(inputValue * conversions.literToGallon * 100) / 100,
    gallonsToLiters:
      Math.round(inputValue * conversions.gallonToLiter * 100) / 100,
    kgToPounds: Math.round(inputValue * conversions.kgToPound * 100) / 100,
    poundsToKg: Math.round(inputValue * conversions.poundToKg * 100) / 100,
  };

  // Update the results display
  updateResults(resultsSection, results, inputValue);
}

function updateResults(resultsSection, results, inputValue) {
  const categories = resultsSection.querySelectorAll(".result-category");

  // Update Length
  const lengthResult = categories[0].querySelector(".category-result");
  lengthResult.textContent = `${inputValue} meters = ${results.metersToFeet} feet | ${inputValue} feet = ${results.feetToMeters} meters`;

  // Update Volume
  const volumeResult = categories[1].querySelector(".category-result");
  volumeResult.textContent = `${inputValue} liters = ${results.litersToGallons} gallons | ${inputValue} gallons = ${results.gallonsToLiters} liters`;

  // Update Mass
  const massResult = categories[2].querySelector(".category-result");
  massResult.textContent = `${inputValue} kilos = ${results.kgToPounds} pounds | ${inputValue} pounds = ${results.poundsToKg} kilos`;
}

function toggleTheme() {
  const converter = document.querySelector(".converter-container");
  converter.classList.toggle("dark");
}

// Initialize with default conversion
window.addEventListener("load", function () {
  convert();
});

// Auto-convert when input changes
document.getElementById("valueInput").addEventListener("input", convert);
