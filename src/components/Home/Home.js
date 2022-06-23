import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Form } from 'react-bootstrap';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

const Home = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  const [data, setData] = useState();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const fetchData = async () => {
    const tradeList = await axios.get("http://localhost:3006/slot");
    setData(tradeList.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h2>
        Hi {username}, your role is {role}
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.date}</td>
              <td>{item.status}</td>
              <td className="d-flex flex-row">
                <button className="btn btn-sm btn-primary mr-1"    onClick={handleOpen}>Book</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="row">
            
                    <div className="col-md-6">
                        <Form.Group controlId="dob">
                            <Form.Label>Select Date</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                        </Form.Group>
                    </div>
                </div>
          <button className="btn btn-secondary" >
            Buy
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;