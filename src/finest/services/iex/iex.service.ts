import { Injectable, HttpService } from '@nestjs/common';
import { KeyService } from './key.service';

@Injectable()
export class IexService {
    constructor(private readonly httpService: HttpService, private readonly keyService: KeyService) { }

    token: string = this.keyService.getToken();

    getCompanyData(symbol: string) {
        return this.httpService.get(`https://cloud.iexapis.com/v1/stock/${symbol}/company${this.token}`).toPromise();
    }
}
