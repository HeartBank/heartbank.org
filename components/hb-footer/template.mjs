import "./hb-donors/element.mjs";
import { THONLY } from "https://thonly.org/global.mjs";
const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="${THONLY}/components/tl-footer/shadow.css">
    <link rel="stylesheet" href="components/hb-footer/shadow.css">
    <nav>
        <main>
            <section>
                <hb-donors></hb-donors>
            </section>
            <section>
                <div>
                    <h5>Thank</h5>
                    <ul>
                        <li><a href="https://dear.kiitos.earth/#HeartBank">Kiitos</a></li>
                    </ul> 
                </div>
                <div>
                    <h5>Donate</h5>
                    <ul>
                        <li><a href="https://heartbank.fund/#HeartBank">HeartBank</a></li>
                        <li><a href="https://github.com/sponsors/heartbank">GitHub</a></li>
                    </ul>
                </div>
            </section>
            <section>
                <div>
                    <h5>Follow</h5>
                    <ul>
                        <li><a href="https://me.thonly.net/#HeartBank">THonly</a></li>
                        <li><a href="https://www.facebook.com/heartbank">Facebook</a></li>
                        <li><a href="https://medium.com/@heartbank">Medium</a></li>
                    </ul>
                </div>
                <div>
                    <h5>Contact</h5>
                    <ul>
                        <li><a href="mailto:kiitos@heartbank.org">kiitos@heartbank.org</a></li>
                    </ul>
                </div>
            </section>
        </main>
        <footer>
            <small><a href="https://heartbank.com">HeartBank® Trust</a> &copy; 2023</small>
        </footer>
    </nav>
`;

export default template;