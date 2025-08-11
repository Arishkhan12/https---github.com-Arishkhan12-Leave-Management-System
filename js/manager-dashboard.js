 document.addEventListener('DOMContentLoaded', function() {
        checkAuthentication();
        loadUserInfo();
        updatePendingCount();
    });


    function checkAuthentication() {
        const isLoggedIn = localStorage.getItem("isManagerLoggedIn");
        if (!isLoggedIn || isLoggedIn !== "true") {
            window.location.href = "Manager-login.html";
            return false;
        }
        return true;
    }


    function loadUserInfo() {
        const savedUser = JSON.parse(localStorage.getItem("managerUser"));
        if (savedUser) {
            document.getElementById("username").textContent = savedUser.username || "Manager";
            document.getElementById("welcomeUser").textContent = savedUser.username || "Manager";
        }
    }


    function updatePendingCount() {
        const pendingItems = document.querySelectorAll('.request-item:not(.approved):not(.rejected)');
        const count = pendingItems.length;
        document.getElementById('pendingCount').textContent = count;
        

        const statNumber = document.querySelector('.stat-card.pending .stat-number');
        if (statNumber) {
            statNumber.textContent = count;
        }
    }

    function reviewRequest(button) {
        const requestItem = button.closest('.request-item');
        const employeeName = requestItem.querySelector('.employee-name').textContent;
        const leaveType = requestItem.querySelector('.leave-type').textContent;
        const leaveDate = requestItem.querySelector('.leave-date').textContent;
        const requestId = requestItem.querySelector('.request-id').textContent;
        
        alert(`Request Details:
    Employee: ${employeeName}
    Type: ${leaveType}
    Dates: ${leaveDate}
    ${requestId}
        
    Status: Pending Review`);
    }

    function approveRequest(button) {
        const requestItem = button.closest('.request-item');
        const employeeName = requestItem.querySelector('.employee-name').textContent;
        

        if (confirm(`Are you sure you want to approve leave request for ${employeeName}?`)) {

            requestItem.classList.add('approved');
            requestItem.classList.remove('rejected');
            

            const existingStatus = requestItem.querySelector('.status-message');
            if (existingStatus) {
                existingStatus.remove();
            }
            

            const statusMessage = document.createElement('div');
            statusMessage.className = 'status-message approved';
            statusMessage.textContent = '✅ Approved';
            requestItem.style.position = 'relative';
            requestItem.appendChild(statusMessage);
            

            const actionBtns = requestItem.querySelectorAll('.action-btn');
            actionBtns.forEach(btn => {
                btn.disabled = true;
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
            });
            

            addToApprovedSection(employeeName, requestItem.querySelector('.leave-type').textContent);
            

            updateCounts();
            

            showNotification('Request approved successfully!', 'success');
            
            setTimeout(() => {
                requestItem.style.transition = 'all 0.5s ease';
                requestItem.style.opacity = '0.3';
            }, 1500);
        }
    }

    function rejectRequest(button) {
        const requestItem = button.closest('.request-item');
        const employeeName = requestItem.querySelector('.employee-name').textContent;
        

        if (confirm(`Are you sure you want to reject leave request for ${employeeName}?`)) {

            requestItem.classList.add('rejected');
            requestItem.classList.remove('approved');
            

            const existingStatus = requestItem.querySelector('.status-message');
            if (existingStatus) {
                existingStatus.remove();
            }
            
        
            const statusMessage = document.createElement('div');
            statusMessage.className = 'status-message rejected';
            statusMessage.textContent = '❌ Rejected';
            requestItem.style.position = 'relative';
            requestItem.appendChild(statusMessage);
            
        
            const actionBtns = requestItem.querySelectorAll('.action-btn');
            actionBtns.forEach(btn => {
                btn.disabled = true;
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
            });
            
        
            updateCounts();
            
        
            showNotification('Request rejected successfully!', 'error');
            
                setTimeout(() => {
                requestItem.style.transition = 'all 0.5s ease';
                requestItem.style.opacity = '0.3';
            }, 1500);
        }
    }

    function addToApprovedSection(employeeName, leaveType) {
        const approvedSection = document.querySelector('.approved-section');
        const approvedCount = document.querySelector('.section-badge');
        

        const approvedItem = document.createElement('div');
        approvedItem.className = 'approved-item';
        approvedItem.style.opacity = '0';
        approvedItem.innerHTML = `
            <div class="approved-info">
                <div class="approved-avatar">${employeeName.charAt(0).toUpperCase()}</div>
                <div class="approved-details">
                    <h6>${employeeName}</h6>
                    <small>${leaveType}</small>
                </div>
            </div>
            <div class="approved-date">Approved just now</div>
        `;
        
    
        const firstApprovedItem = approvedSection.querySelector('.approved-item');
        if (firstApprovedItem) {
            approvedSection.insertBefore(approvedItem, firstApprovedItem);
        } else {
            approvedSection.appendChild(approvedItem);
        }
        
    
        setTimeout(() => {
            approvedItem.style.transition = 'opacity 0.5s ease';
            approvedItem.style.opacity = '1';
        }, 100);
        
    
        const currentCount = parseInt(approvedCount.textContent) || 0;
        approvedCount.textContent = currentCount + 1;
    }


    function updateCounts() {
        const pendingItems = document.querySelectorAll('.request-item:not(.approved):not(.rejected)');
        const approvedItems = document.querySelectorAll('.request-item.approved');
        

        const pendingCount = pendingItems.length;
        document.getElementById('pendingCount').textContent = pendingCount;
        

        const pendingStatCard = document.querySelector('.stat-card.pending .stat-number');
        const approvedStatCard = document.querySelector('.stat-card.approved .stat-number');
        
        if (pendingStatCard) pendingStatCard.textContent = pendingCount;
        if (approvedStatCard) approvedStatCard.textContent = approvedItems.length;
    }

    function showNotification(message, type = 'success') {
    
        const existingNotification = document.querySelector('.notification-popup');
        if (existingNotification) {
            existingNotification.remove();
        }
        
    
        const notification = document.createElement('div');
        notification.className = `notification-popup ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
            ${type === 'success' ? 'background: linear-gradient(135deg, #00b894, #00a085);' : 'background: linear-gradient(135deg, #e74c3c, #c0392b);'}
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
    
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
    
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function viewAnalysis() {
        
        if (checkAuthentication()) {
            
            localStorage.setItem('previousPage', 'manager-dashboard');
            
            window.location.href = "view-analysis.html";
        }
    }


    function viewReports() {
        
        if (checkAuthentication()) {
            alert('Redirecting to Reports Dashboard...');
            
            window.location.href = "manager-leave-req.html";
        }
    }


    function logout() {
        if (confirm('Are you sure you want to logout?')) {

            localStorage.removeItem("isManagerLoggedIn");
            localStorage.removeItem("managerUser");
            localStorage.removeItem("previousPage");
            

            showNotification('Logged out successfully!', 'success');
            

            setTimeout(() => {
                window.location.href = "Manager-login.html";
            }, 1000);
        }
    }


    document.addEventListener('DOMContentLoaded', function() {
        const notificationIcon = document.querySelector('.notification-icon');
        if (notificationIcon) {
            notificationIcon.addEventListener('click', function() {
                const pendingCount = document.querySelectorAll('.request-item:not(.approved):not(.rejected)').length;
                alert(`You have ${pendingCount} pending leave requests to review.`);
            });
        }
    });

    setInterval(function() {
        updatePendingCount();
    }, 30000);

    document.addEventListener('keydown', function(event) {

        if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
            event.preventDefault();
            viewAnalysis();
        }
        

        if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
            event.preventDefault();
            viewReports();
        }
    });

    console.log('Manager Dashboard JavaScript loaded successfully!');