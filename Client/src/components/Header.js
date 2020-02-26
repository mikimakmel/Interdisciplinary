import React from 'react';
import { Nav } from 'react-bootstrap';

class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {
        return(
            <Nav activeKey="/home" className="stickyHeader">
                <Nav.Item>
                    <Nav.Link className="headerLink" href="/home">Restart</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="headerLink" eventKey="Logout">Logout</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }
}

export default Header;
