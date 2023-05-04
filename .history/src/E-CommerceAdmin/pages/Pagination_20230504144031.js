import React, { useEffect, useState } from 'react'

const Pagination = ({data}) => {
    const [query, setQuery] = useState("");
    const [currentPage2, setCurrentPage2] = useState(1);
    const [postPerPage2] = useState(5);
    const lastPostIndex2 = currentPage2 * postPerPage2;
    const firstPostIndex2 = lastPostIndex2 - postPerPage2;
  
    let pages2 = [];
  
    const TotolData = query
      ? 
      data?.filter((i) => i.name?.toLowerCase().includes(query?.toLowerCase()))
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
  
  return (
   <>

   </>
    )
}

export default Pagination