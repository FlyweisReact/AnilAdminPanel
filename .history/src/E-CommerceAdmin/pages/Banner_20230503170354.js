/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import HOC from "../layout/HOC";

const Banner = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        " https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/banners"
      );
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const deleteHandler = async (id) => {
    try {
        const { data } = await axios.delete(` https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/banners/${id}`)
        toas
    }catch(e) { 
        console.log(e)
    }
  }

  return (
    <>
      <section>
        <p className="headP">Dashboard / Banner</p>

        <div
          className="pb-4 sticky top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Banner's
          </span>
        </div>

        <div className="gridCont">
          {data?.data?.map((i, index) => (
            <div key={index}>
                <img src={i.image?.url} alt='' />
                <p className="head"> {i.title} </p>
                <p> {i.description } </p>
                <Button variant="outline-danger">Delete</Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HOC(Banner);
