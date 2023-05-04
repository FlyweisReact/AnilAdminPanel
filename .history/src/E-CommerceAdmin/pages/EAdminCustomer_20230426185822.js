/** @format */

import React from "react";
import { Table } from "react-bootstrap";
import HOC from "../layout/HOC";

const EAdminCustomer = () => {
  return (
    <>
      <p className="headP">Dashboard / Customers</p>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center" style={{ width: "98%", marginLeft: "2%" }}>
          <span className="tracking-widest text-slate-900 font-semibold uppercase " style={{ fontSize: "1.5rem" }}>
            All Customers
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
            placeholder="Start typing to search for Customers"
          />
        </div>  

        <div className="overFlowCont">
          <Table >
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Religion</th>
                <th>Email Id</th>
                <th>Birth Country</th>
                <th>Birth City</th>
                <th>Wallet</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1</td>
                <td>
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                    alt=""
                    style={{ width: "60px" }}
                  />
                </td>
                <td>Adam Tylor</td>
                <td>Male</td>
                <td>Demo</td>
                <td>Adma@gmail.com</td>
                <td>India</td>
                <td>Delhi</td>
                <td>$200.00</td>
                <td>
                  <i className="fa-solid fa-trash" />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        </section>
      </>
  );
};

export default HOC(EAdminCustomer);
