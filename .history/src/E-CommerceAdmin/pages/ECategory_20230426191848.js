/** @format */

import React from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button, Badge } from "react-bootstrap";

const ECategory = () => {
  const [modalShow, setModalShow] = React.useState(false);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            Add Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Visibility</Form.Label>
              <Form.Select aria-label="Default select example" required>
                <option>-- Select --</option>
                <option>Hidden</option>
                <option>Visible</option>
              </Form.Select>
            </Form.Group>

            <Button style={{ backgroundColor: "#19376d", borderRadius: "0" }} type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <p className="headP">Dashboard / Category</p>
        <div
          className="pb-4 sticky top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Category's
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Category
          </button>
        </div>

        <section className="sectionCont">
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input type="search" placeholder="Start typing to search" />
          </div>

          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>Name</th>
                  <th>Visibilty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <td>#1</td>
                  <td>
                  <span className="flexCont">
                      <img src='https://img.staticmb.com/mbcontent/images/uploads/2022/11/importance-for-vastu-for-home.jpg' alt="" />
                      <p> Demo</p>
                    </span>
                
                  </td>
                  <td>
                    <Badge bg='secondary' >Hidden</Badge>
                  </td>
                  <td>  <span className="flexCont">
                     
                     <i
                       className="fa-solid fa-pen-to-square "

                       onClick={() => {
                         setModalShow(true);
                       }}
                     ></i>
                     <i
                       className="fa-sharp fa-solid fa-trash "
                     ></i>
                   </span>
                  </td>
                </tr>
                <tr>
                <td>#2</td>
                  <td>
                  <span className="flexCont">
                      <img src='https://img.staticmb.com/mbcontent/images/uploads/2022/11/importance-for-vastu-for-home.jpg' alt="" />
                      <p> Demo</p>
                    </span>
                
                  </td>
                  <td>
                    <Badge bg='success' >Visible</Badge>
                  </td>
                  <td>
                  <span className="flexCont">
                     
                      <i
                        class="fa-solid fa-pen-to-square"
                        onClick={() => {
                          setModalShow(true);
                        }}
                      ></i>
                      <i
                        class="fa-sharp fa-solid fa-trash"
                      ></i>
                    </span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </section>
      </section>
    </>
  );
};

export default HOC(ECategory);
