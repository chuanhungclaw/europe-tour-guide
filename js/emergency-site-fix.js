// 緊急網站修復系統 - 立即顯示內容
class EmergencySiteFix {
    constructor() {
        console.log('🆘 緊急網站修復系統啟動...');
    }
    
    // 立即初始化
    init() {
        console.log('🚀 緊急初始化...');
        
        // 立即顯示基本內容
        this.showEmergencyContent();
        
        // 設置簡單的頁面切換
        this.setupEmergencyNavigation();
        
        console.log('✅ 緊急系統已啟動');
    }
    
    // 顯示緊急內容
    showEmergencyContent() {
        console.log('📱 顯示緊急內容...');
        
        // 確保所有區塊都有基本內容
        this.ensureAllSectionsHaveContent();
        
        // 設置簡單的導航

        this.setupSimpleNavigation();
    }
    
    // 確保所有區塊都有內容
    ensureAllSectionsHaveContent() {
        // 今日行程
        this.fillTodaySection();
        
        // 完整行程
        this.fillItinerarySection();
        
        // 互動地圖
        this.fillMapSection();
        
        // 實用提醒
        this.fillTipsSection();
        
        // 檢查清單
        this.fillChecklistSection();
    }
    
    // 填充今日行程區塊
    fillTodaySection() {
        const todaySection = document.getElementById('todayContent');
        if (!todaySection) return;
        
        todaySection.innerHTML = `
            <div class="emergency-content">
                <h3><i class="fas fa-plane-departure"></i> 今日行程 - 第1天</h3>
                <div class="schedule-list">
                    <div class="schedule-item">
                        <div class="schedule-time">15:30</div>
                        <div class="schedule-details">
                            <h4>機場集合</h4>
                            <p>桃園國際機場第二航廈</p>
                        </div>
                    </div>
                    <div class="schedule-item">
                        <div class="schedule-time">17:00</div>
                        <div class="schedule-details">
                            <h4>辦理登機手續</h4>
                            <p>長榮航空櫃檯</p>
                        </div>
                    </div>
                    <div class="schedule-item">
                        <div class="schedule-time">20:10</div>
                        <div class="schedule-details">
                            <h4>起飛前往歐洲</h4>
                            <p>航班：BR65</p>
                        </div>
                    </div>
                </div>
                <div class="emergency-notice">
                    <i class="fas fa-info-circle"></i>
                    <p>網路連接問題，使用本地數據顯示</p>
                </div>
            </div>
        `;
    }
    
    // 填充完整行程區塊
    fillItinerarySection() {
        const itinerarySection = document.getElementById('itineraryContent');
        if (!itinerarySection) return;
        
        itinerarySection.innerHTML = `
            <div class="emergency-content">
                <h3><i class="fas fa-calendar-alt"></i> 完整行程 - 10天歐洲四國之旅</h3>
                <div class="day-list">
                    <div class="day-item">
                        <h4>第1天：出發前往歐洲</h4>
                        <p>從台灣桃園國際機場出發，飛往歐洲，開始10天的歐洲四國之旅。</p>
                    </div>
                    <div class="day-item">
                        <h4>第2天：抵達布達佩斯</h4>
                        <p>抵達匈牙利首都布達佩斯，入住酒店，休息調整時差。</p>
                    </div>
                    <div class="day-item">
                        <h4>第3天：布達佩斯全日遊</h4>
                        <p>參觀布達城堡、漁人堡、馬提亞斯教堂等著名景點。</p>
                    </div>
                    <div class="day-item">
                        <h4>第4天：布拉提斯拉瓦</h4>
                        <p>前往斯洛伐克首都布拉提斯拉瓦，參觀舊城區。</p>
                    </div>
                    <div class="day-item">
                        <h4>第5天：維也納</h4>
                        <p>抵達奧地利首都維也納，參觀美泉宮、霍夫堡宮。</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 填充地圖區塊
    fillMapSection() {
        const mapContainer = document.getElementById('mapContainer');
        if (!mapContainer) return;
        
        mapContainer.innerHTML = `
            <div class="emergency-map">
                <div class="emergency-map-header">
                    <h3><i class="fas fa-map-marked-alt"></i> 歐洲四國行程地圖</h3>
                    <p class="emergency-map-subtitle">由於網路問題，使用簡化地圖顯示</p>
                </div>
                <div class="emergency-map-content">
                    <div class="emergency-map-static">
                        <div class="static-map-title">歐洲四國行程路線</div>
                        <div class="static-map-route">
                            <div class="route-point" data-city="布達佩斯">
                                <div class="point-marker">1</div>
                                <div class="point-info">
                                    <strong>布達佩斯</strong>
                                    <span>匈牙利首都（第1-3天）</span>
                                </div>
                            </div>
                            <div class="route-line"></div>
                            <div class="route-point" data-city="布拉提斯拉瓦">
                                <div class="point-marker">2</div>
                                <div class="point-info">
                                    <strong>布拉提斯拉瓦</strong>
                                    <span>斯洛伐克首都（第4天）</span>
                                </div>
                            </div>
                            <div class="route-line"></div>
                            <div class="route-point" data-city="維也納">
                                <div class="point-marker">3</div>
                                <div class="point-info">
                                    <strong>維也納</strong>
                                    <span>奧地利首都（第5-6天）</span>
                                </div>
                            </div>
                            <div class="route-line"></div>
                            <div class="route-point" data-city="布爾諾">
                                <div class="point-marker">4</div>
                                <div class="point-info">
                                    <strong>布爾諾</strong>
                                    <span>捷克第二大城市（第7天）</span>
                                </div>
                            </div>
                            <div classroute-line"></div>
                            <div class="route-point" data-city="布拉格">
                                <div class="point-marker">5</div>
                                <div class="point-info">
                                    <strong>布拉格</strong>
                                    <span>捷克首都（第8-9天）</span>
                                </div>
                            </div>
                            <div class="route-line"></div>
                            <div class="route-point" data-city="庫倫洛夫">
                                <div class="point-marker">6</div>
                                <div class="point-info">
                                    <strong>庫倫洛夫</strong>
                                    <span>捷克童話小鎮（第10天）</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 填充實用提醒區塊
    fillTipsSection() {
        const tipsSection = document.getElementById('tipsContent');
        if (!tipsSection) return;
        
        tipsSection.innerHTML = `
            <div class="emergency-content">
                <h3><i class="fas fa-lightbulb"></i> 實用提醒 - 緊急離線模式</h3>
                <div class="emergency-tips">
                    <div class="tip-item">
                        <h4><i class="fas fa-passport"></i> 文件準備</h4>
                        <p>確認護照有效期至少6個月以上</p>
                    </div>
                    <div class="tip-item">
                        <h4><i class="fas fa-money-bill-wave"></i> 金錢管理</h4>
                        <p>準備歐元現金和信用卡</p>
                    </div>
                    <div class="tip-item">
                        <h4><i class="fas fa-suitcase"></i> 行李準備</h4>
                        <p>根據天氣準備合適衣物</p>
                    </div>
                    <div class="tip-item">
                        <h4><i class="fas fa-phone-alt"></i> 緊急聯絡</h4>
                        <p>保存當地緊急聯絡電話</p>
                    </div>
                </div>
                <div class="emergency-notice">
                    <i class="fas fa-wifi-slash"></i>
                    <p>離線模式：本地數據可用，部分功能受限</p>
                </div>
            </div>
        `;
    }
    
    // 填充檢查清單區塊
    fillChecklistSection() {
        const checklistSection = document.getElementById('checklistContent');
        if (!checklistSection) return;
        
        checklistSection.innerHTML = `
            <div class="emergency-content">
                <h3><i class="fas fa-check-square"></i> 檢查清單 - 離線模式</h3>
                <div class="emergency-checklist">
                    <div class="checklist-item">
                        <input type="checkbox" id="emergency1">
                        <label for="emergency1">確認護照有效期</label>
                    </div>
                    <div class="checklist-item">
                        <input type="checkbox" id="emergency2">
                        <label for="emergency2">準備旅行文件</label>
                    </div>
                    <div class="checklist-item">
                        <input type="checkbox" id="emergency3">
                        <label for="emergency3 確認航班資訊</label>
                    </div>
                    <div class="checklist-item">
                        <input type="checkbox" id="emergency4">
                        <label for="emergency4">準備緊急聯絡人</label>
                    </div>
                </div>
                <div class="emergency-notice">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>重要：所有數據本地儲存，無需網路</p>
                </div>
            </div>
        `;
    }
    
    // 設置簡單導航
    setupSimpleNavigation() {
        console.log('🔗 設置簡單導航...');
        
        // 找到所有導航按鈕

        const navButtons = document.querySelectorAll('.bottom-nav-item');
        
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const href = button.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const sectionId = href.substring(1);
                    this.switchToSection(sectionId);
                }
            });
        });
    }
    
    // 切換到指定區塊
    switchToSection(sectionId) {
        console.log(`🔄 切換到區塊: ${sectionId}`);
        
        // 隱藏所有區塊

        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // 顯示目標區塊

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
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
        }
    }
    
    // 設置緊急導航
    setupEmergencyNavigation() {
        console.log('🆘 設置緊急導航系統...');
        
        // 設置簡單的導航切換

        this.setupSimpleNavigation();
        
        // 確保導航按鈕可以點擊

        this.ensureNavigationClickable();
    }
    
    // 確保導航按鈕可點擊
    ensureNavigationClickable() {
        const navButtons = document.querySelectorAll('.bottom-nav-item');
        
        navButtons.forEach(button => {
            // 確保按鈕有正確的href

            const href = button.getAttribute('href');
            if (!href) {
                const sectionId = button.getAttribute('data-target');
                if (sectionId) {
                    button.setAttribute('href', `#${sectionId}`);
                }
            }
        });
    }
}

// 立即啟動緊急系統

window.emergencySiteFix = new EmergencySiteFix();

// 立即初始化

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚨 緊急初始化啟動...');
    window.emergencySiteFix.init();
});

// 提供緊急調試功能

window.debugEmergencySystem = function() {
    console.log('🔍 緊急系統狀態：');
    
    // 檢查所有區塊

    const sections = ['today', 'itinerary', 'map', 'tips', 'checklist'];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            console.log(`${sectionId}: ${section.innerHTML ? '✅ 有內容' : '❌ 無內容'}`);
        } else {
            console.log(`${sectionId}: ❌ 區塊不存在`);
        }
    });
    
    return {
        status: 'emergency_mode',
        timestamp: new Date().toISOString(),
        sections: sections.map(sectionId => {
            const section = document.getElementById(sectionId);
            return {
                id: sectionId,
                exists: !!section,
                hasContent: section ? !!section.innerHTML : false
            };
        })
    };
};