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
    shareButton.addEventListener('click', function() {
        // 创建分享图片
        createShareImage();
    });
});

function createShareImage() {
    // 这里可以使用html2canvas或其他库来生成分享图片
    // 示例代码：
    html2canvas(document.querySelector('.completion-scene')).then(canvas => {
        // 创建下载链接
        const link = document.createElement('a');
        link.download = '智慧传输证书.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}