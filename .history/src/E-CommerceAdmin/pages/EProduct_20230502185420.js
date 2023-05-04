/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const EProduct = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [dataLength, setDataLength] = useState("");
  const [ query , setQuery ] = useState("")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(5);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = data?.slice(firstPostIndex, lastPostIndex);
  let pages = [];

  for (let i = 1; i <= Math.ceil(dataLength / postPerPage); i++) {
    pages.push(i);
  }

  function Prev() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function Next() {
    setCurrentPage(currentPage + 1);
  }

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        " https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/products"
      );
      setData(data.data?.reverse());
      setDataLength(data.data.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [stock, setStock] = useState("");
    const [variant, setVariant] = useState("");
    const [unit, setUnit] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [discountPercent, setDic] = useState("");

    const [ categoryData  , setCategoryData ] = useState([])
    const [ brandData , setBrandData ] = useState([])

    const getCategory = async () => {
      try {
        const { data } = await axios.get(" https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/categories")
        setCategoryData(data)
      }catch(e){
        console.log(e)
      }
    }

    const getBrands = async () => {
      try {
        const { data } = await axios.get(" https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/brands")
        setBrandData(data)
      }catch(e){
        console.log(e)
      }
    }

    useEffect(() => {
      if(props.show){
        getCategory()
        getBrands()
      }
    },[props.show])

    const postHandler = async (e) => {
      e.preventDefault();
      const fd = new FormData();
      fd.append("name", name);
      fd.append("description", description);
      fd.append("price", price);
      fd.append("discount", discount);
      fd.append("stock", stock);
      fd.append("variant", variant);
      fd.append("unit", unit);
      fd.append("brand", brand);
      fd.append("category", category);
      fd.append("discountPercent", discountPercent);
      Array.from(image).forEach((img) => {
        fd.append("image", img);
      });
      try {
        const { data } = await axios.post(
          " https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/products",
          fd
        );
        toast.success(data.message);
        fetchData();
        props.onHide()
      } catch (e) {
        console.log(data);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      const fd = new FormData();
      fd.append("name", name);
      fd.append("description", description);
      fd.append("price", price);
      fd.append("discount", discount);
      fd.append("stock", stock);
      fd.append("variant", variant);
      fd.append("unit", unit);
      fd.append("brand", brand);
      fd.append("category", category);
      try {
        const { data } = await axios.put(
          `https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/products/${id}`,
          fd
        );
        toast.success(data.message);
        fetchData();
        props.onHide()
      } catch (e) {
        console.log(data);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            {edit ? "Edit Product" : " Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? putHandler : postHandler}>
            {edit ? (
              " "
            ) : (
              <Form.Group className="mb-3">
                <Form.Label>Product Images</Form.Label>
                <Form.Control
                  type="file"
                  required
                  multiple
                  onChange={(e) => setImage(e.target.files)}
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label> Product Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
                onChange={(e) => setCategory(e.target.value)}
              >

                <option>-- Select Category --</option>
                {categoryData?.data?.map((i , index) => (
                  <option key={index} value={i.name} > {i.name} </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
                onChange={(e) => setBrand(e.target.value)}
              >

                <option>-- Select Brand --</option>
                {brandData?.data?.map((i , index) => (
                  <option key={index} value={i.brandName} > {i.brandName} </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> Price</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> Stock</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Variant</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setVariant(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> Unit</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setUnit(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> discountPercent</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setDic(e.target.value)}
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  function MyVerticallyCenteredModal2(props) {
    const [product, setProduct] = useState([]);

    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          ` https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/products/${id}`
        );
        setProduct(data);
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      if (props.show) {
        fetchProduct();
      }
    }, [props.show]);

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            {product?.data?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="View">
            {" "}
            <strong>Name : </strong> {product?.data?.name}
          </p>
          <p className="View">
            {" "}
            <strong>Description : </strong> {product?.data?.description}
          </p>
          <p className="View">
            {" "}
            <strong>Price : </strong> {product?.data?.price}
          </p>
          <p className="View">
            {" "}
            <strong>Stock : </strong> {product?.data?.stock}
          </p>
          <p className="View">
            {" "}
            <strong>Variant : </strong> {product?.data?.variant}
          </p>
          <p className="View">
            {" "}
            <strong>Unit : </strong> {product?.data?.unit}
          </p>
          <p className="View">
            {" "}
            <strong>Brand : </strong> {product?.data?.brand}
          </p>
          <p className="View">
            {" "}
            <strong>Category : </strong> {product?.data?.category}
          </p>
          <p className="View">
            {" "}
            <strong>Available : </strong>{" "}
            {product?.data?.isAvailable === true ? "Yes" : "No"}
          </p>
          <p className="View">
            {" "}
            <strong>Sold Count : </strong> {product?.data?.soldCount}
          </p>

          <p className="View">
            {" "}
            <strong>Discount percentage : </strong>{" "}
            {product?.data?.discountPercent}%
          </p>

          <p className="View">
            {" "}
            <strong>Discounted Price : </strong> ₹
            {product?.data?.discountedPrice}
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        ` https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/products/${id}`
      );
      console.log(data);
      fetchData();
      toast.success("Product Deleted SuccessFully");
    } catch (e) {
      console.log(e);
    }
  };

  const filterData = !query ?  currentPosts : 
  data?.filter(
    (i) => i.name?.toLowerCase().includes(query?.toLowerCase())
    return currentPosts()
  ) 




  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MyVerticallyCenteredModal2
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />

      <p className="headP">Dashboard / Products</p>

      <div
        className="pb-4   w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.5rem" }}
        >
          All Product's (Total : {dataLength})
        </span>
        <button
          onClick={() => {
            setEdit(false);
            setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
        >
          Add Product
        </button>
      </div>

      <section className="sectionCont">
        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input
            type="search"
            placeholder="Start typing to search for products"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Images</th>
                <th>Name</th>
                <th>Price</th>
                <th>Discounted Price</th>
                <th>Stock</th>
                <th>Available</th>
                <th>Sold Count</th>
                <th> Options </th>
              </tr>
            </thead>
            <tbody>
              {filterData?.map((i, index) => (
                <tr key={index}>
                  <td> #{index + 1} </td>
                  <td>
                    {" "}
                    {i.image?.map((img, index) => (
                      <img
                        src={img.url}
                        alt=""
                        key={index}
                        style={{ width: "60px", marginTop: "2px" }}
                      />
                    ))}{" "}
                  </td>
                  <td> {i.name} </td>
                  <td> ₹{i.price} </td>
                  <td style={{ textDecoration: "line-through" }}>
                    {" "}
                    ₹{i.discountedPrice}{" "}
                  </td>
                  <td>
                    {i.stock > 10 ? (
                      <Badge bg="success"> {i.stock} In Stock </Badge>
                    ) : (
                      <Badge bg="danger"> {i.stock} In Stock </Badge>
                    )}
                  </td>
                  <td>
                    {" "}
                    {i.isAvailable === true ? (
                      <Badge bg="success">Available</Badge>
                    ) : (
                      <Badge bg="danger"> Not Available</Badge>
                    )}{" "}
                  </td>
                  <td> {i.soldCount} </td>
                  <td>
                    <span className="flexCont">
                      <i
                        className="fa-solid fa-eye"
                        onClick={() => {
                          setId(i._id);
                          setModalShow2(true);
                        }}
                      ></i>
                      <i
                        className="fa-solid fa-pen-to-square"
                        onClick={() => {
                          setId(i._id)
                          setEdit(true);
                          setModalShow(true);
                        }}
                      ></i>
                      <i
                        className="fa-sharp fa-solid fa-trash"
                        onClick={() => deleteHandler(i._id)}
                      ></i>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="pagination">
            <button onClick={() => Prev()}>Prev</button>
            {currentPage === 1 ? (
              ""
            ) : (
              <button onClick={() => setCurrentPage(1)}>1</button>
            )}

            {pages?.slice(currentPage - 1, currentPage + 3).map((i, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(i)}
                className={currentPage === i ? "active" : ""}
              >
                {" "}
                {i}{" "}
              </button>
            ))}
            {currentPage === pages?.length ? (
              ""
            ) : (
              <button onClick={() => Next()}>Next</button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(EProduct);
