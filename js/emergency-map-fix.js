// 緊急地圖修復系統
class EmergencyMapFix {
    constructor() {
        console.log('🚨 緊急地圖修復系統啟動...');
    }
    
    // 初始化
    init() {
        this.fixMapContainer();
        this.ensureMapDisplay();
        this.setupFallbackMap();
    }
    
    // 修復地圖容器
    fixMapContainer() {
        const mapContainer = document.getElementById('mapContainer');
        if (!mapContainer) {
            console.error('❌ 找不到地圖容器');
            return false;
        }
        
        // 清除載入動畫
        const loadingElements = mapContainer.querySelectorAll('.map-loading, .travel-loading');
        loadingElements.forEach(el => el.remove());
        
        // 創建地圖畫布
        const mapCanvas = document.createElement('div');
        mapCanvas.className = 'offline-map-wrapper';
        mapCanvas.id = 'offlineMapWrapper';
        
        // 創建SVG地圖
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.id = 'offlineMapSvg';
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '500');
        svg.setAttribute('viewBox', '0 0 1000 800');
        svg.style.cursor = 'grab';
        
        // 添加歐洲地圖背景
        this.createEuropeMap(svg);
        
        // 添加城市標記
        this.addCityMarkers(svg);
        
        // 添加行程路線
        this.addTravelRoute(svg);
        
        // 添加到畫布
        mapCanvas.appendChild(svg);
        
        // 添加到容器
        mapContainer.appendChild(mapCanvas);
        
        // 添加地圖控制按鈕
        this.addMapControls(mapContainer);
        
        // 添加景點列表
        this.addAttractionsList(mapContainer);
        
        console.log('✅ 地圖容器修復完成');
        return true;
    }
    
    // 創建歐洲地圖
    createEuropeMap(svg) {
        // 歐洲輪廓
        const europeOutline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        europeOutline.setAttribute('d', 'M 200,300 Q 250,250 300,300 Q 350,350 400,320 Q 450,290 500,310 Q 550,330 600,300 Q 650,270 700,290 Q 750,310 800,280');
        europeOutline.setAttribute('fill', '#e6f7ff');
        europeOutline.setAttribute('stroke', '#4cc9f0');
        europeOutline.setAttribute('stroke-width', '2');
        europeOutline.setAttribute('stroke-dasharray', '5,5');
        svg.appendChild(europeOutline);
        
        // 國家標記
        const countries = [
            { name: '匈牙利', x: 550, y: 320, color: '#4cc9f0' },
            { name: '斯洛伐克', x: 500, y: 290, color: '#4361ee' },
            { name: '奧地利', x: 470, y: 270, color: '#3a86ff' },
            { name: '捷克', x: 520, y: 250, color: '#7209b7' }
        ];
        
        countries.forEach(country => {
            const countryCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            countryCircle.setAttribute('cx', country.x);
            countryCircle.setAttribute('cy', country.y - 50);
            countryCircle.setAttribute('r', '30');
            countryCircle.setAttribute('fill', country.color);
            countryCircle.setAttribute('fill-opacity', '0.1');
            countryCircle.setAttribute('stroke', country.color);
            countryCircle.setAttribute('stroke-width', '1');
            svg.appendChild(countryCircle);
            
            const countryText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            countryText.setAttribute('x', country.x);
            countryText.setAttribute('y', country.y - 60);
            countryText.setAttribute('text-anchor', 'middle');
            countryText.setAttribute('fill', country.color);
            countryText.setAttribute('font-size', '14');
            countryText.setAttribute('font-weight', 'bold');
            countryText.textContent = country.name;
            svg.appendChild(countryText);
        });
        
        console.log('✅ 歐洲地圖創建完成');
    }
    
    // 添加城市標記
    addCityMarkers(svg) {
        const cities = [
            { id: 'budapest', name: '布達佩斯', x: 550, y: 320, country: '匈牙利', days: '第2-3天' },
            { id: 'bratislava', name: '布拉提斯拉瓦', x: 500, y: 290, country: '斯洛伐克', days: '第4天' },
            { id: 'vienna', name: '維也納', x: 470, y: 270, country: '奧地利', days: '第5-6天' },
            { id: 'brno', name: '布爾諾', x: 520, y: 250, country: '捷克', days: '第7天' },
            { id: 'prague', name: '布拉格', x: 490, y: 230, country: '捷克', days: '第8-9天' },
            { id: 'cesky-krumlov', name: '庫倫洛夫', x: 480, y: 210, country: '捷克', days: '第10天' }
        ];
        
        cities.forEach(city => {
            // 城市標記圓圈
            const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            marker.setAttribute('cx', city.x);
            marker.setAttribute('cy', city.y);
            marker.setAttribute('r', '8');
            marker.setAttribute('fill', '#ff7a45');
            marker.setAttribute('stroke', '#ffffff');
            marker.setAttribute('stroke-width', '2');
            marker.setAttribute('class', 'city-marker');
            marker.setAttribute('data-city', city.id);
            marker.style.cursor = 'pointer';
            
            // 懸停效果
            marker.addEventListener('mouseenter', () => {
                marker.setAttribute('fill', '#ff5252');
                marker.setAttribute('r', '10');
            });
            
            marker.addEventListener('mouseleave', () => {
                marker.setAttribute('fill', '#ff7a45');
                marker.setAttribute('r', '8');
            });
            
            // 點擊事件
            marker.addEventListener('click', () => {
                this.showCityInfo(city);
            });
            
            svg.appendChild(marker);
            
            // 城市名稱標籤
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', city.x);
            label.setAttribute('y', city.y - 15);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('fill', '#333');
            label.setAttribute('font-size', '12');
            label.setAttribute('font-weight', 'bold');
            label.textContent = city.name;
            svg.appendChild(label);
            
            // 天數標籤
            const dayLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            dayLabel.setAttribute('x', city.x);
            dayLabel.setAttribute('y', city.y + 25);
            dayLabel.setAttribute('text-anchor', 'middle');
            dayLabel.setAttribute('fill', '#4cc9f0');
            dayLabel.setAttribute('font-size', '10');
            dayLabel.setAttribute('font-weight', 'bold');
            dayLabel.textContent = city.days;
            svg.appendChild(dayLabel);
        });
        
        console.log('✅ 城市標記添加完成');
    }
    
    // 添加行程路線
    addTravelRoute(svg) {
        const routePoints = [
            { x: 550, y: 320 }, // 布達佩斯
            { x: 500, y: 290 }, // 布拉提斯拉瓦
            { x: 470, y: 270 }, // 維也納
            { x: 520, y: 250 }, // 布爾諾
            { x: 490, y: 230 }, // 布拉格
            { x: 480, y: 210 }  // 庫倫洛夫
        ];
        
        // 創建路線路徑
        let pathData = `M ${routePoints[0].x} ${routePoints[0].y}`;
        for (let i = 1; i < routePoints.length; i++) {
            pathData += ` L ${routePoints[i].x} ${routePoints[i].y}`;
        }
        
        const routePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        routePath.setAttribute('d', pathData);
        routePath.setAttribute('fill', 'none');
        routePath.setAttribute('stroke', '#00b894');
        routePath.setAttribute('stroke-width', '3');
        routePath.setAttribute('stroke-dasharray', '10,5');
        routePath.setAttribute('opacity', '0.7');
        svg.appendChild(routePath);
        
        // 添加路線箭頭
        routePoints.forEach((point, index) => {
            if (index > 0) {
                const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                const prevPoint = routePoints[index - 1];
                const angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x);
                const arrowSize = 8;
                
                arrow.setAttribute('points', `
                    ${point.x},${point.y}
                    ${point.x - arrowSize * Math.cos(angle - Math.PI/6)},${point.y - arrowSize * Math.sin(angle - Math.PI/6)}
                    ${point.x - arrowSize * Math.cos(angle + Math.PI/6)},${point.y - arrowSize * Math.sin(angle + Math.PI/6)}
                `);
                arrow.setAttribute('fill', '#00b894');
                svg.appendChild(arrow);
            }
        });
        
        console.log('✅ 行程路線添加完成');
    }
    
    // 顯示城市資訊
    showCityInfo(city) {
        console.log('📍 顯示城市資訊:', city.name);
        
        // 創建或更新資訊面板
        let infoPanel = document.getElementById('mapInfoPanel');
        if (!infoPanel) {
            infoPanel = document.createElement('div');
            infoPanel.id = 'mapInfoPanel';
            infoPanel.className = 'map-info-panel';
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-info-btn';
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.addEventListener('click', () => {
                infoPanel.style.display = 'none';
            });
            
            const header = document.createElement('div');
            header.className = 'map-info-header';
            header.innerHTML = `<h3><i class="fas fa-city"></i> 城市資訊</h3>`;
            header.appendChild(closeBtn);
            
            const content = document.createElement('div');
            content.id = 'mapInfoContent';
            content.className = 'map-info-content';
            
            infoPanel.appendChild(header);
            infoPanel.appendChild(content);
            
            document.querySelector('.map-card .card-content').appendChild(infoPanel);
        }
        
        // 更新內容
        const content = document.getElementById('mapInfoContent');
        content.innerHTML = `
            <div class="city-info-header">
                <h4>${city.name}</h4>
                <div class="city-meta">
                    <span class="city-country">${city.country}</span>
                    <span class="city-days">${city.days}</span>
                </div>
            </div>
            <div class="city-description">
                <p>${this.getCityDescription(city.id)}</p>
            </div>
            <div class="city-attractions">
                <h5><i class="fas fa-landmark"></i> 主要景點</h5>
                <ul>
                    ${this.getCityAttractions(city.id).map(attr => `<li>${attr}</li>`).join('')}
                </ul>
            </div>
            <div class="city-tips">
                <h5><i class="fas fa-lightbulb"></i> 旅行提示</h5>
                <ul>
                    ${this.getCityTips(city.id).map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
        
        // 顯示面板
        infoPanel.style.display = 'block';
    }
    
    // 獲取城市描述
    getCityDescription(cityId) {
        const descriptions = {
            budapest: '匈牙利首都，被譽為「多瑙河上的明珠」，分為布達和佩斯兩部分，由多座橋樑連接。',
            bratislava: '斯洛伐克首都，位於多瑙河畔，歷史悠久的老城區保存完好，是歐洲最小的首都之一。',
            vienna: '奧地利首都，音樂之都，擁有豐富的藝術、音樂和歷史遺產，帝國建築宏偉壯觀。',
            brno: '捷克第二大城市，摩拉維亞地區的文化和經濟中心，擁有眾多哥德式和巴洛克式建築。',
            prague: '捷克首都，被譽為「百塔之城」，完整保存了中世紀風貌，查理大橋和城堡是必訪景點。',
            'cesky-krumlov': '捷克童話小鎮，被聯合國教科文組織列為世界文化遺產，城堡和蜿蜒的河流構成美麗畫卷。'
        };
        
        return descriptions[cityId] || '美麗的歐洲城市，擁有豐富的歷史和文化。';
    }
    
    // 獲取城市景點
    getCityAttractions(cityId) {
        const attractions = {
            budapest: ['布達城堡', '漁人堡', '國會大廈', '塞切尼溫泉浴場', '鏈橋'],
            bratislava: ['布拉提斯拉瓦城堡', '舊城區', '聖馬丁大教堂', '總統府'],
            vienna: ['美泉宮', '霍夫堡宮', '聖史蒂芬大教堂', '維也納國家歌劇院'],
            brno: ['斯皮爾貝克城堡', '聖彼得與聖保羅大教堂', '自由廣場'],
            prague: ['布拉格城堡', '查理大橋', '天文鐘', '舊城廣場'],
            'cesky-krumlov': ['庫倫洛夫城堡', '舊城區', '彩繪塔', '伏爾塔瓦河']
        };
        
        return attractions[cityId] || ['歷史建築', '文化景點', '當地美食'];
    }
    
    // 獲取城市提示
    getCityTips(cityId) {
        const tips = {
            budapest: ['建議購買布達佩斯卡享受交通和景點折扣', '多瑙河遊船是欣賞城市夜景的最佳方式', '嘗試當地的溫泉浴場體驗'],
            bratislava: ['舊城區適合步行遊覽', '城堡山頂可俯瞰全城', '嘗試當地的啤酒和傳統美食'],
            vienna: ['提前預約音樂會門票', '咖啡館文化是維也納特色', '美泉宮花園免費開放'],
            prague: ['查理大橋清晨人最少', '購買布拉格卡可節省費用', '城堡區需要半天時間遊覽']
        };
        
        return tips[cityId] || ['穿著舒適的步行鞋', '攜帶現金和小額歐元', '注意扒手和旅遊陷阱'];
    }
    
    // 添加地圖控制按鈕
    addMapControls(container) {
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'map-controls-top';
        
        const controls = [
            { id: 'zoomIn', icon: 'fas fa-search-plus', text: '放大', action: () => this.zoomMap(1.2) },
            { id: 'zoomOut', icon: 'fas fa-search-minus', text: '縮小', action: () => this.zoomMap(0.8) },
            { id: 'resetView', icon: 'fas fa-sync-alt', text: '重置', action: () => this.resetMap() },
            { id: 'showRoute', icon: 'fas fa-route', text: '路線', action: () => this.toggleRoute() }
        ];
        
        controls.forEach(control => {
            const button = document.createElement('button');
            button.id = control.id;
            button.className = 'map-control-btn';
            button.innerHTML = `<i class="${control.icon}"></i> ${control.text}`;
            button.addEventListener('click', control.action);
            controlsDiv.appendChild(button);
        });
        
        container.appendChild(controlsDiv);
    }
    
    // 添加景點列表
    addAttractionsList(container) {
        const listDiv = document.createElement('div');
        listDiv.className = 'attractions-list';
        listDiv.id = 'attractionsList';
        
        const cities = [
            { id: 'budapest', name: '布達佩斯', icon: 'fas fa-landmark' },
            { id: 'vienna', name: '維也納', icon: 'fas fa-music' },
            { id: 'prague', name: '布拉格', icon: 'fas fa-archway' }
        ];
        
        cities.forEach(city => {
            const item = document.createElement('div');
            item.className = 'attraction-item';
            item.setAttribute('data-city', city.id);
            
            item.innerHTML = `
                <div class="attraction-icon">
                    <i class="${city.icon}"></i>
                </div>
                <div class="attraction-info">
                    <h4>${city.name}</h4>
                    <p>點擊查看詳細攻略</p>
                </div>
                <div class="attraction-action">
                    <button class="view-details-btn">查看詳情</button>
                </div>
            `;
            
            item.addEventListener('click', () => {
                this.showCityInfo({ id: city.id, name: city.name, country: '', days: '' });
            });
            
            listDiv.appendChild(item);
        });
        
        container.appendChild(listDiv);
    }
    
    // 地圖縮放
    zoomMap(factor) {
        const svg = document.getElementById('offlineMapSvg');
        if (!svg) return;
        
        const viewBox = svg.getAttribute('viewBox').split(' ').map(Number);
        const newWidth = viewBox[2] / factor;
        const newHeight = viewBox[3] / factor;
        const newX = viewBox[0] + (viewBox[2] - newWidth) / 2;
        const newY = viewBox[1] + (viewBox[3] - newHeight) / 2;
        
        svg.setAttribute('viewBox', `${newX} ${newY} ${newWidth} ${newHeight}`);
    }
    
    // 重置地圖
    resetMap() {
        const svg = document.getElementById('offlineMapSvg');
        if (svg) {
            svg.setAttribute('viewBox', '0 0 1000 800');
        }
    }
    
    // 切換路線顯示
    toggleRoute() {
        const routePath = document.querySelector('#offlineMapSvg path[stroke-dasharray="10,5"]');
        if (routePath) {
            const currentOpacity = parseFloat(routePath.getAttribute('opacity') || '0.7');
            routePath.setAttribute('opacity', currentOpacity === 0.7 ? '0' : '0.7');
        }
    }
    
    // 確保地圖顯示
    ensureMapDisplay() {
        setTimeout(() => {
            const mapContainer = document.getElementById('mapContainer');
            if (mapContainer) {
                const mapWrapper = document.getElementById('offlineMapWrapper');
                if (!mapWrapper) {
                    console.log('🔄 重新初始化地圖...');
                    this.fixMapContainer();
                }
            }
        }, 1000);
    }
    
    // 設置備用地圖
    setupFallbackMap() {
        // 如果3秒後地圖仍未顯示，使用備用方案
        setTimeout(() => {
            const mapContainer = document.getElementById('mapContainer');
            if (mapContainer && !mapContainer.querySelector('.offline-map-wrapper')) {
                console.log('🚨 使用備用地圖方案...');
                this.createSimpleMap();
            }
        }, 3000);
    }
    
    // 創建簡單地圖
    createSimpleMap() {
        const mapContainer = document.getElementById('mapContainer');
        if (!mapContainer) return;
        
        mapContainer.innerHTML = `
            <div class="simple-map">
                <div class="simple-map-header">
                    <h3><i class="fas fa-map"></i> 歐洲行程地圖</h3>
                    <p>匈牙利 → 斯洛伐克 → 奧地利 → 捷克</p>
                </div>
                <div class="simple-map-content">
                    <div class="route-visualization">
                        <div class="route-line">
                            <div class="route-point" style="left: 10%;">
                                <div class="point-label">布達佩斯</div>
                                <div class="point-days">第2-3天</div>
                            </div>
                            <div class="route-point" style="left: 30%;">
                                <div class="point-label">布拉提斯拉瓦</div>
                                <div class="point-days">第4天</div>
                            </div>
                            <div class="route-point" style="left: 50%;">
                                <div class="point-label">維也納</div>
                                <div class="point-days">第5-6天</div>
                            </div>
                            <div class="route-point" style="left: 70%;">
                                <div class="point-label">布拉格</div>
                                <div class="point-days">第8-9天</div>
                            </div>
                            <div class="route-point" style="left: 90%;">
                                <div class="point-label">庫倫洛夫</div>
                                <div class="point-days">第10天</div>
                            </div>
                        </div>
                    </div>
                    <div class="simple-map-info">
                        <h4><i class="fas fa-info-circle"></i> 行程資訊</h4>
                        <p>10天歐洲四國之旅，涵蓋匈牙利、斯洛伐克、奧地利、捷克的主要城市。</p>
                        <button class="show-details-btn" onclick="alert('詳細行程資訊')">
                            <i class="fas fa-book-open"></i> 查看詳細行程
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

// 立即初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚨 啟動緊急地圖修復系統...');
    window.emergencyMapFix = new EmergencyMapFix();
    window.emergencyMapFix.init();
    
    console.log('✅ 緊急地圖修復系統已就緒');
});

// 提供調試功能
window.debugMapFix = function() {
    if (window.emergencyMapFix) {
        console.log('🔍 緊急地圖修復系統狀態：正常');
        return window.emergencyMapFix;
    } else {
        console.error('❌ 緊急地圖修復系統未初始化');
        return null;
    }
};