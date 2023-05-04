/** @format */

import React from "react";
import { Badge, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import HOC from "../layout/HOC";

const EAdminProduct = () => {
  const { id } = useParams();

  return (
    <>
      <p className="headP">Dashboard / Vendor Products</p>
      <section>
      <div
        className="pb-4 sticky top-0  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.5rem" }}
        >
          {id} Products (Total : 2)
        </span>
      </div>

      <div className="sectionCont">
        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input
            type="search"
            placeholder="Start typing to search for products"
          />
        </div>
        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Reviews</th>
                <th>Discount</th>
                <th>Price</th>
                <th>Discounted Price</th>
                <th>Size</th>
                <th>Color</th>
                <th>Stock</th>
                <th>Highlights</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src="https://media.istockphoto.com/id/870195390/photo/budda-figurine-on-white-background.jpg?s=1024x1024&w=is&k=20&c=qaUpFtLLqbeGfWKxIpUbSGOko1d-KbxwbWXgcEGpujY="
                    alt=""
                    style={{ width: "100px" }}
                  />
                </td>
                <td>Buddha on Hand</td>
                <td>
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available
                </td>
                <td>5</td>
                <td>14%</td>
                <td>₹311.00</td>
                <td>₹350.00</td>
                <td>S , M , L , XL , XLL </td>
                <td>Red, Voilet</td>
                <td>
                  <Badge bg="danger">Out of Stock</Badge>
                </td>
                <td>
                  n publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a doc
                </td>
                <td>Category</td>
                <td>
                  <i className="fa-solid fa-trash" />
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src="https://media.istockphoto.com/id/870195390/photo/budda-figurine-on-white-background.jpg?s=1024x1024&w=is&k=20&c=qaUpFtLLqbeGfWKxIpUbSGOko1d-KbxwbWXgcEGpujY="
                    alt=""
                    style={{ width: "100px" }}
                  />
                </td>
                <td>Buddha on Hand</td>
                <td>
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available
                </td>
                <td>5</td>
                <td>14%</td>
                <td>₹311.00</td>
                <td>₹350.00</td>
                <td>S , M , L , XL , XLL </td>
                <td>Red, Voilet</td>
                <td>
                  <Badge bg="success">100 in Stock</Badge>
                </td>
                <td>
                  n publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a doc
                </td>
                <td>Category</td>
                <td>
                  <i className="fa-solid fa-trash" />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      </section>
    </>
  );
};

export default HOC(EAdminProduct);
