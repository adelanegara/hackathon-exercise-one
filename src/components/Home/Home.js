import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Home = () => {
    const [data, setData] = useState();
    const fetchData = async () => {
        const tradeList = await axios.get("http://localhost:3006/slot");
        setData(tradeList.data);
      };
      useEffect(() => {
        fetchData();
      }, []);
  return (
    <div>    <h1>Book Parking </h1>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Type</th>
          <th scope="col">Date</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{item.type}</td>
            <td>{item.date}</td>
            <td>{item.status}</td>
            <td className="d-flex flex-row">
              <button
                className="btn btn-sm btn-primary mr-1"
              >
                Book
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table></div>
  )
}

export default Home