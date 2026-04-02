// 歐洲隨身導遊網站 - 通知系統
class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.maxNotifications = 5;
        this.autoDismissTime = 5000; // 5秒
        this.init();
    }
    
    init() {
        // 創建通知容器（如果不存在）
        if (!document.getElementById('notification-container')) {
            this.createContainer();
        }
        
        // 載入行程提醒
        this.loadItineraryReminders();
        
        // 設定定時提醒
        this.setupTimedReminders();
    }
    
    createContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 350px;
        `;
        
        document.body.appendChild(container);
    }
    
    // 載入行程提醒
    loadItineraryReminders() {
        const today = new Date('2026-04-01');
        const todayData = europeTourData.itinerary[0];
        
        // 今日重要提醒
        todayData.alerts.forEach(alert => {
            this.show({
                title: alert.title,
                message: alert.message,
                type: alert.type,
                icon: alert.icon,
                duration: 10000 // 10秒
            });
        });
        
        // 行程開始提醒
        this.show({
            title: '🎯 歐洲行程開始！',
            message: '今天是行程第一天，記得15:30在桃園機場第二航廈集合',
            type: 'important',
            icon: 'fas fa-plane',
            duration: 15000
        });
    }
    
    // 設定定時提醒
    setupTimedReminders() {
        // 每小時檢查行程
        setInterval(() => {
            this.checkUpcomingEvents();
        }, 3600000); // 每小時檢查一次
        
        // 每日早上提醒
        this.scheduleDailyReminder();
    }
    
    // 檢查即將到來的事件
    checkUpcomingEvents() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        // 檢查今日行程
        const todayData = europeTourData.itinerary[0];
        todayData.timeline.forEach(event => {
            const eventTime = event.time;
            const [hours, minutes] = eventTime.split(':').map(Number);
            
            // 提前30分鐘提醒
            if (hours === currentHour && minutes - currentMinute === 30) {
                this.show({
                    title: `⏰ 即將開始：${event.title}`,
                    message: `30分鐘後開始：${event.description}`,
                    type: 'info',
                    icon: event.icon,
                    duration: 10000
                });
            }
            
            // 提前5分鐘提醒
            if (hours === currentHour && minutes - currentMinute === 5) {
                this.show({
                    title: `🔔 即將開始：${event.title}`,
                    message: `5分鐘後開始，請準備！`,
                    type: 'warning',
                    icon: event.icon,
                    duration: 5000
                });
            }
        });
    }
    
    // 安排每日提醒
    scheduleDailyReminder() {
        // 每天早上8點發送今日行程提醒
        const now = new Date();
        const targetTime = new Date(now);
        targetTime.setHours(8, 0, 0, 0);
        
        if (now > targetTime) {
            targetTime.setDate(targetTime.getDate() + 1);
        }
        
        const timeUntilTarget = targetTime - now;
        
        setTimeout(() => {
            this.sendDailyReminder();
            // 設定下一次提醒（24小時後）
            setInterval(() => this.sendDailyReminder(), 86400000);
        }, timeUntilTarget);
    }
    
    // 發送每日提醒
    sendDailyReminder() {
        const todayData = europeTourData.itinerary[0];
        
        this.show({
            title: '🌅 早安！今日歐洲行程',
            message: `今天行程：${todayData.title}`,
            type: 'info',
            icon: 'fas fa-sun',
            duration: 10000
        });
        
        // 發送今日重要提醒
        const importantAlerts = todayData.alerts.filter(a => a.type === 'important');
        if (importantAlerts.length > 0) {
            setTimeout(() => {
                importantAlerts.forEach(alert => {
                    this.show({
                        title: alert.title,
                        message: alert.message,
                        type: 'important',
                        icon: alert.icon,
                        duration: 15000
                    });
                });
            }, 2000);
        }
    }
    
    // 顯示通知
    show(options) {
        const {
            title,
            message,
            type = 'info',
            icon = 'fas fa-info-circle',
            duration = this.autoDismissTime
        } = options;
        
        // 限制通知數量
        if (this.notifications.length >= this.maxNotifications) {
            const oldest = this.notifications.shift();
            oldest?.remove();
        }
        
        // 創建通知元素
        const notification = this.createNotification(title, message, type, icon);
        const container = document.getElementById('notification-container') || this.createContainer();
        
        container.appendChild(notification);
        this.notifications.push(notification);
        
        // 動畫顯示
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // 自動關閉
        if (duration > 0) {
            setTimeout(() => {
                this.dismiss(notification);
            }, duration);
        }
        
        return notification;
    }
    
    // 創建通知元素
    createNotification(title, message, type, icon) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            background: white;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border-left: 4px solid;
            border-left-color: ${this.getTypeColor(type)};
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 350px;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="color: ${this.getTypeColor(type)}; font-size: 1.2em; margin-top: 2px;">
                    <i class="${icon}"></i>
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: 600; margin-bottom: 4px; color: #333;">${title}</div>
                    <div style="color: #666; font-size: 0.9em;">${message}</div>
                </div>
                <button class="notification-close" style="
                    background: none;
                    border: none;
                    font-size: 1.2em;
                    color: #999;
                    cursor: pointer;
                    padding: 0;
                    line-height: 1;
                ">&times;</button>
            </div>
        `;
        
        // 關閉按鈕事件
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.dismiss(notification);
        });
        
        return notification;
    }
    
    // 關閉通知
    dismiss(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
            this.notifications = this.notifications.filter(n => n !== notification);
        }, 300);
    }
    
    // 獲取類型顏色
    getTypeColor(type) {
        const colors = {
            success: '#4CAF50',
            warning: '#FF9800',
            error: '#F44336',
            info: '#2196F3',
            important: '#9C27B0'
        };
        return colors[type] || colors.info;
    }
    
    // 顯示簡單通知（兼容舊系統）
    static showSimple(message, type = 'info') {
        const system = window.notificationSystem || new NotificationSystem();
        return system.show({
            title: type === 'success' ? '成功' : 
                  type === 'warning' ? '警告' : 
                  type === 'error' ? '錯誤' : '資訊',
            message: message,
            type: type
        });
    }
}

// 初始化通知系統
window.notificationSystem = new NotificationSystem();

// 全局通知函數
window.showNotification = NotificationSystem.showSimple;