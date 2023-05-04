/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const EAdminCustomer = () => {
  const [ data , setData ] = useState([])
  const [ query , setQuery ] = useState('')
  // Pagination
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(5);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? 
    data?.filter((i) =>
    i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
    i?.phone?.toString()?.toLowerCase().includes(query?.toLowerCase()) ||
    i?.email?.toLowerCase().includes(query?.toLowerCase()) 
    )
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
      const { data } = await axios.get(" https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/users")
      setData(data.data)
    }catch(e) { 
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

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
            All Customers (Total : {data?.length})
          </span>
        </div>


        <section className="sectionCont">

        {data?.length === 0 ?
        <Alert variant='info'> No Data Found </Alert>
         :
         <>
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
            {slicedData?.map(( i ,index) => (
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
          <div className="pagination">
            <button onClick={() => Prev()} className='prevBtn' >Prev
            <i class="fa-solid fa-backward"></i>
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
              <button onClick={() => Next()} className='nextBtn'>Next</button>
            )}
          </div>
        </div>
         </>
          }

      
        </section>
      </>
  );
};

export default HOC(EAdminCustomer);
