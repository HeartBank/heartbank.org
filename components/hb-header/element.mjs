import template from './template.mjs';

class HbHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('h1').onclick = event => {
            const speak = new Audio('components/hb-header/heartbank.mp3');
            speak.play();
        }
    }

    changeLanguage(event) {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("lang", event.target.value);
        window.location.search = searchParams.toString();
        //TODO: change base url to include language
    }
}

customElements.define("hb-header", HbHeader);