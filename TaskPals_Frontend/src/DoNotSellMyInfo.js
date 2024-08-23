import React from "react";
import './Notices.css'

const DoNotSellMyInfo = () => {
  return (
    <div className="padding">
      <h1>Do Not Sell My Personal Information</h1>
      <p>
        At TaskPals, we are committed to protecting your privacy and personal
        information. In compliance with the California Consumer Privacy Act
        (CCPA) and other applicable privacy laws, we provide users with the
        option to opt out of the sale of their personal information.
      </p>
      
      <h5>1. Your Rights</h5>
      <p>
        Under the CCPA, you have the right to request that we do not sell your
        personal information. If you choose to exercise this right, TaskPals
        will respect your decision and will not sell your personal information
        to third parties.
      </p>
      
      <h5>2. How to Opt Out</h5>
      <p>
        To opt out of the sale of your personal information, please click the
        link below or contact us using the information provided:
      </p>
      <p>
        <a href="mailto:support@taskpals.com">Opt-Out Request</a>
      </p>

      <h5>3. Contact Us</h5>
      <p>
        If you have any questions about this process or need further assistance,
        please reach out to us:
      </p>
      <p>Email: <a href="mailto:support@taskpals.com">support@taskpals.com</a></p>
      <p>Phone: [Your Phone Number]</p>
      <p>Address: [Your Physical Address]</p>

      <h5>4. Changes to This Policy</h5>
      <p>
        We may update this page from time to time to reflect changes in our
        practices or legal requirements. Any updates will be posted on this
        page with an updated effective date.
      </p>

      <p>Effective Date: August 22, 2024</p>
    </div>
  );
};

export default DoNotSellMyInfo;
