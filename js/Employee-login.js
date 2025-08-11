
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


document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const usernameInput = document.getElementById("username").value.trim();
  const passwordInput = document.getElementById("password").value.trim();
  const messageDiv = document.getElementById("message");

  const savedUser = JSON.parse(localStorage.getItem("employeeUser"));

  if (
    savedUser &&
    (usernameInput === savedUser.username || usernameInput === savedUser.email) &&
    passwordInput === savedUser.password
  ) {
    
    localStorage.setItem("isEmployeeLoggedIn", "true");

    const loading = document.getElementById("loading");
    loading.innerHTML = `<div class="spinner-border text-light spinner-border-sm" role="status"></div>`;

    setTimeout(() => {
      window.location.href = "login-dashboard.html";
    }, 1000); 
  } else {
    messageDiv.innerHTML = `<div class="alert alert-danger mt-3">❌ Invalid username or password</div>`;
  }
});

