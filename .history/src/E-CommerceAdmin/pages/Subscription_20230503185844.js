/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const Subscription = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [data, setData] = useState([]);
  
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/subscriptions"
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
 
  
        <p className="headP">Dashboard / Subscription</p>
  
        <div
          className="pb-4  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase "
            style={{ fontSize: "1.5rem" }}
          >
            All Subscription
          </span>
     
        </div>
        <section className="sectionCont">
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input type="search" placeholder="Start typing to search for Admin" />
          </div>
  
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>User</th>
                  <th>Product</th>
                  <th>Expiry At</th>
                  <th>Created At</th>
                  <th>Status</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td> {i.userId?.name} </td>
                    <td> {i.productId?.name} </td>
                    <td> {i.endDate?.substr(0, 10)} </td>
                    <td> {i.startDate?.substr(0, 10)} </td>
                    <td> {i.status} </td>
                
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      </>
    );
  };

export default HOC(Subscription)