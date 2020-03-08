import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchEpisodesByShow } from "../../redux/actions";
import {
  makeGetEpisodesByShow,
  getEpisodesPending,
  getEpisodesError
} from "../../redux/reducers/episodes";

import "./styles.scss";

export default function EpisodesList({ showId }) {
  const dispatch = useDispatch();
  const getEpisodes = useMemo(() => makeGetEpisodesByShow(showId), [showId]);
  const episodes = useSelector(state => getEpisodes(state, showId));
  const pending = useSelector(getEpisodesPending);
  const error = useSelector(getEpisodesError);

  useEffect(() => {
    dispatch(fetchEpisodesByShow(showId));
  }, [dispatch, showId]);

  if (pending) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <section className="episodes-list">
      {episodes.map(episode => {
        return (
          <div className="episodes-list__item" key={episode.id}>
            <Link to={`/episode/${episode.id}`} className="episodes-list__link">
              <span className="episodes-list__season">{episode.season}</span>
              <span className="episodes-list__number">{episode.number}</span>
              <span className="episodes-list__name">{episode.name}</span>
              <span className="episodes-list__date">{episode.airdate}</span>
            </Link>
          </div>
        );
      })}
    </section>
  );
}
