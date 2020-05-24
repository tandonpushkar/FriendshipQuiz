import React, { useState, useEffect } from "react";
import SolveEnterName from "./SolveEnterName";

const SolveQuiz = props => {
  const [n, setn] = useState(1);
  const [UserData, setUserData] = useState([]);

  useEffect(() => {
    let id = props.match.params.id;
    let urlLink = `${process.env.REACT_APP_BACKEND_URL}/api/users/${id}`;

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
