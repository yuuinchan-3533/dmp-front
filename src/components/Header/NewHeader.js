/**
 * Flatlogic Dashboards (https://flatlogic.com/admin-dashboards)
 *
 * Copyright © 2015-present Flatlogic, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

 import { connect } from 'react-redux';
 import cx from 'classnames';
 import React, { useState,useEffect } from "react";
 import PropTypes from 'prop-types';
 import {
   Navbar,
   Nav,
   NavItem,
   Button,
   Dropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
   Input,
   InputGroup,
   InputGroupAddon,
 } from 'reactstrap';
 import { NavLink } from 'react-router-dom';
 
 import Icon from '../Icon';
 
 import photo from '../../images/photo.jpg';
 import { logoutUser } from '../../actions/user';
 import { useAuth } from '../../context/AuthContext';
 import s from './Header.module.scss';
 import{
   parseUser
 } from '../../api/firebaseAuthApi';
 


 export default function NewHeader(props){
  
  const { currentUser, logout } = useAuth()
  
  const [isOpen, setIsOpen] = useState(false);
   const propTypes = {
     sidebarToggle: PropTypes.func,
     dispatch: PropTypes.func.isRequired,
   };
 
   
 
   const defaultProps = {
     sidebarToggle: () => {},
   };
 
   
 
   const toggleDropdown = () => {
     setIsOpen(!isOpen);
   }
 
   const doLogout = () => {
     this.props.dispatch(logoutUser());
   }
 
   
 
   
 
   
     return (
       <Navbar className={s.root}>
         <Nav>
           <NavItem
             className={cx('visible-xs mr-4 d-sm-up-none', s.headerIcon, s.sidebarToggler)}
             href="#"
             onClick={props.sidebarToggle}
           >
             <i className="fa fa-bars fa-2x text-muted" />
           </NavItem>
           <NavItem>
             <InputGroup>
               <Input placeholder="Search for..." />
               <InputGroupAddon addonType="append" className="px-2">
                 <i className="fa fa-search" />
               </InputGroupAddon>
             </InputGroup>
           </NavItem>
         </Nav>
         <Nav className="ml-auto">
           
           <Dropdown isOpen={isOpen} toggle={toggleDropdown}>
             <DropdownToggle nav>
               <img className={cx('rounded-circle mr-sm', s.adminPhoto)} src={photo} alt="administrator" />
               <span className="text-body">{currentUser.email}</span>
               <i className={cx('fa fa-angle-down ml-sm', s.arrow, {[s.arrowActive]: isOpen})} />
             </DropdownToggle>
             <DropdownMenu style={{width: '100%'}}>
               <DropdownItem>
                 <NavLink to="/app/posts">Posts</NavLink>
               </DropdownItem>
               <DropdownItem>
                 <NavLink to="/app/profile">Profile</NavLink>
               </DropdownItem>
               <DropdownItem >
               <NavLink to="/login">Logout</NavLink>
               </DropdownItem>
             </DropdownMenu>
           </Dropdown>
         </Nav>
       </Navbar>
     );
   
 }
 
 function mapStateToProps(state) {
   return {
     init: state.runtime.initialNow,
   };
 }

 