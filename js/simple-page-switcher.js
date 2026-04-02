// 簡單可靠的頁面切換系統
class SimplePageSwitcher {
    constructor() {
        this.currentSection = 'today';
        this.sections = ['today', 'itinerary', 'map', 'tips', 'checklist'];
        
        console.log('🔄 簡單頁面切換系統初始化...');
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
        console.log('🔧 設置頁面切換系統...');
        
        // 隱藏所有區塊，只顯示第一個
        this.hideAllSections();
        this.showSection('today');
        
        // 設置底部導航點擊事件
        this.setupBottomNav();
        
        // 設置初始導航狀態
        this.updateNavActiveState('today');
        
        console.log('✅ 頁面切換系統設置完成');
    }
    
    // 隱藏所有區塊
    hideAllSections() {
        this.sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = 'none';
                section.classList.remove('active');
            }
        });
    }
    
    // 顯示指定區塊
    showSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'block';
            section.classList.add('active');
            this.currentSection = sectionId;
            console.log(`📱 顯示區塊: ${sectionId}`);
        }
    }
    
    // 設置底部導航
    setupBottomNav() {
        const navItems = document.querySelectorAll('.bottom-nav-item');
        console.log(`🔍 找到 ${navItems.length} 個導航項目`);
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                const href = item.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const sectionId = href.substring(1); // 移除#
                    
                    if (this.sections.includes(sectionId)) {
                        this.switchToSection(sectionId);
                        this.updateNavActiveState(sectionId);
                    }
                }
            });
        });
    }
    
    // 切換到指定區塊
    switchToSection(sectionId) {
        if (this.currentSection === sectionId) {
            console.log(`⏭️ 已經是當前區塊: ${sectionId}`);
            return;
        }
        
        console.log(`🔄 切換從 ${this.currentSection} 到 ${sectionId}`);
        
        // 隱藏當前區塊
        const currentSection = document.getElementById(this.currentSection);
        if (currentSection) {
            currentSection.style.display = 'none';
            currentSection.classList.remove('active');
        }
        
        // 顯示目標區塊
        this.showSection(sectionId);
        
        // 滾動到頂部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // 更新導航活動狀態
    updateNavActiveState(sectionId) {
        // 移除所有活動狀態
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // 添加當前活動狀態
        const activeNav = document.querySelector(`.bottom-nav-item[href="#${sectionId}"]`);
        if (activeNav) {
            activeNav.classList.add('active');
            console.log(`📍 設置導航活動狀態: ${sectionId}`);
        }
    }
    
    // 手動切換到指定區塊
    goTo(sectionId) {
        if (this.sections.includes(sectionId)) {
            this.switchToSection(sectionId);
            this.updateNavActiveState(sectionId);
        }
    }
    
    // 獲取當前區塊
    getCurrentSection() {
        return this.currentSection;
    }
    
    // 強制刷新當前顯示
    refreshCurrent() {
        this.showSection(this.currentSection);
    }
}

// 創建全局實例
window.simplePageSwitcher = new SimplePageSwitcher();

// 自動初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 DOM載入完成，初始化簡單頁面切換系統...');
    window.simplePageSwitcher.init();
    
    // 測試：3秒後強制顯示地圖區塊（用於調試）
    setTimeout(() => {
        console.log('🧪 測試：檢查當前區塊狀態');
        console.log('當前區塊:', window.simplePageSwitcher.getCurrentSection());
        
        // 檢查所有區塊顯示狀態
        ['today', 'itinerary', 'map', 'tips', 'checklist'].forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                console.log(`${sectionId}: display=${section.style.display}, active=${section.classList.contains('active')}`);
            }
        });
    }, 3000);
});

// 提供全局函數供調試使用
window.debugPageSwitcher = function() {
    console.log('🔍 頁面切換系統調試信息：');
    console.log('當前區塊:', window.simplePageSwitcher.getCurrentSection());
    
    // 檢查所有區塊
    ['today', 'itinerary', 'map', 'tips', 'checklist'].forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const isVisible = section.style.display !== 'none';
            const isActive = section.classList.contains('active');
            console.log(`${sectionId}: 可見=${isVisible}, 活動=${isActive}`);
        }
    });
    
    // 檢查導航按鈕
    document.querySelectorAll('.bottom-nav-item').forEach((item, index) => {
        const href = item.getAttribute('href');
        const isActive = item.classList.contains('active');
        console.log(`導航按鈕 ${index}: href=${href}, 活動=${isActive}`);
    });
};