import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Home = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [data, setData] = useState();

  const fetchData = async () => {
    const reqList = await axios.get("http://localhost:3006/request");
    setData(reqList.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row  d-flex flex-column">
<div className="col-md-10 mx-auto my-4">
        <h2 className="text-lg-center pt-2">
           Request Slot:
          </h2>
        <div class="container py-5">
  <div class="row">
    <div class="col">
    <Link
         to={`/`}
         className="btn btn-sm btn-primary mr-1"
         >
        Home
       </Link>
    </div>
    <div class="col">
    <Link
         to={`/request`}
         className="btn btn-sm btn-primary mr-1"
         >
        Request
        </Link>
    </div>
  </div>

</div>
         

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Start Booking</th>
                <th scope="col">End Booking</th>
                <th scope="col">Status</th>
                <th scope="col">Location</th>
                <th scope="col">Username</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.startBooking}</td>
                  <td>{item.endBooking}</td>
                  <td>{item.status}</td>
                  <td>{item.location}</td>
                  <td>{item.username}</td>
                  <td className="d-flex flex-row">
                    
                      <div>
                      <button className="btn btn-sm btn-primary mr-1" onClick={handleOpen}> Approve </button> </div>

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
         
        <div className="row d-flex flex-column">

        <div className="col-md-6 mx-auto p-2">
            <div className="form-group d-flex align-items-center justify-content-between my-2">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Approve
              </button>
              <button
                type="button"
                className="btn btn-danger"
              >
                Decline 
              </button>
            </div>
        </div>
        <button
          className="btn btn-dark ml-auto "
          onClick={() => navigate("/")}
        >
          Go back
        </button>
        </div>
        </Box>
      </Modal>
        </div>
        
      </div>
    </div>
  );
};

export default Home;