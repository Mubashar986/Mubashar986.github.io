// CV Interactive Enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    // Observe all projects for staggered reveal
    document.querySelectorAll('.project').forEach((proj, i) => {
        proj.style.opacity = '0';
        proj.style.transform = 'translateY(15px)';
        proj.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
        observer.observe(proj);
    });

    // Add visible class handler
    const style = document.createElement('style');
    style.textContent = `.project.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);

    // Skill tag hover glow effect
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-1px) scale(1.03)';
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth header parallax on scroll
    const header = document.querySelector('.header');
    if (header && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < 400) {
                header.style.transform = `translateY(${scrolled * 0.08}px)`;
                header.style.opacity = Math.max(0.85, 1 - scrolled * 0.0008);
            }
        }, { passive: true });
    }

    // Print timestamp
    window.addEventListener('beforeprint', () => {
        console.log(`CV printed at: ${new Date().toISOString()}`);
    });
});
