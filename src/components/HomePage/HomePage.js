import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

//pass the parameter userData, slot from redux
const HomePage = ({ userData, slot }) => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row  d-flex flex-column">
        <div className="col-md-10 mx-auto my-4">
          <h2 className="text-lg-center pt-2">
            {/* get username and role from redux and display it */}
            Hi {userData?.username}, your role is {userData?.role}
          </h2>

          <div className="container py-5">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <Link to={`/`} className="btn btn-sm btn-secondary active mr-1">
                Home
              </Link>
              <Link to={`/request`} className="btn btn-sm btn-secondary mr-1">
                Request
              </Link>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Location</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {slot.map((item, index) => {
                const isAvailable = item.status === "available";
                return (
                  // shows data from redux
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.location}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.status}</td>
                    <td className="d-flex flex-row">
                      {/* shows edit button if the role is owner */}
                      {userData?.role === "owner" && (
                        <div>
                          <Link
                            to={`/edit/${item.id}`}
                            className="btn btn-sm btn-dark mr-1"
                          >
                            Edit
                          </Link>
                        </div>
                      )}
                   {/* shows edit button if the role is user */}
                      {userData?.role === "user" && (
                        <button
                          disabled={!isAvailable}
                          className="btn btn-sm btn-primary mr-1"
                          onClick={() => navigate(`/booking/${item.id}`)}
                        >
                          {/* if available equal to book, if not available booked */}
                          {isAvailable ? "Book" : "Booked"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData,
  slot: state.slot,
});

export default connect(mapStateToProps)(HomePage);