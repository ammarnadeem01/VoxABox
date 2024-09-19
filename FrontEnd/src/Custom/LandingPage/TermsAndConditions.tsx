import React from "react";
import { NavLink } from "react-router-dom";

function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-sans">
      {/* Header */}
      <header className="bg-gray-800 py-10 shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-white">
            VoxABox Terms & Conditions
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Effective Date: January 1, 2024
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-10 bg-gray-100 text-gray-800 shadow-lg rounded-lg my-10">
        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">1. Introduction</h2>
          <p className="leading-relaxed text-lg">
            Welcome to <strong>VoxABox</strong>! These Terms and Conditions
            govern your use of our chat application. By accessing or using the
            platform, you agree to comply with these terms. If you do not agree
            with any part of these terms, please refrain from using our
            services.
          </p>
        </section>

        {/* User Accounts */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">2. User Accounts</h2>
          <p className="leading-relaxed text-lg">
            To access our features, users must create an account. You agree to
            provide accurate and complete information during registration. You
            are responsible for maintaining the confidentiality of your login
            details and any actions taken under your account.
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-lg">
            <li>Provide accurate, current, and complete information.</li>
            <li>Update your information as necessary.</li>
            <li>
              You are fully responsible for all activities that occur under your
              account.
            </li>
          </ul>
        </section>

        {/* User Responsibilities */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">
            3. User Responsibilities
          </h2>
          <p className="leading-relaxed text-lg">
            As a user of VoxABox, you agree to the following:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-lg">
            <li>
              You will not use the platform for any unlawful or harmful
              activity.
            </li>
            <li>
              You will not harass, abuse, or threaten other users on the
              platform.
            </li>
            <li>
              You will not impersonate any person or entity, nor will you
              misrepresent your affiliation with a person or entity.
            </li>
            <li>
              You will not distribute viruses or harmful software through
              VoxABox.
            </li>
          </ul>
        </section>

        {/* Prohibited Conduct */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">4. Prohibited Conduct</h2>
          <p className="leading-relaxed text-lg">
            While using VoxABox, you agree to refrain from the following
            actions:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-lg">
            <li>Posting or transmitting illegal or offensive content.</li>
            <li>Spamming other users with unsolicited messages.</li>
            <li>
              Attempting to hack or disrupt the system’s security features.
            </li>
            <li>
              Collecting personal information from other users without their
              consent.
            </li>
          </ul>
        </section>

        {/* Content Rights */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">5. Content Rights</h2>
          <p className="leading-relaxed text-lg">
            Users retain ownership of the content they post on VoxABox. However,
            by using the service, you grant us a non-exclusive, royalty-free
            license to use, distribute, and display such content within the
            platform.
          </p>
          <p className="mt-4 text-lg">
            We reserve the right to remove any content that violates these Terms
            and Conditions or is deemed inappropriate by us.
          </p>
        </section>

        {/* Privacy Policy */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">6. Privacy Policy</h2>
          <p className="leading-relaxed text-lg">
            Your privacy is important to us. Please refer to our{" "}
            <NavLink
              to="/privacypolicy"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </NavLink>
            to learn more about how we handle your personal information.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">
            7. Limitation of Liability
          </h2>
          <p className="leading-relaxed text-lg">
            VoxABox is provided "as is" without any warranties. We are not
            liable for any damages or losses resulting from your use of the
            platform. To the fullest extent permitted by law, we disclaim all
            warranties, whether express or implied.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">8. Changes to Terms</h2>
          <p className="leading-relaxed text-lg">
            We reserve the right to modify these terms at any time. Any changes
            will be posted on this page, and it is your responsibility to review
            them periodically. Continued use of VoxABox constitutes acceptance
            of any updated terms.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">
            9. Contact Information
          </h2>
          <p className="leading-relaxed text-lg">
            If you have any questions or concerns about these Terms and
            Conditions, feel free to contact us at{" "}
            <a
              href="mailto:nadeemammar@gmail.com"
              className="text-blue-600 hover:underline"
            >
              nadeemammar@gmail.com
            </a>
            .
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 mt-10 text-center">
        <div className="container mx-auto">
          <p className="mb-2">&copy; 2024 VoxABox. All Rights Reserved.</p>
          <p className="text-sm">
            <a href="/" className="text-blue-500 hover:underline">
              Back Home
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}

export default TermsAndConditions;
