/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const Reports = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [dataLength, setDataLength] = useState("");
  const [query, setQuery] = useState("");

  //Pagination
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(5);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? data?.filter(
        (i) =>
          i.email?.toLowerCase().includes(query?.toLowerCase()) ||
          i.status?.toLowerCase().includes(query?.toLowerCase())
      )
    : data;

  useEffect(() => {
    if (query) {
      setCurrentPage2(1);
    }
  }, [query]);

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
        "https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/reports"
      );
      setData(data);
      setDataLength(data.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  function MyVerticallyCenteredModal(props) {
    const putHandler = async (e) => {
      try {
        const { data } = await axios.put(
          `https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/reports/${id}`
        );
        toast.success(data.message);
        fetchData();
        props.onHide();
      } catch (e) {
        console.log(data);
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
          <Modal.Title id="contained-modal-title-vcenter"> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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

      <p className="headP">Dashboard / Complaints</p>

      <div
        className="pb-4   w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.5rem" }}
        >
          All Complaint's (Total : {dataLength})
        </span>
     
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
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User Phone</th>
                <th>Status</th>
          
                <th> Options </th>
              </tr>
            </thead>
            <tbody>
              {slicedData?.map((i, index) => (
                <tr key={index}>
                  <td> #{index + 1} </td>
                  <td> {i.userId?.name} </td>
                  <td> {i.userId?.email} </td>
                  <td> {i.userId?.phone} </td>
                  <td>
                    {i.status === "pending" ? (
                      <Badge bg="info"> Pending </Badge>
                    ) : (
                      ""
                    )}
                    {i.status === "pending" ? (
                      <Badge bg="info"> Pending </Badge>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                  <span>
                      <i
                        className="fa-solid fa-pen-to-square"
                        onClick={() => {
                          setId(i._id);
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
            <button onClick={() => Prev()} className="prevBtn">
              Prev
            </button>
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
              <button onClick={() => Next()} className="nextBtn">
                Next
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(Reports);
