document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const imagePreview = document.getElementById('imagePreview');
        const titleInput = document.getElementById('titleInput');
        const previewContainer = document.querySelector('.preview');
        const saveButton = document.getElementById('saveButton');

        imagePreview.src = e.target.result;
        previewContainer.style.display = 'block';
        titleInput.disabled = false;
        saveButton.style.display = 'block';
        saveButton.textContent = 'Save';
    }
    
    if (file) {
        reader.readAsDataURL(file);
    }
});

document.getElementById('saveButton').addEventListener('click', function() {
    const titleInput = document.getElementById('titleInput');
    const saveButton = document.getElementById('saveButton');
    const saveAndContinueButton = document.getElementById('saveAndContinueButton');

    if (saveButton.textContent === 'Save') {
        titleInput.disabled = true;
        saveButton.textContent = 'Edit';

        // Save both title and image to localStorage
        localStorage.setItem('journalTitle', titleInput.value);
        localStorage.setItem('journalImage', document.getElementById('imagePreview').src);
        // Add this after localStorage.setItem() calls
        console.log('Saved title:', titleInput.value);
        console.log('Saved image:', document.getElementById('imagePreview').src);

        saveAndContinueButton.style.display = 'inline-block';
    } else {
        titleInput.disabled = false;
        saveButton.textContent = 'Save';
        saveAndContinueButton.style.display = 'none';
    }
});

document.getElementById('saveAndContinueButton').addEventListener('click', function() {
    window.location.href = 'chatbot.html';
});