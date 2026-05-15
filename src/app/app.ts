import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    userId = '';

    ngOnInit(): void {
        const key = 'userId';
        let id = localStorage.getItem(key);

        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem(key, id);
        }

        this.userId = id;
    }
}
