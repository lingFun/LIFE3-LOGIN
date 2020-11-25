import React, { Component } from "react";

import ProjectData from "../JSON/projectsData.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

export default class TeamModule extends Component {
  constructor() {
    super();
    this.state = {
      teamList: [],
    };
  }
  render() {
    return (
      <div className="lightBox">
        <div
          className="lightBoxBackground"
          onClick={() => this.props.toggleTeamLightBox()}
        ></div>
        <div className="teamMemberLightBox">
          <div className="teamProfileImage">
            <a
              href={ProjectData.team[this.props.clickedTeamMember].linkedin}
              target="_blank" rel="noopener noreferrer"
            >
              <img
                alt={this.props.clickedTeamMember}
                title={this.props.clickedTeamMember}
                src={require("../Assets/Images/Team/" +
                  ProjectData.team[this.props.clickedTeamMember].image)}
              />

              <div className="socialIcon">
                <FontAwesomeIcon icon={faLinkedinIn}></FontAwesomeIcon>
              </div>
            </a>
          </div>
          <div className="profileInformation">
            <h1 className="teamName">{this.props.clickedTeamMember}</h1>
            <h2 className="teamRole">
              {
                ProjectData.team[this.props.clickedTeamMember].roles[
                  this.props.viewingClient
                ].role
              }
            </h2>
            <ul className="roleDescription">
              {Object.keys(
                ProjectData.team[this.props.clickedTeamMember].roles[
                  this.props.viewingClient
                ].contributions
              ).map((key, index) => {
                return (
                  <li key={key}>
                    {
                      ProjectData.team[this.props.clickedTeamMember].roles[
                        this.props.viewingClient
                      ].contributions[key]
                    }
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
