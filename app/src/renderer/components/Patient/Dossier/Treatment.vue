<template>
    <tr>
        <td>{{ treatment.description }}</td>
        <td>{{ treatment.startDate | formatDate }}  {{treatment.endDate? " - " : "" }}  {{treatment.endDate | formatDate }}</td>
        <td><button :disabled="treatment.endDate" @click="stopTreatment" class="btn btn-xs btn-warning">Beëindigen</button></td>
        <td><a v-on:click="showLogs">Weergeven</a></td>
        <td><a v-on:click="addLog">Toevoegen</a></td>
    </tr>
</template>

<script>


    export default {
        props: {
            treatment: {
                id: String,
                description: String,
                startDate: String
            }
        },
        methods: {
            stopTreatment(){
                this.$emit('stopTreatment', this.treatment)
            },
            showLogs(){
                this.$emit('showLogs', this.treatment)
            },
            addLog(){
                this.$emit('addLog', this.treatment)
            }
        }
    }
</script>

<style scoped>
</style>
