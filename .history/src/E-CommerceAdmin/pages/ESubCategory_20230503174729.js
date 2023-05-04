/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const ESubCategory = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [ data , setData ] = useState([])

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/faqs"
      );
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/faqs/${id}`
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [title, setTitle] = useState();
    const [message, setMessage] = useState();

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          " https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/faqs",
          {
            question :  title ,
            answer:  message,
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
            Add FAQS
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

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
      <p className="headP">Dashboard / FAQS</p>
        <div  className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}>
          <span className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.5rem" }}>
            All Faq's
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add FAQS
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
        <Table >
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {data?.data?.map((i, index) => (
                <tr key={index}>
                  <td> #{index + 1} </td>
                  <td> {i.question} </td>
                  <td> {i.answer} </td>
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

export default HOC(ESubCategory);
