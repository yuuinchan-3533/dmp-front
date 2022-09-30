import { useEffect } from "react"
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
  } from 'reactstrap';

const ImageManagementPage = (props) =>{
    useEffect(()=>{
        async function getAllImage(){
            const res =  await getImages();
            setCurrentImages(res);
        }
        getAllImage();
    },[])
}
return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Tables Basic</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="page-title mb-lg">Tables - <span className="fw-semi-bold">Basic</span></h1>
      <Row>
        <Col sm={12}>
          <Widget
            title={<h5>
              Table <span className="fw-semi-bold">Styles</span>
            </h5>} settings close
          >
            <Table borderless className={s.mainTable}>
              <thead>
                <tr>
                  <th className="hidden-sm-down">#</th>
                  <th>Picture</th>
                  <th>Description</th>
                  <th className="hidden-sm-down">Info</th>
                  <th className="hidden-sm-down">Date</th>
                  <th className="hidden-sm-down">Size</th>
                  <th />
                </tr>
              </thead>
              <tbody>
              
                {
                  
                this.state.tableStyles.map((row,idx) =>
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>
                      <img className="img-rounded" src={row.picture} alt="" height="60" />
                    </td>
                    <td>
                      {row.description}
                      {row.label &&
                      <div>
                        <Badge color={row.label.colorClass}>{row.label.text}</Badge>
                      </div>
                      }
                    </td>
                    <td>
                      <p className="mb-0">
                        <small>
                          <span className="fw-semi-bold">Type:</span>
                          <span className="text-muted">&nbsp; {row.info.type}</span>
                        </small>
                      </p>
                      <p>
                        <small>
                          <span className="fw-semi-bold">Dimensions:</span>
                          <span className="text-muted">&nbsp; {row.info.dimensions}</span>
                        </small>
                      </p>
                    </td>
                    <td className="text-semi-muted">
                      {this.parseDate(row.date)}
                    </td>
                    <td className="text-semi-muted">
                      {row.size}
                    </td>
                    <td className="width-150">
                      <Progress
                        style={{height: '7px'}}
                        color="success" value={row.progress.percent}
                        className="progress-sm mb-xs rounded mt-xs"
                      />
                    </td>
                  </tr>,
                )
              }
              </tbody>
            </Table>
            <div className="clearfix">
              <div className="float-right">
                <Button color="danger" className="mr-xs" size="sm">Send to...</Button>
                <UncontrolledButtonDropdown>
                  <DropdownToggle color="default" className="mr-xs" size="sm" caret>Clear</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Clear</DropdownItem>
                    <DropdownItem>Move ...</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Separated link</DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
              <p>Basic table with styled content</p>
            </div>
          </Widget>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Widget
            title={<h5>Table <span className="fw-semi-bold">Styles</span></h5>} settings close
          >
            
            <br /><br />
            <h3>Hover <span className="fw-semi-bold">Table</span></h3>
            <p>{'Trace only what\'s really important. '}<code>.table-hover</code> is made for it.</p>
            <div className="table-responsive">
            <div className="clearfix">
              <div className="float-left">
                <Button color="danger" className="mr-xs" size="sm">Send to...</Button>
                <Button color="default" className="width-100 mb-xs mr-xs" onClick={() => this.deleteDish()}>Default</Button>
                <UncontrolledButtonDropdown>
                  <DropdownToggle color="default" className="mr-xs" size="sm" caret>Clear</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Clear</DropdownItem>
                    <DropdownItem>Move ...</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Separated link</DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
              <p>Basic table with styled content</p>
            </div>
              <Table className="table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>IMAGE ID</th>
                    <th>REPOSITORY</th>
                    <th>TAG</th>
                    <th>CREATED</th>
                  </tr>
                </thead>
                {/* eslint-disable */}
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td><a href="#">ottoto@example.com</a></td>
                    <td><Badge color="gray" className="text-gray-light" pill>Pending</Badge></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td><a href="#">fat.thor@example.com</a></td>
                    <td><Badge color="gray" className="text-gray-light" pill>Unconfirmed</Badge></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td><a href="#">larry@example.com</a></td>
                    <td><Badge color="gray" className="text-gray-light" pill>New</Badge></td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Peter</td>
                    <td>Horadnia</td>
                    <td><a href="#">peter@example.com</a></td>
                    <td><Badge color="gray" className="text-gray-light" pill>Active</Badge></td>
                  </tr>
                </tbody>
                {/* eslint-enable */}
              </Table>
            </div>
          </Widget>
        </Col>
      </Row>
    </div>
  );
}