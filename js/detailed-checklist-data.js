// 詳盡檢查清單資料庫
const detailedChecklistData = {
    // 行前準備檢查清單
    preTrip: {
        category: "🛫 行前準備",
        title: "出發前必須完成的準備事項",
        description: "確保旅行順利進行的所有必要準備",
        items: [
            {
                id: "passport-check",
                title: "護照檢查與準備",
                details: [
                    "確認護照有效期至少6個月以上（從回程日期計算）",
                    "檢查護照是否有足夠空白頁（至少2頁）",
                    "準備護照影本2份（分開存放）",
                    "準備護照照片電子檔（備用）",
                    "確認護照個人資料無誤"
                ],
                importance: "critical",
                deadline: "出發前1個月",
                completed: false
            },
            {
                id: "visa-preparation",
                title: "簽證申請與確認",
                details: [
                    "確認是否需要申根簽證（奧地利、捷克、斯洛伐克、匈牙利）",
                    "檢查簽證申請所需文件清單",
                    "預約簽證申請時間（如需要）",
                    "確認簽證有效期涵蓋整個行程",
                    "列印簽證確認文件"
                ],
                importance: "critical",
                deadline: "出發前1個月",
                completed: false
            },
            {
                id: "flight-tickets",
                title: "機票確認與準備",
                details: [
                    "確認電子機票（列印2份）",
                    "檢查航班時刻表",
                    "確認轉機機場和時間",
                    "保存航空公司聯絡電話",
                    "確認行李限額和規定"
                ],
                importance: "high",
                deadline: "出發前2週",
                completed: false
            },
            {
                id: "accommodation",
                title: "住宿確認",
                details: [
                    "確認所有酒店預訂",
                    "列印酒店確認單",
                    "保存酒店地址和聯絡方式",
                    "確認入住和退房時間",
                    "確認酒店設施和服務"
                ],
                importance: "high",
                deadline: "出發前2週",
                completed: false
            },
            {
                id: "travel-insurance",
                title: "旅行保險",
                details: [
                    "購買旅行保險",
                    "確認保險涵蓋範圍",
                    "保存保險公司緊急聯絡電話",
                    "列印保險單（隨身攜帶）",
                    "了解理賠流程"
                ],
                importance: "high",
                deadline: "出發前1週",
                completed: false
            },
            {
                id: "money-preparation",
                title: "金錢準備",
                details: [
                    "兌換歐元現金（建議300-500歐元）",
                    "準備小額現金（10、20、50歐元）",
                    "確認信用卡可用（Visa/Mastercard）",
                    "告知銀行旅行計劃",
                    "準備當地貨幣（捷克克朗、匈牙利福林）"
                ],
                importance: "high",
                deadline: "出發前1週",
                completed: false
            }
        ]
    },
    
    // 行李打包檢查清單
    packing: {
        category: "🧳 行李打包",
        title: "行李物品詳細檢查清單",
        description: "確保攜帶所有必要物品",
        items: [
            {
                id: "documents-bag",
                title: "文件袋（隨身攜帶）",
                details: [
                    "護照原件 + 影本",
                    "簽證原件 + 影本",
                    "電子機票列印本",
                    "酒店預訂確認單",
                    "旅行保險單",
                    "國際駕照（如有需要）",
                    "信用卡影本",
                    "緊急聯絡人清單"
                ],
                importance: "critical",
                category: "documents",
                completed: false
            },
            {
                id: "clothing",
                title: "衣物準備（春季）",
                details: [
                    "保暖外套（防水）",
                    "毛衣或保暖上衣（2-3件）",
                    "長袖上衣（3-4件）",
                    "長褲（2-3條）",
                    "舒適步行鞋（非常重要）",
                    "備用鞋（輕便）",
                    "睡衣",
                    "內衣褲（足夠天數）",
                    "襪子（足夠天數）",
                    "帽子/圍巾/手套"
                ],
                importance: "high",
                category: "clothing",
                completed: false
            },
            {
                id: "toiletries",
                title: "盥洗用品",
                details: [
                    "牙刷、牙膏",
                    "洗髮精、沐浴乳（旅行裝）",
                    "刮鬍刀/除毛刀",
                    "梳子",
                    "個人衛生用品",
                    "防曬乳（SPF30+）",
                    "護唇膏",
                    "小毛巾",
                    "化妝品（如需要）"
                ],
                importance: "medium",
                category: "toiletries",
                completed: false
            },
            {
                id: "electronics",
                title: "電子產品",
                details: [
                    "手機 + 充電器",
                    "轉換插頭（歐規兩圓孔）",
                    "行動電源（10000mAh以上）",
                    "充電線（多備一條）",
                    "相機 + 記憶卡 + 充電器",
                    "耳機",
                    "電子書/平板（如需要）",
                    "旅行用延長線"
                ],
                importance: "high",
                category: "electronics",
                completed: false
            },
            {
                id: "medications",
                title: "藥品與健康",
                details: [
                    "個人常用藥（足夠整個行程）",
                    "止痛藥（普拿疼等）",
                    "感冒藥",
                    "腸胃藥（水土不服）",
                    "暈車藥/暈機藥",
                    "過敏藥",
                    "維他命",
                    "急救包（OK繃、消毒棉片）",
                    "口罩",
                    "消毒濕紙巾"
                ],
                importance: "high",
                category: "health",
                completed: false
            },
            {
                id: "accessories",
                title: "配件與其他",
                details: [
                    "太陽眼鏡",
                    "雨傘或雨衣",
                    "水壺",
                    "零食（長途飛行）",
                    "旅行枕",
                    "眼罩",
                    "耳塞",
                    "小鎖（行李用）",
                    "行李吊牌",
                    "環保袋（購物用）"
                ],
                importance: "medium",
                category: "accessories",
                completed: false
            }
        ]
    },
    
    // 最後檢查清單
    finalCheck: {
        category: "🔍 最後檢查",
        title: "出發前最後檢查事項",
        description: "出發當天必須確認的事項",
        items: [
            {
                id: "day-of-travel",
                title: "出發當天",
                details: [
                    "確認航班時間（提前3小時到達機場）",
                    "確認行李重量（不超重）",
                    "確認隨身行李符合規定",
                    "確認所有文件已帶齊",
                    "確認家中水電瓦斯已關閉",
                    "確認門窗已鎖好",
                    "確認寵物/植物安排妥當",
                    "確認郵件/報紙已暫停"
                ],
                importance: "critical",
                time: "出發前3小時",
                completed: false
            },
            {
                id: "airport-checklist",
                title: "機場流程",
                details: [
                    "辦理登機手續",
                    "托運行李",
                    "取得登機證",
                    "通過安全檢查",
                    "確認登機門和時間",
                    "購買免稅商品（如需要）",
                    "確認轉機資訊",
                    "保存登機證"
                ],
                importance: "high",
                time: "機場內",
                completed: false
            },
            {
                id: "in-flight",
                title: "飛行期間",
                details: [
                    "調整手錶時間（目的地時間）",
                    "補充水分",
                    "適度活動避免血栓",
                    "填寫入境表格",
                    "確認轉機流程",
                    "準備護照和簽證",
                    "確認當地天氣",
                    "複習行程安排"
                ],
                importance: "medium",
                time: "飛行中",
                completed: false
            }
        ]
    },
    
    // 目的地準備
    destinationPrep: {
        category: "🇪🇺 目的地準備",
        title: "抵達歐洲前準備",
        description: "適應歐洲環境的必要準備",
        items: [
            {
                id: "local-info",
                title: "當地資訊了解",
                details: [
                    "了解當地電壓（220V）和插座類型",
                    "了解當地緊急電話（112）",
                    "了解當地交通系統",
                    "了解當地貨幣和匯率",
                    "了解當地小費文化",
                    "了解當地基本禮儀",
                    "了解當地天氣預報",
                    "了解當地時差"
                ],
                importance: "high",
                completed: false
            },
            {
                id: "communication",
                title: "通訊準備",
                details: [
                    "開通國際漫遊或購買當地SIM卡",
                    "下載離線地圖（Google Maps）",
                    "下載翻譯APP（Google Translate）",
                    "下載交通APP",
                    "下載天氣APP",
                    "確認酒店Wi-Fi資訊",
                    "準備重要短語（當地語言）",
                    "保存導遊/旅行社聯絡方式"
                ],
                importance: "high",
                completed: false
            },
            {
                id: "safety",
                title: "安全準備",
                details: [
                    "了解當地治安狀況",
                    "了解扒手高風險區域",
                    "準備防盜腰包或貼身包",
                    "分散存放現金和卡片",
                    "了解當地醫療資源",
                    "保存台灣辦事處聯絡方式",
                    "了解當地法律規定",
                    "準備緊急逃生路線"
                ],
                importance: "high",
                completed: false
            }
        ]
    }
};

// 導出資料
window.detailedChecklistData = detailedChecklistData;