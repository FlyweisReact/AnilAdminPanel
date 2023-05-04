/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";


const Terms = () => {
    const [modalShow, setModalShow] = React.useState(false);

    const [data, setData] = useState([]);
  
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          " https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/terms"
        );
        setData(data);
      } catch (e) {
        console.log("category err => ", e);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    function MyVerticallyCenteredModal(props) {
      const [name, setName] = useState("");
  
      const postHandler = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.put(
            "  https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/terms/64537db5a32a3bd3a36d88fa",
            {
              privacy: name,
            }
          );
          toast.success("Updated");
          console.log(data);
          fetchData();
          props.onHide();
        } catch (e) {
          console.log(e);
        }
      };
  
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
              Edit Privacy Policy
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={postHandler}>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Privacy Policy"
  
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  onChange={(e) => setName(e.target.value)}
                />
              </FloatingLabel>
              <Button
                style={{ backgroundColor: "#19376d", borderRadius: "0" }}
                type="submit"
              >
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
          <p className="headP">Dashboard / Terms & Condition </p>
  
          <section className="sectionCont">
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>Terms & Condition</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> {data?.content} </td>
                    <td>
                      <i
                        className="fa-solid fa-pen-to-square"
                        onClick={() => {
                          setModalShow(true);
                        }}
                      ></i>
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

export default HOC(Terms)