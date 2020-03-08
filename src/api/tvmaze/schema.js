import { schema } from "normalizr";

export const show = new schema.Entity("shows");
export const episode = new schema.Entity("episodes");
export const shows = [show];
export const episodes = [episode];
