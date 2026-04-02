// 離線支援與網路優化系統
class OfflineSupportSystem {
    constructor() {
        this.isOnline = navigator.onLine;
        this.retryCount = 0;
        this.maxRetries = 3;
        this.retryDelay = 2000; // 2秒
        
        console.log('📡 離線支援系統初始化...');
        console.log(`🌐 當前網路狀態: ${this.isOnline ? '✅ 在線' : '❌ 離線'}`);
    }
    
    // 初始化
    init() {
        // 設置網路狀態監聽
        this.setupNetworkListeners();
        
        // 檢查關鍵資源

        this.checkCriticalResources();
        
        // 設置備用方案

        this.setupFallbackSystems();
        
        // 嘗試載入外部資源

        this.loadExternalResources();
    }
    
    // 設置網路監聽

    setupNetworkListeners() {
        window.addEventListener('online', () => {
            console.log('🌐 網路恢復連接');
            this.isOnline = true;
            this.retryCount = 0;
            this.notifyUser('✅ 網路已恢復連接', 'success');
            this.loadExternalResources();
        });
        
        window.addEventListener('offline', () => {
            console.log('🌐 網路斷開連接');
            this.isOnline = false;
            this.notifyUser('⚠️ 網路連接已斷開，啟用離線模式', 'warning');
            this.enableOfflineMode();
        });
    }
    
    // 檢查關鍵資源

    checkCriticalResources() {
        const criticalResources = [
            'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
            'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        ];
        
        criticalResources.forEach(resource => {
            this.checkResourceAvailability(resource);
        });
    }
    
    // 檢查資源可用性

    checkResourceAvailability(url) {
        fetch(url, { method: 'HEAD', mode: 'no-cors' })
            .then(() => {
                console.log(`✅ 資源可用: ${url}`);
            })
            .catch(() => {
                console.warn(`⚠️ 資源不可用: ${url}`);
                this.enableFallbackForResource(url);
            });
    }
    
    // 設置備用系統

    setupFallbackSystems() {
        // 地圖備用系統
        this.setupMapFallback();
        
        // 圖標備用系統
        this.setupIconFallback();
        
        // 數據備用系統
        this.setupDataFallback();
    }
    
    // 設置地圖備用系統

    setupMapFallback() {
        // 檢查是否已載入本地備用地圖
        if (!window.localBackupMap) {
            console.log('🔄 載入本地備用地圖系統...');
            
            // 動態載入本地備用地圖腳本

            const script = document.createElement('script');
            script.src = 'js/local-backup-map.js';
            script.onload = () => {
                console.log('✅ 本地備用地圖系統已載入');
                if (window.localBackupMap) {
                    window.localBackupMap.init();
                }
            };
            script.onerror = () => {
                console.error('❌ 本地備用地圖載入失敗');
                this.enableBasicMapFallback();
            };
            document.head.appendChild(script);
        }
    }
    
    // 設置圖標備用系統

    setupIconFallback() {
        // 檢查Font Awesome是否可用

        const testIcon = document.createElement('i');
        testIcon.className = 'fas fa-circle';
        document.body.appendChild(testIcon);
        
        setTimeout(() => {
            const computedStyle = window.getComputedStyle(testIcon);
            const fontFamily = computedStyle.fontFamily;
            
            if (!fontFamily.includes('Font Awesome')) {
                console.warn('⚠️ Font Awesome不可用，啟用備用圖標系統');
                this.enableIconFallback();
            }
            
            document.body.removeChild(testIcon);
        }, 1000);
    }
    
    // 設置數據備用系統

    setupDataFallback() {
        // 確保本地數據庫存在

        if (!window.europeTourData) {
            console.warn('⚠️ 主數據庫未載入，嘗試載入備用數據');
            this.loadBackupData();
        }
    }
    
    // 載入外部資源

    loadExternalResources() {
        if (!this.isOnline) return;
        
        console.log('🔄 載入外部資源...');
        
        // 嘗試載入Leaflet地圖庫（如果尚未載入）

        if (!window.L) {
            this.loadLeaflet();
        }
        
        // 嘗試載入互動地圖（如果尚未載入）

        if (!window.interactiveEuropeMap) {
            this.loadInteractiveMap();
        }
    }
    
    // 載入Leaflet

    loadLeaflet() {
        // 檢查是否已載入

        if (window.L) return;
        
        const leafletCSS = document.createElement('link');
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        leafletCSS.onerror = () => {
            console.warn('⚠️ Leaflet CSS載入失敗');
            this.enableBasicMapFallback();
        };
        document.head.appendChild(leafletCSS);
        
        const leafletJS = document.createElement('script');
        leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        leafletJS.onload = () => {
            console.log('✅ Leaflet 地圖庫已載入');
        };
        leafletJS.onerror = () => {
            console.warn('⚠️ Leaflet JS載入失敗');
            this.enableBasicMapFallback();
        };
        document.head.appendChild(leafletJS);
    }
    
    // 載入互動地圖

    loadInteractiveMap() {
        if (!window.L) {
            console.warn('⚠️ Leaflet未載入，無法載入互動地圖');
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'js/interactive-europe-map.js';
        script.onload = () => {
            console.log('✅ 互動地圖系統已載入');
            if (window.interactiveEuropeMap) {
                window.interactiveEuropeMap.init();
            }
        };
        script.onerror = () => {
            console.warn('⚠️ 互動地圖載入失敗');
            this.enableBasicMapFallback();
        };
        document.head.appendChild(script);
    }
    
    // 啟用基本地圖備用

    enableBasicMapFallback() {
        console.log('🔄 啟用基本地圖備用系統...');
        
        // 創建基本地圖容器

        const mapContainer = document.getElementById('mapContainer');
        if (!mapContainer) return;
        
        mapContainer.innerHTML = `
            <div class="basic-map-fallback">
                <div class="fallback-map-header">
                    <h3><i class="fas fa-map-marked-alt"></i> 歐洲四國行程地圖</h3>
                    <p class="fallback-map-subtitle">由於網路問題，使用簡化地圖顯示</p>
                </div>
                
                <div class="fallback-map-content">
                    <div class="fallback-map-static">
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
                            <div class="route-line"></div>
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
                    
                    <div class="fallback-map-controls">
                        <button class="btn btn-primary" onclick="window.offlineSupportSystem.retryNetwork()">
                            <i class="fas fa-sync-alt"></i>
                            重試網路連接
                        </button>
                        <button class="btn btn-outline" onclick="window.offlineSupportSystem.showOfflineHelp()">
                            <i class="fas fa-question-circle"></i>
                            離線幫助
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 啟用圖標備用系統
    enableIconFallback() {
        console.log('🔄 啟用圖標備用系統...');
        
        // 添加備用圖標樣式
        const style = document.createElement('style');
        style.textContent = `
            .icon-fallback {
                display: inline-block;
                width: 20px;
                height: 20px;
                background: #4cc9f0;
                border-radius: 50%;
                position: relative;
                margin-right: 8px;
            }
            
            .icon-fallback.map:after {
                content: '🗺️';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 12px;
            }
            
            .icon-fallback.calendar:after {
                content: '📅';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 12px;
            }
            
            .icon-fallback.tips:after {
                content: '💡';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 12px;
            }
            
            .icon-fallback.checklist:after {
                content: '✅';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 12px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 載入備用數據
    loadBackupData() {
        console.log('🔄 載入備用數據...');
        
        // 嘗試載入本地備用數據
        const script = document.createElement('script');
        script.src = 'js/backup-data.js';
        script.onload = () => {
            console.log('✅ 備用數據已載入');
            this.notifyUser('📊 使用本地備用數據', 'info');
        };
        script.onerror = () => {
            console.error('❌ 備用數據載入失敗');
            this.createEmergencyData();
        };
        document.head.appendChild(script);
    }
    
    // 創建緊急數據
    createEmergencyData() {
        console.log('🆘 創建緊急數據...');
        
        // 創建最基本的數據結構
        window.emergencyTourData = {
            itinerary: [
                {
                    title: "第1天：出發前往歐洲",
                    subtitle: "從台灣出發，飛往歐洲",
                    description: "從台灣桃園國際機場出發，飛往歐洲，開始10天的歐洲四國之旅。",
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
                    items: [
                        { title: "護照檢查", details: ["確認護照有效期至少6個月以上"] }
                    ]
                }
            ]
        };
        
        console.log('✅ 緊急數據已創建');
    }
    
    // 重試網路連接
    retryNetwork() {
        if (this.retryCount >= this.maxRetries) {
            this.notifyUser('❌ 已達到最大重試次數，請檢查網路連接', 'error');
            return;
        }
        
        this.retryCount++;
        console.log(`🔄 第${this.retryCount}次重試網路連接...`);
        
        this.notifyUser(`🔄 第${this.retryCount}次重試網路連接...`, 'info');
        
        // 測試網路連接
        this.testNetworkConnection();
    }
    
    // 測試網路連接
    testNetworkConnection() {
        const testUrl = 'https://httpbin.org/get';
        
        fetch(testUrl, { method: 'GET', mode: 'no-cors' })
            .then(() => {
                console.log('✅ 網路連接恢復');
                this.isOnline = true;
                this.retryCount = 0;
                this.notifyUser('✅ 網路連接已恢復', 'success');
                location.reload();
            })
            .catch(() => {
                console.warn(`⚠️ 第${this.retryCount}次網路測試失敗`);
                
                if (this.retryCount < this.maxRetries) {
                    setTimeout(() => this.retryNetwork(), this.retryDelay);
                } else {
                    this.notifyUser('❌ 網路連接失敗，已啟用離線模式', 'error');
                }
            });
    }
    
    // 啟用離線模式
    enableOfflineMode() {
        console.log('📴 啟用離線模式...');
        
        // 更新UI顯示離線狀態
        this.updateUIForOfflineMode();
        
        // 載入所有本地資源
        this.loadAllLocalResources();
        
        // 啟用本地數據庫
        this.enableLocalDatabase();
    }
    
    // 更新UI顯示離線狀態
    updateUIForOfflineMode() {
        // 添加離線狀態指示器
        const offlineIndicator = document.createElement('div');
        offlineIndicator.id = 'offlineIndicator';
        offlineIndicator.innerHTML = `
            <div class="offline-status">
                <i class="fas fa-wifi-slash"></i>
                <span>離線模式</span>
            </div>
        `;
        offlineIndicator.style.cssText = `
            position: fixed;
            top: 70px;
            right: 20px;
            background: #fd7e14;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            z-index: 1000;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        document.body.appendChild(offlineIndicator);
    }
    
    // 載入所有本地資源
    loadAllLocalResources() {
        console.log('🔄 載入所有本地資源...');
        
        // 確保所有本地腳本已載入
        this.ensureLocalScriptsLoaded();
        
        // 載入本地數據
        this.loadLocalData();
        
        // 初始化本地系統
        this.initLocalSystems();
    }
    
    // 確保本地腳本已載入
    ensureLocalScriptsLoaded() {
        const localScripts = [
            'js/europe-tour-data.js',
            'js/simple-page-switcher.js',
            'js/local-backup-map.js',
            'js/detailed-practical-tips.js',
            'js/detailed-checklist-data.js'
        ];
        
        localScripts.forEach(script => {
            if (!document.querySelector(`script[src="${script}"]`)) {
                console.log(`📥 載入本地腳本: ${script}`);
                const scriptElement = document.createElement('script');
                scriptElement.src = script;
                document.head.appendChild(scriptElement);
            }
        });
    }
    
    // 載入本地數據
    loadLocalData() {
        console.log('📊 載入本地數據...');
        
        // 檢查本地數據庫
        if (!window.europeTourData) {
            console.warn('⚠️ 本地數據庫未載入，嘗試緊急數據');
            this.createEmergencyData();
        }
    }
    
    // 初始化本地系統
    initLocalSystems() {
        console.log('🔄 初始化本地系統...');
        
        // 初始化本地地圖
        if (window.localBackupMap) {
            window.localBackupMap.init();
        }
        
        // 初始化本地數據顯示
        this.initLocalDataDisplay();
    }
    
    // 初始化本地數據顯示
    initLocalDataDisplay() {
        console.log('📱 初始化本地數據顯示...');
        
        // 確保所有本地系統已初始化
        if (window.simplePageSwitcher) {
            window.simplePageSwitcher.init();
        }
        
        if (window.detailedTipsDisplay) {
            window.detailedTipsDisplay.init();
        }
        
        if (window.detailedChecklistDisplay) {
            window.detailedChecklistDisplay.init();
        }
    }
    
    // 啟用本地數據庫
    enableLocalDatabase() {
        console.log('💾 啟用本地數據庫...');
        
        // 使用localStorage作為備用數據庫
        this.setupLocalStorageDatabase();
        
        // 同步本地數據
        this.syncLocalData();
    }
    
    // 設置本地存儲數據庫
    setupLocalStorageDatabase() {
        console.log('🗄️ 設置本地存儲數據庫...');
        
        // 檢查是否有本地數據
        const localData = localStorage.getItem('europeTourData');
        
        if (!localData) {
            console.log('📝 創建本地數據存儲...');
            
            // 存儲基本數據
            const basicData = {
                itinerary: [
                    {
                        title: "第1天：出發前往歐洲",
                        subtitle: "從台灣出發，飛往歐洲",
                        description: "從台灣桃園國際機場出發，飛往歐洲，開始10天的歐洲四國之旅。"
                    }
                ]
            };
            
            localStorage.setItem('europeTourData', JSON.stringify(basicData));
            console.log('✅ 本地數據庫已創建');
        } else {
            console.log('✅ 本地數據庫已存在');
        }
    }
    
    // 同步本地數據
    syncLocalData() {
        console.log('🔄 同步本地數據...');
        
        // 將數據庫數據同步到localStorage
        if (window.europeTourData) {
            localStorage.setItem('europeTourData', JSON.stringify(window.europeTourData));
            console.log('✅ 本地數據已同步');
        }
    }
    
    // 顯示離線幫助
    showOfflineHelp() {
        console.log('📖 顯示離線幫助...');
        
        const helpModal = document.createElement('div');
        helpModal.id = 'offlineHelpModal';
        helpModal.innerHTML = `
            <div class="offline-help-modal">
                <div class="modal-header">
                    <h3><i class="fas fa-wifi-slash"></i> 離線模式說明</h3>
                    <button class="close-btn" onclick="document.getElementById('offlineHelpModal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-content">
                    <h4>🔄 目前處於離線模式</h4>
                    <p>由於網路連接問題，網站已自動切換到離線模式。</p>
                    
                    <h4>✅ 可用的功能：</h4>
                    <ul>
                        <li>所有行程資料（10天完整行程）</li>
                        <li>實用提醒系統</li>
                        <li>檢查清單功能</li>
                        <li>簡化地圖顯示</li>
                        <li>本地數據儲存</li>
                    </ul>
                    
                    <h4>⚠️ 受限的功能：</h4>
                    <ul>
                        <li>互動地圖（需要網路載入地圖庫）</li>
                        <li>實時更新（需要網路連接）</li>
                    </ul>
                    
                    <h4>🔄 如何恢復：</h4>
                    <p>當網路恢復時，網站會自動重新載入完整功能。</p>
                    
                    <div class="modal-footer">
                        <button class="btn btn-primary" onclick="window.offlineSupportSystem.retryNetwork()">
                            <i class="fas fa-sync-alt"></i>
                            重試網路連接
                        </button>
                        <button class="btn btn-outline" onclick="document.getElementById('offlineHelpModal').remove()">
                            關閉
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        helpModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        document.body.appendChild(helpModal);
    }
    
    // 通知用戶
    notifyUser(message, type = 'info') {
        console.log(`📢 用戶通知 [${type}]: ${message}`);
        
        const notification = document.createElement('div');
        notification.className = `user-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                               type === 'error' ? 'exclamation-circle' : 
                               type === 'warning' ? 'exclamation-triangle' : 
                               'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : 
                         type === 'error' ? '#dc3545' : 
                         type === 'warning' ? '#fd7e14' : '#17a2b8'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10001;
            animation: slideInRight 0.3s ease;
            display: flex;
            align-items: center;
            gap: 12px;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // 5秒後自動移除

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    // 獲取系統狀態

    getSystemStatus() {
        return {
            network: {
                online: this.isOnline,
                retryCount: this.retryCount,
                maxRetries: this.maxRetries
            },
            resources: {
                leafletLoaded: !!window.L,
                localBackupMapLoaded: !!window.localBackupMap,
                europeTourDataLoaded: !!window.europeTourData
            },
            storage: {
                hasLocalData: !!localStorage.getItem('europeTourData'),
                localDataSize: localStorage.getItem('europeTourData')?.length || 0
            }
        };
    }
}

// 創建全局實例

window.offlineSupportSystem = new OfflineSupportSystem();

// 自動初始化



document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 DOM載入完成，初始化離線支援系統...');
    window.offlineSupportSystem.init();
});

// 提供調試功能



window.debugOfflineSystem = function() {
    console.log('🔍 離線支援系統狀態：', window.offlineSupportSystem.getSystemStatus());
    return window.offlineSupportSystem.getSystemStatus();
};