document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');

    // Load saved language or default to English
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    if (languageSelect) {
        languageSelect.value = savedLang;
    }
    setLanguage(savedLang);

    // Event listener for language change
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            setLanguage(selectedLang);
            localStorage.setItem('selectedLanguage', selectedLang);
        });
    }
});

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // Handle input placeholders specifically
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}
