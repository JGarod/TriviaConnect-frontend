import { Component, HostListener, Input } from '@angular/core';
import { SocialService } from '../../../../../services/social/social.service';
import { CommonModule, DatePipe } from '@angular/common';
import { DatumActivity } from '../../../../../interfaces/social/social.interface';
import { JwtPayload, TokenService } from '../../../../../services/token-auth/token.service';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, merge, Subscription, throttleTime } from 'rxjs';
import { TimeAgoPipeModule } from '../../../../../pipe/time-ago.pipe.module';

@Component({
  selector: 'app-actividad',
  standalone: true,
  imports: [CommonModule, RouterLink, TimeAgoPipeModule],
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent {
  @Input() rIsLoading: boolean = false;
  private scrollSubscription?: Subscription;

 public activities: any[] = [];
 public page = 1;
 public limit = 2;
 public lastCreatedAt: string | null = null;
 public totalPages = 0;
 public loading = false;
  public userData: JwtPayload | null = null;
  private lastScrollTop: number = 0; 

  constructor(private socialService: SocialService, private tokenService: TokenService) { }

  ngOnInit() {
    this.userData = this.tokenService.getUserData();
    this.loadHistory();
    setTimeout(() => {
      this.setupScrollDetection();
    }, 100);
  }

  ngOnDestroy() {
    this.scrollSubscription?.unsubscribe();
  }
//agarra el id del padre de todos para referenciarse con el scroll y su funcion es realizar la busqueda cuando este al bottom de todo
  private setupScrollDetection(): void {
    const scrollContainer = document.getElementById('main-scroll-container');

    if (scrollContainer) {
      this.lastScrollTop = scrollContainer.scrollTop;

      // Agregar múltiples eventos para móvil
      this.scrollSubscription = merge(
        fromEvent(scrollContainer, 'scroll'),
        fromEvent(scrollContainer, 'touchmove'), // Para móvil
        fromEvent(scrollContainer, 'touchend')   // Cuando termina el touch
      ).pipe(
        throttleTime(150),
        distinctUntilChanged()
      ).subscribe(() => {
        // Pequeño delay para asegurar que el scroll se actualizó
        setTimeout(() => {
          this.checkScrollPosition(scrollContainer);
        }, 50);
      });

      // También escuchar resize para recalcular en cambio de orientación
      if (this.scrollSubscription) {
    this.scrollSubscription.add(
      fromEvent(window, 'resize').pipe(
        debounceTime(300)
      ).subscribe(() => {
        this.lastScrollTop = scrollContainer.scrollTop;
      })
    );
  }
    }
  }

  private checkScrollPosition(container: Element): void {
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    // Verificar dirección del scroll
    const isScrollingDown = scrollTop > this.lastScrollTop;

    if (!isScrollingDown) {
      this.lastScrollTop = scrollTop;
      return;
    }

    //  Threshold más estricto - solo cargar cuando esté MUY cerca del final
    const threshold = 50; // Reducir de 200 a 50px
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - threshold;
    const isVeryNearBottom = scrollPercentage >= 95; //  Al menos 95% del scroll

    // console.log('📊 Scroll Check:', {
    //   scrollTop: Math.round(scrollTop),
    //   scrollPercentage: Math.round(scrollPercentage),
    //   threshold,
    //   isNearBottom,
    //   isVeryNearBottom,
    //   canLoad: this.page <= this.totalPages && !this.loading
    // });

    this.lastScrollTop = scrollTop;

    //  Solo cargar si ambas condiciones se cumplen
    if (isNearBottom && isVeryNearBottom && this.page <= this.totalPages && !this.loading) {
      console.log('🚀 Loading more!');
      this.loadHistory();
    }
  }

  //cargar historial
  loadHistory() {
    if (this.loading) return;
    this.loading = true;

    this.socialService.getHistory(this.page, this.limit, this.lastCreatedAt ?? undefined)
      .subscribe(async res => {
        let organizadorTexto = await this.organizarActividad(res.data);
        console.log('organizadorTexto', organizadorTexto);
        this.activities = [...this.activities, ...organizadorTexto];
        this.totalPages = res.totalPages;
        if (res.lastCreatedAt) {
          // solo reemplazar si es más reciente que el actual
          if (!this.lastCreatedAt || new Date(res.lastCreatedAt) > new Date(this.lastCreatedAt)) {
            this.lastCreatedAt = res.lastCreatedAt;
          }
        }
        this.page++;
        this.loading = false;
      });
  }

  // 🚀 Detectar scroll de pantalla
  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
      if (this.page <= this.totalPages && !this.loading) {
        this.loadHistory();
      }
    }
  }

  // Click en "Cargar más"
  loadMore() {
    if (this.page <= this.totalPages && !this.loading) {
      this.loadHistory();
    }
  }


  //Armar el string de las actividades
  async organizarActividad(data: DatumActivity[]) {
    const historial: any[] = [];

    data.map(r => {
      const partes: { texto: string; slug?: string }[] = [];

      if (r.tipo === "Amistad") {
        if (r.usuario_a.id_usuario === this.userData?.id) {
          // Caso: Yo soy usuario_a
          partes.push({ texto: "Te hiciste amigo de " });
          partes.push({ texto: r.usuario_b.nombre_usuario, slug: `/profile/${r.usuario_b.slug}` });

        } else if (r.usuario_b.id_usuario === this.userData?.id) {
          // Caso: Yo soy usuario_b
          partes.push({ texto: "Te hiciste amigo de " });
          partes.push({ texto: r.usuario_a.nombre_usuario, slug: `/profile/${r.usuario_a.slug}` });

        } else {
          // Caso: ninguno soy yo
          partes.push({ texto: r.usuario_a.nombre_usuario, slug: `/profile/${r.usuario_a.slug}` });
          partes.push({ texto: " se hizo amigo de " });
          partes.push({ texto: r.usuario_b.nombre_usuario, slug: `/profile/${r.usuario_b.slug}` });
        }
      }

      // 🔹 Aquí se podrían añadir más tipos (comentario, sala, trofeo) igual que arriba

      historial.push({
        tipo: r.tipo,
        partesTexto: partes,
        createdAt: r.createdAt
      });
    });

    return historial;
  }


}
