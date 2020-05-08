import React from "react";
import {Link} from 'react-router-dom';


export default function Header() {
  return <><nav><Link to='/'>PARENT <span>&#9900;</span> CONNECT</Link>
  </nav></>;
}

//css example
// span {
//   content: "\26AC";
// }