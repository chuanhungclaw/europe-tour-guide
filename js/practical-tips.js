// 歐洲行程實用提醒數據
const practicalTipsData = {
    // 行李準備提醒
    luggage: {
        title: "🧳 行李準備",
        tips: [
            {
                icon: "fas fa-suitcase-rolling",
                title: "過夜包必備",
                description: "庫倫洛夫小鎮大巴無法進入，必須準備過夜包，只帶必需品",
                important: true
            },
            {
                icon: "fas fa-kettle",
                title: "煮水壺最重要",
                description: "歐洲飯店常無提供，自帶煮水壺可泡麵、喝熱水，絕對必備",
                important: true
            },
            {
                icon: "fas fa-shoe-prints",
                title: "舒適鞋子",
                description: "石板路多，不適合大行李箱，準備2雙舒適鞋子輪流穿",
                important: true
            },
            {
                icon: "fas fa-tshirt",
                title: "多層次穿搭",
                description: "氣溫0-14°C，車上有暖氣，避免套頭毛衣，方便穿脫",
                important: false
            },
            {
                icon: "fas fa-layer-group",
                title: "行李分層",
                description: "大巴行李艙在下層，隨身物品在上層，拿取方便",
                important: false
            }
        ]
    },
    
    // 飲食建議
    food: {
        title: "🍽️ 飲食建議",
        tips: [
            {
                icon: "fas fa-utensils",
                title: "當地特色必嘗",
                description: "維也納炸豬排、捷克烤鴨、匈牙利牛肉湯，體驗當地美食文化",
                important: true
            },
            {
                icon: "fas fa-carrot",
                title: "飲食適應",
                description: "歐洲飲食偏重口味，準備腸胃藥，適應期可能不適",
                important: false
            },
            {
                icon: "fas fa-coffee",
                title: "早餐簡單",
                description: "歐洲早餐較簡單，可自備零食補充能量",
                important: false
            },
            {
                icon: "fas fa-wine-bottle",
                title: "飲水建議",
                description: "自備水壺，餐廳水需付費，可自帶茶包或咖啡",
                important: false
            },
            {
                icon: "fas fa-bread-slice",
                title: "泡麵必備",
                description: "配合煮水壺，準備泡麵，晚餐後可補充",
                important: false
            }
        ]
    },
    
    // 金錢與支付
    money: {
        title: "💰 金錢與支付",
        tips: [
            {
                icon: "fas fa-euro-sign",
                title: "小額歐元現金",
                description: "準備零錢用於小費、廁所、小額支付，方便使用",
                important: true
            },
            {
                icon: "fas fa-credit-card",
                title: "刷卡設定",
                description: "刷卡時選擇當地幣別，避免匯率損失",
                important: true
            },
            {
                icon: "fas fa-receipt",
                title: "退稅辦理",
                description: "最後一國（匈牙利）辦理退稅，保留發票",
                important: false
            },
            {
                icon: "fas fa-money-check-alt",
                title: "防盜措施",
                description: "使用防盜腰包，分散現金，避免損失",
                important: false
            }
        ]
    },
    
    // 健康與安全
    health: {
        title: "🏥 健康與安全",
        tips: [
            {
                icon: "fas fa-heartbeat",
                title: "個人藥品",
                description: "常用藥品隨身攜帶，準備腸胃藥、感冒藥等",
                important: true
            },
            {
                icon: "fas fa-sun",
                title: "防曬保濕",
                description: "歐洲氣候乾燥，準備滋潤型乳液和防曬乳",
                important: false
            },
            {
                icon: "fas fa-walking",
                title: "體力管理",
                description: "行程緊湊，適時休息，補充水分",
                important: false
            },
            {
                icon: "fas fa-hand-sparkles",
                title: "衛生習慣",
                description: "準備濕紙巾、洗手液，注意個人衛生",
                important: false
            }
        ]
    },
    
    // 拍照技巧
    photography: {
        title: "📸 拍照技巧",
        tips: [
            {
                icon: "fas fa-camera",
                title: "清晨拍照",
                description: "光線柔和，遊客最少，拍照最佳時機",
                important: true
            },
            {
                icon: "fas fa-sun",
                title: "金色時刻",
                description: "傍晚日落前一小時，建築光線最美",
                important: false
            },
            {
                icon: "fas fa-cloud-sun",
                title: "陰天優勢",
                description: "陰天光線均勻，適合拍建築細節",
                important: false
            },
            {
                icon: "fas fa-battery-full",
                title: "電池準備",
                description: "多備記憶卡和電池，歐洲充電不便",
               important: false
            }
        ]
    },
    
    // 文化禮儀
    culture: {
        title: "🎭 文化禮儀",
        tips: [
            {
                icon: "fas fa-church",
                title: "教堂禮儀",
                description: "進入教堂穿著端莊，避免無袖短褲，保持安靜",
                important: true
            },
            {
                icon: "fas fa-users",
                title: "餐廳禮儀",
                description: "歐洲餐廳用餐時間較長，尊重當地習慣",
                important: false
            },
            {
                icon: "fas fa-handshake",
                title: "小費文化",
                description: "餐廳約5-10%小費，尊重服務人員",
                important: false
            },
            {
                icon: "fas fa-clock",
                title: "時間觀念",
                description: "歐洲人重視準時，避免遲到",
                important: false
            }
        ]
    },
    
    // 交通與移動
    transportation: {
        title: "🚌 交通與移動",
        tips: [
            {
                icon: "fas fa-bus",
                title: "大巴安排",
                description: "嚴格遵守工時規定，準時集合，避免延誤",
                important: true
            },
            {
                icon: "fas fa-walking",
                title:  "石板路準備",
                description: "小鎮石板路多，不適合大行李箱，簡化行李",
                important: true
            },
            {
                icon: "fas fa-luggage-cart",
                title: "行李轉運",
                description: "大巴無法進入庫倫洛夫城區，準備過夜包",
                important: true
            },
            {
                icon: "fas fa-map-marked-alt",
                title: "集合地點",
                description: "記住飯店地址電話，隨身攜帶，方便聯繫",
                important: false
            }
        ]
    },
    
    // 特殊提醒
    special: {
        title: "⚠️ 特殊提醒",
        tips: [
            {
                icon: "fas fa-exclamation-triangle",
                title: "庫倫洛夫特殊安排",
                description: "大巴無法進入城區，行李放車上，只帶過夜包",
                important: true
            },
            {
                icon: "fas fa-water",
                title: "煮水壺必備",
                description: "歐洲飯店常無提供，自帶最重要",
                important: true
            },
            {
                icon: "fas fa-temperature-low",
                title: "氣溫提醒",
                description: "0-14°C偏冷，多層次穿搭，車上有暖氣",
                important: false
            },
            {
                icon: "fas fa-tshirt",
                title: "衣物建議",
                description: "穿一套帶一套，盡量簡化，石板路不便",
                important: false
            }
        ]
    }
};

// 獲取分類提醒
function getTipsByCategory(category) {
    return practicalTipsData[category] || {
        title: "📋 實用提醒",
        tips: [
            {
                icon: "fas fa-info-circle",
                title: "提醒",
                description: "準備好行李，享受歐洲之旅！",
                important: false
            }
        ]
    };
}

// 獲取所有重要提醒
function getImportantTips() {
    const importantTips = [];
    
    for (const category in practicalTipsData) {
        const categoryData = practicalTipsData[category];
        categoryData.tips.forEach(tip => {
            if (tip.important) {
                importantTips.push({
                    ...tip,
                    category: categoryData.title
                });
            }
        });
    }
    
    return importantTips;
}

// 獲取所有提醒
function getAllTips() {
    const allTips = [];
    
    for (const category in practicalTipsData) {
        const categoryData = practicalTipsData[category];
        categoryData.tips.forEach(tip => {
            allTips.push({
                ...tip,
                category: categoryData.title
            });
        });
    }
    
    return allTips;
}

// 匯出數據
window.practicalTipsData = practicalTipsData;
window.getTipsByCategory = getTipsByCategory;
window.getImportantTips = getImportantTips;
window.getAllTips = getAllTips;