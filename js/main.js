// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Download Resume Button
    const downloadBtn = document.getElementById('downloadResumeBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Create a sample resume PDF (in real scenario, link to actual file)
            alert('در اینجا فایل PDF رزومه شما دانلود می‌شود.\nبرای نسخه واقعی، لینک فایل واقعی را قرار دهید.');
            
            // Example of actual download:
            // window.location.href = 'downloads/resume.pdf';
            
            // Or generate dynamic content
            const resumeContent = `
                رزومه رضا حسینی
                توسعه‌دهنده بک‌اند
                
                مهارت‌ها:
                - Python, PHP, Go
                - Laravel, Django
                - MySQL, PostgreSQL, Redis
                - Docker, Git
                
                تماس: reza.hosseini@example.com
            `;
            
            const blob = new Blob([resumeContent], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'resume-reza-hosseini.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    // Project Download Buttons
    // Project Download Buttons
const downloadButtons = document.querySelectorAll('.btn-download');
downloadButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const project = this.getAttribute('data-project');
        
        // مسیر فایل‌های ZIP که توی پوشه downloads قرار دارن
        let downloadUrl = '';
        if (project === 'support-ticket') {
            downloadUrl = 'downloads/support-ticket-system.zip';
        } else if (project === 'appointment-booking') {
            downloadUrl = 'downloads/appointment-booking-system.zip';
        }
        
        // ایجاد لینک دانلود
        if (downloadUrl) {
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = ''; // این باعث میشه فایل دانلود بشه نه اینکه تو مرورگر باز بشه
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('فایل پروژه یافت نشد. لطفاً بعداً تلاش کنید.');
        }
    });
});

    // Demo/API Details Buttons
    const demoButtons = document.querySelectorAll('.btn-demo');
    demoButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const project = this.getAttribute('data-project');
            
            // Redirect to project detail page
            window.location.href = `projects/${project}-detail.html`;
        });
    });

    // Live API Test
    const testApiBtn = document.getElementById('testApiBtn');
    if (testApiBtn) {
        testApiBtn.addEventListener('click', async function() {
            const responseDiv = document.getElementById('apiResponse');
            const responseContent = document.getElementById('responseContent');
            
            try {
                // This is a sample API - replace with your actual API endpoint
                const apiUrl = 'https://jsonplaceholder.typicode.com/users';
                
                testApiBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال درخواست...';
                testApiBtn.disabled = true;
                
                const response = await fetch(apiUrl);
                const data = await response.json();
                
                // Format the response nicely
                const formattedResponse = JSON.stringify(data.slice(0, 3), null, 2);
                responseContent.textContent = formattedResponse;
                responseDiv.style.display = 'block';
                
                testApiBtn.innerHTML = '<i class="fas fa-play"></i> تست مجدد API';
                testApiBtn.disabled = false;
                
                // Scroll to response
                responseDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (error) {
                responseContent.textContent = `خطا در ارتباط با API: ${error.message}\n\nنکته: در نسخه واقعی، API خودتان را در اینجا قرار دهید.`;
                responseDiv.style.display = 'block';
                testApiBtn.innerHTML = '<i class="fas fa-play"></i> تست API زنده';
                testApiBtn.disabled = false;
            }
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formMessage = document.querySelector('.form-message');
            const submitBtn = this.querySelector('.btn-submit');
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (!name || !email || !message) {
                formMessage.innerHTML = '<span style="color: var(--error);">لطفاً تمام فیلدها را پر کنید!</span>';
                return;
            }
            
            // Simulate sending message
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                formMessage.innerHTML = '<span style="color: var(--success);">✅ پیام شما با موفقیت ارسال شد! به زودی با شما تماس می‌گیرم.</span>';
                contactForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ارسال پیام';
                submitBtn.disabled = false;
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    formMessage.innerHTML = '';
                }, 5000);
            }, 1500);
            
            // In real scenario, send data to your backend:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name, email, message })
            // });
        });
    }

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                bar.classList.add('animated');
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    };
    
    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Run once on load

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Typing effect for hero title (optional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !heroTitle.hasAttribute('data-typed')) {
        heroTitle.setAttribute('data-typed', 'true');
        // You can add typing effect here if desired
    }

    // Add current year to footer
    const footerYear = document.querySelector('.footer p');
    if (footerYear) {
        const year = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', year);
    }

    // Postman collection download
    const postmanLink = document.getElementById('postmanCollectionLink');
    if (postmanLink) {
        postmanLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const postmanCollection = {
                info: {
                    name: "Sample API Collection",
                    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
                },
                item: [
                    {
                        name: "Get Users",
                        request: {
                            method: "GET",
                            url: "https://api.example.com/v1/users",
                            header: []
                        }
                    },
                    {
                        name: "Create User",
                        request: {
                            method: "POST",
                            url: "https://api.example.com/v1/users",
                            header: [
                                {
                                    key: "Content-Type",
                                    value: "application/json"
                                }
                            ],
                            body: {
                                mode: "raw",
                                raw: JSON.stringify({
                                    name: "John Doe",
                                    email: "john@example.com"
                                }, null, 2)
                            }
                        }
                    }
                ]
            };
            
            const blob = new Blob([JSON.stringify(postmanCollection, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'postman-collection.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    // Console log for developer
    console.log('✅ وبسایت رزومه با موفقیت بارگذاری شد!');
    console.log('💜 طراحی شده با Theme مشکی و بنفش');
    console.log('🚀 برای بک‌اند کارها ساخته شده است');
});