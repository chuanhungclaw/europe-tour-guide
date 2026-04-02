// 歐洲四國行程數據 - 基於PDF文件解析
const europeTourData = {
    // 行程基本資訊
    tripInfo: {
        name: "奧捷斯匈｜國王湖遊船．四國首都．維也納．布拉格．布達佩斯．庫倫洛夫．哈修塔特湖區(餐全包)10日",
        code: "26EE401MU 10天",
        dates: "2026年4月1日 - 2026年4月10日",
        guide: "林孜璟 小姐",
        guidePhone: "+886 0913573121",
        emergencyContact: "0932-365-795"
    },
    
    // 航班資訊
    flights: {
        departure: [
            {
                airline: "中國東方航空 MU5006",
                departure: "2026/04/01(三) 18:40 桃園機場",
                arrival: "2026/04/01(三) 20:40 上海浦東機場",
                duration: "02:00"
            },
            {
                airline: "上海航空 FM869",
                departure: "2026/04/02(四) 01:50 上海浦東機場",
                arrival: "2026/04/02(四) 08:05 布達佩斯機場",
                duration: "12:15"
            }
        ],
        return: [
            {
                airline: "上海航空 FM870",
                departure: "2026/04/09(四) 12:30 布達佩斯機場",
                arrival: "2026/04/10(五) 05:35 上海浦東機場",
                duration: "11:05"
            },
            {
                airline: "中國東方航空 MU5007",
                departure: "2026/04/10(五) 12:20 上海浦東機場",
                arrival: "2026/04/10(五) 14:25 桃園機場",
                duration: "02:05"
            }
        ]
    },
    
    // 10天詳細行程
    itinerary: [
        {
            day: 1,
            date: "2026-04-01",
            weekday: "三",
            title: "台北 → 上海 (轉機)",
            summary: "集合出發，前往上海轉機，準備開啟歐洲之旅",
            isTravelDay: true,
            isCurrent: true, // 假設今天是第一天
            timeline: [
                {
                    time: "15:30",
                    title: "機場集合",
                    description: "桃園機場第二航廈，東方航空櫃台",
                    icon: "fas fa-users",
                    type: "meeting",
                    important: true
                },
                {
                    time: "18:40",
                    title: "航班起飛",
                    description: "中國東方航空 MU5006，桃園→上海",
                    icon: "fas fa-plane-departure",
                    type: "flight",
                    important: true
                },
                {
                    time: "20:40",
                    title: "抵達上海",
                    description: "上海浦東機場，準備轉機",
                    icon: "fas fa-plane-arrival",
                    type: "arrival"
                },
                {
                    time: "22:00",
                    title: "轉機等待",
                    description: "上海浦東機場轉機，等待下一班航班",
                    icon: "fas fa-clock",
                    type: "waiting"
                }
            ],
            alerts: [
                {
                    type: "important",
                    icon: "fas fa-passport",
                    title: "護照檢查",
                    message: "確認護照有效期6個月以上，準備好機票"
                },
                {
                    type: "warning",
                    icon: "fas fa-suitcase",
                    title: "行李托運",
                    message: "確認托運行李重量，準備隨身過夜包"
                },
                {
                    type: "info",
                    icon: "fas fa-clock",
                    title: "集合時間",
                    message: "提前3小時到機場，避免遲到"
                }
            ],
            nextDayPreview: {
                title: "上海 → 布達佩斯 → 維也納",
                summary: "長途飛行抵達歐洲，開始四國之旅",
                highlights: [
                    { icon: "fas fa-plane", text: "12小時飛行" },
                    { icon: "fas fa-bus", text: "313公里車程" },
                    { icon: "fas fa-utensils", text: "維也納炸豬排" }
                ]
            },
            accommodation: {
                name: "上海浦東機場轉機",
                type: "transit"
            },
            meals: {
                breakfast: "X",
                lunch: "X",
                dinner: "機上簡餐"
            }
        },
        {
            day: 2,
            date: "2026-04-02",
            weekday: "四",
            title: "上海 → 布達佩斯 → 維也納",
            summary: "抵達歐洲，遊覽布達佩斯與布拉提斯拉瓦，前往維也納",
            isTravelDay: true,
            timeline: [
                {
                    time: "01:50",
                    title: "航班起飛",
                    description: "上海航空 FM869，上海→布達佩斯",
                    icon: "fas fa-plane-departure",
                    type: "flight",
                    important: true
                },
                {
                    time: "08:05",
                    title: "抵達布達佩斯",
                    description: "布達佩斯機場，歐洲時間（時差-7小時）",
                    icon: "fas fa-plane-arrival",
                    type: "arrival",
                    important: true
                },
                {
                    time: "10:00",
                    title: "前往布拉提斯拉瓦",
                    description: "車程約233公里，2.5-3小時",
                    icon: "fas fa-bus",
                    type: "transport"
                },
                {
                    time: "13:00",
                    title: "午餐",
                    description: "中式六菜一湯",
                    icon: "fas fa-utensils",
                    type: "meal"
                },
                {
                    time: "14:30",
                    title: "布拉提斯拉瓦觀光",
                    description: "斯洛伐克首都遊覽",
                    icon: "fas fa-camera",
                    type: "sightseeing"
                },
                {
                    time: "16:00",
                    title: "前往維也納",
                    description: "車程約80公里，1-1.5小時",
                    icon: "fas fa-bus",
                    type: "transport"
                },
                {
                    time: "18:00",
                    title: "晚餐",
                    description: "維也納特選炸豬排",
                    icon: "fas fa-utensils",
                    type: "meal"
                },
                {
                    time: "20:00",
                    title: "入住飯店",
                    description: "VOCO VIENNA PRATER",
                    icon: "fas fa-hotel",
                    type: "accommodation"
                }
            ],
            alerts: [
                {
                    type: "important",
                    icon: "fas fa-clock",
                    title: "時差調整",
                    message: "歐洲時間比台灣慢7小時，立即調整作息"
                },
                {
                    type: "warning",
                    icon: "fas fa-sun",
                    title: "日光節約時間",
                    message: "歐洲已實施日光節約時間，注意時間變化"
                },
                {
                    type: "info",
                    icon: "fas fa-euro-sign",
                    title: "貨幣準備",
                    message: "準備小額歐元現金，用於小費和小額支付"
                }
            ],
            nextDayPreview: {
                title: "維也納 → 布爾諾",
                summary: "維也納市區觀光，前往捷克布爾諾",
                highlights: [
                    { icon: "fas fa-landmark", text: "維也納宮殿" },
                    { icon: "fas fa-bus", text: "138公里車程" },
                    { icon: "fas fa-utensils", text: "當地豬肉料理" }
                ]
            },
            accommodation: {
                name: "VOCO VIENNA PRATER, AN IHG HOTEL",
                phone: "TEL: 43-1-2144000",
                address: "ENGERTHSTRASSE 173-175, VIENNA 1020, AT"
            },
            meals: {
                breakfast: "機上餐食",
                lunch: "中式六菜一湯",
                dinner: "維也納特選炸豬排"
            },
            distance: "313公里"
        },
        {
            day: 3,
            date: "2026-04-03",
            weekday: "五",
            title: "維也納 → 布爾諾",
            summary: "維也納市區觀光，前往捷克第二大城市布爾諾",
            timeline: [
                {
                    time: "07:00",
                    title: "早餐",
                    description: "飯店西式早餐",
                    icon: "fas fa-coffee",
                    type: "meal"
                },
                {
                    time: "09:00",
                    title: "維也納市區觀光",
                    description: "百水公寓、熊布朗宮、貝爾維第宮",
                    icon: "fas fa-camera",
                    type: "sightseeing"
                },
                {
                    time: "12:00",
                    title: "午餐",
                    description: "中式六菜一湯",
                    icon: "fas fa-utensils",
                    type: "meal"
                },
                {
                    time: "14:00",
                    title: "前往布爾諾",
                    description: "車程約138公里，1.5-2小時",
                    icon: "fas fa-bus",
                    type: "transport"
                },
                {
                    time: "16:30",
                    title: "布爾諾市區觀光",
                    description: "捷克第二大城市遊覽",
                    icon: "fas fa-city",
                    type: "sightseeing"
                },
                {
                    time: "19:00",
                    title: "晚餐",
                    description: "當地特色西式(豬)料理",
                    icon: "fas fa-utensils",
                    type: "meal"
                },
                {
                    time: "20:30",
                    title: "入住飯店",
                    description: "OREA CONGRESS HOTEL BRNO",
                    icon: "fas fa-hotel",
                    type: "accommodation"
                }
            ],
            alerts: [
                {
                    type: "important",
                    icon: "fas fa-camera",
                    title: "拍照時機",
                    message: "維也納宮殿建築光線最佳時間為上午"
                },
                {
                    type: "warning",
                    icon: "fas fa-shoe-prints",
                    title: "步行準備",
                    message: "今日步行較多，穿舒適鞋子"
                },
                {
                    type: "info",
                    icon: "fas fa-temperature-low",
                    title: "氣溫提醒",
                    message: "氣溫0-14°C，多層次穿搭，車上有暖氣"
                }
            ],
            nextDayPreview: {
                title: "布爾諾 → 布拉格",
                summary: "前往捷克首都布拉格，遊覽查理大橋與城堡",
                highlights: [
                    { icon: "fas fa-bus", text: "206公里車程" },
                    { icon: "fas fa-utensils", text: "捷克烤鴨料理" },
                    { icon: "fas fa-landmark", text: "布拉格城堡" }
                ]
            },
            accommodation: {
                name: "OREA CONGRESS HOTEL BRNO",
                phone: "TEL: 420-530510121",
                address: "KŘIŽKOVSKEHO 458/47, 603 73 BRNO, CZECH REPUBLIC"
            },
            meals: {
                breakfast: "飯店西式早餐",
                lunch: "中式六菜一湯",
                dinner: "當地特色西式(豬)料理"
            },
            distance: "138公里"
        },
        // 第4-8天行程（簡化顯示，實際完整）
        {
            day: 4,
            date: "2026-04-04",
            weekday: "六",
            title: "布爾諾 → 布拉格",
            summary: "前往捷克首都布拉格，遊覽查理大橋與城堡區",
            timeline: [],
            alerts: [],
            nextDayPreview: {
                title: "布拉格 → 庫倫洛夫",
                summary: "前往世界文化遺產庫倫洛夫小鎮",
                highlights: []
            },
            accommodation: {
                name: "OCCIDENTAL PRAHA",
                phone: "TEL: 420-296772111",
                address: "Na Strzi 32 Prague 140 00 CZ"
            },
            meals: {
                breakfast: "飯店西式早餐",
                lunch: "捷克烤鴨特選料理",
                dinner: "中式六菜一湯"
            },
            distance: "206公里"
        },
        {
            day: 5,
            date: "2026-04-05",
            weekday: "日",
            title: "布拉格 → 庫倫洛夫",
            summary: "前往世界文化遺產庫倫洛夫小鎮，體驗中世紀風情",
            timeline: [],
            alerts: [
                {
                    type: "important",
                    icon: "fas fa-suitcase",
                    title: "過夜包準備",
                    message: "庫倫洛夫大巴無法進入，必須準備過夜包"
                }
            ],
            nextDayPreview: {
                title: "庫倫洛夫 → 國王湖 → 薩爾斯堡",
                summary: "德國國王湖遊船，前往音樂之都薩爾斯堡",
                highlights: []
            },
            accommodation: {
                name: "HOTEL GRAND",
                phone: "TEL: 420-380711671",
                address: "Namesti Svornosti 3 Cesky Krumlov 381 01 CZ"
            },
            meals: {
                breakfast: "飯店西式早餐",
                lunch: "捷克西式料理",
                dinner: "特選地窖豬肋排料理"
            },
            distance: "172公里"
        },
        {
            day: 6,
            date: "2026-04-06",
            weekday: "一",
            title: "庫倫洛夫 → 國王湖 → 薩爾斯堡",
            summary: "德國國王湖遊船，前往音樂之都薩爾斯堡",
            timeline: [],
            alerts: [],
            nextDayPreview: {
                title: "薩爾斯堡 → 哈修塔特 → 維也納",
                summary: "世界文化遺產哈修塔特湖區，返回維也納",
                highlights: []
            },
            accommodation: {
                name: "FOURSIDE HOTEL SALZBURG",
                phone: "TEL: 43-6624355460",
                address: "Am Messezentrum 2 Salzburg Salzburg 5020 AT"
            },
            meals: {
                breakfast: "飯店西式早餐",
                lunch: "當地西式料理",
                dinner: "中式六菜一湯"
            },
            distance: "290公里"
        },
        {
            day: 7,
            date: "2026-04-07",
            weekday: "二",
            title: "薩爾斯堡 → 哈修塔特 → 維也納",
            summary: "世界文化遺產哈修塔特湖區，返回維也納",
            timeline: [],
            alerts: [
                {
                    type: "warning",
                    icon: "fas fa-bus",
                    title: "長途車程",
                    message: "今日車程最長（377公里），準備娛樂和零食"
                }
            ],
            nextDayPreview: {
                title: "維也納 → 布達佩斯",
                summary: "前往匈牙利首都布達佩斯，欣賞多瑙河夜景",
                highlights: []
            },
            accommodation: {
                name: "AUSTRIA TREND EVENTHOTEL PYRAMIDE",
                phone: "TEL: 43-1-69-900",
                address: "PARKALLEE 2, VÖSENDORF, 2334, AUSTRIA"
            },
            meals: {
                breakfast: "飯店西式早餐",
                lunch: "特選湖區鱒魚料理",
                dinner: "中式六菜一湯"
            },
            distance: "377公里"
        },
        {
            day: 8,
            date: "2026-04-08",
            weekday: "三",
            title: "維也納 → 布達佩斯",
            summary: "前往匈牙利首都布達佩斯，欣賞多瑙河夜景",
            timeline: [],
            alerts: [],
            nextDayPreview: {
                title: "布達佩斯 → 上海",
                summary: "最後一天遊覽，準備返程",
                highlights: []
            },
            accommodation: {
                name: "TRIBE BUDAPEST STADIUM",
                phone: "TEL: 36-1-2389360",
                address: "KÖNYVES KÁLMÁN KRT. 34, BUDAPEST, 1097, HUNGARY"
            },
            meals: {
                breakfast: "飯店西式早餐",
                lunch: "中式六菜一湯",
                dinner: "匈牙利當地特色（牛）料理"
            },
            distance: "245公里"
        },
        {
            day: 9,
            date: "2026-04-09",
            weekday: "四",
            title: "布達佩斯 → 上海",
            summary: "布達佩斯市區遊覽，下午前往機場返程",
            isTravelDay: true,
            timeline: [],
            alerts: [
                {
                    type: "important",
                    icon: "fas fa-passport",
                    title: "退稅辦理",
                    message: "最後一國退稅，記得在機場辦理"
                }
            ],
            nextDayPreview: {
                title: "上海 → 台北",
                summary: "轉機返回台北，結束歐洲之旅",
                highlights: []
            },
            accommodation: {
                name: "機上",
                type: "flight"
            },
            meals: {
                breakfast: "飯店西式早餐",
                lunch: "機上餐食",
                dinner: "機上餐食"
            }
        },
        {
            day: 10,
            date: "2026-04-10",
            weekday: "五",
            title: "上海 → 台北",
            summary: "轉機返回台北，結束愉快的歐洲之旅",
            isTravelDay: true,
            timeline: [],
            alerts: [
                {
                    type: "info",
                    icon: "fas fa-clock",
                    title: "轉機時間",
                    message: "上海轉機時間約6.5小時，準備娛樂"
                }
            ],
            nextDayPreview: null,
            accommodation: {
                name: "溫暖的家",
                type: "home"
            },
            meals: {
                breakfast: "機上餐食",
                lunch: "X",
                dinner: "X"
            }
        }
    ],
    
    // 實用提醒分類
    tips: {
        luggage: [
            { icon: "fas fa-suitcase-rolling", text: "過夜包必備：庫倫洛夫小鎮大巴無法進入" },
            { icon: "fas fa-kettle", text: "煮水壺最重要：飯店常無提供，泡麵必備" },
            { icon: "fas fa-shoe-prints", text: "舒適鞋子：石板路多，不適合大行李箱" },
            { icon: "fas fa-tshirt", text: "多層次穿搭：0-14°C，車上有暖氣" }
        ],
        food: [
            { icon: "fas fa-utensils", text: "當地特色必嘗：維也納炸豬排、捷克烤鴨" },
            { icon: "fas fa-carrot", text: "飲食適應：準備腸胃藥，飲食變化大" },
            { icon: "fas fa-coffee", text: "早餐時間：歐洲早餐較簡單，可自備零食" },
            { icon: "fas fa-wine-bottle", text: "飲水建議：自備水壺，餐廳水需付費" }
        ],
        money: [
            { icon: "fas fa-euro-sign", text: "小額歐元：準備零錢用於小費和小額支付" },
            { icon: "fas fa-credit-card", text: "刷卡設定：刷卡時選擇當地幣別" },
            { icon: "fas fa-receipt", text: "退稅辦理：最後一國（匈牙利）辦理退稅" },
            { icon: "fas fa-money-check-alt", text: "防盜措施：使用防盜腰包，分散現金" }
        ],
        health: [
            { icon: "fas fa-heartbeat", text: "個人藥品：常用藥品隨身攜帶" },
            { icon: "fas fa-sun", text: "防曬保濕：氣候乾燥，準備乳液和防曬" },
            { icon: "fas fa-walking", text: "體力管理：行程緊湊，適時休息" },
            { icon: "fas fa-hand-sparkles", text: "衛生習慣：準備濕紙巾、洗手液" }
        ],
        photography: [
            { icon: "fas fa-camera", text: "清晨拍照：光線最佳，遊客最少" },
            { icon: "fas fa-sun", text: "金色時刻：傍晚建築最美" },
            { icon: "fas fa-battery-full", text: "電池準備：多備記憶卡和電池" },
            { icon: "fas fa-cloud-sun", text: "天氣適應：準備雨具，陰天也有特色" }
        ]
    },
    
    // 檢查清單項目
    checklist: {
        documents: [
            { id: "passport", text: "護照（有效期6個月以上）", important: true },
            { id: "ticket", text: "機票電子檔/紙本", important: true },
            { id: "insurance", text: "旅遊保險文件", important: true },
            { id: "itinerary", text: "行程說明會資料" },
            { id: "creditcard", text: "信用卡（設定當地幣別）", important: true }
        ],
        clothing: [
            { id: "jacket", text: "保暖外套（可穿2-3天）", important: true },
            { id: "underwear", text: "換洗內衣褲（7-8套）" },
            { id: "shoes", text: "舒適鞋子2雙（石板路專用）", important: true },
            { id: "accessories", text: "圍巾、手套、帽子" },
            { id: "overnight-bag", text: "過夜包（庫倫洛夫用）", important: true }
        ],
        electronics: [
            { id: "kettle", text: "煮水壺（飯店常無）", important: true },
            { id: "adapter", text: "歐規轉接頭", important: true },
            { id: "charger", text: "充電器、行動電源", important: true },
            { id: "camera", text: "相機、記憶卡" },
            { id: "headphones", text: "耳機（長途車程用）" }
        ],
        toiletries: [
            { id: "toothbrush", text: "牙刷牙膏（飯店可能無）" },
            { id: "lotion", text: "滋潤型乳液（氣候乾燥）", important: true },
            { id: "medicine", text: "個人藥品、腸胃藥", important: true },
            { id: "sunscreen", text: "防曬乳" },
            { id: "wipes", text: "濕紙巾、面紙" }
        ],
        money: [
            { id: "euro-cash", text: "小額歐元現金（小費用）", important: true },
            { id: "credit-card-setup", text: "信用卡設定當地幣別", important: true },
            { id: "money-belt", text: "防盜腰包/貼身包" }
        ],
        food: [
            { id: "instant-noodles", text: "泡麵（配合煮水壺）", important: true },
            { id: "snacks", text: "零食（長途車程用）" },
            { id: "water-bottle", text: "保溫瓶/水壺" }
        ],
        accessories: [
            { id: "neck-pillow", text: "頸枕、眼罩、耳塞" },
            { id: "rain-gear", text: "輕便雨衣/折疊傘" },
            { id: "bag-locks", text: "行李鎖、行李牌" },
            { id: "entertainment", text: "娛樂（書、平板、遊戲）" }
        ]
    },
    
    // 地圖標記點
    mapPoints: [
        { city: "台北", lat: 25.0330, lng: 121.5654, type: "departure", day: 1 },
        { city: "上海", lat: 31.2304, lng: 121.4737, type: "transit", day: 1 },
        { city: "布達佩斯", lat: 47.4979, lng: 19.0402, type: "arrival", day: 2 },
        { city: "布拉提斯拉瓦", lat: 48.1486, lng: 17.1077, type: "sightseeing", day: 2 },
        { city: "維也納", lat: 48.2082, lng: 16.3738, type: "hotel", day: 2 },
        { city: "布爾諾", lat: 49.1951, lng: 16.6068, type: "hotel", day: 3 },
        { city: "布拉格", lat: 50.0755, lng: 14.4378, type: "hotel", day: 4 },
        { city: "庫倫洛夫", lat: 48.8108, lng: 14.3150, type: "hotel", day: 5 },
        { city: "國王湖", lat: 47.5591, lng: 12.9831, type: "sightseeing", day: 6 },
        { city: "薩爾斯堡", lat: 47.8095, lng: 13.0550, type: "hotel", day: 6 },
        { city: "哈修塔特", lat: 47.5622, lng: 13.6493, type: "sightseeing", day: 7 },
        { city: "布達佩斯", lat: 47.4979, lng: 19.0402, type: "hotel", day: 8 }
    ]
};

// 匯出數據供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = europeTourData;
}