import React, { Component } from "react";


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
        <div className="lightBoxBackground"  onClick={() => this.props.togglePhaseModule()}/>
        <div className="lightBoxContent">
          <iframe
            className="slideShow"
            src={this.props.viewingFile}
            frameBorder={0}
            allowFullScreen={true}
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            title="Phase Slideshow"
          />
        </div>
        
      </div>
    );
  }
}
