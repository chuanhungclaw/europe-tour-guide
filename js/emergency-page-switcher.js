// 緊急頁面切換修復系統
class EmergencyPageSwitcher {
    constructor() {
        console.log('🚨 緊急頁面切換修復系統啟動...');
        this.currentSection = 'today';
        this.sections = ['today', 'itinerary', 'map', 'tips', 'checklist'];
    }
    
    // 初始化
    init() {
        this.setupNavigation();
        this.activateCurrentSection();
        this.setupBottomNav();
        
        console.log('✅ 緊急頁面切換修復系統初始化完成');
    }
    
    // 設置導航
    setupNavigation() {
        // 監聽hash變化
        window.addEventListener('hashchange', () => {
            this.handleHashChange();
        });
        
        // 初始處理當前hash
        this.handleHashChange();
    }
    
    // 處理hash變化
    handleHashChange() {
        const hash = window.location.hash.substring(1);
        
        if (this.sections.includes(hash)) {
            this.switchToSection(hash);
        } else {
            // 默認顯示今日行程
            this.switchToSection('today');
        }
    }
    
    // 切換到指定區塊
    switchToSection(sectionId) {
        // 隱藏所有區塊
        this.sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                section.classList.remove('active');
                section.style.display = 'none';
            }
        });
        
        // 顯示當前區塊
        const currentSection = document.getElementById(sectionId);
        if (currentSection) {
            currentSection.classList.add('active');
            currentSection.style.display = 'block';
            
            // 添加淡入動畫
            currentSection.style.animation = 'fadeIn 0.3s ease';
            
            // 更新當前區塊
            this.currentSection = sectionId;
            
            // 更新底部導航
            this.updateBottomNav(sectionId);
            
            console.log(`🔄 切換到區塊: ${sectionId}`);
            
            // 觸發區塊特定初始化
            this.triggerSectionInit(sectionId);
        }
    }
    
    // 觸發區塊特定初始化
    triggerSectionInit(sectionId) {
        switch(sectionId) {
            case 'today':
                this.initTodaySection();
                break;
            case 'itinerary':
                this.initItinerarySection();
                break;
            case 'map':
                this.initMapSection();
                break;
            case 'tips':
                this.initTipsSection();
                break;
            case 'checklist':
                this.initChecklistSection();
                break;
        }
    }
    
    // 初始化今日行程區塊
    initTodaySection() {
        console.log('📅 初始化今日行程區塊...');
        
        // 確保今日行程內容顯示
        const todayContent = document.getElementById('todayContent');
        if (todayContent && todayContent.innerHTML.trim() === '') {
            // 如果今日行程內容為空，觸發緊急修復
            if (window.emergencyTodayFix) {
                window.emergencyTodayFix.fixTodayContent();
            }
        }
    }
    
    // 初始化完整行程區塊
    initItinerarySection() {
        console.log('📋 初始化完整行程區塊...');
        
        // 確保完整行程內容顯示
        const itineraryContent = document.getElementById('itineraryContent');
        if (itineraryContent && itineraryContent.innerHTML.trim() === '') {
            // 如果完整行程內容為空，顯示簡單內容
            itineraryContent.innerHTML = `
                <div class="itinerary-overview">
                    <h3>10天歐洲四國之旅</h3>
                    <p>匈牙利 → 斯洛伐克 → 奧地利 → 捷克</p>
                    
                    <div class="itinerary-days">
                        ${this.generateItineraryDays()}
                    </div>
                </div>
            `;
        }
    }
    
    // 生成行程天數
    generateItineraryDays() {
        const days = [
            { day: 1, title: '出發前往歐洲', location: '台灣 → 維也納' },
            { day: 2, title: '布達佩斯', location: '匈牙利' },
            { day: 3, title: '布達佩斯', location: '匈牙利' },
            { day: 4, title: '布拉提斯拉瓦', location: '斯洛伐克' },
            { day: 5, title: '維也納', location: '奧地利' },
            { day: 6, title: '維也納', location: '奧地利' },
            { day: 7, title: '布爾諾', location: '捷克' },
            { day: 8, title: '布拉格', location: '捷克' },
            { day: 9, title: '布拉格', location: '捷克' },
            { day: 10, title: '庫倫洛夫', location: '捷克' }
        ];
        
        return days.map(day => `
            <div class="itinerary-day" data-day="${day.day}">
                <div class="day-header">
                    <span class="day-number">第${day.day}天</span>
                    <span class="day-title">${day.title}</span>
                </div>
                <div class="day-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${day.location}
                </div>
                <button class="day-details-btn" onclick="this.showDayDetails(${day.day})">
                    <i class="fas fa-info-circle"></i>
                    詳細行程
                </button>
            </div>
        `).join('');
    }
    
    // 初始化地圖區塊
    initMapSection() {
        console.log('🗺️ 初始化地圖區塊...');
        
        // 確保地圖顯示
        const mapContainer = document.getElementById('mapContainer');
        if (mapContainer && !mapContainer.querySelector('.offline-map-wrapper')) {
            // 如果地圖未顯示，觸發緊急修復
            if (window.emergencyMapFix) {
                window.emergencyMapFix.fixMapContainer();
            }
        }
    }
    
    // 初始化實用提醒區塊
    initTipsSection() {
        console.log('💡 初始化實用提醒區塊...');
        
        // 確保實用提醒內容顯示
        const tipsContent = document.getElementById('tipsContent');
        if (tipsContent && tipsContent.innerHTML.trim() === '') {
            tipsContent.innerHTML = this.generateTipsContent();
        }
    }
    
    // 生成實用提醒內容
    generateTipsContent() {
        return `
            <div class="tips-categories">
                <div class="tips-category">
                    <h3><i class="fas fa-passport"></i> 文件與證件</h3>
                    <ul>
                        <li>護照有效期需超過6個月</li>
                        <li>準備簽證或申根簽證</li>
                        <li>影印重要文件備份</li>
                        <li>購買旅遊保險</li>
                    </ul>
                </div>
                
                <div class="tips-category">
                    <h3><i class="fas fa-money-bill-wave"></i> 金錢與支付</h3>
                    <ul>
                        <li>準備歐元現金（小額鈔票）</li>
                        <li>通知銀行信用卡將在國外使用</li>
                        <li>準備國際提款卡</li>
                        <li>下載匯率轉換APP</li>
                    </ul>
                </div>
                
                <div class="tips-category">
                    <h3><i class="fas fa-suitcase"></i> 行李準備</h3>
                    <ul>
                        <li>根據天氣準備衣物（洋蔥式穿法）</li>
                        <li>準備舒適的步行鞋</li>
                        <li>歐洲轉接插頭</li>
                        <li>個人藥品和急救包</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    // 初始化檢查清單區塊
    initChecklistSection() {
        console.log('✅ 初始化檢查清單區塊...');
        
        // 確保檢查清單內容顯示
        const checklistContent = document.getElementById('checklistContent');
        if (checklistContent && checklistContent.innerHTML.trim() === '') {
            checklistContent.innerHTML = this.generateChecklistContent();
        }
    }
    
    // 生成檢查清單內容
    generateChecklistContent() {
        return `
            <div class="checklist-categories">
                <div class="checklist-category">
                    <h3><i class="fas fa-file-alt"></i> 文件檢查</h3>
                    <div class="checklist-items">
                        <label class="checklist-item">
                            <input type="checkbox">
                            <span>護照（有效期超過6個月）</span>
                        </label>
                        <label class="checklist-item">
                            <input type="checkbox">
                            <span>簽證/申根簽證</span>
                        </label>
                        <label class="checklist-item">
                            <input type="checkbox">
                            <span>機票/電子機票</span>
                        </label>
                        <label class="checklist-item">
                            <input type="checkbox">
                            <span>旅遊保險文件</span>
                        </label>
                    </div>
                </div>
                
                <div class="checklist-category">
                    <h3><i class="fas fa-tshirt"></i> 衣物準備</h3>
                    <div class="checklist-items">
                        <label class="checklist-item">
                            <input type="checkbox">
                            <span>外套（防風防水）</span>
                        </label>
                        <label class="checklist-item">
                            <input type="checkbox">
                            <span>舒適步行鞋</span>
                        </label>
                        <label class="checklist-item">
                            <input type="checkbox">
                            <span>換洗衣物（10天份）</span>
                        </label>
                        <label class="checklist-item">
                            <input type="checkbox">
                            <span>雨具（雨傘/雨衣）</span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 設置底部導航
    setupBottomNav() {
        const navItems = document.querySelectorAll('.bottom-nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                const href = item.getAttribute('href');
                if (href) {
                    const sectionId = href.substring(1);
                    if (this.sections.includes(sectionId)) {
                        this.switchToSection(sectionId);
                        window.location.hash = sectionId;
                    }
                }
            });
        });
    }
    
    // 更新底部導航
    updateBottomNav(sectionId) {
        const navItems = document.querySelectorAll('.bottom-nav-item');
        
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href && href.substring(1) === sectionId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // 激活當前區塊
    activateCurrentSection() {
        const hash = window.location.hash.substring(1);
        
        if (this.sections.includes(hash)) {
            this.switchToSection(hash);
        } else {
            this.switchToSection('today');
            window.location.hash = 'today';
        }
    }
    
    // 顯示天數詳細資訊
    showDayDetails(day) {
        alert(`第${day}天詳細行程資訊\n\n將顯示該天的完整行程安排、景點介紹、交通資訊等。`);
    }
}

// 立即初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚨 啟動緊急頁面切換修復系統...');
    window.emergencyPageSwitcher = new EmergencyPageSwitcher();
    
    // 設置一個延遲，確保DOM完全載入
    setTimeout(() => {
        window.emergencyPageSwitcher.init();
    }, 100);
    
    console.log('✅ 緊急頁面切換修復系統已就緒');
});

// 提供全局訪問
window.simplePageSwitcher = window.emergencyPageSwitcher;

// 提供調試功能
window.debugPageSwitcher = function() {
    if (window.emergencyPageSwitcher) {
        console.log('🔍 緊急頁面切換修復系統狀態：');
        console.log('- 當前區塊:', window.emergencyPageSwitcher.currentSection);
        console.log('- 可用區塊:', window.emergencyPageSwitcher.sections);
        return window.emergencyPageSwitcher;
    } else {
        console.error('❌ 緊急頁面切換修復系統未初始化');
        return null;
    }
};