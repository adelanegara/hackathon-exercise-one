import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "@mui/material/Switch";

//what is the component will do
const EditSlot = ({ slot, editSlot }) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { id } = useParams();

  //togle status
  const hanldeChecked = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const findSlot = slot.find((item) => {
      return item.id === parseInt(id);
    });
    if (findSlot) {
      setData(findSlot);
      setStartDate(findSlot.startDate);
      setEndDate(findSlot.endDate);
      setStatus(findSlot.status);
      if (findSlot.status === "available") {
        setIsChecked(true);
      }
    }
  }, [slot, id]);

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
    editSlot(payload);
    toast.success(`update date for location ${data.location} successfully`);
    navigate("/");
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
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                className="form-control"
                type="date"
                min={startDate}
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

const mapStateToProps = (state) => ({
  slot: state.slot,
});

const mapDispatchToProps = (dispatch) => ({
  editSlot: (payload, id) => {
    dispatch({ type: "SET_SLOT", payload });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSlot);