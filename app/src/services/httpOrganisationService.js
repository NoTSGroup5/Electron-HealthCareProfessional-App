import HttpService from './httpService'

export default class HttpOrganisationService {

    constructor () {
        this.httpService = new HttpService();
        this.url = 'Organisation'
    }

    getById(id){
        return this.httpService.getById(this.url, id);
    }
}
