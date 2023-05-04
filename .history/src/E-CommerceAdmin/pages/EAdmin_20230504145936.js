/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Badge, Button, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const EAdmin = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState("");
  const [ edit , setEdit ] = useState(false)
  const [ id , setId] = useState("")
  const [query, setQuery] = useState("")

  //Pagination
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(5);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? 
    data?.filter((i) => i.name?.toLowerCase().includes(query?.toLowerCase()))
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
        " https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/brands"
      );
      setData(data.data);
      setDataLength(data?.data?.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [brandIcon, setBrandIcon] = useState("");
    const [brandName, setBrandName] = useState("");
    const [brandStatus, setBrandStatus] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      const fd = new FormData()
      fd.append("brandIcon" , brandIcon)
      fd.append("brandName" , brandName)
      fd.append("brandStatus" , true)
      try {
        const { data } = await axios.post(
          " https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/brands",
          fd
        );
        toast.success(data.message);
        fetchData();
        props.onHide()
      } catch (e) {
        console.log(e);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
         ` https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/brands/${id}`,
         {brandStatus}
        );
        toast.success(data.message);
        fetchData();
        props.onHide()
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
          { edit ? "Edit Brand" : "  Add Brand" }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
          edit ?
          <Form onSubmit={putHandler}>
          <Form.Select aria-label="Default select example" className="mb-3" 
          onChange={(e) => setBrandStatus(e.target.value)}
          >
      <option>--Select Status --</option>
      <option value="true">True</option>
      <option value="false">False</option>
    </Form.Select>

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form> :
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => setBrandIcon(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setBrandName(e.target.value)}
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        }
          
        </Modal.Body>
      </Modal>
    );
  }

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        ` https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/brands/${id}`
      );
      console.log(data);
      fetchData();
      toast.success("Deleted Successfully");
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

      <p className="headP">Dashboard / Brands</p>

      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase "
          style={{ fontSize: "1.5rem" }}
        >
          All Brands (Total : {dataLength})
        </span>
        <button
          onClick={() => {
            setEdit(false)
            setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm  bg-[#19376d] text-white tracking-wider"
        >
          Add Brand
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

        {dataLength === 0 ? (
          <Alert>No Data Found</Alert>
        ) : (
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {slicedData?.map((i, index) => (
                  <tr>
                    <td>#{index + 1} </td>
                    <td>
                      <img
                        src={i.brandIcon?.url}
                        alt=""
                        style={{ width: "60px" }}
                      />
                    </td>
                    <td> {i.brandName} </td>
                    <td> {i.brandStatus === true ? 
                    <Badge bg='success' >Approved</Badge>
                     : 
                     <Badge bg='danger'>DisApproved</Badge>
                     } </td>
                    <td>
                      <span className="flexCont">
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => deleteHandler(i._id)}
                        />
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => {
                            setId(i._id)
                            setEdit(true)
                            setModalShow(true);
                          }}
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
        )}
      </section>
    </>
  );
};

export default HOC(EAdmin);
