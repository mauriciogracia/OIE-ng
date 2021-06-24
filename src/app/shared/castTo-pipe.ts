import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'castTo',
  pure: true,
})

export class CastTo implements PipeTransform {

  transform<T>(value: any, clss: new (...args: any[]) => T): T {
    return value as T;
  }

}