import React, { useState, useEffect } from "react";
import SolveEnterName from "./SolveEnterName";

const SolveQuiz = props => {
  const [n, setn] = useState(1);
  const [UserData, setUserData] = useState([]);

  console.log(props);

  useEffect(() => {
    let id = props.match.params.id;
    let urlLink = `https://evening-taiga-99791.herokuapp.com/api/users/${id}`;

    let fetchUser = async url => {
      const res = await fetch(url);
      const res1 = await res.json();
      setUserData(res1);
    };

    fetchUser(urlLink);
  }, []);

  switch (n) {
    case 1:
      return <SolveEnterName userdata={UserData} />;
    default:
      break;
  }
};
export default SolveQuiz;
