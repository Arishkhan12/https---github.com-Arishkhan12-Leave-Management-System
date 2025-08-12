
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const sidebar = document.querySelector('.sidebar');

mobileMenuBtn?.addEventListener('click', () => {
    sidebar.style.transform = sidebar.style.transform === 'translateX(0px)' ? 'translateX(-100%)' : 'translateX(0px)';
});


function logout() {
    localStorage.removeItem("isEmployeeLoggedIn");
    window.location.href = "Emp-portal.html";
}

// ======== LOGIN FUNCTION ========
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
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
        if (loading) {
            loading.innerHTML = `<div class="spinner-border text-light spinner-border-sm" role="status"></div>`;
        }

    
        setTimeout(() => {
            window.location.href = "login-dashboard.html";
        }, 800);
    } else {
        messageDiv.innerHTML = `<div class="alert alert-danger mt-3">❌ Invalid username or password</div>`;
    }
});
