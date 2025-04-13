import {
  Component,
  HostListener,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { Detalismovies } from '../../shared/detalismovies';
import { SafeurlPipe } from '../../shared/pipes/safeurl.pipe';
import { Icast } from '../../shared/icast';
import { Isimiler } from '../../shared/isimiler';
import { YearOnlyPipe } from '../../shared/pipes/year-only.pipe';

@Component({
  selector: 'app-detalis',
  imports: [SafeurlPipe, YearOnlyPipe],
  templateUrl: './detalis.component.html',
  styleUrl: './detalis.component.scss',
})
export class DetalisComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly movieService = inject(MovieService);
  showScrollTopBtn = false;
  @HostListener('window:scroll', []) onWindowScroll() {
    const heroSectionHeight = 300;
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
  MovieId: number | null = null;
  trailerUrl: string | null = null;
  posterPath: string = 'https://image.tmdb.org/t/p/w500';
  //movieList: Detalismovies[] = [];
  movieList: WritableSignal<Detalismovies[]> = signal([]);
  cast: WritableSignal<Icast[]> = signal([]);
  similarMovies: WritableSignal<Isimiler[]> = signal([]);
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        let MovieId = Number(p.get('id'));
        this.getMovieDetails(MovieId);
        this.getMovieVideos(MovieId);
        this.getMovieCredits(MovieId);
      },
    });
  }
  getMovieDetails(MovieId: number): void {
    this.movieService.getMovieDetails(MovieId).subscribe({
      next: (res) => {
        console.log(res);
        this.movieList.set([res]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getMovieVideos(MovieId: number): void {
    this.movieService.getMovieVideos(MovieId).subscribe({
      next: (res) => {
        console.log(res);
        const trailer = res.results.find(
          (vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );
        if (trailer) {
          this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
        }
        console.log(this.trailerUrl);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getMovieCredits(MovieId: number): void {
    this.movieService.getMovieCredits(MovieId).subscribe({
      next: (res) => {
        console.log(res.cast);
        this.cast.set(res.cast);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
