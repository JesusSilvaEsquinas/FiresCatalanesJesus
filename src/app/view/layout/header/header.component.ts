import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <div class="header__inner">
        <h1 class="header__title">{{ title() }}</h1>
      </div>
    </header>
  `,
  styles: [
    `
      .header {
        border-bottom: 1px solid #e5e7eb;
        background: #ffffff;
      }

      .header__inner {
        max-width: 1100px;
        margin: 0 auto;
        padding: 16px;
      }

      .header__title {
        margin: 0;
        font-size: 18px;
        font-weight: 700;
        color: #111827;
      }
    `
  ]
})
export class HeaderComponent {
  title = input<string>('Fires catalanes');
}
