import React, { Component } from "react";

import ProjectData from "../JSON/projectsData.json";
import ProjectModule from "../Components/ProjectModule";
import PhaseModule from "../Components/PhaseModule";
import PhaseOneBanner from "../Assets/Images/Banner/phase1.png";
import PhaseTwoBanner from "../Assets/Images/Banner/phase2.png";
import PhaseThreeBanner from "../Assets/Images/Banner/phase3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      projectModuleOpen: false,
      openPhaseModule: false,
      viewingClient: "",
      offsetClientImages: 0,
      limitClientImages: 3,
      clientCount: 0,
      viewingFile: "",
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    var clientCount = 0;
    for (var client in ProjectData.clients) {
      clientCount += 1;
      this.setState({
        clientCount: clientCount,
      });
    }
    this.props.getPage(window.location.pathname);
  }
  componentDidUpdate() {
    this.state.projectModuleOpen
      ? (document.documentElement.style.overflow = "hidden")
      : (document.documentElement.style.overflow = "auto");
    for (
      var count = 0;
      count <
      document.querySelectorAll(".carouselNavDots .paginationCircle").length;
      count++
    ) {
      document.querySelectorAll(".carouselNavDots .paginationCircle")[
        count
      ].style.color = "black";
    }
    document.querySelectorAll(".carouselNavDots .paginationCircle")[
      Math.floor(this.state.offsetClientImages / 3)
    ].style.color = "mediumaquamarine";
    if (this.state.offsetClientImages === 0) {
      document
        .querySelector(".carouselControls .leftArrow")
        .classList.remove("active");
    } else {
      document
        .querySelector(".carouselControls .leftArrow")
        .classList.add("active");
    }
    if (this.state.limitClientImages < this.state.clientCount) {
      document
        .querySelector(".carouselControls .rightArrow")
        .classList.add("active");
    } else {
      document
        .querySelector(".carouselControls .rightArrow")
        .classList.remove("active");
    }
  }
  toggleProjectModule = (client) => {
    this.setState({
      projectModuleOpen: !this.state.projectModuleOpen,
      viewingClient: client,
    });
  };
  togglePhaseModule = (file) => {
    this.setState({
      openPhaseModule: !this.state.openPhaseModule,
      viewingFile: file,
    });
  };

  openProjectModule = () => {
    return (
      <ProjectModule
        toggleProjectModule={this.toggleProjectModule}
        viewingClient={this.state.viewingClient}
      ></ProjectModule>
    );
  };
  openPhaseModule = () => {
    return (
      <PhaseModule
        togglePhaseModule={() => this.togglePhaseModule()}
        viewingFile={this.state.viewingFile}
      ></PhaseModule>
    );
  };
  carouselRight = () => {
    if (this.state.limitClientImages < this.state.clientCount) {
      this.setState({
        limitClientImages: this.state.limitClientImages + 3,
        offsetClientImages: this.state.offsetClientImages + 3,
      });
    }
  };

  carouselLeft = () => {
    if (this.state.offsetClientImages > 0) {
      this.setState({
        limitClientImages: this.state.limitClientImages - 3,
        offsetClientImages: this.state.offsetClientImages - 3,
      });
    }
  };
  carouselPaginationClick = (offset, limit) => {
    this.setState({
      limitClientImages: limit,
      offsetClientImages: offset,
    });
  };
  render() {
    return (
      <section className="home">
        {this.state.projectModuleOpen ? this.openProjectModule() : null}
        {this.state.openPhaseModule ? this.openPhaseModule() : null}
        {/* How Can We Help You Section */}
        <div className="mainInfo" id="mainInfo">
          <h1>How Can We Help You?</h1>
          <div className="mainInfoContainer">
            <div
              className="phaseContainer slide"
              onClick={() =>
                this.togglePhaseModule(
                  "https://drive.google.com/file/d/114vVNmKsh-ggyrX29TxB2-Vvr0OEqeXf/preview"
                )
              }
            >
              <div className="phaseImage">
                <img src={PhaseOneBanner} alt="phase one" />
              </div>
              <p className="describle">Product Design Services</p>
              <div className="phase">
                <h2>phase 1</h2>

                {/* Made modification here for feedback "Make the titles "Mock-up & Product Roadmap", 
                "Software Design & Development", and "Artificial Intelligence & Analytics" the same 
                font size as PHASE 1, PHASE 2, PHASE 3." initially <p> was used.     */}
                <h2>
                  Mock-up &amp; <br />
                  Product Roadmap
                </h2>
              </div>
              <h2 className="example">
                "I have an idea for an app and would like some advice and
                direction on how I can get started"
              </h2>

              <button>learn more</button>
            </div>
            <div
              className="phaseContainer slide"
              onClick={() =>
                this.togglePhaseModule(
                  "https://drive.google.com/file/d/1-R9NHRe6RaOMXSuiVByI1SlgiuiA4UD4/preview"
                )
              }
            >
              <div className="phaseImage">
                <img src={PhaseTwoBanner} alt="phase two" />
              </div>
              <p className="describle">
                Product Design &amp; Development Services
              </p>
              <div className="phase">
                <h2>phase 2</h2>
                <h2>
                  Software Design &amp; <br />
                  Development
                </h2>
              </div>
              <h2 className="example">
                "I am ready to work with developers and designers to create a
                market-relevant, customer-centric app"
              </h2>

              <button>learn more</button>
            </div>
            <div
              className="phaseContainer slide"
              onClick={() =>
                this.togglePhaseModule(
                  "https://drive.google.com/file/d/123bw1XFn7UvxyZ6QEwZxqR3vesKsnKGl/preview"
                )
              }
            >
              <div className="phaseImage">
                <img src={PhaseThreeBanner} alt="phase three" />
              </div>
              <p className="describle">Product Management Services</p>
              <div className="phase">
                <h2>phase 3</h2>
                <h2>
                  Artificial Intelligence
                  <br /> &amp; Analytics
                </h2>
              </div>
              <h2 className="example">
                "I want to leverage data insights through advance analytics and
                artificial intelligence technology"
              </h2>

              <button>learn more</button>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="partners">
          <div className="partnersInfoContainer">
            <div className="partnersText">
              <a
                href="https://www.linkedin.com/feed/hashtag/businessprojects"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h1>
                  Business Projects{" "}
                  <span className="shadowedText">Projects</span>
                </h1>
              </a>
              <p>
                {" "}
                LIFE3 employs design thinking frameworks to strategize around
                unique user needs, conduct market validation, get from idea
                conception to visual prototype, and drive customer-centric
                development
              </p>
              <div className="partnerLogosContainer">
                {Object.keys(ProjectData.clients).map((key, index) => {
                  if (
                    index >= this.state.offsetClientImages &&
                    index < this.state.limitClientImages
                  ) {
                    return (
                      <img
                        className="partnerLogo"
                        src={require("../Assets/Images/Icons/" +
                          ProjectData.clients[key].icon)}
                        key={key}
                        onClick={() => this.toggleProjectModule(key)}
                        alt={key}
                      ></img>
                    );
                  }
                })}
                <div className="carouselControls">
                  <FontAwesomeIcon
                    className="leftArrow"
                    icon={faChevronLeft}
                    onClick={() => this.carouselLeft()}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className="rightArrow"
                    icon={faChevronRight}
                    onClick={() => this.carouselRight()}
                  ></FontAwesomeIcon>
                  <div className="carouselNavDots">
                    {Object.keys(ProjectData.clients).map((key, index) => {
                      if (index % 3 === 0) {
                        return (
                          <FontAwesomeIcon
                            key={index}
                            className="paginationCircle"
                            icon={faCircle}
                            onClick={() =>
                              this.carouselPaginationClick(index, index + 3)
                            }
                          ></FontAwesomeIcon>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* About Us */}
        <div className="about">
          <h1>Using Technology to Learn & Progress Together</h1>
          <p>
            LIFE3 provides cost effective options for technology startups while
            facilitating entrepreneurial ecosystems in where multiple
            stakeholders work collaboratively with designers, developers and
            product managers to ideate, build, and release innovations into
            market. We use technology to learn and progress together.
          </p>
        </div>
      </section>
    );
  }
}
