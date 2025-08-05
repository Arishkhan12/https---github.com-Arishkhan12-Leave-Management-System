// 🔒 Show/Hide Password Toggle
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.querySelector(".password-toggle");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
}

// 👔 Manager Login Logic (same style as employee login)
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const messageDiv = document.getElementById("message");

  const savedUser = JSON.parse(localStorage.getItem("managerUser"));

  if (
    savedUser &&
    (username === savedUser.username || username === savedUser.email) &&
    password === savedUser.password
  ) {
    localStorage.setItem("isManagerLoggedIn", "true");
    window.location.href = "manager-dashboard.html"; // 👈 Redirect to manager dashboard
  } else {
    messageDiv.innerHTML = `<div class="alert alert-danger mt-3">❌ Invalid username or password</div>`;
  }
});

