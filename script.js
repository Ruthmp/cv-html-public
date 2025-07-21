//! Script.js

//Note: Functions to display data in the HTML
//? Functions to name:
//* Create Full Name
function getFullName(personalData) {
    return `${personalData.firstName} ${personalData.lastName}`;
}
//* Render Full Name
function renderFullName(fullName) {
    const fullNameEl = document.getElementById('full-name');
    if (fullNameEl) fullNameEl.textContent = fullName;
}

function displayProfile(profile){
    const profileElement = document.getElementById('profile');
    if (profileElement) profileElement.textContent = profile;
}
//? Functions to Contact Information
//* Create Contact Information
function getContactInformation(personalData){
    return `
    <a class="contact-item" href ="mailto:${personalData.email}" title="${personalData.email}"><i class="fas fa-envelope"></i></a> 
    <a class="contact-item" href="${personalData.linkedin}" target="_blank" title="${personalData.linkedin}" rel= "noopener noreferrer"><i class="fab fa-linkedin"></i></a> 
   <a class="contact-item" href="${personalData.github}" target="_blank" title="${personalData.github}" rel="noopener noreferrer"><i class="fab fa-github"></a>`
   
;
}

//* Render Contact Information
function renderContactInformation(contactInfo) {
    const ids = ['contact-info', 'footer-contact-info'];
  
    ids.forEach(id => {
      const element = document.getElementById(id);
      if (element) element.innerHTML = contactInfo;
    });
  }

function displayLabelAndValue (labelId, valueId, labelText, valueText){
    const labelElement = document.getElementById(labelId);
    const valueElement = document.getElementById(valueId);

    if(labelElement) labelElement.textContent= labelText;
    if(valueElement) valueElement.textContent = valueText;
}
//? Function to dinamic menu.
function displayNavbar(data){
    const navbar = document.getElementById('navbar');
    if(!navbar) return;
    const sections=[
        {id: 'education', title: data.labels.education},
        {id:'experience', title: data.labels.experience},
        {id:'technicalSkills', title: data.labels.technicalSkillsTitle},
        {id:'languages', title: data.labels.languagesTitle},
        {id:'other', title: data.labels.other}
    ]
    sections.forEach(section=>{
        const link= document.createElement('a');
        link.href= `#${section.id}`;
        link.textContent = section.title;
        navbar.appendChild(link);
    })
}

function displayEducation(education){
    const educationSection = document.getElementById('education');
    if(!educationSection) return;
        let educationHTML = `<h2>${education.title}</h2>`;
        educationHTML += '<ul>';
        education.items.forEach(edu =>{
            educationHTML += `<li><strong>${edu.degree}</strong> - <span class="highlight-role">
${edu.institution}</span><span class="date"> (${edu.startYear} - ${edu.endYear})</span><br>${edu.description}</li>`;
        })
        educationHTML += '</ul>';
        educationSection.innerHTML = educationHTML;
}

function displayExperience(experience){
    const experienceSection = document.getElementById("experience");
    if (!experienceSection) return;
    console.log("✅ Datos de experiencia recibidos:", experience);
    let experienceHTML = `<h2>${experience.title}</h2><div class="timeline">`;

    experience.items.forEach((exp, index) => {
        console.log("🧱 Item:", exp);
        const side = index % 2 === 0 ? "left" : "right";
        experienceHTML += `
            <div class ="timeline-item ${side}">
            <div class ="timeline-content">
            <h3 class ="position">${exp.icon || " "} ${exp.position}</h3>
            <p class="location"><span  class="highlight-role"> ${exp.company}</span> | ${exp.location}</p>
            <p class ="date">(${exp.startDate} – ${exp.endDate})</p>
            <p class="description">${exp.description}</p>
            </div>
            </div>
            `;
    });
    experienceHTML += "</div>";
    experienceSection.innerHTML = experienceHTML;

  // Accordion
const items = document.querySelectorAll('.timeline-item');
items.forEach(item => {
    item.addEventListener('click', () => {
    item.classList.toggle('open');
        });
    });
}
function activarScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('visible');
          observer.unobserve(entry.target); // solo una vez
        }
    });
    }, {
    threshold: 0.2
    });

    const items = document.querySelectorAll('.timeline-item');
    items.forEach(item => observer.observe(item));
}





function displaySkills(technicalSkills) {
    const skillsSection = document.getElementById('technicalSkills');
    if (!skillsSection) return;

    let skillsHTML = `<h2>${technicalSkills.title}</h2>`;

    technicalSkills.categories.forEach(category => {
    skillsHTML += `<h3>${category.name}</h3><ul class="skills-list" style="list-style:none; padding:0; display:flex; flex-wrap:wrap; gap:15px;">`;

    category.skills.forEach(skill => {
        skillsHTML += `
        <li class="skill-item">
        <i class="${skill.iconClass}"></i>
        <span>${skill.name}</span>
        </li>
        `;
    });

    skillsHTML += `</ul>`;

    if (category.extra) {
        skillsHTML += `<p style="font-style: italic; font-size: 13px; margin-left: 10px; color: #555;">${category.extra}</p>`;
    }
    });

    skillsSection.innerHTML = skillsHTML;
}



function displayLanguages(languages){
    const languagesSection = document.getElementById('languages');
    if(!languagesSection) return;
        let languagesHTML = `<h2>${languages.title}</h2>`;
        languagesHTML+=`<ul>`;
        languages.items.forEach(lang =>{
            languagesHTML+= `<li><strong>${lang.language}</strong>: ${lang.level}</li>`;
        });
        languagesHTML+=`</ul>`;
        languagesSection.innerHTML = languagesHTML;
}

function displayOthers(other){
    const otherSection = document.getElementById('other');
    if(!otherSection) return;
        let otherHTML = `<h2>${other.title}</h2>`;
        otherHTML+=`<ul>`;
        other.items.forEach(item =>{
            otherHTML+=`<li>${item}</li>`;
        });
        otherHTML+=`</ul>`;
        otherSection.innerHTML = otherHTML;
}
// Load json and display it in the HTML
/**
 *  Load CV data from JSON file and display it in the HTML
 * @function loadCV
 * @async
 * @returns {Promise<void>} - A promise that resolves when the CV data is loaded and displayed
 *  This function fetches the CV data from a JSON file, processes it, and updates the HTML elements
 */
async function loadCV() {
    try{
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Error loading JSON file');
        const data = await response.json();
        const labels= data.labels; // Labels for the CV
        
        //* Display Full Name
        const fullName = getFullName(data.personalData);
        renderFullName(fullName);

    
        //* Display Profile
        displayProfile(data.profile);
        
        //* Display Contact Information
        const contactInfo = getContactInformation(data.personalData);
        renderContactInformation(contactInfo);
        displayNavbar(data);
        /*
        //* Display birth date
        displayLabelAndValue(
            'label-birthDate',
            'birth-date',
            labels.birthDate,
            data.personalData.birthDate
        )

        //* Display location
        displayLabelAndValue(
            'label-location',
            'location',
            labels.location,
            data.personalData.location
        )*/

        //* Display Education
        displayEducation(data.education)

        //* Display Work Experience
        displayExperience(data.experience)
        activarScrollReveal();

        //* Display Skills
        displaySkills(data.technicalSkills)

        //* Display Languages
        displayLanguages(data.languages)

        //* Display other
        displayOthers(data.other)

    } catch (error){
        console.error('Error loading JSON:', error);
    }
    
}
window.addEventListener('DOMContentLoaded', loadCV);