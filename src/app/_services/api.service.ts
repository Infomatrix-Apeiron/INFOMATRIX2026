import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Idea, IdeaInstructionsResponse} from '../_models/api.models';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    private readonly baseUrl = `${environment.apiUrl}/ai`;

    constructor(private http: HttpClient) {}

    generateIdeas(prompt: string, files: File[]): Observable<Idea[]> {
        const age = localStorage.getItem('userAge') ?? '3';

        const formData = new FormData();

        formData.append('prompt', prompt);
        formData.append('age', age);

        for (const file of files) {
            formData.append('files', file);
        }

        return this.http.post<Idea[]>(
            `${this.baseUrl}/generate-ideas`,
            formData
        );

        // return of([
        //     {
        //         title: 'Маленький акваріум',
        //         description: 'Створи власний підводний світ, де плаватимуть яскраві паперові рибки. Це буде твій особистий океан, який можна легко тримати просто на долоні.',
        //     }
        // ]).pipe(
        //     delay(3000)
        // );
    }

    generateInstructions(
        title: string,
        description: string,
        photo?: File
    ): Observable<IdeaInstructionsResponse> {
        const age = localStorage.getItem('userAge') ?? '3';

        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('age', age);

        if (photo) {
            formData.append('photo', photo);
        }

        return this.http.post<IdeaInstructionsResponse>(
            `${this.baseUrl}/generate-instructions`,
            formData
        );

        // return of(RESPONSE_2).pipe(
        //     delay(3000)
        // );
    }

    generateFeedback(photo: File): Observable<{message: string}> {
        const age = localStorage.getItem('userAge') ?? '3';

        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('age', age);

        return this.http.post<{message: string}>(
            `${this.baseUrl}/generate-feedback`,
            formData
        );

        // return of(RESPONSE_3).pipe(
        //     delay(3000)
        // );
    }
}
