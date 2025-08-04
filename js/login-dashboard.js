 
        // Simple interactivity
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const sidebar = document.querySelector('.sidebar');

        mobileMenuBtn?.addEventListener('click', () => {
            sidebar.style.transform = sidebar.style.transform === 'translateX(0px)' ? 'translateX(-100%)' : 'translateX(0px)';
        });

        // Form submission
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Leave request submitted successfully!');
        });

        // Quick action buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.textContent.trim();
                alert(`${action} clicked!`);
            });
        });

        function logout() {
            localStorage.removeItem("isEmployeeLoggedIn");
            window.location.href = "Employee-login.html";
}
// Get existing requests or initialize empty
let leaveRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];

// Render recent requests on load
function renderRequests() {
  const container = document.querySelector(".card-content .request-item")?.parentNode;
  if (!container) return;

  container.innerHTML = "";

  leaveRequests.slice().reverse().forEach(req => {
    container.innerHTML += `
      <div class="request-item">
        <div class="request-info">
          <h4>${req.type}</h4>
          <p>${req.start} - ${req.end}</p>
        </div>
        <span class="status-badge status-pending">Pending</span>
      </div>
    `;
  });

  // Update badge
  const badge = document.querySelector(".badge");
  if (badge) badge.textContent = leaveRequests.length;
}

// Handle form submit
document.querySelector("form")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const type = this.querySelector("select").value;
  const start = this.querySelector('input[type="date"]:first-of-type').value;
  const end = this.querySelector('input[type="date"]:last-of-type').value;
  const reason = this.querySelector("textarea").value;

  const newRequest = { type, start, end, reason, status: "pending" };
  leaveRequests.push(newRequest);
  localStorage.setItem("leaveRequests", JSON.stringify(leaveRequests));

  this.reset(); // clear form
  renderRequests();
});


    