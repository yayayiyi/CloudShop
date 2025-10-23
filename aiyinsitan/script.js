document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.querySelector('.start-button');
    const brainWaves = document.querySelector('.brain-waves');
    const transferPath = document.querySelector('.transfer-path');
    const transferGlow = document.querySelector('.transfer-glow');
    const energyFlow = document.querySelector('.energy-flow');
    const brainIcon = document.querySelector('.brain-icon');
    const progressContainer = document.querySelector('.progress-container');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const mainTitle = document.querySelector('.main-title');
    const subTitle = document.querySelector('.sub-title');
    const warningText = document.querySelector('.warning-text');
    const transferSound = document.getElementById('transferSound');
    const completeSound = document.getElementById('completeSound');
    
    let progress = 0;
    let transferActive = false;
    
    // 创建智慧粒子
    function createWisdomParticles() {
        const container = document.querySelector('.left-side');
        for(let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'wisdom-particle';
            container.appendChild(particle);
            
            // 随机位置和动画
            const startX = 200 + Math.random() * 50;
            const startY = 100 + Math.random() * 100;
            
            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            
            // 应用动画
            setTimeout(() => {
                particle.style.opacity = '1';
                particle.style.transform = 'translate(-150px, -50px)';
                particle.style.transition = 'all 1s ease-out';
            }, i * 100);
        }
    }
    
    // 创建能量流粒子
    function createEnergyParticles() {
        const energyFlow = document.querySelector('.energy-flow');
        for(let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'energy-particle';
            energyFlow.appendChild(particle);
            
            // 设置随机延迟和位置
            particle.style.animationDelay = `${i * 0.2}s`;
            particle.style.top = `${Math.random() * 100}%`;
        }
    }
    
    // 更新进度
    function updateProgress() {
        if (!transferActive) return;
        
        // 计算每次更新增加的进度（7秒完成，每50ms更新一次）
        const increment = 100 / (7000 / 50);
        progress = Math.min(100, progress + increment);
        
        progressFill.style.width = `${Math.round(progress)}%`;
        progressText.textContent = `脑电波同步中... ${Math.round(progress)}%`;
        
        if (progress < 100) {
            setTimeout(updateProgress, 50);
        } else {
            completeTransfer();
        }
    }
    
    // 完成传输
    function completeTransfer() {
        transferActive = false;
        transferSound.pause();
        completeSound.play();
        
        const avatarContainer = document.querySelector('.avatar-container');
        const userAvatar = document.querySelector('.user-avatar');
        const canvas = document.querySelector('.avatar-transition');
        const ctx = canvas.getContext('2d');
        
        // 开始头像切换动画
        avatarContainer.classList.add('avatar-glitching');
        
        // 设置数字雨效果
        canvas.style.opacity = '1';
        const characters = '01';
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        // 初始化雨滴位置
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        function drawDigitalRain() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        // 运行数字雨动画
        let rainInterval = setInterval(drawDigitalRain, 33);
        
        // 2秒后切换头像
        setTimeout(() => {
            userAvatar.src = 'images/user-avatar-complete.png';
            userAvatar.classList.add('activated');
            
            // 0.5秒后停止数字雨动画
            setTimeout(() => {
                clearInterval(rainInterval);
                canvas.style.opacity = '0';
                progressText.textContent = '传输完成！';
                
                // 等待动画结束后跳转
                setTimeout(() => {
                    document.body.classList.add('fade-out');
                    setTimeout(() => {
                        window.location.href = 'scene3.html';
                    }, 1500);
                }, 1000);
            }, 500);
        }, 2000);
    }
    
    // 开始传输动画
    function startTransfer() {
        transferActive = true;
        
        // 隐藏文字和按钮
        mainTitle.classList.add('hide');
        subTitle.classList.add('hide');
        warningText.classList.add('hide');
        startButton.classList.add('hide');
        
        // 显示进度条
        progressContainer.style.opacity = '1';
        
        // 启动脑波效果
        brainWaves.style.opacity = '1';
        
        // 创建智慧粒子
        createWisdomParticles();
        
        // 激活传输通道效果
        setTimeout(() => {
            transferGlow.style.opacity = '1';
            energyFlow.style.opacity = '1';
            createEnergyParticles();
        }, 1000);
        
        // 播放音效
        transferSound.loop = true;
        transferSound.play();
        
        // 开始进度更新
        updateProgress();
    }
    
    // 点击事件处理
    startButton.addEventListener('click', function() {
        this.disabled = true;
        startTransfer();
    });
    
    // 添加星空背景效果
    createStarryBackground();
});

function createStarryBackground() {
    const body = document.body;
    for(let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        body.appendChild(star);
    }
}