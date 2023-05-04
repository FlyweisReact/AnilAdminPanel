import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import HOC from "../layout/HOC";

const PushNotification = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [ data , setData ] = useState([])


    const fetchData = async  () => {
      try { 
        const { data } = await axios.get("https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/notifications")
        setData(data)
      }catch(e) { 
        console.log(e)
      }
    }

    useEffect(() => {
      fetchData()
    },[])

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
              Add Admin
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="number" required />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required />
              </Form.Group>
  
              <Button  style={{ backgroundColor: "#19376d", borderRadius: "0" }} type="submit">
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
  
        <p className="headP">Dashboard / Push Notification</p>
  
        <div
          className="pb-4 sticky top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase "
            style={{ fontSize: "1.5rem" }}
          >
            All Notification
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm  bg-[#19376d] text-white tracking-wider"
          >
            Add Notification
          </button>
        </div>
        <section className="sectionCont">
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input
              type="search"
              placeholder="Start typing to search for Admin"
            />
          </div>
  
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>Title</th>
                  <th>Message</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {data?.data?.map((i , index) => (
                <tr key={index}> 
                <td> #{index + 1} </td>
                <td> {i.title} </td>
                <td> {i.message} </td>
                <td> {i.title} </td>
                </tr>
              ))}
                <tr>
                  <td>#1</td>
                  <td>Name</td>
                  <td>Lorem Ipsum Lorem Ipsum</td>
                  <td>12 March 2023</td>
                  <td>
                    <i className="fa-solid fa-trash" />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </section>
      </>
    );
  };


export default HOC(PushNotification)