import {ChangeDetectionStrategy, Component, computed, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {CraftFlowState} from '../craft-flow.state';
import {PrimaryButtonComponent} from '../../../shared/ui/button/button';
import {ScreenShellComponent} from '../../../shared/ui/screen-shell/screen-shell';
import {TextInputComponent} from '../../../shared/ui/text-input/text-input';

@Component({
  selector: 'app-describe-step',
  standalone: true,
  imports: [
    FormsModule,
    ScreenShellComponent,
    PrimaryButtonComponent,
    TextInputComponent,
  ],
  templateUrl: './describe-step.html',
  styleUrl: './describe-step.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescribeStep implements OnDestroy {
  description = '';

  /** URL для превью фото (object URL з File) */
  photoUrl = computed(() => {
    const file = this.flow.photo();
    return file ? URL.createObjectURL(file) : null;
  });

  constructor(
      private router: Router,
      private flow: CraftFlowState,
  ) {}

  onGenerate() {
    this.flow.description.set(this.description.trim());
    // TODO: запит до AI, лоадер, навігація
    this.router.navigate(['/craft/generating-ideas']);
  }

  onBack() {
    this.router.navigate(['/craft/start']);
  }

  ngOnDestroy() {
    // звільняємо пам'ять від object URL
    const url = this.photoUrl();
    if (url) URL.revokeObjectURL(url);
  }
}
