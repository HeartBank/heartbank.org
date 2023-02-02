import { THONLY } from "https://thonly.org/global.mjs";
const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="${THONLY}/components/tl-header/shadow.css">
    <link rel="stylesheet" href="components/hb-header/shadow.css">
    <header>
        <section>
            <a href="#"><img src="heartbank.png"></a>
            <h1>HeartBank<sup>®</sup> Foundation</h1>
        </section>
        <input id="menu-toggle" type="checkbox">
        <label class='menu-button-container' for="menu-toggle">
            <span class='menu-button'></span>
        </label>
        <ul>
            <li>
                <h3>Kiitos</h3>
                <nav>
                    <a href="https://kiitos.earth"><button>Kiitos.Earth</button></a>
                    <!--<h4>Supra & Infra Blockchains</h4>
                    <menu>
                        <li><a>Non Zero Sum</a></li>
                        <li><a>Decentralized Money</a></li>
                    </menu>
                    <h4>Enlightened Intelligence</h4>
                    <menu>
                        <li><a>General Intelligence</a></li>
                        <li><a>Aritifical Intelligence</a></li>
                    </menu>-->
                </nav>
            </li>
            <li>
                <h3>Me</h3>
                <nav>
                    <a href="https://heartbank.me"><button>HeartBank.Me</button></a>
                    <!--<h4>Wallet</h4>
                    <menu>
                        <li><a>Watch Videos on Udemy</a></li>
                        <li><a>Read Textbook on Medium</a></li>
                        <li><a href="#backend-quiz">Take Quizzes to Check Understanding</a></li>
                    </menu>
                    <h4>Personal Identification</h4>
                    <menu>
                        <li><a href="#backend-podcast">Podcast: Motivation & Coding Music</a></li>
                        <li><a href="#backend-code">Interactive Coding Exercises</a></li>
                        <li><a>Remote Pair Programming on Discord</a></li>
                        <li><a>Students' Solo Projects on Replit</a></li>
                    </menu>-->
                </nav>
            </li>
            <li>
                <h3>Exchange</h3>
                <nav>
                    <a href="https://heartbank.exchange"><button>HeartBank.Exchange</button></a>
                    <!--<h4>Inclusion & naversity</h4>
                    <menu>
                        <li><a>Women & Minorities</a></li>
                        <li><a>Ukrainian Refugees</a></li>
                        <li><a>Cambodian Genocide</a></li>
                    </menu>
                    <h4>Campuses</h4>
                    <menu>
                        <li><a>Cambodia</a></li>
                        <li><a>Ukraine</a></li>
                        <li><a>United States</a></li>
                    </menu>-->
                </nav>
            </li>
            <li>
                <h3>Net</h3>
                <nav>
                    <a href="https://heartbank.net"><button>HeartBank.Net</button></a>
                    <!--<h4>Explorer</h4>
                    <menu>
                        <li><a>Watch Videos on Udemy</a></li>
                        <li><a>Read Textbook on Medium</a></li>
                        <li><a href="#ios-quiz">Take Quizzes to Check Understanding</a></li>
                    </menu>
                    <h4>Supra Blockchain</h4>
                    <menu>
                        <li><a href="#ios-podcast">Podcast: Motivation & Coding Music</a></li>
                        <li><a href="#ios-code">Interactive Coding Exercises</a></li>
                        <li><a>Remote Pair Programming on Discord</a></li>
                        <li><a>Students' Solo Projects on GitHub</a></li>
                    </menu>
                    <h4>Infra Blockchains</h4>
                    <menu>
                        <li><a>Live Demo: Music Apps</a></li>
                        <li><a>Syntax Flashcards</a></li>
                        <li><a>Students' Writings on Medium</a></li>
                        <li><a>Mock Interviews on YouTube</a></li>
                    </menu>-->
                </nav>
            </li>
            <li>
                <h3>Domains</h3>
                <nav>
                    <a href="https://heartbank.domains"><button>HeartBank.Domains</button></a>
                    <!--<h4>Browser</h4>
                    <menu>
                        <li><a>Women & Minorities</a></li>
                        <li><a>Ukrainian Refugees</a></li>
                        <li><a>Cambodian Genocide</a></li>
                    </menu>
                    <h4>DNS</h4>
                    <menu>
                        <li><a>Cambodia</a></li>
                        <li><a>Ukraine</a></li>
                        <li><a>United States</a></li>
                    </menu>-->
                </nav>
            </li>
            <li>
                <h3>IO</h3>
                <nav>
                    <a href="https://heartbank.io"><button>HeartBank.IO</button></a>
                    <!--<h4>333™</h4>
                    <menu>
                        <li><a>Hard Wallet</a></li>
                        <li><a>Battery</a></li>
                    </menu>
                    <h4>Mining</h4>
                    <menu>
                        <li><a>Quantum Computers</a></li>
                        <li><a>Kiitos Programming Language</a></li>
                    </menu>-->
                </nav>
            </li>
            <li>
                <h3>Cloud</h3>
                <nav>
                    <a href="https://heartbank.cloud"><button>HeartBank.Cloud</button></a>
                    <!--<h4>Inclusion & naversity</h4>
                    <menu>
                        <li><a>Women & Minorities</a></li>
                        <li><a>Ukrainian Refugees</a></li>
                        <li><a>Cambodian Genocide</a></li>
                    </menu>
                    <h4>Servers</h4>
                    <menu>
                        <li><a>United States</a></li>
                        <li><a>Cambodia</a></li>
                        <li><a>Ukraine</a></li>
                    </menu>-->
                </nav>
            </li>
        </ul>
        <aside>
            <select onchange="this.getRootNode().host.changeLanguage(event)">
                <option value="en">English</option>
                <option value="km" disabled>Khmer</option>
                <option value="ru" disabled>Russian</option>
                <option value="es" disabled>Spanish</option>
                <option value="zh" disabled>Chinese</option>
            </select>
        </aside>
    </header>
`;

export default template;