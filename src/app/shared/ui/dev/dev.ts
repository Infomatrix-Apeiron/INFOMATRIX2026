import { Component } from '@angular/core';
import {PrimaryButtonComponent} from '../button/button';
import {RainbowDividerComponent} from '../rainbow-divider/rainbow-divider';
import {TextInputComponent} from '../text-input/text-input';

@Component({
  selector: 'app-dev',
  imports: [
    PrimaryButtonComponent,
    RainbowDividerComponent,
    TextInputComponent
  ],
  templateUrl: './dev.html',
  styleUrl: './dev.scss',
})
export class Dev {

}
