//! Script.js

//Default theme
(function () {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (prefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", theme);
})();
//Note: Functions to display data in the HTML
//? Functions to name:
//* Create Full Name
function getFullName(personalData) {
  return `${personalData.firstName} ${personalData.lastName}`;
}
//* Render Full Name
function renderFullName(fullName) {
  const fullNameEl = document.getElementById("full-name");
  if (fullNameEl) fullNameEl.textContent = fullName;
}
function displaytagline(tagline) {
  const taglineElement = document.getElementById("tagline");
  if (!taglineElement) return;
  taglineElement.innerHTML = `<h3><span id="text"></span><span id="cursor">|</span></h3>`;
  const textSpan = document.getElementById("text");
  const cursorSpan = document.getElementById("cursor");
  let i = 0;
  function typeWriter() {
    if (i <= tagline.length) {
      textSpan.textContent = tagline.substring(0, i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      cursorSpan.style.animation = "blink 1s step-start infinite";
    }
  }
  typeWriter();
}

function displayProfile(profile, title) {
  const profileSection = document.getElementById("profile");
  if (!profileSection) return;
  let profileHTML = `<h2>${title}</h2>`;
  profileHTML += `<p>${profile}</p>`;
  profileSection.innerHTML = profileHTML;
}
//? Functions to Contact Information
//* Create Contact Information
function getContactInformation(personalData) {
  return `
    <a class="contact-item" href ="mailto:${personalData.email}" title="${personalData.email}"><i class="fas fa-envelope"></i></a> 
    <a class="contact-item" href="${personalData.linkedin}" target="_blank" title="${personalData.linkedin}" rel= "noopener noreferrer"><i class="fab fa-linkedin"></i></a> 
   <a class="contact-item" href="${personalData.github}" target="_blank" title="${personalData.github}" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
   <button id="download-pdf" class ="contact-item download-btn" title="CV-PDF"><i class="fas fa-file-download"></i></button>`;
}

//* Render Contact Information
function renderContactInformation(contactInfo) {
  const ids = ["contact-info", "footer-contact-info"];

  ids.forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.innerHTML = contactInfo;
  });
  const downloadBtn = document.getElementById("download-pdf");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      console.log("Idioma en descarga:", localStorage.getItem("language"));
      downloadPDF();
    });
  }
}

function displayLabelAndValue(labelId, valueId, labelText, valueText) {
  const labelElement = document.getElementById(labelId);
  const valueElement = document.getElementById(valueId);

  if (labelElement) labelElement.textContent = labelText;
  if (valueElement) valueElement.textContent = valueText;
}
//? Function to dinamic menu.
function displayNavbar(data) {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  // Clear existing content
  navbar.innerHTML = "";

  const sections = [
    { id: "top", icon: "fas fa-arrow-up", title: "Inicio" },
    { id: "profile", icon: "fas fa-user", title: data.labels.profile },
    {
      id: "technicalSkills",
      icon: "fas fa-code",
      title: data.labels.technicalSkillsTitle,
    },
    {
      id: "experience",
      icon: "fas fa-briefcase",
      title: data.labels.experience,
    },
    {
      id: "education",
      icon: "fas fa-graduation-cap",
      title: data.labels.education,
    },
    {
      id: "extra-sections",
      icon: "fas fa-globe",
      title: `${data.labels.languagesTitle} + ${data.labels.other}`,
    },
  ];
  sections.forEach((section) => {
    const link = document.createElement("a");
    link.href = `#${section.id}`;
    link.innerHTML = `<i class ="${section.icon}"></i> `;
    link.title = section.title;
    navbar.appendChild(link);
  });
}

function displayEducation(education) {
  const educationSection = document.getElementById("education");
  if (!educationSection) return;
  let educationHTML = `<h2>${education.title}</h2>`;
  educationHTML += "<ul>";
  education.items.forEach((edu) => {
    educationHTML += `<li><strong>${edu.degree}</strong> - <span class="highlight-role">
${edu.institution}</span><span class="date"> (${edu.startYear} - ${edu.endYear})</span><br>${edu.description}</li>`;
  });
  educationHTML += "</ul>";
  educationSection.innerHTML = educationHTML;
}

function displayExperience(experience) {
  const experienceSection = document.getElementById("experience");
  if (!experienceSection) return;
  let experienceHTML = `<h2>${experience.title}</h2><div class="timeline">`;

  experience.items.forEach((exp, index) => {
    const side = index % 2 === 0 ? "left" : "right";
          let techIcons= "";
            if(exp.technologies && exp.technologies.length > 0) {
              techIcons =`<div class="tech-icons">`+
              exp.technologies.map((tech)=>
              `<i class="${tech.iconClass}" title="${tech.name}" aria-label="${tech.name}"></i>`
            ).join("")+
              `</div>`;
            }
    experienceHTML += `
            <div class ="timeline-item ${side}">
            <div class ="timeline-content">
            <h3 class ="position">${exp.icon || " "} ${exp.position}</h3>
            <p class="location"><span  class="highlight-role"> ${
              exp.company
            }</span> | ${exp.location}</p>
            <p class ="date">(${exp.startDate} – ${exp.endDate})</p>
            ${techIcons}
            <p class="description">${exp.description}</p>
            </div>
            </div>
            `;
  });
  experienceHTML += "</div>";
  experienceSection.innerHTML = experienceHTML;

  // Accordion
  const items = document.querySelectorAll(".timeline-item");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });
}
function activarScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // solo una vez
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  const items = document.querySelectorAll(".timeline-item");
  items.forEach((item) => observer.observe(item));
}

function displaySkills(technicalSkills) {
  const skillsSection = document.getElementById("technicalSkills");
  if (!skillsSection) return;

  let skillsHTML = `<h2>${technicalSkills.title}</h2><ul class="skills-list">`;

  technicalSkills.categories.forEach((category) => {
    category.skills.forEach((skill) => {
      skillsHTML += `
        <li class="skill-item">
        <i class="${skill.iconClass}"></i>
        <span>${skill.name}</span>
        </li>
        `;
    });
    if (category.extra) {
      skillsHTML += `<p style="font-style: italic; font-size: 13px; margin-left: 10px; color: #555;">${category.extra}</p>`;
    }
  });
  skillsHTML += `</ul>`;
  skillsSection.innerHTML = skillsHTML;
}

function displayLanguages(languages) {
  const languagesSection = document.getElementById("languages");
  if (!languagesSection) return;
  let languagesHTML = `<h2>${languages.title}</h2>`;
  languagesHTML += `<ul>`;
  languages.items.forEach((lang) => {
    languagesHTML += `<li>
            <strong>${lang.language}</strong>: ${lang.level}`;
    if (lang.extra) {
      languagesHTML += `<br><small class="lang-extra">${lang.extra}</small>`;
    }
    languagesHTML += `</li>`;
  });
  languagesHTML += `</ul>`;
  languagesSection.innerHTML = languagesHTML;
}

function displayOthers(other) {
  const otherSection = document.getElementById("other");
  if (!otherSection) return;
  let otherHTML = `<h2>${other.title}</h2>`;
  otherHTML += `<ul>`;
  other.items.forEach((item) => {
    otherHTML += `<li>${item}</li>`;
  });
  otherHTML += `</ul>`;
  otherSection.innerHTML = otherHTML;
}

function activarFadeIn() {
  const fadeItems = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // solo una vez
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  fadeItems.forEach((item) => observer.observe(item));
}
function setupThemeToggle() {
    const controls = document.getElementById("user-controls");
    if (!controls) return;
  
    // Crear botón de modo
    const darkModeBtn = document.createElement("button");
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
    });
    const separator = document.createElement("div");
    separator.classList.add("separator");
    controls.appendChild(separator); 

    controls.appendChild(darkModeBtn); 
  
    
    
  }
  function iniciarParticulas() {
    tsParticles.load("particles-js", {
      fullScreen: {
        enable: false
      },
      background: {
        color: "transparent"
      },
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            area: 800
          }
        },
        color: {
          value: "348c74"
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.3
        },
        size: {
          value: { min: 1, max: 4 }
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: "none",
          outModes: {
            default: "bounce"
          }
        },
        links: {
          enable: true,
          distance: 100,
          color: "#5ec9b3",
          opacity: 0.2,
          width: 1
        }
      },
      detectRetina: true
    });
  }
  //*Setup buttons for language selection
function initLanguageSelector() {
  const buttons = document.querySelectorAll(".select-language");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.getAttribute("data-lang");
      const jsonPath = language === "es" ? "data_es.json" : "data_en.json";

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

// Load json and display it in the HTML
/**
 *  Load CV data from JSON file and display it in the HTML
 * @function loadCV
 * @async
 * @returns {Promise<void>} - A promise that resolves when the CV data is loaded and displayed
 *  This function fetches the CV data from a JSON file, processes it, and updates the HTML elements
 */
async function loadCV(jsonPath = "data.json") {
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error("Error loading JSON file");
    const data = await response.json();
    const labels = data.labels; // Labels for the CV

    //* Display Full Name
    const fullName = getFullName(data.personalData);
    renderFullName(fullName);

    //* Display Tagline
    displaytagline(data.tagline);

    //* Display Profile
    displayProfile(data.profile, labels.profile);

    //* Display Contact Information
    const contactInfo = getContactInformation(data.personalData);
    renderContactInformation(contactInfo);
    displayNavbar(data);

    
  //* Display location
    displayLabelAndValue(
    'label-location',
    'location',
    labels.location,
    data.personalData.location
        )

    //* Display Education
    displayEducation(data.education);

    //* Display Work Experience
    displayExperience(data.experience);
    activarScrollReveal();

    //* Display Skills
    displaySkills(data.technicalSkills);

    //* Display Languages
    displayLanguages(data.languages);

    //* Display other
    displayOthers(data.other);

    activarFadeIn();
    
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadCV("data_es.json"); // Default to Spanish
  const defaultBtn = document.querySelector('[data-lang="es"]');
  if (defaultBtn) defaultBtn.classList.add("active"); // Set default button as active

  initLanguageSelector();
  setupThemeToggle();
  iniciarParticulas();
});