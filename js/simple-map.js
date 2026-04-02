// 簡化版歐洲行程地圖
function initSimpleMap() {
    console.log('🗺️ 初始化簡化版地圖...');
    
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) {
        console.error('❌ 找不到地圖容器');
        return;
    }
    
    // 移除 placeholder
    const placeholder = mapContainer.querySelector('.map-placeholder');
    if (placeholder) {
        placeholder.style.display = 'none';
    }
    
    // 創建地圖容器
    const mapDiv = document.createElement('div');
    mapDiv.id = 'europe-map';
    mapDiv.style.cssText = `
        width: 100%;
        height: 100%;
        min-height: 500px;
        background: #f8f9fa;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `;
    
    mapContainer.appendChild(mapDiv);
    
    // 檢查是否已載入 Leaflet
    if (typeof L === 'undefined') {
        console.log('📦 載入 Leaflet 地圖庫...');
        loadLeafletLibrary().then(() => {
            createMap();
        }).catch(error => {
            console.error('❌ Leaflet 載入失敗:', error);
            showStaticMap();
        });
    } else {
        createMap();
    }
    
    function loadLeafletLibrary() {
        return new Promise((resolve, reject) => {
            // 載入 CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            link.onload = () => {
                // 載入 JS
                const script = document.createElement('script');
                script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            };
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }
    
    function createMap() {
        try {
            // 創建地圖
            const map = L.map('europe-map').setView([48.2082, 16.3738], 6);
            
            // 添加地圖圖層
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
                maxZoom: 18,
                minZoom: 3
            }).addTo(map);
            
            // 添加行程點
            const routePoints = [
                { lat: 47.4979, lng: 19.0402, name: '布達佩斯', day: 2, type: 'arrival' },
                { lat: 48.1486, lng: 17.1077, name: '布拉提斯拉瓦', day: 2, type: 'sightseeing' },
                { lat: 48.2082, lng: 16.3738, name: '維也納', day: 2, type: 'hotel' },
                { lat: 49.1951, lng: 16.6068, name: '布爾諾', day: 3, type: 'hotel' },
                { lat: 50.0755, lng: 14.4378, name: '布拉格', day: 4, type: 'hotel' },
                { lat: 48.8108, lng: 14.3150, name: '庫倫洛夫', day: 5, type: 'hotel' },
                { lat: 47.5591, lng: 12.9831, name: '國王湖', day: 6, type: 'sightseeing' },
                { lat: 47.8095, lng: 13.0550, name: '薩爾斯堡', day: 6, type: 'hotel' },
                { lat: 47.5622, lng: 13.6493, name: '哈修塔特', day: 7, type: 'sightseeing' },
                { lat: 47.4979, lng: 19.0402, name: '布達佩斯', day: 8, type: 'hotel' }
            ];
            
            // 添加標記
            routePoints.forEach(point => {
                const icon = L.divIcon({
                    html: getMarkerIcon(point.type),
                    className: 'custom-marker',
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                
                L.marker([point.lat, point.lng], { icon })
                    .addTo(map)
                    .bindPopup(`
                        <div style="min-width: 150px;">
                            <strong>${point.name}</strong><br>
                            <small>第 ${point.day} 天</small><br>
                            <small>${getTypeName(point.type)}</small>
                        </div>
                    `);
            });
            
            // 添加路線
            const routeLine = L.polyline(
                routePoints.map(p => [p.lat, p.lng]),
                { color: '#1a237e', weight: 3, opacity: 0.7 }
            ).addTo(map);
            
            // 調整地圖視圖包含所有點
            map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });
            
            // 添加地圖控制
            addMapControls(map);
            
            console.log('✅ 地圖創建成功');
            
        } catch (error) {
            console.error('❌ 地圖創建失敗:', error);
            showStaticMap();
        }
    }
    
    function getMarkerIcon(type) {
        const icons = {
            arrival: '📍',
            sightseeing: '📸',
            hotel: '🏨'
        };
        
        const color = type === 'arrival' ? '#228b22' : 
                     type === 'sightseeing' ? '#ffd700' : '#6a0dad';
        
        return `
            <div style="
                background: ${color};
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                border: 2px solid white;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            ">
                ${icons[type] || '📍'}
            </div>
        `;
    }
    
    function getTypeName(type) {
        const names = {
            arrival: '抵達點',
            sightseeing: '景點',
            hotel: '住宿'
        };
        return names[type] || '地點';
    }
    
    function addMapControls(map) {
        // 縮放控制
        L.control.zoom({ position: 'topright' }).addTo(map);
        
        // 比例尺
        L.control.scale({ imperial: false, metric: true }).addTo(map);
        
        // 自定義控制按鈕
        const customControl = L.control({ position: 'topleft' });
        customControl.onAdd = function() {
            const div = L.DomUtil.create('div', 'map-custom-control');
            div.innerHTML = `
                <div style="
                    background: white;
                    padding: 10px;
                    border-radius: 5px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    font-size: 12px;
                ">
                    <div style="font-weight: bold; margin-bottom: 5px;">行程地圖</div>
                    <div style="color: #666;">歐洲四國10天行程</div>
                </div>
            `;
            return div;
        };
        customControl.addTo(map);
    }
    
    function showStaticMap() {
        console.log('📊 顯示靜態地圖備用方案...');
        
        mapDiv.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 48px; color: #1a237e; margin-bottom: 20px;">
                    🗺️
                </div>
                <h3 style="color: #1a237e; margin-bottom: 10px;">
                    歐洲四國行程地圖
                </h3>
                <p style="color: #666; margin-bottom: 20px;">
                    由於網路限制，無法載入互動地圖
                </p>
                <div style="
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    max-width: 600px;
                    margin: 0 auto;
                ">
                    <h4 style="color: #1a237e; margin-bottom: 15px;">行程路線：</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
                        <div style="background: #e3f2fd; padding: 8px 15px; border-radius: 20px;">
                            📍 布達佩斯 (第2天)
                        </div>
                        <div style="background: #fff3e0; padding: 8px 15px; border-radius: 20px;">
                            📸 布拉提斯拉瓦 (第2天)
                        </div>
                        <div style="background: #e8f5e9; padding: 8px 15px; border-radius: 20px;">
                            🏨 維也納 (第2天)
                        </div>
                        <div style="background: #f3e5f5; padding: 8px 15px; border-radius: 20px;">
                            🏨 布爾諾 (第3天)
                        </div>
                        <div style="background: #e3f2fd; padding: 8px 15px; border-radius: 20px;">
                            🏨 布拉格 (第4天)
                        </div>
                        <div style="background: #fff3e0; padding: 8px 15px; border-radius: 20px;">
                            🏨 庫倫洛夫 (第5天)
                        </div>
                        <div style="background: #e8f5e9; padding: 8px 15px; border-radius: 20px;">
                            📸 國王湖 (第6天)
                        </div>
                        <div style="background: #f3e5f5; padding: 8px 15px; border-radius: 20px;">
                            🏨 薩爾斯堡 (第6天)
                        </div>
                        <div style="background: #e3f2fd; padding: 8px 15px; border-radius: 20px;">
                            📸 哈修塔特 (第7天)
                        </div>
                        <div style="background: #fff3e0; padding: 8px 15px; border-radius: 20px;">
                            🏨 布達佩斯 (第8天)
                        </div>
                    </div>
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p style="color: #666; font-size: 14px;">
                            <strong>路線：</strong> 布達佩斯 → 布拉提斯拉瓦 → 維也納 → 布爾諾 → 布拉格 → 庫倫洛夫 → 國王湖 → 薩爾斯堡 → 哈修塔特 → 布達佩斯
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
}

// 地圖切換事件
document.addEventListener('DOMContentLoaded', function() {
    // 監聽地圖頁面切換
    const mapSection = document.getElementById('map');
    if (mapSection) {
        // 使用 Intersection Observer 監聽可見性
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('🗺️ 地圖頁面可見，初始化地圖...');
                    // 延遲初始化避免衝突
                    setTimeout(initSimpleMap, 500);
                    observer.unobserve(mapSection);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(mapSection);
    }
    
    // 導航欄點擊事件
    const mapNavLink = document.querySelector('a[href="#map"]');
    if (mapNavLink) {
        mapNavLink.addEventListener('click', function() {
            // 延遲初始化確保頁面切換完成
            setTimeout(() => {
                if (document.getElementById('map')?.classList.contains('active')) {
                    initSimpleMap();
                }
            }, 300);
        });
    }
    
    // 底部工具列點擊事件
    const mapToolBtn = document.querySelector('.tool-btn[data-section="map"]');
    if (mapToolBtn) {
        mapToolBtn.addEventListener('click', function() {
            setTimeout(() => {
                if (document.getElementById('map')?.classList.contains('active')) {
                    initSimpleMap();
                }
            }, 300);
        });
    }
});

// 匯出函數
window.initSimpleMap = initSimpleMap;