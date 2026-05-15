import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CraftFlowState } from '../craft-flow.state';

import { ScreenShellComponent } from '../../../shared/ui/screen-shell/screen-shell';
import { PrimaryButtonComponent } from '../../../shared/ui/button/button';
import { RainbowDividerComponent } from '../../../shared/ui/rainbow-divider/rainbow-divider';
import {LoaderComponent} from '../../../shared/ui/app-loader/app-loader';
import {ApiService} from '../../../_services/api.service';

const REWARD_COINS = 100;

@Component({
    selector: 'app-result-step',
    standalone: true,
    imports: [
        ScreenShellComponent,
        PrimaryButtonComponent,
        LoaderComponent,
        RainbowDividerComponent,
    ],
    templateUrl: './result-step.html',
    styleUrl: './result-step.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultStep implements OnInit {
    loading = signal(true);
    feedback = signal<string | null>(null);
    rewardCoins = REWARD_COINS;

    constructor(
        private api: ApiService,
        public flow: CraftFlowState,
        private router: Router,
        private destroyRef: DestroyRef,
    ) {}

    ngOnInit() {
        const photo = this.flow.resultPhoto();
        if (!photo) {
            this.router.navigate(['/craft/generating-idea']);
            return;
        }

        this.api.generateFeedback(photo)
            .pipe(
                take(1),
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.loading.set(false)),
            )
            .subscribe({
                next: (response) => {
                    this.feedback.set(response.message);
                    this.flow.result.set(response);
                },
                error: (err) => {
                    console.error('Failed to get feedback', err);
                },
            });
    }

    onStartNewGame() {
        this.flow.reset();
        this.router.navigate(['/craft/start']);
    }
}
