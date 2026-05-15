
export interface Idea {
    title: string;
    description: string;
    emoji?: string;
}

export interface IdeaInstructionsResponse {
    title: string;
    description: string;
    steps: IdeaStep[];
}

export interface IdeaStep {
    step: number;
    title: string;
    description: string;
    image: string;
}
