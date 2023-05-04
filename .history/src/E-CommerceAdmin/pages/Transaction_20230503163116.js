/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Table } from "react-bootstrap";
import HOC from "../layout/HOC";

const Transaction = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        " https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/payments"
      );
      setData(data);
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
        <p className="headP">Dashboard / Order</p>

        <div
          className="pb-4 sticky top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Order's
          </span>
        </div>
        <section className="sectionCont">
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input type="search" placeholder="Start typing to search" />
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
                {data?.data?.map((i, index) => (
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
          </div>
        </section>
      </section>
    </>
  );
};

export default HOC(Transaction);
