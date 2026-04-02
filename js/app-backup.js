// 歐洲隨身導遊網站 - 主應用邏輯
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 歐洲隨身導遊網站啟動...');
    
    // 初始化日期
    initializeDate();
    
    // 載入今日行程
    loadTodayItinerary();
    
    // 載入完整行程
    loadFullItinerary();
    
    // 載入實用提醒
    loadPracticalTips();
    
    // 設定導航事件
    setupNavigation();
    
    // 設定按鈕事件
    setupButtons();
    
    // 設定底部工具列
    setupToolbar();
});

// 初始化日期顯示
function initializeDate() {
    const today = new Date('2026-04-01'); // 行程第一天
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const dateStr = today.toLocaleDateString('zh-TW', options);
    
    document.getElementById('currentDate').textContent = dateStr;
    document.getElementById('dayNumber').textContent = '1';
}

// 載入今日行程
function loadTodayItinerary() {
    const todayData = europeTourData.itinerary[0]; // 第一天
    
    // 更新今日標題
    document.getElementById('todayTitle').textContent = todayData.title;
    
    // 更新時間軸
    const timelineContainer = document.querySelector('.today-timeline');
    timelineContainer.innerHTML = '';
    
    todayData.timeline.forEach(item => {
        const timelineItem = createTimelineItem(item);
        timelineContainer.appendChild(timelineItem);
    });
    
    // 更新提醒
    const alertsContainer = document.getElementById('todayAlerts');
    alertsContainer.innerHTML = '';
    
    todayData.alerts.forEach(alert => {
        const alertItem = createAlertItem(alert);
        alertsContainer.appendChild(alertItem);
    });
    
    // 更新明日預告
    if (todayData.nextDayPreview) {
        const nextPreview = document.getElementById('nextDayPreview');
        nextPreview.innerHTML = `
            <div class="next-title">${todayData.nextDayPreview.title}</div>
            <div class="next-summary">${todayData.nextDayPreview.summary}</div>
            <div class="next-highlights">
                ${todayData.nextDayPreview.highlights.map(h => `
                    <div class="next-highlight">
                        <i class="${h.icon}"></i>
                        <span>${h.text}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

// 創建時間軸項目
function createTimelineItem(item) {
    const div = document.createElement('div');
    div.className = 'timeline-item';
    
    div.innerHTML = `
        <div class="timeline-time">${item.time}</div>
        <div class="timeline-content ${item.important ? 'current' : ''}">
            <div class="timeline-title">
                <i class="${item.icon}"></i>
                ${item.title}
            </div>
            <div class="timeline-desc">${item.description}</div>
        </div>
    `;
    
    return div;
}

// 創建提醒項目
function createAlertItem(alert) {
    const div = document.createElement('div');
    div.className = `alert-item ${alert.type}`;
    
    div.innerHTML = `
        <div class="alert-icon">
            <i class="${alert.icon}"></i>
        </div>
        <div class="alert-text">
            <h4>${alert.title}</h4>
            <p>${alert.message}</p>
        </div>
    `;
    
    return div;
}

// 載入完整行程
function loadFullItinerary() {
    const container = document.querySelector('.itinerary-container');
    container.innerHTML = '';
    
    europeTourData.itinerary.forEach(day => {
        const card = createItineraryCard(day);
        container.appendChild(card);
    });
}

// 創建行程卡片
function createItineraryCard(day) {
    const div = document.createElement('div');
    div.className = `itinerary-card ${day.isCurrent ? 'current' : ''} ${day.day < 1 ? 'past' : ''}`;
    
    // 住宿資訊
    const accommodation = day.accommodation ? `
        <div class="detail-item">
            <i class="fas fa-hotel detail-icon"></i>
            <div>
                <strong>住宿:</strong> ${day.accommodation.name}
                ${day.accommodation.phone ? `<br><small>${day.accommodation.phone}</small>` : ''}
            </div>
        </div>
    ` : '';
    
    // 餐食資訊
    const meals = `
        <div class="detail-item">
            <i class="fas fa-utensils detail-icon"></i>
            <div>
                <strong>餐食:</strong> 
                早餐: ${day.meals.breakfast} | 
                午餐: ${day.meals.lunch} | 
                晚餐: ${day.meals.dinner}
            </div>
        </div>
    `;
    
    // 距離資訊
    const distance = day.distance ? `
        <div class="detail-item">
            <i class="fas fa-bus detail-icon"></i>
            <div><strong>車程:</strong> ${day.distance}</div>
        </div>
    ` : '';
    
    div.innerHTML = `
        <div class="day-header">
            <div class="day-number">${day.day}</div>
            <div class="day-date">${day.date} (${day.weekday})</div>
            ${day.isTravelDay ? '<span class="tag travel"><i class="fas fa-plane"></i> 移動日</span>' : ''}
        </div>
        
        <h3 class="day-title">${day.title}</h3>
        <p class="day-summary">${day.summary}</p>
        
        <div class="day-details">
            ${accommodation}
            ${meals}
            ${distance}
        </div>
        
        ${day.alerts && day.alerts.length > 0 ? `
            <div class="day-alerts">
                ${day.alerts.map(alert => `
                    <div class="mini-alert ${alert.type}">
                        <i class="${alert.icon}"></i> ${alert.title}
                    </div>
                `).join('')}
            </div>
        ` : ''}
    `;
    
    return div;
}

// 載入實用提醒
function loadPracticalTips() {
    const tipsData = enhancedTourData;
    
    // 行李準備
    const luggageTips = document.querySelector('#tips .tip-category:nth-child(1) .tip-list');
    luggageTips.innerHTML = tipsData.practicalTips.luggage.map(tip => `
        <div class="tip-item">
            <i class="fas fa-check-circle"></i>
            <span>${tip}</span>
        </div>
    `).join('');
    
    // 飲食建議
    const foodTips = document.querySelector('#tips .tip-category:nth-child(2) .tip-list');
    foodTips.innerHTML = tipsData.practicalTips.food.map(tip => `
        <div class="tip-item">
            <i class="fas fa-check-circle"></i>
            <span>${tip}</span>
        </div>
    `).join('');
    
    // 金錢與支付
    const moneyTips = document.querySelector('#tips .tip-category:nth-child(3) .tip-list');
    moneyTips.innerHTML = tipsData.practicalTips.money.map(tip => `
        <div class="tip-item">
            <i class="fas fa-check-circle"></i>
            <span>${tip}</span>
        </div>
    `).join('');
    
    // 健康與安全
    const healthTips = document.querySelector('#tips .tip-category:nth-child(4) .tip-list');
    healthTips.innerHTML = tipsData.practicalTips.health.map(tip => `
        <div class="tip-item">
            <i class="fas fa-check-circle"></i>
            <span>${tip}</span>
        </div>
    `).join('');
    
    // 拍照技巧
    const photoTips = document.querySelector('#tips .tip-category:nth-child(5) .tip-list');
    photoTips.innerHTML = tipsData.practicalTips.photography.map(tip => `
        <div class="tip-item">
            <i class="fas fa-check-circle"></i>
            <span>${tip}</span>
        </div>
    `).join('');
}

// 設定導航事件
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有 active 類別
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // 添加 active 類別
            this.classList.add('active');
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
            
            // 更新工具列
            updateToolbar(targetId);
        });
    });
}

// 設定按鈕事件
function setupButtons() {
    // 前一天/後一天按鈕
    document.getElementById('prevDay')?.addEventListener('click', function() {
        showNotification('前一天功能開發中...', 'info');
    });
    
    document.getElementById('nextDay')?.addEventListener('click', function() {
        showNotification('後一天功能開發中...', 'info');
    });
    
    // 同步按鈕
    document.getElementById('syncBtn')?.addEventListener('click', function() {
        showNotification('行程同步完成！', 'success');
    });
    
    // 離線模式切換
    document.getElementById('offlineToggle')?.addEventListener('click', function() {
        const isOffline = this.classList.toggle('active');
        this.innerHTML = isOffline ? 
            '<i class="fas fa-wifi-slash"></i> 離線模式' : 
            '<i class="fas fa-wifi"></i> 離線模式';
        showNotification(isOffline ? '已啟用離線模式' : '已關閉離線模式', 'info');
    });
}

// 設定底部工具列
function setupToolbar() {
    const toolButtons = document.querySelectorAll('.tool-btn');
    
    toolButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            
            // 更新工具列
            toolButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 顯示對應區塊
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');
            
            // 更新導航欄
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        });
    });
}

// 更新工具列
function updateToolbar(sectionId) {
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === sectionId) {
            btn.classList.add('active');
        }
    });
}

// 顯示通知
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const titleEl = notification.querySelector('.notification-title');
    const messageEl = notification.querySelector('.notification-message');
    const iconEl = notification.querySelector('.notification-icon');
    
    // 設定內容
    titleEl.textContent = type === 'success' ? '成功' : 
                         type === 'warning' ? '警告' : 
                         type === 'error' ? '錯誤' : '資訊';
    messageEl.textContent = message;
    
    // 設定圖標
    iconEl.className = 'notification-icon ' + 
        (type === 'success' ? 'fas fa-check-circle' :
         type === 'warning' ? 'fas fa-exclamation-triangle' :
         type === 'error' ? 'fas fa-times-circle' : 'fas fa-info-circle');
    
    // 設定樣式
    notification.className = `notification show ${type}`;
    
    // 自動關閉
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
    
    // 手動關閉
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.classList.remove('show');
    });
}

// 初始化檢查清單（如果有載入 checklist.js）
if (typeof initializeChecklist === 'function') {
    initializeChecklist();
}