import axios from "axios";

const client = axios.create({
  baseURL: "http://api.tvmaze.com/"
});

export function fetchShow(id) {
  return client.get(`/shows/${id}`);
}

export function fetchShows(ids = []) {
  const requests = ids.map(id => fetchShow(id));

  return Promise.all(requests).then(response => {
    return response.map(item => {
      return item.data;
    });
  });
}

export function fetchEpisodesByShow(id) {
  return client.get(`/shows/${id}/episodes`).then(response => response.data);
}

export function fetchEpisode(id) {
  return client.get(`/episodes/${id}`).then(response => response.data);
}
