<template>
    <div>
        <h2>{{ report.countryID }}</h2>
        <h5>Cases: {{ report.cases }}</h5>
        <span class="btn btn-danger" @click="deleteReport">Delete</span>
    </div>
</template>

<script>
import appAxios from '../config/appAxios';
export default {
    props: ['report'],
    methods: {
        deleteReport() {
            this.$swal.fire({
                title: 'Are you sure you want to delete this data?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete'
                })
                .then((result) => {
                    console.log('Result:', result)
                    if (result.value) {
                        console.log('Deleteing...:')
                        console.log(this.report.id)
                        appAxios({
                            method: 'DELETE',
                            url: `/reports/${this.report.id}`,
                            headers: {
                                token: localStorage.getItem('token')
                            }
                        })
                        .then((result) => {
                            console.log('Deleted this item:', result)
                        })
                        .catch((err) => {
                            console.log('Error:', err.response)
                        })
                    }
            })
        }
    }
}
</script>