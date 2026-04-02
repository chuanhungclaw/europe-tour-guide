// 完整行程顯示系統
class FullItineraryDisplay {
    constructor() {
        this.itineraryContainer = null;
        this.currentDay = 1;
        
        console.log('📅 完整行程顯示系統初始化...');
    }
    
    // 初始化
    init() {
        // 等待DOM載入
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    // 設置
    setup() {
        // 找到完整行程區域
        const itinerarySection = document.getElementById('itinerary');
        if (!itinerarySection) {
            console.error('❌ 完整行程區域未找到');
            return;
        }
        
        // 創建完整顯示
        this.createFullDisplay(itinerarySection);
        
        // 載入並顯示資料
        this.loadAndDisplayItinerary();
        
        console.log('✅ 完整行程顯示系統設置完成');
    }
    
    // 創建完整顯示
    createFullDisplay(container) {
        // 清除原有內容
        container.innerHTML = '';
        
        const fullHTML = `
            <div class="full-itinerary-container">
                <div class="full-itinerary-header">
                    <h1 class="full-itinerary-title">
                        <i class="fas fa-calendar-alt"></i>
                        完整行程 - 10天歐洲四國之旅
                    </h1>
                    <p class="full-itinerary-description">
                        從台灣出發，探索匈牙利、斯洛伐克、奧地利、捷克四國
                    </p>
                </div>
                
                <!-- 行程天數導航 -->
                <div class="itinerary-day-nav" id="itineraryDayNav">
                    <!-- 天數按鈕將由JS動態生成 -->
                </div>
                
                <!-- 行程內容顯示區 -->
                <div class="itinerary-content-container" id="itineraryContent">
                    <!-- 內容將由JS動態生成 -->
                    <div class="itinerary-loading">
                        <i class="fas fa-spinner fa-spin"></i>
                        載入行程資料中...
                    </div>
                </div>
                
                <!-- 行程摘要 -->
                <div class="itinerary-summary">
                    <div class="summary-item">
                        <i class="fas fa-plane-departure"></i>
                        <span>出發地：台灣桃園國際機場</span>
                    </div>
                    <div class="summary-item">
                        <i class="fas fa-plane-arrival"></i>
                        <span>目的地：匈牙利布達佩斯</span>
                    </div>
                    <div class="summary-item">
                        <i class="fas fa-clock"></i>
                        <span>總天數：10天</span>
                    </div>
                    <div class="summary-item">
                        <i class="fas fa-map-marked-alt"></i>
                        <span>遊覽國家：4國</span>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = fullHTML;
        this.itineraryContainer = document.getElementById('itineraryContent');
    }
    
    // 載入並顯示行程
    loadAndDisplayItinerary() {
        if (!window.europeTourData) {
            console.error('❌ 行程資料庫未載入');
            this.showError();
            return;
        }
        
        // 生成天數導航
        this.generateDayNav();
        
        // 顯示第1天行程

        this.displayDay(1);
    }
    
    // 生成天數導航
    generateDayNav() {
        const navContainer = document.getElementById('itineraryDayNav');
        if (!navContainer) return;
        
        let navHTML = '<div class="day-nav-buttons">';
        
        for (let day = 1; day <= 10; day++) {
            navHTML += `
                <button class="day-nav-btn" data-day="${day}" onclick="window.fullItineraryDisplay.displayDay(${day})">
                    第${day}天
                </button>
            `;
        }
        
        navHTML += '</div>';
        navContainer.innerHTML = navHTML;
        
        // 設置第1天為活動狀態

        const firstBtn = navContainer.querySelector('.day-nav-btn');
        if (firstBtn) firstBtn.classList.add('active');
    }
    
    // 顯示指定天數的行程

    displayDay(day) {
        if (!this.itineraryContainer || !window.europeTourData || !window.europeTourData.itinerary) return;
        
        const dayData = window.europeTourData.itinerary[day - 1];
        if (!dayData) return;
        
        this.currentDay = day;
        
        let contentHTML = `
            <div class="itinerary-day-detail">
                <div class="day-detail-header">
                    <h2 class="day-detail-title">${dayData.title}</h2>
                    <p class="day-detail-subtitle">${dayData.subtitle}</p>
                </div>
                
                <div class="day-detail-content">
                    <div class="day-overview">
                        <h3><i class="fas fa-info-circle"></i> 行程概覽</h3>
                        <p>${dayData.description}</p>
                    </div>
                    
                    <div class="day-schedule">
                        <h3><i class="fas fa-clock"></i> 詳細時間表</h3>
                        <div class="schedule-items">
        `;
        
        // 生成時間表項目

        if (dayData.schedule && dayData.schedule.length > 0) {
            dayData.schedule.forEach((item, index) => {
                contentHTML += `
                    <div class="schedule-item">
                        <div class="schedule-time">${item.time}</div>
                        <div class="schedule-activity">
                            <h4>${item.activity}</h4>
                            ${item.location ? `<p class="schedule-location"><i class="fas fa-map-marker-alt"></i> ${item.location}</p>` : ''}
                            ${item.details ? `<p class="schedule-details">${item.details}</p>` : ''}
                        </div>
                    </div>
                `;
            });
        }
        
        contentHTML += `
                        </div>
                    </div>
                    
                    <div class="day-attractions">
                        <h3><i class="fas fa-star"></i> 主要景點</h3>
                        <div class="attractions-list">
        `;
        
        // 生成景點列表

        if (dayData.attractions && dayData.attractions.length > 0) {
            dayData.attractions.forEach((attraction, index) => {
                contentHTML += `
                    <div class="attraction-item">
                        <h4>${attraction.name}</h4>
                        <p class="attraction-description">${attraction.description}</p>
                        ${attraction.tips ? `<p class="attraction-tips"><i class="fas fa-lightbulb"></i> ${attraction.tips}</p>` : ''}
                    </div>
                `;
            });
        }
        
        contentHTML += `
                        </div>
                    </div>
                    
                    <div class="day-tips">
                        <h3><i class="fas fa-exclamation-circle"></i> 重要提醒</h3>
                        <div class="tips-list">
        `;
        
        // 生成重要提醒

        if (dayData.importantTips && dayData.importantTips.length > 0) {
            dayData.importantTips.forEach((tip, index) => {
                contentHTML += `
                    <div class="tip-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${tip}</span>
                    </div>
                `;
            });
        }
        
        contentHTML += `
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.itineraryContainer.innerHTML = contentHTML;
        
        // 更新導航活動狀態

        this.updateNavActiveState(day);
    }
    
    // 更新導航活動狀態

    updateNavActiveState(day) {
        const navContainer = document.getElementById('itineraryDayNav');
        if (!navContainer) return;
        
        // 移除所有活動狀態

        navContainer.querySelectorAll('.day-nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // 添加當前活動狀態

        const activeBtn = navContainer.querySelector(`.day-nav-btn[data-day="${day}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
    
    // 顯示錯誤

    showError() {
        if (!this.itineraryContainer) return;
        
        this.itineraryContainer.innerHTML = `
            <div class="itinerary-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>無法載入行程資料</h3>
                <p>請檢查網路連線或重新整理頁面</p>
                <button class="btn btn-primary" onclick="location.reload()">
                    重新整理頁面
                </button>
            </div>
        `;
    }
}

// 創建全局實例

window.fullItineraryDisplay = new FullItineraryDisplay();

// 自動初始化

document.addEventListener('DOMContentLoaded', function() {
    window.fullItineraryDisplay.init();
});