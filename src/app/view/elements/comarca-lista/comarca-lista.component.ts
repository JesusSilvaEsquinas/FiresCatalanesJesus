import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-comarca-lista',
  standalone: true,
  template: `
    <section class="panel">
      <h2 class="panel__title">Comarcas</h2>

      <div class="list">
        @for (comarca of comarcas(); track comarca) {
          <button
            class="list__item"
            type="button"
            (click)="seleccionarComarca.emit(comarca)"
          >
            {{ comarca }}
          </button>
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

      .list {
        display: grid;
        gap: 8px;
        max-height: 70vh;
        overflow: auto;
      }

      .list__item {
        text-align: left;
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid #e5e7eb;
        background: #f9fafb;
        color: #111827;
        cursor: pointer;
      }

      .list__item:hover {
        background: #f3f4f6;
      }
    `
  ]
})
export class ComarcaListaComponent {
  public comarcas: InputSignal<string[]> = input<string[]>([]);
  public seleccionarComarca: OutputEmitterRef<string> = output<string>();
}
