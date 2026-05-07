import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Fair } from '../../../models/fair';
import { FairsService } from '../../../services/fairs.service';
import { FeriaListaComponent } from '../../elements/feria-lista/feria-lista.component';
import { ComarcaListaComponent } from '../../elements/comarca-lista/comarca-lista.component';

@Component({
  selector: 'app-ferias-page',
  standalone: true,
  imports: [ComarcaListaComponent, FeriaListaComponent],
  template: `
    <div class="layout">
      <div class="layout__left">
        <app-comarca-lista
          [comarcas]="comarcas()"
          (seleccionarComarca)="comarcaSeleccionada.set($event)"
        />
      </div>

      <div class="layout__right">
        <app-feria-lista
          [title]="comarcaSeleccionada() ? 'Ferias en ' + comarcaSeleccionada() : 'Ferias'"
          [ferias]="feriasFiltradas()"
        />
      </div>
    </div>
  `,
  styles: [
    `
      .layout {
        display: grid;
        grid-template-columns: 320px 1fr;
        gap: 16px;
        align-items: start;
      }

      @media (max-width: 900px) {
        .layout {
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class FeriasPageComponent {
  // Aquí guardamos la comarca que el usuario ha seleccionado en la lista de la izquierda.
  protected readonly comarcaSeleccionada = signal<string>('');

  // Servicio que trae todas las ferias desde el JSON.
  private readonly fairsService = inject(FairsService);

  // Convertimos el Observable (valor dinámico) del servicio a una signal para poder usar computed() fácilmente.
  private readonly ferias = toSignal(this.fairsService.getFairs(), { initialValue: [] as Fair[] });

  // Sacamos la lista de comarcas únicas (ordenadas) a partir del listado de ferias.
  protected readonly comarcas = computed(() => {
    const set = new Set(this.ferias().map((f) => f.regionName).filter(Boolean));
    return [...set].sort((a, b) => a.localeCompare(b));
  });

  // Cuando hay una comarca seleccionada, filtramos el listado y mostramos solo sus ferias.
  protected readonly feriasFiltradas = computed(() => {
    const comarca = this.comarcaSeleccionada();
    if (!comarca) return [];

    return this.ferias().filter((f) => f.regionName === comarca);
  });

  constructor() {}
}
