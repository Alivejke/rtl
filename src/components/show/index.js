import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { sanitize } from "dompurify";
import { useDispatch, useSelector } from "react-redux";

import { fetchShows } from "../../redux/actions";
import { makeGetShow, getShowsPending, getShowsError } from "../../redux/reducers/shows";
import EpisodesList from "../episodes-list";

import "./styles.scss"

export default function Show() {
  const params = useParams();
  const id = parseInt(params.id);
  const dispatch = useDispatch();
  const pending = useSelector(getShowsPending);
  const error = useSelector(getShowsError);

  // This optimization is not needed here in fact, it's just for the reference
  // for cases when the selector is used in multiple component instances
  const getShow = useMemo(() => makeGetShow(id), [id]);
  const show = useSelector(state => getShow(state, id));

  useEffect(() => {
    dispatch(fetchShows([id]));
  }, [dispatch, id]);

  if (pending) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (!show) return null;

  return (
    <React.Fragment>
      <article className="show">
        <div className="show__poster">
          <img className="show__image" src={show.image.medium} alt={show.name} />
        </div>
        <div className="show__info">
          <h2 className="show__title">
            {show.name}
          </h2>
          <p
            className="show__descr"
            dangerouslySetInnerHTML={{ __html: sanitize(show.summary)}}
          />
        </div>
        <div className="show__card">
          <h3 className="show__card-title">Show Info:</h3>
          <ul className="show__card-list">
            <li className="show__card-list-item">
              <span className="show__card-list-title">
                Network:
              </span>
              <span className="show__card-list-descr">
                {show.network.name}
              </span>
            </li>
            <li className="show__card-list-item">
              <span className="show__card-list-title">
                Genres:
              </span>
              <span className="show__card-list-descr">
                {show.genres.join(', ')}
              </span>
            </li>
            <li className="show__card-list-item">
              <span className="show__card-list-title">
                Status:
              </span>
              <span className="show__card-list-descr">
                {show.status}
              </span>
            </li>
            <li className="show__card-list-item">
              <span className="show__card-list-title">
                Show Type:
              </span>
              <span className="show__card-list-descr">
                {show.type}
              </span>
            </li>
          </ul>
        </div>
      </article>
      <EpisodesList showId={id} />
    </React.Fragment>
  );
}