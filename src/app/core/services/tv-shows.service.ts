import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments';

@Injectable({
  providedIn: 'root',
})
export class TvShowsService {
  constructor(private http: HttpClient) {}
  getTrendingTVShows(): Observable<any> {
    return this.http.get(
      `${environment.baseurl}/trending/tv/week?api_key=${environment.apiKey}`
    );
  }
  getPopularTVShows(page: number): Observable<any> {
    return this.http.get(
      `${environment.baseurl}/tv/popular?api_key=${environment.apiKey}&page=${page}`
    );
  }
  getTvShowDetails(id: number): Observable<any> {
    return this.http.get(
      `${environment.baseurl}/tv/${id}?api_key=${environment.apiKey}`
    );
  }
}
