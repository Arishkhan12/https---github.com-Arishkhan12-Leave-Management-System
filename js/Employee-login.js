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

// Login logic
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const usernameInput = document.getElementById("username").value.trim();
  const passwordInput = document.getElementById("password").value.trim();
  const messageDiv = document.getElementById("message");

  // Get saved user from localStorage
  const savedUser = JSON.parse(localStorage.getItem("employeeUser"));

  // Validate user
  if (
    savedUser &&
    (usernameInput === savedUser.username || usernameInput === savedUser.email) &&
    passwordInput === savedUser.password
  ) {
    // Set login flag
    localStorage.setItem("isEmployeeLoggedIn", "true");

    // Optional loading animation
    const loading = document.getElementById("loading");
    loading.innerHTML = `<div class="spinner-border text-light spinner-border-sm" role="status"></div>`;

    setTimeout(() => {
      window.location.href = "login-dashboard.html";
    }, 1000); // 1 second delay for UX
  } else {
    messageDiv.innerHTML = `<div class="alert alert-danger mt-3">❌ Invalid username or password</div>`;
  }
});
