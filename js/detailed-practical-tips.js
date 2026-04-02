// 歐洲旅遊詳盡實用提醒資料庫
const detailedPracticalTips = {
    // 文件類提醒
    documents: {
        category: "📄 文件準備",
        title: "必備文件檢查清單",
        description: "旅行前必須準備和檢查的所有文件",
        tips: [
            {
                id: "passport",
                title: "護照檢查",
                details: [
                    "有效期至少6個月以上（從回程日期計算）",
                    "至少2頁空白簽證頁",
                    "護照個人資料頁影本（備用）",
                    "護照照片電子檔（備用）"
                ],
                importance: "critical",
                reminder: "出發前3天再次檢查"
            },
            {
                id: "visa",
                title: "簽證要求",
                details: [
                    "申根簽證（適用於奧地利、捷克、斯洛伐克、匈牙利）",
                    "簽證有效期確認",
                    "簽證類型確認（旅遊簽證）",
                    "簽證入境次數確認"
                ],
                importance: "critical",
                reminder: "確認簽證在整個行程期間有效"
            },
            {
                id: "tickets",
                title: "機票與行程單",
                details: [
                    "電子機票確認單（列印2份）",
                    "航班時刻表",
                    "轉機機場資訊",
                    "航空公司聯絡電話"
                ],
                importance: "high",
                reminder: "提前3小時到達機場"
            },
            {
                id: "hotel",
                title: "住宿確認",
                details: [
                    "所有酒店預訂確認單",
                    "酒店地址和聯絡方式",
                    "入住和退房時間",
                    "酒店設施確認"
                ],
                importance: "high",
                reminder: "將酒店資訊存入手機離線地圖"
            },
            {
                id: "insurance",
                title: "旅行保險",
                details: [
                    "旅行保險單（列印副本）",
                    "保險公司緊急聯絡電話",
                    "保險涵蓋範圍確認",
                    "理賠流程說明"
                ],
                importance: "high",
                reminder: "將保險單隨身攜帶"
            }
        ]
    },
    
    // 金錢類提醒
    money: {
        category: "💰 金錢管理",
        title: "貨幣與支付指南",
        description: "歐洲四國貨幣使用建議",
        tips: [
            {
                id: "currency",
                title: "貨幣準備",
                details: [
                    "歐元現金（建議300-500歐元）",
                    "準備小額現金（10、20、50歐元）",
                    "信用卡（Visa/Mastercard）",
                    "當地貨幣（捷克克朗、匈牙利福林）"
                ],
                importance: "high",
                reminder: "在機場或銀行兌換貨幣"
            },
            {
                id: "payment",
                title: "支付方式",
                details: [
                    "信用卡在大部分商店和餐廳可用",
                    "現金在小商店和市場常用",
                    "部分地方接受Apple Pay/Google Pay",
                    "準備小費現金（5-10%）"
                ],
                importance: "medium",
                reminder: "告知銀行旅行計劃避免信用卡被鎖"
            },
            {
                id: "atms",
                title: "ATM使用建議",
                details: [
                    "使用銀行ATM（避免獨立ATM）",
                    "注意ATM手續費",
                    "每日提款限額確認",
                    "保管好提款卡"
                ],
                importance: "medium",
                reminder: "在安全地方數錢"
            }
        ]
    },
    
    // 行李類提醒
    luggage: {
        category: "🧳 行李準備",
        title: "行李打包指南",
        description: "歐洲春季旅遊行李建議",
        tips: [
            {
                id: "clothing",
                title: "衣物準備",
                details: [
                    "春季溫度變化大（5-15°C）",
                    "洋蔥式穿法（多層次）",
                    "防水外套（必備）",
                    "舒適的步行鞋（非常重要）"
                ],
                importance: "high",
                reminder: "每天檢查天氣預報"
            },
            {
                id: "essentials",
                title: "必需品",
                details: [
                    "轉換插頭（歐規兩圓孔）",
                    "行動電源（10000mAh以上）",
                    "充電線（多備一條）",
                    "個人藥品（常用藥）"
                ],
                importance: "high",
                reminder: "將必需品放在隨身行李"
            },
            {
                id: "toiletries",
                title: "盥洗用品",
                details: [
                    "旅行裝洗髮精、沐浴乳",
                    "牙刷、牙膏",
                    "個人衛生用品",
                    "防曬乳、護唇膏"
                ],
                importance: "medium",
                reminder: "液體每瓶不超過100ml"
            }
        ]
    },
    
    // 健康類提醒
    health: {
        category: "🏥 健康與安全",
        title: "健康注意事項",
        description: "旅行期間健康與安全建議",
        tips: [
            {
                id: "medication",
                title: "藥品準備",
                details: [
                    "個人常用藥（足夠整個行程）",
                    "止痛藥、感冒藥",
                    "腸胃藥（水土不服）",
                    "暈車藥、暈機藥"
                ],
                importance: "high",
                reminder: "藥品保留原包裝和說明書"
            },
            {
                id: "vaccination",
                title: "疫苗與預防",
                details: [
                    "COVID-19疫苗證明（如需要）",
                    "一般旅遊疫苗確認",
                    "歐洲醫療卡（如有）",
                    "旅遊保險醫療資訊"
                ],
                importance: "medium",
                reminder: "了解當地緊急醫療電話"
            },
            {
                id: "hygiene",
                title: "衛生習慣",
                details: [
                    "勤洗手或使用消毒液",
                    "注意飲食衛生",
                    "飲用瓶裝水",
                    "注意食物新鮮度"
                ],
                importance: "medium",
                reminder: "隨身攜帶消毒濕紙巾"
            }
        ]
    },
    
    // 通訊類提醒
    communication: {
        category: "📱 通訊與網路",
        title: "通訊指南",
        description: "歐洲四國通訊與網路建議",
        tips: [
            {
                id: "simcard",
                title: "SIM卡選擇",
                details: [
                    "歐洲跨國SIM卡（推薦）",
                    "台灣電信公司漫遊方案",
                    "當地電信公司預付卡",
                    "eSIM選項（如有支援）"
                ],
                importance: "high",
                reminder: "出發前開通國際漫遊"
            },
            {
                id: "wifi",
                title: "Wi-Fi使用",
                details: [
                    "酒店Wi-Fi（通常免費）",
                    "餐廳和咖啡廳Wi-Fi",
                    "公共場所免費Wi-Fi",
                    "注意公共Wi-Fi安全性"
                ],
                importance: "medium",
                reminder: "重要操作使用VPN"
            },
            {
                id: "apps",
                title: "必備APP",
                details: [
                    "Google Maps（下載離線地圖）",
                    "翻譯APP（Google Translate）",
                    "交通APP（當地公共交通）",
                    "天氣APP"
                ],
                importance: "high",
                reminder: "出發前下載所有必要APP"
            }
        ]
    },
    
    // 交通類提醒
    transportation: {
        category: "🚗 交通指南",
        title: "歐洲交通建議",
        description: "四國交通方式與注意事項",
        tips: [
            {
                id: "airport",
                title: "機場交通",
                details: [
                    "提前確認機場接送",
                    "了解機場到酒店交通",
                    "準備當地交通卡",
                    "了解計程車費用"
                ],
                importance: "high",
                reminder: "保存司機聯絡方式"
            },
            {
                id: "public",
                title: "公共交通",
                details: [
                    "購買交通一日券或多日券",
                    "了解地鐵和公車路線",
                    "注意營運時間",
                    "保管好車票"
                ],
                importance: "medium",
                reminder: "準備硬幣購買車票"
            },
            {
                id: "safety",
                title: "交通安全",
                details: [
                    "注意扒手（特別在旅遊景點）",
                    "保管好貴重物品",
                    "避免夜間單獨外出",
                    "了解當地緊急電話"
                ],
                importance: "high",
                reminder: "將重要物品放在前口袋"
            }
        ]
    },
    
    // 文化類提醒
    culture: {
        category: "🎭 文化禮儀",
        title: "文化注意事項",
        description: "歐洲四國文化與禮儀",
        tips: [
            {
                id: "etiquette",
                title: "基本禮儀",
                details: [
                    "見面時握手（正式場合）",
                    "說「請」和「謝謝」",
                    "尊重排隊文化",
                    "保持適當距離"
                ],
                importance: "medium",
                reminder: "學習基本問候語"
            },
            {
                id: "dining",
                title: "用餐禮儀",
                details: [
                    "小費文化（5-10%）",
                    "用餐時不接電話",
                    "刀叉使用方式",
                    "用餐速度（較慢）"
                ],
                importance: "medium",
                reminder: "了解當地特色美食"
            },
            {
                id: "customs",
                title: "當地習俗",
                details: [
                    "參觀教堂時衣著端莊",
                    "拍照前徵求同意",
                    "尊重當地宗教習俗",
                    "了解節日和慶典"
                ],
                importance: "medium",
                reminder: "出發前了解當地文化"
            }
        ]
    },
    
    // 緊急類提醒
    emergency: {
        category: "🚨 緊急情況",
        title: "緊急處理指南",
        description: "緊急情況處理與聯絡",
        tips: [
            {
                id: "contacts",
                title: "緊急聯絡人",
                details: [
                    "台灣外交部緊急聯絡電話",
                    "當地台灣辦事處聯絡方式",
                    "旅行社緊急聯絡電話",
                    "導遊聯絡方式"
                ],
                importance: "critical",
                reminder: "將緊急聯絡方式存入手機"
            },
            {
                id: "numbers",
                title: "緊急電話",
                details: [
                    "歐洲緊急電話：112",
                    "當地警察電話",
                    "救護車電話",
                    "消防隊電話"
                ],
                importance: "critical",
                reminder: "將緊急電話設為快速撥號"
            },
            {
                id: "documents-copy",
                title: "文件備份",
                details: [
                    "護照影本（分開存放）",
                    "機票影本",
                    "保險單影本",
                    "信用卡影本"
                ],
                importance: "high",
                reminder: "將影本交給家人或朋友"
            }
        ]
    }
};

// 導出資料
window.detailedPracticalTips = detailedPracticalTips;