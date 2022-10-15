const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/sw-header/shadow.css">
    <header>
        <section>
            <a href="/"><img src="heartbank.png"></a>
            <a href="/"><h1>HeartBank<sup>®</sup> Foundation</h1></a>
        </section>
        <input id="menu-toggle" type="checkbox">
        <label class='menu-button-container' for="menu-toggle">
            <span class='menu-button'></span>
        </label>
        <nav>
            <ul>
                <li>
                    <h3>Kiitos</h3>
                    <div>
                        <a href="#backend-cohort"><button>Kindness World Map</button></a>
                        <h4>Supra & Infra Blockchains</h4>
                        <menu>
                            <li><a>Non Zero Sum</a></li>
                            <li><a>Enlightened Intelligence</a></li>
                        </menu>
                        <h4>Earth</h4>
                        <menu>
                            <li><a>Dear Kiitos</a></li>
                            <li><a>Kitti</a></li>
                        </menu>
                    </div>
                </li>
            </ul>
            <ul>
                <li>
                    <h3>Me</h3>
                    <div>
                        <a href="#backend-cohort"><button>HeartBank.Me</button></a>
                        <h4>Wallet</h4>
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
                        </menu>
                    </div>
                </li>
            </ul>
            <ul>
                <li>
                    <h3>Exchange</h3>
                    <div>
                        <a href="#coupon"><button>HeartBank.Exchange</button></a>
                        <h4>Inclusion & Diversity</h4>
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
                        </menu>
                    </div>
                </li>
            </ul>
            <ul>
                <li>
                    <h3>Net</h3>
                    <div>
                        <a href="#ios-cohort"><button>HeartBank.Net</button></a>
                        <h4>Explorer</h4>
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
                        </menu>
                    </div>
                </li>
            </ul>
            <ul>
                <li>
                    <h3>Domains</h3>
                    <div>
                        <a href="#coupon"><button>HeartBank.Domains</button></a>
                        <h4>Browser</h4>
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
                        </menu>
                    </div>
                </li>
            </ul>
            <ul>
                <li>
                    <h3>IO</h3>
                    <div>
                        <button>HeartBank.IO</button>
                        <h4>333™</h4>
                        <menu>
                            <li><a>Hard Wallet</a></li>
                            <li><a>Battery</a></li>
                        </menu>
                        <h4>Mining</h4>
                        <menu>
                            <li><a>Quantum Computers</a></li>
                            <li><a>Kiitos Programming Language</a></li>
                        </menu>
                    </div>
                </li>
            </ul>
            <ul>
                <li>
                    <h3>Cloud</h3>
                    <div>
                        <a href="#coupon"><button>HeartBank.Cloud</button></a>
                        <h4>Inclusion & Diversity</h4>
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
                        </menu>
                    </div>
                </li>
            </ul>
        </nav>
        <aside>
            <select onchange="this.getRootNode().host.changeLanguage(event)">
                <option value="en">English</option>
                <option value="km" disabled>Khmer</option>
                <option value="es" disabled>Spanish</option>
                <option value="ru" disabled>Russian</option>
                <option value="zh" disabled>Chinese</option>
            </select>
        </aside>
    </header>
`;

export default template;