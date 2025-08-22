// DOM Elements
const chatArea = document.getElementById('chatArea');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const emojiBtn = document.getElementById('emojiBtn');
const emojiPicker = document.getElementById('emojiPicker');
const profileModal = document.getElementById('profileModal');
const closeModal = document.getElementById('closeModal');
const saveProfile = document.getElementById('saveProfile');
const editName = document.getElementById('editName');
const editStatus = document.getElementById('editStatus');
const userName = document.getElementById('userName');
const userStatus = document.querySelector('.status');
const menuBtn = document.getElementById('menuBtn');

// API Configuration Elements
const apiModal = document.getElementById('apiModal');
const apiConfigBtn = document.getElementById('apiConfigBtn');
const closeApiModal = document.getElementById('closeApiModal');
const saveApiConfig = document.getElementById('saveApiConfig');
const testApiConnection = document.getElementById('testApiConnection');
const apiKey = document.getElementById('apiKey');
const aiPersonality = document.getElementById('aiPersonality');

// Gemini API Configuration
let geminiApiKey = 'AIzaSyCvZJjF4E5sxu-5CLw3_SsYiNa6N9ij1cY';
let aiPersonalityType = 'friendly';
let isApiConnected = false;

// Sample messages for demonstration
const sampleMessages = [
    { text: "Hey! How are you doing?", sender: "received", time: "10:30 AM" },
    { text: "I'm doing great! Just finished my project.", sender: "sent", time: "10:32 AM" },
    { text: "That's awesome! What was it about?", sender: "received", time: "10:33 AM" },
    { text: "It's a chat application like this one! 😊", sender: "sent", time: "10:35 AM" },
    { text: "Wow, that sounds really cool!", sender: "received", time: "10:36 AM" }
];

// Initialize the chat
function initChat() {
    // Load sample messages
    sampleMessages.forEach(message => {
        addMessage(message.text, message.sender, message.time);
    });
    
    // Set initial user info
    const savedName = localStorage.getItem('userName') || 'Your Name';
    const savedStatus = localStorage.getItem('userStatus') || 'Online';
    
    userName.textContent = savedName;
    userStatus.textContent = savedStatus;
    editName.value = savedName;
    editStatus.value = savedStatus;
    
    // Scroll to bottom
    scrollToBottom();
}

// Add message to chat
function addMessage(text, sender, time) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = text;
    
    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = time;
    
    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(messageTime);
    
    chatArea.appendChild(messageDiv);
    
    // Scroll to bottom
    scrollToBottom();
}

// Send message
async function sendMessage() {
    const text = messageInput.value.trim();
    if (text) {
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        addMessage(text, 'sent', time);
        messageInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        try {
            if (isApiConnected && geminiApiKey) {
                // Get AI response from Gemini
                const aiResponse = await getGeminiResponse(text);
                const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                hideTypingIndicator();
                addMessage(aiResponse, 'received', responseTime);
            } else {
                // Fallback to simulated responses
                setTimeout(() => {
                    hideTypingIndicator();
                    const responses = [
                        "That's interesting!",
                        "Tell me more about that!",
                        "I see what you mean.",
                        "Thanks for sharing!",
                        "That's a great point!",
                        "I agree with you.",
                        "What do you think about...?",
                        "That reminds me of...",
                        "Interesting perspective!",
                        "I'd love to hear more!"
                    ];
                    
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    
                    addMessage(randomResponse, 'received', responseTime);
                }, Math.random() * 2000 + 1000);
            }
        } catch (error) {
            hideTypingIndicator();
            console.error('Error getting AI response:', error);
            const errorTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            addMessage("Sorry, I'm having trouble connecting right now. Please check your API configuration.", 'received', errorTime);
        }
    }
}

// Get response from Gemini API
async function getGeminiResponse(userMessage) {
    const personalityPrompts = {
        friendly: "You are a friendly, helpful, and supportive AI assistant. Keep responses warm, encouraging, and conversational. Be empathetic and show genuine interest in the user's message.",
        professional: "You are a professional, knowledgeable, and efficient AI assistant. Provide clear, concise, and well-structured responses. Maintain a business-appropriate tone.",
        creative: "You are a creative, imaginative, and fun AI assistant. Make responses engaging, use creative language, and add a touch of humor when appropriate. Be enthusiastic and inspiring.",
        casual: "You are a casual, relaxed, and easy-going AI assistant. Use informal language, be conversational, and keep responses light and friendly. Feel free to use casual expressions."
    };

    const prompt = `${personalityPrompts[aiPersonalityType]}\n\nUser: ${userMessage}\n\nPlease respond in a helpful and engaging way, keeping your response under 150 words.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 200,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Invalid response format from API');
        }
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw error;
    }
}

// Show typing indicator
function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.id = 'aiTypingIndicator';
    typingIndicator.innerHTML = `
        AI is thinking
        <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    
    chatArea.appendChild(typingIndicator);
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    const existingTyping = document.getElementById('aiTypingIndicator');
    if (existingTyping) {
        existingTyping.remove();
    }
}

// Scroll to bottom of chat
function scrollToBottom() {
    chatArea.scrollTop = chatArea.scrollHeight;
}

// Toggle emoji picker
function toggleEmojiPicker() {
    emojiPicker.style.display = emojiPicker.style.display === 'block' ? 'none' : 'block';
}

// Add emoji to message
function addEmoji(emoji) {
    messageInput.value += emoji;
    messageInput.focus();
    emojiPicker.style.display = 'none';
}

// Show profile modal
function showProfileModal() {
    profileModal.style.display = 'block';
}

// Hide profile modal
function hideProfileModal() {
    profileModal.style.display = 'none';
}

// Save profile changes
function saveProfileChanges() {
    const newName = editName.value.trim();
    const newStatus = editStatus.value.trim();
    
    if (newName) {
        userName.textContent = newName;
        localStorage.setItem('userName', newName);
    }
    
    if (newStatus) {
        userStatus.textContent = newStatus;
        localStorage.setItem('userStatus', newStatus);
    }
    
    hideProfileModal();
}

// Event Listeners - will be set up after DOM loads
let typingTimeout;

// Initialize chat when page loads - moved to combined event listener below

// Add some interactive features
let messageCount = 0;
const maxMessages = 100;

// Clean up old messages if too many
function cleanupMessages() {
    const messages = chatArea.querySelectorAll('.message');
    if (messages.length > maxMessages) {
        const messagesToRemove = messages.length - maxMessages;
        for (let i = 0; i < messagesToRemove; i++) {
            messages[i].remove();
        }
    }
}

// Enhanced send message with cleanup
const originalSendMessage = sendMessage;
const enhancedSendMessage = async function() {
    await originalSendMessage();
    messageCount++;
    cleanupMessages();
};

// Add some fun features
function addReaction(messageElement, reaction) {
    const reactionDiv = document.createElement('div');
    reactionDiv.className = 'message-reaction';
    reactionDiv.textContent = reaction;
    reactionDiv.style.cssText = `
        position: absolute;
        top: -10px;
        right: -10px;
        background: #ff4757;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        cursor: pointer;
        animation: bounce 0.5s ease-in-out;
    `;
    
    messageElement.style.position = 'relative';
    messageElement.appendChild(reactionDiv);
}

// Add CSS for reaction animation
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 60%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        80% {
            transform: translateY(-5px);
        }
    }
    
    .message-reaction:hover {
        transform: scale(1.2);
        transition: transform 0.2s;
    }
`;
document.head.appendChild(style);

// Add double-click to react feature
chatArea.addEventListener('dblclick', (e) => {
    const messageElement = e.target.closest('.message');
    if (messageElement && !messageElement.querySelector('.message-reaction')) {
        const reactions = ['❤️', '👍', '👎', '😂', '😮', '😢'];
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        addReaction(messageElement, randomReaction);
    }
});

// Add welcome message
setTimeout(() => {
    const welcomeTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    addMessage("Welcome to Sharechat! Double-click on any message to add a reaction! 🎉", 'received', welcomeTime);
}, 3000);

// API Configuration Functions
function showApiModal() {
    apiModal.style.display = 'block';
    // Load saved configuration
    const savedApiKey = localStorage.getItem('geminiApiKey') || '';
    const savedPersonality = localStorage.getItem('aiPersonality') || 'friendly';
    
    apiKey.value = savedApiKey;
    aiPersonality.value = savedPersonality;
}

function hideApiModal() {
    apiModal.style.display = 'none';
}

function saveApiConfiguration() {
    const newApiKey = apiKey.value.trim();
    const newPersonality = aiPersonality.value;
    
    if (newApiKey) {
        geminiApiKey = newApiKey;
        aiPersonalityType = newPersonality;
        localStorage.setItem('geminiApiKey', newApiKey);
        localStorage.setItem('aiPersonality', newPersonality);
        
        // Test the connection
        testApiConnection();
        
        hideApiModal();
        
        // Show success message
        const successTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        addMessage("API configuration saved successfully! You can now chat with AI! 🤖", 'received', successTime);
    } else {
        alert('Please enter a valid API key');
    }
}

async function testApiConnection() {
    if (!geminiApiKey) {
        alert('Please enter an API key first');
        return;
    }
    
    try {
        // Show loading state
        testApiConnection.textContent = 'Testing...';
        testApiConnection.disabled = true;
        
        // Test with a simple message
        const testResponse = await getGeminiResponse("Hello");
        
        if (testResponse) {
            alert('API connection successful! You can now chat with AI.');
            isApiConnected = true;
            updateApiStatus();
        }
    } catch (error) {
        alert(`API connection failed: ${error.message}`);
        isApiConnected = false;
        updateApiStatus();
    } finally {
        testApiConnection.textContent = 'Test Connection';
        testApiConnection.disabled = false;
    }
}

function updateApiStatus() {
    // Update the API status indicator in the header
    const statusIndicator = document.querySelector('.api-status') || createApiStatusIndicator();
    
    if (isApiConnected) {
        statusIndicator.className = 'api-status connected';
        statusIndicator.title = 'AI Connected';
    } else {
        statusIndicator.className = 'api-status disconnected';
        statusIndicator.title = 'AI Disconnected';
    }
}

function createApiStatusIndicator() {
    const statusIndicator = document.createElement('span');
    statusIndicator.className = 'api-status disconnected';
    statusIndicator.title = 'AI Disconnected';
    
    // Insert after the user status
    const userStatusElement = document.querySelector('.status');
    userStatusElement.parentNode.insertBefore(statusIndicator, userStatusElement.nextSibling);
    
    return statusIndicator;
}

// Load saved API configuration on startup
function loadApiConfiguration() {
    const savedApiKey = localStorage.getItem('geminiApiKey');
    const savedPersonality = localStorage.getItem('aiPersonality');
    
    if (savedApiKey) {
        geminiApiKey = savedApiKey;
        aiPersonalityType = savedPersonality || 'friendly';
        isApiConnected = true;
        updateApiStatus();
    } else {
        // If no API key is saved, show a message to configure it
        setTimeout(() => {
            const configTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            addMessage("💡 Tip: Click the settings button (⚙️) to configure your Gemini API key for AI-powered responses!", 'received', configTime);
        }, 5000);
    }
}

// API Configuration Event Listeners - moved to setupEventListeners function

// Set up all event listeners
function setupEventListeners() {
    // Send button and input events
    sendBtn.addEventListener('click', enhancedSendMessage);
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            enhancedSendMessage();
        }
    });
    
    // Emoji picker events
    emojiBtn.addEventListener('click', toggleEmojiPicker);
    
    emojiPicker.addEventListener('click', (e) => {
        if (e.target.classList.contains('emoji')) {
            const emoji = e.target.dataset.emoji;
            addEmoji(emoji);
        }
    });
    
    // Profile modal events
    menuBtn.addEventListener('click', showProfileModal);
    closeModal.addEventListener('click', hideProfileModal);
    saveProfile.addEventListener('click', saveProfileChanges);
    
    // API configuration events
    apiConfigBtn.addEventListener('click', showApiModal);
    closeApiModal.addEventListener('click', hideApiModal);
    saveApiConfig.addEventListener('click', saveApiConfiguration);
    testApiConnection.addEventListener('click', testApiConnection);
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            hideProfileModal();
        }
        if (e.target === apiModal) {
            hideApiModal();
        }
    });
    
    // Close emoji picker when clicking outside
    document.addEventListener('click', (e) => {
        if (!emojiBtn.contains(e.target) && !emojiPicker.contains(e.target)) {
            emojiPicker.style.display = 'none';
        }
    });
    
    // Typing indicator
    messageInput.addEventListener('input', () => {
        // Clear existing timeout
        clearTimeout(typingTimeout);
        
        // Remove existing typing indicator
        const existingTyping = document.querySelector('.typing-indicator');
        if (existingTyping) {
            existingTyping.remove();
        }
        
        // Add typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = `
            Someone is typing
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        chatArea.appendChild(typingIndicator);
        scrollToBottom();
        
        // Remove typing indicator after 2 seconds of no input
        typingTimeout = setTimeout(() => {
            if (typingIndicator.parentNode) {
                typingIndicator.remove();
            }
        }, 2000);
    });
}

// Load API configuration when page loads
document.addEventListener('DOMContentLoaded', () => {
    initChat();
    loadApiConfiguration();
    setupEventListeners();
});
