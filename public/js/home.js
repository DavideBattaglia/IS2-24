document.addEventListener('DOMContentLoaded', function() {
    // Check if token and username are present in localStorage
    var token = localStorage.getItem('token');
    var username = localStorage.getItem('username');
    var userInfoElement = document.getElementById('userInfo');

    // Check if both token and username are present
    if (token && username) {
        // Display user info in the userInfo div
        userInfoElement.innerHTML = '<p>Welcome, ' + username + '!</p><p>Your Token is: ' + token + '</p>';
        userInfoElement.classList.add('userLoggedIn'); // Add a class for styling purposes
    } else {
        // Display a message if token or username is not present
        userInfoElement.innerHTML = '<p>No user information found</p>';
    }
});
