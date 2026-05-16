import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MoneyService} from '../../../_services/money.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-screen-shell',
  standalone: true,
  templateUrl: './screen-shell.html',
  styleUrl: './screen-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenShellComponent {
  @Input() showHeader = false;
  @Input() showBackButton = true;
  @Input() showProgress = true;
  @Input() showCoins = true;
  @Input() showBottomNav = false;
  @Input() progress = 0;
  @Input() totalSteps = 0;

  @Output() back = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<'home' | 'game' | 'favorites' | 'profile'>();

  constructor(
      public moneyService: MoneyService,
      private router: Router,
  ) {
  }

  clearLocalStorage() {
    if (confirm('Are you sure you want to clear local storage?')) {
      localStorage.clear();
      this.router.navigate(['/onboarding']).then();
    }
  }
}
