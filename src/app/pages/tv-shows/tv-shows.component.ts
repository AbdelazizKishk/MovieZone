import {
  Component,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { TvShowsService } from '../../core/services/tv-shows.service';
import { Itvshows } from '../../shared/itvshows';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tv-shows',
  imports: [RouterLink],
  templateUrl: './tv-shows.component.html',
  styleUrl: './tv-shows.component.scss',
})
export class TvShowsComponent implements OnInit {
  private readonly tvShowsService = inject(TvShowsService);
  private readonly renderer2 = inject(Renderer2);
  private readonly el = inject(ElementRef);
  showBtnTop: boolean = false;

  allTrendingTVShows: WritableSignal<Itvshows[]> = signal([]);
  allPopularTVShows: WritableSignal<Itvshows[]> = signal([]);
  currentPage: number = 1;
  totalPages: number = 0;
  posterPath: string = 'https://image.tmdb.org/t/p/w500';

  ngOnInit(): void {
    this.renderer2.listen('window', 'scroll', () => {
      const hero = this.el.nativeElement.querySelector('hero');
      const heroHeight = hero?.offsetHeight || 300;

      const scrollY =
        window.pageYOffset || document.documentElement.scrollTop || 0;

      this.showBtnTop = scrollY > heroHeight;
    });
    this.getTrendingTVShows();
    this.getPopularTVShows();
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  getTrendingTVShows(): void {
    this.tvShowsService.getTrendingTVShows().subscribe({
      next: (res) => {
        this.allTrendingTVShows.set(res.results);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getPopularTVShows(page: number = 1): void {
    this.tvShowsService.getPopularTVShows(page).subscribe({
      next: (res) => {
        this.currentPage = res.page;
        this.totalPages = res.total_pages;
        this.allPopularTVShows.set(res.results);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.getPopularTVShows(page);
    }
  }
}
