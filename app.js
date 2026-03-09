/**
 * CS Department Absentee Portal - Logic Engine
 * Features: Search, Check All, Invert, Strength Counter, Bilingual Report
 */

const App = {
    // 1. Application State
    state: {
        selectedRolls: new Set(),
        currentClass: "",
        searchTerm: ""
    },

    // 2. Start Application
    init() {
        const picker = document.getElementById('clsPicker');
        
        // Populate Class Dropdown from the Database (data.js)
        Object.keys(Database).forEach(className => {
            const opt = document.createElement('option');
            opt.value = className;
            opt.innerText = className;
            picker.appendChild(opt);
        });

        // Set Today's Date in Header
        document.getElementById('liveDate').innerText = new Date().toLocaleDateString('en-GB', {
            day: '2-digit', month: 'long', year: 'numeric'
        });

        this.loadClass();
    },

    // 3. Handle Class Change & Strength Counter
    loadClass() {
        const picker = document.getElementById('clsPicker');
        this.state.currentClass = picker.value;
        
        // Reset selections and search
        this.state.selectedRolls.clear();
        document.getElementById('searchBox').value = "";
        
        // Update Advisor and Strength Statistics
        const classInfo = Database[this.state.currentClass];
        const studentEntries = Object.keys(classInfo.students);
        
        document.getElementById('advDisplay').innerText = `Advisor: ${classInfo.advisor}`;
        document.getElementById('totalStrength').innerText = studentEntries.length;
        
        this.renderStudents();
        this.updateMsg();
    },

    // 4. Render Student List (High Performance Scroller)
    renderStudents() {
        const container = document.getElementById('studentList');
        const search = document.getElementById('searchBox').value.toLowerCase();
        container.innerHTML = "";
        
        const students = Database[this.state.currentClass].students;

        Object.entries(students).forEach(([roll, name]) => {
            if (roll.toLowerCase().includes(search) || name.toLowerCase().includes(search)) {
                const div = document.createElement('div');
                div.className = 'std-row';
                
                const isChecked = this.state.selectedRolls.has(roll) ? 'checked' : '';
                
                div.innerHTML = `
                    <input type="checkbox" id="chk_${roll}" ${isChecked} onchange="App.toggleRoll('${roll}')">
                    <label for="chk_${roll}">
                        <span style="font-weight:bold; color:#075E54; min-width:90px; display:inline-block;">${roll}</span> 
                        <span>${name}</span>
                    </label>
                `;
                // Make row clickable
                div.onclick = (e) => { if(e.target.tagName !== 'INPUT') div.querySelector('input').click(); };
                container.appendChild(div);
            }
        });
    },

    // 5. Checkbox Logic
    toggleRoll(roll) {
        if (this.state.selectedRolls.has(roll)) {
            this.state.selectedRolls.delete(roll);
        } else {
            this.state.selectedRolls.add(roll);
        }
        this.updateMsg();
    },

    // 6. Bulk Selection Tools
    selectAll(status) {
        const students = Database[this.state.currentClass].students;
        Object.keys(students).forEach(roll => {
            if (status) this.state.selectedRolls.add(roll);
            else this.state.selectedRolls.delete(roll);
        });
        this.renderStudents();
        this.updateMsg();
    },

    invertSelection() {
        const students = Database[this.state.currentClass].students;
        Object.keys(students).forEach(roll => {
            if (this.state.selectedRolls.has(roll)) {
                this.state.selectedRolls.delete(roll);
            } else {
                this.state.selectedRolls.add(roll);
            }
        });
        this.renderStudents();
        this.updateMsg();
    },

    // 7. Bilingual Message Generator
    updateMsg() {
        const rolls = Array.from(this.state.selectedRolls).sort();
        document.getElementById('selCount').innerText = rolls.length;
        
        const msgBox = document.getElementById('msgBox');
        if (rolls.length === 0) {
            msgBox.value = "";
            return;
        }

        const className = this.state.currentClass;
        const info = Database[className];
        const dateStr = new Date().toLocaleDateString('en-GB');
        const strength = Object.keys(info.students).length;

        // Build Tamil Section
        let ta = `அன்புள்ள பெற்றோர்களுக்கு,\n\nவகுப்பு: ${className}\nமொத்த மாணவர்கள்: ${strength}\nவகுப்பு ஆசிரியர்: ${info.advisor.replace('Dr. ', '')}\nதேதி: ${dateStr}\n\nஇன்று கல்லூரிக்கு வராத மாணவர்கள்:\n`;
        
        // Build English Section
        let en = `Dear Parents,\n\nClass: ${className}\nTotal Strength: ${strength}\nClass Advisor: ${info.advisor}\nDate: ${dateStr}\n\nToday's Absentees:\n`;

        rolls.forEach((roll, index) => {
            const name = info.students[roll];
            const tamilName = TamilNames[name] || name; 
            ta += `${index + 1}. ${roll} - ${tamilName}\n`;
            en += `${index + 1}. ${roll} - ${name}\n`;
        });

        msgBox.value = ta + "\n------------------------------------------\n\n" + en;
    },

    // 8. Output Utilities
    copyText() {
        const box = document.getElementById('msgBox');
        if (!box.value) return;
        
        box.select();
        navigator.clipboard.writeText(box.value).then(() => {
            alert("Report Copied! ✅ Paste in WhatsApp.");
        });
    },

    openWhatsApp() {
        window.open('https://web.whatsapp.com');
    }
};

// Map search input to the correct function name
App.renderList = App.renderStudents;

// Start App
window.onload = () => App.init();