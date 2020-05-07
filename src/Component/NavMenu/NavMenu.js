import React from "react";
import { Link } from "react-router-dom";
import './nav.css'

export default function NavMenu(props) {
  return (
    <>
    <div className='navbar'>
      <Link className='links' to={"/arts-crafts"}>Arts & Crafts</Link>
      <Link className='links' to={"/music-dance"}>Music & Dance</Link>
      <Link className='links' to={"/outdoor-activities"}>Outdoor activities</Link>
      <Link className='links' to={'/sport-fitness'}>Sport & Fitnesss</Link>
      <Link className='links' to={"/books-films"}>Books & Films</Link>
      <Link className='links' to={"/tutoring"}>Tutoring</Link>
    </div>
    </>
  );
}
