import { Directive, ElementRef, Input, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLoading]',
  standalone: true
})
export class LoadingDirective {

  @Input() appLoading: boolean = false;
  @Input() appLoadingHeight: string = '';
  @Input() appLoadingWidth: string = '';
  @Input() appLoadingClass: string = '';

  private skeletonElement: HTMLElement | null = null;
  private originalDisplay: string = '';

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appLoading']) {
      this.updateView();
    }
  }

  private updateView(): void {
    if (this.appLoading) {
      this.showSkeleton();
    } else {
      this.hideSkeleton();
    }
  }

  private showSkeleton(): void {
    // Ocultar el contenido original
    const nativeElement = this.elementRef.nativeElement;
    this.originalDisplay = window.getComputedStyle(nativeElement).display;
    this.renderer.setStyle(nativeElement, 'display', 'none');

    // Crear elemento esqueleto
    this.skeletonElement = this.renderer.createElement('div');
    this.renderer.addClass(this.skeletonElement, 'skeleton-loader');

    // Aplicar estilos
    if (this.appLoadingHeight) {
      this.renderer.setStyle(this.skeletonElement, 'height', this.appLoadingHeight);
    } else {
      // Si no se especifica altura, usar la del elemento original
      const height = nativeElement.offsetHeight || '20px';
      this.renderer.setStyle(this.skeletonElement, 'height', height + 'px');
    }

    if (this.appLoadingWidth) {
      this.renderer.setStyle(this.skeletonElement, 'width', this.appLoadingWidth);
    } else {
      // Si no se especifica ancho, usar el del elemento original
      const width = nativeElement.offsetWidth || '100%';
      this.renderer.setStyle(this.skeletonElement, 'width', width);
    }

    // Aplicar clases personalizadas
    if (this.appLoadingClass) {
      const classes = this.appLoadingClass.split(' ');
      classes.forEach(className => {
        this.renderer.addClass(this.skeletonElement, className);
      });
    }

    // Insertar el esqueleto después del elemento original
    this.renderer.insertBefore(
      nativeElement.parentNode,
      this.skeletonElement,
      nativeElement.nextSibling
    );
  }

  private hideSkeleton(): void {
    // Mostrar el contenido original
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', this.originalDisplay);

    // Eliminar el esqueleto si existe
    if (this.skeletonElement && this.skeletonElement.parentNode) {
      this.renderer.removeChild(
        this.skeletonElement.parentNode,
        this.skeletonElement
      );
      this.skeletonElement = null;
    }
  }
  }
