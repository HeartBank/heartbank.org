import { THONLY } from 'https://thonly.org/global.mjs';
import kiitos from "./kiitos.mjs";
import template from './template.mjs';

class HbMain extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        window.addEventListener("hashchange", event => this.#render(false));
    }

    async connectedCallback() {
        await import(`${THONLY}/components/tl-main/tl-kiitos/element.mjs`);
        await import(`${THONLY}/components/tl-main/tl-robot/element.mjs`);
        this.#render(true);
    }

    #render(refresh) {
        const page = window.location.hash.substring(1);
        this.shadowRoot.querySelectorAll('header, main, footer').forEach(element => element.style.display = 'none');
        
        if (page) {
            this.shadowRoot.querySelector('tl-kiitos').render(kiitos[page]);
            this.shadowRoot.querySelector('main').style.display = 'block';
        } else {
            const a = this.shadowRoot.querySelector('a');
            a.href = "https://www.facebook.com/heartbank";
            a.firstElementChild.innerHTML = "<b>Follow</b> for real-time updates!";
            this.shadowRoot.querySelector('header').style.display = 'block';
            this.shadowRoot.querySelector('footer').style.display = 'block';
        }
        
        this.style.display = 'block';
        if (refresh) setTimeout(() => document.body.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" }), 300)
        else document.body.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
        this.#animate();
    }

    #animate() {
        this.shadowRoot.querySelectorAll('.st0').forEach(path => {
            const length = path.getTotalLength();
            // Clear any previous transition
            path.style.transition = path.style.WebkitTransition =
                'none';
            // Set up the starting positions
            path.style.strokeDasharray = length + ' ' + length;
            path.style.strokeDashoffset = length;
            // Trigger a layout so styles are calculated & the browser
            // picks up the starting position before animating
            path.getBoundingClientRect();
            // Define our transition
            path.style.transition = path.style.WebkitTransition =
                'stroke-dashoffset 2s ease-in-out';
            // Go!
            path.style.strokeDashoffset = '0';
        });
    }
}

customElements.define("hb-main", HbMain);