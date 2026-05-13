document.addEventListener('DOMContentLoaded', () => {
    // Menu Hambúrguer
    const menuBtn = document.querySelector('.menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('.close-btn');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => sidebar.classList.add('active'));
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', () => sidebar.classList.remove('active'));
    }

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('active') && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Título Animado (Digitação) - Apenas na Home
    const typingTitle = document.querySelector('.typing');
    if (typingTitle) {
        const text = "Bem-vindo ao Nosso Mundo";
        let i = 0;
        function type() {
            if (i < text.length) {
                typingTitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        type();
    }

    // Título Ondulado - Apenas no Contato
    const waveTitle = document.querySelector('.wave-text');
    if (waveTitle) {
        const text = "Vamos Conversar?";
        waveTitle.innerHTML = text.split('').map((char, i) => 
            `<span style="animation-delay: ${i * 0.1}s">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
    }

    // Carrossel de Imagens
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (carouselInner) {
        let currentIndex = 0;
        let interval;

        function updateCarousel(index) {
            currentIndex = index;
            if (currentIndex >= items.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = items.length - 1;
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        }

        function startInterval() {
            interval = setInterval(() => updateCarousel(currentIndex + 1), 4000);
        }

        nextBtn.addEventListener('click', () => {
            updateCarousel(currentIndex + 1);
            clearInterval(interval);
            startInterval();
        });

        prevBtn.addEventListener('click', () => {
            updateCarousel(currentIndex - 1);
            clearInterval(interval);
            startInterval();
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                updateCarousel(i);
                clearInterval(interval);
                startInterval();
            });
        });

        const carousel = document.querySelector('.carousel');
        carousel.addEventListener('mouseenter', () => clearInterval(interval));
        carousel.addEventListener('mouseleave', startInterval);

        startInterval();
    }

    // Contador de Visitas
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        let visits = localStorage.getItem('visits') || 0;
        visits++;
        localStorage.setItem('visits', visits);
        const visitCounter = document.getElementById('visitCounter');
        if (visitCounter) visitCounter.textContent = visits;
    }

    // Botão Voltar ao Topo
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Barras de Habilidades Animadas
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.width = progress + '%';
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    // Modais de Serviços
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const closeBtnModal = document.querySelector('.close-modal');

    document.querySelectorAll('.btn-more').forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('data-title');
            const desc = btn.getAttribute('data-desc');
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modal.style.display = 'flex';
        });
    });

    if (closeBtnModal) {
        closeBtnModal.addEventListener('click', () => modal.style.display = 'none');
    }
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Validação de Formulário
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                alert('Mensagem enviada com sucesso! (Simulado)');
                contactForm.reset();
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }

    // Ano Atual no Rodapé
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
