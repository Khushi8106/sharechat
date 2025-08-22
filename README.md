# Sharechat - Connect & Share

A modern, responsive chat application built with HTML, CSS, and JavaScript that simulates a real-time messaging experience.

## Features

### 🎨 **Modern UI/UX**
- Clean, gradient-based design
- Responsive layout for all devices
- Smooth animations and transitions
- Professional color scheme

### 💬 **Chat Functionality**
- Send and receive messages
- **AI-powered responses using Google Gemini API**
- Real-time typing indicators
- Message timestamps
- Auto-scroll to latest messages
- Sample conversation included

### 😊 **Interactive Elements**
- Emoji picker with 16 popular emojis
- Double-click messages to add reactions
- Profile editing modal
- **Gemini API configuration modal**
- **AI personality selection (Friendly, Professional, Creative, Casual)**
- Local storage for user preferences

### 📱 **Responsive Design**
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface

## How to Use

### 1. **Getting Started**
1. Open `index.html` in your web browser
2. The app will load with sample messages
3. Start typing in the input field at the bottom

### 2. **Sending Messages**
- Type your message in the input field
- Press Enter or click the send button (📤)
- Messages appear on the right side (sent messages)

### 3. **Receiving Messages**
- **AI-powered responses from Google Gemini API** (when configured)
- Fallback to simulated responses if API is not configured
- Received messages appear on the left side
- Various automated responses are included

### 4. **Using Emojis**
- Click the smiley face button (😊)
- Select an emoji from the picker
- Emoji will be added to your message

### 5. **Adding Reactions**
- Double-click on any message
- A random reaction will appear (❤️, 👍, 👎, 😂, 😮, 😢)

### 6. **Editing Profile**
- Click the menu button (⋮) in the header
- Edit your name and status
- Click "Save Changes" to update

### 7. **Configuring Gemini API**
- Click the settings button (⚙️) in the header
- Enter your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Choose AI personality (Friendly, Professional, Creative, Casual)
- Test the connection and start chatting with AI!

### 8. **Typing Indicators**
- Shows "AI is thinking..." when using Gemini API
- Shows "Someone is typing..." for fallback mode
- Automatically disappears after response or timeout

## File Structure

```
Sharechat/
├── index.html      # Main HTML structure
├── style.css       # All styling and animations
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Technical Details

### **HTML Structure**
- Semantic HTML5 elements
- Font Awesome icons integration
- Modal dialogs for profile editing
- Emoji picker component

### **CSS Features**
- CSS Grid and Flexbox layouts
- CSS animations and transitions
- Custom scrollbar styling
- Responsive media queries
- Gradient backgrounds

### **JavaScript Features**
- DOM manipulation
- Event handling
- Local storage for persistence
- **Google Gemini API integration**
- **AI personality management**
- **Real-time AI chat responses**
- Message cleanup and management

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## API Setup

### **Getting Your Gemini API Key**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. In Sharechat, click the settings button (⚙️) in the header
6. Paste your API key and choose an AI personality
7. Click "Test Connection" to verify setup
8. Start chatting with AI!

### **AI Personalities Available**
- **Friendly**: Warm, encouraging, and supportive responses
- **Professional**: Clear, concise, and business-appropriate
- **Creative**: Engaging, imaginative, and fun
- **Casual**: Relaxed, informal, and conversational

## Customization

### **Colors**
Edit the CSS variables in `style.css` to change the color scheme:
```css
.header {
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
}
```

### **Messages**
Modify the `sampleMessages` array in `script.js` to change initial messages:
```javascript
const sampleMessages = [
    { text: "Your custom message", sender: "received", time: "10:30 AM" }
];
```

### **Responses**
Edit the `responses` array in `script.js` to customize automated responses:
```javascript
const responses = [
    "Your custom response",
    "Another response"
];
```

## Future Enhancements

- [x] **AI-powered chat responses (Gemini API)**
- [x] **Multiple AI personalities**
- [x] **API configuration management**
- [ ] User authentication
- [ ] Real-time database integration
- [ ] File sharing capabilities
- [ ] Voice messages
- [ ] Group chat functionality
- [ ] Dark mode toggle
- [ ] Message search
- [ ] Read receipts

## Contributing

Feel free to modify and enhance this application! Some ideas:
- Add new emoji categories
- Implement different themes
- Add sound notifications
- Create user avatars
- Add message formatting options

## License

This project is open source and available under the MIT License.

---

**Enjoy chatting with Sharechat! 🚀**
