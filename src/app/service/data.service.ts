

// >> chart-angular-data-service
import { Injectable } from '@angular/core';
import { Country } from '../model/country.model';


@Injectable()
export class DataService {
    getCategoricalSource(): Country[] {
        return [
            { Country: "1.2019", Amount: 14, SecondVal: 14, ThirdVal: 24, Impact: 0, Year: 0 },
            { Country: "2.2019", Amount: 13, SecondVal: 23, ThirdVal: 25, Impact: 0, Year: 0 },
            { Country: "3.2019", Amount: 24, SecondVal: 17, ThirdVal: 23, Impact: 0, Year: 0 },
            { Country: "4.2019", Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
            { Country: "5.2019", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 },
            { Country: "6.2019", Amount: 28, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 }
        ];
    }
    getPieSource(): Country[] {
        return [
            { Country: "Máy không hoạt động", Amount: 10 },
            { Country: "Máy không sáng đèn", Amount: 31 },
            { Country: "Máy không dừng sau 2 phút", Amount: 59 },

        ];
    }
}
