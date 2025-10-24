// ==================== VARIÁVEIS GLOBAIS ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const floatingButton = document.querySelector('.floating-button');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// ==================== MENU HAMBURGER ====================
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== BOTÃO FLUTUANTE (SCROLL TO TOP) ====================
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        floatingButton.classList.add('show');
    } else {
        floatingButton.classList.remove('show');
    }
});

floatingButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== TABS ====================
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // Remove classe ativa de todos os botões e conteúdos
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Adiciona classe ativa ao botão clicado e seu conteúdo
        button.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// ==================== ANIMAÇÃO DE SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.card, .attr-item, .area-card, .salary-card, .cycle-card, .market-stat').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
});

// ==================== EFEITO PARALLAX ====================
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ==================== ANIMAÇÃO DE NÚMEROS ====================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animar números quando entram em view
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            statNumbers.forEach(number => {
                const target = parseInt(number.textContent.replace(/\D/g, ''));
                animateCounter(number, target);
            });
            hasAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (statNumbers.length > 0) {
    statsObserver.observe(statNumbers[0].closest('.market-stat'));
}

// ==================== RIPPLE EFFECT ====================
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Remover ripple anterior se existir
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
}

// Adicionar efeito ripple aos botões
const buttons = document.querySelectorAll('.cta-button, .cta-button-large, .tab-button');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// ==================== SMOOTH SCROLL PARA LINKS INTERNOS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== EFEITO DE HOVER NOS CARDS ====================
const cards = document.querySelectorAll('.card, .attr-item, .area-card, .cycle-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 8px 32px rgba(76, 175, 80, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// ==================== ANIMAÇÃO DE DIGITAÇÃO ====================
function typeWriter(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efeito de digitação ao título hero
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter(heroTitle, originalText, 80);
                titleObserver.unobserve(entry.target);
            }
        });
    });
    titleObserver.observe(heroTitle);
}

// ==================== VALIDAÇÃO E INTERATIVIDADE ADICIONAL ====================
// Adicionar classe de animação aos elementos quando carregam
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==================== DARK MODE TOGGLE (OPCIONAL) ====================
// Descomente se desejar adicionar toggle de dark mode
/*
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.classList.add('dark-mode-toggle');
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Carregar preferência de dark mode
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
*/

// ==================== MODAL PARA MAIS INFORMAÇÕES (OPCIONAL) ====================
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${title}</h2>
            <p>${content}</p>
        </div>
    `;
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    });
}

// ==================== FORM VALIDATION (SE HOUVER FORMULÁRIO) ====================
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Adicionar lógica de validação aqui
        console.log('Formulário enviado');
    });
});

// ==================== EFEITO DE FADE-IN AO CARREGAR ====================
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('section');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s forwards`;
    });
});

// ==================== DETECÇÃO DE NAVEGADOR ====================
function detectBrowser() {
    const ua = navigator.userAgent;
    if (ua.indexOf('Firefox') > -1) {
        document.body.classList.add('firefox');
    } else if (ua.indexOf('Chrome') > -1) {
        document.body.classList.add('chrome');
    } else if (ua.indexOf('Safari') > -1) {
        document.body.classList.add('safari');
    }
}

detectBrowser();

// ==================== PERFORMANCE: LAZY LOADING ====================
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
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
    
    images.forEach(img => imageObserver.observe(img));
}

// ==================== CONSOLE LOG PARA DEBUG ====================
console.log('Script carregado com sucesso!');
console.log('Fisioterapia - Site Profissional v1.0');
