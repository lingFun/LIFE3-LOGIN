import React, { Component } from "react";
import ProjectModule from "../Components/ProjectModule";
import ProjectData from "../JSON/projectsData.json";
import {
  faChevronLeft,
  faChevronRight,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Empower extends Component {
  constructor() {
    super();
    this.state = {
      projectModuleOpen: false,
      openPhaseModule: false,
      viewingClient: "",
      offsetClientImages: 0,
      limitClientImages: 1,
      testimonialCount: 0,
      viewingFile: "",
      testimonialList: Object.keys(ProjectData.team).filter((key) => {
        return (
          ProjectData.team[key].testimonial !== null &&
          ProjectData.team[key].testimonial !== undefined
        );
      }),
    };
  }

  componentDidMount() {
    this.props.getPage("/empower");
    window.scrollTo(0, 0);
    var testimonialCount = 0;
    for (var testimonial in this.state.testimonialList) {

      testimonialCount += 1;
      this.setState({
        testimonialCount: testimonialCount,
      });
    }
  }
  componentDidUpdate() {
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
      Math.floor(this.state.offsetClientImages)
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
    if (this.state.limitClientImages < this.state.testimonialCount) {
      document
        .querySelector(".carouselControls .rightArrow")
        .classList.add("active");
    } else {
      document
        .querySelector(".carouselControls .rightArrow")
        .classList.remove("active");
    }
    
  }

  carouselRight = () => {
    if (this.state.limitClientImages < this.state.testimonialCount) {
      this.setState({
        limitClientImages: this.state.limitClientImages + 1,
        offsetClientImages: this.state.offsetClientImages + 1,
      });
    }
  };

  carouselLeft = () => {
    if (this.state.offsetClientImages > 0) {
      this.setState({
        limitClientImages: this.state.limitClientImages - 1,
        offsetClientImages: this.state.offsetClientImages - 1,
      });
    }
  };
  carouselPaginationClick = (offset, limit) => {
    this.setState({
      limitClientImages: limit,
      offsetClientImages: offset,
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
  toggleProjectModule = (client) => {
    this.setState({
      projectModuleOpen: !this.state.projectModuleOpen,
      viewingClient: client,
    });
  };
  render() {
    return (
      <section className="empower">
        {this.state.projectModuleOpen ? this.openProjectModule() : null}
        {this.state.openPhaseModule ? this.openPhaseModule() : null}
        <div>
          <div className="diverseContentInfo">
            <h1>
              WE ARE DIVERSE <span className="shadowedText">LIFE3</span>
            </h1>
            <div className="aboutDiverseContent">
              <p>
                At LIFE3, we rely on our employees and partner's diverse
                backgrounds and perspectives to spark innovation. We make
                diversity a priority, and creating opportunities for next
                generation.
              </p>
            </div>
            <div className="diverseImageContainer">
              <div className="diverseImageOne" style={{ width: "60%" }}>
                <img
                  src={require("../Assets/Images/race.png")}
                  alt="race stats"
                />
              </div>
              <div className="diverseImageTwo" style={{ width: "40%" }}>
                <img
                  src={require("../Assets/Images/gender.png")}
                  alt="gender stats"
                />
              </div>
            </div>
          </div>
          <div className="testimonials">
            <h1>
              Testimonials <span className="shadowedText">Testimonials</span>
            </h1>
            {Object.keys(this.state.testimonialList).map((key, index) => {
              if (
                index >= this.state.offsetClientImages &&
                index < this.state.limitClientImages
              ) {
                return (
                  <div className="testimonialContainer" key={key + index}>
                    <div className="testimonialsHead">
                      <img
                        src={require("../Assets/Images/Team/" +
                          ProjectData.team[this.state.testimonialList[index]]
                            .image)}
                        alt={this.state.testimonialList[index]}
                      />
                      <div className="testimonialsName">
                        <h2>{this.state.testimonialList[index]}</h2>
                        <h3>{ProjectData.team[this.state.testimonialList[index]].testimonialRole}</h3>
                      </div>
                    </div>
                    <div className="testimonialsContentInfo">
                      <p>
                        "
                        {
                          ProjectData.team[this.state.testimonialList[index]]
                            .testimonial
                        }
                        "
                      </p>
                    </div>

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
                    </div>
                  </div>
                );
              }
            })}
            <div className="carouselNavDots">
              {Object.keys(this.state.testimonialList).map((key, index) => {
                return (
                  <FontAwesomeIcon
                    key={index + key}
                    className="paginationCircle"
                    icon={faCircle}
                    onClick={() =>
                      this.carouselPaginationClick(index, index + 1)
                    }
                  ></FontAwesomeIcon>
                );
              })}
            </div>
          </div>

          <h1>
            Business Projects <span className="shadowedText">Projects</span>
          </h1>
          <div className="businessProjectsContainer">
            {Object.keys(this.state.testimonialList).map((key, index) => {
              if (
                index >= this.state.offsetClientImages &&
                index < this.state.limitClientImages
              ) {
                return Object.keys(
                  ProjectData.team[this.state.testimonialList[index]].roles
                ).map((key, index) => {
          
                  if (key.indexOf("(") === -1) {
                    return (
                      <figure key={key + index} onClick={() => this.toggleProjectModule(key)}>
                        <img
                          alt={key}
                          src={require("../Assets/Images/Icons/" +
                            ProjectData.clients[key].icon)}
                         
                        ></img>
               
                      </figure>
                    );
                  }
                });
              }
            })}
          </div>
        </div>
      </section>
    );
  }
}
