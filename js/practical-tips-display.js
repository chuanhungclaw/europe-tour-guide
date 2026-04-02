// 實用提醒功能顯示
function initPracticalTips() {
    console.log('💡 初始化實用提醒功能...');
    
    // 檢查數據是否載入
    if (typeof practicalTipsData === 'undefined') {
        console.error('❌ practicalTipsData 未定義');
        loadPracticalTipsData();
        return;
    }
    
    // 載入提醒內容
    loadAllTips();
    
    // 設定分類切換
    setupCategoryTabs();
    
    console.log('✅ 實用提醒功能初始化完成');
}

// 載入提醒數據
function loadPracticalTipsData() {
    console.log('📦 載入實用提醒數據...');
    
    // 如果數據檔案未載入，創建基本數據
    if (typeof practicalTipsData === 'undefined') {
        console.warn('⚠️ 使用基本提醒數據');
        window.practicalTipsData = {
            luggage: {
                title: "🧳 行李準備",
                tips: [
                    {
                        icon: "fas fa-suitcase-rolling",
                        title: "過夜包必備",
                        description: "庫倫洛夫小鎮大巴無法進入，必須準備過夜包",
                        important: true
                    }
                ]
            }
        };
    }
    
    // 重新初始化
    setTimeout(initPracticalTips, 100);
}

// 載入所有提醒
function loadAllTips() {
    const tipsContainer = document.getElementById('tips');
    if (!tipsContainer) {
        console.error('❌ 找不到 tips 容器');
        return;
    }
    
    // 清空容器
    const tipsContent = tipsContainer.querySelector('.tips-container');
    if (!tipsContent) {
        console.error('❌ 找不到 tips-container');
        return;
    }
    
    tipsContent.innerHTML = '';
    
    // 載入每個分類
    for (const category in practicalTipsData) {
        const categoryData = practicalTipsData[category];
        const categoryDiv = createCategorySection(categoryData);
        tipsContent.appendChild(categoryDiv);
    }
    
    console.log(`✅ 載入 ${Object.keys(practicalTipsData).length} 個分類提醒`);
}

// 創建分類區塊
function createCategorySection(categoryData) {
    const div = document.createElement('div');
    div.className = 'tip-category';
    div.dataset.category = categoryData.title;
    
    // 創建標題
    const titleDiv = document.createElement('div');
    titleDiv.className = 'category-header';
    titleDiv.innerHTML = `
        <h3>
            <i class="${getCategoryIcon(categoryData.title)}"></i>
            ${categoryData.title}
        </h3>
        <span class="tip-count">${categoryData.tips.length} 個提醒</span>
    `;
    
    // 創建提醒列表
    const tipsDiv = document.createElement('div');
    tipsDiv.className = 'tip-list';
    
    categoryData.tips.forEach(tip => {
        const tipItem = createTipItem(tip);
        tipsDiv.appendChild(tipItem);
    });
    
    div.appendChild(titleDiv);
    div.appendChild(tipsDiv);
    
    return div;
}

// 獲取分類圖標
function getCategoryIcon(title) {
    const iconMap = {
        "🧳 行李準備": "fas fa-suitcase",
        "🍽️ 飲食建議": "fas fa-utensils",
        "💰 金錢與支付": "fas fa-money-bill-wave",
        "🏥 健康與安全": "fas fa-heartbeat",
        "📸 拍照技巧": "fas fa-camera",
        "🎭 文化禮儀": "fas fa-theater-masks",
        "🚌 交通與移動": "fas fa-bus",
        "⚠️ 特殊提醒": "fas fa-exclamation-triangle"
    };
    
    return iconMap[title] || "fas fa-lightbulb";
}

// 創建提醒項目
function createTipItem(tip) {
    const div = document.createElement('div');
    div.className = `tip-item ${tip.important ? 'important' : ''}`;
    
    div.innerHTML = `
        <div class="tip-icon">
            <i class="${tip.icon}"></i>
        </div>
        <div class="tip-content">
            <div class="tip-title">
                ${tip.title}
                ${tip.important ? '<span class="tip-important">重要</span>' : ''}
            </div>
            <div class="tip-description">${tip.description}</div>
        </div>
    `;
    
    // 添加點擊事件
    div.addEventListener('click', function() {
        showTipDetail(tip);
    });
    
    return div;
}

// 顯示提醒詳情
function showTipDetail(tip) {
    // 創建詳情彈窗
    const modal = document.createElement('div');
    modal.className = 'tip-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="tip-modal-content" style="
            background: white;
            border-radius: 15px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease;
        ">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <div style="
                    background: #1a237e;
                    color: white;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                ">
                    <i class="${tip.icon}"></i>
                </div>
                <div>
                    <h3 style="margin: 0; color: #1a237e;">${tip.title}</h3>
                    ${tip.important ? '<div style="background: #ff9800; color: white; padding: 2px 10px; border-radius: 10px; font-size: 12px; display: inline-block; margin-top: 5px;">重要提醒</div>' : ''}
                </div>
            </div>
            
            <div style="
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 20px;
                line-height: 1.6;
                color: #333;
            ">
                ${tip.description}
            </div>
            
            <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                <button class="tip-close-btn" style="
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                ">
                    關閉
                </button>
                <button class="tip-mark-read-btn" style="
                    background: #1a237e;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                ">
                    標記為已讀
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 關閉按鈕事件
    modal.querySelector('.tip-close-btn').addEventListener('click', function() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    });
    
    // 標記已讀事件
    modal.querySelector('.tip-mark-read-btn').addEventListener('click', function() {
        markTipAsRead(tip.title);
        modal.querySelector('.tip-close-btn').click();
        showNotification('提醒已標記為已讀', 'success');
    });
    
    // 點擊背景關閉
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.querySelector('.tip-close-btn').click();
        }
    });
}

// 標記提醒為已讀
function markTipAsRead(tipTitle) {
    const readTips = JSON.parse(localStorage.getItem('readTips') || '[]');
    if (!readTips.includes(tipTitle)) {
        readTips.push(tipTitle);
        localStorage.setItem('readTips', JSON.stringify(readTips));
    }
    
    // 更新 UI
    updateReadTips();
}

// 更新已讀提醒
function updateReadTips() {
    const readTips = JSON.parse(localStorage.getItem('readTips') || '[]');
    
    document.querySelectorAll('.tip-item').forEach(item => {
        const title = item.querySelector('.tip-title').textContent.replace('重要', '').trim();
        if (readTips.includes(title)) {
            item.classList.add('read');
        }
    });
}

// 設定分類切換
function setupCategoryTabs() {
    // 創建分類標籤
    const tipsContainer = document.getElementById('tips');
    if (!tipsContainer) return;
    
    const header = tipsContainer.querySelector('.section-header');
    if (!header) return;
    
    // 創建標籤容器
    const tabsDiv = document.createElement('div');
    tabsDiv.className = 'category-tabs';
    tabsDiv.style.cssText = `
        display: flex;
        gap: 10px;
        margin-top: 20px;
        flex-wrap: wrap;
    `;
    
    // 添加「全部」標籤
    const allTab = createCategoryTab('全部', 'all');
    tabsDiv.appendChild(allTab);
    
    // 添加每個分類標籤
    for (const category in practicalTipsData) {
        const categoryData = practicalTipsData[category];
        const tab = createCategoryTab(categoryData.title, category);
        tabsDiv.appendChild(tab);
    }
    
    header.appendChild(tabsDiv);
}

// 創建分類標籤
function createCategoryTab(label, category) {
    const button = document.createElement('button');
    button.className = 'category-tab';
    button.dataset.category = category;
    button.textContent = label;
    
    button.style.cssText = `
        background: #e9ecef;
        color: #6c757d;
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', function() {
        // 更新活動標籤
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.style.background = '#e9ecef';
            tab.style.color = '#6c757d';
        });
        
        this.style.background = '#1a237e';
        this.style.color = 'white';
        
        // 篩選提醒
        filterTipsByCategory(category);
    });
    
    return button;
}

// 篩選提醒
function filterTipsByCategory(category) {
    const allItems = document.querySelectorAll('.tip-category');
    
    if (category === 'all') {
        // 顯示所有
        allItems.forEach(item => {
            item.style.display = 'block';
        });
    } else {
        // 只顯示指定分類
        allItems.forEach(item => {
            if (item.dataset.category === practicalTipsData[category]?.title) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// 初始化函數
window.initPracticalTips = initPracticalTips;

// 自動初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPracticalTips);
} else {
    initPracticalTips();
}