import template from './template.mjs';

class SwMain extends HTMLElement {
    #hash = "SW-STEALTH";

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        window.addEventListener("hashchange", event => window.location.reload());
    }

    connectedCallback() {
        this.style.display = 'block';
        this.#animate();
        this.#render();
    }

    #render() {
        this.shadowRoot.querySelector("slot").assignedElements().forEach(element => element.style.display = 'none');
        this.shadowRoot.querySelector("slot").assignedElements().find(element => element.tagName === this.#hash).render(window.location.hash.substring(1));
    }

    #animate() {
        var paths = this.shadowRoot.querySelectorAll('.st0');
        [].forEach.call(paths, function(path) {
        var length = path.getTotalLength();
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
        })
    }
}

customElements.define("sw-main", SwMain);