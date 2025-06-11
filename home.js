document.addEventListener('DOMContentLoaded', () => {
  // Mood selection toggle
  const moods = document.querySelectorAll('.mood');
  moods.forEach(mood => {
    mood.addEventListener('click', () => {
      moods.forEach(m => m.classList.remove('selected'));
      mood.classList.add('selected');
    });
    mood.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        moods.forEach(m => m.classList.remove('selected'));
        mood.classList.add('selected');
      }
    });
  });

  // Alert on new entry button click
  document.querySelector('.new-entry-btn').addEventListener('click', () => {
    alert('New Entry');
  });

  // Dynamically render previous entries (replace with real API call)
  const entriesContainer = document.querySelector('.entries-preview');
  // Clear existing static entries except the heading
  entriesContainer.querySelectorAll('.entry-item').forEach(e => e.remove());

  // Mock entries data - replace this with fetch from backend API
  const mockEntries = [
    'Had a great day!',
    'Feeling a bit tired.',
    'Excited about the weekend.'
  ];

  mockEntries.forEach((text, index) => {
    const div = document.createElement('div');
    div.className = 'entry-item';
    div.textContent = `Entry ${index + 1}: ${text}`;
    entriesContainer.appendChild(div);
  });
});

