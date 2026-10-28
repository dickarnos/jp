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
// Effect au déplacement de la souris
// const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// const isTouch = window.matchMedia('(pointer: coarse)').matches; 
// const shouldRun = !isReducedMotion && !isTouch;

// if (shouldRun) {
//     const pointer = document.querySelector(".pointer");
//     let mouseX = 0;
//     let mouseY = 0;

//     window.addEventListener("mousemove", e => {
//         mouseX = e.clientX;
//         mouseY = e.clientY;

//         function animate() {
//             pointer.style.setProperty('--mouseX', `${mouseX}px`);
//             pointer.style.setProperty('--mouseY', `${mouseY}px`);
//             requestAnimationFrame(animate);
//         }

//         animate();
//     })
// }

// Effet de saisie caractére par caractére
const words = ["Designer d’interfaces web", "Concepteur de sites web", "Designer UI/UX", "Dévloppeur web freelance", "Testeur logiciel"];
const el = document.querySelector('.subtitle span');
let i = 0, char = 0, deleting = false;

function tick() {
  const w = words[i];
  el.textContent = w.slice(0, char);
  if (!deleting && char === w.length) {
    deleting = true;
    return setTimeout(tick, 1500);           // pause mot complet
  }
  if (deleting && char === 0) {
    deleting = false;
    i = (i + 1) % words.length;
    return setTimeout(tick, 300);
  }
  char += deleting ? -1 : 1;
  setTimeout(tick, deleting ? 90 : 200);
}
tick();


// Menu de navigation pour les thèmes
const themes = [
    {
        name: "gold",
        message: "l\'élégance dans chaque détail"
    },
    {
        name: "blush",
        message: "La douceur d\'un design intemporel"
    },
    {
        name: "midnight",
        message: "La technologie au service de l'innovation."
    },
];
const themeSelector = document.getElementById("theme-selector");
const themeDropdown = document.getElementById("theme-dropdown");
const themeItems = document.querySelectorAll('[role="menuitem"]');

function toggleMenu() {
  const isExpanded =
    themeSelector.getAttribute("aria-expanded") === "true";

  themeDropdown.hidden = isExpanded;

  themeSelector.setAttribute("aria-expanded", String(!isExpanded));
}

themeSelector.addEventListener("click", toggleMenu);

function selectedTheme(theme) {
    // Vérifier si le thème existe
    const selectedTheme = themes.find(t => t.name === theme);
    if(!selectedTheme) return;

    // supprimer les thèmes précédent
    themes.forEach(t => {
        document.body.classList.remove(t.name);
    });

    // Appliquer le thème selectionner
    document.body.classList.add(selectedTheme.name)

    // Fermer la fenétre
    themeDropdown.hidden = true;
    themeSelector.setAttribute("aria-expanded", false);
}


themeItems.forEach((item) => {
    item.addEventListener("click", () => {
        const theme = item.id;
        selectedTheme(theme);
    })

    item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();

            const themeName = item.id;
            selectedTheme(themeName);
        }
    });
})

// Close the menu with Escape.
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    !themeDropdown.hidden
  ) {
    themeDropdown.hidden = true;
    themeSelector.setAttribute("aria-expanded", "false");
    themeSelector.focus();
  }
});