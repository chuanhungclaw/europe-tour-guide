// 景點攻略顯示系統
function initAttractionGuide() {
    console.log('🗺️ 初始化景點攻略系統...');
    
    // 檢查數據是否載入
    if (typeof attractionGuideData === 'undefined') {
        console.error('❌ attractionGuideData 未定義');
        setTimeout(initAttractionGuide, 100);
        return;
    }
    
    // 創建攻略容器
    createGuideContainer();
    
    // 載入景點列表
    loadAttractionList();
    
    // 載入完成統計
    updateCompletionStats();
    
    console.log('✅ 景點攻略系統初始化完成');
}

// 創建攻略容器
function createGuideContainer() {
    // 檢查是否已存在
    if (document.getElementById('attraction-guide-container')) {
        return;
    }
    
    // 創建主容器
    const container = document.createElement('div');
    container.id = 'attraction-guide-container';
    container.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        width: 400px;
        height: 100vh;
        background: white;
        box-shadow: -2px 0 20px rgba(0,0,0,0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        flex-direction: column;
    `;
    
    // 創建標題欄
    const header = document.createElement('div');
    header.style.cssText = `
        background: #1a237e;
        color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    header.innerHTML = `
        <div>
            <h3 style="margin: 0; font-size: 18px;">
                <i class="fas fa-map-marked-alt"></i>
                景點攻略
            </h3>
            <div id="completion-stats" style="font-size: 12px; opacity: 0.8; margin-top: 5px;">
                載入中...
            </div>
        </div>
        <button id="close-guide" style="
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        ">
            &times;
        </button>
    `;
    
    // 創建內容區域
    const content = document.createElement('div');
    content.style.cssText = `
        flex: 1;
        overflow-y: auto;
        padding: 20px;
    `;
    
    // 創建景點列表容器
    const listContainer = document.createElement('div');
    listContainer.id = 'attraction-list';
    listContainer.style.cssText = `
        margin-bottom: 20px;
    `;
    
    // 創建詳情容器
    const detailContainer = document.createElement('div');
    detailContainer.id = 'attraction-detail';
    detailContainer.style.cssText = `
        display: none;
    `;
    
    // 組裝容器
    content.appendChild(listContainer);
    content.appendChild(detailContainer);
    
    container.appendChild(header);
    container.appendChild(content);
    
    document.body.appendChild(container);
    
    // 添加事件監聽
    document.getElementById('close-guide').addEventListener('click', closeGuide);
    
    // 添加全局按鈕
    addGlobalGuideButton();
}

// 添加全局按鈕
function addGlobalGuideButton() {
    // 檢查是否已存在
    if (document.getElementById('global-guide-btn')) {
        return;
    }
    
    const button = document.createElement('button');
    button.id = 'global-guide-btn';
    button.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: #1a237e;
        color: white;
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(26, 35, 126, 0.3);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    button.innerHTML = '<i class="fas fa-map"></i>';
    
    button.addEventListener('click', toggleGuide);
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(button);
}

// 切換攻略面板
function toggleGuide() {
    const container = document.getElementById('attraction-guide-container');
    if (!container) return;
    
    if (container.style.transform === 'translateX(0px)' || container.style.transform === '') {
        closeGuide();
    } else {
        openGuide();
    }
}

// 打開攻略面板
function openGuide() {
    const container = document.getElementById('attraction-guide-container');
    if (!container) return;
    
    container.style.transform = 'translateX(0)';
    
    // 更新統計
    updateCompletionStats();
}

// 關閉攻略面板
function closeGuide() {
    const container = document.getElementById('attraction-guide-container');
    if (!container) return;
    
    container.style.transform = 'translateX(100%)';
    
    // 返回列表
    showAttractionList();
}

// 載入景點列表
function loadAttractionList() {
    const listContainer = document.getElementById('attraction-list');
    if (!listContainer) return;
    
    const attractions = getAllAttractions();
    
    // 按天分組
    const days = {};
    attractions.forEach(attraction => {
        if (!days[attraction.day]) {
            days[attraction.day] = [];
        }
        days[attraction.day].push(attraction);
    });
    
    let html = '<h4 style="color: #1a237e; margin-bottom: 15px;">行程景點</h4>';
    
    // 顯示每一天的景點
    for (let day = 2; day <= 8; day++) {
        if (days[day]) {
            html += `
                <div class="day-section" style="margin-bottom: 20px;">
                    <div style="
                        background: #f8f9fa;
                        padding: 10px 15px;
                        border-radius: 8px;
                        margin-bottom: 10px;
                        font-weight: 500;
                        color: #1a237e;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    ">
                        <span>第 ${day} 天</span>
                        <span style="font-size: 12px; color: #6c757d;">
                            ${getDayCompletion(days[day])}
                        </span>
                    </div>
            `;
            
            days[day].forEach(attraction => {
                html += createAttractionListItem(attraction);
            });
            
            html += '</div>';
        }
    }
    
    listContainer.innerHTML = html;
    
    // 添加點擊事件
    document.querySelectorAll('.attraction-item').forEach(item => {
        item.addEventListener('click', function() {
            const attractionId = this.dataset.id;
            showAttractionDetail(attractionId);
        });
    });
}

// 獲取天完成統計
function getDayCompletion(attractions) {
    const completed = attractions.filter(a => a.completed).length;
    const total = attractions.length;
    return `${completed}/${total} 完成`;
}

// 創建景點列表項目
function createAttractionListItem(attraction) {
    const typeIcons = {
        arrival: 'fas fa-plane-arrival',
        sightseeing: 'fas fa-camera',
        hotel: 'fas fa-hotel'
    };
    
    const typeColors = {
        arrival: '#228b22',
        sightseeing: '#ffd700',
        hotel: '#6a0dad'
    };
    
    return `
        <div class="attraction-item" data-id="${attraction.id}" style="
            background: white;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 15px;
            ${attraction.completed ? 'opacity: 0.7;' : ''}
        ">
            <div style="
                background: ${typeColors[attraction.type]};
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
            ">
                <i class="${typeIcons[attraction.type]}"></i>
            </div>
            <div style="flex: 1;">
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 5px;
                ">
                    <strong style="color: #1a237e;">${attraction.title}</strong>
                    ${attraction.completed ? 
                        '<span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 10px; font-size: 12px;">已完成</span>' : 
                        '<span style="background: #6c757d; color: white; padding: 2px 8px; border-radius: 10px; font-size: 12px;">未完成</span>'
                    }
                </div>
                <div style="color: #6c757d; font-size: 13px; display: flex; align-items: center; gap: 10px;">
                    <span><i class="fas fa-clock"></i> ${attraction.time}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${attraction.location}</span>
                </div>
            </div>
        </div>
    `;
}

// 顯示景點詳情
function showAttractionDetail(attractionId) {
    const attraction = attractionGuideData[attractionId];
    if (!attraction) return;
    
    const detailContainer = document.getElementById('attraction-detail');
    const listContainer = document.getElementById('attraction-list');
    
    if (!detailContainer || !listContainer) return;
    
    // 隱藏列表，顯示詳情
    listContainer.style.display = 'none';
    detailContainer.style.display = 'block';
    
    // 生成詳情內容
    detailContainer.innerHTML = createAttractionDetailHTML(attraction);
    
    // 添加返回按鈕事件
    document.getElementById('back-to-list').addEventListener('click', function() {
        showAttractionList();
    });
    
    // 添加完成/取消完成事件
    const completeBtn = document.getElementById('toggle-complete');
    if (completeBtn) {
        completeBtn.addEventListener('click', function() {
            if (attraction.completed) {
                markAttractionIncomplete(attraction.id);
                showNotification('已標記為未完成', 'info');
            } else {
                markAttractionCompleted(attraction.id);
                showNotification('已標記為完成！', 'success');
            }
            
            // 更新UI
            showAttractionDetail(attraction.id);
            updateCompletionStats();
        });
    }
}

// 創建景點詳情HTML
function createAttractionDetailHTML(attraction) {
    const typeIcons = {
        arrival: 'fas fa-plane-arrival',
        sightseeing: 'fas fa-camera',
        hotel: 'fas fa-hotel'
    };
    
    const typeColors = {
        arrival: '#228b22',
        sightseeing: '#ffd700',
        hotel: '#6a0dad'
    };
    
    return `
        <div>
            <!-- 返回按鈕 -->
            <button id="back-to-list" style="
                background: none;
                border: none;
                color: #1a237e;
                font-size: 16px;
                cursor: pointer;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 8px;
            ">
                <i class="fas fa-arrow-left"></i> 返回列表
            </button>
            
            <!-- 景點標題 -->
            <div style="
                background: ${typeColors[attraction.type]};
                color: white;
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 20px;
            ">
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                    <div style="
                        background: rgba(255,255,255,0.2);
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 24px;
                    ">
                        <i class="${typeIcons[attraction.type]}"></i>
                    </div>
                    <div style="flex: 1;">
                        <h3 style="margin: 0; font-size: 20px;">${attraction.title}</h3>
                        <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 14px;">${attraction.subtitle}</p>
                    </div>
                </div>
                
                <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px; font-size: 13px;">
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <i class="fas fa-calendar-day"></i>
                        <span>第 ${attraction.day} 天</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <i class="fas fa-clock"></i>
                        <span>${attraction.time}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${attraction.location}</span>
                    </div>
                </div>
            </div>
            
            <!-- 完成狀態按鈕 -->
            <button id="toggle-complete" style="
                width: 100%;
                background: ${attraction.completed ? '#6c757d' : '#28a745'};
                color: white;
                border: none;
                padding: 12px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            ">
                <i class="fas ${attraction.completed ? 'fa-undo' : 'fa-check'}"></i>
                ${attraction.completed ? '標記為未完成' : '標記為已完成'}
            </button>
            
            <!-- 詳細介紹 -->
            <div class="detail-section">
                <h4 style="color: #1a237e; margin-bottom: 10px;">
                    <i class="fas fa-info-circle"></i> 詳細介紹
                </h4>
                <p style="color: #333; line-height: 1.6;">${attraction.description}</p>
            </div>
            
            <!-- 特色亮點 -->
            <div class="detail-section">
                <h4 style="color: #1a237e; margin-bottom: 10px;">
                    <i class="fas fa-star"></i> 特色亮點
                </h4>
                <div style="display: grid; gap: 10px;">
                    ${attraction.highlights.map(highlight => `
                        <div style="
                            background: #f8f9fa;
                            padding: 15px;
                            border-radius: 8px;
                            border-left: 4px solid #1a237e;
                        ">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                                <i class="${highlight.icon}" style="color: #1a237e;"></i>
                                <strong style="color: #1a237e;">${highlight.title}</strong>
                            </div>
                            <p style="color: #666; margin: 0; font-size: 14px;">${highlight.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- 攻略建議 -->
            <div class="detail-section">
                <h4 style="color: #1a237e; margin-bottom: 10px;">
                    <i class="fas fa-lightbulb"></i> 攻略建議
                </h4>
                <ul style="color: #333; padding-left: 20px; margin: 0;">
                    ${attraction.guideTips.map(tip => `
                        <li style="margin-bottom: 8px; line-height: 1.5;">${tip}</li>
                    `).join('')}
                </ul>
            </div>
            
            <!-- 注意事項 -->
            <div class="detail-section">
                <h4 style="color: #1a237e; margin-bottom: 10px;">
                    <i class="fas fa-exclamation-triangle"></i> 注意事項
                </h4>
                <ul style="color: #333; padding-left: 20px; margin: 0;">
                    ${attraction.precautions.map(precaution => `
                        <li style="margin-bottom: 8px; line-height: 1.5;">${precaution}</li>
                    `).join('')}
                </ul>
            </div>
            
            <!-- 飯店資訊 -->
            ${attraction.type === 'hotel' ? `
                <div class="detail-section">
                    <h4 style="color: #1a237e; margin-bottom: 10px;">
                        <i class="fas fa-hotel"></i> 飯店資訊
                    </h4>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <div style="margin-bottom: 10px;">
                            <strong style="color: #1a237e;">${attraction.hotel.name}</strong>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                            <div>
                                <small style="color: #6c757d;">入住時間</small>
                                <div style="color: #333;">${attraction.hotel.checkIn}</div>
                            </div>
                            <div>
                                <small style="color: #6c757d;">退房時間</small>
                                <div style="color: #333;">${attraction.hotel.checkOut}</div>
                            </div>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <small style="color: #6c757d;">設施服務</small>
                            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 5px;">
                                ${attraction.hotel.amenities.map(amenity => `
                                    <span style="
                                        background: #e3f2fd;
                                        color: #1a237e;
                                        padding: 4px 10px;
                                        border-radius: 12px;
                                        font-size: 12px;
                                    ">${amenity}</span>
                                `).join('')}
                            </div>
                        </div>
                        <div>
                            <small style="color: #6c757d;">實用建議</small>
                            <ul style="color: #333; padding-left: 20px; margin: 5px 0 0 0; font-size: 14px;">
                                ${attraction.hotel.tips.map(tip => `
                                    <li style="margin-bottom: 5px;">${tip}</li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            ` : ''}
            
            <!-- 天氣資訊 -->
            <div class="detail-section">
                <h4 style="color: #1a237e; margin-bottom: 10px;">
                    <i class="fas fa-cloud-sun"></i> 天氣資訊
                </h4>
                <div style="
                    background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
                    padding: 15px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                ">
                    <div style="
                        background: white;
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 28px;
                        color: #1a237e;
                    ">
                        <i class="${attraction.weather.icon}"></i>
                    </div>
                    <div style="flex: 1;">
                        <div style="font-size: 24px; font-weight: bold; color: #1a237e;">
                            ${attraction.weather.temperature}
                        </div>
                        <div style="color: #666; font-size: 14px;">
                            ${attraction.weather.condition}
                        </div>
                    </div>
                </div>
                <div style="margin-top: 10px;">
                    <small style="color: #6c757d;">穿著建議</small>
                    <ul style="color: #333; padding-left: 20px; margin: 5px 0 0 0; font-size: 14px;">
                        ${attraction.weather.tips.map(tip => `
                            <li style="margin-bottom: 5px;">${tip}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
            
            <!-- 交通資訊 -->
            <div class="detail-section">
                <h4 style="color: #1a237e; margin-bottom: 10px;">
                    <i class="fas fa-bus"></i> 交通資訊
                </h4>
                <ul style="color: #333; padding-left: 20px; margin: 0;">
                    ${attraction.transportation.map(transport => `
                        <li style="margin-bottom: 8px; line-height: 1.5;">${transport}</li>
                    `).join('')}
                </ul>
            </div>
            
            <!-- 照片參考 -->
            <div class="detail-section">
                <h4 style="color: #1a237e; margin-bottom: 10px;">
                    <i class="fas fa-images"></i> 照片參考
                </h4>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${attraction.photos.map(photo => `
                        <div style="
                            background: #f8f9fa;
                            padding: 10px 15px;
                            border-radius: 8px;
                            font-size: 13px;
                            color: #666;
                            border: 1px solid #e9ecef;
                        ">
                            <i class="fas fa-camera" style="margin-right: 5px;"></i>
                            ${photo}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// 顯示景點列表
function showAttractionList() {
    const detailContainer = document.getElementById('attraction-detail');
    const listContainer = document.getElementById('attraction-list');
    
    if (!detailContainer || !listContainer) return;
    
    detailContainer.style.display = 'none';
    listContainer.style.display = 'block';
    
    // 重新載入列表（更新完成狀態）
    loadAttractionList();
}

// 更新完成統計
function updateCompletionStats() {
    const statsElement = document.getElementById('completion-stats');
    if (!statsElement) return;
    
    const stats = getCompletionStats();
    statsElement.innerHTML = `
        <i class="fas fa-chart-line"></i>
        完成度: ${stats.completed}/${stats.total} (${stats.percentage}%)
    `;
}

// 顯示通知
function showNotification(message, type = 'info') {
    console.log(`📢 ${type}: ${message}`);
    
    // 簡單的console通知
    if (type === 'success') {
        console.log(`✅ ${message}`);
    } else if (type === 'error') {
        console.error(`❌ ${message}`);
    }
}

// CSS樣式
const guideStyles = `
    .detail-section {
        margin-bottom: 25px;
        padding-bottom: 25px;
        border-bottom: 1px solid #e9ecef;
    }
    
    .detail-section:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
    
    .attraction-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        border-color: #1a237e;
    }
`;

// 添加CSS樣式
const styleElement = document.createElement('style');
styleElement.textContent = guideStyles;
document.head.appendChild(styleElement);

// 初始化函數
window.initAttractionGuide = initAttractionGuide;
window.toggleGuide = toggleGuide;
window.openGuide = openGuide;
window.closeGuide = closeGuide;

// 自動初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAttractionGuide);
} else {
    initAttractionGuide();
}