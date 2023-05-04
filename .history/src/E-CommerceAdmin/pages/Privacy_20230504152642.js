import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
const Privacy = () => {
    const [modalShow, setModalShow] = React.useState(false);

    const [data, setData] = useState([]);
  
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          " https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/aboutUs    "
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
      const [image, setImage] = useState("");
  
      const postHandler = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.put(
            " https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/aboutUs/64524d038880634ec79c1b5c",
            {
              title : name, 
              content : image
            }
          );
          toast.success(data.message);
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
              Edit About Us
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={postHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
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
          <p className="headP">Dashboard / About Us</p>
  
          <section className="sectionCont">
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Updated At</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> {data?.data?.title} </td>
                    <td> {data?.data?.content} </td>
                    <td> {data?.data?.updatedAt?.slice(0, 10)} </td>
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
export default (Privacy)