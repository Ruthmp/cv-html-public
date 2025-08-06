//Default theme
(function () {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme || (prefersDark ? "dark" : "light");

    document.documentElement.setAttribute("data-theme", theme);
})();

  //? Function to dark/light mode toggle
function setupThemeToggle() {
    const controls = document.getElementById("user-controls");
    if (!controls) return;

    // Create a button for dark mode toggle
    const darkModeBtn = document.createElement("button");
    darkModeBtn.setAttribute("aria-label", "Cambiar entre tema claro y oscuro");
    darkModeBtn.id = "theme-toggle";
    darkModeBtn.title = "Modo oscuro/claro";

    const currentTheme = document.documentElement.getAttribute("data-theme");
    darkModeBtn.innerHTML = currentTheme === "dark"
    ? `<i class="fas fa-sun"></i>`
    : `<i class="fas fa-moon"></i>`;

    darkModeBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);

    darkModeBtn.innerHTML = next === "dark"
        ? `<i class="fas fa-sun"></i>`
        : `<i class="fas fa-moon"></i>`;

        if (tsParticles.domItem(0)) {
            tsParticles.domItem(0).destroy();
        }
        initParticles();
    });
    const separator = document.createElement("div");
    separator.classList.add("separator");
    controls.appendChild(separator); 

    controls.appendChild(darkModeBtn); 
}

//* Function to check current theme
function getParticleColorsByTheme(){
    const isDark = document.documentElement.getAttribute('data-theme')==='dark';

    return{
        particleColor: isDark? '#d02398' : '#d02398', 
        linkColor: isDark? '#f15fb7' : '#d02398'
    
    };
}