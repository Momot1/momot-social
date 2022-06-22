import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Home() {
  const user = useSelector((state) => state.user);

  return <div>Home</div>;
}

export default Home;
