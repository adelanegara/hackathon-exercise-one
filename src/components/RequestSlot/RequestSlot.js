import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { config } from "../../server/config";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

//Modal style
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

const RequestSlot = ({ userData, request }) => {
  const [open, setOpen] = React.useState(false); //Modal close & open handler
  const handleClose = () => setOpen(false); //Modal close & open handler
  const [data, setData] = useState(); //state for data from Request.
  // const role = localStorage.getItem("role"); //get role from localStrorage
  const [selectedData, setSelectedData] = useState();

  //fetch data and shows list from request
  const fetchData = async () => {
    const reqList = await axios.get(config.url_request);
    setData(reqList.data);
  };
  useEffect(() => {
    setData(request);
  }, [request]);

  //Modal open handler
  const handleOpen = (item) => {
    setSelectedData(item);
    setOpen(true);
  };

  const onApprove = () => {
    const payload = {
      ...selectedData,
      status: "approved",
    };
    const urlRequest = `${config.url_request}/${selectedData.id}`;
    const urlSlot = `${config.url_slot}/${selectedData.idSlot}`;
    axios
      .put(urlRequest, payload)
      .then(() => {
        axios.get(urlSlot).then((response) => {
          const payload = {
            ...response.data,
            status: "unavailable",
          };
          axios.put(urlSlot, payload).then(() => {
            toast.success(`request booking ${selectedData.location} approved`);
            handleClose();
            fetchData();
          });
        });
      })
      .catch((error) => toast.error(error));
  };

  const onDecline = () => {
    const payload = {
      ...selectedData,
      status: "declined",
    };

    axios
      .put(`${config.url_request}/${selectedData.id}`, payload)
      .then(() => {
        toast.warning(`request booking ${selectedData.location} declined`);
        handleClose();
        fetchData();
      })
      .catch((error) => toast.error(error));
  };

  const styleButton = (type) => {
    if (type === "approved") {
      return "btn-success";
    }
    if (type === "declined") {
      return "btn-danger";
    }
    return "btn-primary";
  };

  return (
    <div className="container">
      <div className="row  d-flex flex-column">
        <div className="col-md-10 mx-auto my-4">
          <h2 className="text-lg-center pt-2">Request Slot:</h2>
          <div className="container py-5">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <Link to={`/`} className="btn btn-sm btn-secondary active mr-1">
                Home
              </Link>
              <Link to={`/request`} className="btn btn-sm btn-secondary mr-1">
                Request
              </Link>
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
                {userData?.role === "owner" && <th scope="col">Action</th>}
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
                  {userData?.role === "owner" && (
                    <td className="d-flex flex-row">
                      <div>
                        <button
                          disabled={
                            item.status === "declined" ||
                            item.status === "approved"
                          }
                          className={`btn btn-sm mr-1 ${styleButton(
                            item.status
                          )}`}
                          onClick={() => handleOpen(item)}
                        >
                          {item.status === "waiting for approval"
                            ? "Approve"
                            : item.status}
                        </button>
                      </div>
                    </td>
                  )}
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
                <div className="col mx-auto p-2">
                  <div>
                    <div className="text-info text-center mb-4">
                      <strong>Request Detail</strong>
                    </div>
                    <table className="table">
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">:</th>
                        <th scope="col">{selectedData?.id}</th>
                      </tr>
                      <tr>
                        <th scope="col">Location</th>
                        <th scope="col">:</th>
                        <th scope="col">{selectedData?.location}</th>
                      </tr>
                      <tr>
                        <th scope="col">Start Booking</th>
                        <th scope="col">:</th>
                        <th scope="col">{selectedData?.startBooking}</th>
                      </tr>
                      <tr>
                        <th scope="col">End Booking</th>
                        <th scope="col">:</th>
                        <th scope="col">{selectedData?.endBooking}</th>
                      </tr>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">:</th>
                        <th scope="col">{selectedData?.username}</th>
                      </tr>
                    </table>
                    <div className="form-group d-flex align-items-center justify-content-between my-2">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={onApprove}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={onDecline}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
  request: state.request,
});

export default connect(mapStateToProps)(RequestSlot);