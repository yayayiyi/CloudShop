document.addEventListener('DOMContentLoaded', function() {
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