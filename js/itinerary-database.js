// 歐洲四國10天完整行程數據庫
const itineraryDatabase = {
    // 第1天：出發日（通常不計入行程）
    day1: {
        day: 1,
        title: "出發日",
        date: "2026-04-01",
        location: "台灣 → 上海（轉機）→ 布達佩斯",
        type: "departure",
        summary: "從台灣出發，經上海轉機飛往匈牙利布達佩斯",
        
        activities: [
            {
                time: "15:30",
                title: "機場集合",
                description: "桃園國際機場第二航廈集合",
                icon: "fas fa-users",
                important: true
            },
            {
                time: "17:30",
                title: "辦理登機",
                description: "辦理登機手續及行李托運",
                icon: "fas fa-suitcase-rolling",
                important: true
            },
            {
                time: "20:10",
                title: "起飛（台灣→上海）",
                description: "搭乘班機飛往上海浦東機場",
                icon: "fas fa-plane-departure",
                important: true
            },
            {
                time: "22:10",
                title: "抵達上海",
                description: "抵達上海浦東國際機場",
                icon: "fas fa-plane-arrival",
                important: true
            },
            {
                time: "23:00",
                title: "轉機準備",
                description: "辦理轉機手續，等待下一班航班",
                icon: "fas fa-exchange-alt",
                important: true
            },
            {
                time: "01:30",
                title: "起飛（上海→布達佩斯）",
                description: "搭乘國際航班飛往匈牙利布達佩斯",
                icon: "fas fa-plane-departure",
                important: true
            }
        ],
        
        highlights: [
            "機場集合，認識團員",
            "辦理登機手續",
            "上海浦東機場轉機",
            "長途飛行準備"
        ],
        
        notes: [
            "建議穿著舒適衣物",
            "準備過夜包在隨身行李",
            "上海轉機注意時間",
            "調整時差準備",
            "轉機時可洗浴休息"
        ]
    },
    
    // 第2天：布達佩斯抵達
    day2: {
        day: 2,
        title: "布達佩斯抵達",
        date: "2026-04-02",
        location: "布達佩斯，匈牙利",
        type: "arrival",
        summary: "抵達匈牙利首都，開始歐洲之旅",
        
        activities: [
            {
                time: "07:30",
                title: "抵達布達佩斯",
                description: "抵達李斯特·費倫茨國際機場",
                icon: "fas fa-plane-arrival",
                important: true
            },
            {
                time: "08:30",
                title: "機場到市區",
                description: "搭乘機場巴士前往市區",
                icon: "fas fa-bus",
                important: true
            },
            {
                time: "09:30",
                title: "飯店入住",
                description: "辦理入住手續，行李安置",
                icon: "fas fa-hotel",
                important: true
            },
            {
                time: "11:00",
                title: "市區觀光",
                description: "自由活動，適應環境",
                icon: "fas fa-walking",
                important: false
            },
            {
                time: "13:00",
                title: "午餐",
                description: "品嘗匈牙利傳統美食",
                icon: "fas fa-utensils",
                important: false
            },
            {
                time: "15:00",
                title: "鏈橋與多瑙河",
                description: "參觀鏈橋，欣賞多瑙河風光",
                icon: "fas fa-bridge",
                important: true
            },
            {
                time: "19:00",
                title: "晚餐",
                description: "飯店晚餐",
                icon: "fas fa-utensils",
                important: false
            }
        ],
        
        highlights: [
            "抵達歐洲第一站",
            "多瑙河風光",
            "匈牙利美食體驗"
        ],
        
        notes: [
            "時差調整，注意休息",
            "兌換少量匈牙利福林",
            "晚上可欣賞鏈橋夜景"
        ]
    },
    
    // 第3天：布達佩斯 → 布拉提斯拉瓦 → 維也納
    day3: {
        day: 3,
        title: "布達佩斯 → 布拉提斯拉瓦 → 維也納",
        date: "2026-04-03",
        location: "匈牙利 → 斯洛伐克 → 奧地利",
        type: "travel",
        summary: "一日遊三國，體驗中歐風情",
        
        activities: [
            {
                time: "08:00",
                title: "早餐",
                description: "飯店享用早餐",
                icon: "fas fa-coffee",
                important: true
            },
            {
                time: "09:00",
                title: "前往布拉提斯拉瓦",
                description: "大巴前往斯洛伐克首都",
                icon: "fas fa-bus",
                important: true
            },
            {
                time: "10:30",
                title: "布拉提斯拉瓦城堡",
                description: "參觀城堡，俯瞰多瑙河",
                icon: "fas fa-castle",
                important: true
            },
            {
                time: "12:00",
                title: "老城區午餐",
                description: "品嘗斯洛伐克特色料理",
                icon: "fas fa-utensils",
                important: false
            },
            {
                time: "14:00",
                title: "前往維也納",
                description: "大巴前往奧地利首都",
                icon: "fas fa-bus",
                important: true
            },
            {
                time: "15:30",
                title: "維也納市區觀光",
                description: "參觀環城大道建築",
                icon: "fas fa-archway",
                important: true
            },
            {
                time: "18:00",
                title: "晚餐",
                description: "維也納傳統餐廳",
                icon: "fas fa-utensils",
                important: false
            }
        ],
        
        highlights: [
            "一日遊三國體驗",
            "布拉提斯拉瓦城堡",
            "維也納環城大道"
        ],
        
        notes: [
            "跨境注意攜帶護照",
            "斯洛伐克使用歐元",
            "維也納治安良好"
        ]
    },
    
    // 第4天：維也納 → 布爾諾
    day4: {
        day: 4,
        title: "維也納 → 布爾諾",
        date: "2026-04-04",
        location: "奧地利 → 捷克",
        type: "travel",
        summary: "從音樂之都前往捷克第二大城市",
        
        activities: [
            {
                time: "08:00",
                title: "早餐",
                description: "飯店享用早餐",
                icon: "fas fa-coffee",
                important: true
            },
            {
                time: "09:00",
                title: "維也納市區自由活動",
                description: "自由參觀博物館或購物",
                icon: "fas fa-shopping-bag",
                important: false
            },
            {
                time: "12:00",
                title: "午餐",
                description: "維也納特色餐廳",
                icon: "fas fa-utensils",
                important: false
            },
            {
                time: "14:00",
                title: "前往布爾諾",
                description: "大巴前往捷克布爾諾",
                icon: "fas fa-bus",
                important: true
            },
            {
                time: "16:00",
                title: "布爾諾市區觀光",
                description: "參觀史皮爾伯城堡",
                icon: "fas fa-fortress",
                important: true
            },
            {
                time: "18:00",
                title: "晚餐",
                description: "布爾諾當地餐廳",
                icon: "fas fa-utensils",
                important: false
            }
        ],
        
        highlights: [
            "維也納自由活動",
            "布爾諾城堡參觀",
            "捷克啤酒品嘗"
        ],
        
        notes: [
            "捷克使用捷克克朗",
            "注意兌換匯率",
            "晚上可體驗當地夜生活"
        ]
    },
    
    // 第5天：布爾諾 → 布拉格
    day5: {
        day: 5,
        title: "布爾諾 → 布拉格",
        date: "2026-04-05",
        location: "捷克",
        type: "travel",
        summary: "前往捷克首都，千塔之城",
        
        activities: [
            {
                time: "08:00",
                title: "早餐",
                description: "飯店享用早餐",
                icon: "fas fa-coffee",
                important: true
            },
            {
                time: "09:00",
                title: "前往布拉格",
                description: "大巴前往捷克首都",
                icon: "fas fa-bus",
                important: true
            },
            {
                time: "11:00",
                title: "布拉格城堡",
                description: "參觀世界上最大的古城堡",
                icon: "fas fa-castle",
                important: true
            },
            {
                time: "13:00",
                title: "午餐",
                description: "布拉格傳統餐廳",
                icon: "fas fa-utensils",
                important: false
            },
            {
                time: "15:00",
                title: "查理大橋",
                description: "漫步查理大橋，欣賞雕像",
                icon: "fas fa-bridge",
                important: true
            },
            {
                time: "18:00",
                title: "晚餐",
                description: "伏爾塔瓦河畔餐廳",
                icon: "fas fa-utensils",
                important: false
            }
        ],
        
        highlights: [
            "布拉格城堡全景",
            "查理大橋漫步",
            "天文鐘表演"
        ],
        
        notes: [
            "布拉格遊客眾多，注意扒手",
            "查理大橋上注意隨身物品",
            "可品嘗捷克甜點Trdelník"
        ]
    },
    
    // 第6天：布拉格 → 庫倫洛夫
    day6: {
        day: 6,
        title: "布拉格 → 庫倫洛夫",
        date: "2026-04-06",
        location: "捷克",
        type: "travel",
        summary: "前往童話小鎮庫倫洛夫",
        
        activities: [
            {
                time: "08:00",
                title: "早餐",
                description: "飯店享用早餐",
                icon: "fas fa-coffee",
                important: true
            },
            {
                time: "09:00",
                title: "前往庫倫洛夫",
                description: "大巴前往童話小鎮",
                icon: "fas fa-bus",
                important: true
            },
            {
                time: "12:00",
                title: "抵達庫倫洛夫",
                description: "大巴停城外，步行進入小鎮",
                icon: "fas fa-walking",
                important: true
            },
            {
                time: "13:00",
                title: "午餐",
                description: "庫倫洛夫當地餐廳",
                icon: "fas fa-utensils",
                important: false
            },
            {
                time: "15:00",
                title: "庫倫洛夫城堡",
                description: "參觀捷克第二大城堡",
                icon: "fas fa-fortress",
                important: true
            },
            {
                time: "18:00",
                title: "晚餐",
                description: "伏爾塔瓦河畔餐廳",
                icon: "fas fa-utensils",
                important: false
            }
        ],
        
        highlights: [
            "童話小鎮風光",
            "庫倫洛夫城堡",
            "伏爾塔瓦河彎道"
        ],
        
        notes: [
            "大巴無法進入城區，準備過夜包",
            "石板路多，穿舒適鞋子",
            "小鎮商店關門較早"
        ]
    },
    
    // 第7天：庫倫洛夫 → 國王湖 → 薩爾斯堡
    day7: {
        day: 7,
        title: "庫倫洛夫 → 國王湖 → 薩爾斯堡",
        date: "2026-04-07",
        location: "捷克 → 德國 → 奧地利",
        type: "travel",
        summary: "體驗德國最美湖泊，前往音樂之都薩爾斯堡",
        
        activities: [
            {
                time: "08:00",
                title: "早餐",
                description: "飯店享用早餐",
                icon: "fas fa-coffee",
                important: true
            },
            {
                time: "09:00",
                title: "前往國王湖",
                description: "大巴前往德國巴伐利亞",
                icon: "fas fa-bus",
                important: true
            },
            {
                time: "11:00",
                title: "國王湖遊船",
                description: "乘坐電動船遊覽德國最美湖泊",
                icon: "fas fa-ship",
                important: true
            },
            {
                time: "13:00",
                title: "湖畔午餐",
                description: "品嘗德國巴伐利亞料理",
                icon: "fas fa-utensils",
                important: false
            },
            {
                time: "15:00",
                title: "前往薩爾斯堡",
                description: "大巴前往奧地利薩爾斯堡",
                icon: "fas fa-bus",
                important: true
            },
            {
                time: "17:00",
                title: "薩爾斯堡市區觀光",
                description: "參觀莫札特故居",
                icon: "fas fa-home",
                important: true
            },
            {
                time: "19:00",
                title: "晚餐",
                description: "薩爾斯堡傳統餐廳",
                icon: "fas fa-utensils",
                important: false
            }
        ],
        
        highlights: [
            "國王湖清澈湖水",
            "回音壁表演",
            "莫札特故居參觀"
        ],
        
        notes: [
            "國王湖氣溫較低，注意保暖",
            "遊船時間較長，準備零食",
            "薩爾斯堡是《真善美》拍攝地"
        ]
    },
    
    // 第8天：薩爾斯堡 → 哈修塔特 → 布達佩斯
    day8: {
        day: 8,
        title: "薩爾斯堡 → 哈修塔特 → 布達佩斯",
        date: "2026-04-08",
        location: "奧地利 → 匈牙利",
        type: "travel",
        summary: "參觀世界最美小鎮，返回布達佩斯",
        
        activities: [
            {
                time: "08:00",
                title: "早餐",
                description: "飯店享用早餐",
                icon: "fas fa-coffee",
                important: true
            },
            {
                time: "09:00",
                title: "前往哈修塔特",
                description: "大巴前往奧地利湖畔小鎮",
                icon: "fas fa-bus",
                important: true
            },
            {
                time: "10:30",
                title: "哈修塔特小鎮",
                description: "漫步小鎮，欣賞湖光山色",
                icon: "fas fa-walking",
                important: true
            },
            {
                time: "12:30",
                title: "湖畔午餐",
                description: "品嘗奧地利湖魚料理",
                icon: "fas fa-utensils",
                important: false
            },
            {
                time: "14:00",
                title: "前往布達佩斯",
                description: "長途大巴返回匈牙利首都",
                icon: "fas fa-bus",
                important: true
            },
            {
                time: "18:00",
                title: "抵達布達佩斯",
                description: "辦理飯店入住",
                icon: "fas fa-hotel",
                important: true
            },
            {
                time: "19:30",
                title: "告別晚餐",
                description: "匈牙利特色餐廳",
                icon: "fas fa-utensils",
                important: true
            }
        ],
        
        highlights: [
            "哈修塔特明信片角度",
            "湖畔小鎮風光",
            "告別晚餐"
        ],
        
        notes: [
            "長途車程，準備零食和水",
            "整理行李，準備次日返程",
            "確認航班時間"
        ]
    },
    
    // 第9天：布達佩斯 → 台灣
    day9: {
        day: 9,
        title: "布達佩斯 → 台灣",
        date: "2026-04-09",
        location: "匈牙利 → 台灣",
        type: "return",
        summary: "結束歐洲之旅，返回台灣",
        
        activities: [
            {
                time: "06:00",
                title: "早餐",
                description: "飯店享用早餐",
                icon: "fas fa-coffee",
                important: true
            },
            {
                time: "07:00",
                title: "前往機場",
                description: "大巴前往李斯特·費倫茨國際機場",
                icon: "fas fa-bus",
                important: true
            },
            {
                time: "08:00",
                title: "辦理登機",
                description: "辦理登機手續及退稅",
                icon: "fas fa-suitcase-rolling",
                important: true
            },
            {
                time: "10:00",
                title: "起飛",
                description: "飛往台灣",
                icon: "fas fa-plane-departure",
                important: true
            }
        ],
        
        highlights: [
            "整理旅程回憶",
            "辦理退稅手續",
            "準備返程"
        ],
        
        notes: [
            "確認所有行李",
            "辦理退稅注意時間",
            "調整時差準備"
        ]
    },
    
    // 第10天：抵達台灣
    day10: {
        day: 10,
        title: "抵達台灣",
        date: "2026-04-10",
        location: "台灣",
        type: "arrival",
        summary: "平安抵達台灣，旅程結束",
        
        activities: [
            {
                time: "06:00",
                title: "抵達台灣",
                description: "抵達桃園國際機場",
                icon: "fas fa-plane-arrival",
                important: true
            },
            {
                time: "07:00",
                title: "行李提取",
                description: "提取行李，海關檢查",
                icon: "fas fa-suitcase",
                important: true
            },
            {
                time: "08:00",
                title: "解散",
                description: "旅程結束，各自返回",
                icon: "fas fa-home",
                important: true
            }
        ],
        
        highlights: [
            "平安返抵台灣",
            "整理旅程照片",
            "分享旅行心得"
        ],
        
        notes: [
            "檢查隨身物品",
            "整理行李",
            "休息調整時差"
        ]
    }
};

// 獲取指定天的行程
function getItineraryByDay(day) {
    const key = `day${day}`;
    return itineraryDatabase[key] || itineraryDatabase.day1;
}

// 獲取當前天的行程（基於日期計算）
function getCurrentDayItinerary() {
    // 計算當前是第幾天（基於假設的開始日期）
    const startDate = new Date('2026-04-01');
    const now = new Date();
    
    const timeDiff = now.getTime() - startDate.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
    
    // 限制在1-10天範圍內
    const currentDay = Math.max(1, Math.min(10, dayDiff));
    
    return getItineraryByDay(currentDay);
}

// 獲取所有天的行程
function getAllItineraries() {
    const itineraries = [];
    for (let day = 1; day <= 10; day++) {
        itineraries.push(getItineraryByDay(day));
    }
    return itineraries;
}

// 更新頁面顯示
function updateItineraryDisplay(day) {
    const itinerary = getItineraryByDay(day);
    
    // 更新標題
    const titleElement = document.querySelector('.day-title');
    if (titleElement) {
        titleElement.textContent = itinerary.title;
    }
    
    // 更新日期
    const dateElement = document.querySelector('.current-date');
    if (dateElement) {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
        dateElement.textContent = formattedDate;
    }
    
    // 更新行程活動
    const activitiesContainer = document.querySelector('.today-activities');
    if (activitiesContainer) {
        let html = '';
        itinerary.activities.forEach(activity => {
            html += `
                <div class="activity-item ${activity.important ? 'important' : ''}">
                    <div class="activity-time">${activity.time}</div>
                    <div class="activity-icon">
                        <i class="${activity.icon}"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">${activity.title}</div>
                        <div class="activity-description">${activity.description}</div>
                    </div>
                </div>
            `;
        });
        activitiesContainer.innerHTML = html;
    }
    
    // 更新亮點
    const highlightsContainer = document.querySelector('.day-highlights');
    if (highlightsContainer) {
        let html = '';
        itinerary.highlights.forEach(highlight => {
            html += `<div class="highlight-item">${highlight}</div>`;
        });
        highlightsContainer.innerHTML = html;
    }
    
    // 更新注意事項
    const notesContainer = document.querySelector('.day-notes');
    if (notesContainer) {
        let html = '';
        itinerary.notes.forEach(note => {
            html += `<div class="note-item">${note}</div>`;
        });
        notesContainer.innerHTML = html;
    }
}

// 初始化行程系統
function initItinerarySystem() {
    console.log('📅 初始化行程系統...');
    
    // 獲取當前天數
    const currentDay = getCurrentDayItinerary().day;
    console.log(`✅ 當前是行程第 ${currentDay} 天`);
    
    // 更新顯示
    updateItineraryDisplay(currentDay);
    
    // 設定自動更新（每小時檢查一次）
    setInterval(() => {
        const newDay = getCurrentDayItinerary().day;
        const currentDisplay = document.querySelector('.day-title')?.textContent;
        
        if (currentDisplay && !currentDisplay.includes(`第 ${newDay} 天`)) {
            console.log('🔄 檢測到日期變化，更新行程...');
            updateItineraryDisplay(newDay);
        }
    }, 60 * 60 * 1000); // 每小時檢查一次
}

// 匯出函數
window.getItineraryByDay = getItineraryByDay;
window.getCurrentDayItinerary = getCurrentDayItinerary;
window.updateItineraryDisplay = updateItineraryDisplay;
window.initItinerarySystem = initItinerarySystem;

// 自動初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initItinerarySystem);
} else {
    initItinerarySystem();
}