// 詳細景點資訊與攻略系統
class DetailedAttractionGuide {
    constructor() {
        this.attractions = {
            budapest: {
                id: 'budapest',
                name: '布達佩斯',
                country: '匈牙利',
                days: '第2-3天',
                description: '匈牙利首都，被譽為「多瑙河上的明珠」，分為布達和佩斯兩部分，由多座橋樑連接。',
                overview: '布達佩斯是歐洲最美麗的城市之一，擁有豐富的歷史遺產、溫泉文化和美食。',
                
                mainAttractions: [
                    {
                        name: '布達城堡',
                        type: '歷史建築',
                        time: '2-3小時',
                        price: '免費（部分展館需門票）',
                        description: '位於布達山頂的歷史城堡，曾是匈牙利國王的宮殿，現為博物館和美術館。',
                        tips: [
                            '建議上午前往，避開人潮',
                            '可搭乘纜車上山，欣賞多瑙河美景',
                            '城堡內有多個博物館，可購買聯票'
                        ],
                        photos: 5,
                        rating: 4.8
                    },
                    {
                        name: '漁人堡',
                        type: '歷史建築',
                        time: '1-2小時',
                        price: '部分區域免費',
                        description: '新羅馬式建築，位於布達城堡旁，提供絕佳的城市全景視野。',
                        tips: [
                            '最佳拍照時間：日出或日落時分',
                            '二樓觀景台需門票，但視野更好',
                            '附近有多家咖啡館可休息'
                        ],
                        photos: 4,
                        rating: 4.7
                    },
                    {
                        name: '國會大廈',
                        type: '政府建築',
                        time: '1.5-2小時',
                        price: '需預約導覽',
                        description: '匈牙利最大的建築，新哥德式風格，位於多瑙河畔，夜景特別美麗。',
                        tips: [
                            '必須提前預約英文導覽',
                            '安檢嚴格，請勿攜帶大型背包',
                            '夜景燈光秀在晚上8點開始'
                        ],
                        photos: 6,
                        rating: 4.9
                    }
                ],
                
                practicalInfo: {
                    bestTime: '4-6月、9-10月',
                    weather: '溫帶大陸性氣候，夏季溫暖，冬季寒冷',
                    currency: '匈牙利福林 (HUF)',
                    language: '匈牙利語，英語在旅遊區通用',
                    voltage: '230V，歐規兩圓孔插座',
                    emergency: '112（歐盟通用緊急電話）'
                },
                
                foodRecommendations: [
                    {
                        name: '匈牙利燉牛肉',
                        type: '傳統料理',
                        description: '匈牙利國菜，使用紅椒粉和牛肉慢燉而成',
                        priceRange: '中等',
                        mustTry: true
                    },
                    {
                        name: '蘭戈斯',
                        type: '街頭小吃',
                        description: '油炸麵餅，可搭配大蒜、酸奶油、乳酪',
                        priceRange: '便宜',
                        mustTry: true
                    }
                ],
                
                transportation: {
                    fromAirport: '機場巴士100E直達市中心，約30分鐘',
                    withinCity: '地鐵、電車、巴士系統完善，建議購買24小時票',
                    toNextCity: '火車或巴士前往布拉提斯拉瓦，約2.5小時'
                },
                
                shopping: {
                    souvenirs: [
                        '匈牙利紅椒粉',
                        '托卡伊貴腐酒',
                        '赫倫瓷器',
                        '手工刺繡'
                    ],
                    markets: [
                        '中央市場（購買紀念品和食品）',
                        '瓦茨街（購物街）'
                    ]
                }
            },
            
            vienna: {
                id: 'vienna',
                name: '維也納',
                country: '奧地利',
                days: '第5-6天',
                description: '奧地利首都，音樂之都，擁有豐富的藝術、音樂和歷史遺產。',
                overview: '維也納是歐洲文化中心，以古典音樂、咖啡文化和帝國建築聞名。',
                
                mainAttractions: [
                    {
                        name: '美泉宮',
                        type: '宮殿',
                        time: '3-4小時',
                        price: '宮殿導覽需門票',
                        description: '哈布斯堡王朝的夏宮，擁有1441個房間和美麗的巴洛克花園。',
                        tips: [
                            '建議預約早上的時段',
                            '花園免費開放，非常適合散步',
                            '可購買Sisi Ticket包含多個景點'
                        ],
                        photos: 8,
                        rating: 4.9
                    },
                    {
                        name: '霍夫堡宮',
                        type: '宮殿',
                        time: '2-3小時',
                        price: '部分展館需門票',
                        description: '哈布斯堡王朝的冬宮，現為總統官邸和多個博物館。',
                        tips: [
                            '參觀Sisi Museum了解伊莉莎白皇后',
                            '皇家銀器館展示精美餐具',
                            '可觀看西班牙騎術學校表演'
                        ],
                        photos: 6,
                        rating: 4.7
                    }
                ],
                
                practicalInfo: {
                    bestTime: '4-6月、9-10月',
                    weather: '溫帶大陸性氣候，四季分明',
                    currency: '歐元 (EUR)',
                    language: '德語，英語廣泛使用',
                    voltage: '230V，歐規兩圓孔插座',
                    emergency: '112'
                }
            },
            
            prague: {
                id: 'prague',
                name: '布拉格',
                country: '捷克',
                days: '第8-9天',
                description: '捷克首都，被譽為「百塔之城」，完整保存了中世紀風貌。',
                overview: '布拉格是歐洲最美麗的城市之一，以哥德式建築、城堡和啤酒聞名。',
                
                mainAttractions: [
                    {
                        name: '布拉格城堡',
                        type: '城堡',
                        time: '3-4小時',
                        price: '部分區域免費，套票參觀',
                        description: '世界上最大的古城堡，包含聖維特大教堂、舊皇宮等建築。',
                        tips: [
                            '購買城堡套票較划算',
                            '衛兵換崗儀式在中午12點',
                            '從城堡可俯瞰全城美景'
                        ],
                        photos: 7,
                        rating: 4.9
                    },
                    {
                        name: '查理大橋',
                        type: '橋樑',
                        time: '1小時',
                        price: '免費',
                        description: '布拉格最古老的橋，兩側有30尊巴洛克雕像，連接舊城和小城。',
                        tips: [
                            '建議清晨或傍晚前往，避開人潮',
                            '橋上有街頭藝人和畫家',
                            '從橋上可拍攝城堡美景'
                        ],
                        photos: 5,
                        rating: 4.8
                    }
                ],
                
                practicalInfo: {
                    bestTime: '5-9月',
                    weather: '溫帶大陸性氣候',
                    currency: '捷克克朗 (CZK)',
                    language: '捷克語，英語在旅遊區通用',
                    voltage: '230V，歐規兩圓孔插座',
                    emergency: '112'
                }
            }
        };
        
        console.log('🏛️ 詳細景點攻略系統初始化...');
    }
    
    // 初始化
    init() {
        // 檢查是否在正確的頁面
        const currentSection = this.getCurrentSection();
        
        if (currentSection === 'itinerary' || currentSection === 'map') {
            this.setupAttractionGuide();
        }
        
        console.log('✅ 詳細景點攻略系統初始化完成');
    }
    
    // 獲取當前區塊
    getCurrentSection() {
        const activeSection = document.querySelector('.section.active');
        if (activeSection) {
            return activeSection.id;
        }
        return null;
    }
    
    // 設置景點指南
    setupAttractionGuide() {
        // 在完整行程區塊添加詳細指南按鈕
        this.addGuideButtonsToItinerary();
        
        // 在地圖區塊添加詳細資訊
        this.enhanceMapInfoPanel();
        
        // 創建詳細指南面板
        this.createDetailedGuidePanel();
    }
    
    // 在行程中添加指南按鈕
    addGuideButtonsToItinerary() {
        const itineraryContent = document.getElementById('itineraryContent');
        if (!itineraryContent) return;
        
        // 等待行程內容載入
        setTimeout(() => {
            const dayItems = itineraryContent.querySelectorAll('.day-item');
            
            dayItems.forEach((item, index) => {
                const cityName = this.getCityNameFromDay(index + 1);
                if (cityName && this.attractions[cityName]) {
                    const guideBtn = document.createElement('button');
                    guideBtn.className = 'guide-details-btn';
                    guideBtn.innerHTML = '<i class="fas fa-info-circle"></i> 詳細攻略';
                    guideBtn.setAttribute('data-city', cityName);
                    
                    guideBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.showDetailedGuide(cityName);
                    });
                    
                    item.appendChild(guideBtn);
                }
            });
        }, 1000);
    }
    
    // 從天數獲取城市名稱
    getCityNameFromDay(day) {
        const dayToCity = {
            2: 'budapest',
            3: 'budapest',
            4: 'bratislava',
            5: 'vienna',
            6: 'vienna',
            7: 'brno',
            8: 'prague',
            9: 'prague',
            10: 'cesky-krumlov'
        };
        
        return dayToCity[day] || null;
    }
    
    // 增強地圖資訊面板
    enhanceMapInfoPanel() {
        // 監聽地圖資訊面板更新
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    this.addDetailedInfoToMapPanel();
                }
            });
        });
        
        const infoPanel = document.getElementById('mapInfoPanel');
        if (infoPanel) {
            observer.observe(infoPanel, { childList: true, subtree: true });
        }
    }
    
    // 在地圖面板添加詳細資訊
    addDetailedInfoToMapPanel() {
        const infoContent = document.getElementById('mapInfoContent');
        if (!infoContent) return;
        
        // 檢查是否已有城市資訊
        const cityHeader = infoContent.querySelector('.city-info-header h4');
        if (!cityHeader) return;
        
        const cityName = cityHeader.textContent.trim();
        const cityKey = this.getCityKeyByName(cityName);
        
        if (cityKey && this.attractions[cityKey]) {
            // 添加「查看詳細攻略」按鈕
            const existingBtn = infoContent.querySelector('.view-detailed-guide-btn');
            if (!existingBtn) {
                const guideBtn = document.createElement('button');
                guideBtn.className = 'view-detailed-guide-btn';
                guideBtn.innerHTML = '<i class="fas fa-book-open"></i> 查看詳細攻略';
                guideBtn.addEventListener('click', () => {
                    this.showDetailedGuide(cityKey);
                });
                
                infoContent.appendChild(guideBtn);
            }
        }
    }
    
    // 根據城市名稱獲取鍵值
    getCityKeyByName(cityName) {
        const cityMap = {
            '布達佩斯': 'budapest',
            '布拉提斯拉瓦': 'bratislava',
            '維也納': 'vienna',
            '布爾諾': 'brno',
            '布拉格': 'prague',
            '庫倫洛夫': 'cesky-krumlov'
        };
        
        return cityMap[cityName] || null;
    }
    
    // 創建詳細指南面板
    createDetailedGuidePanel() {
        // 檢查是否已存在
        if (document.getElementById('detailedGuidePanel')) return;
        
        const guidePanel = document.createElement('div');
        guidePanel.id = 'detailedGuidePanel';
        guidePanel.className = 'detailed-guide-panel';
        guidePanel.innerHTML = `
            <div class="guide-panel-header">
                <h3><i class="fas fa-book"></i> 詳細景點攻略</h3>
                <button class="close-guide-btn" id="closeGuideBtn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="guide-panel-content" id="guidePanelContent">
                <!-- 詳細攻略內容將動態載入 -->
            </div>
        `;
        
        document.body.appendChild(guidePanel);
        
        // 設置關閉按鈕事件
        const closeBtn = document.getElementById('closeGuideBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideDetailedGuide();
            });
        }
        
        // 點擊背景關閉
        guidePanel.addEventListener('click', (e) => {
            if (e.target === guidePanel) {
                this.hideDetailedGuide();
            }
        });
    }
    
    // 顯示詳細指南
    showDetailedGuide(cityKey) {
        const attraction = this.attractions[cityKey];
        if (!attraction) return;
        
        const guidePanel = document.getElementById('detailedGuidePanel');
        const guideContent = document.getElementById('guidePanelContent');
        
        if (!guidePanel || !guideContent) return;
        
        // 生成詳細攻略內容
        guideContent.innerHTML = this.generateDetailedGuideHTML(attraction);
        
        // 顯示面板
        guidePanel.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滾動
    }
    
    // 生成詳細攻略HTML
    generateDetailedGuideHTML(attraction) {
        return `
            <div class="detailed-guide-content">
                <div class="guide-header">
                    <h2>${attraction.name} - 詳細旅遊攻略</h2>
                    <div class="guide-meta">
                        <span class="meta-country"><i class="fas fa-flag"></i> ${attraction.country}</span>
                        <span class="meta-days"><i class="fas fa-calendar"></i> ${attraction.days}</span>
                    </div>
                </div>
                
                <div class="guide-section">
                    <h3><i class="fas fa-info-circle"></i> 城市概述</h3>
                    <p>${attraction.description}</p>
                    <p>${attraction.overview}</p>
                </div>
                
                ${attraction.mainAttractions ? `
                <div class="guide-section">
                    <h3><i class="fas fa-landmark"></i> 主要景點</h3>
                    <div class="attractions-list">
                        ${attraction.mainAttractions.map(attr => `
                            <div class="attraction-detail">
                                <h4>${attr.name} <span class="attraction-type">${attr.type}</span></h4>
                                <div class="attraction-meta">
                                    <span><i class="fas fa-clock"></i> ${attr.time}</span>
                                    <span><i class="fas fa-tag"></i> ${attr.price}</span>
                                    <span><i class="fas fa-star"></i> ${attr.rating}/5.0</span>
                                </div>
                                <p>${attr.description}</p>
                                ${attr.tips ? `
                                <div class="attraction-tips">
                                    <h5><i class="fas fa-lightbulb"></i> 實用提示：</h5>
                                    <ul>
                                        ${attr.tips.map(tip => `<li>${tip}</li>`).join('')}
                                    </ul>
                                </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${attraction.practicalInfo ? `
                <div class="guide-section">
                    <h3><i class="fas fa-info"></i> 實用資訊</h3>
                    <div class="info-grid">
                        ${Object.entries(attraction.practicalInfo).map(([key, value]) => `
                            <div class="info-item">
                                <strong>${this.getInfoLabel(key)}：</strong>
                                <span>${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${attraction.foodRecommendations ? `
                <div class="guide-section">
                    <h3><i class="fas fa-utensils"></i> 美食推薦</h3>
                    <div class="food-list">
                        ${attraction.foodRecommendations.map(food => `
                            <div class="food-item ${food.mustTry ? 'must-try' : ''}">
                                <h4>${food.name} <span class="food-type">${food.type}</span></h4>
                                <p>${food.description}</p>
                                <div class="food-meta">
                                    <span>價格：${food.priceRange}</span>
                                    ${food.mustTry ? '<span class="must-try-badge">必試</span>' : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${attraction.transportation ? `
                <div class="guide-section">
                    <h3><i class="fas fa-subway"></i> 交通資訊</h3>
                    <div class="transportation-info">
                        ${Object.entries(attraction.transportation).map(([key, value]) => `
                            <div class="transport-item">
                                <strong>${this.getTransportLabel(key)}：</strong>
                                <span>${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `;
    }
    
    // 獲取資訊標籤
    getInfoLabel(key) {
        const labels = {
            bestTime: '最佳旅遊時間',
            weather: '氣候',
            currency: '貨幣',
            language: '語言',
            voltage: '電壓',
            emergency: '緊急電話'
        };
        
        return labels[key] || key;
    }
    
    // 獲取交通標籤
    getTransportLabel(key) {
        const labels = {
            fromAirport: '機場到市區',
            withinCity: '市內交通',
            toNextCity: '前往下一城市'
        };
        
        return labels[key] || key;
    }
    
    // 隱藏詳細指南
    hideDetailedGuide() {
        const guidePanel = document.getElementById('detailedGuidePanel');
        if (guidePanel) {
            guidePanel.style.display = 'none';
            document.body.style.overflow = ''; // 恢復滾動
        }
    }
}

// 立即初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 初始化詳細景點攻略系統...');
    window.detailedAttractionGuide = new DetailedAttractionGuide();
    window.detailedAttractionGuide.init();
    
    console.log('✅ 詳細景點攻略系統已就緒');
});

// 提供調試功能
window.debugAttractionGuide = function() {
    if (window.detailedAttractionGuide) {
        console.log('🔍 景點攻略系統狀態：');
        console.log('城市數量：', Object.keys(window.detailedAttractionGuide.attractions).length);
        return window.detailedAttractionGuide.attractions;
    } else {
        console.error('❌ 景點攻略系統未初始化');
        return null;
    }
};