// 歐洲行程地圖數據
const europeMapData = {
    // 地圖中心點（維也納）
    center: {
        lat: 48.2082,
        lng: 16.3738,
        zoom: 6
    },
    
    // 行程路線點
    routePoints: [
        {
            id: 1,
            city: "台北",
            lat: 25.0330,
            lng: 121.5654,
            type: "departure",
            day: 1,
            description: "出發地"
        },
        {
            id: 2,
            city: "上海",
            lat: 31.2304,
            lng: 121.4737,
            type: "transit",
            day: 1,
            description: "轉機點"
        },
        {
            id: 3,
            city: "布達佩斯",
            lat: 47.4979,
            lng: 19.0402,
            type: "arrival",
            day: 2,
            description: "抵達歐洲"
        },
        {
            id: 4,
            city: "布拉提斯拉瓦",
            lat: 48.1486,
            lng: 17.1077,
            type: "sightseeing",
            day: 2,
            description: "斯洛伐克首都"
        },
        {
            id: 5,
            city: "維也納",
            lat: 48.2082,
            lng: 16.3738,
            type: "hotel",
            day: 2,
            description: "住宿：VOCO VIENNA PRATER"
        },
        {
            id: 6,
            city: "布爾諾",
            lat: 49.1951,
            lng: 16.6068,
            type: "hotel",
            day: 3,
            description: "住宿：OREA CONGRESS HOTEL BRNO"
        },
        {
            id: 7,
            city: "布拉格",
            lat: 50.0755,
            lng: 14.4378,
            type: "hotel",
            day: 4,
            description: "住宿：OCCIDENTAL PRAHA"
        },
        {
            id: 8,
            city: "庫倫洛夫",
            lat: 48.8108,
            lng: 14.3150,
            type: "hotel",
            day: 5,
            description: "住宿：HOTEL GRAND"
        },
        {
            id: 9,
            city: "國王湖",
            lat: 47.5591,
            lng: 12.9831,
            type: "sightseeing",
            day: 6,
            description: "德國國王湖遊船"
        },
        {
            id: 10,
            city: "薩爾斯堡",
            lat: 47.8095,
            lng: 13.0550,
            type: "hotel",
            day: 6,
            description: "住宿：FOURSIDE HOTEL SALZBURG"
        },
        {
            id: 11,
            city: "哈修塔特",
            lat: 47.5622,
            lng: 13.6493,
            type: "sightseeing",
            day: 7,
            description: "世界最美湖畔小鎮"
        },
        {
            id: 12,
            city: "維也納",
            lat: 48.2082,
            lng: 16.3738,
            type: "hotel",
            day: 7,
            description: "住宿：AUSTRIA TREND EVENTHOTEL PYRAMIDE"
        },
        {
            id: 13,
            city: "布達佩斯",
            lat: 47.4979,
            lng: 19.0402,
            type: "hotel",
            day: 8,
            description: "住宿：TRIBE BUDAPEST STADIUM"
        }
    ],
    
    // 行程路線連接
    routeConnections: [
        { from: 1, to: 2, type: "flight", description: "台北 → 上海" },
        { from: 2, to: 3, type: "flight", description: "上海 → 布達佩斯" },
        { from: 3, to: 4, type: "bus", description: "布達佩斯 → 布拉提斯拉瓦" },
        { from: 4, to: 5, type: "bus", description: "布拉提斯拉瓦 → 維也納" },
        { from: 5, to: 6, type: "bus", description: "維也納 → 布爾諾" },
        { from: 6, to: 7, type: "bus", description: "布爾諾 → 布拉格" },
        { from: 7, to: 8, type: "bus", description: "布拉格 → 庫倫洛夫" },
        { from: 8, to: 9, type: "bus", description: "庫倫洛夫 → 國王湖" },
        { from: 9, to: 10, type: "bus", description: "國王湖 → 薩爾斯堡" },
        { from: 10, to: 11, type: "bus", description: "薩爾斯堡 → 哈修塔特" },
        { from: 11, to: 12, type: "bus", description: "哈修塔特 → 維也納" },
        { from: 12, to: 13, type: "bus", description: "維也納 → 布達佩斯" }
    ],
    
    // 地圖標記圖標
    markers: {
        departure: {
            icon: "✈️",
            color: "#1a237e",
            size: 30
        },
        transit: {
            icon: "🔄",
            color: "#ff6b35",
            size: 25
        },
        arrival: {
            icon: "📍",
            color: "#228b22",
            size: 30
        },
        hotel: {
            icon: "🏨",
            color: "#6a0dad",
            size: 25
        },
        sightseeing: {
            icon: "📸",
            color: "#ffd700",
            size: 25
        }
    },
    
    // 地圖設定
    mapSettings: {
        provider: "leaflet", // 使用 Leaflet.js
        tileLayer: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        minZoom: 3
    }
};

// 地圖功能函數
class EuropeTourMap {
    constructor(containerId) {
        this.containerId = containerId;
        this.map = null;
        this.markers = [];
        this.routeLines = [];
        this.currentDay = 1;
        
        // 檢查 Leaflet 是否已載入
        if (typeof L === 'undefined') {
            this.loadLeaflet();
        } else {
            this.init();
        }
    }
    
    // 載入 Leaflet 庫
    loadLeaflet() {
        console.log('📦 載入 Leaflet 地圖庫...');
        
        // 載入 CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);
        
        // 載入 JS
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        script.crossOrigin = '';
        script.onload = () => {
            console.log('✅ Leaflet 載入完成');
            this.init();
        };
        document.head.appendChild(script);
    }
    
    // 初始化地圖
    init() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error('❌ 找不到地圖容器:', this.containerId);
            return;
        }
        
        // 移除 placeholder
        const placeholder = container.querySelector('.map-placeholder');
        if (placeholder) {
            placeholder.style.display = 'none';
        }
        
        // 創建地圖
        this.map = L.map(container).setView(
            [europeMapData.center.lat, europeMapData.center.lng],
            europeMapData.center.zoom
        );
        
        // 添加地圖圖層
        L.tileLayer(europeMapData.mapSettings.tileLayer, {
            attribution: europeMapData.mapSettings.attribution,
            maxZoom: europeMapData.mapSettings.maxZoom,
            minZoom: europeMapData.mapSettings.minZoom
        }).addTo(this.map);
        
        // 添加地圖控制
        this.addMapControls();
        
        // 載入行程點
        this.loadRoutePoints();
        
        // 載入路線
        this.loadRouteConnections();
        
        // 設定事件
        this.setupEvents();
        
        console.log('✅ 地圖初始化完成');
    }
    
    // 添加地圖控制
    addMapControls() {
        // 縮放控制
        L.control.zoom({
            position: 'topright'
        }).addTo(this.map);
        
        // 比例尺
        L.control.scale({
            imperial: false,
            metric: true
        }).addTo(this.map);
    }
    
    // 載入行程點
    loadRoutePoints() {
        this.markers = [];
        
        europeMapData.routePoints.forEach(point => {
            const markerConfig = europeMapData.markers[point.type] || europeMapData.markers.sightseeing;
            
            // 創建自定義圖標
            const icon = L.divIcon({
                html: `<div style="
                    background: ${markerConfig.color};
                    color: white;
                    width: ${markerConfig.size}px;
                    height: ${markerConfig.size}px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: ${markerConfig.size * 0.6}px;
                    border: 2px solid white;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                ">${markerConfig.icon}</div>`,
                className: 'custom-marker',
                iconSize: [markerConfig.size, markerConfig.size],
                iconAnchor: [markerConfig.size / 2, markerConfig.size / 2]
            });
            
            // 創建標記
            const marker = L.marker([point.lat, point.lng], { icon })
                .addTo(this.map)
                .bindPopup(this.createPopupContent(point));
            
            this.markers.push({
                id: point.id,
                marker: marker,
                data: point
            });
        });
    }
    
    // 創建彈出視窗內容
    createPopupContent(point) {
        const dayInfo = point.day ? `第 ${point.day} 天` : '';
        
        return `
            <div style="min-width: 200px;">
                <h3 style="margin: 0 0 5px 0; color: #1a237e;">
                    ${point.city}
                </h3>
                <p style="margin: 0 0 5px 0; color: #666;">
                    ${point.description}
                </p>
                <div style="font-size: 12px; color: #888;">
                    ${dayInfo}
                    <br>
                    座標: ${point.lat.toFixed(4)}, ${point.lng.toFixed(4)}
                </div>
            </div>
        `;
    }
    
    // 載入路線連接
    loadRouteConnections() {
        this.routeLines = [];
        
        europeMapData.routeConnections.forEach(connection => {
            const fromPoint = europeMapData.routePoints.find(p => p.id === connection.from);
            const toPoint = europeMapData.routePoints.find(p => p.id === connection.to);
            
            if (!fromPoint || !toPoint) return;
            
            // 設定路線樣式
            const lineStyle = {
                color: this.getLineColor(connection.type),
                weight: 3,
                opacity: 0.7,
                dashArray: connection.type === 'flight' ? '10, 10' : null
            };
            
            // 創建路線
            const line = L.polyline(
                [[fromPoint.lat, fromPoint.lng], [toPoint.lat, toPoint.lng]],
                lineStyle
            ).addTo(this.map);
            
            // 添加彈出視窗
            line.bindPopup(`
                <div style="min-width: 150px;">
                    <strong>${connection.description}</strong><br>
                    <small>類型: ${connection.type === 'flight' ? '飛行' : '巴士'}</small>
                </div>
            `);
            
            this.routeLines.push(line);
        });
    }
    
    // 獲取路線顏色
    getLineColor(type) {
        const colors = {
            flight: '#1a237e',    // 藍色
            bus: '#ff6b35'        // 橙色
        };
        return colors[type] || '#666';
    }
    
    // 設定事件
    setupEvents() {
        // 縮放按鈕
        document.getElementById('zoomIn')?.addEventListener('click', () => {
            this.map.zoomIn();
        });
        
        document.getElementById('zoomOut')?.addEventListener('click', () => {
            this.map.zoomOut();
        });
        
        // 我的位置按鈕
        document.getElementById('currentLocation')?.addEventListener('click', () => {
            this.focusOnCurrentDay();
        });
    }
    
    // 聚焦到當前天數
    focusOnCurrentDay() {
        const currentPoints = europeMapData.routePoints.filter(p => p.day === this.currentDay);
        
        if (currentPoints.length > 0) {
            const bounds = L.latLngBounds(currentPoints.map(p => [p.lat, p.lng]));
            this.map.fitBounds(bounds, { padding: [50, 50] });
            
            // 高亮顯示當前天數的標記
            this.highlightCurrentDay();
        }
    }
    
    // 高亮顯示當前天數
    highlightCurrentDay() {
        // 重置所有標記
        this.markers.forEach(item => {
            item.marker.setZIndexOffset(0);
        });
        
        // 高亮當前天數
        const currentMarkers = this.markers.filter(item => item.data.day === this.currentDay);
        currentMarkers.forEach(item => {
            item.marker.setZIndexOffset(1000);
            item.marker.openPopup();
        });
    }
    
    // 設定當前天數
    setCurrentDay(day) {
        this.currentDay = day;
        this.highlightCurrentDay();
    }
    
    // 顯示/隱藏路線
    toggleRoute(visible) {
        this.routeLines.forEach(line => {
            if (visible) {
                line.addTo(this.map);
            } else {
                this.map.removeLayer(line);
            }
        });
    }
    
    // 顯示/隱藏標記
    toggleMarkers(visible) {
        this.markers.forEach(item => {
            if (visible) {
                item.marker.addTo(this.map);
            } else {
                this.map.removeLayer(item.marker);
            }
        });
    }
}

// 初始化地圖
function initializeMap() {
    console.log('🗺️ 初始化歐洲行程地圖...');
    
    // 檢查地圖容器是否存在
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) {
        console.error('❌ 找不到地圖容器');
        return null;
    }
    
    // 創建地圖實例
    const tourMap = new EuropeTourMap('map');
    
    // 設定地圖控制事件
    setTimeout(() => {
        setupMapControls(tourMap);
    }, 1000);
    
    return tourMap;
}

// 設定地圖控制
function setupMapControls(map) {
    if (!map) return;
    
    // 圖層控制
    const layerControl = document.createElement('div');
    layerControl.className = 'map-layer-control';
    layerControl.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: white;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
    `;
    
    layerControl.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 5px;">圖層控制</div>
        <label style="display: block; margin-bottom: 5px;">
            <input type="checkbox" id="toggleMarkers" checked> 顯示標記
        </label>
        <label style="display: block; margin-bottom: 5px;">
            <input type="checkbox" id="toggleRoutes" checked> 顯示路線
        </label>
        <button id="fitBounds" style="
            width: 100%;
            margin-top: 10px;
            padding: 5px;
            background: #1a237e;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        ">顯示完整行程</button>
    `;
    
    document.querySelector('.map-container').appendChild(layerControl);
    
    // 事件綁定
    document.getElementById('toggleMarkers')?.addEventListener('change', function(e) {
        map.toggleMarkers(e.target.checked);
    });
    
    document.getElementById('toggleRoutes')?.addEventListener('change', function(e) {
        map.toggleRoute(e.target.checked);
    });
    
    document.getElementById('fitBounds')?.addEventListener('click', function() {
        if (map.map) {
            const bounds = L.latLngBounds(europeMapData.routePoints.map(p => [p.lat, p.lng]));
            map.map.fitBounds(bounds, { padding: [50, 50] });
        }
    });
}

// 匯出地圖功能
window.europeMapData = europeMapData;
window.EuropeTourMap = EuropeTourMap;
window.initializeMap = initializeMap;