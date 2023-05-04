/** @format */

import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export function ProfileUpdate(props) {
  const [  email , setEmail ] = useState("")
  const [ password , setPassword  ] = useState("")
  const AdminId = localStorage.getItem("Id")

  const putHandler = async (e) => {
    e.preventDefault()
    try { 
        const { data } = await axios.put(` https://xw9mf13nwl.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/${AdminId}` , {
          email , password
        })
        toast.success(data.message)
        props.onHide()
    }catch(e) { 
      console.log(e)
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={putHandler}>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" pattern="[0-9]{10}" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Button className="submitBtn" >Submit</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
