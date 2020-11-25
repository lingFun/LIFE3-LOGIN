import React, { Component } from "react";
import BannerVideo from "../Assets/Videos/life3.MP4";

export default class HomeBanner extends Component {
  render() {
    return (
      <div
        className={
          this.props.currentPage === "/empower" ||
          this.props.currentPage === "/enable"
            ? "bannerContainer eBanner" : "bannerContainer" 
          }
      >
        {this.props.currentPage === "/" ? (
          <video autoPlay muted loop>
            <source src={BannerVideo} type="video/mp4" />
          </video>
        ) : null}

        {this.props.currentPage === "/" ? (
          <div className="banner">
            <h1>WE ENABLE</h1>{" "}
            <div>
              <h2 className="bannerText">
                you to build and design your digital application in a diverse
                and equitable environment
              </h2>
              <h2>
                <a href="#contactUs">
                  {" "}
                  <button> Contact Us </button>{" "}
                </a>
              </h2>
            </div>
          </div>
        ) : null}
        {this.props.currentPage === "/enable" ? (
          <div className="enableBannerContent">
            <h1>WE ENABLE</h1>{" "}
            <p className="bannerText">
              LIFE3 creates environments where team of thinkers and learners are
              enabled. Our initiative is having a positive impact on the number
              of underrepresented groups learning about , securing jobs, and
              approaching entrepreneurial ventures.
            </p>
          </div>
        ) : null}
        {this.props.currentPage === "/empower" ? (
          <div className="banner">
            <h1> We Empower </h1>
            <p className="bannerText">
              We empower inclusion of underrepresented communities in
              technology-focused careers and entrepreneurial ventures
            </p>
            <h2>
              <a href="#contactUs">
                <button> Contact Us </button>{" "}
              </a>
            </h2>
          </div>
        ) : null}
      </div>
    );
  }
}
