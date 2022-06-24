import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  // const [req, setReq] = useState();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const fetchData = async () => {
    const slotList = await axios.get("http://localhost:3006/slot");
    setData(slotList.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  // const fetchRequest = async () => {
  //   const reqList = await axios.get("http://localhost:3006/request");
  //   setReq(reqList.req);
  // };
  // useEffect(() => {
  //   fetchRequest();
  // }, []);
  



  return (
    <div className="container">
      <div className="row  d-flex flex-column">
   
        <div className="col-md-10 mx-auto my-4">
        <h2 className="text-lg-center pt-2">
            Hi {username}, your role is {role}
          </h2>
        <div class="container py-5">
  <div class="row">
    <div class="col">
    <Link
         to={`/`}
         className="btn btn-sm btn-primary mr-1"
         >
        Home
       </Link>
    </div>
    <div class="col">
    <Link
         to={`/request`}
         className="btn btn-sm btn-primary mr-1"
         >
        Request
        </Link>
    </div>
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
        {/* <div className="col-md-10 mx-auto my-4">
          <h2 className="text-lg-center">
            Request Slot:
          </h2>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Status</th>
                <th scope="col">Location</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {req?.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.startBooking}</td>
                  <td>{item.endBooking}</td>
                  <td>{item.status}</td>
                  <td>{item.location}</td>
                  <td className="d-flex flex-row">
                    
                      <div>
                        <Link
                          to={`/edit/${item.id}`}
                          className="btn btn-sm btn-primary mr-1"
                        >
                          Edit
                        </Link>
                    
                      </div>
                 
           
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
        
      </div>
    </div>
  );
};

export default Home;