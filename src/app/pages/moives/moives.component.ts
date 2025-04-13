import {
  Component,
  HostListener,
  inject,
  NgModule,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { Imovie } from '../../shared/imovie';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { YearOnlyPipe } from '../../shared/pipes/year-only.pipe';

@Component({
  selector: 'app-moives',
  imports: [RouterLink, FormsModule, SearchPipe, YearOnlyPipe],
  templateUrl: './moives.component.html',
  styleUrl: './moives.component.scss',
})
export class MoivesComponent implements OnInit {
  private readonly movieService = inject(MovieService);
  private readonly activatedRoute = inject(ActivatedRoute);
  showScrollTopBtn = false;
  @HostListener('window:scroll', []) onWindowScroll() {
    const heroSectionHeight =
      document.getElementById('hero')?.offsetHeight || 300;
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.showScrollTopBtn = scrollPosition > heroSectionHeight;
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  posterPath: string = 'https://image.tmdb.org/t/p/w500';
  searchQuery: string = '';
  allPopularMovies: WritableSignal<Imovie[]> = signal([]);
  allTopRatedMovies: WritableSignal<Imovie[]> = signal([]);
  allNowPlayingMovies: WritableSignal<Imovie[]> = signal([]);
  allUpcomingMovies: WritableSignal<Imovie[]> = signal([]);
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        let MovieId = Number(p.get('id'));
        this.getMovieDetails(MovieId);
      },
    });
    this.getPopularMovies();
    this.getTopRatedMovies();
    this.getNowPlayingMovies();
    this.getUpcomingMovies();
  }
  getPopularMovies(): void {
    this.movieService.getPopularMovies().subscribe({
      next: (res) => {
        this.allPopularMovies.set(res.results);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getTopRatedMovies(): void {
    this.movieService.getTopRatedMovies().subscribe({
      next: (res) => {
        this.allTopRatedMovies.set(res.results);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getNowPlayingMovies(): void {
    this.movieService.getNowPlayingMovies().subscribe({
      next: (res) => {
        this.allNowPlayingMovies.set(res.results);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getUpcomingMovies(): void {
    this.movieService.getUpcomingMovies().subscribe({
      next: (res) => {
        this.allUpcomingMovies.set(res.results);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getMovieDetails(MovieId: number): void {
    this.movieService.getMovieDetails(MovieId).subscribe({
      next: () => {},
      error: (err) => {
        console.log(err);
      },
    });
  }
}
