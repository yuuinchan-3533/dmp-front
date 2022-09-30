import React, { Component } from 'react';
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  ListGroup,
} from 'reactstrap';
import { Sparklines, SparklinesBars } from 'react-sparklines';
import cx from 'classnames';

import {
  getContainers,
  startContainer,
  stopContainer,
  killContainer,
  restartContainer,
  pauseContainer,
  resumeContainer,
  removeContainer,
  addContainer
} from '../../api/dockerContainerApi';

import Widget from '../../components/Widget';
import s from './Static.module.scss';

class Containers extends Component {

  

  constructor(props) {
    super(props);

    this.state = {
      
      checkboxes1: [false, true, false, false],
      checkboxes2: [false, false, false, false, false, false],
      checkboxes3: [false, false, false, false, false, false],

      containers:[],
      targetContainerId: ""

      
      
    };

    this.checkAll = this.checkAll.bind(this);

    this.componentDidMount = this.componentDidMount.bind(this);
    
  }

  componentDidMount(){
    
    async function setContainers(_this) {
      getContainers().then((res)=>{
        _this.setState({ containers: res });
      })
    }
    setContainers(this);
    
  }

  timeStampToDate(timeStamp){
    var date = new Date(timeStamp*1000);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds(); 
    return Y+M+D+h+m+s;
  }

  parseImageID(imageID){
    var ID=imageID.slice(7);
    return ID;
  }

  deleteDish = () => {
   
    const res = getContainers();
    alert("end"+JSON.stringify(res));
    if (!Array.isArray(res)){
      alert("no Array");
    }
    
    
  };

  parseDate(date) {
    this.dateSet = date.toDateString().split(' ');
    return `${date.toLocaleString('en-us', { month: 'long' })} ${this.dateSet[2]}, ${this.dateSet[3]}`;
  }

  parseIP(ports){
    if(ports.length<1){
      return "";
    }else{
      return ports[0].IP;
    }
  }

  parsePublicPort(ports){
    if(ports.length<1){
      return "";
    }else{
      return ports[0].PublicPort;
    }

  }

  parseContainerName(containerName) {
    var name=containerName.slice(1);
    return name;
  }

  checkAll(ev, checkbox) {
    const checkboxArr = (new Array(this.state[checkbox].length)).fill(ev.target.checked);
    this.setState({
      [checkbox]: checkboxArr,
    });
  }

  toSetTargetContainerId(ev,id){
    var newId=id.slice(0,12);
    alert(newId);
    this.setState(
      {
        targetContainerId:newId,
      }
    );
  }

  changeCheck(ev, checkbox, id) {
    const { checkboxes1, checkboxes2, checkboxes3 } = this.state;
    if(checkbox === "checkboxes1") {
      const checkedBox1 = checkboxes1[id] = ev.target.checked;
      this.setState({
        checkedBox1
      }) 
    } else if (checkbox === "checkboxes2") {
      const checkedBox2 = checkboxes2[id] = ev.target.checked;
      this.setState({
        checkedBox2,
      })      
    } else {
      const checkedBox3 = checkboxes3[id] = ev.target.checked;
      this.setState({
        checkedBox3
      })  
    }


    this.setState({
      [checkbox]: this.state[checkbox],
    });
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Containers</BreadcrumbItem>
        </Breadcrumb>

        
        
        <Row>
          

          <Col>
          <Widget>
              <h3>Container <span className="fw-semi-bold">List</span></h3>
              
              <div>
                <Button color="success" className="width-100 mb-xs mr-xs"
                onClick={() => startContainer(this.state.targetContainerId)}>Start</Button>
                <Button color="warning" className="width-100 mb-xs mr-xs" 
                onClick={() => stopContainer(this.state.targetContainerId)}>Stop</Button>
                <Button color="danger" className="width-100 mb-xs mr-xs"
                onClick={() => killContainer(this.state.targetContainerId)}>Kill</Button>
                <Button color="info" className="width-100 mb-xs mr-xs"
                onClick={() => restartContainer(this.state.targetContainerId)}>Restart</Button>
                <Button color="info" className="width-100 mb-xs mr-xs"
                onClick={() => pauseContainer(this.state.targetContainerId)}>Pause</Button>
                <Button color="info" className="width-100 mb-xs mr-xs"
                onClick={() => resumeContainer(this.state.targetContainerId)}>Resume</Button>
                <Button color="warning" className="width-100 mb-xs mr-xs"
                onClick={() => removeContainer(this.state.targetContainerId)}>Remove</Button>
                  
                <Button color="primary" className="width-100 mb-xs mr-xs">Add Container</Button>
                  
                  
              </div>
              <div className="widget-table-overflow">
                <Table className="table-striped table-lg mt-lg mb-0">
                  <thead>
                    <tr>
                      <th>
                        <div className="abc-checkbox">
                          <Input
                            id="checkbox20" type="checkbox" checked={this.state.checkboxes3[0]}
                            onChange={event => this.checkAll(event, 'checkboxes3')}
                          />
                          <Label for="checkbox20" />
                        </div>
                      </th>
                      <th>Name</th>
                      
                      <th>State</th>
                      
                      <th>Created</th>
                      <th>IP Adress</th>
                      <th>Published port</th>
                      <th>Ownership</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                  (this.state.containers||[]).map(row =>
                    <tr key={1}>
                      <td>  
                          <Input id="containerRadioCheck" type="radio" name="containerRadio"
                            onChange={event => this.toSetTargetContainerId(event,row.Id)}
                          />
                          
                      </td>
                      
                      <td>{this.parseContainerName(row.Names[0])}</td>
                      <td>{row.State}</td>
                      
                     
                      
                    
                      <td className="text-semi-muted">
                        {this.timeStampToDate(row.Created)}
                      </td>
                      <td>{this.parseIP(row.Ports)}</td>
                      <td>{this.parsePublicPort(row.Ports)}</td>
                      <td>{row.Labels.maintainer}</td>
                      <td className="text-semi-muted">
                        {row.Size}
                      </td>

                      
                      
                    </tr>,
                  )
                }
                </tbody>

                  
                </Table>
              </div>
            </Widget>
          </Col>
        </Row>
        
      </div>
    );
  }

}

export default Containers;
