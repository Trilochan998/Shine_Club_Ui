import React from 'react';
import { NavLink as BootstrapNavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomNavLink = ({ to, children, ...rest }) => (
  <BootstrapNavLink as={Link} to={to} {...rest}>
    {children}
  </BootstrapNavLink>
);

export default CustomNavLink;
