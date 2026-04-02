// 緊急網站初始化系統
class EmergencyInitializer {
    constructor() {
        this.initialized = false;
        this.retryCount = 0;
        this.maxRetries = 5;
        this.retryDelay = 1000;
        
        console.log('🚨 緊急初始化系統啟動...');
    }
    
    // 緊急初始化

    emergencyInit() {
        console.log('🆘 執行緊急初始化...');
        
        // 立即顯示所有區塊

        this.showAllSections();
        
        // 設置緊急導航

        this.setupEmergencyNav();
        
        // 載入本地數據

        this.loadLocalData();
        
        this.initialized = true;
        console.log('✅ 緊急初始化完成');
    }
    
    // 顯示所有區塊

    showAllSections() {
        console.log('📱 顯示所有內容區塊...');
        
        const sections = ['today', 'itinerary', 'map', 'tips', 'checklist'];
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = 'block';
                section.classList.add('active');
                console.log(`✅ 顯示區塊: ${sectionId}`);
            } else {
                console.warn(`⚠️ 區塊不存在: ${sectionId}`);
            }
        });
    }
    
    // 設置緊急導航

    setupEmergencyNav() {
        console.log('🔗 設置緊急導航...');
        
        // 確保所有導航按鈕可點擊

        this.ensureNavClickable();
        
        // 設置簡單的頁面切換

        this.setupSimplePageSwitch();
    }
    
    // 確保導航按鈕可點擊

    ensureNavClickable() {
        const navButtons = document.querySelectorAll('.bottom-nav-item');
        
        navButtons.forEach(button => {
            // 確保按鈕有正確的href

            const href = button.getAttribute('href');
            if (!href) {
                const sectionId = button.getAttribute('data-target');
                if (sectionId) {
                    button.setAttribute('href', `#${sectionId}`);
                    console.log(`🔗 設置按鈕href: #${sectionId}`);
                }
            }
            
            // 確保按鈕有正確的點擊事件

            if (!button.getAttribute('onclick')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const href = button.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        const targetSectionId = href.substring(1);
                        this.switchToSection(targetSectionId);
                    }
                });
            }
        });
    }
    
    // 設置簡單頁面切換

    setupSimplePageSwitch() {
        console.log('🔄 設置簡單頁面切換...');
        
        const navButtons = document.querySelectorAll('.bottom-nav-item');
        
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const href = button.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetSectionId = href.substring(1);
                    this.switchToSection(targetSectionId);
                }
            });
        });
    }
    
    // 切換到指定區塊

    switchToSection(sectionId) {
        console.log(`🔄 切換到區塊: ${sectionId}`);
        
        // 隱藏所有區塊

        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active');
        });
        
        // 顯示目標區塊

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.add('active');
            console.log(`✅ 顯示區塊: ${sectionId}`);
        }
        
        // 更新導航活動狀態

        this.updateNavActiveState(sectionId);
    }
    
    // 更新導航活動狀態

    updateNavActiveState(sectionId) {
        // 移除所有活動狀態

        document.querySelectorAll('.bottom-nav-item').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // 添加當前活動狀態

        const activeButton = document.querySelector(`.bottom-nav-item[href="#${sectionId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
            console.log(`📍 設置導航活動狀態: ${sectionId}`);
        }
    }
    
    // 載入本地數據

    loadLocalData() {
        console.log('📊 載入本地數據...');
        
        // 檢查是否有本地儲存的數據

        const localData = localStorage.getItem('europeTourData');
        
        if (localData) {
            console.log('✅ 本地數據已載入');
            this.displayLocalData(JSON.parse(localData));
        } else {
            console.warn('⚠️ 無本地數據，使用緊急數據');
            this.useEmergencyData();
        }
    }
    
    // 顯示本地數據

    displayLocalData(data) {
        console.log('📱 顯示本地數據...');
        
        // 顯示今日行程

        if (data.itinerary && data.itinerary[0]) {
            this.displayToday(data.itinerary[0]);
        }
        
        // 顯示完整行程

        if (data.itinerary) {
            this.displayFullItinerary(data.itinerary);
        }
        
        // 顯示實用提醒

        if (data.tips) {
            this.displayTips(data.tips);
        }
        
        // 顯示檢查清單

        if (data.checklist) {
            this.displayChecklist(data.checklist);
        }
    }
    
    // 顯示今日行程

    displayToday(todayData) {
        const todayContent = document.getElementById('todayContent');
        if (!todayContent) return;
        
        todayContent.innerHTML = `
            <div class="emergency-content">
                <h3><i class="fas fa-calendar-day"></i> ${todayData.title}</h3>
                <p>${todayData.description}</p>
                <div class="schedule-list">
                    ${todayData.schedule ? todayData.schedule.map(item => `
                        <div class="schedule-item">
                            <div class="schedule-time">${item.time}</div>
                            <div class="schedule-details">
                                <h4>${item.activity}</h4>
                                ${item.location ? `<p>${item.location}</p>` : ''}
                            </div>
                        </div>
                    `).join('') : ''}
                </div>
            </div>
        `;
    }
    
    // 顯示完整行程

    displayFullItinerary(itineraryData) {
        const itineraryContent = document.getElementById('itineraryContent');
        if (!itineraryContent) return;
        
        itineraryContent.innerHTML = `
            <div class="emergency-content">
                <h3><i class="fas fa-calendar-alt"></i> 10天歐洲四國之旅</h3>
                <div class="day-list">
                    ${itineraryData.map((day, index) => `
                        <div class="day-item">
                            <h4>${day.title}</h4>
                            <p>${day.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // 顯示實用提醒

    displayTips(tipsData) {
        const tipsContent = document.getElementById('tipsContent');
        if (!tipsContent) return;
        
        tipsContent.innerHTML = `
            <div class="emergency-content">
                <h3><i class="fas fa-lightbulb"></i> 實用提醒</h3>
                <div class="emergency-tips">
                    ${tipsData.map(category => `
                        <div class="tip-item">
                            <h4><i class="fas fa-${category.icon || 'circle'}"></i> ${category.category}</h4>
                            <p>${category.description || ''}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // 顯示檢查清單

    displayChecklist(checklistData) {
        const checklistContent = document.getElementById('checklistContent');
        if (!checklistContent) return;
        
        checklistContent.innerHTML = `
            <div class="emergency-content">
                <h3><i class="fas fa-check-square"></i> 檢查清單</h3>
                <div class="emergency-checklist">
                    ${checklistData.map(item => `
                        <div class="checklist-item">
                            <input type="checkbox" id="${item.id}">
                            <label for="${item.id}">${item.title}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // 使用緊急數據

    useEmergencyData() {
        console.log('🚨 使用緊急數據...');
        
        // 創建緊急數據

        const emergencyData = {
            itinerary: [
                {
                    title: "第1天：出發前往歐洲",
                    subtitle: "從台灣出發，飛往歐洲",
                    description: "從台灣桃洲國際機場出發，飛往歐洲，開始10天的歐洲四國之旅。",
                    schedule: [
                        { time: "15:30", activity: "機場集合", location: "桃園國際機場第二航廈" },
                        { time: "17:00", activity: "辦理登機手續" },
                        { time: "20:10", activity: "起飛前往歐洲", location: "航班：BR65" }
                    ]
                }
            ],
            tips: [
                {
                    category: "文件準備",
                    description: "確認護照有效期至少6個月以上",
                    icon: "passport"
                },
                {
                    category: "金錢管理",
                    description: "準備歐元現金和信用卡",
                    icon: "money-bill-wave"
                },
                {
                    category: "行李準備",
                    description: "根據天氣準備合適衣物",
                    icon: "suitcase"
                },
                {
                    category: "緊急聯絡",
                    description: "保存當地緊急聯絡電話",
                    icon: "phone-alt"
                }
            ],
            checklist: [
                {
                    id: "emergency1",
                    title: "確認護照有效期"
                },
                {
                    id: "emergency2",
                    title: "準備旅行文件"
                },
                {
                    id: "emergency3",
                    title: "確認航班資訊"
                },
                {
                    id: "emergency4",
                    title: "準備緊急聯絡人"
                }
            ]
        };
        
        // 顯示緊急數據

        this.displayLocalData(emergencyData);
        
        // 儲存到本地

        localStorage.setItem('europeTourData', JSON.stringify(emergencyData));
        console.log('✅ 緊急數據已儲存到本地');
    }
    
    // 獲取系統狀態

    getStatus() {
        return {
            initialized: this.initialized,
            retryCount: this.retryCount,
            maxRetries: this.maxRetries,
            hasLocalData: !!localStorage.getItem('europeTourData'),
            sections: {
                today: !!document.getElementById('todayContent')?.innerHTML,
                itinerary: !!document.getElementById('itineraryContent')?.innerHTML,
                map: !!document.getElementById('mapContainer')?.innerHTML,
                tips: !!document.getElementById('tipsContent')?.innerHTML,
                checklist: !!document.getElementById('checklistContent')?.innerHTML
            }
        };
    }
}

// 立即啟動緊急初始化

window.emergencyInitializer = new EmergencyInitializer();

// 提供緊急調試功能

window.debugEmergencyInit = function() {
    console.log('🔍 緊急初始化系統狀態：');
    
    const status = window.emergencyInitializer.getStatus();
    console.table(status);
    
    return status;
};

// 立即執行緊急初始化

try {
    console.log('🚨 立即執行緊急初始化...');
    window.emergencyInitializer.emergencyInit();
    console.log('✅ 緊急初始化成功');
} catch (error) {
    console.error('❌ 緊急初始化失敗:', error);
    
    // 嘗試最後的緊急修復

    console.log('🆘 執行最後的緊急修復...');
    
    // 直接顯示所有區塊

    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'block';
        section.classList.add('active');
    });
}