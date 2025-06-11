// DOM Elements
const chatContainer = document.querySelector(".chat-container");
const messageInput = document.querySelector("#message-input");
const sendBtn = document.querySelector("#send-btn");
const micBtn = document.querySelector("#mic-btn");
const imageBtn = document.querySelector("#image-btn");
const fileInput = document.querySelector("#file-input");
const goDeeperBtn = document.querySelector(".action-btns .action-btn:first-child");
const finishWritingBtn = document.querySelector(".action-btns .action-btn:last-child");
const currentDateEl = document.querySelector("#current-date");
const currentTimeEl = document.querySelector("#current-time");

// App State
let userMessage = null;
let isResponseGeneration = false;
let recognition = null;
    const apiKey = "/api/chat"; 

// Initialize date and time display
function updateDateTime() {
    const now = new Date();

    // Format date (e.g., "Monday, January 1")
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    currentDateEl.textContent = now.toLocaleDateString('en-US', options);

    // Format time (e.g., "12:34 PM")
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    currentTimeEl.textContent = `${hours}:${minutes} ${ampm}`;
}

updateDateTime();
setInterval(updateDateTime, 60000);

// Load saved chats from localStorage
const loadLocalstorageData = () => {
    const savedChats = localStorage.getItem("savedChats");
    if (savedChats) {
        chatContainer.innerHTML = savedChats;
        chatContainer.scrollTo(0, chatContainer.scrollHeight);
    }
};

loadLocalstorageData();

// Create chat bubble element
const createChatBubble = (content, isUser, isImage = false) => {
    const bubble = document.createElement("div");
    bubble.classList.add("chat-bubble", isUser ? "user-bubble" : "bot-bubble");

    if (isImage) {
        bubble.innerHTML = `<div class="chat-image"><img src="${content}" alt="Uploaded image"></div>`;
    } else {
        bubble.innerHTML = `<div class="text">${content}</div>`;
    }

    return bubble;
};

// Show typing effect for bot responses
const showTypingEffect = (text, bubble) => {
    const words = text.split(' ');
    let currentWordIndex = 0;

    const typingInterval = setInterval(() => {
        bubble.querySelector(".text").innerText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++];

        if (currentWordIndex === words.length) {
            clearInterval(typingInterval);
            isResponseGeneration = false;
            localStorage.setItem("savedChats", chatContainer.innerHTML);
        }
        chatContainer.scrollTo(0, chatContainer.scrollHeight);
    }, 50);
};

const generateAPIResponse = async (userMsg) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: userMsg })
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Server error");
  
      return data.reply;
    } catch (error) {
      console.error("API Error:", error);
      return `Error: ${error.message}`;
    }
  };
  

// Show loading indicator
const showLoadingIndicator = () => {
    const loadingBubble = createChatBubble(`
        <div class="loading-content">
            <div class="loading-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    `, false);

    chatContainer.appendChild(loadingBubble);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    return loadingBubble;
};

// Handle sending a message
const handleSendMessage = () => {
    userMessage = messageInput.value.trim();
    if (!userMessage || isResponseGeneration) return;

    const userBubble = createChatBubble(userMessage, true);
    chatContainer.appendChild(userBubble);

    messageInput.value = "";
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

// Handle image upload
const handleImageUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const imageBubble = createChatBubble(e.target.result, true, true);
        chatContainer.appendChild(imageBubble);
        localStorage.setItem("savedChats", chatContainer.innerHTML);
        chatContainer.scrollTo(0, chatContainer.scrollHeight);
    };
    reader.readAsDataURL(file);
};

// Initialize speech recognition
const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech recognition not supported in your browser");
        return;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
        micBtn.classList.add("recording");
        messageInput.placeholder = "Listening...";
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        messageInput.value = transcript;
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        micBtn.classList.remove("recording");
        messageInput.placeholder = "Write your thoughts...";
    };

    recognition.onend = () => {
        micBtn.classList.remove("recording");
        messageInput.placeholder = "Write your thoughts...";
    };
};

// Handle "Go Deeper" functionality
const handleGoDeeper = async () => {
    if (!userMessage || isResponseGeneration) return;
    isResponseGeneration = true;

    const loadingBubble = showLoadingIndicator();

    try {
        const response = await generateAPIResponse(userMessage);
        chatContainer.removeChild(loadingBubble);

        const botBubble = createChatBubble(`<div class="text"></div>`, false);
        chatContainer.appendChild(botBubble);
        showTypingEffect(response, botBubble);
    } catch (error) {
        console.error("Error:", error);
        isResponseGeneration = false;
    }
};

// Event Listeners
sendBtn.addEventListener("click", handleSendMessage);

messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        handleSendMessage();
    }
});

micBtn.addEventListener("click", () => {
    if (recognition && !isResponseGeneration) {
        recognition.start();
    }
});

imageBtn.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", (e) => {
    handleImageUpload(e.target.files[0]);
    e.target.value = "";
});

goDeeperBtn.addEventListener("click", handleGoDeeper);

finishWritingBtn.addEventListener("click", () => {
    alert("Your journal entry has been saved!");
    chatContainer.innerHTML = "";
    localStorage.removeItem("savedChats");
    window.location.href = "keythemes.html";  // <-- Redirects to keythemes.html
});
window.addEventListener('DOMContentLoaded', () => {
    const storedImage = localStorage.getItem('journalImage');
    const storedTitle = localStorage.getItem('journalTitle');

    if (storedImage && storedTitle) {
        const sidebarImage = document.getElementById('sidebarImage');
        const sidebarTitle = document.getElementById('sidebarTitle');

        if (sidebarImage) sidebarImage.src = storedImage;
        if (sidebarTitle) sidebarTitle.textContent = storedTitle;
    }
});


window.addEventListener("load", () => {
    initSpeechRecognition();
});
