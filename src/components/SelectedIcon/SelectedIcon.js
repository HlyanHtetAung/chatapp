import React from "react";

const SelectedIcon = ({ Icon }) => {
  return <div>{Icon ? <Icon /> : null}</div>;
};

export default SelectedIcon;
