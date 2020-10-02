import { Injectable } from '@angular/core';

import { LoadingIndicatorService } from './loading-indicator.service';
import { RouterExtensions } from 'nativescript-angular/router';

@Injectable()
export class TestNavService {
    constructor(
        private loadingIndicatorService: LoadingIndicatorService,
        private nav: RouterExtensions
    ) {}

    public async tryNav() {
        try {
            await this.nav.navigate(['/page-two-page']);
        } catch (error) {
            console.error(error);
        } finally {
            this.loadingIndicatorService.hide();
        }
    }
}