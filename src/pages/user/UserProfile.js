import React, {PureComponent} from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';

import{
  createUser
} from '../../api/firebaseAuthApi';

import Widget from '../../components/Widget';

import s from './Profile.module.scss';

class UserProfile extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
        email:'',
        password:'',
        isPasswordSame:false,
    };


   
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.checkSamePassword=this.checkSamePassword.bind(this);
    this.onSubmit=this.onSubmit.bind(this);

}

  onSubmit(e) { 
    e.preventDefault();
    if(this.state.isPasswordSame===false){
      alert("两次密码不同")
    }
    createUser(this.state.email,this.state.password).then(
      (res)=>{
        alert(JSON.stringify(res.uid))
        if(res.user !== undefined){
          alert("hello"+JSON.stringify(res.user));
        }
        
      }
    );
    
  }

  handleEmailChange(e) {
    
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
   
    this.setState({ password: e.target.value });
  }

  checkSamePassword(e){
    
    if(e.target.value === this.state.password){
      alert("passwod is same");
      this.setState({ isPasswordSame: true });
    }
  }

  render() {
    return (
      <div className={s.root}>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Profile</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">Profile</h1>
        <Row>
          <Col sm={6}>
            <Widget
              title={
                <h5>
                  Edit Profile <span className="fw-semi-bold">Form</span>
                </h5>
              }
            >
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="input-email">Email</Label>
                  <Input 
                  bsSize="lg" 
                  type="email" 
                  name="email" 
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  id="input-email"/>
                </FormGroup>
                <FormGroup>
                  <Label for="input-password">Password</Label>
                  <Input 
                  bsSize="lg" 
                  type="password" 
                  name="password" 
                  id="input-password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="input-password">Reinput-Password</Label>
                  <Input 
                  bsSize="lg" 
                  type="password" 
                  name="repassword" 
                  id="reinput-password"
                  onChange={this.checkSamePassword}
                  />
                </FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  
                  <ButtonGroup className="pull-right">
                    <Button className="ml-sm" color="default">Cancel</Button>
                    <Button color="danger">Save</Button>
                  </ButtonGroup>
                </div>
              </Form>
            </Widget>
          </Col>
        </Row>
      </div>
    )
  }
}

export default UserProfile;
