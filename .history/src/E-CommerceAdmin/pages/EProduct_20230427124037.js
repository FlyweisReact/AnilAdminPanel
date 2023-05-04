/** @format */

import React, { useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button, Badge } from "react-bootstrap";
import { toast } from "react-toastify";

const EProduct = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = useState(false);
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
            {edit ? "Edit Product" : " Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Images</Form.Label>
              <Form.Control type="file" required multiple />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> Product Name</Form.Label>
              <Form.Control type="text" required placeholder="Product Name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Category</Form.Label>
              <Form.Select aria-label="Default select example" required>
                <option>-- Select Category --</option>
                <option>First Category</option>
                <option>Second Category</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Minimum Purchase Qty </Form.Label>
              <Form.Control type="number" min={0} required placeholder="1" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control type="number" min={0} required placeholder="Tags" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" required placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Reviews</Form.Label>
              <Form.Control type="text" required placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="text" required placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" required placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Discounted Price</Form.Label>
              <Form.Control type="text" required placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Size</Form.Label>
              <Form.Control type="text" required placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <Form.Control type="text" required placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="text" required placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Highlights</Form.Label>
              <Form.Control type="text" required placeholder="" />
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

  const data = [
    {
      image:
        "https://media.istockphoto.com/id/870195390/photo/budda-figurine-on-white-background.jpg?s=1024x1024&w=is&k=20&c=qaUpFtLLqbeGfWKxIpUbSGOko1d-KbxwbWXgcEGpujY=",
      name: "Buddha on Hand",
      added: "gemoline",
      info: {
        NumSale: 5,
        BasePrice: "12,000",
        Rating: 5,
      },
      stock: 100,
      todayDeal: "On",
      published: "Off",
      feautred: "On",
    },
    {
      image:
        "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/450pro_white_main_1500x.png?v=1646640003",
      name: "BLUETOOTH HEADPHONES",
      added: "gemoline",
      info: {
        NumSale: 5,
        BasePrice: "12,000",
        Rating: 5,
      },
      stock: 100,
      todayDeal: "On",
      published: "Off",
      feautred: "On",
    },
  ];

  function MyVerticallyCenteredModal2(props) {
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
            View Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="View">
            {" "}
            <strong>Name : </strong> Demo Product{" "}
          </p>
          <p className="View">
            {" "}
            <strong>Category : </strong> Demo Category{" "}
          </p>
          <p className="View">
            {" "}
            <strong>Minimum Purchase Qty : </strong> 1{" "}
          </p>
          <p className="View">
            {" "}
            <strong>Tags : </strong> Demo Tags , demoTags{" "}
          </p>
          <p className="View">
            {" "}
            <strong>Description : </strong> Description{" "}
          </p>
          <p className="View">
            {" "}
            <strong>Reviews : </strong> Reviews{" "}
          </p>
          <p className="View">
            {" "}
            <strong>Discount : </strong> Discount%{" "}
          </p>
          <p className="View">
            {" "}
            <strong>Price : </strong> Price{" "}
          </p>
          <p className="View">
            {" "}
            <strong>Discounted Price : </strong> Discounted Price{" "}
          </p>
          <p className="View">
            {" "}
            <strong>Size : </strong> Size{" "}
          </p>
          <p className="View">
            {" "}
            <strong>Color : </strong> Color{" "}
          </p>
          <p className="View">
            {" "}
            <strong>Stock : </strong> Stock{" "}
          </p>
          <p className="View">
            {" "}
            <strong>Highlights : </strong> Highlights{" "}
          </p>
          <p className="View">
            {" "}
            <strong>Added : </strong> gemoline{" "}
          </p>
          <p className="View">
            {" "}
            <strong>stock : </strong> 100{" "}
          </p>
          <p className="View">
            {" "}
            <strong>Today Deal : </strong> On{" "}
          </p>
          <p className="View">
            {" "}
            <strong>Published : </strong> Off{" "}
          </p>
          <p className="View">
            {" "}
            <strong>Featured : </strong> Off{" "}
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteHandler = async () => {
    try {
      toast.success("Product Deleted SuccessFully");
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
      <MyVerticallyCenteredModal2
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />

      <p className="headP">Dashboard / Products</p>

      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.5rem" }}
        >
          All Product's
        </span>
        <button
          onClick={() => {
            setEdit(false);
            setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
        >
          Add Product
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
            placeholder="Start typing to search for products"
          />
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Name</th>
                <th>Added By</th>
                <th>Info</th>
                <th>Total Stock</th>
                <th>Category</th>
                <th>Price</th>
                <th>Today Deal</th>
                <th> Published </th>
                <th> Featured </th>
                <th> Options </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>#{index + 1} </td>
                  <td>
                    <span className="flexCont">
                      <img src={i.image} alt="" />
                      <p> {i.name} </p>
                    </span>
                  </td>
                  <td>{i.added}</td>
                  <td>
                    <div className="blockContent">
                      <p>
                        {" "}
                        <strong>Num of Sale :</strong> {i.info.NumSale} Times
                      </p>
                      <p>
                        {" "}
                        <strong>Base Price :</strong> Rs {i.info.BasePrice}.00
                      </p>
                      <p>
                        {" "}
                        <strong>Rating :</strong> {i.info.Rating}
                      </p>
                    </div>
                  </td>

                  <td>
                    <Badge bg="success"> {i.stock} in Stock </Badge>
                  </td>
                  <td>Astrologer</td>
                  <td>$550.00</td>
                  <td>
                    {i.todayDeal === "On" ? (
                      <div className="ActivecheckBox">
                        <span></span>
                      </div>
                    ) : (
                      <div className="checkBox">
                        <span></span>
                      </div>
                    )}
                  </td>
                  <td>
                    {i.published === "On" ? (
                      <div className="ActivecheckBox">
                        <span></span>
                      </div>
                    ) : (
                      <div className="checkBox">
                        <span></span>
                      </div>
                    )}
                  </td>
                  <td>
                    {i.feautred === "On" ? (
                      <div className="ActivecheckBox">
                        <span></span>
                      </div>
                    ) : (
                      <div className="checkBox">
                        <span></span>
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="flexCont">
                      <i
                        class="fa-solid fa-eye"
                        onClick={() => setModalShow2(true)}
                      ></i>
                      <i
                        class="fa-solid fa-pen-to-square"
                        onClick={() => {
                          setEdit(true);
                          setModalShow(true);
                        }}
                      ></i>
                      <i
                        class="fa-sharp fa-solid fa-trash"
                        onClick={() => deleteHandler()}
                      ></i>
                    </span>
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

export default HOC(EProduct);
