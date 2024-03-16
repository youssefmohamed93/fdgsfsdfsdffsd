// NavBar Menu 
let menuBars = document.querySelector(".bars i");
let navBar = document.querySelector(".navbar ul");

menuBars.onclick = function () {
    navBar.classList.toggle("navShow");
    menuBars.classList.toggle("fa-xmark");
};

document.addEventListener("click", function (event) {
    if (!navBar.contains(event.target) && !menuBars.contains(event.target)) {
        navBar.classList.remove("navShow");
        menuBars.classList.remove("fa-xmark");
    };
});

// Header Scrolling Animation
let fixedNav = document.querySelector(".header");
window.addEventListener("scroll" , () => {
    window.scrollY >= 65 ? fixedNav.classList.add("activeNav") :
    fixedNav.classList.remove("activeNav");
});

// Settings-Box
let settingsBox = document.querySelector(".settings-box");
let settingsToggle = document.querySelector(".settings-box .toggle-settings");
let settingsIcon = document.querySelector(".settings-box .toggle-settings i");

settingsToggle.onclick = function () {
    settingsBox.classList.toggle("open-box");
    settingsIcon.classList.toggle("fa-spin");
};

document.addEventListener("click" , function (event) {
    if (!settingsBox.contains(event.target) && !settingsToggle.contains(event.target)) {
        settingsBox.classList.remove("open-box");
        settingsIcon.classList.remove("fa-spin");
    };
});

// Settings-Box Local Storage
let mainColors = localStorage.getItem("color-option");
if (mainColors !== null) {
    document.documentElement.style.setProperty("--main-color" , mainColors);
    document.querySelectorAll(".colors-list li").forEach(ele => {
        ele.classList.remove("colors-active");
        if (ele.dataset.color === mainColors) {
            ele.classList.add("colors-active");
        };
    });
};

// Settings-Box Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {
    li.addEventListener("click" , (e) => {
        document.documentElement.style.setProperty("--main-color" , e.target.dataset.color);
        localStorage.setItem("color-option" , e.target.dataset.color);
        e.target.parentElement.querySelectorAll(".colors-active").forEach(ele => {
            ele.classList.remove("colors-active");
            e.currentTarget.classList.add("colors-active");
        });
    });
});

// DarkMode Theme
document.addEventListener('DOMContentLoaded', function () {
    let darkModeOn = document.getElementById('darkModeOn');
    let darkModeOff = document.getElementById('darkModeOff');
    let bodyElement = document.body;

    function toggleDarkMode(isDark) {
        if (isDark) {
            bodyElement.classList.add('dark');
            darkModeOn.classList.add('darkmode-active');
            darkModeOff.classList.remove('darkmode-active');
        } else {
            bodyElement.classList.remove('dark');
            darkModeOn.classList.remove('darkmode-active');
            darkModeOff.classList.add('darkmode-active');
        };
        localStorage.setItem('darkMode', isDark ? 'on' : 'off');
    };

    let darkModeState = localStorage.getItem('darkMode');
    if (darkModeState === 'on') {
        toggleDarkMode(true);
    } else {
        toggleDarkMode(false);
    };

    darkModeOn.addEventListener('click', function (event) {
        event.preventDefault();
        toggleDarkMode(true);
    });

    darkModeOff.addEventListener('click', function (event) {
        event.preventDefault();
        toggleDarkMode(false);
    });
});

// Quran Section Using API
let surahsContainer = document.querySelector(".surahs");

function getSurahs () {
    // API Fetch Surahs
    fetch("http://api.alquran.cloud/v1/meta").then(response => response.json()).then(data => {
        let surahs = data.data.surahs.references;
        let numberOfSurahs = 114;
        for ( let i = 0; i < numberOfSurahs; i++ ) {
            surahsContainer.innerHTML += 
            `
            <div class="surah">
            <p>${surahs[i].name}</p>
            <p>${surahs[i].englishName}</p>
            </div>
            `
        };
        let surahsTitle = document.querySelectorAll(".surah");
        let popup = document.querySelector(".surah-popup");
        let ayatContainer = document.querySelector(".ayat");

        surahsTitle.forEach((title,index) => {
            title.addEventListener("click" , () => {
                fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`).then(response => response.json())
                .then(data => {
                    ayatContainer.innerHTML = ""; 
                    let ayat = data.data.ayahs;
                    ayat.forEach(aya => {
                        popup.classList.add("active-popup");
                        ayatContainer.innerHTML += 
                        `
                        <p>(${aya.numberInSurah}) - ${aya.text}</p>
                        `
                    });
                });
            });
        });
        let closePopup = document.querySelector(".close-popup");
        closePopup.addEventListener("click" , () => {
            popup.classList.remove("active-popup");
        });
    });
};
getSurahs();

// Search Filter 
document.getElementById('searchInput').addEventListener('input', function() {
    var searchText = this.value.trim().toLowerCase();
    var surahs = document.querySelectorAll('.surah');
    
    surahs.forEach(function(surah) {
        var surahName = surah.querySelector('p:nth-of-type(1)').textContent.trim().toLowerCase();
        if (surahName.includes(searchText)) {
            surah.style.display = 'block';
        } else {
            surah.style.display = 'none';
        }
    });
});
