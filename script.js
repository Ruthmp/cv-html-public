// Load json and display it in the HTML
async function loadCV() {
    try{
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Error loading JSON file');
        const data = await response.json();
        const labels= data.labels; // Labels for the CV

        //* Display Full Name
        const fullName=`${data.personalData.firstName} ${data.personalData.lastName}`;
        document.getElementById('full-name').textContent= fullName;

        //* Display Profile
        document.getElementById('profile').textContent= data.profile;
        
        //* Display Contact Information
        const contactInfo = `Email: ${data.personalData.email} | LinkedIn: ${data.personalData.linkedin} | GitHub: ${data.personalData.github}`;
        document.getElementById('contact-info').textContent = contactInfo;
        
        //* Display birth date
        document.getElementById('label-birthDate').textContent = labels.birthDate;
        document.getElementById('birth-date').textContent = data.personalData.birthDate;

        //* Display location
        document.getElementById('label-location').textContent = labels.location;
        document.getElementById('location').textContent = data.personalData.location;

        //* Display Education
        const educationSection = document.getElementById('education');
        let educationHTML = `<h2>${data.education.title}</h2>`;
        data.education.items.forEach(edu =>{
            educationHTML += `<li><strong>${edu.degree}</strong> - ${edu.institution} (${edu.startYear} - ${edu.endYear})<br>${edu.description}</li>`;
        })
        educationHTML += '</ul>';
        educationSection.innerHTML = educationHTML;

        //* Display Work Experience
        const experienceSection = document.getElementById('experience');
        let experienceHTML = `<h2>${data.experience.title}</h2>`;
        data.experience.items.forEach(exp =>{
            experienceHTML+= `<li><strong>${exp.position}</strong> <br> ${exp.company} (${exp.startDate} &ndash; ${exp.endDate}) | ${exp.location}<br>${exp.description}</li>`;
        })
        experienceHTML += '</ul>';
        experienceSection.innerHTML = experienceHTML;

    } catch (error){
        console.error('Error loading JSON:', error);
    }
    
}
window.addEventListener('DOMContentLoaded', loadCV);