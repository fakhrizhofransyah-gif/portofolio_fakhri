document.addEventListener('DOMContentLoaded', () => {
    const aquariumScreen = document.getElementById('aquariumScreen');
    const filterBtns = document.querySelectorAll('.am-filter-btn');
    const blowBtn = document.getElementById('blowBubblesBtn');
    const detailPanel = document.getElementById('certificateDetailPanel');
    const closeDetailBtn = document.getElementById('closeDetailBtn');

    // DATA SERTIFIKAT
    // PASTIKAN NAMA FILE GAMBAR DI BAWAH INI SAMA DENGAN YANG ADA DI FOLDER IMG/
    const certificates = [
        { id: 1, name: "Sertifikat Apresiasi", issuer: "DEMA LOREM", date: "2024", category: "organisasi", size: "medium", img: "img/cert-organisasi.png", link: "img/cert-organisasi.png" },
        { id: 2, name: "Meta Front-End Developer", issuer: "Coursera", date: "Sep 2023", category: "tech", size: "small", img: "img/cert-meta.png", link: "img/cert-meta.png" },
        { id: 3, name: "Certificate of Completion", issuer: "Skillfloor", date: "01-10-2024", category: "tech", size: "large", img: "img/cert-skillfloor.png", link: "img/cert-skillfloor.png" },
        { id: 4, name: "Certified Front-End Developer", issuer: "Whitebeard", date: "Feb 2024", category: "design", size: "medium", img: "img/cert-whiteschool.png", link: "img/cert-whiteschool.png" },
    ];

    let activeFilter = 'all';
    let bubblesData = [];
    let animationFrameId;
    let isBlowing = false;

    function renderBubbles() {
        aquariumScreen.querySelectorAll('.am-bubble').forEach(b => b.remove());
        bubblesData = []; 

        const filteredCerts = certificates.filter(cert => activeFilter === 'all' || cert.category === activeFilter);
        const screenWidth = aquariumScreen.clientWidth;
        const screenHeight = aquariumScreen.clientHeight;

        filteredCerts.forEach((cert, index) => {
            const bubble = document.createElement('div');
            let bubbleSize = 45;
            if(cert.size === 'medium') bubbleSize = 65;
            if(cert.size === 'large') bubbleSize = 85;
            
            bubble.className = `am-bubble ${cert.size}`;
            bubble.style.width = `${bubbleSize}px`;
            bubble.style.height = `${bubbleSize}px`;
            bubble.style.position = 'absolute';

            const img = document.createElement('img');
            img.src = cert.img; 
            img.alt = cert.name;
            bubble.appendChild(img);

            const isLeft = Math.random() > 0.5;
            let startX = isLeft ? 25 : screenWidth - bubbleSize - 25;
            startX += (Math.random() - 0.5) * 50; 
            let startY = screenHeight - bubbleSize - 10;

            const bData = {
                el: bubble,
                x: startX,
                y: startY,
                baseX: startX,
                baseY: startY,
                speed: 0.3 + Math.random() * 0.4,
                phase: Math.random() * Math.PI * 2,
                direction: Math.random() > 0.5 ? 1 : -1,
                isGoingUp: true
            };

            bubblesData.push(bData);
            aquariumScreen.appendChild(bubble);

            bubble.addEventListener('click', (e) => {
                e.stopPropagation();
                showDetail(cert);
            });
        });
        
        startAnimation();
    }

    let lastTime = 0;
    function animateBubbles(time) {
        if (!lastTime) lastTime = time;
        const deltaTime = time - lastTime;
        lastTime = time;

        if (document.hidden) {
            animationFrameId = requestAnimationFrame(animateBubbles);
            return; 
        }

        const screenHeight = aquariumScreen.clientHeight;
        const screenWidth = aquariumScreen.clientWidth;
        const speedMultiplier = isBlowing ? 4 : 1;

        bubblesData.forEach(b => {
            b.phase += 0.02 * speedMultiplier;
            
            if (b.isGoingUp) {
                b.y -= b.speed * speedMultiplier * (deltaTime / 16);
                if (b.y < 10) { b.isGoingUp = false; }
            } else {
                b.y += b.speed * 0.5 * speedMultiplier * (deltaTime / 16);
                if (b.y >= b.baseY) { 
                    b.isGoingUp = true;
                    b.baseX = (Math.random() > 0.5 ? 25 : screenWidth - 85) + (Math.random() - 0.5) * 30;
                }
            }

            const currentX = b.baseX + Math.sin(b.phase) * 15;
            b.el.style.transform = `translate(${currentX}px, ${b.y}px)`;
        });

        animationFrameId = requestAnimationFrame(animateBubbles);
    }

    function startAnimation() {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        lastTime = 0;
        animationFrameId = requestAnimationFrame(animateBubbles);
    }

    function startBlow() {
        isBlowing = true;
        blowBtn.classList.add('blowing');
    }

    function stopBlow() {
        isBlowing = false;
        blowBtn.classList.remove('blowing');
    }

    blowBtn.addEventListener('mousedown', startBlow);
    blowBtn.addEventListener('mouseup', stopBlow);
    blowBtn.addEventListener('mouseleave', stopBlow);
    blowBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startBlow(); }, {passive: false});
    blowBtn.addEventListener('touchend', stopBlow);
    blowBtn.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') startBlow(); });
    blowBtn.addEventListener('keyup', (e) => { if(e.key === 'Enter' || e.key === ' ') stopBlow(); });

    function showDetail(cert) {
        document.getElementById('amDetailName').textContent = cert.name;
        document.getElementById('amDetailIssuer').textContent = cert.issuer;
        document.getElementById('amDetailDate').textContent = cert.date;
        document.getElementById('amDetailImgSrc').src = cert.img;
        
        const tagsContainer = document.getElementById('amDetailTags');
        tagsContainer.innerHTML = `<span>${cert.category.toUpperCase()}</span>`;
        
        document.getElementById('amDetailLink').href = cert.link;
        detailPanel.classList.add('active');
    }

    closeDetailBtn.addEventListener('click', () => detailPanel.classList.remove('active'));

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            activeFilter = e.target.getAttribute('data-filter');
            detailPanel.classList.remove('active');
            renderBubbles(); 
        });
    });

    setTimeout(renderBubbles, 100); 
    
    window.addEventListener('resize', () => {
        if(animationFrameId) cancelAnimationFrame(animationFrameId);
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(() => {
            renderBubbles();
        }, 250);
    });
});