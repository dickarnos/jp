// Gestion du menu mobile
const menuToggle = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');

// Vérification : on sort si les éléments n'existent pas sur la page
if (menuToggle && navLinks) {

    // Fonction pour fermer le menu
    function closeMenu() {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute(
            'aria-label',
            'Ouvrir le menu de navigation'
        );
    }

    // Fonction pour ouvrir le menu
    function openMenu() {
        navLinks.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute(
            'aria-label',
            'Fermer le menu de navigation'
        );
    }

    // Ouvrir ou fermer le menu en cliquant sur le bouton
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // évite que le clic soit capté par le document
        const isExpanded =
            menuToggle.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Fermer le menu avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'Escape' &&
            navLinks.classList.contains('active')
        ) {
            closeMenu();
            menuToggle.focus();
        }
    });

    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', (e) => {
        if (
            navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            closeMenu();
        }
    });

    // Réinitialiser le menu lors du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        if (
            window.innerWidth > 768 && // adapte ce seuil à ton breakpoint CSS
            navLinks.classList.contains('active')
        ) {
            closeMenu();
        }
    });
}
const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(pointer: coarse)').matches; 
const shouldRun = !isReducedMotion && !isTouch;

if (shouldRun) {
    const pointer = document.querySelector(".pointer");
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", e => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        function animate() {
            pointer.style.setProperty('--mouseX', `${mouseX}px`);
            pointer.style.setProperty('--mouseY', `${mouseY}px`);
            requestAnimationFrame(animate);
        }

        animate();
    })
}