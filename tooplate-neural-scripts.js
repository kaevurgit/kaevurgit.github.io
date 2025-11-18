// JavaScript Document

// Neural Network Background Animation
        const canvas = document.getElementById('neural-bg');
        const ctx = canvas.getContext('2d');
        let nodes = [];
        let mouse = { x: 0, y: 0 };
        const CYBER_COLORS = ['#ff00ff', '#a200ff', '#ff33cc', '#b300ff'];
        let BG_TINT = 'rgba(5, 0, 15, 0.85)';

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Node {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 3 + 1;
                this.color = CYBER_COLORS[Math.floor(Math.random() * CYBER_COLORS.length)];
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color;
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }
        }

        function init() {
            nodes = [];
            for (let i = 0; i < 100; i++) {
                nodes.push(new Node(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height
                ));
            }
        }

        function connectNodes() {
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const alpha = 1 - distance / 150;
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = nodes[i].color;
                        ctx.strokeStyle = `rgba(255, 0, 255, ${Math.min(0.9, alpha)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }
        }

        function animate() {
            ctx.fillStyle = BG_TINT;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            nodes.forEach(node => {
                node.update();
                node.draw();
            });

            connectNodes();
            requestAnimationFrame(animate);
        }

        // Initialize and start animation
        init();
        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });

        // Mouse move effect
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');

        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Fade in sections
            const sections = document.querySelectorAll('.fade-in');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    section.classList.add('visible');
                }
            });
        });

        // Theme toggle with persistence and canvas tint
        (function() {
            const body = document.body;
            const toggle = document.getElementById('theme-toggle');
            const saved = localStorage.getItem('theme');
            if (saved === 'light') {
                body.classList.add('light');
                BG_TINT = 'rgba(255, 255, 255, 0.6)';
            } else {
                body.classList.remove('light');
                BG_TINT = 'rgba(5, 0, 15, 0.85)';
            }

            if (toggle) {
                // Add sun icon dynamically if not present (for robustness)
                if (!toggle.querySelector('.icon-sun')) {
                    const sun = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    sun.setAttribute('class', 'icon-sun');
                    sun.setAttribute('width', '18');
                    sun.setAttribute('height', '18');
                    sun.setAttribute('viewBox', '0 0 24 24');
                    sun.setAttribute('fill', 'none');
                    sun.setAttribute('stroke', 'currentColor');
                    sun.setAttribute('stroke-width', '2');
                    sun.innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>';
                    toggle.appendChild(sun);
                }

                toggle.addEventListener('click', () => {
                    const isLight = body.classList.toggle('light');
                    if (isLight) {
                        localStorage.setItem('theme', 'light');
                        BG_TINT = 'rgba(255, 255, 255, 0.6)';
                    } else {
                        localStorage.setItem('theme', 'dark');
                        BG_TINT = 'rgba(5, 0, 15, 0.85)';
                    }
                });
            }
        })();

        // Form submission (only if form exists)
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Message sent! (This is a demo)');
            });
        }