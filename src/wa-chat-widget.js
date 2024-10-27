import './wa-chat-widget.css';

/**
 * WhatsApp Chat Widget
 * A customizable WhatsApp chat button for websites
 * @class WaChatWidget
 */
export default class WaChatWidget {
    /**
     * Creates an instance of WaChatWidget
     * @param {Object} options - Configuration options
     * @param {string} options.phoneNumber - WhatsApp number in international format (required)
     * @param {string} [options.message="I'm interested to know more about your offerings."] - Default message
     * @param {string} [options.position="bottom-right"] - Widget position (top-left, top-right, bottom-left, bottom-right)
     * @param {string} [options.backgroundColor="#25D366"] - Background color of the widget
     * @param {string} [options.textColor="#fff"] - Color of the WhatsApp icon
     * @param {string} [options.size="60px"] - Size of the widget
     * @param {boolean} [options.showTooltip=true] - Show/hide tooltip on hover
     * @param {string} [options.tooltipText="Chat with us"] - Text to show in tooltip
     * @param {Function} [options.onClick] - Callback function when widget is clicked
     */
    constructor(options) {
        this.options = Object.assign({
            phoneNumber: '',
            message: "I'm interested to know more about your offerings.",
            position: 'bottom-right',
            backgroundColor: '#25D366',
            textColor: '#fff',
            size: '60px',
            showTooltip: true,
            tooltipText: 'Chat with us',
            onClick: null
        }, options);

        this.validateOptions();
        this.createWidget();
        this.setupEventListeners();
    }

    /**
     * Validates the widget options
     * @private
     * @throws {Error} If phone number is missing or invalid
     */
    validateOptions() {
        if (!this.options.phoneNumber) {
            throw new Error('WhatsApp phone number is required');
        }

        // Remove any non-numeric characters from phone number
        this.options.phoneNumber = this.options.phoneNumber.replace(/\D/g, '');

        if (!/^\d+$/.test(this.options.phoneNumber)) {
            throw new Error('Invalid WhatsApp phone number format');
        }

        const validPositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        if (!validPositions.includes(this.options.position)) {
            throw new Error(`Invalid position. Must be one of: ${validPositions.join(', ')}`);
        }
    }

    /**
     * Creates the widget HTML and adds it to the document
     * @private
     */
    createWidget() {
        const widget = document.createElement('div');
        widget.className = `whatsapp-widget ${this.options.position}`;

        const whatsappUrl = `https://wa.me/${this.options.phoneNumber}?text=${encodeURIComponent(this.options.message)}`;

        widget.innerHTML = `
      <a href="${whatsappUrl}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="whatsapp-button"
         aria-label="Chat with us on WhatsApp">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="${this.options.textColor}" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
      ${this.options.showTooltip ? `<span class="tooltip" role="tooltip">${this.options.tooltipText}</span>` : ''}
    `;

        // Set custom CSS properties
        widget.style.setProperty('--widget-size', this.options.size);
        widget.style.setProperty('--widget-background', this.options.backgroundColor);

        // Store reference to widget element
        this.widgetElement = widget;
        document.body.appendChild(widget);
    }

    /**
     * Sets up event listeners for the widget
     * @private
     */
    setupEventListeners() {
        const button = this.widgetElement.querySelector('.whatsapp-button');

        button.addEventListener('click', (e) => {
            this.trackClick(e);
        });

        // Add touch event handling for mobile devices
        button.addEventListener('touchstart', () => {
            button.style.transform = 'scale(0.9)';
        });

        button.addEventListener('touchend', () => {
            button.style.transform = 'scale(1)';
        });
    }

    /**
     * Tracks click events on the widget
     * @private
     * @param {Event} event - Click event object
     */
    trackClick(event) {
        if (this.options.onClick && typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        }
    }

    /**
     * Updates widget options after initialization
     * @public
     * @param {Object} newOptions - New configuration options
     */
    updateOptions(newOptions) {
        this.options = Object.assign(this.options, newOptions);
        this.validateOptions();
        this.destroy();
        this.createWidget();
        this.setupEventListeners();
    }

    /**
     * Removes the widget from the DOM
     * @public
     */
    destroy() {
        if (this.widgetElement && this.widgetElement.parentElement) {
            this.widgetElement.parentElement.removeChild(this.widgetElement);
        }
    }

    /**
     * Shows the widget if it's hidden
     * @public
     */
    show() {
        if (this.widgetElement) {
            this.widgetElement.style.display = 'block';
        }
    }

    /**
     * Hides the widget if it's visible
     * @public
     */
    hide() {
        if (this.widgetElement) {
            this.widgetElement.style.display = 'none';
        }
    }
}