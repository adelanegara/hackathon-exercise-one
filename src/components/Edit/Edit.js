import React from "react";

import { useNavigate } from "react-router-dom";

const Edit = () => {
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
  
        <form >
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Date yyyy-mmmm-dddd"
         
              />
            </div>
            <div className="form-group pt-1">
           <select id="status">
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                  </select>
            </div>
      
            <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update Slot
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => navigate("/")}
                >
                  cancel
                </button>
              </div>
          </form>
       
        </div>
      </div>
    </div>
  );
};

export default Edit;
