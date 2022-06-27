import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../server/config";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "@mui/material/Switch";

//what is the component will do 
const EditSlot = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { id } = useParams();

  const hanldeChecked = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const fetchData =  () => {
      axios.get(`${config.url_slot}/${id}`).then((response) => {
        setData(response.data);
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
        setStatus(response.data.status);
        if (response.data.status === "available") {
          setIsChecked(true);
        }
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isChecked) {
      setStatus("available");
    } else {
      setStatus("unavailable");
    }
  }, [isChecked]);

  const edit = (e) => {
    e.preventDefault();
    const payload = {
      ...data,
      startDate,
      endDate,
      status,
    };

    axios
      .put(`${config.url_slot}/${id}`, payload)
      .then(() => {
        toast.success(`update date for location ${data.location} successfully`);
        navigate("/");
      })
      .catch((error) => toast.error(error));
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
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
            <div className="form-group">
              <Switch
                checked={isChecked}
                onChange={(e) => {
                  hanldeChecked(e);
                }}
              />
              <label>{status}</label>
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

export default EditSlot;