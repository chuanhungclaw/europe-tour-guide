// 詳盡檢查清單顯示系統
class DetailedChecklistDisplay {
    constructor() {
        this.checklistContainer = null;
        this.currentCategory = null;
        this.checklistState = {};
        
        console.log('📋 詳盡檢查清單系統初始化...');
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
        // 找到檢查清單區域
        const checklistSection = document.getElementById('checklist');
        if (!checklistSection) {
            console.error('❌ 檢查清單區域未找到');
            return;
        }
        
        // 創建詳細顯示
        this.createDetailedDisplay(checklistSection);
        
        // 載入並顯示資料
        this.loadAndDisplayChecklist();
        
        // 載入保存的狀態
        this.loadSavedState();
        
        console.log('✅ 詳盡檢查清單系統設置完成');
    }
    
    // 創建詳細顯示
    createDetailedDisplay(container) {
        // 清除原有簡單內容
        container.innerHTML = '';
        
        const detailedHTML = `
            <div class="detailed-checklist-container">
                <div class="detailed-checklist-header">
                    <h1 class="detailed-checklist-title">
                        <i class="fas fa-check-square"></i>
                        詳盡檢查清單
                    </h1>
                    <p class="detailed-checklist-description">
                        歐洲四國旅行完整準備指南
                    </p>
                </div>
                
                <!-- 進度顯示 -->
                <div class="checklist-progress" id="checklistProgress">
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressFill"></div>
                    </div>
                    <div class="progress-text">
                        <span id="progressPercentage">0%</span>
                        <span id="progressCount">0/0 已完成</span>
                    </div>
                </div>
                
                <!-- 分類導航 -->
                <div class="checklist-category-nav" id="checklistCategoryNav">
                    <!-- 分類按鈕將由JS動態生成 -->
                </div>
                
                <!-- 內容顯示區 -->
                <div class="checklist-content-container" id="checklistContent">
                    <!-- 內容將由JS動態生成 -->
                    <div class="checklist-loading">
                        <i class="fas fa-spinner fa-spin"></i>
                        載入檢查清單中...
                    </div>
                </div>
                
                <!-- 快速操作 -->
                <div class="checklist-quick-actions">
                    <button class="btn btn-outline" id="checkAllItems">
                        <i class="fas fa-check-double"></i>
                        全部勾選
                    </button>
                    <button class="btn btn-outline" id="uncheckAllItems">
                        <i class="fas fa-times"></i>
                        全部取消
                    </button>
                    <button class="btn btn-primary" id="saveChecklist">
                        <i class="fas fa-save"></i>
                        儲存進度
                    </button>
                    <button class="btn btn-success" id="exportChecklist">
                        <i class="fas fa-download"></i>
                        匯出清單
                    </button>
                </div>
                
                <!-- 統計資訊 -->
                <div class="checklist-stats">
                    <div class="stat-item">
                        <i class="fas fa-list-check"></i>
                        <div>
                            <span class="stat-value" id="totalItems">0</span>
                            <span class="stat-label">總項目數</span>
                        </div>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <span class="stat-value" id="completedItems">0</span>
                            <span class="stat-label">已完成</span>
                        </div>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-clock"></i>
                        <div>
                            <span class="stat-value" id="pendingItems">0</span>
                            <span class="stat-label">待完成</span>
                        </div>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-exclamation-triangle"></i>
                        <div>
                            <span class="stat-value" id="criticalItems">0</span>
                            <span class="stat-label">重要項目</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = detailedHTML;
        this.checklistContainer = document.getElementById('checklistContent');
        
        // 設置事件監聽器
        this.setupEventListeners();
    }
    
    // 設置事件監聽器
    setupEventListeners() {
        // 全部勾選按鈕
        const checkAllBtn = document.getElementById('checkAllItems');
        if (checkAllBtn) {
            checkAllBtn.addEventListener('click', () => this.checkAllItems());
        }
        
        // 全部取消按鈕
        const uncheckAllBtn = document.getElementById('uncheckAllItems');
        if (uncheckAllBtn) {
            uncheckAllBtn.addEventListener('click', () => this.uncheckAllItems());
        }
        
        // 儲存進度按鈕
        const saveBtn = document.getElementById('saveChecklist');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveChecklistState());
        }
        
        // 匯出清單按鈕
        const exportBtn = document.getElementById('exportChecklist');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportChecklist());
        }
    }
    
    // 載入並顯示檢查清單
    loadAndDisplayChecklist() {
        if (!window.detailedChecklistData) {
            console.error('❌ 詳細檢查清單資料未載入');
            this.showError();
            return;
        }
        
        // 生成分類導航
        this.generateCategoryNav();
        
        // 顯示第一個分類
        const firstCategory = Object.keys(window.detailedChecklistData)[0];
        this.displayCategory(firstCategory);
        
        // 更新進度
        this.updateProgress();
    }
    
    // 生成分類導航
    generateCategoryNav() {
        const navContainer = document.getElementById('checklistCategoryNav');
        if (!navContainer || !window.detailedChecklistData) return;
        
        let navHTML = '';
        
        Object.keys(window.detailedChecklistData).forEach(categoryKey => {
            const category = window.detailedChecklistData[categoryKey];
            navHTML += `
                <button class="category-checklist-btn" data-category="${categoryKey}">
                    <span class="category-checklist-icon">${category.category.split(' ')[0]}</span>
                    <span class="category-checklist-text">${category.category.split(' ')[1] || ''}</span>
                </button>
            `;
        });
        
        navContainer.innerHTML = navHTML;
        
        // 添加分類按鈕點擊事件
        document.querySelectorAll('.category-checklist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.getAttribute('data-category');
                this.displayCategory(category);
                
                // 更新活躍狀態
                document.querySelectorAll('.category-checklist-btn').forEach(b => {
                    b.classList.remove('active');
                });
                e.currentTarget.classList.add('active');
            });
        });
        
        // 設置第一個為活躍
        const firstBtn = navContainer.querySelector('.category-checklist-btn');
        if (firstBtn) firstBtn.classList.add('active');
    }
    
    // 顯示分類內容
    displayCategory(categoryKey) {
        if (!this.checklistContainer || !window.detailedChecklistData[categoryKey]) return;
        
        const category = window.detailedChecklistData[categoryKey];
        this.currentCategory = categoryKey;
        
        let contentHTML = `
            <div class="category-checklist-content">
                <div class="category-checklist-header">
                    <h2 class="category-checklist-title">${category.title}</h2>
                    <p class="category-checklist-description">${category.description}</p>
                </div>
                
                <div class="checklist-items-list">
        `;
        
        // 生成每個檢查項目
        category.items.forEach((item, index) => {
            const itemId = `${categoryKey}-${item.id}`;
            const isChecked = this.checklistState[itemId] || false;
            const importanceClass = this.getImportanceClass(item.importance);
            const checkedClass = isChecked ? 'checked' : '';
            
            contentHTML += `
                <div class="checklist-item ${importanceClass} ${checkedClass}" data-item-id="${itemId}">
                    <div class="checklist-item-header">
                        <div class="checklist-checkbox">
                            <input type="checkbox" id="checkbox-${itemId}" ${isChecked ? 'checked' : ''}>
                            <label for="checkbox-${itemId}"></label>
                        </div>
                        <h3 class="checklist-item-title">${item.title}</h3>
                        <button class="checklist-details-toggle" data-item-index="${index}">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </div>
                    
                    <div class="checklist-item-details" id="checklistDetails-${index}" style="display: none;">
                        <div class="checklist-importance">
                            <span class="importance-label">重要性：</span>
                            <span class="importance-value">${this.getImportanceText(item.importance)}</span>
                            ${item.deadline ? `<span class="deadline">截止時間：${item.deadline}</span>` : ''}
                            ${item.time ? `<span class="time">時間：${item.time}</span>` : ''}
                        </div>
                        
                        <ul class="checklist-details-list">
                            ${item.details.map(detail => `<li>${detail}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });
        
        contentHTML += `
                </div>
                
                <div class="category-checklist-summary">
                    <div class="summary-item">
                        <i class="fas fa-tasks"></i>
                        <span>共 ${category.items.length} 個檢查項目</span>
                    </div>
                    <div class="summary-item">
                        <i class="fas fa-exclamation-circle"></i>
                        <span>${this.getCriticalCount(category.items)} 個重要項目</span>
                    </div>
                    ${category.items[0]?.deadline ? `
                    <div class="summary-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>建議完成時間：${category.items[0].deadline}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        this.checklistContainer.innerHTML = contentHTML;
        
        // 設置複選框事件
        this.setupCheckboxEvents();
        
        // 設置詳細內容展開事件
        this.setupDetailsToggleEvents();
    }
    
    // 設置複選框事件
    setupCheckboxEvents() {
        document.querySelectorAll('.checklist-checkbox input').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const itemId = e.target.id.replace('checkbox-', '');
                const isChecked = e.target.checked;
                
                // 更新狀態
                this.checklistState[itemId] = isChecked;
                
                // 更新項目樣式
                const itemElement = document.querySelector(`.checklist-item[data-item-id="${itemId}"]`);
                if (itemElement) {
                    if (isChecked) {
                        itemElement.classList.add('checked');
                    } else {
                        itemElement.classList.remove('checked');
                    }
                }
                
                // 更新進度
                this.updateProgress();
                
                // 自動儲存
                this.autoSave();
            });
        });
    }
    
    // 設置詳細內容展開事件
    setupDetailsToggleEvents() {
        document.querySelectorAll('.checklist-details-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemIndex = e.currentTarget.getAttribute('data-item-index');
                const detailsElement = document.getElementById(`checklistDetails-${itemIndex}`);
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
    
    // 全部勾選
    checkAllItems() {
        if (!window.detailedChecklistData || !this.currentCategory) return;
        
        const category = window.detailedChecklistData[this.currentCategory];
        category.items.forEach(item => {
            const itemId = `${this.currentCategory}-${item.id}`;
            this.checklistState[itemId] = true;
        });
        
        // 重新顯示分類以更新UI
        this.displayCategory(this.currentCategory);
        
        // 更新進度
        this.updateProgress();
        
        // 自動儲存
        this.autoSave();
        
        this.showMessage('已勾選所有項目', 'success');
    }
    
    // 全部取消
    uncheckAllItems() {
        if (!window.detailedChecklistData || !this.currentCategory) return;
        
        const category = window.detailedChecklistData[this.currentCategory];
        category.items.forEach(item => {
            const itemId = `${this.currentCategory}-${item.id}`;
            this.checklistState[itemId] = false;
        });
        
        // 重新顯示分類以更新UI
        this.displayCategory(this.currentCategory);
        
        // 更新進度
        this.updateProgress();
        
        // 自動儲存
        this.autoSave();
        
        this.showMessage('已取消所有勾選', 'info');
    }
    
    // 更新進度
    updateProgress() {
        if (!window.detailedChecklistData) return;
        
        let totalItems = 0;
        let completedItems = 0;
        let criticalItems = 0;
        
        // 計算所有項目
        Object.keys(window.detailedChecklistData).forEach(categoryKey => {
            const category = window.detailedChecklistData[categoryKey];
            totalItems += category.items.length;
            
            category.items.forEach(item => {
                const itemId = `${categoryKey}-${item.id}`;
                if (this.checklistState[itemId]) {
                    completedItems++;
                }
                
                if (item.importance === 'critical') {
                    criticalItems++;
                }
            });
        });
        
        const pendingItems = totalItems - completedItems;
        const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
        
        // 更新進度條
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        
        // 更新文字
        const progressPercentage = document.getElementById('progressPercentage');
        if (progressPercentage) {
            progressPercentage.textContent = `${percentage}%`;
        }
        
        const progressCount = document.getElementById('progressCount');
        if (progressCount) {
            progressCount.textContent = `${completedItems}/${totalItems} 已完成`;
        }
        
        // 更新統計
        document.getElementById('totalItems').textContent = totalItems;
        document.getElementById('completedItems').textContent = completedItems;
        document.getElementById('pendingItems').textContent = pendingItems;
        document.getElementById('criticalItems').textContent = criticalItems;
    }
    
    // 儲存檢查清單狀態
    saveChecklistState() {
        try {
            const saveData = {
                timestamp: new Date().toISOString(),
                state: this.checklistState,
                progress: this.getProgressPercentage()
            };
            
            localStorage.setItem('europeTourChecklist', JSON.stringify(saveData));
            this.showMessage('✅ 檢查清單進度已儲存', 'success');
            
        } catch (error) {
            console.error('❌ 儲存失敗:', error);
            this.showMessage('❌ 儲存失敗，請重試', 'error');
        }
    }
    
    // 自動儲存
    autoSave() {
        // 防抖動，避免頻繁儲存
        if (this.autoSaveTimeout) {
            clearTimeout(this.autoSaveTimeout);
        }
        
        this.autoSaveTimeout = setTimeout(() => {
            this.saveChecklistState();
        }, 2000);
    }
    
    // 載入保存的狀態
    loadSavedState() {
        try {
            const savedData = localStorage.getItem('europeTourChecklist');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                this.checklistState = parsedData.state || {};
                console.log('📂 已載入保存的檢查清單狀態');
            }
        } catch (error) {
            console.error('❌ 載入保存狀態失敗:', error);
        }
    }
    
    // 匯出檢查清單
    exportChecklist() {
        if (!window.detailedChecklistData) return;
        
        let exportText = '歐洲四國旅行檢查清單\n';
        exportText += '=====================\n\n';
        
        Object.keys(window.detailedChecklistData).forEach(categoryKey => {
            const category = window.detailedChecklistData[categoryKey];
            exportText += `${category.category} - ${category.title}\n`;
            exportText += `${category.description}\n\n`;
            
            category.items.forEach(item => {
                const itemId = `${categoryKey}-${item.id}`;
                const isChecked = this.checklistState[itemId] ? '✅' : '□';
                exportText += `${isChecked} ${item.title}\n`;
                
                if (item.details && item.details.length > 0) {
                    item.details.forEach(detail => {
                        exportText += `  • ${detail}\n`;
                    });
                }
                
                exportText += '\n';
            });
            
            exportText += '\n';
        });
        
        // 建立下載連結
        const blob = new Blob([exportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '歐洲旅行檢查清單.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showMessage('📥 檢查清單已匯出', 'success');
    }
    
    // 獲取進度百分比
    getProgressPercentage() {
        if (!window.detailedChecklistData) return 0;
        
        let totalItems = 0;
        let completedItems = 0;
        
        Object.keys(window.detailedChecklistData).forEach(categoryKey => {
            const category = window.detailedChecklistData[categoryKey];
            totalItems += category.items.length;
            
            category.items.forEach(item => {
                const itemId = `${categoryKey}-${item.id}`;
                if (this.checklistState[itemId]) {
                    completedItems++;
                }
            });
        });
        
        return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    }
    
    // 顯示錯誤
    showError() {
        if (!this.checklistContainer) return;
        
        this.checklistContainer.innerHTML = `
            <div class="checklist-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>無法載入檢查清單</h3>
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
        messageDiv.className = `checklist-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.querySelector('.detailed-checklist-container').appendChild(messageDiv);
        
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
            'critical': 'item-critical',
            'high': 'item-high',
            'medium': 'item-medium',
            'low': 'item-low'
        };
        return classes[importance] || 'item-medium';
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
    
    getCriticalCount(items) {
        return items.filter(item => item.importance === 'critical').length;
    }
}

// 創建全局實例
window.detailedChecklistDisplay = new DetailedChecklistDisplay();

// 自動初始化
document.addEventListener('DOMContentLoaded', function() {
    window.detailedChecklistDisplay.init();
});