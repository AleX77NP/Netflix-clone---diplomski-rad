export const getVideoUrl = (movieId) => {
    let url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=c813a80de770f15206944313060693d8&language=en-US`
    return url;
}