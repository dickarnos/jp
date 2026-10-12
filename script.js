// Gestion du menu mobile avec mise à jour de aria-expanded
const menuToggle = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    // Mettre à jour le label du bouton
    menuToggle.setAttribute(
        'aria-label',
        isExpanded ? 'Ouvrir le menu de navigation' : 'Fermer le menu de navigation'
    );
});

// Fermer le menu avec la touche Échap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
        menuToggle.focus();
    }
});