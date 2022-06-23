import React from "react";

const Add = () => {

  return (
    <div className="container-fluid" data-testid="container-add">
      <h1 className="text-lg-center pt-5">Add New slot</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form >
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Date yyyy-mmmm-dddd"
                // value={title}
                // onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Status"
                // value={url}
                // onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="form-group pt-3">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add Slot"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
