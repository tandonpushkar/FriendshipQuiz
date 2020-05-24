import React, { useState } from "react";
import EnterName from "./CreateEnterName";

const IndexForm = props => {
  const [n, setn] = useState(1);

  switch (n) {
    case 1:
      return <EnterName />;
    default:
      break;
  }
};
export default IndexForm;
