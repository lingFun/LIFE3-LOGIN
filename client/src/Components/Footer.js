import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faFacebookF } from "@fortawesome/free-brands-svg-icons";

export default class Footer extends Component {
  render() {
    return this.props.currentPage === '/signin' ? (null): (
      <footer>
        <div className="contactUsForm" id="contactUs">
          <form action="https://formspree.io/xzbeebbo" method="POST">
            <div>
              <h2>CONTACT US</h2>
              <h1>SEND US A MESSAGE</h1>
              <br />
              <div className="formInput">
                <input
                  type="text"
                  name="companyName"
                  placeholder="Your Organization Name"
                />
                <select
                  id="mylist"
                  name="organizationType"
                  placeholder="Company Type"
                >
                  <option value="technicalCompany">Technical company</option>
                  <option value="educationalInstitution">
                    Educational institution
                  </option>
                  <option value="others">Other</option>
                </select>
              </div>
              <div className="formInput">
                <input type="text" name="name" placeholder="Your Name" />
                <input type="tel" name="phoneNumber" placeholder="Phone#" />
              </div>
              <input
                className="input2"
                type="email"
                name="emailAddress"
                placeholder="Email"
              />
              <div className="messageInput">
                <textarea
                  type="text"
                  name="message"
                  placeholder="Message"
                  defaultValue={""}
                />
              </div>
              <input
                className="submitBtn"
                type="submit"
    
                value="Send Message"
              />
            </div>
          </form>
        </div>
        {/* <img class="footerLogo" src="Assets/Images/Icons/LIFE3FooterLogo.png" alt="LIFE3 Logo" title="LIFE3"> */}
        {/* <div class="contactUsContainer">
      <h3>CONTACT US</h3>
      <p>215 Moore St, <br> Brooklyn, NY 11206 <br> USA</p>
  </div> */}
        <div className="socialMediaContainer">
          <p>EMAIL US | CALL US (917) 570-2669</p>
          <div className="iconBar">
            <a
              href="https://www.linkedin.com/company/life3-learn-innovate-for-innovation-enablement-empowerment/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="socialMediaIcon">
                <FontAwesomeIcon icon={faLinkedinIn}></FontAwesomeIcon>
              </div>
            </a>
            <a
              href="https://www.facebook.com/life3innovate/?modal=admin_todo_tour"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="socialMediaIcon">
                <FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon>
              </div>
            </a>
            <a href="mailto:omar.duran@life3.io">
              <div className="socialMediaIcon">
                <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
              </div>
            </a>
          </div>
          <p className="copyright">2020 LIFE3 All rights reserved.</p>
          <p></p>
        </div>
      </footer>
    );
  }
}
