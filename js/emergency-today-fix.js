// 緊急今日行程修復系統
class EmergencyTodayFix {
    constructor() {
        console.log('📅 緊急今日行程修復系統啟動...');
        this.todayData = this.getTodayData();
    }
    
    // 初始化
    init() {
        this.fixTodayContent();
        this.ensureTodayDisplay();
        this.setupTodayInteractions();
    }
    
    // 獲取今日行程數據
    getTodayData() {
        return {
            day: 1,
            title: '出發前往歐洲',
            date: '2026-04-02',
            schedule: [
                {
                    time: '15:30',
                    title: '機場集合',
                    location: '桃園國際機場第二航廈',
                    description: '請於第二航廈出境大廳集合，攜帶護照、機票、簽證等文件。',
                    icon: 'fas fa-users',
                    color: '#4cc9f0'
                },
                {
                    time: '17:00',
                    title: '辦理登機手續',
                    location: '長榮航空櫃檯',
                    description: '辦理行李托運、領取登機證，建議提前2.5小時到達。',
                    icon: 'fas fa-suitcase-rolling',
                    color: '#4361ee'
                },
                {
                    time: '18:30',
                    title: '機場晚餐',
                    location: '機場美食街',
                    description: '自由用餐時間，建議品嚐台灣特色美食。',
                    icon: 'fas fa-utensils',
                    color: '#3a86ff'
                },
                {
                    time: '20:10',
                    title: '起飛前往歐洲',
                    location: '桃園國際機場 → 維也納機場',
                    description: '航班：BR65，飛行時間約12小時，抵達維也納時間：當地時間早上6:30。',
                    icon: 'fas fa-plane-departure',
                    color: '#7209b7'
                }
            ],
            importantNotes: [
                '請確認護照有效期超過6個月',
                '攜帶歐元現金和信用卡',
                '準備歐洲轉接插頭',
                '下載離線地圖和翻譯APP'
            ],
            weather: {
                destination: '維也納，奧地利',
                temperature: '8°C',
                condition: '多雲轉晴',
                icon: 'fas fa-cloud-sun'
            }
        };
    }
    
    // 修復今日行程內容
    fixTodayContent() {
        const todayContent = document.getElementById('todayContent');
        if (!todayContent) {
            console.error('❌ 找不到今日行程容器');
            return false;
        }
        
        // 清除載入動畫
        const loadingElements = todayContent.querySelectorAll('.travel-loading, .loading-spinner');
        loadingElements.forEach(el => el.remove());
        
        // 創建今日行程內容
        todayContent.innerHTML = this.generateTodayHTML();
        
        console.log('✅ 今日行程內容修復完成');
        return true;
    }
    
    // 生成今日行程HTML
    generateTodayHTML() {
        const data = this.todayData;
        
        return `
            <div class="today-header">
                <div class="day-indicator">
                    <span class="day-number">第${data.day}天</span>
                    <span class="day-title">${data.title}</span>
                </div>
                <div class="today-date">
                    <i class="fas fa-calendar"></i>
                    <span>${data.date}</span>
                </div>
            </div>
            
            <div class="schedule-timeline">
                ${data.schedule.map((item, index) => `
                    <div class="schedule-item" data-index="${index}">
                        <div class="timeline-marker">
                            <div class="marker-icon" style="background: ${item.color};">
                                <i class="${item.icon}"></i>
                            </div>
                            <div class="timeline-line"></div>
                        </div>
                        <div class="schedule-details">
                            <div class="schedule-time">
                                <i class="fas fa-clock"></i>
                                <strong>${item.time}</strong>
                            </div>
                            <div class="schedule-title">
                                <h4>${item.title}</h4>
                                <p class="schedule-location">
                                    <i class="fas fa-map-marker-alt"></i>
                                    ${item.location}
                                </p>
                            </div>
                            <div class="schedule-description">
                                <p>${item.description}</p>
                            </div>
                            <button class="schedule-details-btn" onclick="this.toggleScheduleDetails(${index})">
                                <i class="fas fa-chevron-down"></i>
                                詳細資訊
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="today-sidebar">
                <div class="weather-card">
                    <div class="weather-header">
                        <h4><i class="fas fa-cloud-sun"></i> 目的地天氣</h4>
                    </div>
                    <div class="weather-content">
                        <div class="weather-icon">
                            <i class="${data.weather.icon}"></i>
                        </div>
                        <div class="weather-info">
                            <div class="weather-temperature">
                                <strong>${data.weather.temperature}</strong>
                            </div>
                            <div class="weather-condition">
                                ${data.weather.condition}
                            </div>
                            <div class="weather-location">
                                <i class="fas fa-map-pin"></i>
                                ${data.weather.destination}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="notes-card">
                    <div class="notes-header">
                        <h4><i class="fas fa-exclamation-circle"></i> 重要提醒</h4>
                    </div>
                    <div class="notes-content">
                        <ul>
                            ${data.importantNotes.map(note => `
                                <li>
                                    <i class="fas fa-check-circle"></i>
                                    ${note}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="quick-actions">
                    <button class="quick-action-btn" onclick="alert('分享行程')">
                        <i class="fas fa-share-alt"></i>
                        分享行程
                    </button>
                    <button class="quick-action-btn" onclick="alert('設定提醒')">
                        <i class="fas fa-bell"></i>
                        設定提醒
                    </button>
                    <button class="quick-action-btn" onclick="alert('查看詳細')">
                        <i class="fas fa-info-circle"></i>
                        詳細資訊
                    </button>
                </div>
            </div>
        `;
    }
    
    // 切換行程詳細資訊
    toggleScheduleDetails(index) {
        const scheduleItem = document.querySelector(`.schedule-item[data-index="${index}"]`);
        if (!scheduleItem) return;
        
        const detailsBtn = scheduleItem.querySelector('.schedule-details-btn');
        const description = scheduleItem.querySelector('.schedule-description');
        
        if (description.style.display === 'none' || !description.style.display) {
            description.style.display = 'block';
            detailsBtn.innerHTML = '<i class="fas fa-chevron-up"></i> 收起資訊';
            detailsBtn.classList.add('active');
        } else {
            description.style.display = 'none';
            detailsBtn.innerHTML = '<i class="fas fa-chevron-down"></i> 詳細資訊';
            detailsBtn.classList.remove('active');
        }
    }
    
    // 確保今日行程顯示
    ensureTodayDisplay() {
        setTimeout(() => {
            const todayContent = document.getElementById('todayContent');
            if (todayContent && todayContent.innerHTML.trim() === '') {
                console.log('🔄 重新初始化今日行程...');
                this.fixTodayContent();
            }
        }, 1000);
    }
    
    // 設置今日行程交互
    setupTodayInteractions() {
        // 添加樣式
        this.addTodayStyles();
        
        // 添加事件監聽
        setTimeout(() => {
            this.addEventListeners();
        }, 500);
    }
    
    // 添加今日行程樣式
    addTodayStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* 今日行程修復樣式 */
            .today-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;
                padding-bottom: 16px;
                border-bottom: 2px solid #f0f2f5;
            }
            
            .day-indicator {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            
            .day-number {
                font-size: 1.8rem;
                font-weight: 800;
                color: #4cc9f0;
                line-height: 1;
            }
            
            .day-title {
                font-size: 1.2rem;
                font-weight: 600;
                color: #333;
            }
            
            .today-date {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 16px;
                background: #e6f7ff;
                border-radius: 12px;
                color: #4cc9f0;
                font-weight: 600;
            }
            
            .today-date i {
                font-size: 1.2rem;
            }
            
            .schedule-timeline {
                display: flex;
                flex-direction: column;
                gap: 20px;
                margin-bottom: 24px;
            }
            
            .schedule-item {
                display: flex;
                gap: 16px;
                padding: 16px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .schedule-item:hover {
                transform: translateX(5px);
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            }
            
            .timeline-marker {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
            }
            
            .marker-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.2rem;
                z-index: 2;
            }
            
            .timeline-line {
                width: 2px;
                height: calc(100% + 20px);
                background: #f0f2f5;
                position: absolute;
                top: 40px;
                z-index: 1;
            }
            
            .schedule-details {
                flex: 1;
            }
            
            .schedule-time {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 8px;
                color: #666;
            }
            
            .schedule-time strong {
                color: #333;
                font-size: 1.1rem;
            }
            
            .schedule-title h4 {
                color: #333;
                margin-bottom: 4px;
                font-size: 1.2rem;
            }
            
            .schedule-location {
                color: #666;
                font-size: 0.9rem;
                margin-bottom: 12px;
            }
            
            .schedule-description {
                padding: 12px;
                background: #f8f9fa;
                border-radius: 8px;
                margin-top: 8px;
                display: none;
            }
            
            .schedule-description p {
                color: #666;
                margin: 0;
                line-height: 1.5;
            }
            
            .schedule-details-btn {
                margin-top: 12px;
                padding: 8px 16px;
                background: #4cc9f0;
                color: white;
                border: none;
                border-radius: 20px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .schedule-details-btn:hover {
                background: #3ab8e0;
                transform: translateY(-2px);
            }
            
            .schedule-details-btn.active {
                background: #4361ee;
            }
            
            .today-sidebar {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            
            .weather-card, .notes-card {
                background: white;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            }
            
            .weather-header, .notes-header {
                margin-bottom: 16px;
            }
            
            .weather-header h4, .notes-header h4 {
                color: #333;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .weather-content {
                display: flex;
                align-items: center;
                gap: 16px;
            }
            
            .weather-icon {
                font-size: 2.5rem;
                color: #4cc9f0;
            }
            
            .weather-temperature strong {
                font-size: 1.8rem;
                color: #333;
            }
            
            .weather-condition {
                color: #666;
                margin: 4px 0;
            }
            
            .weather-location {
                color: #999;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            
            .notes-content ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .notes-content li {
                padding: 8px 0;
                color: #666;
                display: flex;
                align-items: center;
                gap: 8px;
                border-bottom: 1px solid #f0f2f5;
            }
            
            .notes-content li:last-child {
                border-bottom: none;
            }
            
            .notes-content li i {
                color: #4cc9f0;
            }
            
            .quick-actions {
                display: flex;
                gap: 12px;
                margin-top: 20px;
            }
            
            .quick-action-btn {
                flex: 1;
                padding: 12px;
                background: #f8f9fa;
                border: 2px solid #f0f2f5;
                border-radius: 12px;
                color: #666;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
            }
            
            .quick-action-btn:hover {
                background: #4cc9f0;
                color: white;
                border-color: #4cc9f0;
                transform: translateY(-3px);
            }
            
            .quick-action-btn i {
                font-size: 1.2rem;
            }
            
            @media (min-width: 768px) {
                .today-content {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 32px;
                }
                
                .schedule-timeline {
                    grid-column: 1;
                }
                
                .today-sidebar {
                    grid-column: 2;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // 添加事件監聽
    addEventListeners() {
        // 行程項目點擊事件
        const scheduleItems = document.querySelectorAll('.schedule-item');
        scheduleItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.schedule-details-btn')) {
                    const index = item.getAttribute('data-index');
                    this.toggleScheduleDetails(index);
                }
            });
        });
        
        // 詳細資訊按鈕事件
        const detailButtons = document.querySelectorAll('.schedule-details-btn');
        detailButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const item = e.target.closest('.schedule-item');
                const index = item.getAttribute('data-index');
                this.toggleScheduleDetails(index);
            });
        });
    }
}

// 立即初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('📅 啟動緊急今日行程修復系統...');
    window.emergencyTodayFix = new EmergencyTodayFix();
    window.emergencyTodayFix.init();
    
    console.log('✅ 緊急今日行程修復系統已就緒');
});

// 提供調試功能
window.debugTodayFix = function() {
    if (window.emergencyTodayFix) {
        console.log('🔍 緊急今日行程修復系統狀態：正常');
        console.log('今日數據：', window.emergencyTodayFix.todayData);
        return window.emergencyTodayFix;
    } else {
        console.error('❌ 緊急今日行程修復系統未初始化');
        return null;
    }
};