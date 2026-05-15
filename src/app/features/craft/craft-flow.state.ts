import {Injectable, signal} from '@angular/core';
import {Idea, IdeaInstructionsResponse} from '../../_models/api.models';

@Injectable()
export class CraftFlowState {
    photo = signal<File | null>(null);
    description = signal('');
    ideas = signal<Idea[]>([]);
    selectedIdea = signal<Idea | null>(null);
    instructions = signal<IdeaInstructionsResponse | null>(null);
    resultPhoto = signal<File | null>(null);
    result = signal<{ message: string } | null>(null);

    reset() {
        this.photo.set(null);
        this.description.set('');
        this.ideas.set([]);
        this.selectedIdea.set(null);
        this.instructions.set(null);
        this.resultPhoto.set(null);
        this.result.set(null);
    }

    hasProgress(): boolean {
        return this.photo() !== null;
    }
}
