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
    Breadcrumb,
    BreadcrumbItem,
    Badge,
    FormText,
    Form,
    FormGroup,
} from 'reactstrap';
import { Sparklines, SparklinesBars } from 'react-sparklines';
import cx from 'classnames';

import {
    getContainers,

    removeContainer,
    addContainer
} from '../../api/dockerContainerApi';

import {
    createVolume
} from '../../api/dockerVolumeApi';

import Widget from '../../components/Widget/Widget';
import s from './Static.module.scss';

class Volume extends Component {



    constructor(props) {
        super(props);

        this.state = {
            volumeName:'',
            volumeType:"nfs",
            driverType:"local",
        };


       
        this.handleVolumeTypeChange = this.handleVolumeTypeChange.bind(this);
        this.handleVolumeNameChange = this.handleVolumeNameChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

    }

   

    

    handleVolumeTypeChange(e) {
        alert(e.target.value);
        this.setState({ volumeType: e.target.value });
    }
    handleVolumeNameChange(e){
        alert(e.target.value);
        this.setState(
            {
                volumeName: e.target.value
            },
            ()=>{
                alert("state"+this.state.volumeName);
            }
            );
        
    }

    

    parseVolumeName(imageID) {
        var ID = imageID.slice(0, 12);
        return ID;
    }

    

    parseDate(date) {
        this.dateSet = date.toDateString().split(' ');
        return `${date.toLocaleString('en-us', { month: 'long' })} ${this.dateSet[2]}, ${this.dateSet[3]}`;
    }

   
    handleSubmit = (e) => {
        e.preventDefault()
        var data = new Object();
        var driverOpts = new Object();

        data.Name=this.state.volumeName;
        
        data.Driver=this.state.driverType;

        driverOpts.type=this.state.volumeType; 
        data.DriverOpts=driverOpts;

        alert(JSON.stringify(data));
        createVolume(data);
        this.props.history.goBack();
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
                            <h3>Add <span className="fw-semi-bold">Volume</span></h3>

                            <Form onSubmit={(e) => this.handleSubmit(e)}>


                                <FormGroup>
                                    <Label for="volumeName">
                                        Name
                                    </Label>
                                    <Input
                                        id="volumeName"
                                        name="name"
                                        placeholder="volume name"
                                        type="name"
                                        value={this.state.volumeName}
                                        onChange={this.handleVolumeNameChange}
                                    />
                                </FormGroup>
                                
                                <FormGroup>
                                    <Label for="exampleSelect">
                                        Driver Type
                                    </Label>
                                    <Input
                                        id="driverTypeSelect"
                                        name="select"
                                        value={this.state.driverType}
                                        type="select"
                                    >
                                        <option>
                                            Local
                                        </option>
                                        
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="volumeTypeSelect">
                                        Volume Type
                                    </Label>
                                    <Input
                                        id="volumnTypeSelect"
                                        name="select"
                                        type="select"
                                        value={this.state.volumeType}
                                        onChange={this.handleVolumeTypeChange}
                                    >
                                        <option value="nfs">
                                            Use NFS Volume
                                        </option>
                                        <option value="cifs">
                                            Use CIFS Volume
                                        </option>
                                    </Input>
                                </FormGroup>
                                
                                <Button >
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Submit
                                </Button>
                                
                            </Form>


                        </Widget>
                    </Col>
                </Row>

            </div>
        );
    }

}

export default Volume;
