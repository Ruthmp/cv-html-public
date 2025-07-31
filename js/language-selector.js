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

        // Update the active button
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        });
    });
}
function defaultLanguage(){
    const defaultBtn = document.querySelector('[data-lang="es"]');
    if (defaultBtn) defaultBtn.classList.add("active"); // Set default button as active

}