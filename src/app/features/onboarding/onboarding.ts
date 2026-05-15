import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {PrimaryButtonComponent} from '../../shared/ui/button/button';
import {RainbowDividerComponent} from '../../shared/ui/rainbow-divider/rainbow-divider';
import {TextInputComponent} from '../../shared/ui/text-input/text-input';
import {ScreenShellComponent} from '../../shared/ui/screen-shell/screen-shell';

type OnboardingStep = 'START' | 'NAME' | 'AGE';

@Component({
    selector: 'app-onboarding',
    standalone: true,
    imports: [
        FormsModule,
        PrimaryButtonComponent,
        RainbowDividerComponent,
        TextInputComponent,
        ScreenShellComponent,
    ],
    templateUrl: './onboarding.html',
    styleUrl: './onboarding.scss',
})
export class Onboarding implements OnInit {
    step: OnboardingStep = 'START';

    userName = '';
    userAge: number | null = null;

    ages = Array.from({ length: 15 }, (_, i) => i + 3);

    constructor(private router: Router) {}

    ngOnInit() {
        // якщо вже пройшли онбординг — одразу далі
        // const name = localStorage.getItem('userName');
        // const age = localStorage.getItem('userAge');
        //
        // if (name && age) {
        //   this.router.navigate(['/craft/take-picture']);
        // }
    }

    /** START → NAME */
    startOnboarding() {
        this.step = 'NAME';
    }

    /** NAME → AGE */
    nextFromName() {
        if (!this.userName.trim()) return;

        localStorage.setItem('userName', this.userName);
        this.step = 'AGE';
    }

    /** AGE → завершення */
    finish() {
        if (!this.userAge) return;

        localStorage.setItem('userAge', String(this.userAge));
        this.router.navigate(['/craft/take-picture']);
    }

    ageLabel(age: number): string {
        return age === 17 ? '17+' : String(age);
    }

    canProceed(): boolean {
        switch (this.step) {
            case 'START': return true;
            case 'NAME': return !!this.userName.trim();
            case 'AGE': return !!this.userAge;
        }
    }

    onNext() {
        switch (this.step) {
            case 'START': this.startOnboarding(); break;
            case 'NAME': this.nextFromName(); break;
            case 'AGE': this.finish(); break;
        }
    }
}
