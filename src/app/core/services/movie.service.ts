import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}
  getTrendingMovies(page: number): Observable<any> {
    return this.http.get(
      `${environment.baseurl}/trending/movie/week?page=${page}&api_key=${environment.apiKey}`
    );
  }

  getPopularMovies(): Observable<any> {
    return this.http.get(
      `${environment.baseurl}/movie/popular?api_key=${environment.apiKey}`
    );
  }

  getTopRatedMovies(): Observable<any> {
    return this.http.get(
      `${environment.baseurl}/movie/top_rated?api_key=${environment.apiKey}`
    );
  }

  getNowPlayingMovies(): Observable<any> {
    return this.http.get(
      `${environment.baseurl}/movie/now_playing?api_key=${environment.apiKey}`
    );
  }

  getUpcomingMovies(): Observable<any> {
    return this.http.get(
      `${environment.baseurl}/movie/upcoming?api_key=${environment.apiKey}`
    );
  }
  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(
      `${environment.baseurl}/movie/${movieId}?api_key=${environment.apiKey}`
    );
  }
  getMovieVideos(movieId: number): Observable<any> {
    return this.http.get(
      `${environment.baseurl}/movie/${movieId}/videos?api_key=${environment.apiKey}`
    );
  }
  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get(
      `${environment.baseurl}/movie/${movieId}/credits?api_key=${environment.apiKey}`
    );
  }
  getSimilarMovies(movieId: number | null): Observable<any> {
    return this.http.get(
      `${environment.baseurl}/movie/${movieId}/similar?api_key=${environment.apiKey}`
    );
  }
}
