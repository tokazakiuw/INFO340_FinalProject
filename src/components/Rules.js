import React from 'react';
import Navbar from './Navbar';

function Rules(props) {
  return (
    <section className="rules">
      <Navbar />
      <div className="rules-content">
        <h1>Rules &amp; Guidelines</h1>
        <ol>
          <li>
            <h2>Be courteous to each other</h2>
            <p>
              This site is intended to foster a community and connect traders
              through the marketplace. Please be respectful and considerate of
              others.
            </p>
          </li>
          <li>
            <h2>Don't spam the main feed</h2>
            <p>
              It's annoying. Please refrain from spamming the main feed with
              unnecessary content.
            </p>
          </li>
          <li>
            <h2>Transactions may only involve cards and cash</h2>
            <p>
              To maintain transparency and avoid any potential issues, listings
              requesting services or other goods will be removed.
            </p>
          </li>
        </ol>
        <h1>Terms of Service</h1>
        <ol>
          <li>
            <h2>Eligibility</h2>
            <p>
              You must be at least 18 years old to use this website. By accessing
              and using the website, you acknowledge and agree to this requirement.
            </p>
          </li>
          <li>
            <h2>Account Creation</h2>
            <p>
              You may be required to create an account to access certain features
              of this website. It is your responsibility to maintain the
              confidentiality of your account and password.
            </p>
          </li>
          <li>
            <h2>Limitation of Liability</h2>
            <p>
              We will not be liable for any damages of any kind arising from the
              use of this website, including, but not limited to, direct, indirect,
              incidental, punitive, and consequential damages.
            </p>
          </li>
        </ol>
        <h1>Privacy Policy</h1>
        <ol>
          <li>
            <h2>Information We Collect</h2>
            <p>
              We may collect personal information that you provide to us, such as
              your name, email address, mailing address, phone number, and payment
              information. By using this website, you consent to the collection
              and use of this information.
            </p>
          </li>
          <li>
            <h2>How We Use Your Information</h2>
            <p>
              We may use your personal information to provide and improve our
              services, communicate with you, process transactions, detect and
              prevent fraud, and for other purposes as permitted by law.
            </p>
          </li>
          <li>
            <h2>Sharing Your Information</h2>
            <p>
              We may share your personal information with third-party service
              providers that assist us with our business operations, such as
              payment processors, shipping companies, and customer support
              providers. We may also share your information with law enforcement
              or other third parties as required by law or necessary to protect
              our rights.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}

export default Rules;