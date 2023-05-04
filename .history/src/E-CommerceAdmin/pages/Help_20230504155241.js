import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";


const Help = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("")
    const [currentPage2, setCurrentPage2] = useState(1);
    const [postPerPage2] = useState(5);
    const lastPostIndex2 = currentPage2 * postPerPage2;
    const firstPostIndex2 = lastPostIndex2 - postPerPage2;
  
    let pages2 = [];
  
    const TotolData = query
      ? 
      data?.filter((i) => i.email?.toLowerCase().includes(query?.toLowerCase()))
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
          "https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/help"
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
        const fd = new FormData()
        fd.append("name" , name)
        fd.append("image" , image)
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
  
    const deleteHandler = async (id) => {
      try {
        const { data } = await axios.delete(
          `https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/categories/${id}`
        );
        fetchData();
        toast.success(data.message);
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
          <p className="headP">Dashboard / Help and Support</p>
          <div
            className="pb-4 sticky top-0  w-full flex justify-between items-center"
            style={{ width: "98%", marginLeft: "2%" }}
          >
            <span
              className="tracking-widest text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
               Help and Support ( Total : {data?.length})
            </span>
            <button
              onClick={() => {
                setModalShow(true);
              }}
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
            >
              Add Help and Suppport
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
              <Table>
                <thead>
                  <tr>
                    <th>SNo.</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {slicedData?.map((i, index) => (
                    <tr key={index}>
                      <td> #{index + 1} </td>
                    
                      <td>  {i.email}  </td>
                      <td>  {i.mobile}  </td>
                      <td>  {i.createdAt?.slice(0,10)} </td>
  
                      <td>
                        {" "}
                        <span className="flexCont">
                          <i
                            className="fa-sharp fa-solid fa-trash "
                            onClick={() => deleteHandler(i._id)}
                          ></i>
                        </span>
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

export default HOC(Help)