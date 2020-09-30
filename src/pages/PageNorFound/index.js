import React from 'react';
import { NavLink } from 'react-router-dom';
const PageNotFound = () => {
  const prefix = 'pageNotFound';
  return (
    <>
      <section className={prefix}>
        <NavLink exact to="/">
          Back to Home
        </NavLink>
        <img src="./img/pagenotfound.png" alt="img" />
      </section>
    </>
  );
};

export default PageNotFound;
