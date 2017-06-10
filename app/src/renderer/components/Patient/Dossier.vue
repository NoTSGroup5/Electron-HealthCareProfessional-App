<template>
    <div>
        <router-link :to="{name : 'patients'}">&#171; Patiënten overzicht</router-link>
        <div class="row">
            <div class="col-sm-9" v-if="patient.firstName != null">
                <h2>Dossier {{getFullName(patient)}}</h2>

                <div>
                    <h4>Doktersbezoeken</h4>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Organisatie</th>
                            <th>Datum bezoek</th>
                            <th>Beschrijving</th>
                            <th><span class="glyphicon glyphicon-plus pull-right" data-toggle="modal" data-target="#doctorsVisit"></span></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-show="visits.length === 0">
                            <td colspan="4">Geen doktersbezoeken gevonden.</td>
                        </tr>
                        <Visit v-for="visit in visits" :visit="visit" @removeVisit="removeVisit"></Visit>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h4>Allergieën</h4>

                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Allergie</th>
                            <th><span class="glyphicon glyphicon-plus pull-right" data-toggle="modal" data-target="#addAllergy"></span></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-show="medicalFile.allergies.length === 0">
                            <td colspan="4">Geen allergieën gevonden.</td>
                        </tr>
                        <Allergy v-for="allergy in medicalFile.allergies" :allergy="allergy"
                                 @remove="removeAllergy"></Allergy>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h4>Medicatie</h4>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Medicijn</th>
                            <th>Datum vn -tot</th>
                            <th>Beschrijving</th>
                            <th><span class="glyphicon glyphicon-plus pull-right" type="button" data-toggle="modal" data-target="#addMedicine"></span></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-show="medicalFile.medicine.length === 0">
                            <td colspan="4">Geen medicatie gevonden.</td>
                        </tr>
                        <Medicine v-for="medicine in medicalFile.medicine" :medicine="medicine"
                                  @showDescription="showDescription" @stopMedication="stopMedication"></Medicine>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h4>Behandelingen</h4>

                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Behandeling</th>
                            <th>Datum vn -tot</th>
                            <th>Beëindigen</th>
                            <th>Logs</th>
                            <th><span class="glyphicon glyphicon-plus pull-right" data-toggle="modal" data-target="#AddTreatment"></span></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-show="medicalFile.treatments.length === 0">
                            <td colspan="5">Geen behandelingen gevonden.</td>
                        </tr>
                        <Treatment v-for="treatment in medicalFile.treatments" :treatment="treatment"
                                   @stopTreatment="stopTreatment" @showLogs="showLogs" @addLog="addLogModal"></Treatment>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-9 text-right">
                <button class="btn btn-success" v-on:click="save">Opslaan</button>
            </div>
        </div>

        <!-- Add medicine modal -->
        <div id="addMedicine" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Medicatie toevoegen</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group row">
                            <label for="name" class="col-sm-4 col-form-label" aria-describedby="Naam medicijn" >Naam</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="name" v-model="medication.name">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="startDate" class="col-sm-4 col-form-label" aria-describedby="startDate">Startdatum</label>
                            <div class="col-sm-8">
                                <input type="date" class="form-control" id="startDate" v-model="medication.startDate">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="reason" class="col-sm-4 col-form-label" aria-describedby="Reden">Reden</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="reason" v-model="medication.reason">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="dosage" class="col-sm-4 col-form-label" aria-describedby="dosage">Dosering</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="dosage" v-model="medication.dosage">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="addMedicine">Toevoegen</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Doctor visit modal -->
        <div id="doctorsVisit" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Doktersbezoek toevoegen</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group row">
                            <label for="date" class="col-sm-4 col-form-label" aria-describedby="dosage">Datum</label>
                            <div class="col-sm-8">
                                <input type="date" class="form-control" id="date" placeholder="datum" v-model="visit.date">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="description" class="col-sm-4 col-form-label" aria-describedby="dosage">Beschrijving</label>
                            <div class="col-sm-8">
                                <textarea class="form-control" id="description" v-model="visit.description"></textarea>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="addVisit">
                            Toevoegen
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Allergy modal -->
        <div id="addAllergy" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Allergie toevoegen</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group row">
                            <label for="allergy" class="col-sm-4 col-form-label" aria-describedby="allergy">Allergie</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="allergy" v-model="allergyValue">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="addAllergy">Toevoegen</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Treatment modal -->
        <div id="AddTreatment" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Behandelingen toevoegen</h4>

                    </div>
                    <div class="modal-body">
                        <div class="form-group row">
                            <label for="reason" class="col-sm-4 col-form-label" aria-describedby="reason">Behandeling</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="reason" v-model="treatmentInfo.description">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="startDate" class="col-sm-4 col-form-label" aria-describedby="startDate">Startdatum</label>
                            <div class="col-sm-8">
                                <input type="date" class="form-control" id="startDate" v-model="treatmentInfo.startDate">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" v-on:click="addTreatment" data-dismiss="modal">Toevoegen
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div id="showDescription" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Medicatie beschrijving</h4>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>Naam</th>
                                <th>Reden</th>
                                <th>Dosering</th>
                            </tr>
                            </thead>
                            <tbody>
                            <MedDescription :medicine="activeMedicine"></MedDescription>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div id="ShowLogs" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Behandeling logs van {{activeTreatment.description}}</h4>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>Datum en tijd</th>
                                <th>beschrijving</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-show="activeTreatment.logs.length === 0">
                                <td colspan="2">Geen logs gevonden.</td>
                            </tr>
                            <Log v-for="log in activeTreatment.logs" :log="log"></Log>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div id="addLog" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Behandeling log toevoegen aan {{activeTreatment.description}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group row">
                            <label for="logdescription" class="col-sm-4 col-form-label" aria-describedby="logdescription">Beschrijving</label>
                            <div class="col-sm-8">
                                <textarea v-model="logDescription" class="form-control" id="logdescription"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" v-on:click="addLog" data-dismiss="modal">Toevoegen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
    a {
        cursor: pointer;
    }
</style>

<script>
    import Vue from 'vue'
    import _ from 'lodash'
    import Uuid from 'uuid'

    import BootstrapTextInput from '../Shared/Bootstrap/BootstrapTextInput'
    import BootstrapSelectInput from '../Shared/Bootstrap/BootstrapSelectInput'
    import AddMedicine from './Medication/AddMedication'

    import HttpPatientsService from '../../../services/httpPatientsService'
    import HttpMedicalFileService from '../../../services/httpMedicalFileService'
    import HttpHealthCareProfessionalService from '../../../services/httpHealthCareProfessionalService'
    import HttpOrganisationService from '../../../services/httpOrganisationService'

    import Treatment from './Dossier/Treatment'
    import Allergy from './Dossier/Allergy'
    import Visit from './Dossier/Visit'
    import Medicine from './Dossier/Medicine'
    import Log from './Dossier/Log'
    import MedDescription from './Dossier/MedicationDescription'

    let httpMedicalFileService = new HttpMedicalFileService();
    let httpPatientService = new HttpPatientsService();
    let httpHealthCareProfessionalService = new HttpHealthCareProfessionalService();
    let httpOrganisationService = new HttpOrganisationService();

    export default {
        components: {
            BootstrapTextInput,
            BootstrapSelectInput,
            Treatment,
            Allergy,
            Visit,
            Medicine,
            MedDescription,
            Log
        },
        data () {
            return {
                patient : {},
                organisation : {},
                visits: [],
                treatmentInfo: {
                    description : "",
                    startDate: new Date().getTime()
                },
                visit: {
                    date:  new Date().getTime(),
                    description: ""
                },
                medication: {
                    name: "",
                    startDate: new Date().getTime(),
                    endDate: new Date().getTime(),
                    reason: "",
                    dosage: ""
                },
                activeTreatment: {
                    description: "",
                    logs: []
                },
                activeMedicine: {
                    name: "",
                    reason: "",
                    dosage: ""
                },
                medicalFile: {
                    visits: [],
                    allergies : [],
                    medication : [],
                    treatments : []
                },
                logDescription: "",
                allergyValue: "",
            }
        },
        created: function () {
            Promise.all([httpPatientService.getPatientbyBsn(this.$route.params.bsn),
                httpMedicalFileService.getMedicalFileByBsn(this.$route.params.bsn),
                this.getOrganisationFromCurrentParticipant()]).then(results => {
                this.patient = results[0];
                this.medicalFile = results[1];
                this.organisation = results[2];

                delete this.medicalFile.bsn;

                return this.getVisitsWithOrganisation(results[1]);
            }).then(visits => {
                this.visits = visits;
            }).catch((ex) => {
                console.error(ex);
            });
        },
        methods : {
            getVisitsWithOrganisation(medicalFile){
                return Promise.all(medicalFile.visits.map((visit) => {
                    return httpOrganisationService.getById(this.getIdFromReference(visit.organisation)).then(organisation => {
                        let newVisit = Object.assign({}, visit);
                        newVisit.organisation = organisation;

                        return newVisit;
                    });
                }));
            },
            getOrganisationFromCurrentParticipant(){
                return httpHealthCareProfessionalService.get().then((healthCareProfessional) => {
                    return httpOrganisationService.getById(this.getIdFromReference(healthCareProfessional.organisation))
                });
            },
            getIdFromReference(reference){
                let index = reference.lastIndexOf('#');

                return reference.substr(index + 1, reference.length - index + 1);
            },
            addVisit(){
                if(this.visit.organisation !== ""){
                    let id = Uuid();
                    let timestamp = new Date(this.visit.date).getTime();
                    this.medicalFile.visits.push({id, date: timestamp, description: this.visit.description, organisation: `resource:nl.epd.blockchain.Organisation#${this.organisation.id}`});
                    this.visits.unshift({
                        id,
                        date: timestamp,
                        description: this.visit.description,
                        organisation : this.organisation
                    });
                    this.visit.date = "";
                    this.visit.description = ""
                }
            },
            removeVisit(visit){
                this.medicalFile.visits = this.medicalFile.visits.filter(function(item) {
                    return item !== visit;
                });
            },
            stopMedication(medicine){
                let index = _.findIndex(this.medicalFile.medicine, {id : medicine.id});
                let newMedication = Object.assign({}, medicine, {endDate : new Date().getTime()});

                Vue.set(this.medicalFile.medicine, index, newMedication)
            },
            removeAllergy(allergy) {
                this.medicalFile.allergies = this.medicalFile.allergies.filter(function (item) {
                    return item !== allergy;
                });
            },
            save() {
                httpMedicalFileService.saveMedicalFile(this.$route.params.bsn, this.medicalFile).catch(() => {
                    alert('An error occurred while saving the medical file.');
                })
            },
            addAllergy() {
                if(this.allergyValue !== "") {
                    this.medicalFile.allergies.push(this.allergyValue);
                    this.allergyValue = "";
                }
            },
            addMedicine(){
                if(this.medication.name !== "") {
                    this.medicalFile.medicine.push({id:Uuid() ,name: this.medication.name, startDate: new Date(this.medication.startDate).getTime(), reason: this.medication.reason, dosage: this.medication.dosage});

                    this.medication.name = "";
                    this.medication.startDate = "";
                    this.medication.endDate = "";
                    this.medication.reason = "";
                    this.medication.dosage = "";
                }
            },
            addTreatment(){
                this.medicalFile.treatments.unshift({
                    id: Uuid(),
                    description: this.treatmentInfo.description,
                    startDate: new Date(this.treatmentInfo.startDate).getTime(),
                    logs: []
                });
            },
            addLogModal(treatment){
                if(treatment){
                    this.activeTreatment = treatment;
                }
                $("#addLog").modal();
            },
            stopTreatment(treatment){
                let index = _.findIndex(this.medicalFile.treatments, {id : treatment.id});
                let newTreatment = Object.assign({}, treatment, {endDate : new Date().getTime()});

                Vue.set(this.medicalFile.treatments, index, newTreatment)
            },
            addLog(){
                this.activeTreatment.logs.unshift({
                    description:this.logDescription,
                    id: Uuid(),
                    date: Date.now()
                });
                this.logDescription = "";
            },
            showDescription(medicine){
                this.activeMedicine.name = medicine.name;
                this.activeMedicine.reason = medicine.reason;
                this.activeMedicine.dosage = medicine.dosage;
                $("#showDescription").modal();
            },
            showLogs(treatment){
                this.activeTreatment.description = treatment.description;
                this.activeTreatment.logs = treatment.logs;
                $("#ShowLogs").modal();
            },
            getFullName(person){
                let name = person.firstName;

                if(person.namePrefix){
                    name += " " + person.namePrefix;
                }

                name += " " + person.lastName;

                return name;
            }
        }
    }
</script>
