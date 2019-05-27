import React, { Component } from 'react';
import api from '../../api';
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';



export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      message: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    api.login(this.state.email, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div  className="login">
        <h2 className="loginHead">Login</h2>
        <form>
          email: <input type="text" value={this.state.email} name="email" onChange={this.handleInputChange} /> <br />
          Password: <input type="password" value={this.state.password} name="password" onChange={this.handleInputChange} /> <br />
          {/* <button onClick={(e) => this.handleClick(e)}>Login</button> */}
          <Button  
            color="danger"
            className="btnM" 
            onClick={(e) => this.handleClick(e)}
            >  
              Login

          </Button>
        </form>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
    );
  }
}
