// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  // Hide results
  document.getElementById('results').style.display = 'none';
  // Show loader
  document.getElementById('loader').style.display = 'block';
  // Get results after 2 seconds
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results
function calculateResults(){
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  const results = document.querySelectorAll('#results input');

  // Turn into a float
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) /100 /12;
  const calculatedPayments = parseFloat(years.value)*12;
  // Compute monthly payment
  const x = Math.pow(1+calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  // Validation finite monthly
  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly*calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
    results.forEach(input=> {
      input.style.cssText = 'color:#00838f; font-size:120%';
      input.nextElementSibling.style.cssText = 'color:black; font-weight: bold';
    });
    // Show results
    document.getElementById('results').style.display = 'block';
    // Hide loader
    document.getElementById('loader').style.display = 'none';
  } else{
    // Hide results
    document.getElementById('results').style.display = 'none';
    // Hide loader
    document.getElementById('loader').style.display = 'none';
    // OPT-A: The easiest one
    Materialize.toast('Please check your numbers!', 3000, 'red');
    
    // OPT-B: Pure JS
    // showError('Please check your numbers');
  }
}

function showError(error){
  // Hide results
  document.getElementById('results').style.display = 'none';
  // Hide loader
  document.getElementById('loader').style.display = 'none';
  // Create a div
  const errorDiv = document.createElement('div');
  // Add class
  errorDiv.className = 'section red lighten-5 red-text';
  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // Get elements
  const cardContent =  document.querySelector('.card-content');
  const cardTitle =  document.querySelector('.card-title');
  // Insert error above card-title
  cardContent.insertBefore(errorDiv, cardTitle);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError(){
  document.querySelector('.section.red').remove();
}