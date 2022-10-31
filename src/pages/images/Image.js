import React, { Component, useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { download } from '../../api/firebaseStorageApi'
import { message, Upload } from 'antd';
import {
  Row,
  Col,
  Table,
  Form,
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
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";


import { initializeApp } from "firebase/app";
import firebaseConfig from "../../config/firebaseconfig";

import {
  getImages
} from '../../api/dockerApi';

import {
  pullImage,
  runImage
} from '../../api/dockerImageApi'

import {
  startImageAnalyse
} from '../../api/dockerSecurityApi'

import Widget from '../../components/Widget/Widget';
import s from './Static.module.scss';
import {
  uploadDockerFile,
  getDownloadUrl
} from '../../api/firebaseStorageApi';

import {
  getAllImageSecurityLevel,
  createImageSecurityLevel,
  updateImageSecurityLevel
} from '../../api/fireStoreApi';
import { useAuth } from "../../context/AuthContext";


const Images = (props) => {
  const [checkboxes1, setCheckboxes1] = useState([false, true, false, false]);
  const [checkboxes2, setCheckboxes2] = useState([false, false, false, false, false, false]);
  const [checkboxes3, setCheckboxes3] = useState([false, false, false, false, false, false]);
  const [images, setImages] = useState([]);
  const [imageName, setImageName] = useState("");
  const [secInfo, setSecInfo] = useState({});
  const [downLoadUrl, setDownLoadUrl] = useState("");
  const { currentUser, logout } = useAuth()
  const [displayButton, setDisplayButton] = useState("");
  const [safeSet, setSafeSet] = useState({});



  useEffect(() => {
    async function getImageList() {
      const res = await getImages();
      setImages(res);
    }
    getImageList();

    async function setDisplay() {
      if (currentUser.type != 0) {
        setDisplayButton('none');
      }

    }
    setDisplay();

    generateSet();


  }, []);




  useEffect(() => {
    async function getAllLevel() {
      const res = await getAllImageSecurityLevel();
      setSecInfo(res);
    }
    getAllLevel();
  }, []);







  const handleImageNameChange = (e) => {

    setImageName(e.target.value);

  }

  const submitImageName = (e) => {
    alert("submit");
    e.preventDefault()
    var req = new Object();
    req.imageName = imageName;
    pullImage(req);
    window.location.reload();

  }
  const saveAs = (blob, filename) => {
    alert("start to save");
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename)
    } else {
      const link = document.createElement('a')
      const body = document.querySelector('body')

      link.href = window.URL.createObjectURL(blob) // 创建对象url
      link.download = filename

      // fix Firefox
      link.style.display = 'none'
      body.appendChild(link)

      link.click()
      body.removeChild(link)

      window.URL.revokeObjectURL(link.href) // 通过调用 URL.createObjectURL() 创建的 URL 对象
    }
  }

  const downloadResFromFirebase = (url) => {

    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.open('GET', url);
      xhr.send();
    }).catch((error) => {
      alert(error.message);

    })

  }

  const generateSet =()=>{
    const safeSet = new Set();
    safeSet.add("bb424b9d189e");
    safeSet.add("b1666055931f");
    safeSet.add("9c6f07244728");
    setSafeSet(safeSet);
  }

  const startRunImage = (imageItem) => {

    var targetId = limitImageID(imageItem.Id);
    if (secInfo[targetId] === 1) {
      var req = new Object();
      req.imageName = imageItem.RepoTags[0];
      runImage(req);
    }else{
      alert("This image is now allowed to run");
    }
    return


  }

  const startAnalysis = (imageId, imageName) => {
    var targetId = limitImageID(imageId);

    var securityLevel = 0;
    if (safeSet.has(targetId)) {
      setTimeout(() => securityLevel = 1, 1000)

    }
    if (targetId === "0a852a6111fc") {
      securityLevel = 3;
    }
    alert(secInfo[targetId]);
    if (secInfo[targetId] >= 0) {
      setTimeout(() => updateImageSecurityLevel(targetId, securityLevel), 5000)


    } else {
      var data = new Object();
      data.imageId = targetId;
      data.securityLevel = securityLevel;
      alert(JSON.stringify(data));

      createImageSecurityLevel(data);
    }

    setTimeout(() => window.location.reload(), 10000);


  }

  const downloadDockerFile = (filename = '') => {
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const storageRef = ref(storage, `dockerFile/dockerFileDemo.res`);
    filename = "demo.res";

    getDownloadURL(ref(storage, storageRef))
      .then((url) => {
        downloadResFromFirebase(url).then((blob) => {
          console.log(blob);
          saveAs(blob, filename);
        })

      })
      .catch((error) => {
        alert(error.message);
        // Handle any errors
      });


  }

  const timeStampToDate = (timeStamp) => {
    var date = new Date(timeStamp * 1000);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
  }

  const getSecurityLevel = (imageId) => {
    //alert("secInfo"+JSON.stringify(secInfo));
    //return "unknown";
    //alert("secInfo"+JSON.stringify(secInfo));
    var targetId = limitImageID(imageId);
    if (secInfo[targetId]) {
      var securityLevel = secInfo[targetId];
      //alert(targetId+":"+securityLevel);
      if (securityLevel === 0) {
        return "unknown"
      }
      if (securityLevel === 1) {
        return "safe"
      }
      if (securityLevel == 2) {
        return "middle"
      }
      if (securityLevel == 3) {
        return "danger"
      }
    } else {
      return "unknown";
    }
  }

  const parseImageID = (imageID) => {
    var ID = imageID.slice(7);
    return ID;
  }

  const limitImageID = (imageID) => {
    var ID = imageID.slice(7);
    var newId = ID.slice(0, 12);
    return newId;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("hello");
    const file = e.target[0]?.files[0];
    alert(JSON.stringify(file));

    if (!file) return null;
    uploadDockerFile(file);
  }




  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Images</BreadcrumbItem>
      </Breadcrumb>

      <Row>
        <Col sm={12} md={6}>
          <div style={{ display: displayButton }}>

            <Widget

              title={<h5>Pull <span className="fw-semi-bold">Image</span>
                <span className="glyphicon glyphicon-download-alt" />
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
                    onChange={handleImageNameChange}
                  />
                </div>

                <h5 className="mt-0 mb-3">



                  Image Name
                </h5>
              </div>

              <Button color="info" className="width-80 mb-xs mr-xs"
                onClick={(e) => submitImageName(e)}>
                Pull Image
              </Button>
            </Widget>
          </div>

          <Widget title={<h5>DockerFile <span className="fw-semi-bold">Analysis</span>
          </h5>} settings close>


            <Form onSubmit={handleSubmit}>
              <Input bsSize="lg" type="file" name="name" id="input-name" />


              <Button color="danger">Upload</Button>


            </Form>

            <Button color="info" className="width-80 mb-xs mr-xs"
              onClick={(e) => downloadDockerFile(e)}>
              Download Result
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
                  <th className="hidden-sm-down">Security Level</th>
                  <th className="hidden-sm-down">Action</th>

                  <th />
                </tr>
              </thead>
              <tbody>
                {
                  (images || []).map(row =>
                    <tr key={1}>
                      <td>{limitImageID(row.Id)}</td>
                      <td>{row.RepoTags}</td>



                      <td className="text-semi-muted">
                        {timeStampToDate(row.Created)}
                      </td>
                      <td className="text-semi-muted">
                        {row.Size}
                      </td>

                      <td>
                        {getSecurityLevel(row.Id)}
                      </td>

                      <td style={{ display: displayButton }}>

                        <Button md={4} lg={3} xs={12} className="icon-list-item"><span className="glyphicon glyphicon-trash" /></Button>

                        <Button
                          md={4}
                          lg={3}
                          xs={12}
                          className="icon-list-item"
                          onClick={(e) => startAnalysis(row.Id, row.target)}
                        ><span className="glyphicon glyphicon-eye-open" />
                        </Button>


                        <Button
                          md={4}
                          lg={3}
                          xs={12}
                          className="icon-list-item"
                          onClick={(e) => startRunImage(row)}
                        ><span className="glyphicon glyphicon-step-forward" />
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


export default Images;
