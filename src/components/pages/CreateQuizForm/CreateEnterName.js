import React, { useState } from "react";

import CreateQuiz from "./CreateQuiz";

const EnterName = props => {
  const [name, setname] = useState("");
  const [quesDisplay, setquesDisplay] = useState(true);
  const [gender, setgender] = useState("Female");

  let nameSubmit = e => {
    e.preventDefault();
    setquesDisplay(false);
  };

  if (quesDisplay) {
    return (
      <div
        style={{
          height: "600px"
        }}>
        <div
          class="card-body  font-weight-bold"
          style={{
            backgroundColor: "#21D4FD",
            backgroundImage: "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)",
            color: "#e2f3f5"
          }}>
          <form onSubmit={nameSubmit}>
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-2 col-form-label">
                Enter Your Name
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  onChange={e => setname(e.target.value)}
                  id="name"
                  name="name"
                  class="form-control"
                />
              </div>
            </div>

            <fieldset class="form-group">
              <div class="row">
                <legend class="col-form-label col-sm-2 pt-0">Gender</legend>
                <div class="col-sm-10">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={e => setgender(e.target.value)}
                    />
                    <label class="form-check-label" for="gridRadios1">
                      Female
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={e => setgender(e.target.value)}
                    />
                    <label class="form-check-label" for="gridRadios2">
                      Male
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>

            <div class="form-group row">
              <div class="col-sm-10">
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div >
    );
  } else {
    return <CreateQuiz name={name} />;
  }
};

export default EnterName;
