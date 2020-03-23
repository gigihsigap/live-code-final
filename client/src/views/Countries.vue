<template>
    <div>
        <div v-if="!isLogin">
            <h1>You need to login first!</h1>
        </div>
        <div v-if="isLogin">
            <Navbar></Navbar>
            <div class="container">
            <div v-for="country in countries" :key="country.id">
                    <CountryCard :country="country" class="m-2 p-2 border dark rounded"></CountryCard>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
// import appAxios from '../config/appAxios';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import CountryCard from '../components/CountryCard.vue'

export default {
    name: '',
    components : {
        Navbar,
        Footer,
        CountryCard,
    },
    created() {
        this.$store.dispatch('getAllCountries')
    },
    computed: {
        countries() {
            return this.$store.state.countriesArr
        },
        isLogin() {
            console.log('Login:', this.$store.state.isLogin)
            return this.$store.state.isLogin
        }
    },
    methods: {

    },
}
</script>