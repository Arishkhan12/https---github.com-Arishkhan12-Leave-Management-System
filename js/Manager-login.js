document.getElementById("managerLoginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorText = document.getElementById("errorText");

  const managers = JSON.parse(localStorage.getItem("managers")) || [];

  const found = managers.find(m => m.email === email && m.password === password);

  if (found) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", "manager");
    localStorage.setItem("currentUser", JSON.stringify(found));
    window.location.href = "manager-dashboard.html";
  } else {
    errorText.textContent = "Invalid credentials. Please try again.";
  }
});

function togglePassword(el) {
  const passwordInput = document.getElementById("password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    el.innerHTML = '<i class="bi bi-eye-slash"></i>';
  } else {
    passwordInput.type = "password";
    el.innerHTML = '<i class="bi bi-eye"></i>';
  }
}
const dummyLeaves = [
  { name: "Ali", from: "2025-08-02", to: "2025-08-05", reason: "Medical", status: "pending" },
  { name: "Sara", from: "2025-08-03", to: "2025-08-07", reason: "Wedding", status: "pending" },
  { name: "Zain", from: "2025-07-29", to: "2025-08-01", reason: "Travel", status: "approved" }
];

const teamMembers = ["Ali", "Sara", "Zain", "Hamza"];

function renderDashboard() {
  const pending = dummyLeaves.filter(l => l.status === "pending");
  const approved = dummyLeaves.filter(l => l.status === "approved");

  document.getElementById("pendingCount").textContent = pending.length;
  document.getElementById("approvedCount").textContent = approved.length;
  document.getElementById("teamCount").textContent = teamMembers.length;

  const pendingTable = document.getElementById("pendingRequestsTable");
  const approvedTable = document.getElementById("approvedRequestsTable");

  pendingTable.innerHTML = "";
  approvedTable.innerHTML = "";

  pending.forEach((leave, index) => {
    const row = `
      <tr>
        <td>${leave.name}</td>
        <td>${leave.from}</td>
        <td>${leave.to}</td>
        <td>${leave.reason}</td>
        <td>
          <button class="btn btn-success btn-sm me-1" onclick="approve(${index})">Approve</button>
          <button class="btn btn-danger btn-sm" onclick="reject(${index})">Reject</button>
        </td>
      </tr>
    `;
    pendingTable.innerHTML += row;
  });

  approved.forEach(leave => {
    const row = `
      <tr>
        <td>${leave.name}</td>
        <td>${leave.from}</td>
        <td>${leave.to}</td>
        <td>${leave.reason}</td>
      </tr>
    `;
    approvedTable.innerHTML += row;
  });
}

function approve(index) {
  dummyLeaves[index].status = "approved";
  renderDashboard();
}

function reject(index) {
  dummyLeaves.splice(index, 1);
  renderDashboard();
}

function showNotifications() {
  alert("You have new pending leave requests!");
}

function logout() {
  localStorage.clear();
  window.location.href = "manager-login.html";
}

window.onload = renderDashboard;

