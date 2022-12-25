import React from "react";
import { useParams } from "react-router-dom";

const CurrentUserEditPage = () => {
  const params = useParams();
  console.log(params);
  return <div>CurrentUserEditPage</div>;
};

export default CurrentUserEditPage;
