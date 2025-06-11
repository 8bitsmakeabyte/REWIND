document.addEventListener('DOMContentLoaded', function() {
    // Debug: Check what's in localStorage
    console.log('LocalStorage title:', localStorage.getItem('journalTitle'));
    console.log('LocalStorage image:', localStorage.getItem('journalImage'));

    // Load title
    const titleElement = document.getElementById('journalTitleDisplay');
    const savedTitle = localStorage.getItem('journalTitle');
    
    if (titleElement) {
        titleElement.textContent = savedTitle || "Your Journal Entry"; // Fallback text
    } else {
        console.error('Title element not found!');
    }

    // Load image
    const headerImage = document.querySelector('.header-image');
    const savedImage = localStorage.getItem('journalImage');
    
    if (headerImage) {
        if (savedImage) {
            headerImage.style.backgroundImage = url('${savedImage}');
        } else {
            // Fallback to default Ghibli image
            headerImage.style.backgroundImage = url('https://i.imgur.com/J5LVHEL.jpg');
        }
    } else {
        console.error('Header image element not found!');
    }
});