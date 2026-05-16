import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CraftFlowState } from '../craft-flow.state';

import { ScreenShellComponent } from '../../../shared/ui/screen-shell/screen-shell';
import { PrimaryButtonComponent } from '../../../shared/ui/button/button';
import {LoaderComponent} from '../../../shared/ui/app-loader/app-loader';
import {Idea} from '../../../_models/api.models';
import {ApiService} from '../../../_services/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-ideas-list-step',
  standalone: true,
  imports: [
    ScreenShellComponent,
    PrimaryButtonComponent,
    LoaderComponent,
  ],
  templateUrl: './ideas-list-step.html',
  styleUrl: './ideas-list-step.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdeasListStep implements OnInit {
  loading = signal(true);
  ideas = signal<Idea[]>([]);
  selectedIdea = signal<Idea | null>(null);
  selectedIndex = signal<number | null>(null);

  constructor(
      private api: ApiService,
      private flow: CraftFlowState,
      private router: Router,
      private destroyRef: DestroyRef,
      private toastr: ToastrService,
  ) {}

  ngOnInit() {
    // захист від прямого заходу на роут без фото
    const photo = this.flow.photo();
    if (!photo) {
      this.router.navigate(['/craft/take-picture']);
      return;
    }

    this.api.generateIdeas(this.flow.description(), [photo])
        .pipe(
            take(1),
            takeUntilDestroyed(this.destroyRef),
            finalize(() => this.loading.set(false)),
        )
        .subscribe({
          next: (response) => this.ideas.set(response),
          error: (err) => {
            const errorMessage = err.error?.message || '';
            this.toastr.error(errorMessage, 'Oops!');
            this.router.navigate(['/craft/start']);
          },
        });
  }

  onSelect(idea: Idea, index: number) {
    this.selectedIdea.set(idea);
    this.selectedIndex.set(index);
  }

  onNext() {
    const selected = this.selectedIdea();
    if (!selected) return;

    this.flow.selectedIdea.set(selected);
    this.router.navigate(['/craft/generating-idea']);
  }

  onBack() {
    this.router.navigate(['/craft/describe']);
  }
}
