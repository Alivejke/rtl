import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchShows } from "../../redux/actions";
import {
  getShows,
  getShowsPending,
  getShowsError
} from "../../redux/reducers/shows";
import Teaser from "../teaser";

import "./styles.scss";

// Static list for test purposes
const favoriteShowIds = [6771, 1955, 26437];

export default function TeasersList() {
  const dispatch = useDispatch();
  const shows = useSelector(getShows);
  const pending = useSelector(getShowsPending);
  const error = useSelector(getShowsError);

  useEffect(() => {
    dispatch(fetchShows(favoriteShowIds));
  }, [dispatch]);

  if (pending) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (!shows.length) return null;

  return (
    <section className="teasers-list">
      {shows.map(show => (
        <Teaser show={show} key={show.id} />
      ))}
    </section>
  );
}
