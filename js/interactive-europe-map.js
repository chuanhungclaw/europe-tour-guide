// 歐洲四國互動地圖功能
class InteractiveEuropeMap {
    constructor() {
        this.mapContainer = null;
        this.mapInstance = null;
        this.markers = [];
        this.route = null;
        this.currentLocation = null;
        
        // 歐洲四國行程點
        this.itineraryPoints = [
            {
                id: 'budapest',
                name: '布達佩斯',
                country: '匈牙利',
                coordinates: [47.4979, 19.0402],
                days: '第1-3天',
                description: '匈牙利首都，多瑙河畔的明珠',
                icon: 'city',
                activities: ['布達城堡', '漁夫堡', '國會大廈', '英雄廣場']
            },
            {
                id: 'bratislava',
                name: '布拉提斯拉瓦',
                country: '斯洛伐克',
                coordinates: [48.1486, 17.1077],
                days: '第4天',
                description: '斯洛伐克首都，小而美的城市',
                icon: 'city',
                activities: ['布拉提斯拉瓦城堡', '舊城區', '聖馬丁大教堂']
            },
            {
                id: 'vienna',
                name: '維也納',
                country: '奧地利',
                coordinates: [48.2082, 16.3738],
                days: '第5-6天',
                description: '音樂之都，哈布斯堡王朝中心',
                icon: 'music',
                activities: ['美泉宮', '聖史蒂芬大教堂', '霍夫堡皇宮', '貝爾維第宮']
            },
            {
                id: 'brno',
                name: '布爾諾',
                country: '捷克',
                coordinates: [49.1951, 16.6068],
                days: '第7天',
                description: '捷克第二大城市，摩拉維亞中心',
                icon: 'city',
                activities: ['布爾諾城堡', '自由廣場', '聖彼得聖保羅大教堂']
            },
            {
                id: 'prague',
                name: '布拉格',
                country: '捷克',
                coordinates: [50.0755, 14.4378],
                days: '第8-9天',
                description: '千塔之城，捷克首都',
                icon: 'castle',
                activities: ['布拉格城堡', '查理大橋', '舊城廣場', '天文鐘']
            },
            {
                id: 'cesky-krumlov',
                name: '庫倫洛夫',
                country: '捷克',
                coordinates: [48.8108, 14.3150],
                days: '第10天',
                description: '世界文化遺產，童話小鎮',
                icon: 'castle',
                activities: ['庫倫洛夫城堡', '舊城區', '伏爾塔瓦河']
            }
        ];
        
        // 行程路線
        this.itineraryRoute = [
            [47.4979, 19.0402],  // 布達佩斯
            [48.1486, 17.1077],  // 布拉提斯拉瓦
            [48.2082, 16.3738],  // 維也納
            [49.1951, 16.6068],  // 布爾諾
            [50.0755, 14.4378],  // 布拉格
            [48.8108, 14.3150]   // 庫倫洛夫
        ];
        
        console.log('🗺️ 互動地圖系統初始化...');
    }
    
    // 初始化
    initialize() {
        // 等待DOM載入
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    // 設置地圖
    setup() {
        // 找到地圖區域
        const mapSection = document.getElementById('map');
        if (!mapSection) {
            console.error('❌ 地圖區域未找到');
            return;
        }
        
        // 創建地圖顯示容器
        this.createMapContainer(mapSection);
        
        // 初始化地圖
        this.initMap();
        
        console.log('✅ 互動地圖系統設置完成');
    }
    
    // 創建地圖容器
    createMapContainer(container) {
        // 清除原有簡單內容
        container.innerHTML = '';
        
        // 創建地圖顯示結構
        const mapHTML = `
            <div class="interactive-map-container">
                <div class="map-header">
                    <h1 class="map-title">
                        <i class="fas fa-map-marked-alt"></i>
                        歐洲四國互動地圖
                    </h1>
                    <p class="map-description">
                        10天行程路線與景點位置
                    </p>
                </div>
                
                <!-- 地圖控制面板 -->
                <div class="map-controls">
                    <div class="control-group">
                        <button class="control-btn" id="zoomInBtn" title="放大">
                            <i class="fas fa-search-plus"></i>
                        </button>
                        <button class="control-btn" id="zoomOutBtn" title="縮小">
                            <i class="fas fa-search-minus"></i>
                        </button>
                        <button class="control-btn" id="resetViewBtn" title="重置視圖">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                    </div>
                    
                    <div class="control-group">
                        <button class="control-btn" id="showRouteBtn" title="顯示行程路線">
                            <i class="fas fa-route"></i>
                        </button>
                        <button class="control-btn" id="showMarkersBtn" title="顯示所有景點">
                            <i class="fas fa-map-marker-alt"></i>
                        </button>
                        <button class="control-btn" id="currentLocationBtn" title="我的位置">
                            <i class="fas fa-location-crosshairs"></i>
                        </button>
                    </div>
                </div>
                
                <!-- 地圖容器 -->
                <div class="map-wrapper">
                    <div id="europeMap" class="map-area">
                        <div class="map-loading">
                            <i class="fas fa-spinner fa-spin"></i>
                            載入地圖中...
                        </div>
                    </div>
                    
                    <!-- 地圖圖例 -->
                    <div class="map-legend">
                        <div class="legend-item">
                            <span class="legend-icon city"></span>
                            <span class="legend-text">城市</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-icon castle"></span>
                            <span class="legend-text">城堡/景點</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-icon music"></span>
                            <span class="legend-text">音樂之都</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-icon route"></span>
                            <span class="legend-text">行程路線</span>
                        </div>
                    </div>
                </div>
                
                <!-- 景點列表 -->
                <div class="locations-panel">
                    <h3 class="panel-title">
                        <i class="fas fa-list"></i>
                        行程景點列表
                    </h3>
                    
                    <div class="locations-list" id="locationsList">
                        <!-- 景點列表將由JS動態生成 -->
                    </div>
                </div>
                
                <!-- 地圖資訊 -->
                <div class="map-info">
                    <div class="info-item">
                        <i class="fas fa-route"></i>
                        <span>總行程距離：約 800 公里</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <span>行程天數：10 天</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-city"></i>
                        <span>訪問城市：6 個</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-flag"></i>
                        <span>訪問國家：4 國</span>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = mapHTML;
        this.mapContainer = document.getElementById('europeMap');
        
        // 設置事件監聽器
        this.setupEventListeners();
        
        // 生成景點列表
        this.generateLocationsList();
    }
    
    // 初始化地圖
    initMap() {
        if (!this.mapContainer) return;
        
        try {
            // 使用Leaflet.js創建地圖
            this.mapInstance = L.map('europeMap').setView([48.5, 16.0], 6);
            
            // 添加地圖圖層
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 18,
                minZoom: 4
            }).addTo(this.mapInstance);
            
            // 添加行程點標記
            this.addMarkers();
            
            // 添加行程路線
            this.addRoute();
            
            console.log('✅ 地圖初始化成功');
            
        } catch (error) {
            console.error('❌ 地圖初始化失敗:', error);
            this.showMapError();
        }
    }
    
    // 添加標記
    addMarkers() {
        if (!this.mapInstance) return;
        
        this.itineraryPoints.forEach(point => {
            // 創建自定義圖標
            const icon = this.createCustomIcon(point.icon);
            
            // 創建標記
            const marker = L.marker(point.coordinates, { icon: icon })
                .addTo(this.mapInstance)
                .bindPopup(`
                    <div class="map-popup">
                        <h3>${point.name}</h3>
                        <p><strong>國家：</strong>${point.country}</p>
                        <p><strong>行程天數：</strong>${point.days}</p>
                        <p><strong>描述：</strong>${point.description}</p>
                        <div class="popup-activities">
                            <strong>主要活動：</strong>
                            <ul>
                                ${point.activities.map(activity => `<li>${activity}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `);
            
            this.markers.push(marker);
        });
    }
    
    // 創建自定義圖標
    createCustomIcon(type) {
        const iconColors = {
            'city': '#1a237e',      // 藍色
            'castle': '#c41e3a',    // 紅色
            'music': '#4cc9f0'      // 青色
        };
        
        const iconHtml = `
            <div style="
                background-color: ${iconColors[type] || '#666'};
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 12px;
            ">
                <i class="fas fa-${type === 'city' ? 'city' : type === 'castle' ? 'castle' : 'music'}"></i>
            </div>
        `;
        
        return L.divIcon({
            html: iconHtml,
            className: 'custom-marker',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
    }
    
    // 添加路線
    addRoute() {
        if (!this.mapInstance || !this.itineraryRoute.length) return;
        
        this.route = L.polyline(this.itineraryRoute, {
            color: '#4cc9f0',
            weight: 3,
            opacity: 0.7,
            dashArray: '10, 10'
        }).addTo(this.mapInstance);
    }
    
    // 生成景點列表
    generateLocationsList() {
        const listContainer = document.getElementById('locationsList');
        if (!listContainer) return;
        
        let listHTML = '';
        
        this.itineraryPoints.forEach((point, index) => {
            listHTML += `
                <div class="location-item" data-location-id="${point.id}">
                    <div class="location-number">${index + 1}</div>
                    <div class="location-info">
                        <h4 class="location-name">${point.name}</h4>
                        <p class="location-country">${point.country} • ${point.days}</p>
                        <p class="location-description">${point.description}</p>
                    </div>
                    <button class="location-view-btn" data-coordinates="${point.coordinates}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            `;
        });
        
        listContainer.innerHTML = listHTML;
        
        // 添加景點點擊事件
        document.querySelectorAll('.location-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const coords = e.currentTarget.getAttribute('data-coordinates').split(',');
                this.flyToLocation([parseFloat(coords[0]), parseFloat(coords[1])]);
            });
        });
        
        // 添加景點項目點擊事件
        document.querySelectorAll('.location-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('location-view-btn')) {
                    const locationId = e.currentTarget.getAttribute('data-location-id');
                    this.showLocationDetails(locationId);
                }
            });
        });
    }
    
    // 設置事件監聽器
    setupEventListeners() {
        // 放大按鈕
        const zoomInBtn = document.getElementById('zoomInBtn');
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                if (this.mapInstance) this.mapInstance.zoomIn();
            });
        }
        
        // 縮小按鈕
        const zoomOutBtn = document.getElementById('zoomOutBtn');
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                if (this.mapInstance) this.mapInstance.zoomOut();
            });
        }
        
        // 重置視圖按鈕
        const resetViewBtn = document.getElementById('resetViewBtn');
        if (resetViewBtn) {
            resetViewBtn.addEventListener('click', () => {
                if (this.mapInstance) this.mapInstance.setView([48.5, 16.0], 6);
            });
        }
        
        // 顯示路線按鈕
        const showRouteBtn = document.getElementById('showRouteBtn');
        if (showRouteBtn) {
            showRouteBtn.addEventListener('click', () => {
                this.toggleRoute();
            });
        }
        
        // 顯示標記按鈕
        const showMarkersBtn = document.getElementById('showMarkersBtn');
        if (showMarkersBtn) {
            showMarkersBtn.addEventListener('click', () => {
                this.toggleMarkers();
            });
        }
        
        // 當前位置按鈕
        const currentLocationBtn = document.getElementById('currentLocationBtn');
        if (currentLocationBtn) {
            currentLocationBtn.addEventListener('click', () => {
                this.getCurrentLocation();
            });
        }
    }
    
    // 飛到指定位置
    flyToLocation(coordinates) {
        if (!this.mapInstance) return;
        
        this.mapInstance.flyTo(coordinates, 12, {
            duration: 1.5
        });
    }
    
    // 顯示位置詳情
    showLocationDetails(locationId) {
        const point = this.itineraryPoints.find(p => p.id === locationId);
        if (!point || !this.mapInstance) return;
        
        // 飛到該位置
        this.flyToLocation(point.coordinates);
        
        // 打開彈出窗口
        const marker = this.markers.find(m => {
            const latlng = m.getLatLng();
            return latlng.lat === point.coordinates[0] && latlng.lng === point.coordinates[1];
        });
        
        if (marker) {
            marker.openPopup();
        }
    }
    
    // 切換路線顯示
    toggleRoute() {
        if (!this.route) return;
        
        if (this.mapInstance.hasLayer(this.route)) {
            this.mapInstance.removeLayer(this.route);
            this.showMessage('路線已隱藏', 'info');
        } else {
            this.route.addTo(this.mapInstance);
            this.showMessage('路線已顯示', 'info');
        }
    }
    
    // 切換標記顯示
    toggleMarkers() {
        if (!this.markers.length) return;
        
        const allVisible = this.markers.every(marker => this.mapInstance.hasLayer(marker));
        
        if (allVisible) {
            this.markers.forEach(marker => {
                this.mapInstance.removeLayer(marker);
            });
            this.showMessage('所有標記已隱藏', 'info');
        } else {
            this.markers.forEach(marker => {
                marker.addTo(this.mapInstance);
            });
            this.showMessage('所有標記已顯示', 'info');
        }
    }
    
    // 獲取當前位置
    getCurrentLocation() {
        if (!navigator.geolocation) {
            this.showMessage('瀏覽器不支援定位功能', 'error');
            return;
        }
        
        this.showMessage('定位中...', 'info');
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                this.currentLocation = [latitude, longitude];
                
                // 添加當前位置標記
                this.addCurrentLocationMarker(latitude, longitude);
                
                // 飛到當前位置
                this.flyToLocation([latitude, longitude]);
                
                this.showMessage('定位成功', 'success');
            },
            (error) => {
                console.error('定位失敗:', error);
                this.showMessage('定位失敗，請檢查定位權限', 'error');
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    }
    
    // 添加當前位置標記
    addCurrentLocationMarker(lat, lng) {
        if (!this.mapInstance) return;
        
        // 移除舊的當前位置標記
        if (this.currentLocationMarker) {
            this.mapInstance.removeLayer(this.currentLocationMarker);
        }
        
        // 創建當前位置圖標
        const currentIcon = L.divIcon({
            html: `
                <div style="
                    background-color: #28a745;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                "></div>
            `,
            className: 'current-location-marker',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        // 添加當前位置標記
        this.currentLocationMarker = L.marker([lat, lng], { icon: currentIcon })
            .addTo(this.mapInstance)
            .bindPopup('<strong>您的位置</strong>')
            .openPopup();
    }
    
    // 顯示地圖錯誤
    showMapError() {
        if (!this.mapContainer) return;
        
        this.mapContainer.innerHTML = `
            <div class="map-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>無法載入地圖</h3>
                <p>請檢查網路連線或使用其他瀏覽器</p>
                <div class="error-actions">
                    <button class="btn btn-primary" onclick="location.reload()">
                        重新整理
                    </button>
                    <button class="btn btn-outline" onclick="window.interactiveEuropeMap.showStaticMap()">
                        查看靜態地圖
                    </button>
                </div>
            </div>
        `;
    }
    
    // 顯示靜態地圖（備用方案）
    showStaticMap() {
        if (!this.mapContainer) return;
        
        this.mapContainer.innerHTML = `
            <div class="static-map">
                <h3>歐洲四國行程地圖</h3>
                <div class="static-map-image">
                    <div class="map-point" style="top: 40%; left: 65%;">
                        <span class="point-label">布達佩斯</span>
                    </div>
                    <div class="map-point" style="top: 35%; left: 60%;">
                        <span class="point-label">布拉提斯拉瓦</span>
                    </div>
                    <div class="map-point" style="top: 30%; left: 55%;">
                        <span class="point-label">維也納</span>
                    </div>
                    <div class="map-point" style="top: 25%; left: 50%;">
                        <span class="point-label">布爾諾</span>
                    </div>
                    <div class="map-point" style="top: 20%; left: 45%;">
                        <span class="point-label">布拉格</span>
                    </div>
                    <div class="map-point" style="top: 15%; left: 40%;">
                        <span class="point-label">庫倫洛夫</span>
                    </div>
                </div>
                <p class="static-map-note">
                    <i class="fas fa-info-circle"></i>
                    由於網路限制，顯示靜態地圖。建議在良好網路環境下使用互動地圖。
                </p>
            </div>
        `;
    }
    
    // 顯示訊息
    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `map-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.querySelector('.interactive-map-container').appendChild(messageDiv);
        
        // 3秒後自動移除
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 3000);
    }
}

// 創建全局實例
window.interactiveEuropeMap = new InteractiveEuropeMap();

// 自動初始化
document.addEventListener('DOMContentLoaded', function() {
    window.interactiveEuropeMap.initialize();
});