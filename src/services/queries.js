import { checkError, client } from './client.js';

export async function getMovies() {
  // return the list of all movies
  const resp = await client.from('movies').select('*');
  return checkError(resp);
}
//pass

export async function getMoviesWithDirector() {
  const resp = await client.from('movies').select('director_id, directors (name)');
  return checkError(resp);
  // return the list of all the movies with their director
}
//pass

export async function getDirectorNames() {
  const resp = await client.from('directors').select('name');
  return checkError(resp);
  // return the list of the director's names
}
//pass

export async function getMovieById(id) {
  const resp = await client.from('movies').select('title').match({ id: id }).single();
  return checkError(resp);
  // return the movie with the given id
}
//pass

export async function getMovieByTitle(title) {
  const resp = await client.from('movies').select('id').match({ title: title }).single();
  return checkError(resp);
  // return the movie with the given title
}
//pass

export async function getOldestMovie() {
  const resp = await client.from('movies').select('*').lt('year', '1978').single();
  //const resp = await client.from('movies').select('*').gt('year', 0).limit(1).single();
  return checkError(resp);
  // return the oldest movie (assume the database is not sorted)
}
//pass

export async function getMoviesAfter(year) {
  const resp = await client.from('movies').select('*').gt('year', [year]);
  return checkError(resp);
  // return movies made after the year passed in
}
//pass

export async function getHighestGrossingMovie() {
  const resp = await client
    .from('movies')
    .select('*')
    .order('box_office', { ascending: false })
    // .lt('box_office', 999999999999999)
    .limit(1)
    .single();
  return checkError(resp);
  // return movie with the highest box office total
}
//pass
