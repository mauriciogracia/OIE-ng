import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
    private layerService: LayerService
  ) {
    this.nativeElement = this.elementRef.nativeElement as HTMLElement;
  }

  ngOnInit(): void {
    this.initDrag();
  }

  initDrag(): void {
    const dragStart$ = fromEvent<MouseEvent>(this.nativeElement, "mousedown");
    const dragEnd$ = fromEvent<MouseEvent>(this.document, "mouseup");
    const drag$ = fromEvent<MouseEvent>(this.document, "mousemove").pipe(
      takeUntil(dragEnd$)
    );

    let initialX: number,
      initialY: number,
      currentX = 0,
      currentY = 0;

    let dragSub: Subscription ;

    // 3
    const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX;
      initialY = event.clientY - currentY;

      //TODO shadow effect -> change to graying out the element ?
      this.nativeElement.classList.add('free-dragging');

      // 4
      dragSub = drag$.subscribe((event: MouseEvent) => {
        event.preventDefault();
        
        currentX = event.clientX - initialX;
        currentY = event.clientY - initialY;

        //slip the 'div_' prefix to get the layerId
        let layerId = +this.nativeElement.id.substring(4,this.nativeElement.id.length) ;
        this.layerService.moveLayer(layerId,currentX, currentY, this.nativeElement) ;
        //this.nativeElement.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
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