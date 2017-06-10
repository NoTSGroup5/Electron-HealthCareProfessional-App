<template>
    <div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <td><strong>BSN</strong></td>
                    <td><strong>Naam</strong></td>
                    <td><strong>Dossier</strong></td>
                </tr>
            </thead>
            <tbody>
            <tr v-show="records.length === 0">
                <td colspan="4">
                    Geen patienten gevonden.
                </td>
            </tr>
            <patient v-for="record in records" v-bind="record"></patient>
            </tbody>
        </table>
    </div>
</template>

<script>
    import patient from './Patient';
    import HttpPatientsService from '../../../../services/httpPatientsService';
    import HttpMedicalFileService from '../../../../services/httpMedicalFileService';

    let httpPatientService = new HttpPatientsService();
    let httpMedicalService = new HttpMedicalFileService();

    export default {
        components: {
            patient
        },
        data: () => {
            return {
                records: []
            }
        },
        created () {
            httpMedicalService.getMedicalFiles().then((medicalFiles) => {
                return Promise.all(medicalFiles.map(file => {
                    return httpPatientService.getPatientbyBsn(file.bsn).then(patient => {
                        return {
                            patient,
                            file
                        }
                    });
                }));
            }).then(data => {
                this.records = data;
            });
        },
        methods : {

        },
        name: 'patientsList'
    }
</script>

<style scoped>

</style>