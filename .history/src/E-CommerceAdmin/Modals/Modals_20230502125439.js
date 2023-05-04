import { Form, Modal } from "react-bootstrap";

export function ProfileUpdate(props) {
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
          <Form>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }