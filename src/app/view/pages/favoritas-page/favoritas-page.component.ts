import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Fair } from '../../../models/fair';
import { FairsService } from '../../../services/fairs.service';
import { FavoritesService } from '../../../services/favorites.service';
import { FeriaListaComponent } from '../../elements/feria-lista/feria-lista.component';

@Component({
  selector: 'app-favoritas-page',
  standalone: true,
  imports: [FeriaListaComponent],
  template: `
    <app-feria-lista
      title="Favoritas"
      mensajeVacio="No has marcado ninguna feria como favorita todavía."
      [ferias]="feriasFavoritas()"
    />
  `
})
export class FavoritasPageComponent {
  // Servicio con el listado completo de ferias.
  private readonly fairsService = inject(FairsService);
  // Servicio para gestionar favoritas (se guardan en localStorage).
  private readonly favoritesService = inject(FavoritesService);

  // Igual que en la página de ferias: pasamos el Observable a signal para trabajar más cómodo.
  private readonly ferias = toSignal(this.fairsService.getFairs(), { initialValue: [] as Fair[] });

  // Aquí filtramos las ferias que están marcadas como favoritas.
  // Ojo: usamos favoriteActivityIds() (computed) para que la lista se actualice al instante
  // cuando haces toggle en una estrella.
  protected readonly feriasFavoritas = computed(() => {
    const ids = new Set(this.favoritesService.favoriteActivityIds());
    return this.ferias().filter((f) => ids.has(f.activityId));
  });
}
