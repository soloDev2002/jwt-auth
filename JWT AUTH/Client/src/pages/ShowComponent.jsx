import React from "react";
import { useParams } from "react-router-dom";
import Tab1 from "../components/Tab1";
import Tab2 from "../components/Tab2";

function ShowComponent() {
  const { tab } = useParams();
  return <div>{tab === "tab1" ? <Tab1 /> : <Tab2 />}</div>;
}

export default ShowComponent;
