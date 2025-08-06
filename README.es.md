# 📄 Currículum Web Dinámico
  
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat\&logo=html5\&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat\&logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat\&logo=javascript\&logoColor=black)
![jsPDF](https://img.shields.io/badge/jsPDF-8A4182?style=flat\&logo=jsPDF\&logoColor=white)


### 🌐 Disponible en otros idiomas

- [🇬🇧 English](README.md)

---

## 💾 Descripción del Proyecto

Este proyecto consiste en una **página web para mostrar un currículum de forma dinámica**, cargando la información desde un archivo JSON mediante JavaScript. 
Incluye funcionalidades modernas como modo oscuro, selector de idioma, y exportación del CV a PDF.

## 🛠️ Tecnologías Utilizadas

* HTML5
* CSS3 (modular y responsive)
* JavaScript (ES6+)
* JSON para la estructura de datos
* [jsPDF](https://github.com/parallax/jsPDF) para generación de PDF

## 📁 Estructura del Proyecto

```bash
/cv-html/                  ← Carpeta raíz del proyecto
│
├── README.md              ← Versión en inglés
│
├── README.es.md           ← Versión en español
│
├── index.html             ← Archivo principal HTML
│
├── css/                   ← Carpeta con estilos CSS organizados por propósito
│   ├── base.css           ← Estilos base (reset, tipografías, variables, etc.)
│   ├── components.css     ← Estilos para componentes reutilizables (botones, tarjetas, formularios)
│   ├── layout.css         ← Estilos de maquetación y grid/flexbox
│   ├── responsive.css     ← Media queries y estilos adaptativos
│   └── style.css          ← Estilos principales/globales o estilos específicos
│
├── js/                    ← Scripts JavaScript organizados por funcionalidad
│   ├── script.js          ← Lógica principal (DOM, carga de JSON, etc.)
│   ├── pdf-generator.js   ← Funciones para generar el PDF del CV
│   ├── theme-toggle.js    ← Gestión de modo claro/oscuro
│   └── language-selector.js ← Cambio dinámico de idioma
│
├── data/                  ← Archivos JSON con datos del CV en diferentes idiomas
│   ├── data_es.json       ← Datos del CV en español
│   └── data_en.json       ← Datos del CV en inglés
│
└── img/                   ← Imágenes, íconos, foto de perfil, etc.
```

## ⚙️ Funcionalidades

* 📄 **Carga dinámica del contenido** desde archivos JSON
* 🌍 **Soporte multilenguaje** (español e inglés)
* 🌚/🌞 **Modo oscuro y claro** con almacenamiento en `localStorage`
* 📅 **Exportación del CV a PDF** personalizada con estilos e idioma activo
* 📈 **Diseño responsive** adaptado a diferentes dispositivos
* 📃 **Código modular** y fácil de mantener

## ✨ Principales Funciones JavaScript

| Función                      | Propósito                              |
| ---------------------------- | -------------------------------------- |
| `loadCV()`                   | Carga el JSON y lanza los renderizados |
| `displayEducation()`         | Renderiza la sección de educación      |
| `displayExperience()`        | Muestra experiencia laboral            |
| `displaySkills()`            | Habilidades técnicas por categoría     |
| `displayLanguages()`         | Idiomas con nivel y detalles           |
| `renderContactInformation()` | Contacto y enlaces externos            |
| `toggleTheme()`              | Alterna entre modo claro/oscuro        |
| `switchLanguage()`           | Cambia el idioma de visualización      |
| `downloadPDF()`              | Genera el CV en PDF con jsPDF          |

## 📃 Características Avanzadas

* Modularidad en archivos y funciones
* Persistencia de preferencias (idioma y tema)
* Exportación de PDF con imagen de perfil y estilos coherentes
* Animaciones de entrada con IntersectionObserver


## 📷 Vista Previa

### 🌞 Modo Claro
<img width="1422" height="843" alt="Captura de pantalla 2025-08-06 a las 21 03 41" src="https://github.com/user-attachments/assets/7b56dad9-39cd-4654-9c71-8ce422ac719c" />
<img width="1425" height="845" alt="Captura de pantalla 2025-08-06 a las 21 17 35" src="https://github.com/user-attachments/assets/6480521b-4b78-4637-ad99-bbbdac4796b7" />

### 🌚 Modo Oscuro
<img width="1420" height="845" alt="Captura de pantalla 2025-08-06 a las 21 05 24" src="https://github.com/user-attachments/assets/ea1fbe7e-1e99-46e5-807b-de909477c784" />



## 🔄 Próximas Mejoras

* ✨ Sección de proyectos interactivos
  

## 📅 Última Actualización

**06/08/2025**


## 👤 Autor

[Ruth Millán](https://github.com/Ruthmp)

---

❤️ Este proyecto está creado con propósitos de aprendizaje, mejora continua y como primera versión de un portafolio profesional. Toda sugerencia o feedback es bienvenido.
