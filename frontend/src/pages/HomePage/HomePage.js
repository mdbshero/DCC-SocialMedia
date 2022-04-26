import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./HomePage.css";


export default class FormSubmission extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: ""
    }
  }

  handleInputChanged(event) {
    this.setState({
      searchQuery: event.target.value
    });
  }

  handleButtonClicked() {
    let searchQuery = this.state.searchQuery;

    window.location.href = "https://youtube.com/results?search_query" + searchQuery;
  }

  render() {
    return  (
      <div>
         <body>
            <nav class="navbar">
                <div class="max-width">
                    <ul class="menu">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Profile</a></li>
                        <li><a href="#">Friends</a></li>
                        <li><a href="#">Posts</a></li>
                    </ul>
                </div>
            </nav>
         </body>
          <label for="example">What's on your mind?</label>
            <input type="text" value={this.state.searchQuery} onChange={this.handleInputChanged.bind(this)}/>
          <button onClick={this.handleButtonClicked.bind(this)}>Submit</button>
      </div>
    );
  }
}
