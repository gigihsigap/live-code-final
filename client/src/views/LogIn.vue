<template>
    <div>
        <form @submit.prevent="tryLogin"  style="min-height:600px">
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" v-model="form.username">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="form.password">
            </div>
            <input type="submit" class="btn btn-success" value="Log In">
        </form>
        <Footer></Footer>
    </div>
</template>

<script>
import appAxios from '../config/appAxios';
import Footer from '../components/Footer.vue';

export default {
    name: '',
    components : {
        Footer,
    },
    data() {
        return {
            form: {
                username: '',
                password: '',
            }
        }
    },
    created() {
    },
    computed: {

    },
    methods: {
        tryLogin() {
            console.log('Log in...')
            appAxios({
                method: 'POST',
                url: '/login',
                data: this.form,
            })
            .then((result) => {
                console.log('Success!', result.data)
                const {token} = result.data
                localStorage.setItem('token', token)
                this.$store.commit('changeIsLogin', true)
                this.$store.commit('changeToken', token)
                this.$router.push({ path: '/countries' })
                this.resetForm()
            })
            .catch((err) => {
                console.log('Error:', err.response)
                this.$swal('Try again!', err.response.data.message,'error')
            })
        },
        resetForm() {
            this.form.username = '';
            this.form.password = '';
        }
    },
}
</script>