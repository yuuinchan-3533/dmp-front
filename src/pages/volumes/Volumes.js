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
import {withRouter, Link} from 'react-router-dom';



import {
  getVolumes,
  removeVolume
} from '../../api/dockerVolumeApi';

import Widget from '../../components/Widget/Widget';
import s from './Static.module.scss';

class Volumes extends Component {

  

  constructor(props) {
    super(props);

    this.state = {
      volumes:[],
      volumeId:""
    };

    this.checkAll = this.checkAll.bind(this);

    this.componentDidMount = this.componentDidMount.bind(this);
    
  }

  componentDidMount(){
    
    async function setContainers(_this) {
      getVolumes().then((res)=>{
        _this.setState({ volumes: res });
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

  parseVolumeName(volumeName){
    var name=volumeName.slice(0,12);
    return name;
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

  toSetTargetVolumeId(ev,id){
    
    
    this.setState(
      {
        volumeId:id,
      }
    );
  }

  

  render() {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Volumes</BreadcrumbItem>
        </Breadcrumb>

        
        
        <Row>
          

          <Col>
          <Widget>
              <h3>Volume <span className="fw-semi-bold">List</span></h3>
              
              <div>
                
                <Button color="warning" className="width-100 mb-xs mr-xs"
                onClick={() => removeVolume(this.state.volumeId)}>Remove</Button>
                  
                <Button color="primary" className="width-100 mb-xs mr-xs">
                  
                  <Link to="/app/volumes/add">Add Volume</Link>
                </Button>
                  
                  
              </div>
              <div className="widget-table-overflow">
                <Table className="table-striped table-lg mt-lg mb-0">
                  <thead>
                    <tr>
                      <th>
                        
                      </th>
                      <th>Name</th>
                      
                      <th>Driver</th>
                      <th>Mount Point</th>
                      <th>Created</th>
                      <th>Ownership</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                  (this.state.volumes||[]).map(row =>
                    <tr key={1}>
                      <td>  
                          <Input id="volumeRadioCheck" type="radio" name="volumeRadio"
                            onChange={event => this.toSetTargetVolumeId(event,row.Name)}
                          />
                      </td>
                      
                      <td>{this.parseVolumeName(row.Name)}</td>
                      
                      <td>{row.Driver}</td>
                      
                      <td>{row.Mountpoint}</td>
                      <td>{row.CreatedAt}</td>
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

export default Volumes;
