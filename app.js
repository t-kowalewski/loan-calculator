// Listen for submit button
document.querySelector('#loan-form').addEventListener('submit', function (e) {
    // Hide results (when you use calc once again)
    document.querySelector('.results').style.display = 'none';

    // Show Loader
    document.querySelector('.loader').style.display = 'block';

    // Set timer and start main func
    setTimeout(calculateResults, 2000);

    // Prevent default button beh.
    e.preventDefault();
});

// Calculate Results - Function 
function calculateResults() {
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

        // Hide loader
        document.querySelector('.loader').style.display = 'none';
        
        // Show results
        document.querySelector('.results').style.display = 'block';
    } else {
        showError('Please check your input');
    }
}

// Show error - Function
function showError(message) {
    // Hide loader
    document.querySelector('.loader').style.display = 'none'
    // Hide results
    document.querySelector('.results').style.display = 'none';


    // Create a div for alert
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

    // Clear error after 3 seconds
    setTimeout(clearError, 3500);
}

// Clear error - Function
function clearError() {
    document.querySelector('.alert, .alert-danger').remove();
    // document.querySelector('.card').removeChild(document.querySelector('.alert'));
}