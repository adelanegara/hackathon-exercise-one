import React from "react";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();


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
          <form>
            <div className="form-group">
              <label>Start Date</label>
              <input
                className="form-control"
                type="date"
              
              />
            </div>
            <div className="form-group pt-3">
              <label>End Date</label>
              <input
                className="form-control"
                type="date"
              
              />
            </div>
            <div className="form-group d-flex align-items-center justify-content-between my-2">
              <button
                type="submit"
                className="btn btn-primary"
             
              >
                Update
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

export default Booking;