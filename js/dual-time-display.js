// 雙時區時間顯示功能
const dualTimeDisplay = {
    // 時區設定
    timezones: {
        local: {
            name: "當地時間",
            zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            city: "當地",
            flag: "🌍"
        },
        taipei: {
            name: "台北時間",
            zone: "Asia/Taipei",
            city: "台北",
            flag: "🇹🇼"
        },
        vienna: {
            name: "維也納時間",
            zone: "Europe/Vienna",
            city: "維也納",
            flag: "🇦🇹"
        },
        prague: {
            name: "布拉格時間",
            zone: "Europe/Prague",
            city: "布拉格",
            flag: "🇨🇿"
        },
        budapest: {
            name: "布達佩斯時間",
            zone: "Europe/Budapest",
            city: "布達佩斯",
            flag: "🇭🇺"
        }
    },
    
    // 初始化
    init() {
        console.log('⏰ 初始化雙時區時間顯示...');
        
        // 創建時間顯示界面
        this.createTimeDisplayUI();
        
        // 開始更新時間
        this.startTimeUpdates();
        
        console.log('✅ 雙時區時間顯示初始化完成');
    },
    
    // 創建時間顯示界面
    createTimeDisplayUI() {
        // 檢查是否已存在
        if (document.getElementById('dual-time-display')) {
            return;
        }
        
        // 創建主容器
        const container = document.createElement('div');
        container.id = 'dual-time-display';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 9998;
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
                ⏰
            </div>
            <div>
                <h3 style="margin: 0; color: #1a237e;">雙時區時間</h3>
                <p style="margin: 5px 0 0 0; color: #666; font-size: 13px;">
                    當地時間與台北時間對照
                </p>
            </div>
        `;
        
        // 創建時間顯示區域
        const timeDisplay = document.createElement('div');
        timeDisplay.id = 'time-display-content';
        timeDisplay.style.cssText = `
            margin-bottom: 20px;
        `;
        
        // 創建時區切換按鈕
        const timezoneButtons = document.createElement('div');
        timezoneButtons.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 15px;
        `;
        
        // 添加時區按鈕
        for (const key in this.timezones) {
            if (key === 'local' || key === 'taipei') continue; // 這兩個固定顯示
            
            const timezone = this.timezones[key];
            const button = document.createElement('button');
            button.className = 'timezone-btn';
            button.dataset.timezone = key;
            button.style.cssText = `
                background: #e9ecef;
                color: #6c757d;
                border: none;
                padding: 8px 12px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 13px;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 5px;
            `;
            button.innerHTML = `${timezone.flag} ${timezone.city}`;
            
            button.addEventListener('click', () => {
                this.toggleTimezone(key);
            });
            
            timezoneButtons.appendChild(button);
        }
        
        // 創建控制按鈕
        const controlButtons = document.createElement('div');
        controlButtons.style.cssText = `
            display: flex;
            gap: 10px;
        `;
        
        controlButtons.innerHTML = `
            <button id="toggle-24h" style="
                flex: 1;
                background: #6c757d;
                color: white;
                border: none;
                padding: 10px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 13px;
            ">
                切換24小時制
            </button>
            
            <button id="close-time-display" style="
                background: #dc3545;
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 8px;
                cursor: pointer;
            ">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // 組裝界面
        container.appendChild(title);
        container.appendChild(timeDisplay);
        container.appendChild(timezoneButtons);
        container.appendChild(controlButtons);
        
        document.body.appendChild(container);
        
        // 更新時間顯示
        this.updateTimeDisplay();
        
        // 設定事件監聽
        this.setupEventListeners();
    },
    
    // 更新時間顯示
    updateTimeDisplay() {
        const displayElement = document.getElementById('time-display-content');
        if (!displayElement) return;
        
        // 獲取顯示的時區
        const displayTimezones = this.getDisplayTimezones();
        
        let html = '';
        
        displayTimezones.forEach(timezoneKey => {
            const timezone = this.timezones[timezoneKey];
            const time = this.getTimeInTimezone(timezone.zone);
            
            html += `
                <div class="timezone-display" style="
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 10px;
                    margin-bottom: 10px;
                    border-left: 4px solid #1a237e;
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 20px;">${timezone.flag}</span>
                            <strong style="color: #1a237e;">${timezone.name}</strong>
                        </div>
                        <span style="
                            background: ${timezoneKey === 'local' ? '#1a237e' : '#6c757d'};
                            color: white;
                            padding: 2px 8px;
                            border-radius: 10px;
                            font-size: 12px;
                        ">
                            ${timezone.city}
                        </span>
                    </div>
                    <div style="
                        font-size: 28px;
                        font-weight: bold;
                        color: #1a237e;
                        text-align: center;
                        margin: 10px 0;
                        font-family: 'Courier New', monospace;
                    ">
                        ${time.formatted}
                    </div>
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        color: #666;
                        font-size: 13px;
                    ">
                        <span>${time.date}</span>
                        <span>${time.day}</span>
                    </div>
                </div>
            `;
        });
        
        displayElement.innerHTML = html;
    },
    
    // 獲取指定時區的時間
    getTimeInTimezone(timezone) {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('zh-TW', {
            timeZone: timezone,
            hour12: !this.is24HourFormat(),
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const dateFormatter = new Intl.DateTimeFormat('zh-TW', {
            timeZone: timezone,
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const dayFormatter = new Intl.DateTimeFormat('zh-TW', {
            timeZone: timezone,
            weekday: 'long'
        });
        
        return {
            formatted: formatter.format(now),
            date: dateFormatter.format(now),
            day: dayFormatter.format(now),
            raw: now
        };
    },
    
    // 獲取顯示的時區
    getDisplayTimezones() {
        const displayTimezones = ['local', 'taipei'];
        
        // 添加已選擇的其他時區
        const selectedTimezones = JSON.parse(localStorage.getItem('selectedTimezones') || '[]');
        selectedTimezones.forEach(tz => {
            if (this.timezones[tz] && !displayTimezones.includes(tz)) {
                displayTimezones.push(tz);
            }
        });
        
        return displayTimezones;
    },
    
    // 切換時區顯示
    toggleTimezone(timezoneKey) {
        const selectedTimezones = JSON.parse(localStorage.getItem('selectedTimezones') || '[]');
        const index = selectedTimezones.indexOf(timezoneKey);
        
        // 更新按鈕樣式
        const button = document.querySelector(`.timezone-btn[data-timezone="${timezoneKey}"]`);
        
        if (index === -1) {
            // 添加時區
            selectedTimezones.push(timezoneKey);
            if (button) {
                button.style.background = '#1a237e';
                button.style.color = 'white';
            }
        } else {
            // 移除時區
            selectedTimezones.splice(index, 1);
            if (button) {
                button.style.background = '#e9ecef';
                button.style.color = '#6c757d';
            }
        }
        
        localStorage.setItem('selectedTimezones', JSON.stringify(selectedTimezones));
        
        // 更新時間顯示
        this.updateTimeDisplay();
        
        // 顯示通知
        const timezone = this.timezones[timezoneKey];
        const action = index === -1 ? '已添加' : '已移除';
        this.showNotification(`${action} ${timezone.name}`, 'info');
    },
    
    // 檢查是否為24小時制
    is24HourFormat() {
        return localStorage.getItem('timeFormat24h') === 'true';
    },
    
    // 切換時間格式
    toggleTimeFormat() {
        const is24h = !this.is24HourFormat();
        localStorage.setItem('timeFormat24h', is24h.toString());
        
        // 更新時間顯示
        this.updateTimeDisplay();
        
        // 更新按鈕文字
        const button = document.getElementById('toggle-24h');
        if (button) {
            button.textContent = is24h ? '切換12小時制' : '切換24小時制';
        }
        
        this.showNotification(is24h ? '已切換到24小時制' : '已切換到12小時制', 'info');
    },
    
    // 開始時間更新
    startTimeUpdates() {
        // 立即更新一次
        this.updateTimeDisplay();
        
        // 每秒更新一次
        setInterval(() => {
            this.updateTimeDisplay();
        }, 1000);
    },
    
    // 設定事件監聽
    setupEventListeners() {
        // 24小時制切換按鈕
        const toggle24hBtn = document.getElementById('toggle-24h');
        if (toggle24hBtn) {
            toggle24hBtn.addEventListener('click', () => {
                this.toggleTimeFormat();
            });
            
            // 設定按鈕初始文字
            toggle24hBtn.textContent = this.is24HourFormat() ? '切換12小時制' : '切換24小時制';
        }
        
        // 關閉按鈕
        const closeBtn = document.getElementById('close-time-display');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeDisplay();
            });
        }
        
        // 載入已選擇的時區按鈕樣式
        const selectedTimezones = JSON.parse(localStorage.getItem('selectedTimezones') || '[]');
        selectedTimezones.forEach(tz => {
            const button = document.querySelector(`.timezone-btn[data-timezone="${tz}"]`);
            if (button) {
                button.style.background = '#1a237e';
                button.style.color = 'white';
            }
        });
    },
    
    // 顯示通知
    showNotification(message, type = 'info') {
        console.log(`📢 ${type}: ${message}`);
        
        // 簡單的console通知
        if (type === 'success') {
            console.log(`✅ ${message}`);
        } else if (type === 'error') {
            console.error(`❌ ${message}`);
        }
    },
    
    // 關閉顯示
    closeDisplay() {
        const displayElement = document.getElementById('dual-time-display');
        if (displayElement) {
            displayElement.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (displayElement.parentNode) {
                    displayElement.parentNode.removeChild(displayElement);
                }
            }, 300);
        }
    },
    
    // 打開顯示
    openDisplay() {
        this.createTimeDisplayUI();
    }
};

// 初始化函數
window.initDualTimeDisplay = function() {
    dualTimeDisplay.init();
};

// 打開顯示函數
window.openDualTimeDisplay = function() {
    dualTimeDisplay.openDisplay();
};

// 關閉顯示函數
window.closeDualTimeDisplay = function() {
    dualTimeDisplay.closeDisplay();
};

// 自動初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        dualTimeDisplay.init();
    });
} else {
    dualTimeDisplay.init();
}