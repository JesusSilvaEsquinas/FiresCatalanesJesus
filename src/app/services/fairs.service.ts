import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Fair } from '../models/fair';

@Injectable({
  providedIn: 'root'
})
export class FairsService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  constructor(private readonly http: HttpClient) {}

  getFairs(): Observable<Fair[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return of([]);
    }
    const url = new URL('fairs.json', this.document.baseURI).toString();
    return this.http.get<Fair[]>(url);
  }
}
