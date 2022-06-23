import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [status, setStatus] = useState("available");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const add = () => {
    const data = {
      date,
      status,
    };
    axios.post("http://localhost:3006/slot/", data);
    navigate("/");
  };

  return (
    <div className="container-fluid" data-testid="container-add">
      <h1 className="text-lg-center pt-5">Add New slot</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form>
            <div className="form-group">
              <input
                className="form-control"
                type="date"
                placeholder="Date yyyy-mmmm-dddd"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group pt-1">
              <select id="status">
                <option
                  value="available"
                  onSelect={(e) => setStatus(e.target.value)}
                >
                  Available
                </option>
                <option
                  value="unavailable"
                  onSelect={(e) => setStatus(e.target.value)}
                >
                  Unavailable
                </option>
              </select>
            </div>
            <div className="form-group pt-3">
              <button
                className="btn btn-block btn-dark"
                type="button"
                onClick={add}
              >
                Add Slot
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;