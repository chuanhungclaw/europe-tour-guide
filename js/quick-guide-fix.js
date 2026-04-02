// 景點攻略系統快速修復
(function() {
    console.log('🔧 景點攻略系統快速修復...');
    
    // 等待DOM載入
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuickFix);
    } else {
        initQuickFix();
    }
    
    function initQuickFix() {
        console.log('✅ 初始化快速修復...');
        
        try {
            // 創建簡單的景點數據（如果原數據未載入）
            if (typeof attractionGuideData === 'undefined') {
                console.warn('⚠️ attractionGuideData 未載入，創建簡單數據');
                createSimpleAttractionData();
            }
            
            // 創建界面
            createSimpleGuideUI();
            
            console.log('✅ 快速修復完成');
            
        } catch (error) {
            console.error('❌ 快速修復失敗:', error);
            createEmergencyGuide();
        }
    }
    
    function createSimpleAttractionData() {
        window.attractionGuideData = {
            "budapest-arrival": {
                id: "budapest-arrival",
                day: 2,
                type: "arrival",
                title: "布達佩斯抵達",
                subtitle: "匈牙利首都，多瑙河畔的明珠",
                icon: "fas fa-plane-arrival",
                color: "#228b22",
                location: "布達佩斯，匈牙利",
                time: "下午抵達",
                duration: "2小時",
                description: "抵達匈牙利首都布達佩斯，開始歐洲四國之旅。布達佩斯被多瑙河分為布達和佩斯兩部分，有『多瑙河明珠』的美譽。",
                highlights: [
                    { icon: "fas fa-landmark", title: "多瑙河風光", description: "多瑙河貫穿城市，兩岸建築美不勝收" },
                    { icon: "fas fa-bridge", title: "鏈橋夜景", description: "夜晚的鏈橋燈光璀璨，是攝影絕佳地點" },
                    { icon: "fas fa-utensils", title: "匈牙利美食", description: "品嘗道地的匈牙利牛肉湯和煙囪捲" }
                ],
                guideTips: [
                    "抵達機場後，建議兌換少量匈牙利福林現金",
                    "機場到市區可搭乘機場巴士或計程車",
                    "晚上可漫步多瑙河畔，欣賞鏈橋夜景",
                    "晚餐推薦品嘗匈牙利傳統美食"
                ],
                precautions: [
                    "注意隨身財物安全，特別是在人多的地方",
                    "匈牙利使用福林，部分商店接受歐元但匯率不佳",
                    "氣溫約5-12°C，注意保暖",
                    "時差：比台灣晚7小時"
                ],
                hotel: {
                    name: "布達佩斯市中心飯店",
                    checkIn: "15:00",
                    checkOut: "11:00",
                    amenities: ["免費WiFi", "早餐", "健身房", "行李寄存"],
                    tips: ["辦理入住時可詢問附近餐廳推薦", "飯店通常提供旅遊地圖", "記得確認次日早餐時間"]
                },
                weather: {
                    temperature: "5-12°C",
                    condition: "多雲轉晴",
                    icon: "fas fa-cloud-sun",
                    tips: ["建議穿著：保暖外套、圍巾、帽子", "白天氣溫較高，可多層次穿搭", "晚上較冷，注意保暖"]
                },
                transportation: [
                    "機場到市區：機場巴士約30分鐘，計程車約20分鐘",
                    "市內交通：地鐵、公車、電車",
                    "建議購買24小時交通票"
                ],
                photos: ["布達佩斯鏈橋夜景", "多瑙河遊船風光", "國會大廈外觀"],
                completed: false
            }
        };
        
        console.log('✅ 創建簡單景點數據完成');
    }
    
    function createSimpleGuideUI() {
        // 檢查是否已存在界面
        if (document.getElementById('simple-guide-btn')) {
            return;
        }
        
        // 創建按鈕
        const button = document.createElement('button');
        button.id = 'simple-guide-btn';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #1a237e;
            color: white;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(26, 35, 126, 0.3);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        `;
        
        button.innerHTML = '<i class="fas fa-map-marked-alt"></i>';
        
        button.addEventListener('click', showSimpleGuide);
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        document.body.appendChild(button);
        console.log('✅ 創建簡單指南按鈕完成');
    }
    
    function showSimpleGuide() {
        // 創建指南面板
        const panel = document.createElement('div');
        panel.id = 'simple-guide-panel';
        panel.style.cssText = `
            position: fixed;
            top: 0;
            right: 0;
            width: 400px;
            height: 100vh;
            background: white;
            box-shadow: -2px 0 20px rgba(0,0,0,0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            display: flex;
            flex-direction: column;
        `;
        
        // 標題欄
        const header = document.createElement('div');
        header.style.cssText = `
            background: #1a237e;
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        
        header.innerHTML = `
            <div>
                <h3 style="margin: 0; font-size: 18px;">
                    <i class="fas fa-map-marked-alt"></i>
                    景點攻略（快速版）
                </h3>
                <div style="font-size: 12px; opacity: 0.8; margin-top: 5px;">
                    點擊景點查看詳細攻略
                </div>
            </div>
            <button id="close-simple-guide" style="
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                &times;
            </button>
        `;
        
        // 內容區域
        const content = document.createElement('div');
        content.style.cssText = `
            flex: 1;
            overflow-y: auto;
            padding: 20px;
        `;
        
        // 載入景點列表
        content.innerHTML = createSimpleAttractionList();
        
        // 組裝面板
        panel.appendChild(header);
        panel.appendChild(content);
        
        document.body.appendChild(panel);
        
        // 顯示面板
        setTimeout(() => {
            panel.style.transform = 'translateX(0)';
        }, 10);
        
        // 關閉按鈕事件
        document.getElementById('close-simple-guide').addEventListener('click', function() {
            panel.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (panel.parentNode) {
                    panel.parentNode.removeChild(panel);
                }
            }, 300);
        });
        
        // 景點點擊事件
        document.querySelectorAll('.simple-attraction-item').forEach(item => {
            item.addEventListener('click', function() {
                const attractionId = this.dataset.id;
                showSimpleAttractionDetail(attractionId, content);
            });
        });
    }
    
    function createSimpleAttractionList() {
        let html = '<h4 style="color: #1a237e; margin-bottom: 15px;">歐洲四國行程景點</h4>';
        
        for (const id in attractionGuideData) {
            const attraction = attractionGuideData[id];
            
            html += `
                <div class="simple-attraction-item" data-id="${id}" style="
                    background: white;
                    border: 1px solid #e9ecef;
                    border-radius: 8px;
                    padding: 15px;
                    margin-bottom: 10px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                ">
                    <div style="
                        background: ${attraction.color};
                        color: white;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 18px;
                    ">
                        <i class="${attraction.icon}"></i>
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                            <strong style="color: #1a237e;">${attraction.title}</strong>
                            <span style="background: #6c757d; color: white; padding: 2px 8px; border-radius: 10px; font-size: 12px;">第 ${attraction.day} 天</span>
                        </div>
                        <div style="color: #6c757d; font-size: 13px;">
                            <div><i class="fas fa-map-marker-alt"></i> ${attraction.location}</div>
                            <div><i class="fas fa-clock"></i> ${attraction.time}</div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        return html;
    }
    
    function showSimpleAttractionDetail(attractionId, container) {
        const attraction = attractionGuideData[attractionId];
        if (!attraction) return;
        
        container.innerHTML = `
            <div>
                <button id="back-to-list" style="
                    background: none;
                    border: none;
                    color: #1a237e;
                    font-size: 16px;
                    cursor: pointer;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                ">
                    <i class="fas fa-arrow-left"></i> 返回列表
                </button>
                
                <!-- 景點標題 -->
                <div style="
                    background: ${attraction.color};
                    color: white;
                    padding: 20px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                ">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <div style="
                            background: rgba(255,255,255,0.2);
                            width: 50px;
                            height: 50px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 24px;
                        ">
                            <i class="${attraction.icon}"></i>
                        </div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0; font-size: 20px;">${attraction.title}</h3>
                            <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 14px;">${attraction.subtitle}</p>
                        </div>
                    </div>
                </div>
                
                <!-- 詳細介紹 -->
                <div style="margin-bottom: 20px;">
                    <h4 style="color: #1a237e; margin-bottom: 10px;">
                        <i class="fas fa-info-circle"></i> 詳細介紹
                    </h4>
                    <p style="color: #333; line-height: 1.6;">${attraction.description}</p>
                </div>
                
                <!-- 特色亮點 -->
                <div style="margin-bottom: 20px;">
                    <h4 style="color: #1a237e; margin-bottom: 10px;">
                        <i class="fas fa-star"></i> 特色亮點
                    </h4>
                    <div style="display: grid; gap: 10px;">
                        ${attraction.highlights.map(highlight => `
                            <div style="
                                background: #f8f9fa;
                                padding: 15px;
                                border-radius: 8px;
                                border-left: 4px solid #1a237e;
                            ">
                                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                                    <i class="${highlight.icon}" style="color: #1a237e;"></i>
                                    <strong style="color: #1a237e;">${highlight.title}</strong>
                                </div>
                                <p style="color: #666; margin: 0; font-size: 14px;">${highlight.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- 攻略建議 -->
                <div style="margin-bottom: 20px;">
                    <h4 style="color: #1a237e; margin-bottom: 10px;">
                        <i class="fas fa-lightbulb"></i> 攻略建議
                    </h4>
                    <ul style="color: #333; padding-left: 20px; margin: 0;">
                        ${attraction.guideTips.map(tip => `
                            <li style="margin-bottom: 8px; line-height: 1.5;">${tip}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <!-- 注意事項 -->
                <div style="margin-bottom: 20px;">
                    <h4 style="color: #1a237e; margin-bottom: 10px;">
                        <i class="fas fa-exclamation-triangle"></i> 注意事項
                    </h4>
                    <ul style="color: #333; padding-left: 20px; margin: 0;">
                        ${attraction.precautions.map(precaution => `
                            <li style="margin-bottom: 8px; line-height: 1.5;">${precaution}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <!-- 飯店資訊 -->
                <div style="margin-bottom: 20px;">
                    <h4 style="color: #1a237e; margin-bottom: 10px;">
                        <i class="fas fa-hotel"></i> 飯店資訊
                    </h4>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <div style="margin-bottom: 10px;">
                            <strong style="color: #1a237e;">${attraction.hotel.name}</strong>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                            <div>
                                <small style="color: #6c757d;">入住時間</small>
                                <div style="color: #333;">${attraction.hotel.checkIn}</div>
                            </div>
                            <div>
                                <small style="color: #6c757d;">退房時間</small>
                                <div style="color: #333;">${attraction.hotel.checkOut}</div>
                            </div>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <small style="color: #6c757d;">設施服務</small>
                            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 5px;">
                                ${attraction.hotel.amenities.map(amenity => `
                                    <span style="
                                        background: #e3f2fd;
                                        color: #1a237e;
                                        padding: 4px 10px;
                                        border-radius: 12px;
                                        font-size: 12px;
                                    ">${amenity}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 天氣資訊 -->
                <div style="margin-bottom: 20px;">
                    <h4 style="color: #1a237e; margin-bottom: 10px;">
                        <i class="fas fa-cloud-sun"></i> 天氣資訊
                    </h4>
                    <div style="
                        background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
                        padding: 15px;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        gap: 15px;
                    ">
                        <div style="
                            background: white;
                            width: 60px;
                            height: 60px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 28px;
                            color: #1a237e;
                        ">
                            <i class="${attraction.weather.icon}"></i>
                        </div>
                        <div style="flex: 1;">
                            <div style="font-size: 24px; font-weight: bold; color: #1a237e;">
                                ${attraction.weather.temperature}
                            </div>
                            <div style="color: #666; font-size: 14px;">
                                ${attraction.weather.condition}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 返回按鈕事件
        document.getElementById('back-to-list').addEventListener('click', function() {
            container.innerHTML = createSimpleAttractionList();
            
            // 重新綁定點擊事件
            document.querySelectorAll('.simple-attraction-item').forEach(item => {
                item.addEventListener('click', function() {
                    const attractionId = this.dataset.id;
                    showSimpleAttractionDetail(attractionId, container);
                });
            });
        });
    }
    
    function createEmergencyGuide() {
        console.log('🚨 創建緊急指南...');
        
        // 在頁面上直接顯示簡單指南
        const emergencyDiv = document.createElement('div');
        emergencyDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            max-width: 500px;
            width: 90%;
            text-align: center;
        `;
        
        emergencyDiv.innerHTML = `
            <div style="font-size: 48px; color: #1a237e; margin-bottom: 20px;">
                🗺️
            </div>
            <h3 style="color: #1a237e; margin-bottom: 10px;">
                景點攻略系統
            </h3>
            <p style="color: #666; margin-bottom: 20px;">
                由於技術問題，完整攻略系統暫時無法載入。
            </p>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h4 style="color: #1a237e; margin-bottom: 10px;">布達佩斯抵達攻略</h4>
                <ul style="text-align: left; padding-left: 20px; color: #333;">
                    <li>抵達機場後兌換少量匈牙利福林現金</li>
                    <li>機場到市區可搭乘機場巴士或計程車</li>
                    <li>晚上可漫步多瑙河畔，欣賞鏈橋夜景</li>
                    <li>晚餐推薦品嘗匈牙利傳統美食</li>
                </ul>
            </div>
            <button id="close-emergency" style="
                background: #1a237e;
                color: white;
                border: none;
                padding: 10px 30px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
            ">
                關閉
            </button>
        `;
        
        document.body.appendChild(emergencyDiv);
        
        document.getElementById('close-emergency').addEventListener('click', function() {
            emergencyDiv.style.opacity = '0';
            emergencyDiv.style.transform = 'translate(-50%, -50%) scale(0.9)';
            setTimeout(() => {
                if (emergencyDiv.parentNode) {
                    emergencyDiv.parentNode.removeChild(emergencyDiv);
                }
            }, 300);
        });
    }
    
    console.log('🚀 景點攻略快速修復已載入');
})();