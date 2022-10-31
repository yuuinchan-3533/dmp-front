import React, { useState,useEffect } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Alert,
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  Progress,
  Badge,
  ListGroup,
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Table
} from 'reactstrap';
import { mock } from './mock'

import Widget from '../../components/Widget/Widget';

import { fetchPosts } from '../../actions/posts';
import s from './User.module.scss';
import { getAllUserInfo } from '../../api/fireStoreApi';

const User = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUserList() {
      const res = await getAllUserInfo();
      setUsers(res);
    }
    getUserList();

  }, []);

  function getUserRole(type){
    if(type===0){
      return "administrator";
    }
    if(type===1){
      return "developer";
    }
    if(type===2){
      return "leader";
    }
    if(type===3){
      return "operator"
    }
  }

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Users</BreadcrumbItem>
      </Breadcrumb>

      <Row>
        <Col sm={12} md={10}>
          <Widget>
            <h3>User <span className="fw-semi-bold">List</span></h3>
            <Table responsive borderless className={cx('mb-0', s.usersTable)}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {
                  (users || []).map(row =>
                    <tr key={1}>
                      <td>{row.uid}</td>
                      <td>{row.email}</td>
                      <td>{row.userType}</td>
                      <td>{getUserRole(row.userType)}</td>
                    </tr>,
                  )
                }
              </tbody>
              
            </Table>
            <Button color="primary" className="width-100 mb-xs mr-xs">

              <Link to="/app/users/add">Create</Link>
            </Button>
          </Widget>
        </Col>

      </Row>


    </div>
  );

}



export default User;
