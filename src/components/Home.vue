<template>
    <div>
        <Nav></Nav>
        <router-view></router-view>
    </div>
</template>

<script>
    import Nav from "../common/Nav";
    export default {
        name: "Home",
        components: {Nav}
    }
</script>

<style scoped>

</style>