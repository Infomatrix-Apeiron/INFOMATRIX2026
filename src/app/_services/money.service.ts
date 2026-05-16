import {Injectable, signal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MoneyService {
    private _currentMoney = signal(0);
    public currentMoney =  this._currentMoney.asReadonly();

    constructor() {
        let money = localStorage.getItem('userMoney');
        if (!money) {
            money = '50';
            localStorage.setItem('userMoney', '50');
        }
        this._currentMoney.set(Number(money));
    }

    public addMoney(money: number) {
        this._currentMoney.update((current) => current + money);
        localStorage.setItem('userMoney', money.toString());
    }
}
