// 簡單可靠的時間顯示腳本
// 專門修復時間顯示問題

class SimpleTimeDisplay {
    constructor() {
        this.localTimeElement = document.getElementById('local-time');
        this.taipeiTimeElement = document.getElementById('taipei-time');
        this.currentDateElement = document.getElementById('current-date');
        
        // 時區設定
        this.timezones = {
            local: 'Europe/Berlin',  // 歐洲中部時間
            taipei: 'Asia/Taipei'    // 台北時間
        };
        
        // 日期格式
        this.dateOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        };
        
        // 時間格式
        this.timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        
        console.log('⏰ 時間顯示初始化...');
    }
    
    // 初始化時間顯示
    init() {
        if (!this.localTimeElement || !this.taipeiTimeElement) {
            console.error('❌ 時間元素未找到');
            return;
        }
        
        // 立即更新一次
        this.updateAllTimes();
        
        // 每秒更新時間
        setInterval(() => {
            this.updateTimes();
        }, 1000);
        
        // 每分鐘更新日期（避免頻繁更新）
        setInterval(() => {
            this.updateDate();
        }, 60000);
        
        console.log('✅ 時間顯示初始化完成');
    }
    
    // 更新所有時間
    updateAllTimes() {
        this.updateTimes();
        this.updateDate();
    }
    
    // 更新時鐘時間
    updateTimes() {
        try {
            const now = new Date();
            
            // 當地時間（歐洲中部時間）
            const localTime = this.formatTimeForTimezone(now, this.timezones.local);
            this.localTimeElement.textContent = localTime;
            
            // 台北時間
            const taipeiTime = this.formatTimeForTimezone(now, this.timezones.taipei);
            this.taipeiTimeElement.textContent = taipeiTime;
            
        } catch (error) {
            console.error('❌ 時間更新錯誤:', error);
            this.showFallbackTimes();
        }
    }
    
    // 更新日期
    updateDate() {
        try {
            const now = new Date();
            const dateStr = this.formatDate(now);
            
            if (this.currentDateElement) {
                this.currentDateElement.textContent = dateStr;
            }
            
        } catch (error) {
            console.error('❌ 日期更新錯誤:', error);
        }
    }
    
    // 格式化時區時間
    formatTimeForTimezone(date, timezone) {
        try {
            return date.toLocaleTimeString('zh-TW', {
                ...this.timeOptions,
                timeZone: timezone
            });
        } catch (error) {
            // 如果時區無效，使用UTC+偏移量
            console.warn(`⚠️ 時區 ${timezone} 無效，使用備用方法`);
            return this.formatTimeWithOffset(date, timezone);
        }
    }
    
    // 備用時間格式化（時區無效時使用）
    formatTimeWithOffset(date, timezone) {
        // 簡單的時區偏移計算
        const offsets = {
            'Europe/Berlin': 1,    // UTC+1
            'Asia/Taipei': 8       // UTC+8
        };
        
        const offset = offsets[timezone] || 0;
        const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
        const targetTime = new Date(utcTime + (3600000 * offset));
        
        return targetTime.toLocaleTimeString('zh-TW', this.timeOptions);
    }
    
    // 格式化日期
    formatDate(date) {
        return date.toLocaleDateString('zh-TW', this.dateOptions);
    }
    
    // 顯示備用時間（當主要方法失敗時）
    showFallbackTimes() {
        const now = new Date();
        
        // 簡單的24小時制時間
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeStr = `${hours}:${minutes}`;
        
        this.localTimeElement.textContent = timeStr;
        this.taipeiTimeElement.textContent = timeStr;
        
        console.log('⚠️ 使用備用時間顯示');
    }
    
    // 測試時間顯示
    test() {
        console.log('🧪 測試時間顯示...');
        
        const testDate = new Date();
        console.log('當前時間:', testDate);
        console.log('當地時間:', this.formatTimeForTimezone(testDate, this.timezones.local));
        console.log('台北時間:', this.formatTimeForTimezone(testDate, this.timezones.taipei));
        console.log('格式化日期:', this.formatDate(testDate));
        
        return true;
    }
}

// 創建全局實例
window.simpleTimeDisplay = new SimpleTimeDisplay();

// 自動初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 DOM載入完成，初始化時間顯示...');
    window.simpleTimeDisplay.init();
    
    // 測試時間顯示
    window.simpleTimeDisplay.test();
});

// 如果DOM已經載入，直接初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        window.simpleTimeDisplay.init();
    });
} else {
    window.simpleTimeDisplay.init();
}

// 導出供其他腳本使用
window.initTimeDisplay = function() {
    window.simpleTimeDisplay.init();
};