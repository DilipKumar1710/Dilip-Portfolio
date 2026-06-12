document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       DARK MODE TOGGLE
    ========================================== */

    const themeToggle = document.getElementById("theme-toggle");
    const html = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        html.classList.add("dark");
        updateThemeIcon(true);
    } else {
        html.classList.remove("dark");
        updateThemeIcon(false);
    }

    // Toggle theme
    themeToggle?.addEventListener("click", () => {

        html.classList.toggle("dark");

        const isDark = html.classList.contains("dark");

        localStorage.setItem("theme", isDark ? "dark" : "light");

        updateThemeIcon(isDark);
    });

    function updateThemeIcon(isDark) {

        if (!themeToggle) return;

        themeToggle.textContent = isDark ? "☀️" : "🌙";
    }


    /* ==========================================
       MOBILE MENU TOGGLE
    ========================================== */

    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    mobileMenuButton?.addEventListener("click", () => {

        mobileMenu.classList.toggle("hidden");
    });

    // Close mobile menu when clicking links
    document.querySelectorAll("#mobile-menu a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.add("hidden");
        });
    });


    /* ==========================================
       SCROLL REVEAL ANIMATIONS
    ========================================== */

    const animatedElements = document.querySelectorAll(
        ".animate-on-scroll"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.remove(
                    "opacity-0",
                    "translate-y-8"
                );

                entry.target.classList.add(
                    "opacity-100",
                    "translate-y-0"
                );

                observer.unobserve(entry.target);
            }
        });

    }, {
        threshold: 0.15
    });


    animatedElements.forEach(element => {

        element.classList.add(
            "opacity-0",
            "translate-y-8",
            "transition-all",
            "duration-700"
        );

        observer.observe(element);
    });


    /* ==========================================
       ACTIVE NAVIGATION HIGHLIGHT
    ========================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    function highlightActiveSection() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {

            link.classList.remove(
                "text-shopify",
                "font-semibold"
            );

            if (
                link.getAttribute("href") ===
                `#${currentSection} `
            ) {
                link.classList.add(
                    "text-shopify",
                    "font-semibold"
                );
            }
        });
    }

    window.addEventListener(
        "scroll",
        highlightActiveSection
    );

    highlightActiveSection();


    /* ==========================================
       SMOOTH SCROLLING OFFSET
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const targetElement =
                document.querySelector(targetId);

            if (!targetElement) return;

            e.preventDefault();

            const offset = 80;

            const targetPosition =
                targetElement.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });


    /* ==========================================
       SCROLL TO TOP BUTTON (OPTIONAL)
    ========================================== */

    const scrollTopButton =
        document.getElementById("scroll-top");

    if (scrollTopButton) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                scrollTopButton.classList.remove(
                    "hidden"
                );

            } else {

                scrollTopButton.classList.add(
                    "hidden"
                );
            }
        });

        scrollTopButton.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );
    }

});

