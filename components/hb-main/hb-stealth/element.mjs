import template from './template.mjs';

class HbStealth extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render(origin) {
        const a = this.shadowRoot.querySelector('a');
        a.href = origin ? "https://" + origin : "https://www.facebook.com/heartbank";
        a.firstElementChild.innerHTML = origin || "<b>Follow</b> for real-time updates!";
        this.style.display = 'block';
    }
}

customElements.define("hb-stealth", HbStealth);