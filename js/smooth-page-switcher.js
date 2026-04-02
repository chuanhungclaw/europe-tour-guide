// 平滑頁面切換系統
class SmoothPageSwitcher {
    constructor() {
        this.currentSection = 'today';
        this.sections = ['today', 'itinerary', 'map', 'tips', 'checklist'];
        this.isAnimating = false;
        
        console.log('🔄 平滑頁面切換系統初始化...');
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
        // 設置底部導航點擊事件
        this.setupBottomNav();
        
        // 設置初始狀態
        this.showSection('today');
        
        // 添加CSS動畫樣式
        this.addAnimationStyles();
        
        console.log('✅ 平滑頁面切換系統設置完成');
    }
    
    // 設置底部導航
    setupBottomNav() {
        const navItems = document.querySelectorAll('.bottom-nav-item');
        if (!navItems.length) return;
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = item.getAttribute('href').replace('#', '');
                if (this.sections.includes(targetId)) {
                    this.switchToSection(targetId);
                    
                    // 更新導航狀態
                    this.updateNavActiveState(targetId);
                }
            });
        });
    }
    
    // 切換到指定區塊
    switchToSection(sectionId) {
        if (this.isAnimating || this.currentSection === sectionId) return;
        
        console.log(`🔄 切換到: ${sectionId}`);
        
        this.isAnimating = true;
        this.currentSection = sectionId;
        
        // 隱藏當前區塊
        this.hideCurrentSection();
        
        // 顯示目標區塊
        setTimeout(() => {
            this.showSection(sectionId);
            this.isAnimating = false;
        }, 300);
    }
    
    // 隱藏當前區塊
    hideCurrentSection() {
        const currentElement = document.querySelector(`#${this.currentSection}`);
        if (currentElement) {
            currentElement.classList.remove('section-active');
            currentElement.classList.add('section-hiding');
            
            setTimeout(() => {
                currentElement.classList.remove('section-hiding');
                currentElement.style.display = 'none';
            }, 300);
        }
    }
    
    // 顯示指定區塊
    showSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (!targetElement) return;
        
        // 設置顯示
        targetElement.style.display = 'block';
        targetElement.classList.add('section-showing');
        
        // 觸發重排以啟動動畫
        void targetElement.offsetWidth;
        
        // 添加活動類
        targetElement.classList.add('section-active');
        
        // 滾動到頂部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // 移除顯示類
        setTimeout(() => {
            targetElement.classList.remove('section-showing');
        }, 300);
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
        }
    }
    
    // 添加CSS動畫樣式
    addAnimationStyles() {
        const styleId = 'smooth-page-switcher-styles';
        if (document.getElementById(styleId)) return;
        
        const styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = `
            /* 區塊動畫 */
            .section {
                display: none;
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            
            .section-active {
                display: block;
                opacity: 1;
                transform: translateY(0);
            }
            
            .section-hiding {
                opacity: 0;
                transform: translateY(-20px);
            }
            
            .section-showing {
                opacity: 0;
                transform: translateY(20px);
            }
            
            /* 導航動畫 */
            .bottom-nav-item {
                transition: all 0.2s ease;
            }
            
            .bottom-nav-item.active {
                transform: translateY(-4px);
            }
            
            .bottom-nav-item.active .bottom-nav-icon {
                transform: scale(1.2);
            }
            
            .bottom-nav-item.active .bottom-nav-text {
                font-weight: 700;
            }
            
            /* 內容載入動畫 */
            .card {
                animation: cardAppear 0.4s ease forwards;
                animation-delay: 0.1s;
                opacity: 0;
                transform: translateY(10px);
            }
            
            @keyframes cardAppear {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* 按鈕動畫 */
            .btn {
                transition: all 0.2s ease;
            }
            
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            
            .btn:active {
                transform: translateY(0);
            }
            
            /* 列表項目動畫 */
            .timeline-item,
            .tip-item,
            .location-item {
                animation: listItemAppear 0.3s ease forwards;
                opacity: 0;
                transform: translateX(-10px);
            }
            
            .timeline-item:nth-child(1) { animation-delay: 0.1s; }
            .timeline-item:nth-child(2) { animation-delay: 0.2s; }
            .timeline-item:nth-child(3) { animation-delay: 0.3s; }
            .timeline-item:nth-child(4) { animation-delay: 0.4s; }
            .timeline-item:nth-child(5) { animation-delay: 0.5s; }
            
            @keyframes listItemAppear {
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        
        document.head.appendChild(styleElement);
    }
    
    // 手動切換到指定區塊（供其他腳本使用）
    goTo(sectionId) {
        this.switchToSection(sectionId);
    }
    
    // 獲取當前區塊
    getCurrentSection() {
        return this.currentSection;
    }
}

// 創建全局實例
window.smoothPageSwitcher = new SmoothPageSwitcher();

// 自動初始化
document.addEventListener('DOMContentLoaded', function() {
    window.smoothPageSwitcher.init();
});