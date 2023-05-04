import React from 'react'
import HOC from '../layout/HOC'

const Banner = () => {
  return (
   <>
         <section>
        <p className="headP">Dashboard / Order</p>

        <div
          className="pb-4 sticky top-0  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Order's
          </span>
        </div>
        <section className="sectionCont">
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input type="search" placeholder="Start typing to search" />
          </div>

          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Shipping Address</th>
                  <th>Payment Method</th>
                  <th>Tax Price</th>
                  <th> Shipping Price </th>
                  <th> Paid </th>
                  <th> Delivered </th>
                  <th> Created At </th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td> {i.userId?.name} </td>
                    <td>
                      {" "}
                      {i.items?.map((item, index) => (
                        <ul key={index} style={{margin : '0'}}> 
                          <li style={{margin : '0'}}>  {item.product?.name} </li>
                        </ul>
                      ))}{" "}
                    </td>
                    <td>
                      {" "}
                      {i.items?.map((item, index) => (
                        <ul key={index}>
                          <li> {item.quantity} </li>
                        </ul>
                      ))}{" "}
                    </td>
                    <td> {i.shippingAddress} </td>
                    <td> {i.paymentMethod} </td>
                    <td> {i.taxPrice} </td>
                    <td> {i.shippingPrice} </td>
                    <td>
                      {" "}
                      {i.isPaid === false ? (
                        <Badge bg="danger">Not Paid</Badge>
                      ) : (
                        <Badge bg="success">Paid</Badge>
                      )}{" "}
                    </td>
                    <td>
                      {" "}
                      {i.isDelivered === false ? (
                        <Badge bg="danger">Delivered</Badge>
                      ) : (
                        <Badge bg="success">Not Delivered</Badge>
                      )}{" "}
                    </td>
                    <td> {i.createdAt} </td>
                    <td>
                      <span className="d-flex gap-2">
                        <i
                          class="fa-solid fa-pen-to-square"
                          onClick={() => {
                            setId(i._id)
                            setModalShow(true);
                          }}
                        ></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      </section>
   </>
  )
}

export default HOC(Banner)