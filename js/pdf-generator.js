//* Function to check if a new page is needed
function checkAddPage(doc, y, lineHeight) {
  const pageHeight = 297;
  const marginBottom = 20;
  if (y + lineHeight > pageHeight - marginBottom) {
    doc.addPage();
    return 10;
  }
  return y;
}
//* Get the current language from localStorage or default to Spanish
function getCurrentLanguage() {
  return localStorage.getItem("language") || "es"; // Default to Spanish
}
function removeEmojis(text) {
  return text.replace(/[^A-Za-z0-9ÁÉÍÓÚáéíóúÑñÜü \-.,]/g, ""); // remove emojis Unicode
}
//* Function to add the profile photo to the PDF
function addPhotoToPDF(doc, y) {
  const img = document.getElementById("profile-photo");
  if (!img) return y;

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const imageData = canvas.toDataURL("image/jpeg");

  // Coordinates and size in the PDF
  const x = 160; // right side of the page
  const width = 30;
  const height = 30;

  doc.addImage(imageData, "JPEG", x, y, width, height);
  return y + img.naturalHeight * (width / img.naturalWidth) + 10; // Adjust y position for next section
}

//* Function to generate the header section of the CV
function generateHeader(doc, data, y) {
  const fullName = getFullName(data.personalData);
  const imageHeight = 30;
  const fontSize = 26;
  const fontOffset = fontSize * 0.35;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(fontSize);
  const textY = y + imageHeight / 2 + fontOffset / 2;
  doc.text(fullName, 15, textY);
  return y + imageHeight + 10;
}

//* Function to generate the profile section of the CV
function generateProfile(doc, data, y) {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(94, 201, 179);
    doc.setFontSize(14);
    doc.text(data.labels.profile, 15, y);
    y += 4;
    doc.setDrawColor(180); // light gray
    doc.setLineWidth(0.3);
    doc.line(15, y, 200, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    const profileLines = doc.splitTextToSize(data.profile, 180);
    doc.text(profileLines, 15, y);
     return y + profileLines.length * 7;
}

//* Function to generate the contact information section of the CV
function generateContactInfo(doc, data, y) {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(94, 201, 179);
    doc.setFontSize(14);
    doc.text(data.labels.contact, 15, y);
    y += 4;
    doc.setDrawColor(180); // light gray
    doc.setLineWidth(0.3);
    doc.line(15, y, 200, y);
    y += 6;
  
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
  
    // Email
    doc.setFont(undefined, 'bold');
    doc.text(data.labels.email, 15, y);
    const labelWidth = doc.getTextWidth(data.labels.email + ' ');
    doc.setFont(undefined, 'normal');
    doc.text(data.personalData.email, 15 + labelWidth, y);
    y += 8;
  
    // LinkedIn
    doc.setFont(undefined, 'bold');
    doc.text(data.labels.linkedin, 15, y);
    const labelWidth2 = doc.getTextWidth(data.labels.linkedin + ' ');
    doc.setFont(undefined, 'normal');
    doc.text(data.personalData.linkedin, 15 + labelWidth2, y);
    // Clickable link for LinkedIn
    doc.link(
      10 + labelWidth2,
      y - 5,
      doc.getTextWidth(data.personalData.linkedin),
      6,
      { url: data.personalData.linkedin }
    );
    y += 8;
  
    // GitHub
    doc.setFont(undefined, 'bold');
    doc.text(data.labels.github, 15, y);
    const labelWidth3 = doc.getTextWidth(data.labels.github + ' ');
    doc.setFont(undefined, 'normal');
    doc.text(data.personalData.github, 15 + labelWidth3, y);
    // Clickable link for GitHub
    doc.link(
      10 + labelWidth3,
      y - 5,
      doc.getTextWidth(data.personalData.github),
      6,
      { url: data.personalData.github }
    );
    y += 8;
  
    return y;
  }
  

//*Function to genereta the Skills section
function generateTechnicalSkills(doc, data, y) {
  const skills = data.technicalSkills;
  y += 10; // Add space before skills section
  doc.setFont("helvetica", "bold");
  doc.setTextColor(94, 201, 179);
  doc.setFontSize(14);
  doc.text(skills.title, 15, y);
  y += 4;
  doc.setDrawColor(180); // light gray
  doc.setLineWidth(0.3);
  doc.line(15, y, 200, y);
  y += 6;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  skills.categories.forEach((category) => {
    //Title for each category
    doc.setFont("helvetica", "bold");
    doc.text(`• ${category.name}`, 17, y);
    y += 6;

    //Skills in each category
    doc.setFont("helvetica", "normal");
    const skillNames = category.skills.map((skill) => skill.name).join(", ");
    const skillLines = doc.splitTextToSize(skillNames, 180);
    doc.text(skillLines, 19, y);
    y += skillLines.length * 6 + 4; // Adjust y position for next category
  });
  return y;
}

//* Function to generate the experience section of the CV
function generateExperience(doc, data, y) {
  const experience = data.experience;
  y += 10; // Add space before experience section
  doc.setFont("helvetica", "bold");
  doc.setTextColor(94, 201, 179);
  doc.setFontSize(14);
  doc.text(experience.title, 15, y);
  y += 4;
  doc.setDrawColor(180); // light gray
  doc.setLineWidth(0.3);
  doc.line(15, y, 200, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  experience.items.forEach((item) => {
    y = checkAddPage(doc, y, 7);
    //Job title and company
    const jobPosition = `${item.position} - ${item.company} (${item.startDate} - ${item.endDate})`;
    doc.setFont("helvetica", "bold");
    doc.text(jobPosition, 17, y);
    y += 7;

    //Location
    doc.setFont("helvetica", "italic");
    doc.text(item.location, 17, y);
    y += 7;

    //Technologies
    if (item.technologies && item.technologies.length > 0) {
      const techNames = item.technologies.map((t) => t.name).join(", ");
      const techLines = doc.splitTextToSize(
        `${data.labels.technologies}: ${techNames}`,
        180
      );
      doc.setFont("helvetica", "italic");
      doc.text(techLines, 17, y);
      y += techLines.length * 6 + 4; // Adjust y position for next item
    }
    //Description
    const descriptionLines = doc.splitTextToSize(item.description, 180);
    doc.setFont("helvetica", "normal");
    doc.text(descriptionLines, 17, y);
    y += descriptionLines.length * 6 + 4; // Adjust y position for next item
  });
  return y;
}

//* Function to generate education section of the CV
function generateEducation(doc, data, y) {
  const education = data.education;
  y += 10; // Add space before education section
  doc.setFont("helvetica", "bold");
  doc.setTextColor(94, 201, 179);
  doc.setFontSize(14);
  doc.text(education.title, 15, y);
  y += 4;
  doc.setDrawColor(180); // light gray
  doc.setLineWidth(0.3);
  doc.line(15, y, 200, y);
  y += 6;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  education.items.forEach((item) => {
    y = checkAddPage(doc, y, 7);
    //Degree and institution
   // Part 1: Title and university in bold
   doc.setFont("helvetica", "bold");
   doc.setFontSize(12);
   const text1 = `${item.degree} `;
   doc.text(text1, 17, y);

   // Part 2: Dates in italics, right after (aligned to the right)
   const dateText = `- ${item.institution} (${item.startYear} - ${item.endYear})`;
   doc.setFont("helvetica", "italic");
   const pageWidth = doc.internal.pageSize.getWidth();
   const textWidth = doc.getTextWidth(dateText);
   doc.text(dateText, pageWidth - textWidth - 15, y);
    y += 7;

    //Description
    doc.setFont("helvetica", "normal");
    const descriptionLines = doc.splitTextToSize(item.description, 180);
    doc.text(descriptionLines, 17, y);
    y += descriptionLines.length * 6 + 4; // Adjust y position for next item
  });
  return y;
}
//*Function to generate language section of the CV
function generateLanguages(data, doc, y) {
  const language = data.languages;
  y += 10; // Add space before languages section
  doc.setFont("helvetica", "bold");
  doc.setTextColor(94, 201, 179);
  doc.setFontSize(14);
  doc.text(language.title, 15, y);
  y += 4;
  doc.setDrawColor(180); // light gray
  doc.setLineWidth(0.3);
  doc.line(15, y, 200, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  language.items.forEach((item) => {
    y = checkAddPage(doc, y, 7);
    //Language and level
    const languageInfo = `${removeEmojis(item.language)} - ${item.level}`;
    doc.text(languageInfo, 17, y);
    y += 7;
  });
  return y;
}

//* Function to generate other sections of the CV
function generateOtherSections(doc, data, y) {
  const otherSections = data.other;
  y += 10; // Add space before other sections
  doc.setFont("helvetica", "bold");
  doc.setTextColor(94, 201, 179);
  doc.setFontSize(14);
  doc.text(otherSections.title, 15, y);
  y += 4;
  doc.setDrawColor(180); // light gray
  doc.setLineWidth(0.3);
  doc.line(15, y, 200, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  otherSections.items.forEach((item) => {
    y = checkAddPage(doc, y, 7);
    doc.text(item, 15, y);
    y += 7;
  });

  return y;
}
//* Function to download CV as PDF
async function downloadPDF() {
  const lang = getCurrentLanguage();
  console.log("Idioma actual:", lang);
  const jsonPath = lang === "es" ? "data/data_es.json" : "data/data_en.json";

  try {
    const response = await fetch(jsonPath);
    if (!response.ok)
      throw new Error("Error loading JSON file for PDF download");
    const data = await response.json();

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;
    // Colored background in the header (rectangle)
    doc.setFillColor(94, 201, 179); // RGB de #5ec9b3 (Main color)
    doc.rect(0, 0, 210, 40, "F"); // A4 size is 210mm wide and 40mm high

    // White color for text in the header
    doc.setTextColor(255, 255, 255);

    addPhotoToPDF(doc, y);
    y = generateHeader(doc, data, y);
    doc.setTextColor(0, 0, 0);
    y = generateProfile(doc, data, y);
    y = generateContactInfo(doc, data, y);
    y = generateTechnicalSkills(doc, data, y);
    y = generateExperience(doc, data, y);
    y = generateEducation(doc, data, y);
    y = checkAddPage(doc, y, 7);
    y = generateLanguages(data, doc, y);
    y = generateOtherSections(doc, data, y);

    const fileName =
      lang === "en" ? "CV_Ruth_Millán_En.pdf" : "CV_Ruth_Millán_Es.pdf";
    doc.save(fileName);
  } catch (error) {
    console.error("Error generando el PDF:", error);
  }
}
