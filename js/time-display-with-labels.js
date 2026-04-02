// 時間顯示腳本 - 支持文字標籤版本
class TimeDisplayWithLabels {
    constructor() {
        this.localTimeElement = document.getElementById('local-time');
        this.taipeiTimeElement = document.getElementById('taipei-time');
        this.currentDateElement = document.getElementById('current-date');
        
        // 時區設定
        this.timezones = {
            local: 'Europe/Berlin',  // 歐洲中部時間
            taipei: 'Asia/Taipei'    // 台北時間
        };
        
        // 文字標籤
        this.labels = {
            local: '當地：',
            taipei: '台北：'
        };
        
        console.log('⏰ 時間顯示（帶標籤）初始化...');
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
        
        // 每分鐘更新日期
        setInterval(() => {
            this.updateDate();
        }, 60000);
        
        console.log('✅ 時間顯示（帶標籤）初始化完成');
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
            this.updateTimeElement(this.localTimeElement, localTime, 'local');
            
            // 台北時間
            const taipeiTime = this.formatTimeForTimezone(now, this.timezones.taipei);
            this.updateTimeElement(this.taipeiTimeElement, taipeiTime, 'taipei');
            
        } catch (error) {
            console.error('❌ 時間更新錯誤:', error);
            this.showFallbackTimes();
        }
    }
    
    // 更新時間元素（帶標籤）
    updateTimeElement(element, time, type) {
        if (element) {
            // 如果有父元素包含標籤，只更新時間部分
            element.textContent = time;
            
            // 添加時間值類名
            element.className = 'time-value';
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
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: timezone
            });
        } catch (error) {
            // 如果時區無效，使用備用方法
            console.warn(`⚠️ 時區 ${timezone} 無效，使用備用方法`);
            return this.formatTimeWithOffset(date, timezone);
        }
    }
    
    // 備用時間格式化
    formatTimeWithOffset(date, timezone) {
        const offsets = {
            'Europe/Berlin': 1,    // UTC+1
            'Asia/Taipei': 8       // UTC+8
        };
        
        const offset = offsets[timezone] || 0;
        const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
        const targetTime = new Date(utcTime + (3600000 * offset));
        
        return targetTime.toLocaleTimeString('zh-TW', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }
    
    // 格式化日期
    formatDate(date) {
        return date.toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    }
    
    // 顯示備用時間
    showFallbackTimes() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeStr = `${hours}:${minutes}`;
        
        this.updateTimeElement(this.localTimeElement, timeStr, 'local');
        this.updateTimeElement(this.taipeiTimeElement, timeStr, 'taipei');
        
        console.log('⚠️ 使用備用時間顯示');
    }
    
    // 測試時間顯示
    test() {
        console.log('🧪 測試時間顯示（帶標籤）...');
        
        const testDate = new Date();
        console.log('當前時間:', testDate);
        console.log('當地時間:', this.formatTimeForTimezone(testDate, this.timezones.local));
        console.log('台北時間:', this.formatTimeForTimezone(testDate, this.timezones.taipei));
        
        return true;
    }
}

// 創建全局實例
window.timeDisplayWithLabels = new TimeDisplayWithLabels();

// 自動初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 DOM載入完成，初始化時間顯示（帶標籤）...');
    window.timeDisplayWithLabels.init();
    
    // 測試時間顯示
    window.timeDisplayWithLabels.test();
});

// 如果DOM已經載入，直接初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        window.timeDisplayWithLabels.init();
    });
} else {
    window.timeDisplayWithLabels.init();
}