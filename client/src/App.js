import React, { Component } from "react";
import "./CSS/styles.css";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NavBar from "./Components/Navbar";
import Home from "./Pages/Home";
import Empower from "./Pages/Empower";
import Signin from './Pages/Signin'
import Signup from "./Pages/Signup"
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage:window.location.pathname
    };
  }
  componentDidMount(){
    this.getPage(window.location.pathname)
  }
  getPage = (page) =>{
  
    this.setState({
      currentPage: page
    })
  }
  render() {
    return (
      <Router>
      <main>
        { this.state.currentPage === "/" || this.state.currentPage === "/empower" ?
          <header>
            <NavBar></NavBar>
            <Banner currentPage={this.state.currentPage}></Banner>
          </header> : ""}
      
            <Switch>
              <Route exact path ="/">
                <Home getPage={this.getPage}/>
              </Route>
              <Route exact path ="/empower">
                <Empower getPage={this.getPage}/>
              </Route>
              <Route exact path ="/signin">
                <Signin getPage={this.getPage}/>
              </Route>
              <Route exact path ="/signup">
                <Signup getPage={this.getPage}/>
              </Route>
            </Switch>
          { this.state.currentPage === "/" || this.state.currentPage === "/empower" ? 
              <Footer></Footer> : null
          }
      </main>
      </Router>
    );
  }
}
