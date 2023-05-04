/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Table } from "react-bootstrap";
import HOC from "../layout/HOC";

const Transaction = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
     //Pagination 
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(5);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? 
    data?.filter((i) => i.userId?.toLowerCase().includes(query?.toLowerCase()))
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
        " https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/payments"
      );
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section>
        <p className="headP">Dashboard / Transaction</p>

        <div
          className="pb-4 sticky top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Transaction's ( Total : {data?.length})
          </span>
        </div>
        <section className="sectionCont">
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input type="search" placeholder="Start typing to search"      onChange={(e) => setQuery(e.target.value)} />
          </div>

          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Customer</th>
                  <th>Order</th>
                  <th>Payment Method</th>
                  <th>Payment Id</th>
                  <th> Receipt </th>
                  <th> Amount </th>
                  <th> Created At </th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {slicedData?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td> {i.userId} </td>
                    <td> {i.order} </td>
                    <td> {i.paymentMethod} </td>
                    <td> {i.payment_Id} </td>
                    <td> {i.receipt} </td>
                    <td> {i.amount} </td>
                    <td> {i.createdAt?.slice(0, 10)} </td>
                    <td>
                      {" "}
                      {i.status === "success" ? (
                        <Badge bg="success">Success</Badge>
                      ) : (
                        <Badge bg="danger">Cancel</Badge>
                      )}{" "}
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

export default HOC(Transaction);
