// 歐洲四國景點完整攻略數據庫
const attractionGuideData = {
    // 第2天：布達佩斯
    "budapest-arrival": {
        id: "budapest-arrival",
        day: 2,
        type: "arrival",
        title: "布達佩斯抵達",
        subtitle: "匈牙利首都，多瑙河畔的明珠",
        icon: "fas fa-plane-arrival",
        color: "#228b22",
        
        // 基本資訊
        location: "布達佩斯，匈牙利",
        coordinates: { lat: 47.4979, lng: 19.0402 },
        time: "下午抵達",
        duration: "2小時",
        
        // 詳細介紹
        description: "抵達匈牙利首都布達佩斯，開始歐洲四國之旅。布達佩斯被多瑙河分為布達和佩斯兩部分，有『多瑙河明珠』的美譽。",
        
        // 特色亮點
        highlights: [
            {
                icon: "fas fa-landmark",
                title: "多瑙河風光",
                description: "多瑙河貫穿城市，兩岸建築美不勝收"
            },
            {
                icon: "fas fa-bridge",
                title: "鏈橋夜景",
                description: "夜晚的鏈橋燈光璀璨，是攝影絕佳地點"
            },
            {
                icon: "fas fa-utensils",
                title: "匈牙利美食",
                description: "品嘗道地的匈牙利牛肉湯和煙囪捲"
            }
        ],
        
        // 攻略建議
        guideTips: [
            "抵達機場後，建議兌換少量匈牙利福林現金",
            "機場到市區可搭乘機場巴士或計程車",
            "晚上可漫步多瑙河畔，欣賞鏈橋夜景",
            "晚餐推薦品嘗匈牙利傳統美食"
        ],
        
        // 注意事項
        precautions: [
            "注意隨身財物安全，特別是在人多的地方",
            "匈牙利使用福林，部分商店接受歐元但匯率不佳",
            "氣溫約5-12°C，注意保暖",
            "時差：比台灣晚7小時"
        ],
        
        // 飯店資訊
        hotel: {
            name: "布達佩斯市中心飯店",
            checkIn: "15:00",
            checkOut: "11:00",
            amenities: ["免費WiFi", "早餐", "健身房", "行李寄存"],
            tips: [
                "辦理入住時可詢問附近餐廳推薦",
                "飯店通常提供旅遊地圖",
                "記得確認次日早餐時間"
            ]
        },
        
        // 天氣資訊
        weather: {
            temperature: "5-12°C",
            condition: "多雲轉晴",
            icon: "fas fa-cloud-sun",
            tips: [
                "建議穿著：保暖外套、圍巾、帽子",
                "白天氣溫較高，可多層次穿搭",
                "晚上較冷，注意保暖"
            ]
        },
        
        // 交通資訊
        transportation: [
            "機場到市區：機場巴士約30分鐘，計程車約20分鐘",
            "市內交通：地鐵、公車、電車",
            "建議購買24小時交通票"
        ],
        
        // 照片參考
        photos: [
            "布達佩斯鏈橋夜景",
            "多瑙河遊船風光",
            "國會大廈外觀"
        ],
        
        // 完成狀態
        completed: false,
        completionTime: null
    },
    
    // 第2天：布拉提斯拉瓦
    "bratislava-sightseeing": {
        id: "bratislava-sightseeing",
        day: 2,
        type: "sightseeing",
        title: "布拉提斯拉瓦",
        subtitle: "斯洛伐克首都，小而美的中歐城市",
        icon: "fas fa-castle",
        color: "#ffd700",
        
        // 基本資訊
        location: "布拉提斯拉瓦，斯洛伐克",
        coordinates: { lat: 48.1486, lng: 17.1077 },
        time: "上午遊覽",
        duration: "3小時",
        
        // 詳細介紹
        description: "布拉提斯拉瓦是斯洛伐克首都，位於多瑙河畔，靠近奧地利和匈牙利邊境。城市雖小但充滿中世紀風情。",
        
        // 特色亮點
        highlights: [
            {
                icon: "fas fa-chess-rook",
                title: "布拉提斯拉瓦城堡",
                description: "俯瞰多瑙河和全城的標誌性建築"
            },
            {
                icon: "fas fa-frog",
                title: "工作中的男人雕像",
                description: "城市地標，代表辛勤工作的市民"
            },
            {
                icon: "fas fa-church",
                title: "聖馬丁大教堂",
                description: "歷史上多位匈牙利國王在此加冕"
            }
        ],
        
        // 攻略建議
        guideTips: [
            "城堡區可俯瞰整個城市和多瑙河風光",
            "老城區適合步行遊覽，石板路注意安全",
            "可品嘗當地特色小吃Bryndzové halušky",
            "紀念品店可購買手工藝品"
        ],
        
        // 注意事項
        precautions: [
            "斯洛伐克使用歐元，無需兌換貨幣",
            "部分景點需要門票，建議準備現金",
            "老城區石板路不適合高跟鞋",
            "注意扒手，特別是在遊客多的區域"
        ],
        
        // 飯店資訊（當天住宿）
        hotel: {
            name: "維也納市中心飯店",
            checkIn: "15:00",
            checkOut: "11:00",
            amenities: ["免費WiFi", "早餐", "健身房", "停車場"],
            tips: [
                "從布拉提斯拉瓦到維也納車程約1小時",
                "辦理入住後可安排晚餐",
                "確認次日行程安排"
            ]
        },
        
        // 天氣資訊
        weather: {
            temperature: "4-10°C",
            condition: "晴時多雲",
            icon: "fas fa-sun",
            tips: [
                "白天氣溫舒適，適合戶外活動",
                "建議穿著：輕便外套、舒適鞋子",
                "紫外線中等，建議使用防曬"
            ]
        },
        
        // 交通資訊
        transportation: [
            "大巴前往：車程約1小時",
            "跨境注意：準備護照備查",
            "市內交通：步行為主"
        ],
        
        // 照片參考
        photos: [
            "布拉提斯拉瓦城堡全景",
            "老城區廣場",
            "工作中的男人雕像"
        ],
        
        // 完成狀態
        completed: false,
        completionTime: null
    },
    
    // 第2天：維也納住宿
    "vienna-hotel": {
        id: "vienna-hotel",
        day: 2,
        type: "hotel",
        title: "維也納住宿",
        subtitle: "音樂之都，奧地利首都",
        icon: "fas fa-hotel",
        color: "#6a0dad",
        
        // 基本資訊
        location: "維也納，奧地利",
        coordinates: { lat: 48.2082, lng: 16.3738 },
        time: "晚上入住",
        duration: "住宿",
        
        // 詳細介紹
        description: "維也納是奧地利首都，以豐富的音樂遺產和華麗的建築聞名，有『音樂之都』的美譽。",
        
        // 特色亮點
        highlights: [
            {
                icon: "fas fa-music",
                title: "音樂之都",
                description: "莫札特、貝多芬等音樂巨匠的故鄉"
            },
            {
                icon: "fas fa-palette",
                title: "藝術氛圍",
                description: "博物館、畫廊、歌劇院遍布全城"
            },
            {
                icon: "fas fa-coffee",
                title: "咖啡文化",
                description: "維也納咖啡館文化被列入非物質文化遺產"
            }
        ],
        
        // 攻略建議
        guideTips: [
            "晚上可漫步環城大道，欣賞建築夜景",
            "飯店附近通常有超市，可購買飲用水",
            "維也納治安良好，但還是要注意安全",
            "可提前查詢次日早餐時間和地點"
        ],
        
        // 注意事項
        precautions: [
            "奧地利使用歐元",
            "飯店通常不提供牙刷等個人用品",
            "注意退房時間，避免延誤",
            "貴重物品建議使用飯店保險箱"
        ],
        
        // 飯店資訊
        hotel: {
            name: "維也納市中心飯店",
            checkIn: "15:00",
            checkOut: "11:00",
            amenities: ["免費WiFi", "早餐", "健身房", "商務中心"],
            tips: [
                "確認飯店設施開放時間",
                "詢問附近餐廳推薦",
                "確認大巴停車位置"
            ]
        },
        
        // 天氣資訊
        weather: {
            temperature: "3-9°C",
            condition: "晴朗",
            icon: "fas fa-sun",
            tips: [
                "夜晚氣溫較低，外出注意保暖",
                "室內暖氣充足，建議多層次穿搭",
                "空氣乾燥，注意保濕"
            ]
        },
        
        // 交通資訊
        transportation: [
            "市內交通：地鐵、電車、公車",
            "建議購買維也納城市卡",
            "飯店通常提供交通資訊"
        ],
        
        // 照片參考
        photos: [
            "維也納國家歌劇院",
            "美泉宮花園",
            "聖史蒂芬大教堂"
        ],
        
        // 完成狀態
        completed: false,
        completionTime: null
    },
    
    // 第3天：布爾諾
    "brno-hotel": {
        id: "brno-hotel",
        day: 3,
        type: "hotel",
        title: "布爾諾住宿",
        subtitle: "捷克第二大城市，摩拉維亞首府",
        icon: "fas fa-hotel",
        color: "#6a0dad",
        
        // 基本資訊
        location: "布爾諾，捷克",
        coordinates: { lat: 49.1951, lng: 16.6068 },
        time: "晚上入住",
        duration: "住宿",
        
        // 詳細介紹
        description: "布爾諾是捷克第二大城市，摩拉維亞地區的首府，以現代建築和豐富的文化生活聞名。",
        
        // 特色亮點
        highlights: [
            {
                icon: "fas fa-archway",
                title: "史皮爾伯城堡",
                description: "城市地標，可俯瞰整個布爾諾"
            },
            {
                icon: "fas fa-cube",
                title: "圖根哈特別墅",
                description: "現代主義建築的代表作，UNESCO世界遺產"
            },
            {
                icon: "fas fa-beer",
                title: "捷克啤酒",
                description: "品嘗道地的捷克皮爾森啤酒"
            }
        ],
        
        // 攻略建議
        guideTips: [
            "布爾諾的夜生活豐富，可體驗當地酒吧",
            "史皮爾伯城堡晚上燈光很美",
            "可品嘗當地特色美食Svíčková",
            "紀念品店可購買波西米亞水晶"
        ],
        
        // 注意事項
        precautions: [
            "捷克使用捷克克朗，部分商店接受歐元",
            "注意兌換匯率，避免在機場兌換",
            "晚上外出注意安全，結伴而行",
            "飯店通常收取城市稅"
        ],
        
        // 飯店資訊
        hotel: {
            name: "布爾諾市中心飯店",
            checkIn: "14:00",
            checkOut: "10:00",
            amenities: ["免費WiFi", "早餐", "停車場", "餐廳"],
            tips: [
                "確認飯店是否提供免費停車",
                "詢問當地特色餐廳推薦",
                "確認次日早餐時間"
            ]
        },
        
        // 天氣資訊
        weather: {
            temperature: "2-8°C",
            condition: "多雲",
            icon: "fas fa-cloud",
            tips: [
                "氣溫較低，注意保暖",
                "可能會有小雨，建議攜帶雨具",
                "室內外溫差大，多層次穿搭"
            ]
        },
        
        // 交通資訊
        transportation: [
            "市內交通：電車、公車",
            "步行遊覽老城區很方便",
            "飯店通常提供旅遊地圖"
        ],
        
        // 照片參考
        photos: [
            "史皮爾伯城堡夜景",
            "自由廣場",
            "聖彼得保羅大教堂"
        ],
        
        // 完成狀態
        completed: false,
        completionTime: null
    },
    
    // 第4天：布拉格
    "prague-hotel": {
        id: "prague-hotel",
        day: 4,
        type: "hotel",
        title: "布拉格住宿",
        subtitle: "千塔之城，捷克首都",
        icon: "fas fa-hotel",
        color: "#6a0dad",
        
        // 基本資訊
        location: "布拉格，捷克",
        coordinates: { lat: 50.0755, lng: 14.4378 },
        time: "晚上入住",
        duration: "住宿",
        
        // 詳細介紹
        description: "布拉格是捷克首都，被譽為『歐洲最美城市』，擁有保存完好的中世紀建築和浪漫的查理大橋。",
        
        // 特色亮點
        highlights: [
            {
                icon: "fas fa-bridge",
                title: "查理大橋",
                description: "布拉格地標，兩側有30尊巴洛克雕像"
            },
            {
                icon: "fas fa-clock",
                title: "天文鐘",
                description: "中世紀天文鐘，每小時有機械人偶表演"
            },
            {
                icon: "fas fa-castle",
                title: "布拉格城堡",
                description: "世界上最大的古城堡，UNESCO世界遺產"
            }
        ],
        
        // 攻略建議
        guideTips: [
            "查理大橋清晨人最少，適合拍照",
            "布拉格城堡需要門票，建議提前購買",
            "可品嘗傳統捷克甜點Trdelník",
            "伏爾塔瓦河遊船值得體驗"
        ],
        
        // 注意事項
        precautions: [
            "布拉格遊客眾多，注意扒手",
            "查理大橋上注意隨身物品",
            "部分餐廳可能收取服務費",
            "紀念品注意品質和價格"
        ],
        
        // 飯店資訊
        hotel: {
            name: "布拉格市中心飯店",
            checkIn: "14:00",
            checkOut: "11:00",
            amenities: ["免費WiFi", "早餐", "健身房", "酒吧"],
            tips: [
                "布拉格老城區石板路多，行李搬運不便",
                "飯店通常提供老城區地圖",
                "確認附近交通和景點位置"
            ]
        },
        
        // 天氣資訊
        weather: {
            temperature: "1-7°C",
            condition: "陰天",
            icon: "fas fa-cloud",
            tips: [
                "氣溫偏低，注意保暖",
                "可能會有雨，準備雨具",
                "室內暖氣充足，可穿脫方便的外套"
            ]
        },
        
        // 交通資訊
        transportation: [
            "市內交通：地鐵、電車、公車",
            "建議購買布拉格交通票",
            "老城區適合步行遊覽"
        ],
        
        // 照片參考
        photos: [
            "查理大橋日出",
            "布拉格城堡全景",
            "老城廣場天文鐘"
        ],
        
        // 完成狀態
        completed: false,
        completionTime: null
    },
    
    // 第5天：庫倫洛夫
    "cesky-krumlov-hotel": {
        id: "cesky-krumlov-hotel",
        day: 5,
        type: "hotel",
        title: "庫倫洛夫住宿",
        subtitle: "世界最美小鎮，捷克童話小鎮",
        icon: "fas fa-hotel",
        color: "#6a0dad",
        
        // 基本資訊
        location: "庫倫洛夫，捷克",
        coordinates: { lat: 48.8108, lng: 14.3150 },
        time: "晚上入住",
        duration: "住宿",
        
        // 詳細介紹
        description: "庫倫洛夫是捷克南波西米亞的童話小鎮，被伏爾塔瓦河環繞，完整保存了中世紀風貌，是UNESCO世界遺產。",
        
        // 特色亮點
        highlights: [
            {
                icon: "fas fa-fortress",
                title: "庫倫洛夫城堡",
                description: "捷克第二大城堡，俯瞰整個小鎮"
            },
            {
                icon: "fas fa-water",
                title: "伏爾塔瓦河",
                description: "河流環繞小鎮，可體驗划船或河畔漫步"
            },
            {
                icon: "fas fa-theater-masks",
                title: "旋轉劇場",
                description: "獨特的露天旋轉舞台，夏季有演出"
            }
        ],
        
        // 攻略建議
        guideTips: [
            "大巴無法進入城區，必須準備過夜包",
            "小鎮石板路多，不適合大行李箱",
            "清晨小鎮最美，遊客最少",
            "可品嘗當地蜂蜜酒和傳統糕點"
        ],
        
        // 注意事項
        precautions: [
            "庫倫洛夫特殊安排：行李放車上",
            "過夜包必備：換洗衣物、洗漱用品",
            "石板路注意安全，穿舒適鞋子",
            "小鎮商店關門較早，注意時間"
        ],
        
        // 飯店資訊
        hotel: {
            name: "庫倫洛夫特色旅館",
            checkIn: "15:00",
            checkOut: "10:00",
            amenities: ["免費WiFi", "早餐", "河景房", "餐廳"],
            tips: [
                "庫倫洛夫飯店多為傳統建築",
                "部分房間可能無電梯，搬運行李注意",
                "飯店通常提供小鎮地圖"
            ]
        },
        
        // 天氣資訊
        weather: {
            temperature: "0-6°C",
            condition: "晴朗",
            icon: "fas fa-sun",
            tips: [
                "早晚溫差大，注意保暖",
                "空氣清新，適合戶外活動",
                "紫外線中等，建議防曬"
            ]
        },
        
        // 交通資訊
        transportation: [
            "大巴停城外，步行進入小鎮",
            "小鎮內只能步行，無車輛",
            "注意集合時間和地點"
        ],
        
        // 照片參考
        photos: [
            "庫倫洛夫城堡全景",
            "伏爾塔瓦河彎道",
            "小鎮石板路街景"
        ],
        
        // 完成狀態
        completed: false,
        completionTime: null
    },
    
    // 第6天：國王湖
    "konigssee-sightseeing": {
        id: "konigssee-sightseeing",
        day: 6,
        type: "sightseeing",
        title: "國王湖",
        subtitle: "德國最美湖泊，阿爾卑斯山明珠",
        icon: "fas fa-mountain",
        color: "#ffd700",
        
        // 基本資訊
        location: "國王湖，德國",
        coordinates: { lat: 47.5591, lng: 12.9831 },
        time: "上午遊覽",
        duration: "4小時",
        
        // 詳細介紹
        description: "國王湖位於德國巴伐利亞州，被阿爾卑斯山環繞，湖水清澈見底，被譽為德國最美麗的湖泊。",
        
        // 特色亮點
        highlights: [
            {
                icon: "fas fa-ship",
                title: "電動船遊湖",
                description: "乘坐環保電動船，欣賞湖光山色"
            },
            {
                icon: "fas fa-trumpet",
                title: "回音壁表演",
                description: "船夫吹奏小號，聲音在山谷間迴盪"
            },
            {
                icon: "fas fa-church",
                title: "聖巴多羅買教堂",
                description: "湖邊的紅色洋蔥頂教堂，標誌性景點"
            }
        ],
        
        // 攻略建議
        guideTips: [
            "建議乘坐電動船到聖巴多羅買教堂",
            "船上回音壁表演不要錯過",
            "湖邊有步道，可近距離欣賞湖水",
            "可品嘗當地煙燻鱒魚"
        ],
        
        // 注意事項
        precautions: [
            "國王湖氣溫較低，注意保暖",
            "遊船時間較長，建議準備零食",
            "部分區域需要步行，穿舒適鞋子",
            "注意船班時間，避免錯過"
        ],
        
        // 飯店資訊（當天住宿）
        hotel: {
            name: "薩爾斯堡飯店",
            checkIn: "15:00",
            checkOut: "11:00",
            amenities: ["免費WiFi", "早餐", "停車場", "餐廳"],
            tips: [
                "從國王湖到薩爾斯堡車程約30分鐘",
                "辦理入住後可安排薩爾斯堡市區遊覽",
                "確認次日行程安排"
            ]
        },
        
        // 天氣資訊
        weather: {
            temperature: "-2-4°C",
            condition: "晴朗",
            icon: "fas fa-sun",
            tips: [
                "高山地區氣溫低，注意保暖",
                "紫外線強，建議防曬",
                "可能有風，準備防風外套"
            ]
        },
        
        // 交通資訊
        transportation: [
            "大巴前往：車程約1小時",
            "遊船碼頭：需要步行一段距離",
            "注意集合時間和地點"
        ],
        
        // 照片參考
        photos: [
            "國王湖全景",
            "聖巴多羅買教堂",
            "電動船遊湖"
        ],
        
        // 完成狀態
        completed: false,
        completionTime: null
    },
    
    // 第6天：薩爾斯堡住宿
    "salzburg-hotel": {
        id: "salzburg-hotel",
        day: 6,
        type: "hotel",
        title: "薩爾斯堡住宿",
        subtitle: "音樂神童莫札特的故鄉",
        icon: "fas fa-hotel",
        color: "#6a0dad",
        
        // 基本資訊
        location: "薩爾斯堡，奧地利",
        coordinates: { lat: 47.8095, lng: 13.0550 },
        time: "晚上入住",
        duration: "住宿",
        
        // 詳細介紹
        description: "薩爾斯堡是奧地利第四大城市，以巴洛克建築和音樂家莫札特聞名，也是電影《真善美》的拍攝地。",
        
        // 特色亮點
        highlights: [
            {
                icon: "fas fa-music",
                title: "莫札特故居",
                description: "音樂神童莫札特出生和成長的地方"
            },
            {
                icon: "fas fa-fortress",
                title: "薩爾斯堡要塞",
                description: "歐洲最大的中世紀城堡之一"
            },
            {
                icon: "fas fa-film",
                title: "真善美之旅",
                description: "追隨電影《真善美》的拍攝場景"
            }
        ],
        
        // 攻略建議
        guideTips: [
            "薩爾斯堡老城區適合步行遊覽",
            "可購買薩爾斯堡卡，包含景點門票和交通",
            "品嘗當地特色甜點薩爾斯堡蛋奶酥",
            "米拉貝爾花園是拍照好地點"
        ],
        
        // 注意事項
        precautions: [
            "薩爾斯堡遊客眾多，注意隨身物品",
            "部分景點需要門票，建議提前規劃",
            "晚上外出注意安全",
            "飯店可能收取城市稅"
        ],
        
        // 飯店資訊
        hotel: {
            name: "薩爾斯堡市中心飯店",
            checkIn: "15:00",
            checkOut: "11:00",
            amenities: ["免費WiFi", "早餐", "健身房", "停車場"],
            tips: [
                "確認飯店位置，方便次日行程",
                "詢問當地特色餐廳",
                "確認退房時間"
            ]
        },
        
        // 天氣資訊
        weather: {
            temperature: "0-6°C",
            condition: "晴朗",
            icon: "fas fa-sun",
            tips: [
                "氣溫舒適，適合戶外活動",
                "白天陽光充足，注意防曬",
                "夜晚較涼，準備外套"
            ]
        },
        
        // 交通資訊
        transportation: [
            "市內交通：公車",
            "老城區適合步行",
            "飯店通常提供旅遊資訊"
        ],
        
        // 照片參考
        photos: [
            "薩爾斯堡要塞夜景",
            "米拉貝爾花園",
            "莫札特故居"
        ],
        
        // 完成狀態
        completed: false,
        completionTime: null
    },
    
    // 第7天：哈修塔特
    "hallstatt-sightseeing": {
        id: "hallstatt-sightseeing",
        day: 7,
        type: "sightseeing",
        title: "哈修塔特",
        subtitle: "世界最美小鎮，奧地利明信片小鎮",
        icon: "fas fa-water",
        color: "#ffd700",
        
        // 基本資訊
        location: "哈修塔特，奧地利",
        coordinates: { lat: 47.5622, lng: 13.6493 },
        time: "上午遊覽",
        duration: "3小時",
        
        // 詳細介紹
        description: "哈修塔特是奧地利薩爾斯卡默古特地區的一個湖畔小鎮，被譽為『世界最美小鎮』，以湖光山色和鹽礦歷史聞名。",
        
        // 特色亮點
        highlights: [
            {
                icon: "fas fa-camera",
                title: "明信片角度",
                description: "小鎮湖邊的經典拍照角度"
            },
            {
                icon: "fas fa-mountain",
                title: "鹽礦體驗",
                description: "可參觀世界最古老的鹽礦"
            },
            {
                icon: "fas fa-church",
                title: "人骨教堂",
                description: "獨特的人骨裝飾教堂"
            }
        ],
        
        // 攻略建議
        guideTips: [
            "清晨小鎮最美，遊客最少",
            "可乘坐纜車上山參觀鹽礦",
            "湖邊步道適合散步拍照",
            "可品嘗當地湖魚料理"
        ],
        
        // 注意事項
        precautions: [
            "小鎮遊客眾多，注意安全",
            "部分景點需要門票",
            "石板路注意行走安全",
            "注意集合時間"
        ],
        
        // 飯店資訊（當天住宿）
        hotel: {
            name: "布達佩斯飯店",
            checkIn: "18:00",
            checkOut: "10:00",
            amenities: ["免費WiFi", "早餐", "健身房", "餐廳"],
            tips: [
                "從哈修塔特返回布達佩斯車程約4小時",
                "辦理入住後可安排晚餐",
                "確認次日行程"
            ]
        },
        
        // 天氣資訊
        weather: {
            temperature: "1-7°C",
            condition: "晴時多雲",
            icon: "fas fa-cloud-sun",
            tips: [
                "湖邊可能較涼，注意保暖",
                "陽光充足時適合拍照",
                "準備雨具以防天氣變化"
            ]
        },
        
        // 交通資訊
        transportation: [
            "大巴前往：車程約1小時",
            "小鎮內只能步行",
            "注意集合時間和地點"
        ],
        
        // 照片參考
        photos: [
            "哈修塔特湖景",
            "小鎮全景",
            "鹽礦纜車"
        ],
        
        // 完成狀態
        completed: false,
        completionTime: null
    },
    
    // 第8天：布達佩斯返回
    "budapest-return": {
        id: "budapest-return",
        day: 8,
        type: "hotel",
        title: "布達佩斯返回",
        subtitle: "旅程尾聲，準備返程",
        icon: "fas fa-plane-departure",
        color: "#6a0dad",
        
        // 基本資訊
        location: "布達佩斯，匈牙利",
        coordinates: { lat: 47.4979, lng: 19.0402 },
        time: "晚上入住",
        duration: "住宿",
        
        // 詳細介紹
        description: "返回布達佩斯，歐洲四國之旅接近尾聲。整理行李，準備次日返程。",
        
        // 特色亮點
        highlights: [
            {
                icon: "fas fa-shopping-bag",
                title: "最後採購",
                description: "購買匈牙利特色紀念品"
            },
            {
                icon: "fas fa-utensils",
                title: "告別晚餐",
                description: "品嘗最後的匈牙利美食"
            },
            {
                icon: "fas fa-suitcase",
                title: "行李整理",
                description: "整理行李，準備返程"
            }
        ],
        
        // 攻略建議
        guideTips: [
            "可前往中央市場購買紀念品",
            "整理行李時注意重量限制",
            "確認次日航班時間",
            "準備機場交通"
        ],
        
        // 注意事項
        precautions: [
            "注意航班時間，提前規劃",
            "行李整理注意禁運物品",
            "確認退稅辦理",
            "準備好護照和機票"
        ],
        
        // 飯店資訊
        hotel: {
            name: "布達佩斯機場附近飯店",
            checkIn: "18:00",
            checkOut: "06:00",
            amenities: ["免費WiFi", "早餐", "機場接送", "行李寄存"],
            tips: [
                "確認機場接送時間",
                "提前整理行李",
                "確認退房時間"
            ]
        },
        
        // 天氣資訊
        weather: {
            temperature: "4-11°C",
            condition: "多雲",
            icon: "fas fa-cloud",
            tips: [
                "氣溫舒適，適合最後的市區遊覽",
                "可能有小雨，準備雨具",
                "注意保暖"
            ]
        },
        
        // 交通資訊
        transportation: [
            "市區到機場：約30分鐘",
            "建議提前3小時抵達機場",
            "確認大巴接送時間"
        ],
        
        // 照片參考
        photos: [
            "布達佩斯夜景",
            "中央市場",
            "多瑙河畔"
        ],
        
        // 完成狀態
        completed: false,
        completionTime: null
    }
};

// 獲取某天的所有景點
function getAttractionsByDay(day) {
    const attractions = [];
    for (const id in attractionGuideData) {
        if (attractionGuideData[id].day === day) {
            attractions.push(attractionGuideData[id]);
        }
    }
    return attractions.sort((a, b) => {
        // 按類型排序：抵達 > 景點 > 住宿
        const order = { arrival: 0, sightseeing: 1, hotel: 2 };
        return order[a.type] - order[b.type];
    });
}

// 獲取所有景點
function getAllAttractions() {
    return Object.values(attractionGuideData).sort((a, b) => a.day - b.day);
}

// 更新景點完成狀態
function markAttractionCompleted(id) {
    if (attractionGuideData[id]) {
        attractionGuideData[id].completed = true;
        attractionGuideData[id].completionTime = new Date().toISOString();
        
        // 儲存到 localStorage
        saveCompletionStatus();
        return true;
    }
    return false;
}

// 取消完成狀態
function markAttractionIncomplete(id) {
    if (attractionGuideData[id]) {
        attractionGuideData[id].completed = false;
        attractionGuideData[id].completionTime = null;
        
        // 儲存到 localStorage
        saveCompletionStatus();
        return true;
    }
    return false;
}

// 儲存完成狀態
function saveCompletionStatus() {
    const completionData = {};
    for (const id in attractionGuideData) {
        if (attractionGuideData[id].completed) {
            completionData[id] = {
                completed: true,
                completionTime: attractionGuideData[id].completionTime
            };
        }
    }
    localStorage.setItem('attractionCompletion', JSON.stringify(completionData));
}

// 載入完成狀態
function loadCompletionStatus() {
    const savedData = localStorage.getItem('attractionCompletion');
    if (savedData) {
        const completionData = JSON.parse(savedData);
        for (const id in completionData) {
            if (attractionGuideData[id]) {
                attractionGuideData[id].completed = completionData[id].completed;
                attractionGuideData[id].completionTime = completionData[id].completionTime;
            }
        }
    }
}

// 獲取完成統計
function getCompletionStats() {
    const allAttractions = getAllAttractions();
    const completed = allAttractions.filter(a => a.completed).length;
    const total = allAttractions.length;
    
    return {
        completed,
        total,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
}

// 匯出數據
window.attractionGuideData = attractionGuideData;
window.getAttractionsByDay = getAttractionsByDay;
window.getAllAttractions = getAllAttractions;
window.markAttractionCompleted = markAttractionCompleted;
window.markAttractionIncomplete = markAttractionIncomplete;
window.getCompletionStats = getCompletionStats;

// 自動載入完成狀態
document.addEventListener('DOMContentLoaded', function() {
    loadCompletionStatus();
});