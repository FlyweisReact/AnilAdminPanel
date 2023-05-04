/** @format */

import React, { useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const EVendorList = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);

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
            {edit ? "Edit Vendor" : "Add Vendor"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {edit ? (
              <>
            

                <Form.Group className="mb-3">
                  <Form.Label>Commission</Form.Label>
                  <Form.Control type="number" min={0} required />
                </Form.Group>
              </>
            ) : (
              <>
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
                  <Form.Label>Commission</Form.Label>
                  <Form.Control type="number" min={0} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" required />
                </Form.Group>
              </>
            )}

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

      <p className="headP">Dashboard / Vendors</p>

      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.5rem" }}
        >
          All Vendor's
        </span>
        <button
          onClick={() => {
            setModalShow(true);
            setEdit(false)
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
        >
          Add Vendor
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
            placeholder="Start typing to search for Vendors"
          />
        </div>
        <Table>
          <thead>
            <tr>
              <th>SNo.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Commission</th>
              <th>Products</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> #1 </td>
              <td>
                <span className="flexCont">
                  <img
                    src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                    alt=""
                  />
                  <p> User Name </p>
                </span>
              </td>
              <td>User@gmail.com</td>
              <td>7854965412</td>
              <td>$100</td>
              <td>
                <Link to="/E-Commerce/Admin/Product/Adam Taylor">
                  <button className="view">View</button>
                </Link>
              </td>
              <td>
                <span className="flexCont">
                  <i
                    class="fa-solid fa-pen-to-square"
                    onClick={() => {
                      setEdit(true);
                      setModalShow(true);
                    }}
                  ></i>
                  <i class="fa-sharp fa-solid fa-trash"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default HOC(EVendorList);
