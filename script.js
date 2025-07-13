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
    return `Email: ${personalData.email} | LinkedIn: ${personalData.linkedin} | GitHub: ${personalData.github}`;
}

//* Render Contact Information
function renderContactInformation(contactInfo){
    const contactInfoElement =  document.getElementById('contact-info');
    if (contactInfoElement) contactInfoElement.textContent = contactInfo;
}

function displayLabelAndValue (labelId, valueId, labelText, valueText){
    const labelElement = document.getElementById(labelId);
    const valueElement = document.getElementById(valueId);

    if(labelElement) labelElement.textContent= labelText;
    if(valueElement) valueElement.textContent = valueText;
}

function displayEducation(education){
    const educationSection = document.getElementById('education');
    if(!educationSection) return;
        let educationHTML = `<h2>${education.title}</h2>`;
        educationHTML += '<ul>';
        education.items.forEach(edu =>{
            educationHTML += `<li><strong>${edu.degree}</strong> - ${edu.institution} (${edu.startYear} - ${edu.endYear})<br>${edu.description}</li>`;
        })
        educationHTML += '</ul>';
        educationSection.innerHTML = educationHTML;
}

function displayExperience(experience){
    const experienceSection = document.getElementById('experience');
    if(!experienceSection) return;
        let experienceHTML = `<h2>${experience.title}</h2>`;
        experienceHTML += '<ul>';
        experience.items.forEach(exp =>{
            experienceHTML+= `<li><strong>${exp.position}</strong> <br> ${exp.company} (${exp.startDate} &ndash; ${exp.endDate}) | ${exp.location}<br>${exp.description}</li>`;
        })
        experienceHTML += '</ul>';
        experienceSection.innerHTML = experienceHTML;
}
function displaySkills(technicalSkills){
    const skillsSection = document.getElementById('technicalSkills');
    if(!skillsSection) return;
        let skillsHTML = `<h2>${technicalSkills.title}</h2>`;
        technicalSkills.categories.forEach(category =>{
            skillsHTML+=`<h3>${category.name}</h3><ul>`;
            category.skills.forEach(skill=>{
                skillsHTML+=`<li>${skill}</li>`;
            });
            skillsHTML+=`</ul>`;
        })
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
        )

        //* Display Education
        displayEducation(data.education)

        //* Display Work Experience
        displayExperience(data.experience)

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