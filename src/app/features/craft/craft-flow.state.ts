import {Injectable, signal} from '@angular/core';
import {Idea} from '../../_models/api.models';

@Injectable()
export class CraftFlowState {
    photo = signal<File | null>(null);
    description = signal('');
    selectedIdea = signal<Idea | null>(null);
}
