/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import HOC from "../layout/HOC";

const EAdminDelivery = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [ data , setData ] = useState([])

  const fetchData = async () => {
    try{  
      const { data } = await axios.get(" https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/coupons")
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
          <Modal.Title id="contained-modal-title-vcenter"> Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="file" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" pattern="[0-9]{10}" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required />
            </Form.Group>

            <Button variant="outline-success" type="submit">
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
        <p className="headP">Dashboard / Coupons</p>

        <div
          className="pb-4 sticky top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Coupon's{" "}
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add New
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
              placeholder="Start typing to search "
            />
          </div>

          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                <th>SNo.</th>
                  <th>Coupon Code</th>
                  <th>Expiration Date</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {data?.data?.map((i , index) => (
                <tr key={index}>
                <td> #{index + 1} </td>
              <td> {i.couponCode} </td>
              <td> {i.expirationDate?.slice(0,10)} </td>
              <td> {i.activationDate?.slice(0,10)} </td>
              <td> {i.discount}% </td>
              <td> ₹{i.minOrder} </td>
              <td> {i.status === true ? "True" : 'False'} </td>

                  <td>
                    <i className="fa-solid fa-trash" />
                  </td>
                </tr>
              ))}
              
              </tbody>
            </Table>
          </div>
        </section>
      </section>
    </>
  );
};

export default HOC(EAdminDelivery);
