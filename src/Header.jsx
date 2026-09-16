import React from 'react';
import {Link} from 'react-router-dom';

// Import from the exact file targets to bypass Vite's module resolution errors:
import {Nav, NavItem} from 'react-bootstrap';

export default class Header extends React.Component {
  render() {
    return (
      <div>
{/*         <Nav bsStyle="tabs"> */}
{/*            */}{/* Use componentClass and pass the destination via the "to" prop */}
{/*           <NavItem eventKey={1} componentClass={Link} to="/"> */}
{/*             Home */}
{/*           </NavItem> */}
{/*           <NavItem eventKey={2} componentClass={Link} to="/login"> */}
{/*             LogIn */}
{/*           </NavItem> */}
{/*           <NavItem eventKey={3} componentClass={Link} to="/register"> */}
{/*             Register */}
{/*           </NavItem> */}
{/*         </Nav> */}
      </div>
    );
  }
}