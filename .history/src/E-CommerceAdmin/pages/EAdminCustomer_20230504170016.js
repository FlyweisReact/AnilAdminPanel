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

         </>
          }

      
        </section>
      </>
  );
};

export default HOC(EAdminCustomer);
