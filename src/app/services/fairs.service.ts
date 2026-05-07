import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Fair } from '../models/fair';

@Injectable({
  providedIn: 'root'
})
export class FairsService {
  private readonly platformId = inject(PLATFORM_ID);

  constructor(private readonly http: HttpClient) {}

  getFairs(): Observable<Fair[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return of([]);
    }
    return this.http.get<Fair[]>('/fairs.json');
  }
}
