// 可靠的時間顯示系統
class ReliableTimeDisplay {
    constructor() {
        this.timeElement = null;
        this.europeTimeZone = 'Europe/Budapest'; // 匈牙利時間（歐洲中部時間）
        this.taipeiTimeZone = 'Asia/Taipei';
        this.updateInterval = null;
        this.lastUpdate = null;
        
        console.log('⏰ 可靠時間顯示系統初始化...');
    }
    
    // 初始化
    init() {
        // 找到時間顯示元素
        this.timeElement = document.getElementById('timeDisplay');
        if (!this.timeElement) {
            console.warn('⚠️ 時間顯示元素未找到，嘗試創建...');
            this.createTimeElement();
        }
        
        // 立即顯示時間
        this.updateTime();
        
        // 設置定時更新
        this.startAutoUpdate();
        
        console.log('✅ 可靠時間顯示系統初始化完成');
    }
    
    // 創建時間元素
    createTimeElement() {
        // 檢查是否已有時間顯示區域
        const topBar = document.querySelector('.top-bar-content');
        if (!topBar) return;
        
        // 創建時間顯示元素
        this.timeElement = document.createElement('div');
        this.timeElement.id = 'timeDisplay';
        this.timeElement.className = 'time-display';
        
        // 添加到頂部導航
        topBar.appendChild(this.timeElement);
        
        console.log('✅ 時間顯示元素已創建');
    }
    
    // 更新時間
    updateTime() {
        try {
            const now = new Date();
            
            // 獲取歐洲時間
            const europeTime = this.getTimeForTimeZone(this.europeTimeZone);
            
            // 獲取台北時間
            const taipeiTime = this.getTimeForTimeZone(this.taipeiTimeZone);
            
            // 格式化時間
            const europeFormatted = this.formatTime(europeTime);
            const taipeiFormatted = this.formatTime(taipeiTime);
            
            // 更新顯示
            this.timeElement.innerHTML = `
                <div class="time-display-content">
                    <div class="time-local">
                        <span class="time-label">當地：</span>
                        <span class="time-value">${europeFormatted}</span>
                    </div>
                    <div class="time-taipei">
                        <span class="time-label">台北：</span>
                        <span class="time-value">${taipeiFormatted}</span>
                    </div>
                </div>
            `;
            
            this.lastUpdate = now;
            
        } catch (error) {
            console.error('❌ 時間更新失敗:', error);
            this.showFallbackTime();
        }
    }
    
    // 獲取指定時區時間
    getTimeForTimeZone(timeZone) {
        try {
            const now = new Date();
            const options = {
                timeZone: timeZone,
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            
            const formatter = new Intl.DateTimeFormat('zh-TW', options);
            const parts = formatter.formatToParts(now);
            
            let hour = '00';
            let minute = '00';
            let second = '00';
            
            parts.forEach(part => {
                if (part.type === 'hour') hour = part.value;
                if (part.type === 'minute') minute = part.value;
                if (part.type === 'second') second = part.value;
            });
            
            return {
                hour: parseInt(hour),
                minute: parseInt(minute),
                second: parseInt(second)
            };
            
        } catch (error) {
            console.warn('⚠️ 時區時間獲取失敗，使用本地時間:', error);
            const now = new Date();
            return {
                hour: now.getHours(),
                minute: now.getMinutes(),
                second: now.getSeconds()
            };
        }
    }
    
    // 格式化時間
    formatTime(timeObj) {
        const hour = timeObj.hour.toString().padStart(2, '0');
        const minute = timeObj.minute.toString().padStart(2, '0');
        const second = timeObj.second.toString().padStart(2, '0');
        
        return `${hour}:${minute}:${second}`;
    }
    
    // 顯示備用時間
    showFallbackTime() {
        const now = new Date();
        const hour = now.getHours().toString().padStart(2, '0');
        const minute = now.getMinutes().toString().padStart(2, '0');
        const second = now.getSeconds().toString().padStart(2, '0');
        
        this.timeElement.innerHTML = `
            <div class="time-display-content">
                <div class="time-local">
                    <span class="time-label">當地：</span>
                    <span class="time-value">${hour}:${minute}:${second}</span>
                </div>
                <div class="time-taipei">
                    <span class="time-label">台北：</span>
                    <span class="time-value">${hour}:${minute}:${second}</span>
                </div>
            </div>
        `;
    }
    
    // 開始自動更新
    startAutoUpdate() {
        // 清除現有定時器
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        // 每秒更新一次
        this.updateInterval = setInterval(() => {
            this.updateTime();
        }, 1000);
        
        console.log('🔄 時間自動更新已啟動');
    }
    
    // 停止自動更新
    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
            console.log('⏹️ 時間自動更新已停止');
        }
    }
    
    // 獲取系統狀態
    getStatus() {
        return {
            timeElementExists: !!this.timeElement,
            lastUpdate: this.lastUpdate,
            isUpdating: !!this.updateInterval,
            timeZones: {
                europe: this.europeTimeZone,
                taipei: this.taipeiTimeZone
            }
        };
    }
}

// 立即初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 初始化可靠時間顯示系統...');
    window.reliableTimeDisplay = new ReliableTimeDisplay();
    window.reliableTimeDisplay.init();
    
    console.log('✅ 可靠時間顯示系統已就緒');
});

// 提供調試功能
window.debugTimeDisplay = function() {
    if (window.reliableTimeDisplay) {
        const status = window.reliableTimeDisplay.getStatus();
        console.log('🔍 時間顯示系統狀態：');
        console.table(status);
        return status;
    } else {
        console.error('❌ 時間顯示系統未初始化');
        return null;
    }
};