/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const Subscription = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [data, setData] = useState([]);
  
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/subscriptions"
        );
        setData(data);
      } catch (e) {
        console.log(e);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    function MyVerticallyCenteredModal(props) {
      const [title, setTitle] = useState();
      const [message, setMessage] = useState();
  
      const postHandler = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.post(
            " https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/notifications",
            {
              title,
              message,
            }
          );
          toast.success(data.message);
          props.onHide();
          fetchData();
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
              Add Notification
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={postHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  type="text"
                  required
                  onChange={(e) => setMessage(e.target.value)}
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
  
    const deleteHandler = async (id) => {
      try {
        const { data } = await axios.delete(
          `https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/notifications/${id}`
        );
        toast.success(data.message);
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };
  
    return (
      <>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
  
        <p className="headP">Dashboard / Push Notification</p>
  
        <div
          className="pb-4  w-full flex justify-between items-center"
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
            <input type="search" placeholder="Start typing to search for Admin" />
          </div>
  
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>User</th>
                  <th>Product</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td> {i.userId?.name} </td>
                    <td> {i.productId?.name} </td>
                    <td> {i.endDate?.substr(0, 10)} </td>
                    <td> {i.startDate?.substr(0, 10)} </td>
                    <td> {i.status} </td>
                    <td>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => deleteHandler(i._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      </>
    );
  };

export default HOC(Subscription)