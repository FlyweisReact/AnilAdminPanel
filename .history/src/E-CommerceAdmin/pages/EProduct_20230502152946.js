/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const EProduct = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [ id , setId ] = useState("")

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        " https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/products"
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
        className="pb-4   w-full flex justify-between items-center"
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
                <th>Images</th>
                <th>Name</th>
                <th>Price</th>
                <th>Discounted Price</th>
                <th>Stock</th>
                <th>Available</th>
                <th>Sold Count</th>
                <th> Options </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((i, index) => (
                <tr key={index}>
                  <td> #{index + 1} </td>
                  <td>
                    {" "}
                    {i.image?.map((img, index) => (
                      <img
                        src={img}
                        alt=""
                        key={index}
                        style={{ width: "60px" }}
                      />
                    ))}{" "}
                  </td>
                  <td> {i.name} </td>
                  <td> ₹{i.price} </td>
                  <td style={{textDecoration : 'line-through'}} > ₹{i.discountedPrice} </td>
                  <td>
                    {i.stock > 10 ? (
                      <Badge bg="success"> {i.stock} In Stock </Badge>
                    ) : (
                      <Badge bg="danger"> {i.stock} In Stock </Badge>
                    )}
                  </td>
                  <td>
                    {" "}
                    {i.isAvailable === true ? (
                      <Badge bg="success">Available</Badge>
                    ) : (
                      <Badge bg="danger"> Not Available</Badge>
                    )}{" "}
                  </td>
                  <td> {i.soldCount} </td>
                  <td>
                    <span className="flexCont">
                      <i
                        className="fa-solid fa-eye"
                        onClick={() => setModalShow2(true)}
                      ></i>
                      <i
                        className="fa-solid fa-pen-to-square"
                        onClick={() => {
                          setEdit(true);
                          setModalShow(true);
                        }}
                      ></i>
                      <i
                        className="fa-sharp fa-solid fa-trash"
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
