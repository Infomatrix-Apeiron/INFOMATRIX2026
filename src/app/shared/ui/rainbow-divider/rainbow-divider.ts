import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-rainbow-divider',
  standalone: true,
  template: `
    <div class="rainbow" role="presentation" aria-hidden="true">
      <span class="seg seg-1"></span>
      <span class="seg seg-2"></span>
      <span class="seg seg-3"></span>
      <span class="seg seg-4"></span>
      <span class="seg seg-5"></span>
    </div>
  `,
  styleUrl: './rainbow-divider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RainbowDividerComponent {}
