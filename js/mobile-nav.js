// 手機版導航菜單功能
const mobileNav = {
    init() {
        console.log('📱 初始化手機版導航...');
        
        // 創建手機版導航菜單
        this.createMobileNavMenu();
        
        // 設定漢堡菜單事件
        this.setupHamburgerButton();
        
        // 設定手機版導航點擊事件
        this.setupMobileNavLinks();
        
        console.log('✅ 手機版導航初始化完成');
    },
    
    // 創建手機版導航菜單
    createMobileNavMenu() {
        // 檢查是否已存在
        if (document.getElementById('mobile-nav-menu')) {
            return;
        }
        
        // 獲取桌面版導航菜單項目
        const desktopMenu = document.querySelector('.nav-menu');
        if (!desktopMenu) return;
        
        // 創建手機版導航菜單容器
        const mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobile-nav-menu';
        mobileMenu.className = 'mobile-nav-menu';
        
        // 複製導航鏈接
        const links = desktopMenu.querySelectorAll('.nav-link');
        links.forEach(link => {
            const mobileLink = document.createElement('a');
            mobileLink.href = link.href;
            mobileLink.className = 'mobile-nav-link';
            mobileLink.textContent = link.textContent;
            
            // 複製active狀態
            if (link.classList.contains('active')) {
                mobileLink.classList.add('active');
            }
            
            mobileMenu.appendChild(mobileLink);
        });
        
        // 添加到body中
        document.body.appendChild(mobileMenu);
    },
    
    // 設定漢堡菜單按鈕事件
    setupHamburgerButton() {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        if (!hamburgerBtn) return;
        
        hamburgerBtn.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
    },
    
    // 切換手機版菜單
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-nav-menu');
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        
        if (!mobileMenu || !hamburgerBtn) return;
        
        const isActive = mobileMenu.classList.contains('active');
        
        if (isActive) {
            // 關閉菜單
            mobileMenu.classList.remove('active');
            hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
            // 打開菜單
            mobileMenu.classList.add('active');
            hamburgerBtn.innerHTML = '<i class="fas fa-times"></i>';
        }
    },
    
    // 設定手機版導航鏈接點擊事件
    setupMobileNavLinks() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('mobile-nav-link')) {
                // 更新active狀態
                this.updateActiveLink(e.target);
                
                // 關閉手機版菜單
                this.closeMobileMenu();
                
                // 平滑滾動到目標
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    },
    
    // 更新active鏈接
    updateActiveLink(clickedLink) {
        // 更新桌面版active狀態
        const desktopLinks = document.querySelectorAll('.nav-link');
        desktopLinks.forEach(link => {
            link.classList.remove('active');
            if (link.textContent === clickedLink.textContent) {
                link.classList.add('active');
            }
        });
        
        // 更新手機版active狀態
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.classList.remove('active');
        });
        clickedLink.classList.add('active');
    },
    
    // 關閉手機版菜單
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-nav-menu');
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        
        if (mobileMenu && hamburgerBtn) {
            mobileMenu.classList.remove('active');
            hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    },
    
    // 監聽視窗大小變化
    setupResizeListener() {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    }
};

// 初始化函數
window.initMobileNav = function() {
    mobileNav.init();
};

// 自動初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        mobileNav.init();
    });
} else {
    mobileNav.init();
}
