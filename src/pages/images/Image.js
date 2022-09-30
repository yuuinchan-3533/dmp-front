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
  getContainers
} from '../../api/dockerApi';

import {
  pullImage
} from '../../api/dockerImageApi'

import Widget from '../../components/Widget/Widget';
import s from './Static.module.scss';

class Image extends Component {

  

  constructor(props) {
    super(props);

    this.state = {
      
      checkboxes1: [false, true, false, false],
      checkboxes2: [false, false, false, false, false, false],
      checkboxes3: [false, false, false, false, false, false],

      images:[],
      imageName:""
      
      
    };

    this.checkAll = this.checkAll.bind(this);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleImageNameChange = this.handleImageNameChange.bind(this);
    
  }

  componentDidMount(){
    
    async function setImages(_this) {
      getContainers().then((res)=>{
        _this.setState({ images: res });
      })
    }
    setImages(this);
  }

  handleImageNameChange(e){
    alert(e.target.value);
    this.setState({ imageName: e.target.value });
  }

  submitImageName= (e) => {
    alert("submit");
    e.preventDefault()
    var req = new Object();
    req.imageName=this.state.imageName;
    pullImage(req);
    window.location.reload();
    
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

  limitImageID(imageID){
    var ID=imageID.slice(7);
    var newId=ID.slice(0,12);
    return newId;
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

  checkAll(ev, checkbox) {
    const checkboxArr = (new Array(this.state[checkbox].length)).fill(ev.target.checked);
    this.setState({
      [checkbox]: checkboxArr,
    });
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
          <BreadcrumbItem active>Images</BreadcrumbItem>
        </Breadcrumb>

        <Row>
          <Col sm={12} md={6}>
          
          <Widget
              
              title={<h5>Pull <span className="fw-semi-bold">Image</span> <span className="glyphicon glyphicon-download-alt" />
              </h5>} settings close
            >
           
              
              <div>
                
                <div className="pull-right mt-n-s">
                  <select value={"dockerHub"}>
                    <option value="dockerHub">dockerHub</option>
                  </select>
                  </div>

                  <h5 className="mt-0 mb-3">Choose Registry</h5>

               
              </div>

              <div>
                  <div className="pull-right mt-n-xs">
                    <Input
                      type="search"
                      placeholder="e.g.myImage:myTage"
                      className="form-control input-sm"
                      onChange={this.handleImageNameChange}
                    />
                  </div>

                  <h5 className="mt-0 mb-3">
                  
                  
            
                    Image Name
                  </h5>
                </div>

                <Button color="info" className="width-80 mb-xs mr-xs" 
                 onClick={(e) => this.submitImageName(e)}>
                  Pull Image
                  </Button>
            </Widget>
          
          </Col>
          
        </Row>
        
        <Row>
          <Col sm={12}>
            <Widget
              title={<h3>Image <span className="fw-semi-bold">List</span>
              </h3>} settings close
            >
             
              <Table borderless className={s.mainTable}>
                <thead>
                  <tr>
                    <th className="hidden-sm-down">ImageID</th>
                    
          
                    <th className="hidden-sm-down">Tags</th>
                    <th className="hidden-sm-down">Date</th>
                    <th className="hidden-sm-down">Size</th>
                    <th className="hidden-sm-down">Action</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {
                  (this.state.images||[]).map(row =>
                    <tr key={1}>
                      <td>{this.limitImageID(row.Id)}</td>
                      <td>{row.RepoTags}</td>
                     
                      
                    
                      <td className="text-semi-muted">
                        {this.timeStampToDate(row.Created)}
                      </td>
                      <td className="text-semi-muted">
                        {row.Size}
                      </td>

                      <td>
                      <Button color="default" className="width-100 mr-xs">
                      <i className="glyphicon glyphicon-trash" />
                      </Button>
                      <Button color="default" className="width-100 mr-xs">
                      <i className="glyphicon glyphicon-eye-open" />
                      </Button>
                     
                      </td>
                      
                    </tr>,
                  )
                }
                </tbody>
              </Table>
              
              
            </Widget>
          </Col>
        </Row>
        
      </div>
    );
  }

}

export default Image;
