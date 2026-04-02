// 日期自動切換界面
const dateSwitchUI = {
    // 初始化
    init() {
        console.log('🎨 初始化日期切換界面...');
        
        // 創建界面元素
        this.createUI();
        
        // 載入當前天數
        this.loadCurrentDay();
        
        // 設定事件監聽
        this.setupEventListeners();
        
        console.log('✅ 日期切換界面初始化完成');
    },
    
    // 創建UI元素
    createUI() {
        // 檢查是否已存在
        if (document.getElementById('date-switch-ui')) {
            return;
        }
        
        // 創建主容器
        const container = document.createElement('div');
        container.id = 'date-switch-ui';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 9999;
            padding: 20px;
            min-width: 300px;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;
        
        // 創建標題
        const title = document.createElement('div');
        title.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
        `;
        title.innerHTML = `
            <div style="
                background: #1a237e;
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
            ">
                <i class="fas fa-calendar-alt"></i>
            </div>
            <div>
                <h3 style="margin: 0; color: #1a237e;">日期自動切換</h3>
                <p style="margin: 5px 0 0 0; color: #666; font-size: 13px;">
                    根據當前日期自動顯示對應行程
                </p>
            </div>
        `;
        
        // 創建當前日期顯示
        const dateDisplay = document.createElement('div');
        dateDisplay.id = 'current-date-display';
        dateDisplay.style.cssText = `
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
        `;
        
        // 創建天數選擇器
        const daySelector = document.createElement('div');
        daySelector.style.cssText = `
            margin-bottom: 20px;
        `;
        
        daySelector.innerHTML = `
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            ">
                <label style="
                    font-weight: 500;
                    color: #1a237e;
                ">
                    <i class="fas fa-map-signs"></i>
                    選擇行程天數
                </label>
                <span id="day-count" style="
                    background: #1a237e;
                    color: white;
                    padding: 4px 10px;
                    border-radius: 12px;
                    font-size: 12px;
                ">
                    計算中...
                </span>
            </div>
            
            <div style="
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-bottom: 15px;
            ">
                ${this.createDayButtons()}
            </div>
            
            <div style="
                display: flex;
                gap: 10px;
            ">
                <button id="auto-switch-btn" style="
                    flex: 1;
                    background: #1a237e;
                    color: white;
                    border: none;
                    padding: 10px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                ">
                    <i class="fas fa-sync-alt"></i>
                    恢復自動計算
                </button>
                
                <button id="close-ui-btn" style="
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 8px;
                    cursor: pointer;
                ">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // 組裝界面
        container.appendChild(title);
        container.appendChild(dateDisplay);
        container.appendChild(daySelector);
        
        document.body.appendChild(container);
        
        // 更新日期顯示
        this.updateDateDisplay();
    },
    
    // 創建天數按鈕
    createDayButtons() {
        let buttons = '';
        for (let day = 1; day <= 10; day++) {
            buttons += `
                <button class="day-button" data-day="${day}" style="
                    background: #e9ecef;
                    color: #6c757d;
                    border: none;
                    width: 45px;
                    height: 45px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.2s ease;
                ">
                    ${day}
                </button>
            `;
        }
        return buttons;
    },
    
    // 載入當前天數
    loadCurrentDay() {
        // 檢查是否有手動選擇
        const manualSelection = localStorage.getItem('manualDaySelection');
        
        if (manualSelection) {
            const day = parseInt(manualSelection);
            this.selectDay(day);
            console.log(`📅 載入手動選擇: 第 ${day} 天`);
        } else {
            // 自動計算當前天數
            const currentDay = this.calculateCurrentDay();
            this.selectDay(currentDay);
            console.log(`📅 自動計算: 第 ${currentDay} 天`);
        }
    },
    
    // 計算當前天數
    calculateCurrentDay() {
        const startDate = new Date('2026-04-01');
        const now = new Date();
        
        const timeDiff = now.getTime() - startDate.getTime();
        const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
        
        // 限制在1-10天範圍內
        return Math.max(1, Math.min(10, dayDiff));
    },
    
    // 選擇天數
    selectDay(day) {
        // 更新按鈕狀態
        document.querySelectorAll('.day-button').forEach(button => {
            const buttonDay = parseInt(button.dataset.day);
            if (buttonDay === day) {
                button.style.background = '#1a237e';
                button.style.color = 'white';
            } else {
                button.style.background = '#e9ecef';
                button.style.color = '#6c757d';
            }
        });
        
        // 更新天數計數
        const dayCountElement = document.getElementById('day-count');
        if (dayCountElement) {
            dayCountElement.textContent = `第 ${day} 天`;
        }
        
        // 更新行程顯示
        if (typeof updateItineraryDisplay === 'function') {
            updateItineraryDisplay(day);
        }
        
        // 更新景點攻略系統
        if (typeof updateAttractionGuideDisplay === 'function') {
            updateAttractionGuideDisplay(day);
        }
    },
    
    // 更新日期顯示
    updateDateDisplay() {
        const displayElement = document.getElementById('current-date-display');
        if (!displayElement) return;
        
        const now = new Date();
        const formattedDate = now.toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
        
        const formattedTime = now.toLocaleTimeString('zh-TW', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        displayElement.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 10px;
            ">
                <div style="
                    background: #1a237e;
                    color: white;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fas fa-clock"></i>
                </div>
                <div>
                    <div style="
                        font-size: 18px;
                        font-weight: bold;
                        color: #1a237e;
                    ">
                        ${formattedDate}
                    </div>
                    <div style="
                        color: #666;
                        font-size: 14px;
                    ">
                        當前時間: ${formattedTime}
                    </div>
                </div>
            </div>
            
            <div style="
                background: #e3f2fd;
                padding: 10px;
                border-radius: 8px;
                font-size: 13px;
                color: #1a237e;
            ">
                <i class="fas fa-info-circle"></i>
                系統會根據當前日期自動切換到對應的行程天數
            </div>
        `;
    },
    
    // 設定事件監聽
    setupEventListeners() {
        // 天數按鈕點擊事件
        document.querySelectorAll('.day-button').forEach(button => {
            button.addEventListener('click', () => {
                const day = parseInt(button.dataset.day);
                this.switchToDay(day);
            });
        });
        
        // 恢復自動計算按鈕
        const autoSwitchBtn = document.getElementById('auto-switch-btn');
        if (autoSwitchBtn) {
            autoSwitchBtn.addEventListener('click', () => {
                this.resetToAuto();
            });
        }
        
        // 關閉界面按鈕
        const closeBtn = document.getElementById('close-ui-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeUI();
            });
        }
        
        // 每分鐘更新時間顯示
        setInterval(() => {
            this.updateDateDisplay();
        }, 60 * 1000);
        
        // 每小時檢查是否需要更新天數
        setInterval(() => {
            this.checkDayUpdate();
        }, 60 * 60 * 1000);
    },
    
    // 切換到指定天數
    switchToDay(day) {
        console.log(`🔄 切換到第 ${day} 天`);
        
        // 更新選擇
        this.selectDay(day);
        
        // 儲存手動選擇
        localStorage.setItem('manualDaySelection', day);
        
        // 顯示通知
        this.showNotification(`已切換到第 ${day} 天行程`, 'success');
    },
    
    // 恢復自動計算
    resetToAuto() {
        console.log('🔄 恢復自動日期計算');
        
        // 移除手動選擇
        localStorage.removeItem('manualDaySelection');
        
        // 計算當前天數
        const currentDay = this.calculateCurrentDay();
        
        // 更新顯示
        this.selectDay(currentDay);
        
        // 顯示通知
        this.showNotification('已恢復自動日期計算', 'info');
    },
    
    // 檢查是否需要更新天數
    checkDayUpdate() {
        // 如果有手動選擇，不自動更新
        if (localStorage.getItem('manualDaySelection')) {
            return;
        }
        
        const currentDay = this.calculateCurrentDay();
        const currentDisplay = document.querySelector('.day-title')?.textContent;
        
        if (currentDisplay && !currentDisplay.includes(`第 ${currentDay} 天`)) {
            console.log('🔄 檢測到日期變化，自動更新行程...');
            this.selectDay(currentDay);
            this.showNotification('日期已自動更新', 'info');
        }
    },
    
    // 顯示通知
    showNotification(message, type = 'info') {
        // 創建通知元素
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="${this.getNotificationIcon(type)}"></i>
                <div>
                    <strong>${type === 'success' ? '成功' : type === 'error' ? '錯誤' : '資訊'}</strong><br>
                    <small>${message}</small>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 3秒後自動移除
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    },
    
    // 獲取通知顏色
    getNotificationColor(type) {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };
        return colors[type] || colors.info;
    },
    
    // 獲取通知圖標
    getNotificationIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-times-circle',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-triangle'
        };
        return icons[type] || icons.info;
    },
    
    // 關閉界面
    closeUI() {
        const uiElement = document.getElementById('date-switch-ui');
        if (uiElement) {
            uiElement.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (uiElement.parentNode) {
                    uiElement.parentNode.removeChild(uiElement);
                }
            }, 300);
        }
    },
    
    // 打開界面
    openUI() {
        this.createUI();
        this.loadCurrentDay();
    }
};

// 初始化函數
window.initDateSwitchUI = function() {
    dateSwitchUI.init();
};

// 打開界面函數
window.openDateSwitchUI = function() {
    dateSwitchUI.openUI();
};

// 關閉界面函數
window.closeDateSwitchUI = function() {
    dateSwitchUI.closeUI();
};

// 自動初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        dateSwitchUI.init();
    });
} else {
    dateSwitchUI.init();
}