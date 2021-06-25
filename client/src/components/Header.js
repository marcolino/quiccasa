import React, { useState } from 'react';
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
  // DropdownItem,
} from 'reactstrap';

const headers = {
  left: [
    {
      label: "Searches",
      href: "/searches",
    },
    {
      label: "News",
      href: "/news",
    },
    {
      label: "Blog",
      href: "/blog",
    },
  ],
  right: [
    {
      label: "Sign In",
      href: "/signin",
    },
    {
      label: "Sign Up",
      href: "/signup",
    },
  ]
};

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const logo = "../logo40.png";

  return (
    <div>
      <Navbar color="warning" light expand="md">
        <NavbarBrand href="/">
          <img src={logo} alt="brand logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {headers.left.map((obj, index) => (
              <NavItem key={index}>
                <NavLink href={obj.href}>{obj.label}</NavLink>
              </NavItem>
            ))}
            {/*
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            */}
          </Nav>
          <Nav className="ml-auto">
            {headers.right.map((obj, index) => (
              <NavItem key={index}>
                <NavLink href={obj.href}>{obj.label}</NavLink>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
  
export default Header;
