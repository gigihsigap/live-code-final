<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">COVID-19 App</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item">
                <router-link to="/countries" class="nav-link" href="#">Countries</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/reports"  class="nav-link" href="#">Reports</router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click="logout">Logout</a>
            </li>
            </ul>
        </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    created() {
        console.log('CREATED!')
        if (localStorage.getItem('token')) {
            console.log('LOGIN!')
            this.$store.commit('changeIsLogin', true)
        } else {
            this.$store.commit('changeIsLogin', false)
        }
    },
    computed: {
        isLogin() {
            return this.$store.state.isLogin
        }
    },
    methods: {
        logout() {
            this.$swal.fire({
                title: 'Are you sure you want to log out?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Log Out'
                })
                .then((result) => {
                    console.log('Result:', result)
                    if (result.value) {
                        console.log('Log out confirmed')
                        localStorage.removeItem('token')
                        this.$store.commit('changeToken', '')
                        this.$store.commit('changeIsLogin', false)
                        this.$router.push('/')
                    }
            })
        }
    },
}
</script>