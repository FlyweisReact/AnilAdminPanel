/** @format */

import React, { useEffect, useState } from "react";

import { MdPayment, MdDashboardCustomize } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import HOC from "../layout/HOC";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const [ userCount , setUserCount  ] = useState("")
  const [ productCount , setProductCount  ] = useState("")
  const [ categoryCount , setCategoryCount  ] = useState("")
  const [ couponCount , setCouponCount  ] = useState("")
  const [ orderCount , setOrderCount  ] = useState("")

  const fetchUser = async () => {
    try{  
      const { data } = await axios.get(" https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/users ")
      setUserCount(data.data.length)
    }catch(e) { 
      console.log(e)
    }
  }

  const fetchProduct = async () => {
    try{  
      const { data } = await axios.get("https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/products ")
      setProductCount(data.data.length)
    }catch(e) { 
      console.log(e)
    }
  }

  const fetchCategory = async () => {
    try{  
      const { data } = await axios.get(" https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/categories ")
      setCategoryCount(data.data.length)
    }catch(e) { 
      console.log(e)
    }
  }
  const fetchCoupon = async () => {
    try{  
      const { data } = await axios.get(" https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/coupons ")
      setCouponCount(data.data.length)
    }catch(e) { 
      console.log(e)
    }
  }
  const fetchOrder = async () => {
    try{  
      const { data } = await axios.get(" https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/orders ")
      setOrderCount(data.data.length)
    }catch(e) { 
      console.log(e)
    }
  }


  useEffect(() => {
    fetchUser()
    fetchProduct()
    fetchCategory()
    fetchCoupon()
    fetchOrder()
  },[])

  const card = [
    {
      progress: "bg-blue-400",
      title: "Total Coupons",
      number: couponCount,
      icon: <MdPayment className="text-2xl text-[rgb(240,72,88)]" />,
      bg: "#ff5370",
      link: "/Coupon",
    },
    {
      progress: "bg-green-400",
      title: "Total Order",
      number: orderCount,
      icon: (
        <i
          className="fa-solid fa-bag-shopping text-2xl"
          style={{ color: "#4099ff" }}
        ></i>
      ),
      bg: "#4099ff",
      link: "/Orders",
    },
    {
      progress: "bg-green-400",
      title: "All Users",
      number: userCount,
      icon: <FiUser className="text-2xl text-[#29cccc]" />,
      bg: "#29cccc",
      link: "/Customer",
    },
    {
      progress: "bg-green-400",
      title: "All Category",
      number: categoryCount,
      icon: <MdDashboardCustomize className="text-2xl text-[#3c335d]" />,
      bg: "#3c335d",
      link: "/Category",
    },
    {
      progress: "bg-green-400",
      title: "All products",
      number: productCount,
      icon: (
        <i className=" fa-brands fa-product-hunt text-2xl text-[#64878e]"></i>
      ),
      bg: "#64878e",
      link: "/Product",
    },
  ];
  return (
    <>
      <section className="grid md:grid-cols-4 grid-cols-2 gap-y-6 gap-x-4">
        {card.map((card, index) => {
          return (
            <div
              className="px-5 py-8 bg-slate-200 space-y-2 shadow-xl flex flex-col  rounded-md cardDiv"
              key={index}
              style={{
                backgroundColor: `${card.bg}`,
                textTransform: "uppercase",
              }}
              onClick={() => navigate(`${card.link}`)}
            >
              <div className="grid  justify-between grid-cols-4">
                <div className="flex flex-col col-span-3 space-y-1">
                  <span
                    className="tracking-widest text-gray-900"
                    style={{ color: "#fff" }}
                  >
                    {card.title}
                  </span>
                  <span
                    className="tracking-wider text-gray-700 text-xl md:text-2xl font-semibold"
                    style={{ color: "#fff" }}
                  >
                    {card.number}
                  </span>
                </div>
                <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center iCOn">
                  {card.icon}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default HOC(Dashboard);
