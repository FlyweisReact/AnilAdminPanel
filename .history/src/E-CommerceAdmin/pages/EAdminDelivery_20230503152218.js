/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Button, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const EAdminDelivery = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [ edit , setEdit ] = useState(false)
  const  [ id , setId ]

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        " https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/coupons"
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
    const [couponCode, setCouponCode] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [activationDate, setActivationDate] = useState("");
    const [discount, setDiscount] = useState("");
    const [minOrder, setMinOrder] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          " https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/coupons",
          {
            couponCode,
            expirationDate,
            activationDate,
            discount,
            minOrder,
            status: true,
          }
        );
        toast.success(data.message);
        fetchData();
        props.onHide();
      } catch (e) {
        console.log(e);
        toast.error(e?.response?.data?.message);
      }
    };


    const Today = new Date().toISOString().substr(0, 10);

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
        ` https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/coupons/643a410b0a69fbc34fde60e7`,
          {
            couponCode,
            expirationDate,
            activationDate,
            discount,
            minOrder,
            status: true,
          }
        );
        toast.success(data.message);
        fetchData();
        props.onHide();
      } catch (e) {
        console.log(e);
        toast.error(e?.response?.data?.message);
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
            Add Coupon
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="date"
                required
                onChange={(e) => setExpirationDate(e.target.value)}
                min={Today}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Activation Date</Form.Label>
              <Form.Control
                type="date"
                required
                onChange={(e) => setActivationDate(e.target.value)}
                min={Today}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                required
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Min Order</Form.Label>
              <Form.Control
                type="number"
                required
                onChange={(e) => setMinOrder(e.target.value)}
              />
            </Form.Group>

            <Button variant="outline-success" type="submit">
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
        ` https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/coupons/${id}`
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
            All Coupon's (Total : {data?.data?.length})
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Coupon
          </button>
        </div>
        <section className="sectionCont">
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input type="search" placeholder="Start typing to search " />
          </div>

          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>Coupon Code</th>
                  <th>Expiration Date</th>
                  <th>Activation Date</th>
                  <th>Discount</th>
                  <th>Min. Order</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td> {i.couponCode} </td>
                    <td> {i.expirationDate?.slice(0, 10)} </td>
                    <td> {i.activationDate?.slice(0, 10)} </td>
                    <td> {i.discount}% </td>
                    <td> ₹{i.minOrder} </td>
                    <td>
                      {" "}
                      {i.status === true ? (
                        <Badge bg="success">Activated</Badge>
                      ) : (
                        <Badge bg="danger">Expired</Badge>
                      )}{" "}
                    </td>

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
      </section>
    </>
  );
};

export default HOC(EAdminDelivery);
