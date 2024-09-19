import React from "react";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-sans">
      {/* Header */}
      <header className="bg-gray-800 py-10 shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-white">
            VoxABox Privacy Policy
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
            At <strong>VoxABox</strong>, we are committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our chat application.
            Please read this policy carefully to understand our practices
            regarding your personal data.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">
            2. Information We Collect
          </h2>
          <p className="leading-relaxed text-lg">
            We collect various types of information when you use VoxABox,
            including:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-lg">
            <li>
              <strong>Personal Information</strong>: When you register for an
              account, we collect your name, email address, and any profile
              information you provide.
            </li>
            <li>
              <strong>Messages and Content</strong>: Any messages you send
              through VoxABox, including private chats and group messages, are
              stored on our servers.
            </li>
            <li>
              <strong>Usage Data</strong>: We collect data on how you interact
              with the app, such as chat activity, settings preferences, and
              log-in data.
            </li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">
            3. How We Use Your Information
          </h2>
          <p className="leading-relaxed text-lg">
            We use the information we collect in the following ways:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-lg">
            <li>
              To provide and maintain our chat services, including enabling
              messaging features.
            </li>
            <li>
              To communicate with you about updates, promotions, and alerts.
            </li>
            <li>
              To improve our platform by analyzing usage patterns and user
              feedback.
            </li>
            <li>To ensure the security and stability of the application.</li>
          </ul>
        </section>

        {/* How We Share Your Information */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">
            4. How We Share Your Information
          </h2>
          <p className="leading-relaxed text-lg">
            We do not sell or rent your personal information to third parties.
            However, we may share your information with:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-lg">
            <li>
              <strong>Service Providers</strong>: We may share your data with
              third-party service providers who assist us with app hosting,
              analytics, and customer support.
            </li>
            <li>
              <strong>Legal Compliance</strong>: We may disclose your
              information if required by law, such as responding to subpoenas or
              regulatory authorities.
            </li>
            <li>
              <strong>Business Transfers</strong>: In the event of a merger,
              acquisition, or asset sale, your information may be transferred.
            </li>
          </ul>
        </section>

        {/* Security of Your Information */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">
            5. Security of Your Information
          </h2>
          <p className="leading-relaxed text-lg">
            We take the security of your information seriously and implement
            industry-standard measures to protect it. This includes encryption
            of messages and secure data storage. However, no transmission over
            the internet is 100% secure, and we cannot guarantee the absolute
            security of your data.
          </p>
        </section>

        {/* Your Data Rights */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">6. Your Data Rights</h2>
          <p className="leading-relaxed text-lg">You have the right to:</p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-lg">
            <li>
              Access, update, or delete the personal information we hold about
              you.
            </li>
            <li>
              Request a copy of your personal data in a structured format.
            </li>
            <li>Withdraw your consent for data processing at any time.</li>
            <li>
              Object to our use of your personal information for certain
              purposes.
            </li>
          </ul>
          <p className="mt-4 text-lg">
            To exercise these rights, please contact us at{" "}
            <a
              href="mailto:nadeemammar04@gmail.com"
              className="text-blue-600 hover:underline"
            >
              nadeemammar04@gmail.com
            </a>
            .
          </p>
        </section>

        {/* Data Retention */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">7. Data Retention</h2>
          <p className="leading-relaxed text-lg">
            We retain your personal information for as long as your account is
            active or as needed to provide our services. We may also retain your
            data to comply with legal obligations or resolve disputes.
          </p>
        </section>

        {/* Changes to Privacy Policy */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">
            8. Changes to This Privacy Policy
          </h2>
          <p className="leading-relaxed text-lg">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, and if the changes are significant, we
            will notify you via email or within the app. Your continued use of
            VoxABox after the changes take effect means you accept the updated
            Privacy Policy.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">
            9. Contact Information
          </h2>
          <p className="leading-relaxed text-lg">
            If you have any questions about this Privacy Policy or how we handle
            your data, please contact us at{" "}
            <a
              href="mailto:nadeemammar04@gmail.com"
              className="text-blue-600 hover:underline"
            >
              nadeemammar04@gmail.com
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
            Please review our{" "}
            <a
              href="/terms-and-conditions"
              className="text-blue-500 hover:underline"
            >
              Terms and Conditions
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}

export default PrivacyPolicy;
