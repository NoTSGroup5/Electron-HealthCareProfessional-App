<template>
  <div>
    <div class="clearfix">
      <div class="pull-left">
        <h1>Patiënten</h1>
      </div>
    </div>

    <PatientsList></PatientsList>
  </div>
</template>

<script>
  import PatientsList from './PatientsOverview/PatientsList'
  export default {
    components: {
      PatientsList
    },
    name: 'patientsOverview'
  }
</script>

<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
  .btn-add {
    margin-top: 20px;
  }
</style>
