import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LayerPresenter } from './components/layer-presenter/layer-presenter.component';
import { LayerService } from './services/layer.service';

@Directive({
  selector: '[appFreeDragging]'
})
export class FreeDraggingDirective implements OnInit, OnDestroy {
  private nativeElement: HTMLElement ;

  private subscriptions: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: any,
    private layerPresenter : LayerPresenter,
    private layerService: LayerService
  ) {
    this.nativeElement = this.elementRef.nativeElement as HTMLElement;
  }

  ngOnInit(): void {
    this.initDrag();
  }

  initDrag(): void {
    let isDragging = false ;
    const dragStart$ = fromEvent<MouseEvent>(this.nativeElement, "mousedown");
    const dragEnd$ = fromEvent<MouseEvent>(this.document, "mouseup");
    const drag$ = fromEvent<MouseEvent>(this.document, "mousemove").pipe(
      takeUntil(dragEnd$)
    );

    //skip the 'div_' prefix to get the layerId
    let layerId = +this.nativeElement.id.substring(4,this.nativeElement.id.length) ;
    let layer = this.layerService.getLayerById(layerId)! ;
    
    let initialX: number,
      initialY: number,
      currentX = 0,
      currentY = 0;

    let dragSub: Subscription ;

    // 3
    const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {
      console.log({id: layerId, cx: currentX, cy:currentY}); 

      let idx = layer.deltaX ;
      let idy = layer.deltaY ;
      initialX = event.clientX - currentX ;
      initialY = event.clientY - currentY ;
      isDragging = true ;
      //TODO shadow effect -> change to graying out the element ?
      this.nativeElement.classList.add('free-dragging');

      // 4
      dragSub = drag$.subscribe((event: MouseEvent) => {
        if(isDragging) {
          event.preventDefault();
          
          currentX = event.clientX - initialX + idx;
          currentY = event.clientY - initialY + idy;

          this.layerPresenter.moveLayer(layerId, currentX, currentY);
        }
      });
    });

    // 5
    const dragEndSub = dragEnd$.subscribe(() => {
      initialX = currentX;
      initialY = currentY;

      this.nativeElement.classList.remove('free-dragging');
      if (dragSub) {
        dragSub.unsubscribe();
      }

      isDragging = false ;
    });

    // 6
    this.subscriptions.push.apply(this.subscriptions, [
      dragStartSub,
      dragSub!,
      dragEndSub,
    ]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s?.unsubscribe());
  }
}