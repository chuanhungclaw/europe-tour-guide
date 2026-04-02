// 緊急數據修復系統
class EmergencyDataFix {
    constructor() {
        console.log('🚨 緊急數據修復系統啟動...');
        this.dataLoaded = false;
        this.todayData = null;
        this.itineraryData = null;
        this.mapData = null;
        this.tipsData = null;
        this.checklistData = null;
    }
    
    // 初始化
    init() {
        this.loadAllData();
        this.injectDataIntoDOM();
        this.setupDataFallback();
        
        console.log('✅ 緊急數據修復系統初始化完成');
    }
    
    // 載入所有數據
    loadAllData() {
        console.log('📊 載入緊急數據...');
        
        // 今日行程數據
        this.todayData = this.getTodayData();
        
        // 完整行程數據
        this.itineraryData = this.getItineraryData();
        
        // 地圖數據
        this.mapData = this.getMapData();
        
        // 實用提醒數據
        this.tipsData = this.getTipsData();
        
        // 檢查清單數據
        this.checklistData = this.getChecklistData();
        
        this.dataLoaded = true;
        console.log('📊 所有緊急數據載入完成');
    }
    
    // 獲取今日行程數據
    getTodayData() {
        return {
            day: 1,
            title: '出發前往歐洲',
            date: '2026-04-02',
            schedule: [
                {
                    time: '15:30',
                    title: '機場集合',
                    location: '桃園國際機場第二航廈',
                    description: '請於第二航廈出境大廳集合，攜帶護照、機票、簽證等文件。',
                    icon: 'fas fa-users',
                    color: '#4cc9f0'
                },
                {
                    time: '17:00',
                    title: '辦理登機手續',
                    location: '長榮航空櫃檯',
                    description: '辦理行李托運、領取登機證，建議提前2.5小時到達。',
                    icon: 'fas fa-suitcase-rolling',
                    color: '#4361ee'
                },
                {
                    time: '18:30',
                    title: '機場晚餐',
                    location: '機場美食街',
                    description: '自由用餐時間，建議品嚐台灣特色美食。',
                    icon: 'fas fa-utensils',
                    color: '#3a86ff'
                },
                {
                    time: '20:10',
                    title: '起飛前往歐洲',
                    location: '桃園國際機場 → 維也納機場',
                    description: '航班：BR65，飛行時間約12小時，抵達維也納時間：當地時間早上6:30。',
                    icon: 'fas fa-plane-departure',
                    color: '#7209b7'
                }
            ],
            importantNotes: [
                '請確認護照有效期超過6個月',
                '攜帶歐元現金和信用卡',
                '準備歐洲轉接插頭',
                '下載離線地圖和翻譯APP'
            ],
            weather: {
                destination: '維也納，奧地利',
                temperature: '8°C',
                condition: '多雲轉晴',
                icon: 'fas fa-cloud-sun'
            }
        };
    }
    
    // 獲取完整行程數據
    getItineraryData() {
        return {
            tripName: '10天歐洲四國之旅',
            countries: ['匈牙利', '斯洛伐克', '奧地利', '捷克'],
            days: [
                {
                    day: 1,
                    title: '出發前往歐洲',
                    location: '台灣 → 維也納',
                    description: '機場集合，搭乘長榮航空BR65航班前往維也納。',
                    highlights: ['機場集合', '辦理登機', '起飛前往歐洲']
                },
                {
                    day: 2,
                    title: '布達佩斯',
                    location: '匈牙利',
                    description: '抵達維也納後轉乘巴士前往布達佩斯，參觀布達城堡、漁人堡。',
                    highlights: ['布達城堡', '漁人堡', '多瑙河遊船']
                },
                {
                    day: 3,
                    title: '布達佩斯',
                    location: '匈牙利',
                    description: '參觀國會大廈、塞切尼溫泉浴場，體驗匈牙利溫泉文化。',
                    highlights: ['國會大廈', '塞切尼溫泉', '中央市場']
                },
                {
                    day: 4,
                    title: '布拉提斯拉瓦',
                    location: '斯洛伐克',
                    description: '前往斯洛伐克首都，參觀布拉提斯拉瓦城堡和舊城區。',
                    highlights: ['布拉提斯拉瓦城堡', '舊城區', '聖馬丁大教堂']
                },
                {
                    day: 5,
                    title: '維也納',
                    location: '奧地利',
                    description: '前往音樂之都維也納，參觀美泉宮和霍夫堡宮。',
                    highlights: ['美泉宮', '霍夫堡宮', '維也納國家歌劇院']
                },
                {
                    day: 6,
                    title: '維也納',
                    location: '奧地利',
                    description: '參觀聖史蒂芬大教堂，體驗維也納咖啡館文化。',
                    highlights: ['聖史蒂芬大教堂', '咖啡館體驗', '購物時間']
                },
                {
                    day: 7,
                    title: '布爾諾',
                    location: '捷克',
                    description: '前往捷克第二大城市布爾諾，參觀斯皮爾貝克城堡。',
                    highlights: ['斯皮爾貝克城堡', '自由廣場', '聖彼得與聖保羅大教堂']
                },
                {
                    day: 8,
                    title: '布拉格',
                    location: '捷克',
                    description: '前往布拉格，參觀布拉格城堡和查理大橋。',
                    highlights: ['布拉格城堡', '查理大橋', '舊城廣場']
                },
                {
                    day: 9,
                    title: '布拉格',
                    location: '捷克',
                    description: '參觀天文鐘，自由探索布拉格老城區。',
                    highlights: ['天文鐘', '猶太區', '購物時間']
                },
                {
                    day: 10,
                    title: '庫倫洛夫',
                    location: '捷克',
                    description: '前往童話小鎮庫倫洛夫，參觀庫倫洛夫城堡。',
                    highlights: ['庫倫洛夫城堡', '舊城區', '伏爾塔瓦河']
                }
            ]
        };
    }
    
    // 獲取地圖數據
    getMapData() {
        return {
            cities: [
                {
                    id: 'budapest',
                    name: '布達佩斯',
                    country: '匈牙利',
                    days: '第2-3天',
                    x: 550,
                    y: 320,
                    description: '匈牙利首都，被譽為「多瑙河上的明珠」，分為布達和佩斯兩部分。',
                    attractions: ['布達城堡', '漁人堡', '國會大廈', '塞切尼溫泉浴場']
                },
                {
                    id: 'bratislava',
                    name: '布拉提斯拉瓦',
                    country: '斯洛伐克',
                    days: '第4天',
                    x: 500,
                    y: 290,
                    description: '斯洛伐克首都，位於多瑙河畔，歷史悠久的老城區保存完好。',
                    attractions: ['布拉提斯拉瓦城堡', '舊城區', '聖馬丁大教堂']
                },
                {
                    id: 'vienna',
                    name: '維也納',
                    country: '奧地利',
                    days: '第5-6天',
                    x: 470,
                    y: 270,
                    description: '奧地利首都，音樂之都，擁有豐富的藝術和歷史遺產。',
                    attractions: ['美泉宮', '霍夫堡宮', '聖史蒂芬大教堂']
                },
                {
                    id: 'prague',
                    name: '布拉格',
                    country: '捷克',
                    days: '第8-9天',
                    x: 490,
                    y: 230,
                    description: '捷克首都，被譽為「百塔之城」，完整保存了中世紀風貌。',
                    attractions: ['布拉格城堡', '查理大橋', '天文鐘']
                }
            ]
        };
    }
    
    // 獲取實用提醒數據
    getTipsData() {
        return {
            categories: [
                {
                    name: '文件與證件',
                    icon: 'fas fa-passport',
                    tips: [
                        '護照有效期需超過6個月',
                        '準備簽證或申根簽證',
                        '影印重要文件備份',
                        '購買旅遊保險'
                    ]
                },
                {
                    name: '金錢與支付',
                    icon: 'fas fa-money-bill-wave',
                    tips: [
                        '準備歐元現金（小額鈔票）',
                        '通知銀行信用卡將在國外使用',
                        '準備國際提款卡',
                        '下載匯率轉換APP'
                    ]
                },
                {
                    name: '行李準備',
                    icon: 'fas fa-suitcase',
                    tips: [
                        '根據天氣準備衣物（洋蔥式穿法）',
                        '準備舒適的步行鞋',
                        '歐洲轉接插頭',
                        '個人藥品和急救包'
                    ]
                },
                {
                    name: '健康與安全',
                    icon: 'fas fa-heartbeat',
                    tips: [
                        '準備個人常用藥品',
                        '購買旅遊醫療保險',
                        '注意飲食衛生',
                        '保存緊急聯絡電話'
                    ]
                }
            ]
        };
    }
    
    // 獲取檢查清單數據
    getChecklistData() {
        return {
            categories: [
                {
                    name: '文件檢查',
                    icon: 'fas fa-file-alt',
                    items: [
                        { text: '護照（有效期超過6個月）', checked: false },
                        { text: '簽證/申根簽證', checked: false },
                        { text: '機票/電子機票', checked: false },
                        { text: '旅遊保險文件', checked: false },
                        { text: '駕照/國際駕照', checked: false }
                    ]
                },
                {
                    name: '衣物準備',
                    icon: 'fas fa-tshirt',
                    items: [
                        { text: '外套（防風防水）', checked: false },
                        { text: '舒適步行鞋', checked: false },
                        { text: '換洗衣物（10天份）', checked: false },
                        { text: '雨具（雨傘/雨衣）', checked: false },
                        { text: '睡衣/室內拖鞋', checked: false }
                    ]
                },
                {
                    name: '電子產品',
                    icon: 'fas fa-laptop',
                    items: [
                        { text: '手機及充電器', checked: false },
                        { text: '相機/攝影機', checked: false },
                        { text: '歐洲轉接插頭', checked: false },
                        { text: '行動電源', checked: false },
                        { text: '耳機', checked: false }
                    ]
                },
                {
                    name: '個人用品',
                    icon: 'fas fa-toothbrush',
                    items: [
                        { text: '牙刷/牙膏', checked: false },
                        { text: '洗面乳/保養品', checked: false },
                        { text: '毛巾', checked: false },
                        { text: '防曬乳', checked: false },
                        { text: '個人藥品', checked: false }
                    ]
                }
            ]
        };
    }
    
    // 將數據注入到DOM
    injectDataIntoDOM() {
        console.log('💉 將緊急數據注入到DOM...');
        
        // 立即注入今日行程數據
        this.injectTodayData();
        
        // 監聽頁面切換，動態注入其他數據
        this.setupDataInjectionListener();
        
        console.log('✅ 緊急數據注入完成');
    }
    
    // 注入今日行程數據
    injectTodayData() {
        const todayContent = document.getElementById('todayContent');
        if (!todayContent) {
            console.error('❌ 找不到今日行程容器');
            return;
        }
        
        // 清除載入動畫
        const loadingElements = todayContent.querySelectorAll('.travel-loading, .loading-spinner');
        loadingElements.forEach(el => el.remove());
        
        // 注入今日行程HTML
        todayContent.innerHTML = this.generateTodayHTML();
        
        console.log('✅ 今日行程數據注入完成');
    }
    
    // 生成今日行程HTML
    generateTodayHTML() {
        const data = this.todayData;
        
        return `
            <div class="today-header">
                <div class="day-indicator">
                    <span class="day-number">第${data.day}天</span>
                    <span class="day-title">${data.title}</span>
                </div>
                <div class="today-date">
                    <i class="fas fa-calendar"></i>
                    <span>${data.date}</span>
                </div>
            </div>
            
            <div class="schedule-timeline">
                ${data.schedule.map((item, index) => `
                    <div class="schedule-item" data-index="${index}">
                        <div class="timeline-marker">
                            <div class="marker-icon" style="background: ${item.color};">
                                <i class="${item.icon}"></i>
                            </div>
                            <div class="timeline-line"></div>
                        </div>
                        <div class="schedule-details">
                            <div class="schedule-time">
                                <i class="fas fa-clock"></i>
                                <strong>${item.time}</strong>
                            </div>
                            <div class="schedule-title">
                                <h4>${item.title}</h4>
                                <p class="schedule-location">
                                    <i class="fas fa-map-marker-alt"></i>
                                    ${item.location}
                                </p>
                            </div>
                            <div class="schedule-description">
                                <p>${item.description}</p>
                            </div>
                            <button class="schedule-details-btn" onclick="window.emergencyDataFix.toggleScheduleDetails(${index})">
                                <i class="fas fa-chevron-down"></i>
                                詳細資訊
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="today-sidebar">
                <div class="weather-card">
                    <div class="weather-header">
                        <h4><i class="fas fa-cloud-sun"></i> 目的地天氣</h4>
                    </div>
                    <div class="weather-content">
                        <div class="weather-icon">
                            <i class="${data.weather.icon}"></i>
                        </div>
                        <div class="weather-info">
                            <div class="weather-temperature">
                                <strong>${data.weather.temperature}</strong>
                            </div>
                            <div class="weather-condition">
                                ${data.weather.condition}
                            </div>
                            <div class="weather-location">
                                <i class="fas fa-map-pin"></i>
                                ${data.weather.destination}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="notes-card">
                    <div class="notes-header">
                        <h4><i class="fas fa-exclamation-circle"></i> 重要提醒</h4>
                    </div>
                    <div class="notes-content">
                        <ul>
                            ${data.importantNotes.map(note => `
                                <li>
                                    <i class="fas fa-check-circle"></i>
                                    ${note}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="quick-actions">
                    <button class="quick-action-btn" onclick="alert('行程已分享')">
                        <i class="fas fa-share-alt"></i>
                        分享行程
                    </button>
                    <button class="quick-action-btn" onclick="alert('提醒已設定')">
                        <i class="fas fa-bell"></i>
                        設定提醒
                    </button>
                    <button class="quick-action-btn" onclick="window.emergencyDataFix.showAllDetails()">
                        <i class="fas fa-info-circle"></i>
                        詳細資訊
                    </button>
                </div>
            </div>
        `;
    }
    
    // 設置數據注入監聽器
    setupDataInjectionListener() {
        // 監聽hash變化（頁面切換）
        window.addEventListener('hashchange', () => {
            this.injectDataForCurrentSection();
        });
        
        // 初始注入
        setTimeout(() => {
            this.injectDataForCurrentSection();
        }, 500);
    }
    
    // 根據當前區塊注入數據
    injectDataForCurrentSection() {
        const hash = window.location.hash.substring(1);
        
        switch(hash) {
            case 'today':
                // 今日行程數據已立即注入
                break;
            case 'itinerary':
                this.injectItineraryData();
                break;
            case 'map':
                this.injectMapData();
                break;
            case 'tips':
                this.injectTipsData();
                break;
            case 'checklist':
                this.injectChecklistData();
                break;
        }
    }
    
    // 注入完整行程數據
    injectItineraryData() {
        const itineraryContent = document.getElementById('itineraryContent');
        if (!itineraryContent) return;
        
        // 清除載入動畫
        const loadingElements = itineraryContent.querySelectorAll('.travel-loading, .loading-spinner');
        loadingElements.forEach(el => el.remove());
        
        // 如果已經有內容，不再重複注入
        if (itineraryContent.innerHTML.trim() !== '') return;
        
        const data = this.itineraryData;
        
        itineraryContent.innerHTML = `
            <div class="itinerary-overview">
                <h3>${data.tripName}</h3>
                <p class="countries">
                    <i class="fas fa-route"></i>
                    ${data.countries.join(' → ')}
                </p>
                
                <div class="itinerary-days">
                    ${data.days.map(day => `
                        <div class="itinerary-day" data-day="${day.day}">
                            <div class="day-header">
                                <span class="day-number">第${day.day}天</span>
                                <span class="day-title">${day.title}</span>
                            </div>
                            <div class="day-location">
                                <i class="fas fa-map-marker-alt"></i>
                                ${day.location}
                            </div>
                            <div class="day-description">
                                <p>${day.description}</p>
                            </div>
                            <div class="day-highlights">
                                <strong>亮點：</strong>
                                ${day.highlights.map(highlight => `
                                    <span class="highlight-tag">${highlight}</span>
                                `).join('')}
                            </div>
                            <button class="day-details-btn" onclick="window.emergencyDataFix.showDayDetails(${day.day})">
                                <i class="fas fa-info-circle"></i>
                                詳細行程
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        console.log('✅ 完整行程數據注入完成');
    }
    
    // 注入地圖數據
    injectMapData() {
        // 地圖數據由緊急地圖修復系統處理
        console.log('🗺️ 地圖數據由緊急地圖修復系統處理');
    }
    
    // 注入實用提醒數據
    injectTipsData() {
        const tipsContent = document.getElementById('tipsContent');
        if (!tipsContent) return;
        
        // 清除載入動畫
        const loadingElements = tipsContent.querySelectorAll('.travel-loading, .loading-spinner');
        loadingElements.forEach(el => el.remove());
        
        // 如果已經有內容，不再重複注入
        if (tipsContent.innerHTML.trim() !== '') return;
        
        const data = this.tipsData;
        
        tipsContent.innerHTML = `
            <div class="tips-categories">
                ${data.categories.map(category => `
                    <div class="tips-category">
                        <h3>
                            <i class="${category.icon}"></i>
                            ${category.name}
                        </h3>
                        <ul>
                            ${category.tips.map(tip => `
                                <li>
                                    <i class="fas fa-check"></i>
                                    ${tip}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        `;
        
        console.log('✅ 實用提醒數據注入完成');
    }
    
    // 注入檢查清單數據
    injectChecklistData() {
        const checklistContent = document.getElementById('checklistContent');
        if (!checklistContent) return;
        
        // 清除載入動畫
        const loadingElements = checklistContent.querySelectorAll('.travel-loading, .loading-spinner');
        loadingElements.forEach(el => el.remove());
        
        // 如果已經有內容，不再重複注入
        if (checklistContent.innerHTML.trim() !== '') return;
        
        const data = this.checklistData;
        
        checklistContent.innerHTML = `
            <div class="checklist-categories">
                ${data.categories.map(category => `
                    <div class="checklist-category">
                        <h3>
                            <i class="${category.icon}"></i>
                            ${category.name}
                        </h3>
                        <div class="checklist-items">
                            ${category.items.map(item => `
                                <label class="checklist-item">
                                    <input type="checkbox" ${item.checked ? 'checked' : ''}>
                                    <span>${item.text}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="checklist-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <div class="progress-text">完成度: <span id="progressPercent">0%</span></div>
            </div>
        `;
        
        // 設置檢查清單事件
        this.setupChecklistEvents();
        
        console.log('✅ 檢查清單數據注入完成');
    }
    
    // 設置檢查清單事件
    setupChecklistEvents() {
        const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateChecklistProgress();
            });
        });
    }
    
    // 更新檢查清單進度
    updateChecklistProgress() {
        const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
        const total = checkboxes.length;
        const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percent = total > 0 ? Math.round((checked / total) * 100) : 0;
        
        const progressFill = document.querySelector('.progress-fill');
        const progressPercent = document.getElementById('progressPercent');
        
        if (progressFill) {
            progressFill.style.width = `${percent}%`;
        }
        
        if (progressPercent) {
            progressPercent.textContent = `${percent}%`;
        }
    }
    
    // 設置數據備用方案
    setupDataFallback() {
        // 監聽所有可能的數據載入錯誤
        window.addEventListener('error', (e) => {
            if (e.message.includes('tourData') || e.message.includes('itinerary')) {
                console.warn('⚠️ 檢測到數據載入錯誤，使用緊急數據備用方案');
                this.injectDataIntoDOM();
            }
        });
        
        // 設置定時檢查，確保數據顯示
        setTimeout(() => {
            this.ensureDataDisplay();
        }, 2000);
    }
    
    // 確保數據顯示
    ensureDataDisplay() {
        // 檢查今日行程是否顯示
        const todayContent = document.getElementById('todayContent');
        if (todayContent) {
            const hasContent = todayContent.innerHTML.trim() !== '';
            const hasLoading = todayContent.querySelector('.travel-loading, .loading-spinner');
            
            if (!hasContent && hasLoading) {
                console.log('🔄 重新注入今日行程數據...');
                this.injectTodayData();
            }
        }
    }
    
    // 切換行程詳細資訊
    toggleScheduleDetails(index) {
        const scheduleItem = document.querySelector(`.schedule-item[data-index="${index}"]`);
        if (!scheduleItem) return;
        
        const detailsBtn = scheduleItem.querySelector('.schedule-details-btn');
        const description = scheduleItem.querySelector('.schedule-description');
        
        if (description.style.display === 'none' || !description.style.display) {
            description.style.display = 'block';
            detailsBtn.innerHTML = '<i class="fas fa-chevron-up"></i> 收起資訊';
            detailsBtn.classList.add('active');
        } else {
            description.style.display = 'none';
            detailsBtn.innerHTML = '<i class="fas fa-chevron-down"></i> 詳細資訊';
            detailsBtn.classList.remove('active');
        }
    }
    
    // 顯示所有詳細資訊
    showAllDetails() {
        const scheduleItems = document.querySelectorAll('.schedule-item');
        scheduleItems.forEach((item, index) => {
            const description = item.querySelector('.schedule-description');
            const detailsBtn = item.querySelector('.schedule-details-btn');
            
            if (description) {
                description.style.display = 'block';
            }
            
            if (detailsBtn) {
                detailsBtn.innerHTML = '<i class="fas fa-chevron-up"></i> 收起資訊';
                detailsBtn.classList.add('active');
            }
        });
    }
    
    // 顯示天數詳細資訊
    showDayDetails(day) {
        const dayData = this.itineraryData.days.find(d => d.day === day);
        if (dayData) {
            alert(`第${day}天詳細行程\n\n標題：${dayData.title}\n地點：${dayData.location}\n\n描述：${dayData.description}\n\n亮點：${dayData.highlights.join('、')}`);
        }
    }
}

// 立即初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚨 啟動緊急數據修復系統...');
    window.emergencyDataFix = new EmergencyDataFix();
    
    // 設置一個延遲，確保DOM完全載入
    setTimeout(() => {
        window.emergencyDataFix.init();
    }, 100);
    
    console.log('✅ 緊急數據修復系統已就緒');
});

// 提供調試功能
window.debugDataFix = function() {
    if (window.emergencyDataFix) {
        console.log('🔍 緊急數據修復系統狀態：');
        console.log('- 數據載入:', window.emergencyDataFix.dataLoaded ? '✅ 已載入' : '❌ 未載入');
        console.log('- 今日數據:', window.emergencyDataFix.todayData ? '✅ 已準備' : '❌ 未準備');
        console.log('- 行程數據:', window.emergencyDataFix.itineraryData ? '✅ 已準備' : '❌ 未準備');
        return window.emergencyDataFix;
    } else {
        console.error('❌ 緊急數據修復系統未初始化');
        return null;
    }
};