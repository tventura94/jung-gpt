import * as React from "react";
import Logo from "../logos/jung-gpt-logo.webp";

export default function Nav() {
  return (
    <div className="nav">
      <img src={Logo} className="nav-logo" />
    </div>
  );
}
