(function() {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  let currentYear = 2025;
  let currentMonth = 0; // January
  
  const monthNameElem = document.querySelector('.month-name');
  const yearElem = document.querySelector('.year');
  const datesGrid = document.querySelector('.dates-grid');
  const prevBtn = document.querySelector('.prev-month');
  const nextBtn = document.querySelector('.next-month');
  
  function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }
  
  function renderCalendar() {
    monthNameElem.textContent = monthNames[currentMonth];
    yearElem.textContent = currentYear;
    
    const daysCount = daysInMonth(currentYear, currentMonth);
    datesGrid.innerHTML = '';
    
    for (let day = 1; day <= daysCount; day++) {
      const btn = document.createElement('button');
      btn.className = 'date-btn';
      btn.textContent = day;
      btn.type = 'button';
      btn.addEventListener('click', () => {
        alert(`You clicked date ${day} ${monthNames[currentMonth]} ${currentYear}`);
      });
      datesGrid.appendChild(btn);
    }
  }
  
  prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });
  
  nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });
  
  // Add click handler for the plus icon
  document.getElementById('add-entry-btn').addEventListener('click', () => {
    window.location.href = 'chatbot.html';
  });
  
  renderCalendar();
})();