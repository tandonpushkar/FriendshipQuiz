import React, { useState } from "react";
import SolveQuiz from "./SolveQuiz";
import { Link } from "react-router-dom";
const EnterName = props => {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [quesDisplay, setquesDisplay] = useState(true);
  const [gender, setgender] = useState("Female");

  let nameSubmit = e => {
    e.preventDefault();
    setquesDisplay(false);
  };
  let passwordSubmit = e => {
    e.preventDefault();
    setquesDisplay(false);
  };

  if (quesDisplay) {
    return (
      <div class="container" >
        <p class="mb-5" />
        <div class="card text-center text-white font-weight-bolder text-uppercase p-2 mb-4" style={{
          backgroundImage: "radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% )"
        }}>
          <h3> Quiz about {props.userdata.name}</h3>
        </div>
        <div class="card text-center text-white font-weight-bolder p-2" style={{
          background: "linear-gradient(to right, #0575e6, #021b79)"
        }}>

          Here is the quiz created by {props.userdata.name}. <br />Accept the
            challenge and answer 10 questions to find out how well you really
            know your friend!

        </div>
        <div class="card-body  font-weight-bold" style={{
          backgroundColor: "#21D4FD",
          backgroundImage: "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)",
          color: "#e2f3f5"
        }}>
          <form onSubmit={nameSubmit}>
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-2 col-form-label">
                Name
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
              <div class="col-sm-10" style={{ display: "flex", justifyContent: "space-evenly" }}>
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
                <Link to={"/result/" + props.userdata._id}>
                  <button type="submit" class="btn btn-primary">
                    Check all the results
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* <form onSubmit={passwordSubmit} className="homeform">
          <h1>Are you {props.userdata.name} ?</h1>
          <br />
          <label for="fname">Enter your password:</label>
          <br />
          <input
            type="text"
            onChange={e => setpassword(e.target.value)}
            id="password"
            name="password"
          />
          <br />
        </form> */}
      </div>
    );
  } else {
    return (
      <SolveQuiz
        name={name}
        sendername={props.userdata.name}
        SenderAnswer={props.userdata.data}
        id={props.userdata._id}
      />
    );
  }
};

export default EnterName;
