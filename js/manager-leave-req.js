
            
            document.addEventListener('DOMContentLoaded', function() {
            
                const searchInput = document.querySelector('.filter-input');
                const statusFilter = document.querySelector('.filter-select');
                
                
                const approveButtons = document.querySelectorAll('.approve-btn');
                const rejectButtons = document.querySelectorAll('.reject-btn');
                
                approveButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const requestItem = this.closest('.request-item');
                        const statusBadge = requestItem.querySelector('.status-badge');
                        statusBadge.className = 'status-badge approved';
                        statusBadge.textContent = 'Approved';
                        this.closest('.action-buttons').style.display = 'none';
                    });
                });
                
                rejectButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const requestItem = this.closest('.request-item');
                        const statusBadge = requestItem.querySelector('.status-badge');
                        statusBadge.className = 'status-badge rejected';
                        statusBadge.textContent = 'Rejected';
                        this.closest('.action-buttons').style.display = 'none';
                    });
                });
            });
        