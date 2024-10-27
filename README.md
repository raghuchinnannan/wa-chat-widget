# WhatsApp Chat Widget

[![npm version](https://img.shields.io/npm/v/wa-chat-widget.svg)](https://www.npmjs.com/package/wa-chat-widget)
[![license](https://img.shields.io/npm/l/wa-chat-widget.svg)](https://github.com/raghuchinnannan/wa-chat-widget/blob/main/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/wa-chat-widget.svg)](https://www.npmjs.com/package/wa-chat-widget)

A lightweight, customizable WhatsApp chat widget that adds a floating WhatsApp button to your website. When clicked, it opens a WhatsApp chat with a pre-defined message.

## Features

- 🎨 Fully customizable appearance
- 📱 Mobile-friendly and responsive
- 🎯 Multiple position options
- 💬 Custom pre-defined messages
- 🔧 Easy to install and configure
- 🌐 Works with any website
- 💪 No dependencies
- ♿ Accessibility friendly
- 🌙 Dark mode support
- 🖨️ Print-friendly (hides widget)

## Installation

### Using npm
```bash
npm install wa-chat-widget
```

### Using CDN
```html
<script src="https://unpkg.com/wa-chat-widget@1.0.0/dist/wa-chat-widget.js"></script>
```

## Usage

### ES6 Module
```javascript
import WaChatWidget from 'wa-chat-widget';

const widget = new WaChatWidget({
    phoneNumber: '1234567890',
    message: "Hello! I'm interested in your services"
});
```

### Script Tag
```html
<script src="https://unpkg.com/wa-chat-widget@1.0.0/dist/wa-chat-widget.js"></script>
<script>
    const widget = new WaChatWidget({
        phoneNumber: '1234567890',
        message: "Hello! I'm interested in your services"
    });
</script>
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `phoneNumber` | string | `''` | WhatsApp number in international format without + symbol in front (required) |
| `message` | string | `"I'm interested to know more about your offerings."` | Default message |
| `position` | string | `'bottom-right'` | Widget position (`'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'`) |
| `backgroundColor` | string | `'#25D366'` | Background color of the widget |
| `textColor` | string | `'#fff'` | Color of the WhatsApp icon |
| `size` | string | `'60px'` | Size of the widget |
| `showTooltip` | boolean | `true` | Show/hide tooltip on hover |
| `tooltipText` | string | `'Chat with us'` | Text to show in tooltip |

## Examples

### Basic Usage
```javascript
new WaChatWidget({
    phoneNumber: '1234567890'
});
```

### Custom Styling
```javascript
new WaChatWidget({
    phoneNumber: '1234567890',
    backgroundColor: '#075e54',
    textColor: '#ffffff',
    size: '70px',
    position: 'top-right'
});
```

### Multi-Language Support
```javascript
const userLanguage = navigator.language.substring(0, 2);
const messages = {
    en: "Hi, I'd like to know more",
    es: "Hola, me gustaría saber más",
    fr: "Bonjour, j'aimerais en savoir plus"
};

new WaChatWidget({
    phoneNumber: '1234567890',
    message: messages[userLanguage] || messages.en,
    tooltipText: 'Chat with us'
});
```

### Dynamic Control
```javascript
const widget = new WaChatWidget({
    phoneNumber: '1234567890'
});

// Hide widget
widget.hide();

// Show widget
widget.show();

// Update options
widget.updateOptions({
    backgroundColor: '#128C7E',
    size: '65px'
});

// Destroy widget
widget.destroy();
```

### Business Hours
```javascript
function isBusinessHours() {
    const now = new Date();
    const hours = now.getHours();
    const day = now.getDay();
    return day >= 1 && day <= 5 && hours >= 9 && hours < 17;
}

new WaChatWidget({
    phoneNumber: '1234567890',
    message: isBusinessHours() 
        ? "Hi, I'd like to speak with your team"
        : "Hi, I'd like to leave a message",
    tooltipText: isBusinessHours()
        ? "Chat with us now!"
        : "Leave us a message",
    backgroundColor: isBusinessHours() ? '#25D366' : '#128C7E'
});
```

## API Methods

| Method | Description |
|--------|-------------|
| `show()` | Shows the widget |
| `hide()` | Hides the widget |
| `destroy()` | Removes the widget from DOM |
| `updateOptions(options)` | Updates widget configuration |

## Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Opera (Latest)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## Author

Raghu Chinnannan
- Website: [https://raghu.ch](https://raghu.ch)
- GitHub: [@raghuchinnannan](https://github.com/raghuchinnannan)

## Support

For support, please open an issue in the [GitHub repository](https://github.com/raghuchinnannan/wa-chat-widget/issues).