import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`http://localhost:3006/slot/${id}`).then((response) => {
        setData(response.data);
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
      });
    };
    fetchData();
  }, []);

  const edit = (e) => {
    e.preventDefault();
    const payload = {
      ...data,
      startDate,
      endDate,
    };

    axios
      .put(`http://localhost:3006/slot/${id}`, payload)
      .then(() => {
        toast.success(`update date for location ${data.location} successfully`);
        navigate("/");
      })
      .catch((error) => toast.error(error));
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
              <label>Start Date</label>
              <input
                className="form-control"
                type="date"
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                className="form-control"
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
              />
            </div>
            <div className="form-group d-flex align-items-center justify-content-between my-2">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => edit(e)}
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

export default Edit;