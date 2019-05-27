import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { withRouter } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem 
} from 'reactstrap';
import { NavLink as NLink } from 'react-router-dom'


class MainNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false
     }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  goBack = () => {
    console.log(this.props.history)
    this.props.history.go(-1)
  }
  render() { 
    return ( 
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={NLink} to="/">Street Art</NavbarBrand>
          <NavbarBrand  > <i onClick={this.goBack}  class="fas fa-undo"></i></NavbarBrand>
          {/* onClick={this.props.history.goBack()} */}
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink onClick={this.toggle} tag={NLink} to="/street-arts">List</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggle} tag={NLink} to="/map">Map</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggle} tag={NLink} to="/new-street-art">New Street Art</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggle} tag={NLink} to="/signup">Signup</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggle} tag={NLink} to="/login">Login</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
     );
  }
}



export default withRouter(MainNavBar);
