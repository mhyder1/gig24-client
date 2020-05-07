import React from "react";
import { Link } from "react-router-dom";

export default function NavMenu(props) {
  return (
    <>
      <Link to={"/"}>Arts & Crafts</Link>
      <Link to={"/"}>Music & Dance</Link>
      <Link to={"/"}>Outdoor activities</Link>
      <Link to={"/"}>Sport & Fitnesss</Link>
      <Link to={"/"}>Storytelling & Movies</Link>
      <Link to={"/"}>Tutoring</Link>
    </>
  );
}
