// 執行頻率控制器
class ExecutionFrequencyController {
    constructor() {
        // 頻率設定
        this.frequencies = {
            // 高頻率：即時響應
            high: {
                interval: 100,      // 100毫秒
                maxPerMinute: 600,  // 每分鐘600次
                priority: 'high',
                description: '即時響應（如用戶輸入）'
            },
            
            // 中頻率：常規操作
            medium: {
                interval: 1000,     // 1秒
                maxPerMinute: 60,   // 每分鐘60次
                priority: 'medium',
                description: '常規操作（如API呼叫）'
            },
            
            // 低頻率：後台任務
            low: {
                interval: 5000,     // 5秒
                maxPerMinute: 12,   // 每分鐘12次
                priority: 'low',
                description: '後台任務（如數據同步）'
            },
            
            // 極低頻率：定期檢查
            veryLow: {
                interval: 30000,    // 30秒
                maxPerMinute: 2,    // 每分鐘2次
                priority: 'low',
                description: '定期檢查（如心跳檢測）'
            },
            
            // 自定義頻率
            custom: {
                interval: 1000,     // 預設1秒
                maxPerMinute: 30,   // 預設每分鐘30次
                priority: 'medium',
                description: '自定義頻率'
            }
        };
        
        // 執行記錄
        this.executionLog = [];
        this.maxLogSize = 1000;
        
        // 當前設定
        this.currentFrequency = 'medium';
        
        console.log('🔄 執行頻率控制器初始化完成');
    }
    
    // 設置執行頻率
    setFrequency(frequencyType, customConfig = null) {
        if (this.frequencies[frequencyType]) {
            this.currentFrequency = frequencyType;
            
            if (customConfig) {
                Object.assign(this.frequencies.custom, customConfig);
                this.currentFrequency = 'custom';
            }
            
            const config = this.getCurrentConfig();
            console.log(`⚙️ 執行頻率設置為：${frequencyType} (${config.description})`);
            console.log(`  間隔：${config.interval}ms，每分鐘限制：${config.maxPerMinute}次`);
            
            return config;
        } else {
            console.error(`❌ 不支援的頻率類型：${frequencyType}`);
            return null;
        }
    }
    
    // 獲取當前設定
    getCurrentConfig() {
        return this.frequencies[this.currentFrequency];
    }
    
    // 檢查是否可以執行
    canExecuteNow() {
        const config = this.getCurrentConfig();
        const now = Date.now();
        
        // 清理過時的記錄
        this.cleanupOldLogs();
        
        // 檢查最近一分鐘的執行次數
        const recentExecutions = this.executionLog.filter(
            log => now - log.timestamp < 60000
        );
        
        if (recentExecutions.length >= config.maxPerMinute) {
            return {
                allowed: false,
                reason: `每分鐘執行次數超限（${recentExecutions.length}/${config.maxPerMinute}）`,
                waitTime: 60000 - (now - recentExecutions[0].timestamp),
                nextAllowed: now + (60000 - (now - recentExecutions[0].timestamp))
            };
        }
        
        // 檢查最小間隔
        if (this.executionLog.length > 0) {
            const lastExecution = this.executionLog[this.executionLog.length - 1];
            const timeSinceLast = now - lastExecution.timestamp;
            
            if (timeSinceLast < config.interval) {
                return {
                    allowed: false,
                    reason: `執行間隔太短（${timeSinceLast}/${config.interval}ms）`,
                    waitTime: config.interval - timeSinceLast,
                    nextAllowed: now + (config.interval - timeSinceLast)
                };
            }
        }
        
        return {
            allowed: true,
            reason: '允許執行',
            waitTime: 0,
            nextAllowed: now
        };
    }
    
    // 記錄執行
    recordExecution(taskName = '未命名任務') {
        const now = Date.now();
        const logEntry = {
            timestamp: now,
            task: taskName,
            frequency: this.currentFrequency
        };
        
        this.executionLog.push(logEntry);
        
        // 限制日誌大小
        if (this.executionLog.length > this.maxLogSize) {
            this.executionLog = this.executionLog.slice(-this.maxLogSize);
        }
        
        console.log(`📝 執行記錄：${taskName} @ ${new Date(now).toLocaleTimeString()}`);
    }
    
    // 清理過時記錄
    cleanupOldLogs() {
        const now = Date.now();
        const oneHourAgo = now - 3600000;
        
        this.executionLog = this.executionLog.filter(
            log => log.timestamp > oneHourAgo
        );
    }
    
    // 獲取執行統計
    getStatistics() {
        const now = Date.now();
        const oneMinuteAgo = now - 60000;
        const fiveMinutesAgo = now - 300000;
        const oneHourAgo = now - 3600000;
        
        const stats = {
            total: this.executionLog.length,
            lastMinute: this.executionLog.filter(log => log.timestamp > oneMinuteAgo).length,
            lastFiveMinutes: this.executionLog.filter(log => log.timestamp > fiveMinutesAgo).length,
            lastHour: this.executionLog.filter(log => log.timestamp > oneHourAgo).length,
            byFrequency: {}
        };
        
        // 按頻率分類統計
        Object.keys(this.frequencies).forEach(freq => {
            stats.byFrequency[freq] = this.executionLog.filter(
                log => log.frequency === freq
            ).length;
        });
        
        return stats;
    }
    
    // 動態調整頻率
    adjustFrequencyBasedOnLoad() {
        const stats = this.getStatistics();
        
        // 根據最近一分鐘的執行次數調整
        if (stats.lastMinute > 50) {
            // 高負載，降低頻率
            this.setFrequency('low');
            console.log('📉 檢測到高負載，降低執行頻率');
        } else if (stats.lastMinute < 10) {
            // 低負載，提高頻率
            this.setFrequency('high');
            console.log('📈 檢測到低負載，提高執行頻率');
        } else {
            // 正常負載，使用中頻率
            this.setFrequency('medium');
        }
    }
    
    // 創建定時執行器
    createScheduledExecutor(task, interval, options = {}) {
        const executor = {
            task: task,
            interval: interval,
            options: {
                immediate: options.immediate || false,
                maxRetries: options.maxRetries || 3,
                onError: options.onError || (() => {})
            },
            timer: null,
            isRunning: false,
            retryCount: 0
        };
        
        const executeTask = async () => {
            if (!executor.isRunning) return;
            
            const canExecute = this.canExecuteNow();
            
            if (canExecute.allowed) {
                try {
                    console.log(`⏰ 執行定時任務：${task.name || '匿名任務'}`);
                    await task();
                    executor.retryCount = 0; // 重置重試計數
                    this.recordExecution(task.name || '定時任務');
                } catch (error) {
                    console.error(`❌ 任務執行失敗：`, error);
                    executor.retryCount++;
                    
                    if (executor.retryCount <= executor.options.maxRetries) {
                        console.log(`🔄 重試 ${executor.retryCount}/${executor.options.maxRetries}`);
                        setTimeout(executeTask, 1000); // 1秒後重試
                    } else {
                        executor.options.onError(error);
                        console.error('❌ 達到最大重試次數，停止任務');
                    }
                }
            } else {
                console.log(`⏳ 任務被限流：${canExecute.reason}`);
                // 在允許的時間後重新嘗試
                setTimeout(executeTask, canExecute.waitTime);
                return;
            }
            
            // 安排下一次執行
            if (executor.isRunning) {
                executor.timer = setTimeout(executeTask, executor.interval);
            }
        };
        
        return {
            start: () => {
                if (executor.isRunning) {
                    console.log('⚠️ 任務已在執行中');
                    return;
                }
                
                executor.isRunning = true;
                console.log(`🚀 啟動定時任務，間隔：${interval}ms`);
                
                if (executor.options.immediate) {
                    executeTask();
                } else {
                    executor.timer = setTimeout(executeTask, interval);
                }
            },
            
            stop: () => {
                executor.isRunning = false;
                if (executor.timer) {
                    clearTimeout(executor.timer);
                    executor.timer = null;
                }
                console.log('🛑 停止定時任務');
            },
            
            updateInterval: (newInterval) => {
                executor.interval = newInterval;
                console.log(`⚙️ 更新執行間隔：${newInterval}ms`);
                
                if (executor.isRunning) {
                    executor.stop();
                    executor.start();
                }
            },
            
            getStatus: () => {
                return {
                    isRunning: executor.isRunning,
                    interval: executor.interval,
                    retryCount: executor.retryCount,
                    nextExecution: executor.timer ? Date.now() + executor.interval : null
                };
            }
        };
    }
    
    // 獲取頻率建議
    getFrequencySuggestion(taskType) {
        const suggestions = {
            'user_input': 'high',
            'api_call': 'medium',
            'data_sync': 'low',
            'heartbeat': 'veryLow',
            'background_task': 'low',
            'realtime_update': 'high'
        };
        
        return suggestions[taskType] || 'medium';
    }
}

// 創建全局實例
window.executionFrequencyController = new ExecutionFrequencyController();

// 提供調試功能
window.debugFrequencyController = function() {
    const controller = window.executionFrequencyController;
    const config = controller.getCurrentConfig();
    const stats = controller.getStatistics();
    const canExecute = controller.canExecuteNow();
    
    console.log('🔍 執行頻率控制器狀態：');
    console.table({
        '當前頻率': controller.currentFrequency,
        '描述': config.description,
        '執行間隔': `${config.interval}ms`,
        '每分鐘限制': config.maxPerMinute,
        '總執行次數': stats.total,
        '最近1分鐘': stats.lastMinute,
        '最近5分鐘': stats.lastFiveMinutes,
        '最近1小時': stats.lastHour,
        '是否可以執行': canExecute.allowed ? '✅ 是' : '❌ 否',
        '原因': canExecute.reason
    });
    
    // 顯示頻率分佈
    console.log('📊 頻率分佈：');
    Object.keys(stats.byFrequency).forEach(freq => {
        if (stats.byFrequency[freq] > 0) {
            console.log(`  ${freq}: ${stats.byFrequency[freq]} 次`);
        }
    });
    
    return {
        config,
        stats,
        canExecute
    };
};