import HttpService from './httpService'

export default class HttpMedicalFileService {

    constructor () {
        this.httpService = new HttpService();
    }

    getMedicalFiles() {
        return this.httpService.get("MedicalFile");
    }

    getMedicalFileByBsn(bsn) {
        return this.httpService.getById("MedicalFile", bsn).then((file) => {
            return file;
        });
    }

    saveMedicalFile(bsn, medicalFile) {
        return this.httpService.put("MedicalFile/" + bsn, medicalFile);
    }
}