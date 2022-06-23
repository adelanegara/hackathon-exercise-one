import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const fetchData = async () => {
    const slotList = await axios.get("http://localhost:3006/slot");
    setData(slotList.data);
  };
  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div className="container">
      <div className="row  d-flex flex-column">
        <div className="col-md-10 mx-auto my-4">
          <h2 className="text-lg-center">
            Hi {username}, your role is {role}
          </h2>

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
              {data?.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.location}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td>{item.status}</td>
                  <td className="d-flex flex-row">
                    {role === "owner" && (
                      <div>
                        <Link
                          to={`/edit/${item.id}`}
                          className="btn btn-sm btn-primary mr-1"
                        >
                          Edit
                        </Link>
                    
                      </div>
                    )}
                    {role === "user" && (
                      <button
                        className="btn btn-sm btn-primary mr-1"
                        onClick={() => navigate(`/booking/${item.id}`)}
                      >
                        {item.status === "available" ? "Book" : "Booked"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    

        </div>
        
      </div>
    </div>
  );
};

export default Home;