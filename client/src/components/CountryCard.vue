<template>
    <div>
        <h2>{{ country.name }}</h2>
        <h5>Cases: {{ country.cases }}</h5>
        <h5>Deaths: {{ country.deaths }}</h5>
        <h5>Recovered: {{ country.recovered }}</h5>
    </div>
</template>

<script>
export default {
    props: ['country']
}
</script>