# 🏫 CS Department Absentee Management Portal

A high-performance, mobile-responsive web application designed for **Assistant Professors** and **Class Advisors** to manage daily student attendance and generate bilingual WhatsApp reports for parents.



## 🚀 Live Demo
**https://prof-sukumar.github.io/attendance-portal/**

---

## ✨ Key Features

* **Bilingual Reports:** Automatically generates attendance reports in both **Tamil** and **English**.
* **Dynamic Strength Counter:** Automatically calculates total class strength and current absentee count.
* **Advisor Mapping:** Identifies the correct Class Advisor based on the selected section (I B.Sc, II M.Sc, etc.).
* **Smart Selection Tools:**
    * **Invert Selection:** Quickly flip status (perfect if most students are present).
    * **Persistent Search:** Search for students without losing previously checked names.
* **Mobile Optimized:** Designed to be used on smartphones during classroom rounds.
* **Zero Database Cost:** Hosted entirely on GitHub Pages using Vanilla JS and a JSON-based database.

---

## 🛠️ Tech Stack

* **HTML5:** Structured semantic layout.
* **CSS3:** Custom scrollbar styling, responsive grid system, and mobile-first design.
* **JavaScript (ES6):** State management using `Set()` and real-time template literal generation.
* **Data:** Local `data.js` containing 374 student records and bilingual name mapping.

---

## 📂 Project Structure

```text
├── index.html    # Main dashboard interface
├── styles.css    # Professional administrative theme
├── app.js        # Logic engine (Selection, Search, Invert)
├── data.js       # Student database & Tamil name mapping
└── README.md     # Project documentation
