import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-screen-shell',
  standalone: true,
  templateUrl: './screen-shell.html',
  styleUrl: './screen-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenShellComponent {
  @Input() showHeader = false;
  @Input() showBottomNav = false;
  @Input() progress = 0;
  @Input() totalSteps = 0;
  @Input() coins = 0;

  @Output() back = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<'home' | 'game' | 'favorites' | 'profile'>();
}
