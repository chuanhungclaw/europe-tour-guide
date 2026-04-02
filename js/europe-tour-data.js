// 歐洲四國行程資料庫 - 恢復完整版本
const europeTourData = {
    // 行程基本資訊
    tripInfo: {
        name: "奧捷斯匈｜國王湖遊船．四國首都．維也納．布拉格．布達佩斯．庫倫洛夫．哈修塔特湖區(餐全包)10日",
        code: "26EE401MU 10天",
        dates: "2026年4月1日 - 2026年4月10日",
        guide: "林孜璟 小姐",
        guidePhone: "+886 0913573121",
        emergencyContact: "0932-365-795",
        groupSize: "25人",
        departureAirport: "桃園國際機場",
        returnAirport: "桃園國際機場"
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
                departure: "2026/04/10(五) 09:35 布達佩斯機場",
                arrival: "2026/04/10(五) 23:50 上海浦東機場",
                duration: "10:15"
            },
            {
                airline: "中國東方航空 MU5005",
                departure: "2026/04/11(六) 08:00 上海浦東機場",
                arrival: "2026/04/11(六) 10:00 桃園機場",
                duration: "02:00"
            }
        ]
    },
    
    // 住宿資訊
    accommodations: [
        {
            day: 1,
            city: "布達佩斯",
            hotel: "布達佩斯皇冠假日酒店 (Crowne Plaza Budapest)",
            nights: 2,
            address: "1068 Budapest, Dózsa György út 88, Hungary",
            phone: "+36 1 889 4444"
        },
        {
            day: 3,
            city: "布拉提斯拉瓦",
            hotel: "LOFT Hotel Bratislava",
            nights: 1,
            address: "Námestie SNP 1528/14, 811 06 Bratislava, Slovakia",
            phone: "+421 2 207 7777"
        },
        {
            day: 4,
            city: "維也納",
            hotel: "維也納萬豪酒店 (Vienna Marriott Hotel)",
            nights: 2,
            address: "Parkring 12a, 1010 Wien, Austria",
            phone: "+43 1 515180"
        },
        {
            day: 6,
            city: "布爾諾",
            hotel: "Grandhotel Brno",
            nights: 1,
            address: "Benešova 18-20, 602 00 Brno, Czech Republic",
            phone: "+420 542 219 111"
        },
        {
            day: 7,
            city: "布拉格",
            hotel: "布拉格萬豪酒店 (Prague Marriott Hotel)",
            nights: 2,
            address: "V Celnici 8, 110 00 Praha 1, Czech Republic",
            phone: "+420 228 888 888"
        },
        {
            day: 9,
            city: "庫倫洛夫",
            hotel: "Hotel Ruze Cesky Krumlov",
            nights: 1,
            address: "Horni 154, 381 01 Cesky Krumlov, Czech Republic",
            phone: "+420 380 772 100"
        }
    ],
    
    // 每日行程
    dailyItinerary: [
        {
            day: 1,
            date: "2026/04/01",
            title: "台北 → 上海 (轉機)",
            description: "桃園國際機場集合，搭乘中國東方航空MU5006班機飛往上海浦東機場，轉機前往布達佩斯。",
            highlights: [
                "15:30 桃園機場第二航廈集合",
                "17:30 辦理登機手續及行李托運",
                "20:10 起飛（台灣→上海）"
            ]
        },
        {
            day: 2,
            date: "2026/04/02",
            title: "抵達布達佩斯",
            description: "抵達布達佩斯機場，專車接往酒店休息，下午市區觀光。",
            highlights: [
                "08:05 抵達布達佩斯機場",
                "09:30 前往酒店休息",
                "14:00 布達佩斯市區觀光",
                "18:00 晚餐"
            ]
        },
        {
            day: 3,
            date: "2026/04/03",
            title: "布達佩斯全日觀光",
            description: "參觀布達城堡、漁夫堡、國會大廈、英雄廣場等景點。",
            highlights: [
                "09:00 布達城堡",
                "11:00 漁夫堡",
                "14:00 國會大廈",
                "16:00 英雄廣場"
            ]
        },
        {
            day: 4,
            date: "2026/04/04",
            title: "布達佩斯 → 布拉提斯拉瓦",
            description: "早餐後前往斯洛伐克首都布拉提斯拉瓦，下午市區觀光。",
            highlights: [
                "08:00 早餐",
                "09:00 前往布拉提斯拉瓦",
                "12:00 抵達布拉提斯拉瓦",
                "14:00 市區觀光"
            ]
        },
        {
            day: 5,
            date: "2026/04/05",
            title: "布拉提斯拉瓦 → 維也納",
            description: "前往音樂之都維也納，參觀美泉宮、國家歌劇院等景點。",
            highlights: [
                "08:00 早餐",
                "09:00 前往維也納",
                "12:00 抵達維也納",
                "14:00 美泉宮"
            ]
        },
        {
            day: 6,
            date: "2026/04/06",
            title: "維也納全日觀光",
            description: "參觀聖史蒂芬大教堂、霍夫堡皇宮、貝爾維第宮等景點。",
            highlights: [
                "09:00 聖史蒂芬大教堂",
                "11:00 霍夫堡皇宮",
                "14:00 貝爾維第宮"
            ]
        },
        {
            day: 7,
            date: "2026/04/07",
            title: "維也納 → 布爾諾",
            description: "前往捷克第二大城市布爾諾，下午市區觀光。",
            highlights: [
                "08:00 早餐",
                "09:00 前往布爾諾",
                "12:00 抵達布爾諾",
                "14:00 布爾諾城堡"
            ]
        },
        {
            day: 8,
            date: "2026/04/08",
            title: "布爾諾 → 布拉格",
            description: "前往捷克首都布拉格，下午市區觀光。",
            highlights: [
                "08:00 早餐",
                "09:00 前往布拉格",
                "12:00 抵達布拉格",
                "14:00 布拉格城堡"
            ]
        },
        {
            day: 9,
            date: "2026/04/09",
            title: "布拉格全日觀光",
            description: "參觀查理大橋、舊城廣場、天文鐘等景點。",
            highlights: [
                "09:00 查理大橋",
                "11:00 舊城廣場",
                "14:00 天文鐘"
            ]
        },
        {
            day: 10,
            date: "2026/04/10",
            title: "布拉格 → 台北",
            description: "早餐後前往機場，搭乘班機返回台北。",
            highlights: [
                "08:00 早餐",
                "09:00 前往機場",
                "12:00 起飛（布拉格→上海）",
                "20:00 抵達上海"
            ]
        }
    ],
    
    // 景點資料
    attractions: [
        {
            id: "budapest-castle",
            name: "布達城堡",
            city: "布達佩斯",
            description: "匈牙利歷史皇宮，位於布達佩斯城堡山上，現為匈牙利國家美術館和布達佩斯歷史博物館。",
            highlights: [
                "歷史可追溯至13世紀",
                "世界文化遺產",
                "可俯瞰多瑙河和佩斯市區"
            ],
            tips: [
                "建議上午參觀光線較好",
                "可購買套票參觀多個博物館",
                "建議穿著舒適的鞋子"
            ]
        },
        {
            id: "fishermans-bastion",
            name: "漁夫堡",
            city: "布達佩斯",
            description: "新哥德式建築，位於布達城堡區，可俯瞰多瑙河和國會大廈。",
            highlights: [
                "建於1905年",
                "七座塔樓代表七個匈牙利部落",
                "最佳拍照點"
            ],
            tips: [
                "建議傍晚時分參觀",
                "可欣賞日落和多瑙河夜景",
                "建議穿著保暖衣物"
            ]
        },
        {
            id: "parliament-building",
            name: "國會大廈",
            city: "布達佩斯",
            description: "匈牙利國會大廈，位於多瑙河畔，是布達佩斯的地標建築。",
            highlights: [
                "建於1904年",
                "新哥德式建築",
                "匈牙利政治中心"
            ],
            tips: [
                "建議提前預約參觀",
                "需攜帶護照",
                "建議穿著正式服裝"
            ]
        },
        {
            id: "heroes-square",
            name: "英雄廣場",
            city: "布達佩斯",
            description: "布達佩斯最大的廣場，紀念匈牙利千年曆史的雕像群。",
            highlights: [
                "建於1896年",
                "七位匈牙利部落首領雕像",
                "匈牙利歷史紀念碑"
            ],
            tips: [
                "建議上午參觀",
                "可租用語音導覽",
                "建議穿著舒適的鞋子"
            ]
        },
        {
            id: "schonbrunn-palace",
            name: "美泉宮",
           city: "維也納",
            description: "哈布斯堡王朝的夏宮，世界文化遺產，擁有廣闊的花園和動物園。",
            highlights: [
                "建於1696年",
                "1441間房間",
                "世界最古老動物園"
            ],
            tips: [
                "建議提前網上購票",
                "建議預留半天時間",
                "建議穿著舒適的鞋子"
            ]
        },
        {
            id: "st-stephens-cathedral",
            name: "聖史蒂芬大教堂",
            city: "維也納",
            description: "維也納地標，哥德式建築，可登頂俯瞰城市全景。",
            highlights: [
                "建於1147年",
                "137公尺高塔樓",
                "彩色屋頂"
            ],
            tips: [
                "建議上午參觀",
                "可登頂俯瞰維也納",
                "建議穿著舒適的鞋子"
            ]
        },
        {
            id: "hofburg-palace",
            name: "霍夫堡皇宮",
            city: "維也納",
            description: "哈布斯堡王朝的冬宮，現為奧地利總統官邸和博物館群。",
            highlights: [
                "建於1279年",
                "19個庭院",
                "2,600個房間"
            ],
            tips: [
                "建議預留半天時間",
                "可租用語音導覽",
                "建議穿著舒適的鞋子"
            ]
        },
        {
            id: "belvedere-palace",
            name: "貝爾維第宮",
            city: "維也納",
            description: "巴洛克建築，現為美術館，收藏古斯塔夫·克林姆作品。",
            highlights: [
                "建於1723年",
                "收藏克林姆《吻》",
                "廣闊的法式花園"
            ],
            tips: [
                "建議上午參觀",
                "可租用語音導覽",
                "建議穿著舒適的鞋子"
            ]
        },
        {
            id: "prague-castle",
            name: "布拉格城堡",
            city: "布拉格",
            description: "世界上最大的古堡，捷克總統官邸，可俯瞰布拉格全景。",
            highlights: [
                "建於9世紀",
                "7公頃面積",
                "世界最大古堡"
            ],
            tips: [
                "建議上午參觀",
                "可購買套票參觀多個景點",
                "建議穿著舒適的鞋子"
            ]
        },
        {
            id: "charles-bridge",
            name: "查理大橋",
            city: "布拉格",
            description: "布拉格最古老的橋樑，連接老城和小城，兩側有30座巴洛克雕像。",
            highlights: [
                "建於1357年",
                "516公尺長度",
                "30座雕像"
            ],
            tips: [
                "建議傍晚參觀",
                "可欣賞日落和夜景",
                "建議穿著保暖衣物"
            ]
        },
        {
            id: "old-town-square",
            name: "舊城廣場",
            city: "布拉格",
            description: "布拉格歷史中心，有天文鐘、泰恩教堂和聖尼古拉斯教堂。",
            highlights: [
                "建於12世紀",
                "天文鐘",
                "泰恩教堂"
            ],
            tips: [
                "建議上午參觀",
                "可租用語音導覽",
                "建議穿著舒適的鞋子"
            ]
        },
        {
            id: "astronomical-clock",
            name: "天文鐘",
            city: "布拉格",
            description: "1410年建造的天文鐘，位於舊城廣場市政廳塔樓上。",
            highlights: [
                "建於1410年",
                "每小時整點報時",
                "十二使徒雕像"
            ],
            tips: [
                "建議整點前到達",
                "可參觀鐘樓內部",
                "建議穿著舒適的鞋子"
            ]
        }
    ],
    
    // 實用提醒
    practicalTips: [
        {
            id: "documents",
            category: "文件",
            title: "必備文件",
            description: "確保攜帶以下文件：",
            items: [
                "護照（有效期至少6個月）",
                "簽證（如需要）",
                "機票",
                "酒店預訂確認",
                "旅行保險"
            ]
        },
        {
            id: "money",
            category: "金錢",
            title: "金錢建議",
            description: "貨幣與支付建議：",
            items: [
                "攜帶歐元現金",
                "準備信用卡",
                "兌換當地貨幣",
                "準備小額現金"
            ]
        },
        {
            id: "packing",
            category: "行李",
            title: "行李建議",
            description: "行李打包建議：",
            items: [
                "舒適的鞋子",
                "保暖衣物",
                "雨具",
                "轉換插頭"
            ]
        },
        {
            id: "health",
            category: "健康",
            title: "健康建議",
            description: "健康與安全建議：",
            items: [
                "攜帶常用藥品",
                "注意飲食衛生",
                "準備防曬用品",
                "攜帶急救包"
            ]
        },
        {
            id: "safety",
            category: "安全",
            title: "安全建議",
            description: "旅行安全建議：",
            items: [
                "保管好貴重物品",
                "注意個人安全",
                "避免夜間單獨外出",
                "保管好護照"
            ]
        },
        {
            id: "communication",
            category: "通訊",
            title: "通訊建議",
            description: "通訊與網路建議：",
            items: [
                "準備當地SIM卡",
                "下載離線地圖",
                "準備翻譯工具",
                "準備充電寶"
            ]
        }
    ],
    
    // 檢查清單
    checklist: [
        {
            id: "before-trip",
            category: "行前準備",
            title: "行前檢查清單",
            items: [
                { id: "passport", text: "護照", checked: false },
                { id: "visa", text: "簽證", checked: false },
                { id: "tickets", text: "機票", checked: false },
                { id: "hotel", text: "酒店預訂", checked: false },
                { id: "insurance", text: "旅行保險", checked: false },
                { id: "money", text: "現金/信用卡", checked: false },
                { id: "medicine", text: "藥品", checked: false },
                { id: "clothes", text: "衣物", checked: false },
                { id: "toiletries", text: "盥洗用品", checked: false },
                { id: "electronics", text: "電子產品", checked: false },
                { id: "documents", text: "重要文件", checked: false },
                { id: "emergency", text: "緊急聯絡人", checked: false }
            ]
        },
        {
            id: "packing",
            category: "行李打包",
            title: "行李打包清單",
            items: [
                { id: "passport", text: "護照", checked: false },
                { id: "visa", text: "簽證", checked: false },
                { id: "tickets", text: "機票", checked: false },
                { id: "hotel", text: "酒店確認", checked: false },
                { id: "money", text: "現金/信用卡", checked: false },
                { id: "medicine", text: "藥品", checked: false },
                { id: "clothes", text: "衣物", checked: false },
                { id: "toiletries", text: "盥洗用品", checked: false },
                { id: "electronics", text: "電子產品", checked: false },
                { id: "documents", text: "重要文件", checked: false },
                { id: "emergency", text: "緊急聯絡人", checked: false }
            ]
        }
    ]
};

// 導出數據
window.europeTourData = europeTourData;