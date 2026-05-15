import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ScreenShellComponent} from '../../../shared/ui/screen-shell/screen-shell';
import {PrimaryButtonComponent} from '../../../shared/ui/button/button';
import {RainbowDividerComponent} from '../../../shared/ui/rainbow-divider/rainbow-divider';
import {CraftFlowState} from '../craft-flow.state';

@Component({
    selector: 'app-start-step',
    standalone: true,
    imports: [
        ScreenShellComponent,
        PrimaryButtonComponent,
        RainbowDividerComponent,
    ],
    templateUrl: './start-step.html',
    styleUrl: './start-step.scss',
})
export class StartStep implements OnInit {
    userName = 'User';   // дефолт якщо в localStorage пусто

    constructor(
        private router: Router,
        private flow: CraftFlowState,
    ) {
    }

    ngOnInit() {
        const savedName = localStorage.getItem('userName');
        if (savedName) {
            this.userName = savedName;
        }
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) return;

        this.flow.photo.set(file);
        this.router.navigate(['/craft/describe']);
    }
}
