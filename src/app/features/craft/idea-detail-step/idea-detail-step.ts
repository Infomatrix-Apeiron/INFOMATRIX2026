import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CraftFlowState } from '../craft-flow.state';

import { ScreenShellComponent } from '../../../shared/ui/screen-shell/screen-shell';
import { PrimaryButtonComponent } from '../../../shared/ui/button/button';
import {LoaderComponent} from '../../../shared/ui/app-loader/app-loader';
import {IdeaInstructionsResponse} from '../../../_models/api.models';
import {ApiService} from '../../../_services/api.service';

@Component({
    selector: 'app-idea-detail-step',
    standalone: true,
    imports: [
        ScreenShellComponent,
        PrimaryButtonComponent,
        LoaderComponent,
    ],
    templateUrl: './idea-detail-step.html',
    styleUrl: './idea-detail-step.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdeaDetailStep implements OnInit {
    loading = signal(true);
    instructions = signal<IdeaInstructionsResponse | null>(null);

    constructor(
        private api: ApiService,
        public flow: CraftFlowState,
        private router: Router,
        private destroyRef: DestroyRef,
    ) {}

    ngOnInit() {
        const idea = this.flow.selectedIdea();
        if (!idea) {
            this.router.navigate(['/craft/generating-ideas']);
            return;
        }

        const photo = this.flow.photo() ?? undefined;

        this.api.generateInstructions(idea.title, idea.description, photo)
            .pipe(
                take(1),
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.loading.set(false)),
            )
            .subscribe({
                next: (response) => {
                    this.instructions.set(response);
                    this.flow.instructions.set(response);   // зберігаємо у flow на майбутнє
                },
                error: (err) => {
                    console.error('Failed to generate instructions', err);
                },
            });
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) return;

        this.flow.resultPhoto.set(file);
        this.router.navigate(['/craft/result']);
    }

    onBack() {
        this.router.navigate(['/craft/generating-ideas']);
    }
}
