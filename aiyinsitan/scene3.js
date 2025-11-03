document.addEventListener('DOMContentLoaded', function() {
    // 获取URL参数中的用户名
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('name') || 'Anonymous';
    
    // 设置用户名到页面中
    document.getElementById('userName').textContent = userName;

    // 格式化当前时间（使用北京时区）
    const now = new Date();
    const options = {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const timeStr = now.toLocaleString('zh-CN', options)
        .replace(/\//g, '-')
        .replace(/,/g, '')
        .replace(/^(\d{4})-(\d{1})-/, '$1-0$2-')
        .replace(/-(\d{1})\s/, '-0$1 ');

    // 设置时间到页面中
    document.getElementById('transferTime').textContent = timeStr;

    // 页面加载时播放闪烁动画
    const flashOverlay = document.querySelector('.flash-overlay');
    flashOverlay.style.display = 'block';
    
    // 激活脑波动画
    const brainWaves = document.querySelectorAll('.brain-waves');
    brainWaves.forEach(wave => {
        wave.classList.add('active');
    });

    // 分享按钮功能
    setTimeout(function() {
        const shareButton = document.getElementById('shareBtn');
        
        if (shareButton) {
            shareButton.disabled = false;
            shareButton.style.pointerEvents = 'auto';
            shareButton.style.zIndex = '9999';
            
            shareButton.onclick = function() {
                createShareImage();
                return false;
            };
        }
    }, 500);
});

// 生成分享图片
function createShareImage() {
    const shareButton = document.querySelector('.share-button');
    const userName = document.getElementById('userName').textContent;
    const transferTime = document.getElementById('transferTime').textContent;
    
    try {
        // 更新按钮状态
        shareButton.innerHTML = '<span class="share-icon">⏳</span> 生成中...';
        shareButton.disabled = true;
        
        // 创建 Canvas
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 1200;
        const ctx = canvas.getContext('2d');
        
        // 绘制背景渐变
        const gradient = ctx.createLinearGradient(0, 0, 800, 1200);
        gradient.addColorStop(0, '#0B0B3B');
        gradient.addColorStop(0.5, '#1A1A4C');
        gradient.addColorStop(1, '#2D1B4E');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 800, 1200);
        
        // 绘制网格背景
        ctx.strokeStyle = 'rgba(74, 158, 255, 0.08)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 800; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 1200);
            ctx.stroke();
        }
        for (let i = 0; i < 1200; i += 40) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(800, i);
            ctx.stroke();
        }
        
        // 绘制装饰粒子
        const particles = [
            {x: 160, y: 120, size: 4},
            {x: 640, y: 360, size: 4},
            {x: 120, y: 720, size: 4},
            {x: 560, y: 960, size: 4},
            {x: 400, y: 540, size: 4}
        ];
        particles.forEach(p => {
            ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        
        // 绘制头部 - Logo
        ctx.font = 'bold 80px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(0, 150, 255, 0.8)';
        ctx.fillText('🧠', 400, 140);
        ctx.shadowBlur = 0;
        
        // 绘制标题
        ctx.font = 'bold 42px Microsoft YaHei, Arial';
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(0, 255, 255, 0.5)';
        ctx.fillText('爱因斯坦智慧传输证书', 400, 210);
        ctx.shadowBlur = 0;
        
        // 绘制头像占位符（左侧 - 爱因斯坦）
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.arc(200, 380, 90, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
        ctx.lineWidth = 4;
        ctx.shadowBlur = 30;
        ctx.shadowColor = 'rgba(0, 255, 255, 0.6)';
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // 绘制"智慧源"标签
        ctx.font = '20px Microsoft YaHei, Arial';
        ctx.fillStyle = '#00ffff';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
        ctx.fillText('智慧源', 200, 500);
        ctx.fillText('(爱因斯坦)', 200, 525);
        ctx.shadowBlur = 0;
        
        // 绘制箭头
        const arrowGradient = ctx.createLinearGradient(280, 380, 520, 380);
        arrowGradient.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
        arrowGradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.8)');
        arrowGradient.addColorStop(1, 'rgba(0, 255, 255, 0.3)');
        ctx.strokeStyle = arrowGradient;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(280, 380);
        ctx.lineTo(520, 380);
        ctx.stroke();
        
        // 箭头粒子
        ctx.font = '24px Arial';
        ctx.fillStyle = '#00ffff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
        ctx.fillText('⚡', 330, 388);
        ctx.fillText('⚡', 400, 388);
        ctx.fillText('⚡', 470, 388);
        ctx.shadowBlur = 0;
        
        // 箭头头部
        ctx.font = '40px Arial';
        ctx.fillStyle = '#00ffff';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
        ctx.fillText('➤', 530, 393);
        ctx.shadowBlur = 0;
        
        // 右侧圆形（用户）
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.arc(600, 380, 90, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
        ctx.lineWidth = 4;
        ctx.shadowBlur = 30;
        ctx.shadowColor = 'rgba(0, 255, 255, 0.6)';
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // 绘制"传输者"标签
        ctx.font = '20px Microsoft YaHei, Arial';
        ctx.fillStyle = '#00ffff';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
        ctx.fillText('传输者', 600, 500);
        ctx.fillText(`(${userName})`, 600, 525);
        ctx.shadowBlur = 0;
        
        // 绘制信息卡片背景
        ctx.fillStyle = 'rgba(0, 150, 255, 0.1)';
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(0, 255, 255, 0.2)';
        roundRect(ctx, 80, 550, 640, 180, 20, true, true);
        ctx.shadowBlur = 0;
        
        // 绘制信息内容
        ctx.font = '22px Microsoft YaHei, Arial';
        ctx.textAlign = 'left';
        
        // 第一行
        ctx.fillStyle = '#00ffff';
        ctx.fillText('🎯 接收者：', 120, 600);
        ctx.fillStyle = '#fff';
        ctx.fillText(userName, 280, 600);
        
        // 第二行
        ctx.fillStyle = '#00ffff';
        ctx.fillText('⏰ 传输时间：', 120, 650);
        ctx.fillStyle = '#fff';
        ctx.font = '18px Microsoft YaHei, Arial';
        ctx.fillText(transferTime, 280, 650);
        
        // 第三行
        ctx.font = '22px Microsoft YaHei, Arial';
        ctx.fillStyle = '#00ffff';
        ctx.fillText('💡 智慧等级：', 120, 700);
        ctx.fillStyle = '#fff';
        ctx.fillText('MAX ⭐⭐⭐⭐⭐', 280, 700);
        
        // 绘制引言框背景
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(80, 760, 640, 160);
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(80, 760);
        ctx.lineTo(80, 920);
        ctx.stroke();
        
        // 绘制引号
        ctx.font = '60px Georgia';
        ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.fillText('"', 100, 800);
        
        // 绘制引言文字
        ctx.font = 'italic 18px Microsoft YaHei, Arial';
        ctx.fillStyle = '#e0e0e0';
        ctx.textAlign = 'left';
        ctx.fillText('想象力比知识更重要，因为知识是有限的，', 120, 820);
        ctx.fillText('而想象力概括着世界上的一切。', 120, 850);
        
        // 绘制作者
        ctx.font = 'bold 18px Microsoft YaHei, Arial';
        ctx.fillStyle = '#00ffff';
        ctx.textAlign = 'right';
        ctx.fillText('— 阿尔伯特·爱因斯坦', 700, 890);
        
        // 绘制成功徽章
        ctx.fillStyle = '#00ff00';
        ctx.shadowBlur = 30;
        ctx.shadowColor = 'rgba(0, 255, 0, 0.6)';
        ctx.beginPath();
        ctx.arc(400, 1000, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // 绘制勾选图标
        ctx.font = 'bold 60px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText('✓', 400, 1020);
        
        // 绘制"传输成功"文字
        ctx.font = 'bold 28px Microsoft YaHei, Arial';
        ctx.fillStyle = '#00ff00';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(0, 255, 0, 0.6)';
        ctx.fillText('传输成功', 400, 1080);
        ctx.shadowBlur = 0;
        
        // 下载图片
        setTimeout(() => {
            try {
                const link = document.createElement('a');
                link.download = `爱因斯坦智慧传输证书-${userName}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                
                // 恢复按钮状态
                shareButton.innerHTML = '<span class="share-icon">✅</span> 已生成！';
                
                setTimeout(() => {
                    shareButton.innerHTML = '<span class="share-icon">🔗</span> 分享成果';
                    shareButton.disabled = false;
                }, 2000);
            } catch (error) {
                console.error('下载图片时出错:', error);
                shareButton.innerHTML = '<span class="share-icon">❌</span> 生成失败';
                setTimeout(() => {
                    shareButton.innerHTML = '<span class="share-icon">🔗</span> 分享成果';
                    shareButton.disabled = false;
                }, 2000);
            }
        }, 100);
        
    } catch (error) {
        console.error('生成图片时出错:', error);
        shareButton.innerHTML = '<span class="share-icon">❌</span> 生成失败';
        setTimeout(() => {
            shareButton.innerHTML = '<span class="share-icon">🔗</span> 分享成果';
            shareButton.disabled = false;
        }, 2000);
    }
}

// 圆角矩形辅助函数
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
}
