// Listen for submit button
document.querySelector('#loan-form').addEventListener('submit', calculateResults);

// Calculate Results - Function 
function calculateResults(e) {
    // UI variables
    const amountUI = document.querySelector('#amount');
    const interestUI = document.querySelector('#interest');
    const yearsUI = document.querySelector('#years');

    const monthlyPaymentUI = document.querySelector('#monthly-payment');
    const totalPaymentUI = document.querySelector('#total-payment');
    const totalInterestUI = document.querySelector('#total-interest');


    const principal = parseFloat(amountUI.value);
    const calculatedInterest = parseFloat(interestUI.value) / 100 / 12;
    const calculatedPayments = parseFloat(yearsUI.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPaymentUI.value = monthly.toFixed(2);
        totalPaymentUI.value = (monthly * calculatedPayments).toFixed(2);
        totalInterestUI.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    } else {
        showError('Please check your input');
    }

    e.preventDefault();
}

// Show error - Function
function showError(message) {
    // Create a div
    const errorDiv = document.createElement('div');
    // Get elements (where we heve to insert div)
    const card = document.querySelector('.card');
    const heading = document.querySelector('h1.heading');
    
    // Add class
    errorDiv.className = 'alert alert-danger';
    // Add text node
    errorDiv.appendChild(document.createTextNode(message));
    
    // Insert error div
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 second
    setTimeout(clearError, 3000);
}

// Clear error - Function
function clearError() {
    document.querySelector('.alert, .alert-danger').remove();
    // document.querySelector('.card').removeChild(document.querySelector('.alert'));
}