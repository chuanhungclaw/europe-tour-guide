// 版本管理系統
const versionManager = {
    // 版本歷史
    versions: [
        {
            id: 'v1.0',
            name: '基礎版本',
            date: '2026-03-31',
            description: '初始網站版本，包含基本功能',
            features: ['今日行程', '完整行程', '互動地圖', '實用提醒', '檢查清單']
        },
        {
            id: 'v1.1',
            name: '日期自動切換',
            date: '2026-03-31',
            description: '添加日期自動計算與切換功能',
            features: ['智能日期計算', '行程自動更新', '實時時間顯示']
        },
        {
            id: 'v1.2',
            name: '景點攻略系統',
            date: '2026-03-31',
            description: '完整景點攻略與完成追蹤',
            features: ['詳細攻略', '注意事項', '飯店資訊', '天氣情況', '完成追蹤']
        },
        {
            id: 'v1.3',
            name: '雙時區時間顯示',
            date: '2026-03-31',
            description: '當地時間與台北時間對照',
            features: ['當地時間', '台北時間', '實時更新', '24小時制']
        },
        {
            id: 'v1.4',
            name: '極致壓縮導航欄',
            date: '2026-03-31',
            description: '導航欄高度壓縮到30px',
            features: ['極致壓縮', '兩行佈局', '清晰可讀']
        }
    ],
    
    // 當前版本
    currentVersion: 'v1.4',
    
    // 初始化
    init() {
        console.log('🚀 版本管理系統初始化...');
        
        // 創建版本管理界面
        this.createVersionUI();
        
        // 顯示當前版本
        this.showCurrentVersion();
        
        console.log('✅ 版本管理系統初始化完成');
    },
    
    // 創建版本管理界面
    createVersionUI() {
        // 檢查是否已存在
        // 創建版本按鈕
        // 創建版本面板

        // 組裝界面

        // 設定事件監聽

        // 初始化完成
    },
    
    // 顯示當前版本
    showCurrentVersion() {
        const currentVersion = this.versions.find(v => v.id === this.currentVersion);
        
        if (currentVersion) {
            console.log(`📱 當前版本: ${currentVersion.name} (${currentVersion.id})`);
            console.log(`📅 發布日期: ${currentVersion.date}`);
            console.log(`📝 版本描述: ${currentVersion.description}`);
            console.log(`✨ 功能特色: ${currentVersion.features.join(', ')}`);
        }
    },
    
    // 獲取版本信息
    getVersionInfo(versionId) {
        return this.versions.find(v => v.id === versionId) || null;
    },
    
    // 切換版本
    switchVersion(versionId) {
        const targetVersion = this.getVersionInfo(versionId);
        
        if (!targetVersion) {
            console.error(`❌ 找不到版本: ${versionId}`);
            return false;
        }
        
        console.log(`🔄 切換到版本: ${targetVersion.name} (${targetVersion.id})`);
        
        // 更新當前版本
        this.currentVersion = versionId;
        
        // 儲存到 localStorage
        localStorage.setItem('currentVersion', versionId);
        
        // 顯示版本信息
        this.showCurrentVersion();
        
        // 觸發版本切換事件
        this.onVersionSwitch(targetVersion);
        
        return true;
    },
    
    // 版本切換事件處理
    onVersionSwitch(version) {
        console.log(`🎉 已切換到 ${version.name}`);
        
        // 根據版本執行不同的初始化
        switch (version.id) {
            case 'v1.0':
                this.initVersion1_0();
                break;
            case 'v1.1':
                this.initVersion1_1();
                break;
            case 'v1.2':
                this.initVersion1_2();
                break;
            case 'v1.3':
                this.initVersion1_3();
                break;
            case 'v1.4':
                this.initVersion1_4();
                break;
            default:
                console.warn(`⚠️ 未知版本: ${version.id}`);
        }
    },
    
    // 版本初始化函數
    initVersion1_0() {
        console.log('🔄 初始化 v1.0 版本...');
        // 基礎功能初始化
    },
    
    initVersion1_1() {
        console.log('🔄 初始化 v1.1 版本...');
        // 日期自動切換功能
    },
    
    initVersion1_2() {
        console.log('🔄 初始化 v1.2 版本...');
        // 景點攻略系統
    },
    
    initVersion1_3() {
        console.log('🔄 初始化 v1.3 版本...');
        // 雙時區時間顯示
    },
    
    initVersion1_4() {
        console.log('🔄 初始化 v1.4 版本...');
        // 極致壓縮導航欄
    },
    
    // 獲取版本列表
    getVersionList() {
        return this.versions.map(v => ({
            id: v.id,
            name: v.name,
            date: v.date
        }));
    },
    
    // 比較版本
    compareVersions(versionId1, versionId2) {
        const v1 = this.getVersionInfo(versionId1);
        const v2 = this.getVersionInfo(versionId2);
        
        if (!v1 || !v2) {
            return null;
        }
        
        return {
            added: v2.features.filter(f => !v1.features.includes(f)),
            removed: v1.features.filter(f => !v2.features.includes(f)),
            common: v1.features.filter(f => v2.features.includes(f))
        };
    },
    
    // 版本升級建議
    getUpgradeSuggestion() {
        const current = this.getVersionInfo(this.currentVersion);
        const latest = this.versions[this.versions.length - 1];
        
        if (current.id === latest.id) {
            return '🎉 你已使用最新版本！';
        }
        
        const comparison = this.compareVersions(current.id, latest.id);
        
        return {
            from: current.name,
            to: latest.name,
            newFeatures: comparison.added,
            recommendation: `建議升級到 ${latest.name} 版本，新增 ${comparison.added.length} 項功能`
        };
    },
    
    // 版本日誌
    getVersionLog() {
        return this.versions.map(v => ({
            version: v.id,
            date: v.date,
            name: v.name,
            description: v.description,
            features: v.features
        }));
    },
    
    // 檢查版本更新
    checkForUpdates() {
        const currentIndex = this.versions.findIndex(v => v.id === this.currentVersion);
        const latestIndex = this.versions.length - 1;
        
        if (currentIndex < latestIndex) {
            const newVersions = this.versions.slice(currentIndex + 1);
            return {
                hasUpdate: true,
                newVersions: newVersions,
                latestVersion: this.versions[latestIndex]
            };
        }
        
        return { hasUpdate: false };
    }
};

// 初始化函數
window.initVersionManager = function() {
    versionManager.init();
};

// 自動初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        versionManager.init();
    });
} else {
    versionManager.init();
}