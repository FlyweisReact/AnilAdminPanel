/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Button, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const EAdminDelivery = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [query, setQuery] = useState("");
   //Pagination 
   const [currentPage2, setCurrentPage2] = useState(1);
   const [postPerPage2] = useState(5);
   const lastPostIndex2 = currentPage2 * postPerPage2;
   const firstPostIndex2 = lastPostIndex2 - postPerPage2;
 
   let pages2 = [];
 
   const TotolData = query
     ? 
     data?.filter((i) => i.couponCode?.toLowerCase().includes(query?.toLowerCase()))
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
        " https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/coupons"
      );
      setData(data.data);
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
    const [status, setStatus] = useState("");

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
        const { data } = await axios.put(
          `https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/coupons/${id}`,
          {
            status,
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
            {edit ? "Edit Coupon Status" : "  Add Coupon"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? putHandler : postHandler}>
            {edit ? (
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setStatus(e.target.value)}
                className='mb-3'
              >
                <option>-- Select Status --</option>
                <option value="true">Activate</option>
                <option value="false">DeActivate</option>
              </Form.Select>
            ) : (
              <>
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
              </>
            )}

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
              setEdit(false);
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
            <input type="search" placeholder="Start typing to search "   onChange={(e) => setQuery(e.target.value)}/>
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
                {slicedData?.map((i, index) => (
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
                        <Badge bg="danger">DeActivated</Badge>
                      )}{" "}
                    </td>

                    <td>
                      <span className="flexCont">
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => {
                            setId(i._id);
                            setEdit(true);
                            setModalShow(true);
                          }}
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => deleteHandler(i._id)}
                        />
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
              <button onClick={() => Next()} className='nextBtn'> <i className="fa-sharp fa-solid fa-forward"></i></button> )}
          </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default HOC(EAdminDelivery);
