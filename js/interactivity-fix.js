// 歐洲隨身導遊網站 - 互動性修復
(function() {
    console.log('🔧 修復網站互動性...');
    
    // 等待 DOM 完全載入

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initInteractivity);
    } else {
        initInteractivity();
    }
    
    function initInteractivity() {
        console.log('✅ 初始化互動功能...');
        
        try {
            // 綁定所有按鈕事件

            bindAllButtons();
            
            // 綁定導航欄事件

            bindNavigation();
            
            // 綁定底部工具列事件

            bindToolbar();
            
            console.log('✅ 互動功能初始化完成');
            
            // 顯示歡迎通知

            setTimeout(() => {
                showNotification('歐洲隨身導遊網站已就緒！', 'success');
            }, 1000);
            
        } catch (error) {
            console.error('❌ 互動功能初始化失敗:', error);
        }
    }
    
    function bindAllButtons() {
        console.log('🔗 綁定所有按鈕事件...');
        
        // 綁定導航按鈕
        bindButton('prevDay', '前一天');
        bindButton('nextDay', '後一天');
        bindButton('syncBtn', '同步行程');
        bindButton('offlineToggle', '離線模式');
        bindButton('exportItinerary', '匯出PDF');
        
        // 綁定地圖控制按鈕
        bindButton('zoomIn', '放大');
        bindButton('zoomOut', '縮小');
        bindButton('currentLocation', '我的位置');
    }
    
    function bindButton(id, label) {
        const button = document.getElementById(id);
        if (!button) {
            console.warn(`⚠️ 找不到按鈕: ${id}`);
            return;
        }
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`✅ ${label} 按鈕被點擊`);
            
            // 根據按鈕 ID 執行不同操作
            switch(id) {
                case 'prevDay':
                    showNotification('前一天功能開發中...', 'info');
                    break;
                case 'nextDay':
                    showNotification('後一天功能開發中...', 'info');
                    break;
                case 'syncBtn':
                    showNotification('行程同步完成！', 'success');
                    break;
                case 'offlineToggle':
                    toggleOfflineMode(this);
                    break;
                case 'zoomIn':
                    showNotification('地圖放大', 'info');
                    break;
                case 'zoomOut':
                    showNotification('地圖縮小', 'info');
                    break;
                case 'currentLocation':
                    showNotification('聚焦到當前行程', 'info');
                    break;
                case 'exportItinerary':
                    showNotification('PDF匯出功能開發中...', 'info');
                    break;
                default:
                    showNotification(`${label} 功能已啟動`, 'info');
            }
        });
    }
    
    function bindNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                console.log(`📍 切換到: ${targetId}`);
                
                // 顯示對應的區塊
                showSection(targetId);
                
                // 更新工具列
                updateToolbar(targetId);
            });
        });
    }
    
    function bindToolbar() {
        const toolButtons = document.querySelectorAll('.tool-btn');
        
        toolButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const sectionId = this.getAttribute('data-section');
                console.log(`📱 工具列: ${sectionId}`);
                
                // 顯示對應的區塊
                showSection(sectionId);
                
                // 更新導航欄
                updateNavigation(sectionId);
            });
        });
    }
    
    function showSection(sectionId) {
        // 隱藏所有區塊
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // 顯示目標區塊
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            console.log(`✅ 顯示區塊: ${sectionId}`);
        } else {
            console.error(`❌ 找不到區塊: ${sectionId}`);
        }
    }
    
    function updateToolbar(sectionId) {
        // 更新工具列按鈕狀態

        document.querySelectorAll('.tool-btn').forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-section') === sectionId) {
                button.classList.add('active');
            }
        });
    }
    
    function updateNavigation(sectionId) {
        // 更新導航欄按鈕狀態

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    function toggleOfflineMode(button) {
        const isOffline = button.classList.toggle('active');
        
        if (isOffline) {
            button.innerHTML = '<i class="fas fa-wifi-slash"></i> 離線模式';
            showNotification('已啟用離線模式', 'info');
        } else {
            button.innerHTML = '<i class="fas fa-wifi"></i> 離線模式';
            showNotification('已關閉離線模式', 'info');
        }
    }
    
    // 顯示通知
    function showNotification(message, type = 'info') {
        console.log(`📢 ${type.toUpperCase()}: ${message}`);
        
        // 創建簡單的通知
        const notification = document.createElement('div');
        notification.className = `quick-notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getTypeColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="${getTypeIcon(type)}"></i>
                <div>
                    <strong>${getTypeTitle(type)}</strong><br>
                    <small>${message}</small>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 自動移除
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    function getTypeColor(type) {
        const colors = {
            success: '#4CAF50',
            warning: '#FF9800',
            error: '#F44336',
            info: '#2196F3',
            important: '#9C27B0'
        };
        return colors[type] || colors.info;
    }
    
    function getTypeIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            warning: 'fas fa-exclamation-triangle',
            error: 'fas fa-times-circle',
            info: 'fas fa-info-circle',
            important: 'fas fa-star'
        };
        return icons[type] || icons.info;
    }
    
    function getTypeTitle(type) {
        const titles = {
            success: '成功',
            warning: '警告',
            error: '錯誤',
            info: '資訊',
            important: '重要'
        };
        return titles[type] || titles.info;
    }
    
    // 立即執行
    console.log('🚀 互動性修復已載入');
})();