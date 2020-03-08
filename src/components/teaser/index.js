import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

export default function Teaser({ show }) {
  if (!show) return null;

  return (
    <article className="teaser">
      <Link to={`/shows/${show.id}`} className="teaser__poster">
        <img
          className="teaser__image"
          src={show.image.medium}
          alt={show.name}
        />
      </Link>
      <h2 className="teaser__title">
        <Link to={`/shows/${show.id}`} className="teaser__link">
          {show.name}
        </Link>
      </h2>
      <div className="teaser__year">({show.premiered.split("-")[0]})</div>
    </article>
  );
}
