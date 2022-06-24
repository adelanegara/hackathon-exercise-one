import React from "react";

import { useNavigate } from "react-router-dom";

const Approve = () => {
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Approve;