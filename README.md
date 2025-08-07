# 📄 Dynamic Web Resume

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat\&logo=html5\&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat\&logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat\&logo=javascript\&logoColor=black)
![jsPDF](https://img.shields.io/badge/jsPDF-8A4182?style=flat\&logo=jsPDF\&logoColor=white)

### 🌐 Available in other languages

- [🇪🇸 Spanish](README.es.md)

---

## 💾 Project Description

This project is a **web page to dynamically display a resume**, loading information from a JSON file using JavaScript.  
It includes modern features such as dark mode, language selector, and PDF export of the CV.

## 🛠️ Technologies Used

* HTML5  
* CSS3 (modular and responsive)  
* JavaScript (ES6+)  
* JSON for data structure  
* [jsPDF](https://github.com/parallax/jsPDF) for PDF generation  

## 📁 Project Structure

```bash
/cv-html/                  ← Root project folder
│
├── README.md              ← English version
│
├── README.es.md           ← Spanish version
│
├── index.html             ← Main HTML file
│
├── css/                   ← Folder with CSS styles organized by purpose
│   ├── base.css           ← Base styles (reset, fonts, variables, etc.)
│   ├── components.css     ← Styles for reusable components (buttons, cards, forms)
│   ├── layout.css         ← Layout and grid/flexbox styles
│   ├── responsive.css     ← Media queries and adaptive styles
│   └── style.css          ← Main/global or specific styles
│
├── js/                    ← JavaScript scripts organized by functionality
│   ├── script.js          ← Main logic (DOM manipulation, JSON loading, etc.)
│   ├── pdf-generator.js   ← Functions to generate the CV PDF
│   ├── theme-toggle.js    ← Dark/light mode management
│   └── language-selector.js ← Dynamic language switching
│
├── data/                  ← JSON files with CV data in different languages
│   ├── data_es.json       ← CV data in Spanish
│   └── data_en.json       ← CV data in English
│
└── img/                   ← Images, icons, profile photo, etc.
```

## ⚙️ Features

* 📄 **Dynamic content loading** from JSON files  
* 🌍 **Multilanguage support** (Spanish and English)  
* 🌚/🌞 **Dark and light mode** with `localStorage` persistence  
* 📅 **Export CV to PDF** customized with styles and active language  
* 📈 **Responsive design** adapted to different devices  
* 📃 **Modular and maintainable code**  

## ✨ Main JavaScript Functions

| Function                   | Purpose                              |
| -------------------------- | ---------------------------------- |
| `loadCV()`                 | Loads the JSON and triggers rendering |
| `displayEducation()`       | Renders the education section      |
| `displayExperience()`      | Shows work experience              |
| `displaySkills()`          | Technical skills by category       |
| `displayLanguages()`       | Languages with level and details   |
| `renderContactInformation()`| Contact and external links         |
| `toggleTheme()`            | Switches between light/dark mode   |
| `switchLanguage()`         | Changes the display language       |
| `downloadPDF()`            | Generates the CV PDF with jsPDF    |

## 📃 Advanced Features

* Modularity in files and functions  
* Persistence of preferences (language and theme)  
* PDF export with profile image and consistent styling  
* Entry animations with IntersectionObserver  

## 📷 Preview

### 🌚 Dark Mode

<img width="555" height="410" alt="Captura de pantalla 2025-08-06 a las 21 36 49" src="https://github.com/user-attachments/assets/046931bb-9614-4eeb-896b-2b7e362c9de3" />

<img width="555" height="410" alt="Captura de pantalla 2025-08-06 a las 21 37 22" src="https://github.com/user-attachments/assets/aa8a46dd-5c6a-4fc7-8909-5ed129fb755c" />


### 🌞 Light Mode

<img width="555" height="410" alt="Captura de pantalla 2025-08-06 a las 21 37 44" src="https://github.com/user-attachments/assets/dc2dc15c-42e6-4f6a-9593-3e4700ee47df" />

## 🔄 Upcoming Improvements

* ✨ Interactive projects section

## 📅 Last Update

**08/06/2025**

## 👤 Author

[Ruth Millán](https://github.com/Ruthmp)

---

❤️ This project is created for learning purposes, continuous improvement, and as a first version of a professional portfolio. Any suggestions or feedback are welcome.
