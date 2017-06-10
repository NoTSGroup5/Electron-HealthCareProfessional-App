<template>
  <tr>
    <td>{{patient.bsn}}</td>
    <td>{{getFullName(patient)}}</td>
    <td><router-link class="btn btn-default" :to="{ name: 'dossier', params: {bsn: patient.bsn}}">Inzien</router-link></td>
  </tr>
</template>

<script>
  export default {
      props: {
          patient: {
              type: Object,
              required: true
          },
          file: {
              type: Object,
              required: true
          }
      },
      methods : {
          getFullName(){
              let name = this.patient.firstName;

              if(this.patient.namePrefix){
                  name += " " + this.patient.namePrefix;
              }

              name += " " + this.patient.lastName;

              return name;
          },
      }
  }
</script>

<style scoped>
</style>
