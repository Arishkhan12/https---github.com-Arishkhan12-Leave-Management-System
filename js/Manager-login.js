document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent page reload

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const messageDiv = document.getElementById("message");

  const savedUser = JSON.parse(localStorage.getItem("managerUser")); // or your saved user

  if (
    savedUser &&
    (username === savedUser.username || username === savedUser.email) &&
    password === savedUser.password
  ) {
    localStorage.setItem("isManagerLoggedIn", "true");
    window.location.href = "manager-dashboard.html";
  } else {
    messageDiv.innerHTML =
      '<div class="alert alert-danger mt-2">❌ Invalid username or password</div>';
  }
});
console.log("Manager-login.js loaded");
