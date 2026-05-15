import {Routes} from '@angular/router';
import {App} from './app';
import {Dev} from './shared/ui/dev/dev';
import {Onboarding} from './features/onboarding/onboarding';
import {CraftFlowState} from './features/craft/craft-flow.state';
import {DescribeStep} from './features/craft/describe-step/describe-step';
import {StartStep} from './features/craft/start-step/start-step';
import {IdeasListStep} from './features/craft/ideas-list-step/ideas-list-step';
import {IdeaDetailStep} from './features/craft/idea-detail-step/idea-detail-step';
import {ResultStep} from './features/craft/result-step/result-step';

export const routes: Routes = [
    {
        path: '',
        component: App,
        children: [
            {
                path: 'craft',
                providers: [CraftFlowState],
                children: [
                    {path: 'start', component: StartStep},
                    {path: 'describe', component: DescribeStep},
                    {path: 'generating-ideas', component: IdeasListStep},
                    {path: 'generating-idea', component: IdeaDetailStep},
                    {path: 'result', component: ResultStep},
                    {path: '**', redirectTo: 'start'},
                ]
            },
            {path: 'onboarding', component: Onboarding},
            {path: 'dev', component: Dev},
            {path: '**', redirectTo: 'craft'},
        ]
    }
];
