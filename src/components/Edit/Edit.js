import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("available");
  const [date, setDate] = useState("");
  const { id } = useParams();

  const fetchData = async () => {
    const getData = await axios.get(`http://localhost:3006/slot/${id}`);
    setStatus(getData.data.status);
    setDate(getData.data.date);
  };
  useEffect(() => {
    fetchData();
  });

  const edit = () => {
    const data = {
      date,
      status,
    };
    axios.post("http://localhost:3006/slot/", data);
    navigate("/");
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
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            <div className="form-group d-flex align-items-center justify-content-between my-2">
              <button type="submit" className="btn btn-primary" onClick={edit}>
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