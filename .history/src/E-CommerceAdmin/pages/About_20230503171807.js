/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const About = () => {
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
      const fd = new FormData();
      fd.append("name", name);
      fd.append("image", image);
      try {
        const { data } = await axios.post(
          " https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/categories",
          fd
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
            Add Categorys
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
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
                  <th>Image</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td> {data?.data?.imageUrl?.map((i , index) => (
                        <img src={i} alt='' key={index}  />
                    ))} </td>
                    <td> {data?.data?.title} </td>
                    <td> {data?.data?.content} </td>
                    <td> {data?.data?.updatedAt?.slice(0,10)} </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </section>
      </section>
    </>
  );
};

export default HOC(About);
