import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  Typography,
  TextField,
} from "@mui/material";
import MenuPopupState from "./MenuPopup";
import Link from "@mui/material/Link";
import MenuPopup from "../components/MenuPopup";
import JungFace from "/gpt-text-1.png";

function Terms({ setUser, setAuthState, user }) {
  return (
    <div>
      <div className="main">
        <MenuPopupState
          setUser={setUser}
          setAuthState={setAuthState}
          user={user}
        />
      </div>
      <Typography marginTop="2rem" variant="h4" align="center" gutterBottom>
        Terms of Service
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        width="80%" // Set the width of the Box to 80% of its parent
        margin="auto" // This centers the Box horizontally
      >
        <Typography
          marginTop="2rem"
          marginBottom="2rem"
          variant="h6"
          align="lenter"
          gutterBottom
        >
          TOS User Usage Acknowledgement:
          <br /> I understand that this platform provides AI chat-based support
          and is NOT a replacement for professional mental health services.{" "}
          <br />I understand and acknowledge that I am using this chat bot of my
          own volition and that I should NOT use this bot if I am having
          feelings of self harm, suicidal ideation, or am having a panic attack.
          This service does not constitute mental health therapy, counseling,
          medical or psychological diagnosis, or professional mental health
          advice. <br />
          If I am in crisis, feel like I may harm myself or others, I understand
          it is essential to seek immediate professional help.
        </Typography>
        <Typography
          display={"flex"}
          justifyContent="center"
          alignContent="center"
          width={0.8}
          variant="body1"
          paragraph
        >
          Welcome to JungGPT. The following Terms of Service ("TOS") contain the
          terms and conditions that govern your use of the JungGPT application
          ("Application") and the services provided by the Application
          ("Services"). By using the Application, you agree to be bound by these
          TOS, as they may be amended by Ventura UX, LLC from time to time in
          its sole discretion.
          <br />
          <br />
          1. **License**: Subject to your compliance with these Terms of Service
          (TOS), Ventura UX, LLC grants you a limited, non-exclusive,
          non-transferable, non-sublicensable license to access and use the
          Application. This license is for your personal and non-commercial use
          only. This means that you are permitted to use the Application as it
          is provided to you by Ventura UX, LLC, but you may not copy, modify,
          distribute, sell, or lease any part of the Application, nor may you
          reverse engineer or attempt to extract the source code of the
          software, unless laws prohibit those restrictions or you have our
          written permission. The Application and its original content,
          features, and functionality are owned by Ventura UX, LLC and are
          protected by international copyright, trademark, patent, trade secret,
          and other intellectual property or proprietary rights laws. Any rights
          not expressly granted herein are reserved by Ventura UX, LLC. Your use
          of the Application does not grant you any right, title, or interest in
          the Application or the content in the Application. Please note that we
          may revoke this license at our discretion, without notice and without
          liability, for any reason or for no reason. Any unauthorized use of
          the Application terminates the permissions and/or licenses granted by
          Ventura UX LLC pursuant to these TOS. Also, you agree to respect all
          copyright and other legal notices, information, and restrictions
          contained in any content accessed through the Application. You also
          agree not to change, translate, or otherwise create derivative works
          of the Application. This license will remain in effect unless and
          until you violate these TOS or this license is terminated by you or
          Ventura UX, LLC.
          <br />
          <br />
          2. **Eligibility**: By using the Application, you affirm that you are
          at least 18 years of age. The Application is intended for use by
          individuals who are 18 years or older. If you are under 18 years of
          age, you may only use the Application with the consent and supervision
          of a parent or legal guardian. By using the Application, you represent
          and warrant that you have reached the age of majority in your
          jurisdiction or that you have obtained the necessary consent from your
          parent or legal guardian to use the Application. Ventura UX, LLC
          reserves the right, in its sole discretion, to refuse to offer the
          Application to any person or entity and to change the eligibility
          criteria at any time without prior notice. By accessing or using the
          Application, you acknowledge and agree that Ventura UX, LLC shall not
          be liable for any consequences or damages resulting from your use of
          the Application in violation of these eligibility requirements. It is
          your responsibility to ensure that you meet the eligibility criteria
          before using the Application. If you do not meet the specified
          eligibility requirements, you should refrain from using the
          Application and discontinue any ongoing use immediately.
          <br />
          <br />
          3. **Purpose**: JungGPT is an AI model designed to assist individuals
          in understanding their emotions and providing insights. The primary
          purpose of the tool is to serve as an emotional reflection tool and
          provide a platform for individuals to explore their thoughts and
          feelings. It is important to note that JungGPT is not intended to
          replace professional therapy or serve as a substitute for mental
          health treatment. While it may provide support and guidance, it does
          not constitute medical advice, diagnosis, or treatment. JungGPT should
          be used as a tool to complement and enhance personal growth and
          self-awareness. It can offer reflections, suggestions, and insights
          based on its training and knowledge in the fields of psychology,
          psychiatry, medicine, and philosophy. It is essential to understand
          that the information provided by JungGPT should not be relied upon as
          a substitute for professional advice or treatment from qualified
          mental health professionals. If you are experiencing a mental health
          crisis, have severe emotional distress, or require immediate
          assistance, it is crucial to seek help from a licensed therapist,
          counselor, or healthcare provider. By using JungGPT, you acknowledge
          and understand that it is not a substitute for professional therapy or
          treatment. You are solely responsible for your well-being and should
          use the tool at your own discretion, taking into consideration your
          individual circumstances and seeking appropriate professional help
          when needed. JungGPT aims to provide a supportive and empathetic
          environment to help individuals explore and understand their emotions,
          but it is important to prioritize your mental health and consult with
          qualified professionals for personalized and comprehensive assistance.
          <br />
          <br />
          4. **Data Privacy, Confidentiality, and Usage**: At Ventura UX, LLC,
          our priority is the confidentiality and security of user data in the
          JungGPT application. Here's what you need to know: Strict
          Confidentiality: All personal data, including location, messages,
          number of messages, number of words, and number of characters, is kept
          strictly confidential. We do not sell, trade, or transfer your
          information to outside parties. Data Retention for Legal Reasons:
          Conversations are stored and tracked, but solely for legal purposes.
          Access to this data is strictly controlled, and no one is permitted to
          view it without proper authorization. No Usage for Model Training: The
          data collected is not used to train or enhance our models. Your
          interactions with the Application remain private and are not utilized
          for any development or improvement of our AI algorithms. Data We
          Collect: Specific data related to your use of the Application is
          collected, including location, time spent using the app, frequency of
          use, the text of messages sent, the number of messages, number of
          words, and number of characters in each message. Purpose of Data
          Collection: We track this data to understand user engagement with the
          app, to enhance our services, and to fulfill legal obligations. This
          information helps us gain insights into user behavior, improve the
          overall user experience, and protect the company legally. Commitment
          to Privacy and Security: We are committed to maintaining the highest
          standards of privacy and have implemented robust security measures to
          safeguard your information. By using the JungGPT application, you
          acknowledge and agree to our data handling practices as outlined
          above.
          <br />
          <br />
          5. **Medical Assistance**: It is important to note that the Services
          provided by JungGPT are not intended to replace professional medical
          advice, diagnosis, or treatment. While JungGPT can assist in
          understanding emotions and providing insights, it is not a substitute
          for medical or mental health care. The information and guidance
          provided by JungGPT should not be considered as medical, psychiatric,
          or therapeutic advice. It is always recommended that you consult with
          qualified healthcare professionals, such as doctors, therapists, or
          counselors, for any medical or mental health concerns. If you are
          experiencing a medical emergency or require immediate medical
          attention, please contact your local healthcare provider or emergency
          services right away. JungGPT is not designed or equipped to handle
          medical emergencies, and timely medical assistance should always be
          sought in such situations. While JungGPT aims to provide support and
          guidance, it cannot provide a diagnosis or treatment plan for any
          medical or mental health condition. The responsibility for making
          decisions about your health and well-being lies with you and your
          healthcare providers. By using the Services, you acknowledge and
          understand that JungGPT is not a substitute for professional medical
          or mental health care. It is essential to seek appropriate medical
          advice and treatment from qualified professionals for any
          health-related concerns or conditions. JungGPT encourages you to
          prioritize your health and well-being and seeks to complement, not
          replace, the care provided by medical and mental health professionals.
          Always consult with healthcare providers who are familiar with your
          specific circumstances and can provide personalized advice and
          treatment options. Please consult our Terms of Service and Privacy
          Policy for further details regarding the limitations of the Services
          and your responsibilities as a user.
          <br />
          <br />
          6. **Limitation of Liability**: Ventura UX, its officers, directors,
          employees, or agents shall not be held liable for any damages arising
          out of or in connection with your use of the Application or Services.
          This includes, but is not limited to, indirect, incidental, special,
          punitive, or consequential damages, regardless of whether such damages
          are foreseeable or Ventura UX, LLC, has been advised of the
          possibility of such damages. By using the Application and Services,
          you agree that Ventura UX, LLC, shall not be responsible for any
          direct or indirect harm, loss, or damage that may result from your
          interactions with the Application or Services. This includes, but is
          not limited to, any errors or inaccuracies in the information provided
          by JungGPT, any interruption or cessation of services, or any
          unauthorized access to or use of your personal information. The
          foregoing limitation of liability applies to the fullest extent
          permitted by law in the applicable jurisdiction. It is important to
          understand that while JungGPT strives to provide accurate and reliable
          information, there may be limitations and inherent risks associated
          with the use of an AI language model. Therefore, it is your
          responsibility to use the Application and Services at your own
          discretion and assess the suitability and accuracy of the information
          provided. JungGPT encourages you to exercise caution and seek
          professional advice when appropriate. The limitations of liability
          outlined in these Terms of Service are designed to protect Ventura UX,
          LLC and its affiliates to the fullest extent permitted by law, and by
          using the Application and Services, you acknowledge and accept these
          limitations.
          <br />
          <br />
          7. **User Responsibilities**: By using the Application and Services,
          you agree to comply with all applicable laws, regulations, and
          guidelines. You are responsible for maintaining the confidentiality of
          your account information and for all activities that occur under your
          account. You agree not to use the Application for any unlawful or
          unauthorized purposes and to refrain from engaging in any activity
          that may disrupt or interfere with the proper functioning of the
          Application or Services.
          <br />
          <br />
          8. **Intellectual Property**: All intellectual property rights in the
          Application and Services, including but not limited to trademarks,
          logos, graphics, and content, are owned by or licensed to Ventura UX,
          LLC. You agree not to use, modify, reproduce, distribute, or exploit
          any intellectual property without the explicit permission of Ventura
          UX, LLC.
          <br />
          <br />
          9. **Termination**: Ventura UX, LLC reserves the right to suspend or
          terminate your access to the Application and Services at any time,
          with or without cause or notice. In the event of termination, you will
          no longer have access to your account or any data associated with it.
          <br />
          <br />
          10. **Third-Party Links**: The Application and Services may contain
          links to third-party websites or resources. JungGPT is not responsible
          for the availability, accuracy, or content of such external sites or
          resources. You acknowledge and agree that JungGPT is not liable for
          any loss or damage caused by your use of any third-party websites or
          resources.
          <br />
          <br />
          11. **Indemnification**: You agree to indemnify and hold Ventura UX,
          LLC, its officers, directors, employees, and agents harmless from any
          claims, liabilities, damages, losses, or expenses arising out of or in
          connection with your use of the Application or Services, including any
          violation of these Terms of Service.
          <br />
          <br />
          12. **Governing Law**: These TOS are governed by the laws of the
          jurisdiction in which Ventura UX operates. Any disputes arising out of
          these TOS will be adjudicated in the courts of that jurisdiction.
          <br />
          <br />
          13. **Arbitration**: Except for any disputes, claims, suits, actions,
          causes of action, demands or proceedings (collectively, "Disputes") in
          which either Party seeks to bring an individual action in small claims
          court or seeks injunctive or other equitable relief for the alleged
          unlawful use of intellectual property, including, without limitation,
          copyrights, trademarks, trade names, logos, trade secrets or patents,
          you and Ventura UX, LLC agree (a) to waive your and Ventura UX, LLC’s
          respective rights to have any and all Disputes arising from or related
          to these TOS, the Application, or the Services, resolved in a court,
          and (b) to waive your and Ventura UX, LLC’s respective rights to a
          jury trial. Instead, you and Ventura UX, LLC agree to arbitrate
          Disputes through binding arbitration (which is the referral of a
          Dispute to one or more persons charged with reviewing the Dispute and
          making a final and binding determination to resolve it instead of
          having the Dispute decided by a judge or jury in court).
          <br />
          <br />
          14. **No Class Arbitrations, Class Actions or Representative
          Actions**: You and Ventura UX, LLC agree that any Dispute arising out
          of or related to these TOS, the Application or the Services is
          personal to you and Ventura UX, LLC and that such Dispute will be
          resolved solely through individual arbitration and will not be brought
          as a class arbitration, class action or any other type of
          representative proceeding. You and Ventura UX, LLC agree that there
          will be no class arbitration or arbitration in which an individual
          attempts to resolve a Dispute as a representative of another
          individual or group of individuals. Further, you and Ventura UX, LLC
          agree that a Dispute cannot be brought as a class or other type of
          representative action, whether within or outside of arbitration, or on
          behalf of any other individual or group of individuals.
          <br />
          <br />
          15. **Delegation Clause** You and Ventura UX, LLC agree that any and
          all disputes or claims related to the interpretation, enforceability,
          or formation of this arbitration agreement, including but not limited
          to any claim that all or any part of this arbitration agreement is
          void or voidable, or whether a claim is subject to arbitration, shall
          be resolved exclusively by the appointed arbitrator and not by any
          court. This includes the scope, applicability, validity, and
          enforceability of the arbitration agreement. This arbitration
          agreement allows for the arbitrator, not any federal, state, or local
          court or agency, to have exclusive authority to resolve any dispute
          relating to the interpretation, applicability, enforceability or
          formation of this arbitration agreement, including, but not limited
          to, any claim that all or any part of this arbitration agreement is
          void or voidable. The arbitrator will decide all issues of this nature
          before addressing the merits of the dispute, claim or controversy that
          is subject to arbitration as provided under these TOS.
          <br />
          <br />
          16. **Amendments**: Ventura UX, LLC, reserves the right to modify or
          replace any of these TOS at any time by posting a notice on the
          Application. It is your responsibility to check these TOS periodically
          for changes.
          <br />
          <br />
          17. **Entire Agreement**: These Terms of Service constitute the entire
          agreement between you and Ventura UX, LLC, regarding the use of the
          Application and Services, superseding any prior agreements or
          understandings.
          <br />
          <br />
          18. **Billing and Fees**: By signing up and using the JungGPT
          application, you agree to pay a monthly subscription fee of $5. In
          addition to the subscription fee, you also acknowledge that your usage
          of tokens will be billed at a rate of $0.000045 per thousand tokens
          used. The total token usage fee will be calculated based on the number
          of tokens consumed during your interactions with the application.
          Ventura UX, LLC reserves the right to modify the subscription fee and
          token usage rate with prior notice. Payment for the subscription fee
          and token usage will be processed through the billing information
          provided by you. You are responsible for ensuring that your billing
          information is accurate and up to date. Failure to make timely
          payments may result in a suspension or termination of your access to
          the Application and Services. By signing up and using the Application,
          you acknowledge and agree to the billing terms outlined in this
          clause.
          <br />
          <br /> Last updated on 9/3/23
        </Typography>
        {/* Add more sections as per the needs */}
      </Box>
    </div>
  );
}

export default Terms;
