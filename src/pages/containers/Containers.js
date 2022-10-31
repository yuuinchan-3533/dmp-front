
import React, { useEffect, useState } from "react";

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
import { useAuth } from "../../context/AuthContext";

const Containers = (props) => {
  const { currentUser, logout } = useAuth()

  const [containers, setContainers] = useState([]);
  const [targetContainerId, setTargetContainerId] = useState("");
  const [displayButton, setDisplayButton] = useState("");



  useEffect(() => {
    async function getAllFood() {
      const res = await getContainers();
      setContainers(res);
    }
    getAllFood();
    

    async function setDisplay() {
      if (currentUser.type != 0) {
        setDisplayButton('none');
      }

    }
    setDisplay();
  }, [])




  function timeStampToDate(timeStamp) {
    var date = new Date(timeStamp * 1000);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
  }

  function parseImageID(imageID){
    var ID = imageID.slice(7);
    return ID;
  };

 

  function parseDate(date) {
    this.dateSet = date.toDateString().split(' ');
    return `${date.toLocaleString('en-us', { month: 'long' })} ${this.dateSet[2]}, ${this.dateSet[3]}`;
  }

  function parseIP(ports){
    if (ports.length < 1) {
      return "";
    } else {
      return ports[0].IP;
    }
  }
  function parseContainer(c){
    alert(JSON.stringify(c));
  }

  function parsePublicPort(ports){
    if (ports.length < 1) {
      return "";
    } else {
      return ports[0].PublicPort;
    }

  }

  function parseContainerName(containerName) {
    var name = containerName.slice(1);
    return name;
  }

  function checkAll(ev, checkbox) {
    const checkboxArr = (new Array(this.state[checkbox].length)).fill(ev.target.checked);
    this.setState({
      [checkbox]: checkboxArr,
    });
  }

  function toSetTargetContainerId(ev, id){
    var newId = id.slice(0, 12);
    
    setTargetContainerId(newId);
  }

  

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

            <div style={{ display: displayButton }}>
              <Button color="success" className="width-100 mb-xs mr-xs"
                onClick={() => startContainer(targetContainerId)}>Start</Button>
              <Button color="warning" className="width-100 mb-xs mr-xs"
                onClick={() => stopContainer(targetContainerId)}>Stop</Button>
              <Button color="danger" className="width-100 mb-xs mr-xs"
                onClick={() => killContainer(targetContainerId)}>Kill</Button>
              <Button color="info" className="width-100 mb-xs mr-xs"
                onClick={() => restartContainer(targetContainerId)}>Restart</Button>
              <Button color="info" className="width-100 mb-xs mr-xs"
                onClick={() => pauseContainer(targetContainerId)}>Pause</Button>
              <Button color="info" className="width-100 mb-xs mr-xs"
                onClick={() => resumeContainer(targetContainerId)}>Resume</Button>
              <Button color="warning" className="width-100 mb-xs mr-xs"
                onClick={() => removeContainer(targetContainerId)}>Remove</Button>

              <Button color="primary" className="width-100 mb-xs mr-xs">Add Container</Button>


            </div>
            <div className="widget-table-overflow">
              <Table className="table-striped table-lg mt-lg mb-0">
                <thead>
                  <tr>
                    <th>Choose</th>
                    <th>Name</th>

                    <th>State</th>

                    <th>Created</th>
                    <th>IP Adress</th>
                    <th>Published port</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    (containers || []).map(row =>
                      <tr key={1}>
                        <td>
                          <Input id="containerRadioCheck" type="radio" name="containerRadio"
                            onChange={event => toSetTargetContainerId(event, row.Id)}
                          />

                        </td>

                        <td>{parseContainerName(row.Names[0])}</td>
                        <td>{row.State}</td>




                        <td className="text-semi-muted">
                          {timeStampToDate(row.Created)}
                        </td>
                        <td>{parseIP(row.Ports)}</td>
                        <td>{parsePublicPort(row.Ports)}</td>
                        
                        
                        <td>{row.Image}</td>



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

export default Containers;
