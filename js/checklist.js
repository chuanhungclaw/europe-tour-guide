// 歐洲行程檢查清單功能
function initializeChecklist() {
    console.log('✅ 初始化檢查清單...');
    
    // 載入檢查清單數據
    loadChecklistData();
    
    // 設定檢查清單事件
    setupChecklistEvents();
    
    // 更新進度顯示
    updateChecklistProgress();
}

// 載入檢查清單數據
function loadChecklistData() {
    const checklistData = europeTourData.checklist;
    const container = document.querySelector('.checklist-container');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    // 載入每個分類
    for (const [categoryId, items] of Object.entries(checklistData)) {
        const categoryDiv = createChecklistCategory(categoryId, items);
        container.appendChild(categoryDiv);
    }
}

// 創建檢查清單分類
function createChecklistCategory(categoryId, items) {
    const div = document.createElement('div');
    div.className = 'checklist-category';
    div.id = `category-${categoryId}`;
    
    // 計算分類進度
    const totalItems = items.length;
    const checkedItems = items.filter(item => {
        const savedState = localStorage.getItem(`checklist_${item.id}`);
        return savedState === 'true';
    }).length;
    const percentage = Math.round((checkedItems / totalItems) * 100);
    
    div.innerHTML = `
        <div class="category-header">
            <h3>
                <i class="${getCategoryIcon(categoryId)}"></i>
                ${getCategoryName(categoryId)}
            </h3>
            <div class="category-progress">${checkedItems}/${totalItems} (${percentage}%)</div>
        </div>
        <div class="checklist-items">
            ${items.map(item => createChecklistItem(item)).join('')}
        </div>
    `;
    
    return div;
}

// 獲取分類圖標
function getCategoryIcon(categoryId) {
    const icons = {
        documents: 'fas fa-passport',
        clothing: 'fas fa-tshirt',
        electronics: 'fas fa-plug',
        toiletries: 'fas fa-toilet-paper',
        money: 'fas fa-euro-sign',
        food: 'fas fa-utensils',
        accessories: 'fas fa-suitcase-rolling'
    };
    return icons[categoryId] || 'fas fa-list';
}

// 獲取分類名稱
function getCategoryName(categoryId) {
    const names = {
        documents: '證件與文件',
        clothing: '衣物與鞋類',
        electronics: '電器與電子產品',
        toiletries: '盥洗與個人用品',
        money: '金錢與支付',
        food: '食物與零食',
        accessories: '旅行配件'
    };
    return names[categoryId] || categoryId;
}

// 創建檢查清單項目
function createChecklistItem(item) {
    const isChecked = localStorage.getItem(`checklist_${item.id}`) === 'true';
    
    return `
        <div class="checklist-item ${isChecked ? 'checked' : ''}" data-id="${item.id}">
            <div class="checkbox">${isChecked ? '✓' : ''}</div>
            <div class="item-text">${item.text}</div>
            ${item.important ? '<div class="item-important">重要</div>' : ''}
        </div>
    `;
}

// 設定檢查清單事件
function setupChecklistEvents() {
    const container = document.querySelector('.checklist-container');
    
    if (!container) return;
    
    // 點擊事件委託
    container.addEventListener('click', function(e) {
        const checklistItem = e.target.closest('.checklist-item');
        if (!checklistItem) return;
        
        const itemId = checklistItem.getAttribute('data-id');
        const checkbox = checklistItem.querySelector('.checkbox');
        const isCurrentlyChecked = checklistItem.classList.contains('checked');
        
        // 切換狀態
        if (isCurrentlyChecked) {
            checklistItem.classList.remove('checked');
            checkbox.textContent = '';
            localStorage.setItem(`checklist_${itemId}`, 'false');
        } else {
            checklistItem.classList.add('checked');
            checkbox.textContent = '✓';
            localStorage.setItem(`checklist_${itemId}`, 'true');
        }
        
        // 更新進度
        updateChecklistProgress();
        updateCategoryProgress(itemId);
        
        // 顯示通知
        const itemText = checklistItem.querySelector('.item-text').textContent;
        const action = isCurrentlyChecked ? '取消勾選' : '完成';
        showNotification(`${action}: ${itemText}`, 'success');
    });
}

// 更新檢查清單總進度
function updateChecklistProgress() {
    const progressFill = document.getElementById('checklistProgress');
    const percentageText = document.getElementById('checklistPercentage');
    
    if (!progressFill || !percentageText) return;
    
    // 計算總進度
    let totalItems = 0;
    let checkedItems = 0;
    
    const checklistData = europeTourData.checklist;
    for (const items of Object.values(checklistData)) {
        totalItems += items.length;
        checkedItems += items.filter(item => {
            return localStorage.getItem(`checklist_${item.id}`) === 'true';
        }).length;
    }
    
    const percentage = Math.round((checkedItems / totalItems) * 100);
    
    // 更新顯示
    progressFill.style.width = `${percentage}%`;
    percentageText.textContent = `${percentage}%`;
    
    // 更新進度文字
    const progressText = document.querySelector('.progress-text');
    if (progressText) {
        progressText.innerHTML = `
            <span id="progressPercent">${percentage}%</span> 完成準備
            <small>(${checkedItems}/${totalItems} 項目)</small>
        `;
    }
}

// 更新分類進度
function updateCategoryProgress(changedItemId) {
    // 找到包含此項目的分類
    const checklistData = europeTourData.checklist;
    
    for (const [categoryId, items] of Object.entries(checklistData)) {
        if (items.some(item => item.id === changedItemId)) {
            // 重新計算此分類進度
            const totalItems = items.length;
            const checkedItems = items.filter(item => {
                return localStorage.getItem(`checklist_${item.id}`) === 'true';
            }).length;
            const percentage = Math.round((checkedItems / totalItems) * 100);
            
            // 更新分類進度顯示
            const categoryHeader = document.querySelector(`#category-${categoryId} .category-header`);
            if (categoryHeader) {
                const progressDiv = categoryHeader.querySelector('.category-progress');
                if (progressDiv) {
                    progressDiv.textContent = `${checkedItems}/${totalItems} (${percentage}%)`;
                }
            }
            break;
        }
    }
}

// 匯出檢查清單功能
window.initializeChecklist = initializeChecklist;