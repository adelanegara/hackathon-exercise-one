import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../server/config";
import axios from "axios";
import { toast } from "react-toastify";

const BookingSlot = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const [startBooking, setStartBooking] = useState();
  const [endBooking, setEndBooking] = useState();
  const username = localStorage.getItem("username");

  const fetchData = async () => {
    axios.get(`${config.url_slot}/${id}`).then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const booking = (e) => {
    e.preventDefault();
    const payload = {
      startBooking,
      endBooking,
      status: "waiting for approval",
      location: data.location,
      username,
      idSlot: data.id,
    };

    if (startBooking && endBooking) {
      axios
        .post(config.url_request, payload)
        .then(() => {
          toast.success(
            `request booking for location ${data.location} successfully`
          );
          navigate("/");
        })
        .catch((error) => toast.error(error));
    } else {
      toast.warning("please select start and end booking date");
    }
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-dark ml-auto my-5"
          onClick={() => navigate("/")}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          <div className="text-primary text-center mb-2">
            <strong>Request Booking</strong>
          </div>
          <form>
            <div className="form-group">
              <label>Location</label>
              <input
                className="form-control"
                type="text"
                value={data?.location}
                disabled
              />
            </div>
            <div className="form-group mt-3">
              <label>Start Booking</label>
              <input
                className="form-control"
                type="date"
                min={data?.startDate}
                max={data?.endDate}
                onChange={(e) => setStartBooking(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>End Booking</label>
              <input
                className="form-control"
                type="date"
                min={startBooking}
                max={data?.endDate}
                onChange={(e) => setEndBooking(e.target.value)}
              />
            </div>
            <div className="form-group d-flex align-items-center justify-content-between my-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => booking(e)}
              >
                Request
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingSlot;