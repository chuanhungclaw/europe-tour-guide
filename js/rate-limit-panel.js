// 限流控制面板
class RateLimitPanel {
    constructor() {
        this.panel = null;
        this.isExpanded = false;
        
        console.log('🛠️ 限流控制面板初始化...');
    }
    
    // 初始化
    init() {
        // 等待DOM載入
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createPanel());
        } else {
            this.createPanel();
        }
    }
    
    // 創建面板
    createPanel() {
        // 移除現有的面板
        const existingPanel = document.getElementById('rateLimitPanel');
        if (existingPanel) {
            existingPanel.remove();
        }
        
        // 創建面板HTML
        const panelHTML = `
            <div id="rateLimitPanel" class="rate-limit-panel collapsed">
                <div class="panel-header" onclick="window.rateLimitPanel.toggle()">
                    <h3 class="panel-title">
                        <i class="fas fa-tachometer-alt"></i>
                        執行頻率控制
                    </h3>
                    <button class="panel-toggle">
                        <i class="fas fa-chevron-up"></i>
                    </button>
                </div>
                
                <div class="panel-content">
                    <!-- 狀態指示器 -->
                    <div class="status-indicators">
                        <div class="status-item status-ok" id="statusRate">
                            <i class="fas fa-check-circle"></i>
                            <span class="status-label">執行狀態</span>
                            <span class="status-value" id="rateStatus">正常</span>
                        </div>
                        <div class="status-item status-ok" id="statusLoad">
                            <i class="fas fa-server"></i>
                            <span class="status-label">系統負載</span>
                            <span class="status-value" id="loadStatus">正常</span>
                        </div>
                    </div>
                    
                    <!-- 頻率控制 -->
                    <div class="frequency-control">
                        <h4 class="control-title">
                            <i class="fas fa-sliders-h"></i>
                            執行頻率設定
                        </h4>
                        <div class="frequency-buttons">
                            <button class="frequency-btn" data-frequency="high" onclick="window.rateLimitPanel.setFrequency('high')">
                                高頻率
                            </button>
                            <button class="frequency-btn active" data-frequency="medium" onclick="window.rateLimitPanel.setFrequency('medium')">
                                中頻率
                            </button>
                            <button class="frequency-btn" data-frequency="low" onclick="window.rateLimitPanel.setFrequency('low')">
                                低頻率
                            </button>
                            <button class="frequency-btn" data-frequency="veryLow" onclick="window.rateLimitPanel.setFrequency('veryLow')">
                                極低頻率
                            </button>
                        </div>
                    </div>
                    
                    <!-- 統計圖表 -->
                    <div class="stats-chart">
                        <h4 class="control-title">
                            <i class="fas fa-chart-bar"></i>
                            執行統計
                        </h4>
                        <div class="chart-container">
                            <div class="chart-bar">
                                <span class="chart-label">總次數</span>
                                <div class="chart-visual">
                                    <div class="chart-fill" id="chartTotal" style="height: 0%"></div>
                                </div>
                                <span class="chart-value" id="valueTotal">0</span>
                            </div>
                            <div class="chart-bar">
                                <span class="chart-label">最近1分鐘</span>
                                <div class="chart-visual">
                                    <div class="chart-fill" id="chartMinute" style="height: 0%"></div>
                                </div>
                                <span class="chart-value" id="valueMinute">0</span>
                            </div>
                            <div class="chart-bar">
                                <span class="chart-label">最近5分鐘</span>
                                <div class="chart-visual">
                                    <div class="chart-fill" id="chartFiveMin" style="height: 0%"></div>
                                </div>
                                <span class="chart-value" id="valueFiveMin">0</span>
                            </div>
                            <div class="chart-bar">
                                <span class="chart-label">最近1小時</span>
                                <div class="chart-visual">
                                    <div class="chart-fill" id="chartHour" style="height: 0%"></div>
                                </div>
                                <span class="chart-value" id="valueHour">0</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 控制按鈕 -->
                    <div class="control-buttons">
                        <button class="control-btn primary" onclick="window.rateLimitPanel.refreshStats()">
                            <i class="fas fa-sync-alt"></i>
                            更新統計
                        </button>
                        <button class="control-btn secondary" onclick="window.rateLimitPanel.resetLimits()">
                            <i class="fas fa-redo"></i>
                            重置限制
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // 添加到body
        document.body.insertAdjacentHTML('beforeend', panelHTML);
        
        this.panel = document.getElementById('rateLimitPanel');
        
        // 初始化狀態
        this.updateStatus();
        
        // 開始定期更新
        this.startAutoUpdate();
        
        console.log('✅ 限流控制面板創建完成');
    }
    
    // 切換面板展開/收合
    toggle() {
        this.isExpanded = !this.isExpanded;
        
        if (this.isExpanded) {
            this.panel.classList.remove('collapsed');
            this.panel.classList.add('expanded');
            this.panel.querySelector('.panel-toggle i').className = 'fas fa-chevron-down';
        } else {
            this.panel.classList.remove('expanded');
            this.panel.classList.add('collapsed');
            this.panel.querySelector('.panel-toggle i').className = 'fas fa-chevron-up';
        }
    }
    
    // 設置執行頻率
    setFrequency(frequencyType) {
        if (window.executionFrequencyController) {
            const config = window.executionFrequencyController.setFrequency(frequencyType);
            
            if (config) {
                // 更新按鈕狀態
                document.querySelectorAll('.frequency-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                const activeBtn = document.querySelector(`.frequency-btn[data-frequency="${frequencyType}"]`);
                if (activeBtn) {
                    activeBtn.classList.add('active');
                }
                
                // 顯示通知
                this.showNotification(`執行頻率設置為：${frequencyType} (${config.description})`);
                
                return config;
            }
        }
        return null;
    }
    
    // 更新狀態
    updateStatus() {
        if (!window.smartRateLimiter || !window.executionFrequencyController) {
            return;
        }
        
        // 獲取限流狀態
        const rateStatus = window.smartRateLimiter.canExecute();
        const frequencyConfig = window.executionFrequencyController.getCurrentConfig();
        const stats = window.executionFrequencyController.getStatistics();
        
        // 更新執行狀態
        const rateElement = document.getElementById('rateStatus');
        if (rateElement) {
            rateElement.textContent = rateStatus.allowed ? '正常' : '限流中';
            
            const statusItem = document.getElementById('statusRate');
            if (statusItem) {
                statusItem.className = rateStatus.allowed ? 
                    'status-item status-ok' : 'status-item status-error';
            }
        }
        
        // 更新系統負載
        const load = window.smartRateLimiter.getSystemLoad();
        const loadElement = document.getElementById('loadStatus');
        if (loadElement) {
            const cpuLoad = Math.round(load.cpu);
            loadElement.textContent = `${cpuLoad}%`;
            
            const statusItem = document.getElementById('statusLoad');
            if (statusItem) {
                if (cpuLoad > 80) {
                    statusItem.className = 'status-item status-error';
                } else if (cpuLoad > 60) {
                    statusItem.className = 'status-item status-warning';
                } else {
                    statusItem.className = 'status-item status-ok';
                }
            }
        }
        
        // 更新統計圖表
        this.updateCharts(stats);
    }
    
    // 更新圖表
    updateCharts(stats) {
        // 計算最大值的百分比
        const maxTotal = 1000;
        const maxMinute = 100;
        const maxFiveMin = 300;
        const maxHour = 1000;
        
        // 更新總次數
        const totalPercent = Math.min(100, (stats.total / maxTotal) * 100);
        document.getElementById('chartTotal').style.height = `${totalPercent}%`;
        document.getElementById('valueTotal').textContent = stats.total;
        
        // 更新最近1分鐘
        const minutePercent = Math.min(100, (stats.lastMinute / maxMinute) * 100);
        document.getElementById('chartMinute').style.height = `${minutePercent}%`;
        document.getElementById('valueMinute').textContent = stats.lastMinute;
        
        // 更新最近5分鐘
        const fiveMinPercent = Math.min(100, (stats.lastFiveMinutes / maxFiveMin) * 100);
        document.getElementById('chartFiveMin').style.height = `${fiveMinPercent}%`;
        document.getElementById('valueFiveMin').textContent = stats.lastFiveMinutes;
        
        // 更新最近1小時
        const hourPercent = Math.min(100, (stats.lastHour / maxHour) * 100);
        document.getElementById('chartHour').style.height = `${hourPercent}%`;
        document.getElementById('valueHour').textContent = stats.lastHour;
    }
    
    // 刷新統計
    refreshStats() {
        this.updateStatus();
        this.showNotification('統計數據已更新');
    }
    
    // 重置限制
    resetLimits() {
        if (window.smartRateLimiter) {
            window.smartRateLimiter.resetToDefaults();
            this.showNotification('限流設定已重置為預設值');
            this.updateStatus();
        }
    }
    
    // 開始自動更新
    startAutoUpdate() {
        // 每5秒更新一次狀態
        this.updateInterval = setInterval(() => {
            this.updateStatus();
        }, 5000);
    }
    
    // 停止自動更新
    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
    
    // 顯示通知
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                            type === 'error' ? 'exclamation-circle' : 
                            'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : 
                         type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10001;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // 3秒後移除
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// 創建全局實例
window.rateLimitPanel = new RateLimitPanel();

// 自動初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 DOM載入完成，初始化限流控制面板...');
    window.rateLimitPanel.init();
});

// 提供調試功能
window.debugRatePanel = function() {
    console.log('🔍 限流控制面板調試信息：');
    
    if (window.smartRateLimiter) {
        const rateStatus = window.smartRateLimiter.getStatus();
        console.log('智能限流狀態：', rateStatus);
    }
    
    if (window.executionFrequencyController) {
        const freqStats = window.executionFrequencyController.getStatistics();
        console.log('執行頻率統計：', freqStats);
    }
    
    return {
        rateLimiter: window.smartRateLimiter?.getStatus(),
        frequencyController: window.executionFrequencyController?.getStatistics()
    };
};