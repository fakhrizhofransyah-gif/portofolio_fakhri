/* ==========================================
   1. LOADING SCREEN
========================================== */
const loader = document.getElementById('loader');
const loaderText = document.getElementById('loaderText');
const name = "FAKHRI";

let index = 0;
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

/* ==========================================
   2. TYPING EFFECT
========================================== */
const typingElement = document.getElementById('typing');
const roles = ["Frontend Developer", "UI/UX Designer", "Web Development"];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
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
            roleIndex++;
            if (roleIndex >= roles.length) roleIndex = 0;
        }
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}
typeEffect();

/* ==========================================
   3. CUSTOM CURSOR (Desktop Only)
========================================== */
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

if (!isTouchDevice) {
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorFollower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hovering'));
    });
}

/* ==========================================
   4. NAVBAR & HAMBURGER
========================================== */
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.top = '0';
        navbar.style.width = '100%';
        navbar.style.borderRadius = '0';
    } else {
        navbar.style.top = '20px';
        navbar.style.width = '90%';
        navbar.style.borderRadius = '50px';
    }
});

hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));

/* ==========================================
   5. SCROLL REVEAL & TIMELINE
========================================== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

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

/* ==========================================
   6. PROCESS ANIMATION (MAJU MUNDUR OTOMATIS)
========================================== */
const processPath = document.getElementById('processPathActive');
const processNodes = document.querySelectorAll('.process-node');
const processCards = document.querySelectorAll('.process-step-card');
const processSection = document.getElementById('process');

const pathLength = processPath.getTotalLength();
processPath.style.strokeDasharray = pathLength;
processPath.style.strokeDashoffset = pathLength;

let isAnimating = false;

function setProcessStep(stepIndex, duration = 1500) {
    const progressTarget = (stepIndex / 4) * pathLength;
    
    processPath.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.2, 0.75, 0.25, 1)`;
    processPath.style.strokeDashoffset = pathLength - progressTarget;

    processNodes.forEach((node, index) => {
        node.classList.toggle('active', index <= stepIndex);
    });
    
    processCards.forEach((card, index) => {
        card.classList.toggle('active', index === stepIndex);
    });
}

function animateProcessLoop() {
    if (isAnimating) return;
    isAnimating = true;

    setProcessStep(0, 0);
    setTimeout(() => setProcessStep(1), 1000);
    setTimeout(() => setProcessStep(2), 2500);
    setTimeout(() => setProcessStep(3), 4000);
    setTimeout(() => setProcessStep(4), 5500);

    setTimeout(() => {
        setProcessStep(3, 1500);
        setTimeout(() => setProcessStep(2, 1500), 1500);
        setTimeout(() => setProcessStep(1, 1500), 3000);
        setTimeout(() => setProcessStep(0, 1500), 4500);

        setTimeout(() => {
            isAnimating = false;
            animateProcessLoop();
        }, 7000);

    }, 7500);
}

const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProcessLoop();
        }
    });
}, { threshold: 0.3 });

processObserver.observe(processSection);

/* ==========================================
   7. PROJECT TILT & BUTTON CLICK
========================================== */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
});

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.style.transform = 'scale(0.96)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
    });
});

/* ==========================================
   8. SMOOTH SCROLL
========================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

/* ==========================================
   9. COMMENT SECTION (REPLY & DELETE - PASTI JALAN)
========================================== */

const commentForm = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');

// --- Fungsi Simpan & Muat Data ---
function getComments() {
    try {
        return JSON.parse(localStorage.getItem('portfolioComments')) || [];
    } catch (e) {
        return [];
    }
}

function saveComments(comments) {
    localStorage.setItem('portfolioComments', JSON.stringify(comments));
}

// --- Escape HTML untuk mencegah XSS ---
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// --- Tampilkan Komentar + Balasan ---
function loadComments() {
    if (!commentsList) return;

    const comments = getComments();
    commentsList.innerHTML = '';

    if (comments.length === 0) {
        commentsList.innerHTML = '<p class="no-comments">Belum ada komentar. Jadilah yang pertama!</p>';
        return;
    }

    // Tampilkan dari yang terbaru
    const sortedComments = [...comments].reverse();

    sortedComments.forEach(comment => {
        // PENTING: Jika komentar lama tidak punya ID, buat ID baru agar tidak "undefined"
        if (!comment.id) {
            comment.id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
        }

        const commentItem = document.createElement('div');
        commentItem.classList.add('comment-item');
        commentItem.setAttribute('data-comment-id', comment.id);
        
        let repliesHtml = '';
        if (comment.replies && comment.replies.length > 0) {
            comment.replies.forEach(reply => {
                repliesHtml += `
                    <div class="reply-item">
                        <strong>${escapeHtml(reply.name)}</strong>
                        <span>${new Date(reply.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        <p>${escapeHtml(reply.message)}</p>
                    </div>
                `;
            });
        }

        commentItem.innerHTML = `
            <strong>${escapeHtml(comment.name)}</strong>
            <span>${new Date(comment.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <p>${escapeHtml(comment.message)}</p>
            
            <div class="comment-actions">
                <button type="button" class="action-btn reply-btn" data-action="reply" data-id="${comment.id}">Reply</button>
                <button type="button" class="action-btn delete-btn" data-action="delete" data-id="${comment.id}">Delete</button>
            </div>

            <div class="reply-form" id="reply-form-${comment.id}">
                <input type="text" id="reply-name-${comment.id}" placeholder="Your Name" required>
                <textarea id="reply-message-${comment.id}" rows="2" placeholder="Write your reply..." required></textarea>
                <button type="button" class="btn btn-primary" data-action="submit-reply" data-id="${comment.id}">Send Reply</button>
            </div>

            ${repliesHtml}
        `;

        commentsList.appendChild(commentItem);
    });
}

// --- Submit Komentar Baru ---
if (commentForm) {
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('commentName').value;
        const email = document.getElementById('commentEmail').value;
        const message = document.getElementById('commentMessage').value;

        const newComment = {
            id: Date.now().toString(), // ID unik
            name: name,
            email: email,
            message: message,
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

// --- Event Delegation: Menangani Reply, Delete, dan Send Reply ---
if (commentsList) {
    commentsList.addEventListener('click', function(e) {
        const target = e.target.closest('button');
        if (!target) return;

        const action = target.getAttribute('data-action');
        const commentId = target.getAttribute('data-id');

        // 1. Reply
        if (action === 'reply') {
            const replyForm = document.getElementById(`reply-form-${commentId}`);
            if (replyForm) {
                replyForm.classList.toggle('active');
            }
        }

        // 2. DELETE (Pasti jalan karena ID sudah unik)
        if (action === 'delete') {
            const comments = getComments();
            const updatedComments = comments.filter(c => c.id !== commentId);
            saveComments(updatedComments);
            loadComments();
        }

        // 3. Submit Reply
        if (action === 'submit-reply') {
            const replyNameInput = document.getElementById(`reply-name-${commentId}`);
            const replyMessageInput = document.getElementById(`reply-message-${commentId}`);

            const replyName = replyNameInput.value;
            const replyMessage = replyMessageInput.value;

            if (!replyName || !replyMessage) return;

            const comments = getComments();
            const commentIndex = comments.findIndex(c => c.id === commentId);

            if (commentIndex !== -1) {
                const newReply = {
                    name: replyName,
                    message: replyMessage,
                    date: new Date().toISOString()
                };

                comments[commentIndex].replies.push(newReply);
                saveComments(comments);

                replyNameInput.value = '';
                replyMessageInput.value = '';
                document.getElementById(`reply-form-${commentId}`).classList.remove('active');
                
                loadComments();
            }
        }
    });
}

// --- Muat komentar saat halaman dimuat ---
document.addEventListener('DOMContentLoaded', loadComments);

/* ==========================================
   10. SMOOTH SCROLL CTA
========================================== */
const contactCTA = document.querySelector('a[href="#commentSection"]');

if (contactCTA) {
    contactCTA.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector('#commentSection');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

const letsTalkBtn = document.querySelector('.nav-cta');

if (letsTalkBtn) {
    letsTalkBtn.addEventListener('click', function() {
        this.style.transform = 'scale(0.96)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
}

/* ==========================================
   11. FINAL MASCOT - MATA MENGIKUTI MOUSE
========================================== */
const mascotWrapper = document.getElementById('mascotWrapper');
const mascotPupils = document.querySelectorAll('.mascot-pupil');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateMascotEyes() {
    const mascotRect = mascotWrapper.getBoundingClientRect();
    const mascotCenterX = mascotRect.left + mascotRect.width / 2;
    const mascotCenterY = mascotRect.top + mascotRect.height / 2;

    const angle = Math.atan2(mouseY - mascotCenterY, mouseX - mascotCenterX);
    
    const radius = 4;
    const pupilX = Math.cos(angle) * radius;
    const pupilY = Math.sin(angle) * radius;

    mascotPupils.forEach(pupil => {
        pupil.setAttribute('transform', `translate(${pupilX}, ${pupilY})`);
    });

    requestAnimationFrame(animateMascotEyes);
}

animateMascotEyes();

if (mascotWrapper) {
    mascotWrapper.addEventListener('click', () => {
        mascotPupils.forEach(pupil => {
            pupil.setAttribute('r', '8');
        });
        
        setTimeout(() => {
            mascotPupils.forEach(pupil => {
                pupil.setAttribute('r', '5');
            });
        }, 300);
    });
}