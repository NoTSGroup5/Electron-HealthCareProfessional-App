import HttpService from './httpService'

export default class HttpHealthCareProfessionalService {

    constructor() {
        this.httpService = new HttpService()
    }

    get(){
        return this.httpService.get('HealthCareProfessional').then((healthCareProfessionals) => {
            return healthCareProfessionals.length > 0 ? healthCareProfessionals[0] : null;
        })
    }
}
