import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '../../../services/config/config.service';

@Injectable()
export class IexService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) { }

    async getCompanyInfo(symbol: string) {
        const result = await this.httpService
            .get(`https://cloud.iexapis.com/v1/stock/${symbol}/company?token=${this.configService.get('IEX_TOKEN')}`)
            .toPromise();
        return result.data;
    }

    async getCompanyNews(symbol: string) {
        const result = await this.httpService
            .get(`https://cloud.iexapis.com/v1/stock/${symbol}/news/last/last?token=${this.configService.get('IEX_TOKEN')}`)
            .toPromise();
        const news = result.data.map(newsItem => ({
            ...newsItem,
            // convert date
            datetime: new Date(newsItem.datetime).toDateString(),
            // handle missing news image
            ...!newsItem.image && {
                image: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'            }
        }));

        return news;
    }

    async getCompanyStock(symbol: string) {
        const result = await this.httpService
            .get(`https://cloud.iexapis.com/v1/stock/${symbol}/price?token=${this.configService.get('IEX_TOKEN')}`)
            .toPromise();
        return result.data;
    }
}
