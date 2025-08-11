
        
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                alert('View details functionality');
            });
        });

        
        document.querySelectorAll('.approve-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const requestItem = this.closest('.request-item');
                const statusBadge = requestItem.querySelector('.status-badge');
                const actionButtons = requestItem.querySelector('.action-buttons');
                
                statusBadge.textContent = 'Approved';
                statusBadge.className = 'status-badge approved';
                actionButtons.style.display = 'none';
                requestItem.classList.add('approved');
            });
        });

        document.querySelectorAll('.reject-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const requestItem = this.closest('.request-item');
                const statusBadge = requestItem.querySelector('.status-badge');
                const actionButtons = requestItem.querySelector('.action-buttons');
                
                statusBadge.textContent = 'Rejected';
                statusBadge.className = 'status-badge rejected';
                actionButtons.style.display = 'none';
                requestItem.classList.add('rejected');
            });
        });
    