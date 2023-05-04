/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const ESubCategory = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [ data , setData ] = useState([])
  const [query, setQuery] = useState("");
   //Pagination 
   const [currentPage2, setCurrentPage2] = useState(1);
   const [postPerPage2] = useState(5);
   const lastPostIndex2 = currentPage2 * postPerPage2;
   const firstPostIndex2 = lastPostIndex2 - postPerPage2;
 
   let pages2 = [];
 
   const TotolData = query
     ? 
     data?.filter((i) => i.question?.toLowerCase().includes(query?.toLowerCase()))
     : data;
 
     useEffect(() => {
       if(query) {
         setCurrentPage2(1)
       }
     },[ query])
 
   const slicedData = TotolData?.slice(firstPostIndex2, lastPostIndex2);
 
   for (let i = 1; i <= Math.ceil(TotolData?.length / postPerPage2); i++) {
     pages2.push(i);
   }
 
   function Next() {
     setCurrentPage2(currentPage2 + 1);
   }
 
   function Prev() {
     if (currentPage2 !== 1) {
       setCurrentPage2(currentPage2 - 1);
     }
   }
 
 
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/faqs"
      );
      setData(data?.data);
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
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Answer</Form.Label>
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
            All Faq's ( Total : {data?.length})
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
            onChange={(e) => setQuery(e.target.value)}
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
          {slicedData?.map((i, index) => (
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
        <div className="pagination">
            <button onClick={() => Prev()} className='prevBtn' >Prev</button>
            {currentPage2 === 1 ? (
              ""
            ) : (
              <button onClick={() => setCurrentPage2(1)}>1</button>
            )}

            {pages2
              ?.slice(currentPage2 - 1, currentPage2 + 3)
              .map((i, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage2(i)}
                  className={currentPage2 === i ? "activePage" : ""}
                >
                  {" "}
                  {i}{" "}
                </button>
              ))}
            {currentPage2 === pages2?.length ? (
              ""
            ) : (
              <button onClick={() => Next()} className='nextBtn'>Next</button>
            )}
          </div>
        </div>
        </section>
      </section>
    </>
  );
};

export default HOC(ESubCategory);
