import React, { Component } from "react";

export default class ThankYou extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.getPage("/thankyou");
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <section className="thankYou">
        <div>
          <img
            src="../Assets/Images/Icons/check.png"
            alt="thank you icon"
            style={{ height: "15vh", marginTop: "18vh" }}
          />
          <h1 style={{ color: "#ADF5D9" }}>THANK YOU!</h1>
          <p>
            We have received your message, and will get back to you shortly.
          </p>
          <p>
            Want some me to talk? Find me on my{" "}
            <a
              href="https://meetings.hubspot.com/omar-duran1"
              style={{ textDecoration: "underline" }}
            >
              calendar
            </a>
            .
          </p>
        </div>
      </section>
    );
  }
}
