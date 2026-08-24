/* ==========================================
   TYPING EFFECT
========================================== */

const words = [
    "Frontend Developer",
    "UI/UX Designer",
    "Website Developer",
    "PHP & Laravel Developer",
    "Creative Programmer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect() {

    if (!typing) return;

    const current = words[wordIndex];

    if (!deleting) {

        typing.textContent = current.substring(0, charIndex++);

        if (charIndex > current.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    } else {

        typing.textContent = current.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, deleting ? 50 : 100);

}

typeEffect();

/* ==========================================
   NAVBAR SCROLL
========================================== */

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        nav.style.background = "rgba(5,8,22,.95)";
        nav.style.backdropFilter = "blur(25px)";
        nav.style.boxShadow = "0 10px 30px rgba(37,99,235,.25)";
        nav.style.marginTop = "0";
        nav.style.borderRadius = "0";

    } else {

        nav.style.background = "rgba(10,15,30,.55)";
        nav.style.backdropFilter = "blur(20px)";
        nav.style.boxShadow = "none";
        nav.style.marginTop = "20px";
        nav.style.borderRadius = "20px";

    }

});

/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements = document.querySelectorAll(
    ".section-title,.about-text,.about-card,.skill-card,.project-card,.contact-box div"
);

function reveal() {

    revealElements.forEach(el => {

        const top = el.getBoundingClientRect().top;

        if (top < window.innerHeight - 120) {

            el.classList.add("active");

        }

    });

}

reveal();

window.addEventListener("scroll", reveal);

/* ==========================================
   ADD REVEAL CLASS
========================================== */

revealElements.forEach(item => {

    item.classList.add("reveal");

});

/* ==========================================
   ACTIVE MENU
========================================== */

const sections = document.querySelectorAll("section");

const menuLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 150;

        if (pageYOffset >= top) {

            current = section.getAttribute("id");

        }

    });

    menuLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/* ==========================================
   PARALLAX GLOW
========================================== */

document.addEventListener("mousemove", (e) => {

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    document.querySelector(".blur1").style.transform =
        `translate(${x * 40}px, ${y * 40}px)`;

    document.querySelector(".blur2").style.transform =
        `translate(${-x * 40}px, ${-y * 30}px)`;

    document.querySelector(".blur3").style.transform =
        `translate(${x * 25}px, ${-y * 25}px)`;

});

/* ==========================================
   BUTTON RIPPLE EFFECT
========================================== */

document.querySelectorAll(".btn,.btn-outline").forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-5px) scale(1.03)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translateY(0) scale(1)";

    });

});

/* ==========================================
   PROJECT CARD TILT
========================================== */

document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x - rect.width / 2) / 20;
        const rotateX = (rect.height / 2 - y) / 20;

        card.style.transform =
            `perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(900px) rotateX(0) rotateY(0)";

    });

});

/* ==========================================
   IMAGE FLOAT
========================================== */

const profile = document.querySelector(".image-box");

window.addEventListener("mousemove", (e) => {

    const x = (e.clientX - window.innerWidth / 2) / 80;
    const y = (e.clientY - window.innerHeight / 2) / 80;

    profile.style.transform =
        `rotateY(${x}deg) rotateX(${-y}deg)`;

});

/* ==========================================
   PRELOADER
========================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({

                behavior: "smooth"

            });

    });

});

/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log(
`
============================================

Portfolio by Fakhri Zhofran Syah

Frontend Developer
UI/UX Designer

============================================
`
);