import HttpService from './httpService'

export default class HttpPatientsService {

    constructor() {
        this.httpService = new HttpService()
    }

    fetch() {
        return this.httpService.get('Patient').then((patients) => {
            return patients.length > 0 ? patients[0] : null;
        })
    }

    getPatientbyBsn(bsn) {
        return this.httpService.getById('Patient', bsn);
    }

    updatePatient(bsn, model) {
        delete model.bsn;

        return this.httpService.put('Patient/' + bsn, model);
    }
}
