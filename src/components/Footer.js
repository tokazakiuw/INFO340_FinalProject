import React from 'react';

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="footer-left">
                    <p>&copy; 2023 Trading Card Market Project Draft</p>
                </div>
                <div className="footer-right">
                    <ul>
                        <li>
                            <a href="./rules.html">Terms of Service</a>
                        </li>
                        <li>
                            <a href="./rules.html">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="mailto:examplemail@gmail.com">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;  