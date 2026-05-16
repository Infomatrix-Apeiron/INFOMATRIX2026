import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App implements OnInit {
    private router = inject(Router);

    userId = '';

    ngOnInit(): void {
        const key = 'userId';
        let id = localStorage.getItem(key);

        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem(key, id);
        }

        this.userId = id;

        const age = localStorage.getItem('userAge');
        const name = localStorage.getItem('userName');

        if (!age || !name) {
            this.router.navigate(['/onboarding']).then();
        }
    }
}
