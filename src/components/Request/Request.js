import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();

  const fetchData = async () => {
    const reqList = await axios.get("http://localhost:3006/request");
    setData(reqList.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row  d-flex flex-column">
<div className="col-md-10 mx-auto my-4">
        <h2 className="text-lg-center pt-2">
           Request Slot:
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
                <th scope="col">Start Booking</th>
                <th scope="col">End Booking</th>
                <th scope="col">Status</th>
                <th scope="col">Location</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.startBooking}</td>
                  <td>{item.endBooking}</td>
                  <td>{item.status}</td>
                  <td>{item.location}</td>
                  <td className="d-flex flex-row">
                    
                      <div>
                        <Link
                          to={`/approve`}
                          className="btn btn-sm btn-primary mr-1"
                        >
                          Approve
                        </Link>
                    
                      </div>

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