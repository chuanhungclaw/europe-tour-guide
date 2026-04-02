// 歐洲隨身導遊網站 - 修復版 app.js
(function() {
    console.log('🚀 歐洲隨身導遊網站啟動...');
    
    // 等待 DOM 完全載入
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        console.log('✅ DOM 已載入，開始初始化...');
        
        try {
            // 檢查數據是否載入
            if (typeof europeTourData === 'undefined') {
                console.error('❌ europeTourData 未定義');
                showError('行程數據載入失敗，請刷新頁面');
                return;
            }
            
            if (typeof enhancedTourData === 'undefined') {
                console.warn('⚠️ enhancedTourData 未定義，使用基本數據');
            }
            
            // 初始化功能
            initializeDate();
            loadTodayItinerary();
            loadFullItinerary();
            loadPracticalTips();
            setupNavigation();
            setupButtons();
            setupToolbar();
            
            // 初始化檢查清單
            if (typeof initializeChecklist === 'function') {
                initializeChecklist();
            }
            
            console.log('✅ 網站初始化完成');
            showNotification('網站載入完成！', 'success');
            
        } catch (error) {
            console.error('❌ 初始化錯誤:', error);
            showError('網站初始化失敗: ' + error.message);
        }
    }
    
    // 初始化日期顯示
    function initializeDate() {
        try {
            const today = new Date('2026-04-01');
            const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
            const dateStr = today.toLocaleDateString('zh-TW', options);
            
            const dateEl = document.getElementById('currentDate');
            const dayEl = document.getElementById('dayNumber');
            
            if (dateEl) dateEl.textContent = dateStr;
            if (dayEl) dayEl.textContent = '1';
            
        } catch (error) {
            console.error('日期初始化錯誤:', error);
        }
    }
    
    // 載入今日行程
    function loadTodayItinerary() {
        try {
            const todayData = europeTourData.itinerary[0];
            
            // 更新今日標題
            const titleEl = document.getElementById('todayTitle');
            if (titleEl) titleEl.textContent = todayData.title;
            
            // 更新時間軸
            const timelineContainer = document.querySelector('.today-timeline');
            if (timelineContainer) {
                timelineContainer.innerHTML = '';
                todayData.timeline.forEach(item => {
                    timelineContainer.appendChild(createTimelineItem(item));
                });
            }
            
            // 更新提醒
            const alertsContainer = document.getElementById('todayAlerts');
            if (alertsContainer) {
                alertsContainer.innerHTML = '';
                todayData.alerts.forEach(alert => {
                    alertsContainer.appendChild(createAlertItem(alert));
                });
            }
            
            // 更新明日預告
            if (todayData.nextDayPreview) {
                const nextPreview = document.getElementById('nextDayPreview');
                if (nextPreview) {
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
            
        } catch (error) {
            console.error('載入今日行程錯誤:', error);
        }
    }
    
    // 載入完整行程
    function loadFullItinerary() {
        try {
            const container = document.querySelector('.itinerary-container');
            if (!container) {
                console.error('找不到 itinerary-container');
                return;
            }
            
            container.innerHTML = '';
            
            europeTourData.itinerary.forEach(day => {
                const card = createItineraryCard(day);
                container.appendChild(card);
            });
            
            console.log(`✅ 載入 ${europeTourData.itinerary.length} 天行程`);
            
        } catch (error) {
            console.error('載入完整行程錯誤:', error);
            showError('無法載入行程數據');
        }
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
        try {
            const tipsData = enhancedTourData || europeTourData;
            
            // 行李準備
            const luggageTips = document.querySelector('#tips .tip-category:nth-child(1) .tip-list');
            if (luggageTips && tipsData.practicalTips) {
                luggageTips.innerHTML = tipsData.practicalTips.luggage.map(tip => `
                    <div class="tip-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${tip}</span>
                    </div>
                `).join('');
            }
            
            // 飲食建議
            const foodTips = document.querySelector('#tips .tip-category:nth-child(2) .tip-list');
            if (foodTips && tipsData.practicalTips) {
                foodTips.innerHTML = tipsData.practicalTips.food.map(tip => `
                    <div class="tip-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${tip}</span>
                    </div>
                `).join('');
            }
            
            // 其他分類...
            
        } catch (error) {
            console.error('載入實用提醒錯誤:', error);
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
    
    // 設定導航事件
    function setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                navLinks.forEach(l => l.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));
                
                this.classList.add('active');
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.classList.add('active');
                    updateToolbar(targetId);
                    
                    // 如果切換到地圖頁面，初始化地圖
                    if (targetId === 'map' && typeof initializeMap === 'function') {
                        // 延遲初始化，確保容器可見
                        setTimeout(() => {
                            initializeMap();
                        }, 300);
                    }
                }
            });
        });
    }
    
    // 設定按鈕事件
    function setupButtons() {
        // 前一天/後一天按鈕
        const prevBtn = document.getElementById('prevDay');
        const nextBtn = document.getElementById('nextDay');
        
        if (prevBtn) prevBtn.addEventListener('click', () => showNotification('前一天功能', 'info'));
        if (nextBtn) nextBtn.addEventListener('click', () => showNotification('後一天功能', 'info'));
        
        // 同步按鈕
        const syncBtn = document.getElementById('syncBtn');
        if (syncBtn) syncBtn.addEventListener('click', () => showNotification('行程同步完成！', 'success'));
        
        // 離線模式切換
        const offlineBtn = document.getElementById('offlineToggle');
        if (offlineBtn) {
            offlineBtn.addEventListener('click', function() {
                const isOffline = this.classList.toggle('active');
                this.innerHTML = isOffline ? 
                    '<i class="fas fa-wifi-slash"></i> 離線模式' : 
                    '<i class="fas fa-wifi"></i> 離線模式';
                showNotification(isOffline ? '已啟用離線模式' : '已關閉離線模式', 'info');
            });
        }
    }
    
    // 設定底部工具列
    function setupToolbar() {
        const toolButtons = document.querySelectorAll('.tool-btn');
        
        toolButtons.forEach(button => {
            button.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-section');
                
                toolButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                const targetSection = document.getElementById(sectionId);
                
                if (targetSection) {
                    targetSection.classList.add('active');
                    
                    // 更新導航欄
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
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
        if (!notification) return;
        
        const titleEl = notification.querySelector('.notification-title');
        const messageEl = notification.querySelector('.notification-message');
        const iconEl = notification.querySelector('.notification-icon');
        
        if (titleEl) titleEl.textContent = type === 'success' ? '成功' : 
                                         type === 'warning' ? '警告' : 
                                         type === 'error' ? '錯誤' : '資訊';
        if (messageEl) messageEl.textContent = message;
        
        if (iconEl) {
            iconEl.className = 'notification-icon ' + 
                (type === 'success' ? 'fas fa-check-circle' :
                 type === 'warning' ? 'fas fa-exclamation-triangle' :
                 type === 'error' ? 'fas fa-times-circle' : 'fas fa-info-circle');
        }
        
        notification.className = `notification show ${type}`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
        
        notification.querySelector('.notification-close')?.addEventListener('click', function() {
            notification.classList.remove('show');
        });
    }
    
    // 顯示錯誤
    function showError(message) {
        showNotification(message, 'error');
        
        // 在頁面顯示錯誤訊息
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: #ffebee;
            color: #c62828;
            padding: 15px;
            margin: 20px;
            border-radius: 8px;
            border-left: 4px solid #c62828;
        `;
        errorDiv.innerHTML = `
            <strong>網站載入錯誤:</strong><br>
            ${message}<br>
            <small>請刷新頁面或聯繫支援</small>
        `;
        
        const main = document.querySelector('main');
        if (main) {
            main.insertBefore(errorDiv, main.firstChild);
        }
    }
    
})();