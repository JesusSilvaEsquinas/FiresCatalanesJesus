import { Component, input, InputSignal } from '@angular/core';

import { Fair } from '../../../models/fair';
import { FavoritesService } from '../../../services/favorites.service';

// Usaremos la web que viene en el archivo fairs para meterle una funcionalidad extra
@Component({
  selector: 'app-feria-lista',
  standalone: true,
  template: `
    <section class="panel">
      <h2 class="panel__title">{{ title() }}</h2>

      @if (!ferias().length) {
        <p class="empty">{{ mensajeVacio() }}</p>
      }

      <div class="cards">
        @for (feria of ferias(); track feria.activityId) {
          <article class="card">
            <div class="card__head">
              <h3 class="card__title">{{ feria.activityName }}</h3>
              <button
                type="button"
                class="fav"
                (click)="favorites.toggle(feria.activityId)"
                [attr.aria-pressed]="favorites.isFavorite(feria.activityId)"
                [title]="favorites.isFavorite(feria.activityId) ? 'Quitar de favoritas' : 'Añadir a favoritas'"
              >
                {{ favorites.isFavorite(feria.activityId) ? '★' : '☆' }}
              </button>
            </div>

          <div class="meta">
            <div><strong>Población:</strong> {{ feria.municipalityName }}</div>
            <div><strong>Fecha:</strong> {{ feria.date }}</div>
            <div><strong>Lugar:</strong> {{ feria.location }}</div>
            <div><strong>Sector:</strong> {{ feria.sectorName }}</div>
          </div>

            @if (feria.web) {
              <a
                class="link"
                [href]="normalizeUrl(feria.web)"
                target="_blank"
                rel="noopener"
              >
                Página web
              </a>
            }
          </article>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .panel {
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        background: #ffffff;
        padding: 12px;
      }

      .panel__title {
        margin: 0 0 10px 0;
        font-size: 14px;
        font-weight: 700;
        color: #111827;
      }

      .empty {
        margin: 0;
        color: #6b7280;
        font-size: 14px;
      }

      .cards {
        display: grid;
        gap: 10px;
        margin-top: 10px;
      }

      .card {
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 12px;
        background: #f9fafb;
      }

      .card__head {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 12px;
      }

      .card__title {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
        color: #111827;
      }

      .fav {
        flex: none;
        border: 1px solid #e5e7eb;
        background: #ffffff;
        border-radius: 10px;
        padding: 6px 10px;
        cursor: pointer;
        font-size: 16px;
        line-height: 1;
      }

      .meta {
        margin-top: 8px;
        display: grid;
        gap: 4px;
        color: #374151;
        font-size: 14px;
      }

      .link {
        display: inline-block;
        margin-top: 10px;
        color: #2563eb;
        text-decoration: none;
        font-weight: 600;
      }

      .link:hover {
        text-decoration: underline;
      }
    `
  ]
})
export class FeriaListaComponent {
  public ferias: InputSignal<Fair[]> = input<Fair[]>([]);
  public title: InputSignal<string> = input<string>('Ferias');
  public mensajeVacio: InputSignal<string> = input<string>('Selecciona una comarca para ver sus ferias.');

  constructor(protected readonly favorites: FavoritesService) {}

  protected normalizeUrl(url: string): string {
    const trimmed = url.trim();
    if (!trimmed) return trimmed;
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    return `https://${trimmed}`;
  }
}
