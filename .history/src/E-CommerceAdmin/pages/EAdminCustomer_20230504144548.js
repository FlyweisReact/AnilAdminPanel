/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";
import { Pagination } from "./Pagination";

const EAdminCustomer = () => {
  const [ data , setData ] = useState([])
  const [ query , setQuery ] = useState('')
  // Pagination



  const fetchData = async () => {
    try {
      const { data } = await axios.get(" https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/users")
      setData(data)
    }catch(e) { 
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  },[])


  const filterData = !query
  ? data?.data
  : data?.data?.filter(
      (i) =>
        i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
        i?.phone?.toString()?.toLowerCase().includes(query?.toLowerCase()) ||
        i?.email?.toLowerCase().includes(query?.toLowerCase())
    );

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(` https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/users/${id}`)
      toast.success(data.message)
      fetchData()
    }catch(e) { 
      console.log(e)
    }
  }


  return (
    <>
      <p className="headP">Dashboard / Customers</p>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center" style={{ width: "98%", marginLeft: "2%" }}>
          <span className="tracking-widest text-slate-900 font-semibold uppercase " style={{ fontSize: "1.5rem" }}>
            All Customers (Total : {data?.data?.length})
          </span>
        </div>

        <Pagination 

        <section className="sectionCont">
        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input
            type="search"
            placeholder="Search Customer By Name , "
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>  

        <div className="overFlowCont">
          <Table >
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email Address</th>
                <th> Role </th>
                <th> Phone Number </th>
                <th> Created At </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {filterData?.map(( i ,index) => (
              <tr key={index}>
                <td>#{index + 1} </td>
                <td>
                  <img
                    src={i.profile ? i.profile : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"}
                    alt=""
                    style={{ width: "60px" }}
                  />
                </td>
                <td> {i.name} </td>
                <td> {i.email} </td>
                <td> {i.role} </td>
                <td> {i.phone} </td>
                <td> {i.createdAt?.slice(0,10)} </td>
                <td>
                  <i className="fa-solid fa-trash" onClick={() => deleteHandler(i._id)} />
                </td>
              </tr>
            ))}
          
            </tbody>
          </Table>
        </div>
        </section>
      </>
  );
};

export default HOC(EAdminCustomer);
