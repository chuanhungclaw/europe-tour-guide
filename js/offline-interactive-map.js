// 完全離線互動地圖系統
class OfflineInteractiveMap {
    constructor() {
        this.mapContainer = null;
        this.svg = null;
        this.currentZoom = 1;
        this.currentX = 0;
        this.currentY = 0;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.selectedCity = null;
        
        // 歐洲四國行程數據
        this.cities = [
            {
                id: 'budapest',
                name: '布達佩斯',
                country: '匈牙利',
                days: '第2-3天',
                x: 550,
                y: 320,
                description: '匈牙利首都，被譽為「多瑙河上的明珠」，分為布達和佩斯兩部分。',
                attractions: [
                    '布達城堡',
                    '漁人堡',
                    '馬提亞斯教堂',
                    '國會大廈',
                    '塞切尼溫泉浴場'
                ]
            },
            {
                id: 'bratislava',
                name: '布拉提斯拉瓦',
                country: '斯洛伐克',
                days: '第4天',
                x: 500,
                y: 290,
                description: '斯洛伐克首都，位於多瑙河畔，歷史悠久的老城區保存完好。',
                attractions: [
                    '布拉提斯拉瓦城堡',
                    '舊城區',
                    '聖馬丁大教堂',
                    '總統府'
                ]
            },
            {
                id: 'vienna',
                name: '維也納',
                country: '奧地利',
                days: '第5-6天',
                x: 470,
                y: 270,
                description: '奧地利首都，音樂之都，擁有豐富的藝術和歷史遺產。',
                attractions: [
                    '美泉宮',
                    '霍夫堡宮',
                    '聖史蒂芬大教堂',
                    '維也納國家歌劇院'
                ]
            },
            {
                id: 'brno',
                name: '布爾諾',
                country: '捷克',
                days: '第7天',
                x: 520,
                y: 250,
                description: '捷克第二大城市，摩拉維亞地區的文化和經濟中心。',
                attractions: [
                    '斯皮爾貝克城堡',
                    '聖彼得與聖保羅大教堂',
                    '自由廣場'
                ]
            },
            {
                id: 'prague',
                name: '布拉格',
                country: '捷克',
                days: '第8-9天',
                x: 490,
                y: 230,
                description: '捷克首都，被譽為「百塔之城」，完整保存了中世紀風貌。',
                attractions: [
                    '布拉格城堡',
                    '查理大橋',
                    '天文鐘',
                    '舊城廣場'
                ]
            },
            {
                id: 'cesky-krumlov',
                name: '庫倫洛夫',
                country: '捷克',
                days: '第10天',
                x: 480,
                y: 210,
                description: '捷克童話小鎮，被聯合國教科文組織列為世界文化遺產。',
                attractions: [
                    '庫倫洛夫城堡',
                    '舊城區',
                    '彩繪塔'
                ]
            }
        ];
        
        console.log('🗺️ 離線互動地圖系統初始化...');
    }
    
    // 初始化
    init() {
        // 找到地圖容器
        this.mapContainer = document.getElementById('mapContainer');
        if (!this.mapContainer) {
            console.error('❌ 地圖容器未找到');
            return;
        }
        
        // 創建離線地圖
        this.createOfflineMap();
        
        // 設置地圖控制
        this.setupMapControls();
        
        // 設置景點列表
        this.setupAttractionsList();
        
        console.log('✅ 離線互動地圖系統初始化完成');
    }
    
    // 創建離線地圖
    createOfflineMap() {
        console.log('🖼️ 創建離線地圖...');
        
        // 清除原有內容
        this.mapContainer.innerHTML = '';
        
        // 創建地圖HTML結構
        const mapHTML = `
            <div class="offline-map-wrapper">
                <div class="map-controls-top">
                    <button class="map-control-btn" id="zoomInBtn">
                        <i class="fas fa-search-plus"></i>
                        放大
                    </button>
                    <button class="map-control-btn" id="zoomOutBtn">
                        <i class="fas fa-search-minus"></i>
                        縮小
                    </button>
                    <button class="map-control-btn" id="resetViewBtn">
                        <i class="fas fa-home"></i>
                        重置
                    </button>
                    <button class="map-control-btn" id="showRouteBtn">
                        <i class="fas fa-route"></i>
                        顯示路線
                    </button>
                </div>
                
                <div class="offline-map-canvas" id="offlineMapCanvas">
                    <!-- SVG地圖將由JS創建 -->
                    <div class="map-loading">
                        <i class="fas fa-spinner fa-spin"></i>
                        載入離線地圖中...
                    </div>
                </div>
                
                <div class="map-info-panel" id="mapInfoPanel">
                    <div class="map-info-header">
                        <h3><i class="fas fa-map-marked-alt"></i> 景點詳細資訊</h3>
                        <button class="close-info-btn" id="closeInfoBtn">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="map-info-content" id="mapInfoContent">
                        <!-- 景點資訊將動態顯示 -->
                    </div>
                </div>
            </div>
        `;
        
        this.mapContainer.innerHTML = mapHTML;
        
        // 創建SVG地圖
        this.createSVGMap();
    }
    
    // 創建SVG地圖
    createSVGMap() {
        const canvas = document.getElementById('offlineMapCanvas');
        if (!canvas) return;
        
        // 移除載入提示
        canvas.innerHTML = '';
        
        // 創建SVG元素
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('id', 'offlineMapSvg');
        this.svg.setAttribute('width', '100%');
        this.svg.setAttribute('height', '100%');
        this.svg.setAttribute('viewBox', '0 0 800 600');
        this.svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        
        // 歐洲地圖背景（簡化輪廓）
        this.createEuropeMap();
        
        // 四國邊界
        this.createCountries();
        
        // 城市標記
        this.createCityMarkers();
        
        // 行程路線
        this.createRoute();
        
        // 添加到畫布
        canvas.appendChild(this.svg);
        
        // 設置地圖交互
        this.setupMapInteraction();
    }
    
    // 創建歐洲地圖背景
    createEuropeMap() {
        // 創建歐洲輪廓（簡化）
        const europe = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        europe.setAttribute('d', 'M100,100 L700,100 L700,500 L100,500 Z');
        europe.setAttribute('fill', '#e6f7ff');
        europe.setAttribute('stroke', '#91d5ff');
        europe.setAttribute('stroke-width', '2');
        this.svg.appendChild(europe);
    }
    
    // 創建四國邊界
    createCountries() {
        const countries = [
            { id: 'hungary', name: '匈牙利', color: '#ffccc7', points: '550,300 600,300 600,350 550,350' },
            { id: 'slovakia', name: '斯洛伐克', color: '#d9f7be', points: '500,280 550,280 550,330 500,330' },
            { id: 'austria', name: '奧地利', color: '#ffd8bf', points: '450,260 500,260 500,310 450,310' },
            { id: 'czech', name: '捷克', color: '#d6e4ff', points: '520,240 570,240 570,290 520,290' }
        ];
        
        countries.forEach(country => {
            const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            polygon.setAttribute('points', country.points);
            polygon.setAttribute('fill', country.color);
            polygon.setAttribute('fill-opacity', '0.3');
            polygon.setAttribute('stroke', country.color);
            polygon.setAttribute('stroke-width', '1');
            polygon.setAttribute('data-country', country.id);
            polygon.setAttribute('title', country.name);
            this.svg.appendChild(polygon);
        });
    }
    
    // 創建城市標記
    createCityMarkers() {
        this.cities.forEach(city => {
            // 創建城市圓點
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', city.x);
            circle.setAttribute('cy', city.y);
            circle.setAttribute('r', '8');
            circle.setAttribute('fill', '#ff4d4f');
            circle.setAttribute('stroke', '#fff');
            circle.setAttribute('stroke-width', '2');
            circle.setAttribute('data-city', city.id);
            circle.setAttribute('class', 'city-marker');
            circle.setAttribute('title', `${city.name} (${city.days})`);
            
            // 添加點擊事件
            circle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showCityInfo(city);
            });
            
            this.svg.appendChild(circle);
            
            // 創建城市標籤
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', city.x + 15);
            text.setAttribute('y', city.y + 5);
            text.setAttribute('fill', '#333');
            text.setAttribute('font-size', '14');
            text.setAttribute('font-weight', 'bold');
            text.textContent = city.name;
            this.svg.appendChild(text);
        });
    }
    
    // 創建行程路線
    createRoute() {
        // 創建路線連接線
        const points = this.cities.map(city => `${city.x},${city.y}`).join(' ');
        
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('points', points);
        polyline.setAttribute('fill', 'none');
        polyline.setAttribute('stroke', '#4cc9f0');
        polyline.setAttribute('stroke-width', '3');
        polyline.setAttribute('stroke-dasharray', '10,5');
        this.svg.appendChild(polyline);
    }
    
    // 顯示城市資訊
    showCityInfo(city) {
        const infoPanel = document.getElementById('mapInfoPanel');
        const infoContent = document.getElementById('mapInfoContent');
        
        if (!infoPanel || !infoContent) return;
        
        // 更新選中狀態
        if (this.selectedCity) {
            const prevMarker = document.querySelector(`.city-marker[data-city="${this.selectedCity.id}"]`);
            if (prevMarker) {
                prevMarker.setAttribute('fill', '#ff4d4f');
            }
        }
        
        const currentMarker = document.querySelector(`.city-marker[data-city="${city.id}"]`);
        if (currentMarker) {
            currentMarker.setAttribute('fill', '#ff7a45');
        }
        
        this.selectedCity = city;
        
        // 顯示詳細資訊
        infoContent.innerHTML = `
            <div class="city-info-header">
                <h4>${city.name}</h4>
                <span class="city-country">${city.country}</span>
                <span class="city-days">${city.days}</span>
            </div>
            
            <div class="city-description">
                <p>${city.description}</p>
            </div>
            
            <div class="city-attractions">
                <h5><i class="fas fa-landmark"></i> 主要景點：</h5>
                <ul>
                    ${city.attractions.map(attraction => `
                        <li>${attraction}</li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="city-tips">
                <h5><i class="fas fa-lightbulb"></i> 旅行提示：</h5>
                <ul>
                    <li>建議遊覽時間：2-3小時/景點</li>
                    <li>最佳拍照時間：上午10點前或下午4點後</li>
                    <li>當地美食：嘗試當地特色料理</li>
                    <li>交通建議：使用公共交通工具</li>
                </ul>
            </div>
        `;
        
        // 顯示資訊面板
        infoPanel.style.display = 'block';
    }
    
    // 設置地圖交互
    setupMapInteraction() {
        // 拖拽功能
        this.svg.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.dragStartX = e.clientX - this.currentX;
            this.dragStartY = e.clientY - this.currentY;
            this.svg.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            
            this.currentX = e.clientX - this.dragStartX;
            this.currentY = e.clientY - this.dragStartY;
            
            this.svg.style.transform = `translate(${this.currentX}px, ${this.currentY}px) scale(${this.currentZoom})`;
        });
        
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.svg.style.cursor = 'grab';
        });
        
        // 點擊空白處關閉資訊面板
        this.svg.addEventListener('click', (e) => {
            if (e.target === this.svg) {
                this.hideCityInfo();
            }
        });
    }
    
    // 設置地圖控制
    setupMapControls() {
        // 放大按鈕
        const zoomInBtn = document.getElementById('zoomInBtn');
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                this.currentZoom = Math.min(this.currentZoom + 0.2, 3);
                this.updateMapTransform();
            });
        }
        
        // 縮小按鈕
        const zoomOutBtn = document.getElementById('zoomOutBtn');
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                this.currentZoom = Math.max(this.currentZoom - 0.2, 0.5);
                this.updateMapTransform();
            });
        }
        
        // 重置按鈕
        const resetBtn = document.getElementById('resetViewBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.currentZoom = 1;
                this.currentX = 0;
                this.currentY = 0;
                this.updateMapTransform();
                this.hideCityInfo();
            });
        }
        
        // 顯示路線按鈕
        const routeBtn = document.getElementById('showRouteBtn');
        if (routeBtn) {
            routeBtn.addEventListener('click', () => {
                this.highlightRoute();
            });
        }
        
        // 關閉資訊按鈕
        const closeBtn = document.getElementById('closeInfoBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideCityInfo();
            });
        }
    }
    
    // 設置景點列表
    setupAttractionsList() {
        const attractionsList = document.getElementById('attractionsList');
        if (!attractionsList) return;
        
        attractionsList.innerHTML = `
            <div class="attractions-list-header">
                <h3><i class="fas fa-list"></i> 行程景點列表</h3>
            </div>
            <div class="attractions-items">
                ${this.cities.map(city => `
                    <div class="attraction-item" data-city="${city.id}">
                        <div class="attraction-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="attraction-info">
                            <h4>${city.name}</h4>
                            <p>${city.days} - ${city.country}</p>
                        </div>
                        <div class="attraction-action">
                            <button class="view-details-btn" data-city="${city.id}">
                                查看詳情
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // 為每個查看詳情按鈕添加事件
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cityId = e.target.getAttribute('data-city');
                const city = this.cities.find(c => c.id === cityId);
                if (city) {
                    this.showCityInfo(city);
                }
            });
        });
    }
    
    // 更新地圖變換
    updateMapTransform() {
        if (this.svg) {
            this.svg.style.transform = `translate(${this.currentX}px, ${this.currentY}px) scale(${this.currentZoom})`;
        }
    }
    
    // 隱藏城市資訊
    hideCityInfo() {
        const infoPanel = document.getElementById('mapInfoPanel');
        if (infoPanel) {
            infoPanel.style.display = 'none';
        }
        
        // 重置選中標記
        if (this.selectedCity) {
            const marker = document.querySelector(`.city-marker[data-city="${this.selectedCity.id}"]`);
            if (marker) {
                marker.setAttribute('fill', '#ff4d4f');
            }
            this.selectedCity = null;
        }
    }
    
    // 高亮路線
    highlightRoute() {
        const polylines = this.svg.querySelectorAll('polyline');
        polylines.forEach(polyline => {
            polyline.setAttribute('stroke', '#ff7a45');
            polyline.setAttribute('stroke-width', '4');
            
            // 3秒後恢復
            setTimeout(() => {
                polyline.setAttribute('stroke', '#4cc9f0');
                polyline.setAttribute('stroke-width', '3');
            }, 3000);
        });
    }
}

// 立即初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 初始化離線互動地圖...');
    window.offlineInteractiveMap = new OfflineInteractiveMap();
    window.offlineInteractiveMap.init();
    
    console.log('✅ 離線互動地圖已就緒');
});