document.addEventListener('DOMContentLoaded', () => {
    
    // 1. LOADING SCREEN
    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loaderText');
    const name = "FAKHRI";
    let index = 0;

    if(loader) {
        const interval = setInterval(() => {
            index++;
            loaderText.textContent = name.substring(0, index);
            if (index === name.length) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.classList.add('hidden');
                    setTimeout(() => loader.style.display = 'none', 600);
                }, 400);
            }
        }, 150);
    }

    // 2. TYPING EFFECT
    const typingElement = document.getElementById('typing');
    const roles = ["Frontend Developer", "UI/UX Designer", "Web Development"];
    let roleIndex = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
        if(!typingElement) return;
        const currentRole = roles[roleIndex];
        
        if (!isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex++);
            if (charIndex > currentRole.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1500); 
                return;
            }
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
    typeEffect();

    // 3. NAVBAR & HAMBURGER
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');

    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 100) {
            navbar.style.top = '0';
            navbar.style.width = '100%';
            navbar.style.borderRadius = '0';
        } else {
            navbar.style.top = '20px';
            navbar.style.width = '90%';
            navbar.style.borderRadius = '0'; 
        }
    });

    if(hamburger) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // 4. SCROLL REVEAL
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 5. TIMELINE ANIMATION
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                const currentIndex = Array.from(timelineItems).indexOf(entry.target);
                for(let i = 0; i <= currentIndex; i++) {
                    timelineItems[i].classList.add('active');
                }
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(el => timelineObserver.observe(el));

    // 7. PROJECT TILT & BUTTON CLICK
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if(!isTouch) {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-10px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
            });
        });
    }

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.style.transform = 'scale(0.96)';
            setTimeout(() => btn.style.transform = 'scale(1)', 200);
        });
    });

    // 8. SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 9. COMMENT SECTION
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');

    function getComments() {
        try { return JSON.parse(localStorage.getItem('portfolioComments')) || []; } catch (e) { return []; }
    }
    function saveComments(comments) { localStorage.setItem('portfolioComments', JSON.stringify(comments)); }
    function escapeHtml(text) {
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    function loadComments() {
        if (!commentsList) return;
        const comments = getComments();
        commentsList.innerHTML = '';

        if (comments.length === 0) {
            commentsList.innerHTML = '<p class="no-comments">Belum ada komentar. Jadilah yang pertama!</p>';
            return;
        }

        [...comments].reverse().forEach(comment => {
            if (!comment.id) comment.id = Date.now().toString();
            const item = document.createElement('div');
            item.classList.add('comment-item');
            item.setAttribute('data-id', comment.id);
            
            let repliesHtml = (comment.replies || []).map(reply => `
                <div class="reply-item">
                    <strong>${escapeHtml(reply.name)}</strong>
                    <span>${new Date(reply.date).toLocaleDateString('id-ID')}</span>
                    <p>${escapeHtml(reply.message)}</p>
                </div>
            `).join('');

            item.innerHTML = `
                <strong>${escapeHtml(comment.name)}</strong>
                <span>${new Date(comment.date).toLocaleDateString('id-ID')}</span>
                <p>${escapeHtml(comment.message)}</p>
                <div class="comment-actions">
                    <button class="action-btn reply-btn" data-action="reply" data-id="${comment.id}">Reply</button>
                    <button class="action-btn delete-btn" data-action="delete" data-id="${comment.id}">Delete</button>
                </div>
                <div class="reply-form" id="reply-form-${comment.id}">
                    <input type="text" id="reply-name-${comment.id}" placeholder="Your Name" required>
                    <textarea id="reply-message-${comment.id}" rows="2" placeholder="Reply..." required></textarea>
                    <button class="btn btn-primary" data-action="submit-reply" data-id="${comment.id}">Send</button>
                </div>
                ${repliesHtml}
            `;
            commentsList.appendChild(item);
        });
    }

    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newComment = {
                id: Date.now().toString(),
                name: document.getElementById('commentName').value,
                message: document.getElementById('commentMessage').value,
                date: new Date().toISOString(),
                replies: []
            };
            const comments = getComments();
            comments.push(newComment);
            saveComments(comments);
            commentForm.reset();
            loadComments();
        });
    }

    if (commentsList) {
        commentsList.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;
            const action = target.getAttribute('data-action');
            const id = target.getAttribute('data-id');

            if (action === 'reply') {
                document.getElementById(`reply-form-${id}`).classList.toggle('active');
            }
            if (action === 'delete') {
                if(confirm("Yakin ingin menghapus komentar ini?")) {
                    saveComments(getComments().filter(c => c.id !== id));
                    loadComments();
                }
            }
            if (action === 'submit-reply') {
                const nameIn = document.getElementById(`reply-name-${id}`);
                const msgIn = document.getElementById(`reply-message-${id}`);
                if (!nameIn.value || !msgIn.value) return;

                const comments = getComments();
                const idx = comments.findIndex(c => c.id === id);
                if (idx !== -1) {
                    comments[idx].replies.push({
                        name: nameIn.value,
                        message: msgIn.value,
                        date: new Date().toISOString()
                    });
                    saveComments(comments);
                    loadComments();
                }
            }
        });
    }
    loadComments();

    // 10. MASCOT EYES
    const mascotWrapper = document.getElementById('mascotWrapper');
    const mascotPupils = document.querySelectorAll('.mascot-pupil');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateMascotEyes() {
        if(!mascotWrapper) return;
        const rect = mascotWrapper.getBoundingClientRect();
        if(rect.top < window.innerHeight && rect.bottom > 0) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
            const radius = 4;
            const pupilX = Math.cos(angle) * radius;
            const pupilY = Math.sin(angle) * radius;

            mascotPupils.forEach(pupil => {
                pupil.setAttribute('transform', `translate(${pupilX}, ${pupilY})`);
            });
        }
        requestAnimationFrame(animateMascotEyes);
    }
    if(mascotWrapper) {
        animateMascotEyes();
        mascotWrapper.addEventListener('click', () => {
            mascotPupils.forEach(p => p.setAttribute('r', '8'));
            setTimeout(() => mascotPupils.forEach(p => p.setAttribute('r', '5')), 300);
        });
    }

    // 11. SCROLL-DRIVEN BACKGROUND TRANSITION & PARALLAX
    const skyScene = document.getElementById('skyScene');
    const underwaterScene = document.getElementById('underwaterScene');
    const bubbles = document.querySelectorAll('.bubble');
    const clouds = document.querySelectorAll('.cloud');
    
    let ticking = false;

    function updateBackground() {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        
        let progress = scrollY / (maxScroll || 1);
        if (progress > 1) progress = 1;
        if (progress < 0) progress = 0;

        let transitionProgress = Math.min(progress / 0.4, 1);

        if (skyScene) {
            skyScene.style.opacity = 1 - transitionProgress;
            skyScene.style.transform = `translate3d(0, ${scrollY * -0.3}px, 0)`;
        }

        if (underwaterScene) {
            underwaterScene.style.opacity = transitionProgress;
        }

        bubbles.forEach((bubble, index) => {
            const speed = (index + 1) * 0.15;
            bubble.style.transform = `translate3d(0, ${-scrollY * speed}px, 0)`;
        });

        clouds.forEach((cloud, index) => {
            const speed = (index + 1) * 0.05;
            cloud.style.transform = `translate3d(${scrollY * speed}px, 0, 0)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateBackground);
            ticking = true;
        }
    });

    updateBackground();
});

/* ==========================================
   12. INTERACTIVE BLUE SLIME MASCOT
========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const slimeWrapper = document.getElementById('slimeMascot');
    const slimePupils = document.querySelectorAll('.slime-pupil');
    
    if (!slimeWrapper) return;

    let idleTimer;
    let isSleeping = false;

    // Fungsi untuk menggerakkan mata
    window.addEventListener('mousemove', (e) => {
        const rect = slimeWrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Hitung sudut antara mata slime dan kursor
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        
        // Batasi pergerakan pupil (radius 5px)
        const radius = 5;
        const pupilX = Math.cos(angle) * radius;
        const pupilY = Math.sin(angle) * radius;

        // Terapkan pergerakan ke pupil
        slimePupils.forEach(pupil => {
            pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        });

        // Bangunkan slime jika sedang tidur
        if (isSleeping) {
            wakeUp();
        }

        // Reset timer untuk tidur
        resetIdleTimer();
    });

    // Interaksi saat Slime Diklik
    slimeWrapper.addEventListener('click', () => {
        slimeWrapper.classList.add('jump');
        slimeWrapper.classList.add('happy');
        
        // Hapus animasi setelah selesai
        setTimeout(() => {
            slimeWrapper.classList.remove('jump');
        }, 500);
        
        // Kembalikan ke keadaan normal setelah 2 detik
        setTimeout(() => {
            slimeWrapper.classList.remove('happy');
        }, 2000);

        resetIdleTimer();
    });

    // Fungsi Memulai Timer Tidur (5 Detik)
    function startIdleTimer() {
        idleTimer = setTimeout(() => {
            sleep();
        }, 5000); // 5000ms = 5 detik
    }

    // Fungsi Tidur
    function sleep() {
        isSleeping = true;
        slimeWrapper.classList.add('sleeping');
        // Kembalikan mata ke tengah saat tidur
        slimePupils.forEach(pupil => pupil.style.transform = `translate(0px, 0px)`);
    }

    // Fungsi Bangun
    function wakeUp() {
        isSleeping = false;
        slimeWrapper.classList.remove('sleeping');
    }

    // Fungsi Reset Timer
    function resetIdleTimer() {
        clearTimeout(idleTimer);
        startIdleTimer();
    }

    // Mulai timer saat halaman pertama kali dimuat
    startIdleTimer();
});