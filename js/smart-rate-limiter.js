// 智能觸發限流系統
class SmartRateLimiter {
    constructor() {
        // 基本設定
        this.config = {
            // 執行頻率控制（毫秒）
            execution: {
                minInterval: 1000,     // 最小執行間隔：1秒
                maxPerMinute: 30,      // 每分鐘最多執行次數
                maxPerHour: 300,       // 每小時最多執行次數
                burstLimit: 5,         // 突發執行最大次數
                burstWindow: 5000      // 突發時間窗口：5秒
            },
            
            // API呼叫限制
            api: {
                maxConcurrent: 3,      // 最大同時API呼叫數
                timeout: 10000,        // API超時時間：10秒
                retryCount: 2,         // 重試次數
                retryDelay: 1000        // 重試延遲：1秒
            },
            
            // 資源使用限制
            resources: {
                maxMemoryMB: 100,      // 最大記憶體使用：100MB
                maxCPUPct: 50,         // 最大CPU使用率：50%
                maxFileSizeMB: 10      // 最大檔案大小：10MB
            },
            
            // 觸發條件
            triggers: {
                // 基於時間的觸發
                timeBased: {
                    enabled: true,
                    intervals: [
                        { interval: 30000, label: '30秒檢查' },    // 30秒
                        { interval: 60000, label: '1分鐘檢查' },   // 1分鐘
                        { interval: 300000, label: '5分鐘檢查' }   // 5分鐘
                    ]
                },
                
                // 基於事件的觸發
                eventBased: {
                    enabled: true,
                    events: [
                        { event: 'user_input', priority: 'high' },
                        { event: 'system_alert', priority: 'critical' },
                        { event: 'scheduled_task', priority: 'medium' }
                    ]
                },
                
                // 基於負載的觸發
                loadBased: {
                    enabled: true,
                    thresholds: {
                        cpu: 70,      // CPU使用率超過70%時限制
                        memory: 80,   // 記憶體使用率超過80%時限制
                        connections: 10 // 連線數超過10時限制
                    }
                }
            }
        };
        
        // 狀態追蹤
        this.state = {
            lastExecution: 0,
            executionsThisMinute: 0,
            executionsThisHour: 0,
            burstCount: 0,
            burstStart: 0,
            currentConcurrent: 0,
            isThrottled: false,
            throttleReason: null
        };
        
        // 初始化時間追蹤
        this.resetCounters();
        
        console.log('🔧 智能觸發限流系統初始化完成');
    }
    
    // 重置計數器
    resetCounters() {
        const now = Date.now();
        const minute = Math.floor(now / 60000);
        const hour = Math.floor(now / 3600000);
        
        // 每分鐘重置
        if (minute !== Math.floor(this.state.lastExecution / 60000)) {
            this.state.executionsThisMinute = 0;
        }
        
        // 每小時重置
        if (hour !== Math.floor(this.state.lastExecution / 3600000)) {
            this.state.executionsThisHour = 0;
        }
        
        // 突發窗口重置
        if (now - this.state.burstStart > this.config.execution.burstWindow) {
            this.state.burstCount = 0;
            this.state.burstStart = now;
        }
    }
    
    // 檢查是否可以執行
    canExecute(options = {}) {
        const now = Date.now();
        const timeSinceLast = now - this.state.lastExecution;
        
        // 重置計數器
        this.resetCounters();
        
        // 檢查最小間隔
        if (timeSinceLast < this.config.execution.minInterval) {
            this.state.isThrottled = true;
            this.state.throttleReason = '執行間隔太短';
            return {
                allowed: false,
                reason: '執行間隔太短',
                waitTime: this.config.execution.minInterval - timeSinceLast,
                nextAllowed: now + (this.config.execution.minInterval - timeSinceLast)
            };
        }
        
        // 檢查每分鐘限制
        if (this.state.executionsThisMinute >= this.config.execution.maxPerMinute) {
            this.state.isThrottled = true;
            this.state.throttleReason = '每分鐘執行次數超限';
            return {
                allowed: false,
                reason: '每分鐘執行次數超限',
                waitTime: 60000 - (now % 60000),
                nextAllowed: now + (60000 - (now % 60000))
            };
        }
        
        // 檢查每小時限制
        if (this.state.executionsThisHour >= this.config.execution.maxPerHour) {
            this.state.isThrottled = true;
            this.state.throttleReason = '每小時執行次數超限';
            return {
                allowed: false,
                reason: '每小時執行次數超限',
                waitTime: 3600000 - (now % 3600000),
                nextAllowed: now + (3600000 - (now % 3600000))
            };
        }
        
        // 檢查突發限制
        if (this.state.burstCount >= this.config.execution.burstLimit) {
            this.state.isThrottled = true;
            this.state.throttleReason = '突發執行超限';
            return {
                allowed: false,
                reason: '突發執行超限',
                waitTime: this.config.execution.burstWindow - (now - this.state.burstStart),
                nextAllowed: now + (this.config.execution.burstWindow - (now - this.state.burstStart))
            };
        }
        
        // 檢查並發限制
        if (this.state.currentConcurrent >= this.config.api.maxConcurrent) {
            this.state.isThrottled = true;
            this.state.throttleReason = '同時執行數超限';
            return {
                allowed: false,
                reason: '同時執行數超限',
                waitTime: 1000,
                nextAllowed: now + 1000
            };
        }
        
        // 檢查系統負載
        if (this.config.triggers.loadBased.enabled) {
            const load = this.getSystemLoad();
            
            if (load.cpu > this.config.triggers.loadBased.thresholds.cpu) {
                return {
                    allowed: false,
                    reason: 'CPU使用率過高',
                    waitTime: 2000,
                    nextAllowed: now + 2000
                };
            }
            
            if (load.memory > this.config.triggers.loadBased.thresholds.memory) {
                return {
                    allowed: false,
                    reason: '記憶體使用率過高',
                    waitTime: 2000,
                    nextAllowed: now + 2000
                };
            }
        }
        
        // 所有檢查通過
        this.state.isThrottled = false;
        this.state.throttleReason = null;
        
        return {
            allowed: true,
            reason: '允許執行',
            waitTime: 0,
            nextAllowed: now
        };
    }
    
    // 記錄執行開始
    recordExecutionStart() {
        const now = Date.now();
        
        this.state.lastExecution = now;
        this.state.executionsThisMinute++;
        this.state.executionsThisHour++;
        this.state.burstCount++;
        this.state.currentConcurrent++;
        
        // 更新突發窗口
        if (now - this.state.burstStart > this.config.execution.burstWindow) {
            this.state.burstCount = 1;
            this.state.burstStart = now;
        }
        
        console.log(`📊 執行記錄：第${this.state.executionsThisMinute}次/分鐘，第${this.state.executionsThisHour}次/小時`);
    }
    
    // 記錄執行結束
    recordExecutionEnd() {
        this.state.currentConcurrent = Math.max(0, this.state.currentConcurrent - 1);
    }
    
    // 獲取系統負載
    getSystemLoad() {
        // 這裡應該使用實際的系統監控API
        // 目前返回模擬數據
        return {
            cpu: Math.random() * 100,
            memory: Math.random() * 100,
            connections: Math.floor(Math.random() * 20)
        };
    }
    
    // 動態調整限流設定
    adjustLimits(basedOn = 'load') {
        const load = this.getSystemLoad();
        
        switch (basedOn) {
            case 'load':
                // 根據負載動態調整
                if (load.cpu > 80) {
                    // 高負載時降低頻率
                    this.config.execution.minInterval = 2000;
                    this.config.execution.maxPerMinute = 15;
                } else if (load.cpu < 30) {
                    // 低負載時提高頻率
                    this.config.execution.minInterval = 500;
                    this.config.execution.maxPerMinute = 60;
                } else {
                    // 正常負載
                    this.config.execution.minInterval = 1000;
                    this.config.execution.maxPerMinute = 30;
                }
                break;
                
            case 'time':
                // 根據時間調整
                const hour = new Date().getHours();
                if (hour >= 0 && hour < 6) {
                    // 深夜時段降低頻率
                    this.config.execution.minInterval = 3000;
                } else if (hour >= 9 && hour < 18) {
                    // 工作時間提高頻率
                    this.config.execution.minInterval = 500;
                }
                break;
                
            case 'priority':
                // 根據優先級調整
                // 高優先級任務可以突破限制
                this.config.execution.burstLimit = 10;
                break;
        }
        
        console.log(`⚙️ 限流設定已調整：最小間隔=${this.config.execution.minInterval}ms，每分鐘限制=${this.config.execution.maxPerMinute}`);
    }
    
    // 獲取當前狀態
    getStatus() {
        return {
            config: this.config,
            state: this.state,
            load: this.getSystemLoad(),
            canExecute: this.canExecute()
        };
    }
    
    // 設置自定義限制
    setCustomLimits(limits) {
        Object.assign(this.config.execution, limits);
        console.log('✅ 自定義限制已設置：', limits);
    }
    
    // 重置為預設值
    resetToDefaults() {
        this.config.execution = {
            minInterval: 1000,
            maxPerMinute: 30,
            maxPerHour: 300,
            burstLimit: 5,
            burstWindow: 5000
        };
        console.log('🔄 已重置為預設限制');
    }
}

// 創建全局實例
window.smartRateLimiter = new SmartRateLimiter();

// 提供調試功能
window.debugRateLimiter = function() {
    const status = window.smartRateLimiter.getStatus();
    console.log('🔍 限流系統狀態：', status);
    
    // 顯示在控制台
    console.table({
        '最小執行間隔': `${status.config.execution.minInterval}ms`,
        '每分鐘限制': status.config.execution.maxPerMinute,
        '每小時限制': status.config.execution.maxPerHour,
        '突發限制': status.config.execution.burstLimit,
        '當前執行次數/分鐘': status.state.executionsThisMinute,
        '當前執行次數/小時': status.state.executionsThisHour,
        '是否被限流': status.state.isThrottled,
        '限流原因': status.state.throttleReason || '無',
        '系統負載': `${Math.round(status.load.cpu)}% CPU, ${Math.round(status.load.memory)}% 記憶體`
    });
    
    return status;
};