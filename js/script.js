document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // 移动端菜单切换
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 点击导航链接关闭移动菜单
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // 实现客户评价轮播效果
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    // 初始化第一个评价为活动状态
    if (testimonials.length > 0) {
        testimonials[0].classList.add('active');
    }
    
    // 下一个评价
    const nextTestimonial = document.getElementById('next-testimonial');
    if (nextTestimonial) {
        nextTestimonial.addEventListener('click', function() {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        });
    }
    
    // 上一个评价
    const prevTestimonial = document.getElementById('prev-testimonial');
    if (prevTestimonial) {
        prevTestimonial.addEventListener('click', function() {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        });
    }

    // 自动轮播评价
    setInterval(() => {
        if (testimonials.length > 1) {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        }
    }, 5000);

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 联系表单提交 - 添加有趣的动画效果
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // 表单提交动画
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // 添加表情符号和动画
            submitBtn.innerHTML = '发送中... <span class="emoji">🚀</span>';
            
            // 模拟发送过程
            setTimeout(() => {
                submitBtn.innerHTML = '收到了! <span class="emoji">👍</span>';
                submitBtn.style.backgroundColor = '#28a745';
                
                // 添加飘心动画
                createConfetti();
                
                // 重置表单
                contactForm.reset();
                
                // 恢复按钮文本
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

    // 创建五彩纸屑效果
    function createConfetti() {
        const container = document.querySelector('.contact-form');
        const confettiCount = 50;
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C', '#F7FFF7'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            container.appendChild(confetti);
            
            // 移除纸屑
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }

    // 添加CSS样式
    const style = document.createElement('style');
    style.innerHTML = `
        .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            opacity: 0.7;
            pointer-events: none;
            z-index: 100;
            animation: fall 2s ease forwards;
        }
        
        @keyframes fall {
            0% {
                transform: translateY(0) rotate(0);
                opacity: 0.7;
            }
            100% {
                transform: translateY(100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        .emoji {
            display: inline-block;
            animation: pulse 0.5s infinite alternate;
        }
        
        @keyframes pulse {
            from { transform: scale(1); }
            to { transform: scale(1.2); }
        }
    `;
    document.head.appendChild(style);

    // 视频加载错误处理
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        heroVideo.addEventListener('error', function() {
            const heroSection = document.querySelector('.hero-video');
            heroSection.style.backgroundImage = 'url("assets/fallback-image.jpg")';
            heroSection.style.backgroundSize = 'cover';
            heroSection.style.backgroundPosition = 'center';
        });
    }

    // 图片懒加载
    const lazyImages = document.querySelectorAll('[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // 降级处理
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // 添加页面滚动有趣元素
    const funnyElements = document.querySelectorAll('.funny-card');
    funnyElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            const randomRotate = Math.random() * 10 - 5;
            el.style.transform = `translateY(-15px) rotate(${randomRotate}deg)`;
        });
        
        el.addEventListener('mouseout', () => {
            el.style.transform = '';
        });
    });

    // 随机颜色变换效果
    const logo = document.querySelector('.logo-text');
    if (logo) {
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C'];
        let colorIndex = 0;
        
        setInterval(() => {
            colorIndex = (colorIndex + 1) % colors.length;
            logo.style.color = colors[colorIndex];
        }, 3000);
    }

    // 动画效果
    if ('IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .section-header');
        
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            fadeInObserver.observe(el);
        });

        // 添加CSS类用于动画
        const animStyle = document.createElement('style');
        animStyle.innerHTML = `
            .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(animStyle);
    }

    // 添加一个跟随鼠标的搞笑元素
    const mouseFollower = document.createElement('div');
    mouseFollower.className = 'mouse-follower';
    mouseFollower.innerHTML = '😜';
    document.body.appendChild(mouseFollower);

    document.addEventListener('mousemove', (e) => {
        const follower = document.querySelector('.mouse-follower');
        // 只在10%的机会显示跟随元素，使其不那么频繁出现
        if (Math.random() < 0.05 && follower) {
            const x = e.clientX;
            const y = e.clientY;
            
            follower.style.left = `${x}px`;
            follower.style.top = `${y}px`;
            follower.style.opacity = '1';
            
            setTimeout(() => {
                follower.style.opacity = '0';
            }, 500);
        }
    });

    // 添加鼠标跟随器的样式
    const followerStyle = document.createElement('style');
    followerStyle.innerHTML = `
        .mouse-follower {
            position: fixed;
            font-size: 24px;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
            transform: translate(-50%, -50%);
        }
    `;
    document.head.appendChild(followerStyle);
    
    // 随机冷笑话生成器
    const jokeBtn = document.getElementById('new-joke');
    const jokeText = document.querySelector('.random-joke');
    
    const jokes = [
        "为什么程序员不能修电脑？因为他只会让电脑帮他修Bug！",
        "有一只狗走进酒吧，点了杯酒。酒保很惊讶，说：'哇，会说话的狗！'狗回答：'是啊，这酒吧装修真不错。'",
        "我朋友问我知不知道什么按钮能让世界消失？我说：\"Alt+F4\"",
        "如果一棵树倒在森林里，而周围没有人听见，那我的WiFi是不是终于能快一点了？",
        "我昨天去面试，面试官问我最大的缺点是什么。我说：\"诚实\"。面试官：\"我不觉得诚实是缺点啊？\"我：\"我不在乎你怎么想。\"",
        "为什么科学家无法让氦气笑起来？因为它是一个贵族气体！",
        "为什么小熊没有手机？因为它老是把电话挂（树）了！",
        "把鸡蛋放进微波炉会发生什么？我也不知道，我再也不做那个实验了。",
        "两个西红柿过马路，一个被车撞了，另一个说：\"快点，番茄酱！\"",
        "为什么海盗这么厉害？因为他们高「嗨」！",
        "我尝试用密码'penis'注册账号，系统说太短了。",
        "我的网名叫\"偷西瓜\"，你知道为什么吗？因为我不会被抓，我会被揍。"
    ];
    
    if (jokeBtn && jokeText) {
        jokeBtn.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * jokes.length);
            jokeText.textContent = jokes[randomIndex];
            
            // 添加点击效果
            jokeText.style.transform = 'scale(1.05)';
            setTimeout(() => {
                jokeText.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // 随机梗图展示
    const memeImages = [
        'images/meme1.jpg',
        'images/meme2.jpg',
        'images/meme3.jpg'
    ];
    
    const randomMeme = document.getElementById('random-meme');
    if (randomMeme) {
        const memeImg = randomMeme.querySelector('img');
        
        // 设置随机初始梗图
        const initialMeme = memeImages[Math.floor(Math.random() * memeImages.length)];
        if (memeImg) memeImg.src = initialMeme;
        
        // 点击更换梗图
        randomMeme.addEventListener('click', () => {
            const nextMeme = memeImages[Math.floor(Math.random() * memeImages.length)];
            memeImg.src = nextMeme;
            
            // 添加点击旋转效果
            randomMeme.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                randomMeme.style.transform = '';
            }, 500);
        });
    }
    
    // 表情雨特效
    function createEmojiRain() {
        const emojis = ['😂', '🤣', '😜', '🎉', '✨', '💯', '🔥', '👻', '🤡', '🤪'];
        const container = document.body;
        
        // 创建30个随机表情符号
        for (let i = 0; i < 30; i++) {
            const emoji = document.createElement('div');
            emoji.className = 'falling-emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = `${Math.random() * 100}%`;
            emoji.style.animationDuration = `${Math.random() * 3 + 2}s`;
            emoji.style.animationDelay = `${Math.random() * 2}s`;
            emoji.style.opacity = Math.random() * 0.5 + 0.5;
            emoji.style.fontSize = `${Math.random() * 20 + 10}px`;
            
            container.appendChild(emoji);
            
            // 动画结束后移除元素
            setTimeout(() => {
                emoji.remove();
            }, 5000);
        }
    }
    
    // 添加表情雨样式
    const emojiStyle = document.createElement('style');
    emojiStyle.innerHTML = `
        .falling-emoji {
            position: fixed;
            top: -20px;
            z-index: 1000;
            pointer-events: none;
            animation: emoji-fall linear forwards;
        }
        
        @keyframes emoji-fall {
            0% {
                transform: translateY(0) rotate(0);
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(emojiStyle);
    
    // 每隔30秒触发一次表情雨
    setInterval(createEmojiRain, 30000);
    
    // 首次加载页面时也触发一次表情雨
    setTimeout(createEmojiRain, 3000);
}); 