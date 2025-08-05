

        // Check if user is logged in
        document.addEventListener('DOMContentLoaded', function() {
            const sessionData = JSON.parse(localStorage.getItem('employeeSession') || '{}');
            
            if (!sessionData.userId) {
                window.location.href = 'index.html';
                return;
            }

            // Update user info
            document.getElementById('username').textContent = sessionData.userId;
            document.getElementById('welcomeUser').textContent = sessionData.userId;
        });

        // Approve request function
        function approveRequest(button) {
            const request = button.closest('.leave-request');
            const employeeName = request.querySelector('.employee-name').textContent;
            
            if (confirm(`Approve leave request for ${employeeName}?`)) {
                request.style.background = '#e8f5e8';
                request.style.border = '1px solid #51cf66';
                button.textContent = 'Approved';
                button.className = 'action-btn approve-btn';
                button.disabled = true;
                
                // Hide other action buttons
                const actions = request.querySelectorAll('.action-btn:not(.approve-btn)');
                actions.forEach(btn => btn.style.display = 'none');
                
                // Update counter
                updatePendingCounter(-1);
                updateApprovedCounter(+1);
                
                showNotification('Leave request approved successfully!', 'success');
            }
        }

        // Reject request function
        function rejectRequest(button) {
            const request = button.closest('.leave-request');
            const employeeName = request.querySelector('.employee-name').textContent;
            
            if (confirm(`Reject leave request for ${employeeName}?`)) {
                request.style.background = '#ffe8e8';
                request.style.border = '1px solid #ff6b6b';
                button.textContent = 'Rejected';
                button.className = 'action-btn reject-btn';
                button.disabled = true;
                
                // Hide other action buttons
                const actions = request.querySelectorAll('.action-btn:not(.reject-btn)');
                actions.forEach(btn => btn.style.display = 'none');
                
                // Update counter
                updatePendingCounter(-1);
                
                showNotification('Leave request rejected.', 'error');
            }
        }

        // Update counters
        function updatePendingCounter(change) {
            const counter = document.querySelector('.stat-card.pending .stat-number');
            const badge = document.querySelector('.section-badge');
            const currentCount = parseInt(counter.textContent);
            const newCount = Math.max(0, currentCount + change);
            counter.textContent = newCount;
            badge.textContent = newCount;
        }

        function updateApprovedCounter(change) {
            const counter = document.querySelector('.stat-card.approved .stat-number');
            const currentCount = parseInt(counter.textContent);
            counter.textContent = currentCount + change;
        }

        // Quick action functions
        function viewReports() {
            showNotification('Opening reports dashboard...', 'info');
            // Implement navigation to reports page
        }

        function manageTeam() {
            showNotification('Opening team management...', 'info');
            // Implement navigation to team management page
        }

        // Logout function
        function logout() {
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('employeeSession');
                localStorage.removeItem('sessionExpiry');
                window.location.href = 'index.html';
            }
        }

        // Show notification
        function showNotification(message, type) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show`;
            notification.style.position = 'fixed';
            notification.style.top = '20px';
            notification.style.right = '20px';
            notification.style.zIndex = '9999';
            notification.style.minWidth = '300px';
            notification.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            document.body.appendChild(notification);
            
            // Auto remove after 3 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 3000);
        }

        // Add click animations
        document.querySelectorAll('.stat-card').forEach(card => {
            card.addEventListener('click', function() {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    