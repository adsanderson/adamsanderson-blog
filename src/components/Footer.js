import React from "react";
import { Link } from "gatsby";

const Footer = class extends React.Component {
  render() {
    return (
      <nav className="nav">
        <div className="bio">
          <div className="logo">
            <img
              src="https://www.gravatar.com/avatar/7b1630c267230ec687dd7133d3a2e2b3?s=80"
              class="logo__img"
              alt="Adam Sanderson"
            ></img>
          </div>
          A front-end developer based out of Hastings, UK
        </div>
        <Link className="nav__link" to="/">
          Home
        </Link>
        <a
          href="https://github.com/adsanderson"
          className="nav__link"
          title="Github"
        >
          github
        </a>
        <a
          href="https://twitter.com/lazydayed"
          className="nav__link"
          title="Twitter"
        >
          twitter
        </a>
        <a
          href="mailto:adam+site@adamsanderson.co.uk"
          className="nav__link"
          rel="me"
        >
          email
        </a>
      </nav>
    );
  }
};

export default Footer;
