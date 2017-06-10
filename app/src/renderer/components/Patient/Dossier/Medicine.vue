<template>
  <tr>
        <td>{{ medicine.name }}</td>
        <td>{{ medicine.startDate | formatDate }}  {{medicine.endDate? " - " : "" }}  {{medicine.endDate | formatDate }}</td>
        <td><a v-on:click="showDescription">Zie beschrijving</a></td>
        <td><button :disabled="medicine.endDate"  @click="stopMedication" class="btn btn-xs btn-warning">Beëindigen</button></td>
  </tr>
</template>

<script>
  export default {
    props: [
      'medicine'
    ],
    methods: {
        showDescription(){
              this.$emit('showDescription', this.medicine)
        },
        stopMedication(){
            this.$emit('stopMedication', this.medicine)
        }  
    }
    
  }
</script>

