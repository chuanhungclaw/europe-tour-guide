// 導航欄時間顯示功能
const navTimeDisplay = {
    // 初始化
    init() {
        console.log('⏰ 初始化導航欄時間顯示...');
        
        // 檢查DOM元素是否存在
        if (!this.checkElements()) {
            console.error('❌ 找不到導航時間元素');
            setTimeout(() => this.init(), 100);
            return;
        }
        
        // 開始更新時間
        this.startTimeUpdates();
        
        console.log('✅ 導航欄時間顯示初始化完成');
    },
    
    // 檢查DOM元素
    checkElements() {
        return document.getElementById('nav-local-time') && 
               document.getElementById('nav-taipei-time');
    },
    
    // 開始更新時間
    startTimeUpdates() {
        // 立即更新一次
        this.updateTimes();
        
        // 每秒更新一次
        setInterval(() => {
            this.updateTimes();
        }, 1000);
    },
    
    // 更新時間顯示
    updateTimes() {
        try {
            // 更新當地時間
            this.updateLocalTime();
            
            // 更新台北時間
            this.updateTaipeiTime();
            
        } catch (error) {
            console.error('❌ 更新時間錯誤:', error);
        }
    },
    
    // 更新當地時間
    updateLocalTime() {
        const localTimeElement = document.getElementById('nav-local-time');
        if (!localTimeElement) return;
        
        const now = new Date();
        const timeString = this.formatTime(now, false);
        
        localTimeElement.textContent = timeString;
        localTimeElement.title = this.getFullDateTime(now, '當地時間');
    },
    
    // 更新台北時間
    updateTaipeiTime() {
        const taipeiTimeElement = document.getElementById('nav-taipei-time');
        if (!taipeiTimeElement) return;
        
        const now = new Date();
        const taipeiTime = this.convertToTimezone(now, 'Asia/Taipei');
        const timeString = this.formatTime(taipeiTime, false);
        
        taipeiTimeElement.textContent = timeString;
        taipeiTimeElement.title = this.getFullDateTime(taipeiTime, '台北時間');
    },
    
    // 格式化時間（只顯示時分）
    formatTime(date) {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        
        return date.toLocaleTimeString('zh-TW', options);
    },
    
    // 格式化時間（顯示時分秒）
    formatTimeWithSeconds(date) {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        
        return date.toLocaleTimeString('zh-TW', options);
    },
    
    // 轉換到指定時區
    convertToTimezone(date, timezone) {
        return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    },
    
    // 獲取完整日期時間字串
    getFullDateTime(date, label) {
        const dateStr = date.toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
        
        const timeStr = date.toLocaleTimeString('zh-TW', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        return `${label}\n${dateStr}\n${timeStr}`;
    },
    
    // 切換時間格式（12/24小時制）
    toggleTimeFormat() {
        // 這裡可以實現切換功能
        // 目前使用24小時制
    },
    
    // 顯示時間差
    showTimeDifference() {
        const now = new Date();
        const taipeiTime = this.convertToTimezone(now, 'Asia/Taipei');
        
        // 計算時差（小時）
        const localOffset = now.getTimezoneOffset() / 60;
        const taipeiOffset = -8; // 台北是 GMT+8
        
        const difference = taipeiOffset + localOffset;
        
        if (difference === 0) {
            return '與台北時間相同';
        } else if (difference > 0) {
            return `比台北快 ${difference} 小時`;
        } else {
            return `比台北慢 ${Math.abs(difference)} 小時`;
        }
    },
    
    // 添加滑鼠懸停效果
    addHoverEffects() {
        const localTimeElement = document.getElementById('nav-local-time');
        const taipeiTimeElement = document.getElementById('nav-taipei-time');
        
        if (localTimeElement) {
            localTimeElement.addEventListener('mouseenter', () => {
                this.showTimeTooltip('當地時間', localTimeElement);
            });
            
            localTimeElement.addEventListener('mouseleave', () => {
                this.hideTimeTooltip();
            });
        }
        
        if (taipeiTimeElement) {
            taipeiTimeElement.addEventListener('mouseenter', () => {
                this.showTimeTooltip('台北時間', taipeiTimeElement);
            });
            
            taipeiTimeElement.addEventListener('mouseleave', () => {
                this.hideTimeTooltip();
            });
        }
    },
    
    // 顯示時間提示
    showTimeTooltip(label, element) {
        // 移除現有提示
        this.hideTimeTooltip();
        
        // 創建提示元素
        const tooltip = document.createElement('div');
        tooltip.id = 'time-tooltip';
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            z-index: 10000;
            white-space: pre-line;
            max-width: 200px;
            pointer-events: none;
        `;
        
        const now = new Date();
        let time;
        
        if (label === '當地時間') {
            time = now;
        } else {
            time = this.convertToTimezone(now, 'Asia/Taipei');
        }
        
        tooltip.innerHTML = `
            <strong>${label}</strong><br>
            ${time.toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            })}<br>
            ${time.toLocaleTimeString('zh-TW', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            })}
        `;
        
        // 定位提示
        const rect = element.getBoundingClientRect();
        tooltip.style.top = `${rect.bottom + 5}px`;
        tooltip.style.left = `${rect.left}px`;
        
        document.body.appendChild(tooltip);
    },
    
    // 隱藏時間提示
    hideTimeTooltip() {
        const tooltip = document.getElementById('time-tooltip');
        if (tooltip && tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
    },
    
    // 添加點擊事件（打開詳細時間面板）
    addClickEvents() {
        const localTimeElement = document.getElementById('nav-local-time');
        const taipeiTimeElement = document.getElementById('nav-taipei-time');
        
        if (localTimeElement) {
            localTimeElement.style.cursor = 'pointer';
            localTimeElement.addEventListener('click', () => {
                this.openDetailedTimePanel('local');
            });
        }
        
        if (taipeiTimeElement) {
            taipeiTimeElement.style.cursor = 'pointer';
            taipeiTimeElement.addEventListener('click', () => {
                this.openDetailedTimePanel('taipei');
            });
        }
    },
    
    // 打開詳細時間面板
    openDetailedTimePanel(timezoneType) {
        console.log(`打開詳細時間面板: ${timezoneType}`);
        
        // 這裡可以打開之前創建的雙時區面板
        if (typeof openDualTimeDisplay === 'function') {
            openDualTimeDisplay();
        }
    }
};

// 初始化函數
window.initNavTimeDisplay = function() {
    navTimeDisplay.init();
};

// 自動初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        navTimeDisplay.init();
    });
} else {
    navTimeDisplay.init();
}