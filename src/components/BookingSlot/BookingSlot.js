import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";

//pass the parameter slot, addRequest, userData from redux
const BookingSlot = ({ slot, addRequest, userData }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const [startBooking, setStartBooking] = useState();
  const [endBooking, setEndBooking] = useState();
  const { username } = userData;

  useEffect(() => {
    const findSlot = slot.find((item) => {
      return item.id === parseInt(id); ////find slot with the id that the same with the id. parseInt(id) to make the str to int 
    });
    if (findSlot) { // if found
      setData(findSlot); //update data
    }
  }, [slot, id]);

  const booking = (e) => {
    e.preventDefault();
    //generate booking id from slot. it has to be uniquely identified and not the same
    const idBooking = `SL${new Date().toISOString()}${data.location}`;
    //update data
    const payload = {
      startBooking,
      endBooking,
      status: "waiting for approval",
      location: data.location,
      username,
      idSlot: data.id,
      idBooking,
    };

    if (startBooking && endBooking) { // user click start booking and endbooking for req slot
      addRequest(payload);
      toast.success(
        `request booking for location ${data.location} successfully` // success message
      );
      navigate("/");
    } else {
      toast.warning("please select start and end booking date"); //error data uncompleate
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

//redux selector 
const mapStateToProps = (state) => ({
  slot: state.slot,
  userData: state.userData,
});

//redux action
const mapDispatchToProps = (dispatch) => ({
  addRequest: (payload) => {
    dispatch({ type: "ADD_REQUEST", payload });
  },
});

//combine the 2 state (action & selector from redux)
export default connect(mapStateToProps, mapDispatchToProps)(BookingSlot);