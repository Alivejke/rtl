import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sanitize } from "dompurify";

import { fetchEpisode } from "../../redux/actions";
import {
  makeGetEpisode,
  getEpisodesPending,
  getEpisodesError
} from "../../redux/reducers/episodes";

import "./styles.scss";

export default function Episode() {
  const params = useParams();
  const id = parseInt(params.id);
  const dispatch = useDispatch();
  const pending = useSelector(getEpisodesPending);
  const error = useSelector(getEpisodesError);

  // This optimization is not needed here in fact, it's just for the reference
  // for cases when the selector is used in multiple component instances
  const getEpisode = useMemo(() => makeGetEpisode(id), [id]);
  const episode = useSelector(state => getEpisode(state, id));

  useEffect(() => {
    dispatch(fetchEpisode([id]));
  }, [dispatch, id]);

  if (pending) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (!episode) return null;

  return (
    <article className="episode">
      <div className="episode__poster">
        {episode.image &&
          <img
            className="episode__image"
            src={episode.image.medium}
            alt={episode.name}
          />
        }
      </div>
      <div className="episode__info">
        <h1 className="episode__title">{episode.name}</h1>
        <p
          className="episode__descr"
          dangerouslySetInnerHTML={{ __html: sanitize(episode.summary) }}
        />
      </div>
    </article>
  );
}
