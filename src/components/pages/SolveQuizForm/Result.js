import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
let Result = props => {
  const [Result, setResult] = useState([]);
  const [Name, setName] = useState("");
  useEffect(() => {
    let id = props.match.params.id;
    let urlLink = `${process.env.REACT_APP_BACKEND_URL}/api/users/${id}`;

    let fetchUser = async url => {
      const res = await fetch(url);
      const res1 = await res.json();
      setName(res1.name);
      setResult(res1.results);
    };

    fetchUser(urlLink);
  }, []);
  return (
    <div class="container">
      <br />
      <br />

      <p class="font-weight-bolder text-uppercase text-center">
        <h3>results:</h3>
      </p>
      <p class="mb-3" />
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Score (out of 8)</th>
          </tr>
        </thead>
        <tbody>
          {Result.map((res, id) => {
            return (
              <tr>
                <th scope="row">{id + 1}</th>
                <td>{res.name}</td>
                <td>{res.result}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <br />
      <Link to={"/quiz/" + props.match.params.id}>
        <button type="button" class="btn btn-outline-primary">
          Solve {Name}'s Quiz
        </button>
      </Link>
      <br />
      <br />
      <h5>
        Now it's your turn. Create a quiz about yourself and send it to your
        friends!
      </h5>
      <Link to={"/quiz"}>
        <button type="button" class="btn btn-outline-primary">
          Create Your Quiz
        </button>
      </Link>
    </div>
  );
};

export default Result;
