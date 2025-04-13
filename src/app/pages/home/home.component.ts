import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { Imovie } from '../../shared/imovie';
import { RouterLink } from '@angular/router';
import { YearOnlyPipe } from '../../shared/pipes/year-only.pipe';
@Component({
  selector: 'app-home',
  imports: [RouterLink, YearOnlyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly movieService = inject(MovieService);
  private readonly renderer2 = inject(Renderer2);
  private readonly el = inject(ElementRef);
  showScrollTopBtn = false;
  posterPath: string = 'https://image.tmdb.org/t/p/w500';
  currentPage: number = 1;
  totalPages: number = 0;
  allTrendingMovies: WritableSignal<Imovie[]> = signal([]);
  allPopularMovies: WritableSignal<Imovie[]> = signal([]);
  allTopRatedMovies: WritableSignal<Imovie[]> = signal([]);
  allUpcomingMovies: WritableSignal<Imovie[]> = signal([]);
  ngOnInit(): void {
    this.renderer2.listen('window', 'scroll', () => {
      const hero = this.el.nativeElement.querySelector('hero');
      const heroHeight = hero?.offsetHeight || 300;

      const scrollY =
        window.pageYOffset || document.documentElement.scrollTop || 0;

      this.showScrollTopBtn = scrollY > heroHeight;
    });
    this.getTrendingMovies();
    this.getPopularMovies();
    this.getTopRatedMovies();
    this.getUpcomingMovies();
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  getTrendingMovies(page: number = 1): void {
    this.movieService.getTrendingMovies(page).subscribe({
      next: (res) => {
        this.currentPage = res.page;
        this.totalPages = res.total_pages;
        this.allTrendingMovies.set(res.results);
        console.log(this.allTrendingMovies());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getPopularMovies(): void {
    this.movieService.getPopularMovies().subscribe({
      next: (res) => {
        this.allPopularMovies.set(res.results);
        console.log(this.allPopularMovies());
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
        console.log(this.allTopRatedMovies());
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
        console.log(this.allUpcomingMovies());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.getTrendingMovies(page);
    }
  }
}
