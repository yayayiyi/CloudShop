document.addEventListener('DOMContentLoaded', function() {
    // 获取URL参数中的用户名
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('name') || 'Anonymous'; // 如果没有传入name参数，默认显示"Anonymous"
    
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
        .replace(/\//g, '-')           // 将日期中的/替换为-
        .replace(/,/g, '')             // 移除日期和时间之间的逗号
        .replace(/^(\d{4})-(\d{1})-/, '$1-0$2-')  // 处理单位数月份
        .replace(/-(\d{1})\s/, '-0$1 ');  // 处理单位数日期

    // 设置时间到页面中
    document.getElementById('transferTime').textContent = timeStr;
    // 同时设置分享卡片中的时间
    document.getElementById('shareTime').textContent = timeStr;
    // 设置分享卡片中的用户名
    document.getElementById('shareUserName').textContent = userName;

    // 页面加载时播放闪烁动画
    const flashOverlay = document.querySelector('.flash-overlay');
    flashOverlay.style.display = 'block';
    
    // 激活脑波动画
    const brainWaves = document.querySelectorAll('.brain-waves');
    brainWaves.forEach(wave => {
        wave.classList.add('active');
    });

    // 分享按钮功能
    const shareButton = document.querySelector('.share-button');
    if (shareButton) {
        console.log('分享按钮找到了');
        shareButton.addEventListener('click', function() {
            console.log('分享按钮被点击了！');
            // 创建分享图片
            createShareImage();
        });
    } else {
        console.error('找不到分享按钮');
    }
});

function createShareImage() {
    console.log('createShareImage 函数被调用了！');
    
    const shareButton = document.querySelector('.share-button');
    const userName = document.getElementById('userName').textContent;
    const transferTime = document.getElementById('transferTime').textContent;
    
    console.log('用户名:', userName);
    console.log('时间:', transferTime);
    
    // 更新按钮状态
    shareButton.innerHTML = '<span class="share-icon">⏳</span> 生成中...';
    shareButton.disabled = true;
    
    // 创建 Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
    
    console.log('Canvas 创建成功');
    
    // 绘制背景渐变
    const gradient = ctx.createLinearGradient(0, 0, 800, 1200);
    gradient.addColorStop(0, '#0B0B3B');
    gradient.addColorStop(0.5, '#1A1A4C');
    gradient.addColorStop(1, '#2D1B4E');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 1200);
    
    console.log('背景绘制完成');
    
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
    ctx.font = 'bold 42px Microsoft YaHei';
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(0, 255, 255, 0.5)';
    ctx.fillText('爱因斯坦智慧传输证书', 400, 210);
    ctx.shadowBlur = 0;
    
    // 加载并绘制图片
    let loadedImages = 0;
    const totalImages = 2;
    const einsteinImg = new Image();
    const userImg = new Image();
    
    einsteinImg.crossOrigin = 'anonymous';
    userImg.crossOrigin = 'anonymous';
    
    function checkImagesLoaded() {
        loadedImages++;
        if (loadedImages === totalImages) {
            drawImages();
        }
    }
    
    function drawImages() {
        // 绘制爱因斯坦头像（左侧）
        ctx.save();
        ctx.beginPath();
        ctx.arc(200, 380, 90, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(einsteinImg, 110, 290, 180, 180);
        ctx.restore();
        
        // 绘制头像边框
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
        ctx.lineWidth = 4;
        ctx.shadowBlur = 30;
        ctx.shadowColor = 'rgba(0, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(200, 380, 90, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // 绘制"智慧源"标签
        ctx.font = '20px Microsoft YaHei';
        ctx.fillStyle = '#00ffff';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
        ctx.fillText('智慧源', 200, 500);
        ctx.shadowBlur = 0;
        
        // 绘制箭头和粒子
        // 箭头线
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
        
        // 绘制用户头像（右侧）
        ctx.save();
        ctx.beginPath();
        ctx.arc(600, 380, 90, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(userImg, 510, 290, 180, 180);
        ctx.restore();
        
        // 绘制头像边框
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
        ctx.lineWidth = 4;
        ctx.shadowBlur = 30;
        ctx.shadowColor = 'rgba(0, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(600, 380, 90, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // 绘制"传输者"标签
        ctx.font = '20px Microsoft YaHei';
        ctx.fillStyle = '#00ffff';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
        ctx.fillText('传输者', 600, 500);
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
        ctx.font = '22px Microsoft YaHei';
        ctx.textAlign = 'left';
        
        // 第一行
        ctx.fillStyle = '#00ffff';
        ctx.fillText('🎯 接收者：', 120, 600);
        ctx.fillStyle = '#fff';
        ctx.fillText(userName, 500, 600);
        
        // 第二行
        ctx.fillStyle = '#00ffff';
        ctx.fillText('⏰ 传输时间：', 120, 650);
        ctx.fillStyle = '#fff';
        ctx.font = '18px Microsoft YaHei';
        ctx.fillText(transferTime, 320, 650);
        
        // 第三行
        ctx.font = '22px Microsoft YaHei';
        ctx.fillStyle = '#00ffff';
        ctx.fillText('💡 智慧等级：', 120, 700);
        ctx.fillStyle = '#fff';
        ctx.fillText('MAX ⭐⭐⭐⭐⭐', 500, 700);
        
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
        ctx.font = 'italic 18px Microsoft YaHei';
        ctx.fillStyle = '#e0e0e0';
        ctx.textAlign = 'left';
        const quote = '想象力比知识更重要，因为知识是有限的，';
        const quote2 = '而想象力概括着世界上的一切。';
        ctx.fillText(quote, 120, 820);
        ctx.fillText(quote2, 120, 850);
        
        // 绘制作者
        ctx.font = 'bold 18px Microsoft YaHei';
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
        ctx.font = 'bold 28px Microsoft YaHei';
        ctx.fillStyle = '#00ff00';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(0, 255, 0, 0.6)';
        ctx.fillText('传输成功', 400, 1080);
        ctx.shadowBlur = 0;
        
        // 绘制底部祝贺文字背景
        ctx.fillStyle = 'rgba(0, 150, 255, 0.2)';
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(0, 255, 255, 0.3)';
        roundRect(ctx, 50, 1110, 700, 60, 30, true, true);
        ctx.shadowBlur = 0;
        
        // 绘制底部文字
        ctx.font = 'bold 20px Microsoft YaHei';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText('🌟 恭喜您获得爱因斯坦的终极智慧！代码能力即将爆棚！', 400, 1148);
        
        // 下载图片
        setTimeout(() => {
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
        }, 100);
    }
    
    // 加载图片
    einsteinImg.onload = checkImagesLoaded;
    einsteinImg.onerror = function() {
        console.error('爱因斯坦图片加载失败');
        loadedImages++;
        if (loadedImages === totalImages) {
            drawImages();
        }
    };
    
    userImg.onload = checkImagesLoaded;
    userImg.onerror = function() {
        console.error('用户图片加载失败');
        loadedImages++;
        if (loadedImages === totalImages) {
            drawImages();
        }
    };
    
    einsteinImg.src = 'images/einstein.png';
    userImg.src = 'images/user-avatar-complete.png';
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