 //*Setup buttons for language selection
function initLanguageSelector() {
    const buttons = document.querySelectorAll(".select-language");
    buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const language = button.getAttribute("data-lang");
        const jsonPath = language === "es" ? "data/data_es.json" : "data/data_en.json";

        // Save the selected language in localStorage
        localStorage.setItem("language", language);

        // Load the selected language CV
        loadCV(jsonPath);
        updateFooter(language);

        // Update the active button
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        });
    });
}
function defaultLanguage(){
    const defaultBtn = document.querySelector('[data-lang="es"]');
    if (defaultBtn) defaultBtn.classList.add("active"); // Set default button as active

    updateFooter('es'); // Default to Spanish footer

}
function updateFooter(language){
    const footerInfo = document.getElementById("footer-info");

    const footerTexts = {
        es: `
        <p>Ilustraciones de <a href="https://lummi.ai" target="_blank" rel="noopener noreferrer">Lummi</a>. Iconos de 
            <a href="https://fontawesome.com/" target="_blank" rel="noopener noreferrer">Font Awesome</a>, 
            <a href="https://devicon.dev/" target="_blank" rel="noopener noreferrer">Devicon</a> y 
            <a href="https://flagicons.lipis.dev/" target="_blank" rel="noopener noreferrer">Flag Icons</a>. 
            Tipografías de <a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer">Google Fonts</a>.
        </p>`,
        en: `
        <p>Illustrations from <a href="https://lummi.ai" target="_blank" rel="noopener noreferrer">Lummi</a>. Icons by 
            <a href="https://fontawesome.com/" target="_blank" rel="noopener noreferrer">Font Awesome</a>, 
            <a href="https://devicon.dev/" target="_blank" rel="noopener noreferrer">Devicon</a>, and 
            <a href="https://flagicons.lipis.dev/" target="_blank" rel="noopener noreferrer">Flag Icons</a>. 
            Fonts from <a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer">Google Fonts</a>.
        </p>`
    };
    footerInfo.innerHTML = footerTexts[language] || footerTexts['es']; // Default to Spanish if language not found
}