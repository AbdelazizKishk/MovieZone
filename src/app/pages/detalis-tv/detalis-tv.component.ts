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
import { ActivatedRoute } from '@angular/router';
import { Itvshowsdetalis } from '../../shared/itvshowsdetalis';
import { YearOnlyPipe } from '../../shared/pipes/year-only.pipe';

@Component({
  selector: 'app-detalis-tv',
  imports: [YearOnlyPipe],
  templateUrl: './detalis-tv.component.html',
  styleUrl: './detalis-tv.component.scss',
})
export class DetalisTvComponent implements OnInit {
  private readonly tvShowsService = inject(TvShowsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly renderer2 = inject(Renderer2);
  private readonly el = inject(ElementRef);
  showBtnTop: boolean = false;
  allTvDetalis: WritableSignal<Itvshowsdetalis[]> = signal([]);
  posterPath: string = 'https://image.tmdb.org/t/p/w500';
  ngOnInit(): void {
    this.renderer2.listen('window', 'scroll', () => {
      const hero = this.el.nativeElement.querySelector('hero');
      const heroHeight = hero?.offsetHeight || 300;

      const scrollY =
        window.pageYOffset || document.documentElement.scrollTop || 0;

      this.showBtnTop = scrollY > heroHeight;
    });
    this.getTvShowDetails();
  }
  getTvShowDetails(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        let showId = Number(p.get('id'));
        this.tvShowsService.getTvShowDetails(showId).subscribe({
          next: (res) => {
            this.allTvDetalis.set([res]);
            console.log(this.allTvDetalis());
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
