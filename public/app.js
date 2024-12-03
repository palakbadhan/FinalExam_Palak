document.getElementById("package-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let name = document.getElementById("name").value;
    let id = document.getElementById("id").value;
    let address = document.getElementById("address").value;
    let weight = document.getElementById("weight").value;
  
    // Clear previous messages
    document.getElementById("success-message").style.display = "none";
    document.getElementById("error-message").style.display = "none";
  
    // Validate input
    if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
      displayError("Recipient Name must contain alphabetic characters only.");
      return;
    }
    
    if (!id || isNaN(id) || id.trim() === "") {
      displayError("Package ID must be a numeric value.");
      return;
    }
  
    if (!address || /\d/.test(address)) {
      displayError("Delivery Address should not contain numbers.");
      return;
    }
  
    if (!weight || isNaN(weight) || weight <= 0) {
      displayError("Weight must be a positive number.");
      return;
    }
  
    // Calculate Shipping Cost based on weight
    let shippingCost = calculateShippingCost(weight);
    document.getElementById("shipping-cost").value = `$${shippingCost.toFixed(2)}`;
  
    // If all validations pass, generate the tracking code and show success message
    let trackingCode = generateTrackingCode(Number(id), Number(weight));
    let package = { name, id, address, weight, trackingCode, shippingCost };
  
    // Add to package table
    addPackageToTable(package);
    
    // Display success message
    displaySuccess("Package added successfully! Tracking Code: " + trackingCode + " Shipping Cost:" + shippingCost);
});
  
function displayError(message) {
    let errorMessage = document.getElementById("error-message");
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}
  
function displaySuccess(message) {
    let successMessage = document.getElementById("success-message");
    successMessage.textContent = message;
    successMessage.style.display = "block";
}
  
function generateTrackingCode(packageId, weight) {
    return (packageId << 4 | weight).toString(2);
}
  
function addPackageToTable(package) {
    let table = document.getElementById("package-table");
  
    let row = table.insertRow();
    row.insertCell(0).textContent = package.name;
    row.insertCell(1).textContent = package.id;
    row.insertCell(2).textContent = package.address;
    row.insertCell(3).textContent = package.weight;
    row.insertCell(4).textContent = package.trackingCode;
    row.insertCell(5).textContent = `$${package.shippingCost.toFixed(2)}`;
}

function calculateShippingCost(weight) {
    // Simple shipping cost calculation (example: $5 per kg)
    let costPerKg = 5;
    return weight * costPerKg;
}
