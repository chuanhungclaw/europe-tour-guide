// 日期自動切換功能
const dateAutoSwitch = {
    // 行程開始日期（假設行程從某個固定日期開始）
    startDate: new Date('2026-04-01'), // 可根據實際行程調整
    
    // 行程天數對應
    dayMapping: {
        // 行程第幾天對應的實際日期
        1: '2026-04-01',
        2: '2026-04-02',
        3: '2026-04-03',
        4: '2026-04-04',
        5: '2026-04-05',
        6: '2026-04-06',
        7: '2026-04-07',
        8: '2026-04-08',
        9: '2026-04-09',
        10: '2026-04-10'
    },
    
    // 初始化
    init() {
        console.log('📅 初始化日期自動切換...');
        
        // 計算當前是第幾天
        const currentDay = this.calculateCurrentDay();
        console.log(`✅ 當前是行程第 ${currentDay} 天`);
        
        // 更新UI顯示
        this.updateDayDisplay(currentDay);
        
        // 載入對應天的行程
        this.loadDayItinerary(currentDay);
        
        // 設定自動更新
        this.setupAutoUpdate();
    },
    
    // 計算當前是第幾天
    calculateCurrentDay() {
        const now = new Date();
        const start = new Date(this.startDate);
        
        // 計算天數差
        const timeDiff = now.getTime() - start.getTime();
        const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1; // +1因為第一天是1
        
        // 限制範圍在1-10天
        if (dayDiff < 1) return 1;
        if (dayDiff > 10) return 10;
        
        return dayDiff;
    },
    
    // 更新天數顯示
    updateDayDisplay(day) {
        // 更新頁面標題
        const dayTitle = document.querySelector('.day-title');
        if (dayTitle) {
            dayTitle.textContent = `第 ${day} 天`;
        }
        
        // 更新日期顯示
        const dateElement = document.querySelector('.current-date');
        if (dateElement) {
            const today = new Date();
            const formattedDate = today.toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            });
            dateElement.textContent = formattedDate;
        }
        
        // 更新進度指示器
        this.updateProgressIndicator(day);
    },
    
    // 更新進度指示器
    updateProgressIndicator(day) {
        const progressBar = document.querySelector('.day-progress');
        if (progressBar) {
            const progress = (day / 10) * 100;
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute('aria-valuenow', progress);
        }
        
        // 更新進度文字
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `行程進度: ${day}/10 天 (${Math.round((day/10)*100)}%)`;
        }
    },
    
    // 載入對應天的行程
    loadDayItinerary(day) {
        console.log(`📋 載入第 ${day} 天行程...`);
        
        // 根據天數載入對應的行程數據
        const itineraryData = this.getItineraryByDay(day);
        
        // 更新今日行程區塊
        this.updateTodayItinerary(itineraryData);
        
        // 更新明日預告
        if (day < 10) {
            this.updateTomorrowPreview(day + 1);
        }
        
        // 更新景點攻略系統
        this.updateAttractionGuide(day);
    },
    
    // 根據天數獲取行程數據
    getItineraryByDay(day) {
        // 這裡應該從你的行程數據中獲取
        // 暫時使用模擬數據
        const itineraryData = {
            day: day,
            title: `第 ${day} 天行程`,
            activities: [
                {
                    time: '08:00',
                    title: '早餐',
                    description: '飯店享用早餐',
                    icon: 'fas fa-utensils'
                },
                {
                    time: '09:00',
                    title: '景點參觀',
                    description: '參觀當地著名景點',
                    icon: 'fas fa-camera'
                },
                {
                    time: '12:00',
                    title: '午餐',
                    description: '品嘗當地特色美食',
                    icon: 'fas fa-utensils'
                },
                {
                    time: '14:00',
                    title: '自由活動',
                    description: '自由探索或購物',
                    icon: 'fas fa-shopping-bag'
                },
                {
                    time: '18:00',
                    title: '晚餐',
                    description: '晚餐時間',
                    icon: 'fas fa-utensils'
                }
            ],
            highlights: [
                '重點景點參觀',
                '當地美食體驗',
                '文化深度體驗'
            ]
        };
        
        return itineraryData;
    },
    
    // 更新今日行程
    updateTodayItinerary(data) {
        const container = document.querySelector('.today-itinerary');
        if (!container) return;
        
        let html = `
            <div class="itinerary-header">
                <h3>${data.title}</h3>
                <div class="day-highlights">
                    ${data.highlights.map(highlight => `
                        <span class="highlight-tag">${highlight}</span>
                    `).join('')}
                </div>
            </div>
            <div class="timeline">
        `;
        
        data.activities.forEach(activity => {
            html += `
                <div class="timeline-item">
                    <div class="timeline-time">${activity.time}</div>
                    <div class="timeline-content">
                        <div class="timeline-icon">
                            <i class="${activity.icon}"></i>
                        </div>
                        <div class="timeline-details">
                            <h4>${activity.title}</h4>
                            <p>${activity.description}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    },
    
    // 更新明日預告
    updateTomorrowPreview(nextDay) {
        const previewContainer = document.querySelector('.tomorrow-preview');
        if (!previewContainer) return;
        
        const tomorrowData = this.getItineraryByDay(nextDay);
        
        previewContainer.innerHTML = `
            <div class="preview-header">
                <h4><i class="fas fa-calendar-alt"></i> 明日預告</h4>
                <span class="preview-day">第 ${nextDay} 天</span>
            </div>
            <div class="preview-content">
                <p><strong>${tomorrowData.title}</strong></p>
                <div class="preview-highlights">
                    ${tomorrowData.highlights.slice(0, 2).map(highlight => `
                        <span class="preview-tag">${highlight}</span>
                    `).join('')}
                </div>
                <div class="preview-activities">
                    ${tomorrowData.activities.slice(0, 3).map(activity => `
                        <div class="preview-activity">
                            <i class="${activity.icon}"></i>
                            <span>${activity.time} ${activity.title}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    // 更新景點攻略系統
    updateAttractionGuide(currentDay) {
        // 如果有景點攻略系統，更新顯示
        if (typeof updateAttractionGuideDisplay === 'function') {
            updateAttractionGuideDisplay(currentDay);
        }
    },
    
    // 設定自動更新
    setupAutoUpdate() {
        // 每小時檢查一次是否需要更新天數
        setInterval(() => {
            const currentDay = this.calculateCurrentDay();
            const currentDisplay = document.querySelector('.day-title')?.textContent;
            
            if (currentDisplay && !currentDisplay.includes(`第 ${currentDay} 天`)) {
                console.log('🔄 檢測到日期變化，更新行程...');
                this.updateDayDisplay(currentDay);
                this.loadDayItinerary(currentDay);
            }
        }, 60 * 60 * 1000); // 每小時檢查一次
    },
    
    // 手動切換天數（供用戶手動調整）
    switchToDay(day) {
        if (day < 1 || day > 10) {
            console.error('❌ 天數必須在1-10之間');
            return false;
        }
        
        console.log(`🔄 手動切換到第 ${day} 天`);
        this.updateDayDisplay(day);
        this.loadDayItinerary(day);
        
        // 儲存用戶選擇
        localStorage.setItem('manualDaySelection', day);
        
        return true;
    },
    
    // 恢復自動計算
    resetToAuto() {
        localStorage.removeItem('manualDaySelection');
        const currentDay = this.calculateCurrentDay();
        this.updateDayDisplay(currentDay);
        this.loadDayItinerary(currentDay);
    },
    
    // 獲取當前顯示的天數
    getCurrentDisplayDay() {
        const manualSelection = localStorage.getItem('manualDaySelection');
        if (manualSelection) {
            return parseInt(manualSelection);
        }
        return this.calculateCurrentDay();
    }
};

// 初始化函數
window.initDateAutoSwitch = function() {
    dateAutoSwitch.init();
};

// 手動切換函數
window.switchToDay = function(day) {
    return dateAutoSwitch.switchToDay(day);
};

// 恢復自動函數
window.resetToAutoDate = function() {
    dateAutoSwitch.resetToAuto();
};

// 自動初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        dateAutoSwitch.init();
    });
} else {
    dateAutoSwitch.init();
}