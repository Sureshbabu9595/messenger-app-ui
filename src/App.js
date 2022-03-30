//import logo from './logo.svg'
import React from 'react'
import './App.css'
import axios from 'axios'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      emailAddress: "",
      emailContent: ""
    }
  }
  getDetails = () => {
    // Read message
    axios({
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      method: 'get',
      url: 'http://localhost:8080/messenger/getMessages',
    }).then(response => {
        // handle success
        console.log(response);
        this.setState({messages:response.data, emailAddress:"", emailContent:""});
      });
  };
  componentDidMount() {
    this.getDetails();
  }
  handleValueChange=(e)=> {
    console.log(e);
    this.setState({[e.target.name]: e.target.value});
  };
  saveDetails = (e) => {
    e.preventDefault();
    // Send a POST request
    axios({
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      method: 'post',
      url: 'http://localhost:8080/messenger/sendEmail',
      data: {
        emailAddress: this.state.emailAddress,
        emailContent: this.state.emailContent
      }
    }).then(response => {
      if(response.data.status === "SUCCESS") {
        // get messages call
        this.getDetails();
      }
    });
  };
  render() {
    return (
      <div className="App">
        <h1>
          <center>Message Board</center>
        </h1>
        <form className="needs-validation">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="emailAddress"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="name@example.com"
              required
              value={this.state.emailAddress}
              onChange={this.handleValueChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              Your Message
            </label>
            <textarea
              name="emailContent"
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              maxLength="500"
              required
              value={this.state.emailContent}
              onChange={this.handleValueChange}
            ></textarea>
          </div>
          <button className="btn btn-primary" onClick={this.saveDetails}>
            POST
          </button>
        </form>
        <h2>
          <center>Messages</center>
        </h2>
        {this.state.messages && this.state.messages.map((message) => (
          <>
            <div className="card">
              <div className="card-body">
                {message.emailAddress}
                <br />
                {message.emailContent}
              </div>
            </div>
            <br />
          </>
        ))}
      </div>
    )
  }
}
export default App
