function checkCode() {
    // Get the entered code
    var code = document.getElementById("code").value;

    // Load the list of valid codes from the JSON file
    fetch('valid_codes.json')
        .then(response => response.json())
        .then(data => {
            // Check if the entered code is valid
            if (data.codes.includes(code)) {
                // Save the code and the current date and time to the JSON file
                var loginData = {
                    code: code,
                    timestamp: new Date().toISOString()
                };
                fetch('https://anshsarkar2.github.io/S5AMP.github.io/login/login_data.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                })
                .then(() => {
                    // Redirect to the success page
                    window.location.href = 'https://anshsarkar2.github.io/S5AMP.github.io/index.html';
                })
                .catch(error => {
                    console.error('Error saving login data:', error);
                });
            } else {
                // Show an error message
                alert('Invalid code!');
            }
        });
}
