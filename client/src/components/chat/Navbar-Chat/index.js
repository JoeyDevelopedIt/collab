import React, { Component } from 'react';
import fire from "../../../config/Fire";
import { Link } from "react-router-dom";
import { Nav, NavItem, Button, Navbar } from 'react-bootstrap';

import API from '../../../utils/API';
import Icon from "../Message-Icon/index";
class NavChat extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);

    }

    state = {
        uid: '',
        profiles: null
    };

    logout() {
        fire.auth().signOut();
    }

    componentDidMount() {
        const uid = localStorage.getItem("uid");

        this.fetchNotes(uid);
    }

    fetchNotes = (uid) => {
        API.getUser(uid)
        .then(res => {
            const profiles = res.data[0].profiles[0];

            if (profiles !== 0) {
                this.setState({ profiles });
            }
        });
    }

    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        {
                            this.state.profiles && 
                            <h1>
                                {this.state.profiles.firstName} 
                                {this.state.profiles.lastName}
                            </h1>
                        }
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem className="icon-style">
                            <Icon />
                        </NavItem>

                        <NavItem eventKey={1}>
                            <Link to="/home" className="goback">Go Back</Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavChat;