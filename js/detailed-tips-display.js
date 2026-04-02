// 詳盡實用提醒顯示系統
class DetailedTipsDisplay {
    constructor() {
        this.tipsContainer = null;
        this.currentCategory = null;
        this.initialize();
    }
    
    // 初始化
    initialize() {
        console.log('📋 詳盡實用提醒系統初始化...');
        
        // 等待DOM載入
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    // 設置顯示
    setup() {
        // 找到實用提醒區域
        const tipsSection = document.getElementById('tips');
        if (!tipsSection) {
            console.error('❌ 實用提醒區域未找到');
            return;
        }
        
        // 創建詳細的顯示容器
        this.createDetailedDisplay(tipsSection);
        
        // 載入並顯示資料
        this.loadAndDisplayTips();
        
        console.log('✅ 詳盡實用提醒系統設置完成');
    }
    
    // 創建詳細顯示容器
    createDetailedDisplay(container) {
        // 清除原有簡單內容
        container.innerHTML = '';
        
        // 創建詳細顯示結構
        const detailedHTML = `
            <div class="detailed-tips-container">
                <div class="detailed-tips-header">
                    <h1 class="detailed-tips-title">
                        <i class="fas fa-lightbulb"></i>
                        詳盡實用提醒
                    </h1>
                    <p class="detailed-tips-description">
                        歐洲四國旅遊完整提醒指南
                    </p>
                </div>
                
                <!-- 分類導航 -->
                <div class="tips-category-nav" id="tipsCategoryNav">
                    <!-- 分類按鈕將由JS動態生成 -->
                </div>
                
                <!-- 內容顯示區 -->
                <div class="tips-content-container" id="tipsContent">
                    <!-- 內容將由JS動態生成 -->
                    <div class="tips-loading">
                        <i class="fas fa-spinner fa-spin"></i>
                        載入實用提醒中...
                    </div>
                </div>
                
                <!-- 快速操作 -->
                <div class="tips-quick-actions">
                    <button class="btn btn-outline" id="expandAllTips">
                        <i class="fas fa-expand-alt"></i>
                        展開所有
                    </button>
                    <button class="btn btn-primary" id="saveTips">
                        <i class="fas fa-download"></i>
                        儲存提醒
                    </button>
                </div>
            </div>
        `;
        
        container.innerHTML = detailedHTML;
        this.tipsContainer = document.getElementById('tipsContent');
        
        // 設置事件監聽器
        this.setupEventListeners();
    }
    
    // 設置事件監聽器
    setupEventListeners() {
        // 展開所有按鈕
        const expandBtn = document.getElementById('expandAllTips');
        if (expandBtn) {
            expandBtn.addEventListener('click', () => this.expandAllTips());
        }
        
        // 儲存提醒按鈕
        const saveBtn = document.getElementById('saveTips');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveTipsToLocal());
        }
    }
    
    // 載入並顯示提醒
    loadAndDisplayTips() {
        if (!window.detailedPracticalTips) {
            console.error('❌ 詳細提醒資料未載入');
            this.showError();
            return;
        }
        
        // 生成分類導航
        this.generateCategoryNav();
        
        // 顯示第一個分類
        const firstCategory = Object.keys(window.detailedPracticalTips)[0];
        this.displayCategory(firstCategory);
    }
    
    // 生成分類導航
    generateCategoryNav() {
        const navContainer = document.getElementById('tipsCategoryNav');
        if (!navContainer || !window.detailedPracticalTips) return;
        
        let navHTML = '';
        
        Object.keys(window.detailedPracticalTips).forEach(categoryKey => {
            const category = window.detailedPracticalTips[categoryKey];
            navHTML += `
                <button class="category-btn" data-category="${categoryKey}">
                    <span class="category-icon">${category.category.split(' ')[0]}</span>
                    <span class="category-text">${category.category.split(' ')[1] || ''}</span>
                </button>
            `;
        });
        
        navContainer.innerHTML = navHTML;
        
        // 添加分類按鈕點擊事件
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.getAttribute('data-category');
                this.displayCategory(category);
                
                // 更新活躍狀態
                document.querySelectorAll('.category-btn').forEach(b => {
                    b.classList.remove('active');
                });
                e.currentTarget.classList.add('active');
            });
        });
        
        // 設置第一個為活躍
        const firstBtn = navContainer.querySelector('.category-btn');
        if (firstBtn) firstBtn.classList.add('active');
    }
    
    // 顯示分類內容
    displayCategory(categoryKey) {
        if (!this.tipsContainer || !window.detailedPracticalTips[categoryKey]) return;
        
        const category = window.detailedPracticalTips[categoryKey];
        this.currentCategory = categoryKey;
        
        let contentHTML = `
            <div class="category-content">
                <div class="category-header">
                    <h2 class="category-title">${category.title}</h2>
                    <p class="category-description">${category.description}</p>
                </div>
                
                <div class="tips-list">
        `;
        
        // 生成每個提醒項目
        category.tips.forEach((tip, index) => {
            const importanceClass = this.getImportanceClass(tip.importance);
            
            contentHTML += `
                <div class="tip-item ${importanceClass}" data-tip-id="${tip.id}">
                    <div class="tip-header">
                        <h3 class="tip-title">
                            <i class="fas fa-circle"></i>
                            ${tip.title}
                        </h3>
                        <button class="tip-toggle-btn" data-tip-index="${index}">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </div>
                    
                    <div class="tip-details" id="tipDetails-${index}" style="display: none;">
                        <div class="tip-importance">
                            <span class="importance-label">重要性：</span>
                            <span class="importance-value">${this.getImportanceText(tip.importance)}</span>
                        </div>
                        
                        <div class="tip-reminder">
                            <i class="fas fa-bell"></i>
                            ${tip.reminder}
                        </div>
                        
                        <ul class="tip-details-list">
                            ${tip.details.map(detail => `<li>${detail}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });
        
        contentHTML += `
                </div>
                
                <div class="category-summary">
                    <div class="summary-item">
                        <i class="fas fa-list-check"></i>
                        <span>共 ${category.tips.length} 個提醒項目</span>
                    </div>
                    <div class="summary-item">
                        <i class="fas fa-exclamation-circle"></i>
                        <span>${this.getCriticalCount(category.tips)} 個重要提醒</span>
                    </div>
                </div>
            </div>
        `;
        
        this.tipsContainer.innerHTML = contentHTML;
        
        // 設置展開/收合事件
        this.setupTipToggleEvents();
    }
    
    // 設置提醒展開/收合事件
    setupTipToggleEvents() {
        document.querySelectorAll('.tip-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tipIndex = e.currentTarget.getAttribute('data-tip-index');
                const detailsElement = document.getElementById(`tipDetails-${tipIndex}`);
                const icon = e.currentTarget.querySelector('i');
                
                if (detailsElement.style.display === 'none') {
                    detailsElement.style.display = 'block';
                    icon.className = 'fas fa-chevron-up';
                } else {
                    detailsElement.style.display = 'none';
                    icon.className = 'fas fa-chevron-down';
                }
            });
        });
    }
    
    // 展開所有提醒
    expandAllTips() {
        document.querySelectorAll('.tip-details').forEach(details => {
            details.style.display = 'block';
        });
        
        document.querySelectorAll('.tip-toggle-btn i').forEach(icon => {
            icon.className = 'fas fa-chevron-up';
        });
    }
    
    // 儲存提醒到本地
    saveTipsToLocal() {
        if (!window.detailedPracticalTips) return;
        
        try {
            const tipsData = {
                timestamp: new Date().toISOString(),
                data: window.detailedPracticalTips
            };
            
            localStorage.setItem('europeTourDetailedTips', JSON.stringify(tipsData));
            
            // 顯示成功訊息
            this.showMessage('✅ 提醒已儲存到本地儲存', 'success');
            
        } catch (error) {
            console.error('❌ 儲存失敗:', error);
            this.showMessage('❌ 儲存失敗，請重試', 'error');
        }
    }
    
    // 顯示錯誤
    showError() {
        if (!this.tipsContainer) return;
        
        this.tipsContainer.innerHTML = `
            <div class="tips-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>無法載入實用提醒</h3>
                <p>請檢查網路連線或重新整理頁面</p>
                <button class="btn btn-primary" onclick="location.reload()">
                    重新整理頁面
                </button>
            </div>
        `;
    }
    
    // 顯示訊息
    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `tips-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(messageDiv);
        
        // 3秒後自動移除
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 3000);
    }
    
    // 輔助函數
    getImportanceClass(importance) {
        const classes = {
            'critical': 'tip-critical',
            'high': 'tip-high',
            'medium': 'tip-medium',
            'low': 'tip-low'
        };
        return classes[importance] || 'tip-medium';
    }
    
    getImportanceText(importance) {
        const texts = {
            'critical': '非常重要',
            'high': '重要',
            'medium': '中等',
            'low': '一般'
        };
        return texts[importance] || '中等';
    }
    
    getCriticalCount(tips) {
        return tips.filter(tip => tip.importance === 'critical').length;
    }
}

// 創建全局實例
window.detailedTipsDisplay = new DetailedTipsDisplay();

// 自動初始化
document.addEventListener('DOMContentLoaded', function() {
    if (window.detailedTipsDisplay) {
        console.log('📋 詳盡實用提醒系統已啟動');
    }
});