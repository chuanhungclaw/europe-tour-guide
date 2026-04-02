// 本地備用地圖方案
// 當Leaflet無法載入時使用

class LocalBackupMap {
    constructor() {
        this.mapContainer = null;
        this.locationsData = [
            {
                id: 'budapest',
                name: '布達佩斯',
                country: '匈牙利',
                days: '第1-3天',
                description: '匈牙利首都，多瑙河畔的明珠',
                position: { top: '40%', left: '65%' }
            },
            {
                id: 'bratislava',
                name: '布拉提斯拉瓦',
                country: '斯洛伐克',
                days: '第4天',
                description: '斯洛伐克首都，小而美的城市',
                position: { top: '35%', left: '60%' }
            },
            {
                id: 'vienna',
                name: '維也納',
                country: '奧地利',
                days: '第5-6天',
                description: '音樂之都，哈布斯堡王朝中心',
                position: { top: '30%', left: '55%' }
            },
            {
                id: 'brno',
                name: '布爾諾',
                country: '捷克',
                days: '第7天',
                description: '捷克第二大城市，摩拉維亞中心',
                position: { top: '25%', left: '50%' }
            },
            {
                id: 'prague',
                name: '布拉格',
                country: '捷克',
                days: '第8-9天',
                description: '千塔之城，捷克首都',
                position: { top: '20%', left: '45%' }
            },
            {
                id: 'cesky-krumlov',
                name: '庫倫洛夫',
                country: '捷克',
                days: '第10天',
                description: '世界文化遺產，童話小鎮',
                position: { top: '15%', left: '40%' }
            }
        ];
    }
    
    // 初始化備用地圖
    init() {
        console.log('🗺️ 初始化本地備用地圖...');
        
        // 找到地圖區域
        const mapSection = document.getElementById('map');
        if (!mapSection) {
            console.error('❌ 地圖區域未找到');
            return;
        }
        
        // 創建備用地圖顯示
        this.createBackupMap(mapSection);
        
        console.log('✅ 本地備用地圖初始化完成');
    }
    
    // 創建備用地圖顯示
    createBackupMap(container) {
        // 清除原有內容
        container.innerHTML = '';
        
        const backupHTML = `
            <div class="local-backup-map">
                <div class="backup-map-header">
                    <h1 class="backup-map-title">
                        <i class="fas fa-map-marked-alt"></i>
                        歐洲四國行程地圖（本地版）
                    </h1>
                    <p class="backup-map-description">
                        由於網路限制，顯示本地備用地圖
                    </p>
                </div>
                
                <!-- 地圖控制面板 -->
                <div class="backup-map-controls">
                    <button class="backup-control-btn" id="tryReloadMap">
                        <i class="fas fa-sync-alt"></i>
                        重新嘗試載入互動地圖
                    </button>
                    <button class="backup-control-btn" id="showAllLocations">
                        <i class="fas fa-eye"></i>
                        顯示所有景點
                    </button>
                </div>
                
                <!-- 本地地圖 -->
                <div class="backup-map-wrapper">
                    <div class="backup-map-area">
                        <div class="europe-background-map">
                            <!-- 地圖點將由JS動態添加 -->
                        </div>
                    </div>
                    
                    <!-- 地圖圖例 -->
                    <div class="backup-map-legend">
                        <div class="backup-legend-item">
                            <span class="backup-legend-dot blue"></span>
                            <span>城市</span>
                        </div>
                        <div class="backup-legend-item">
                            <span class="backup-legend-dot red"></span>
                            <span>城堡/景點</span>
                        </div>
                        <div class="backup-legend-item">
                            <span class="backup-legend-line"></span>
                            <span>行程路線</span>
                        </div>
                    </div>
                </div>
                
                <!-- 景點列表 -->
                <div class="backup-locations-panel">
                    <h3 class="backup-panel-title">
                        <i class="fas fa-list"></i>
                        行程景點列表
                    </h3>
                    
                    <div class="backup-locations-list" id="backupLocationsList">
                        <!-- 景點列表將由JS動態生成 -->
                    </div>
                </div>
                
                <!-- 地圖資訊 -->
                <div class="backup-map-info">
                    <div class="backup-info-item">
                        <i class="fas fa-route"></i>
                        <span>總行程距離：約 800 公里</span>
                    </div>
                    <div class="backup-info-item">
                        <i class="fas fa-clock"></i>
                        <span>行程天數：10 天</span>
                    </div>
                    <div class="backup-info-item">
                        <i class="fas fa-city"></i>
                        <span>訪問城市：6 個</span>
                    </div>
                    <div class="backup-info-item">
                        <i class="fas fa-flag"></i>
                        <span>訪問國家：4 國</span>
                    </div>
                </div>
                
                <!-- 提示訊息 -->
                <div class="backup-map-note">
                    <i class="fas fa-info-circle"></i>
                    <p>
                        這是本地備用地圖。如需完整互動功能，請確保網路連線正常，
                        然後點擊「重新嘗試載入互動地圖」按鈕。
                    </p>
                </div>
            </div>
        `;
        
        container.innerHTML = backupHTML;
        this.mapContainer = document.querySelector('.europe-background-map');
        
        // 生成地圖點和列表
        this.generateMapPoints();
        this.generateLocationsList();
        
        // 設置事件監聽器
        this.setupEventListeners();
    }
    
    // 生成地圖點
    generateMapPoints() {
        if (!this.mapContainer) return;
        
        let pointsHTML = '';
        
        // 添加路線
        pointsHTML += '<div class="backup-route-line"></div>';
        
        // 添加地點標記
        this.locationsData.forEach((location, index) => {
            const isCastle = location.id.includes('krumlov') || location.id.includes('prague');
            const dotClass = isCastle ? 'red' : 'blue';
            
            pointsHTML += `
                <div class="backup-map-point ${dotClass}" 
                     style="top: ${location.position.top}; left: ${location.position.left};"
                     data-location-id="${location.id}">
                    <div class="backup-point-number">${index + 1}</div>
                    <div class="backup-point-tooltip">
                        <h4>${location.name}</h4>
                        <p>${location.country} • ${location.days}</p>
                        <p>${location.description}</p>
                    </div>
                </div>
            `;
        });
        
        this.mapContainer.innerHTML = pointsHTML;
        
        // 添加地點點擊事件
        document.querySelectorAll('.backup-map-point').forEach(point => {
            point.addEventListener('click', (e) => {
                const locationId = e.currentTarget.getAttribute('data-location-id');
                this.showLocationDetails(locationId);
            });
        });
    }
    
    // 生成景點列表
    generateLocationsList() {
        const listContainer = document.getElementById('backupLocationsList');
        if (!listContainer) return;
        
        let listHTML = '';
        
        this.locationsData.forEach((location, index) => {
            listHTML += `
                <div class="backup-location-item" data-location-id="${location.id}">
                    <div class="backup-location-number">${index + 1}</div>
                    <div class="backup-location-info">
                        <h4 class="backup-location-name">${location.name}</h4>
                        <p class="backup-location-country">${location.country} • ${location.days}</p>
                        <p class="backup-location-description">${location.description}</p>
                    </div>
                    <button class="backup-location-view-btn" data-location-index="${index}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            `;
        });
        
        listContainer.innerHTML = listHTML;
        
        // 添加列表項目點擊事件
        document.querySelectorAll('.backup-location-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('backup-location-view-btn')) {
                    const locationId = e.currentTarget.getAttribute('data-location-id');
                    this.showLocationDetails(locationId);
                }
            });
        });
        
        // 添加查看按鈕點擊事件
        document.querySelectorAll('.backup-location-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.getAttribute('data-location-index');
                this.highlightLocation(index);
            });
        });
    }
    
    // 顯示地點詳情
    showLocationDetails(locationId) {
        const location = this.locationsData.find(loc => loc.id === locationId);
        if (!location) return;
        
        // 顯示詳細資訊
        this.showMessage(`${location.name} - ${location.country}`, 'info');
        
        // 高亮對應的地圖點
        this.highlightMapPoint(locationId);
    }
    
    // 高亮地圖點
    highlightMapPoint(locationId) {
        // 移除所有高亮
        document.querySelectorAll('.backup-map-point').forEach(point => {
            point.classList.remove('highlighted');
        });
        
        // 添加高亮
        const targetPoint = document.querySelector(`.backup-map-point[data-location-id="${locationId}"]`);
        if (targetPoint) {
            targetPoint.classList.add('highlighted');
            
            // 3秒後移除高亮
            setTimeout(() => {
                targetPoint.classList.remove('highlighted');
            }, 3000);
        }
    }
    
    // 高亮地點
    highlightLocation(index) {
        if (index >= 0 && index < this.locationsData.length) {
            const location = this.locationsData[index];
            this.showLocationDetails(location.id);
        }
    }
    
    // 設置事件監聽器
    setupEventListeners() {
        // 重新載入地圖按鈕
        const reloadBtn = document.getElementById('tryReloadMap');
        if (reloadBtn) {
            reloadBtn.addEventListener('click', () => {
                this.tryReloadInteractiveMap();
            });
        }
        
        // 顯示所有景點按鈕
        const showAllBtn = document.getElementById('showAllLocations');
        if (showAllBtn) {
            showAllBtn.addEventListener('click', () => {
                this.showAllLocations();
            });
        }
    }
    
    // 嘗試重新載入互動地圖
    tryReloadInteractiveMap() {
        this.showMessage('正在重新載入互動地圖...', 'info');
        
        // 重新載入頁面
        setTimeout(() => {
            location.reload();
        }, 1500);
    }
    
    // 顯示所有景點
    showAllLocations() {
        // 高亮所有地圖點
        document.querySelectorAll('.backup-map-point').forEach(point => {
            point.classList.add('highlighted');
        });
        
        // 顯示訊息
        this.showMessage('已顯示所有6個行程景點', 'info');
        
        // 3秒後移除高亮
        setTimeout(() => {
            document.querySelectorAll('.backup-map-point').forEach(point => {
                point.classList.remove('highlighted');
            });
        }, 3000);
    }
    
    // 顯示訊息
    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `backup-map-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'info' ? 'info-circle' : type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.querySelector('.local-backup-map').appendChild(messageDiv);
        
        // 3秒後自動移除
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 3000);
    }
}

// 創建全局實例
window.localBackupMap = new LocalBackupMap();

// 自動檢測並初始化備用地圖
function initBackupMapIfNeeded() {
    // 檢查Leaflet是否載入成功
    const leafletLoaded = typeof L !== 'undefined';
    
    if (!leafletLoaded) {
        console.log('⚠️ Leaflet未載入，啟動本地備用地圖');
        window.localBackupMap.init();
    } else {
        console.log('✅ Leaflet已載入，使用互動地圖');
    }
}

// 等待頁面載入
document.addEventListener('DOMContentLoaded', function() {
    // 給Leaflet一些時間載入
    setTimeout(initBackupMapIfNeeded, 2000);
});