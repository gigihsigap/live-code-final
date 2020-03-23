<template>
    <div>
        <div v-if="!isLogin">
            <h1>You need to login first!</h1>
        </div>
        <div v-if="isLogin">
            <Navbar></Navbar>
            <div class="container">
                <form @submit.prevent="addNewReport"  style="min-height:600px">
                    <div class="form-group">
                        <label>Number of Cases</label>
                        <input type="number" class="form-control" v-model="form.cases">
                    </div>
                    <div class="form-group">
                        <label>Country ID:</label>
                        <input type="number" class="form-control" v-model="form.CountryID">
                    </div>
                    <input type="submit" class="btn btn-success" value="Enter New Report">
                </form>

                <hr>
                <h3>Report List</h3>
                <hr>

                <div v-for="report in reports" :key="report.id">
                    <ReportCard :report="report" class="m-2 p-2 border dark rounded"></ReportCard>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import appAxios from '../config/appAxios';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import ReportCard from '../components/ReportCard.vue'

export default {
    name: '',
    components : {
        Navbar,
        Footer,
        ReportCard,
    },
    data() {
        return {
            form: {
                cases: 0,
                CountryID: 1,
            }
        }
    },
    created() {
        this.$store.dispatch('getAllReports')
    },
    computed: {
        reports() {
            return this.$store.state.reportsArr
        },
        countries() {
            return this.$store.state.countriesArr
        },
        isLogin() {
            console.log('Login:', this.$store.state.isLogin)
            return this.$store.state.isLogin
        }
    },
    methods: {
        addNewReport() {
            console.log('Add new report...', this.form)
            appAxios({
                method: 'POST',
                url: '/reports',
                data: this.form,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then((result) => {
                console.log('Added this item:', result)
                this.emptyForm()
            })
            .catch((err) => {
                console.log('Error:', err.response)
            })
        },
        emptyForm() {
            this.form = {
                cases: 0,
                CountryID: 1,
            }
        }
    },
}
</script>