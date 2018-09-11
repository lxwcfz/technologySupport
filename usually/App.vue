<template>
    <div id="application">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    body{
        overflow-x: hidden;
    }
    
    *{
        margin: 0;
        padding: 0;
        list-style: none;
        border: 0;
        outline: none;
        text-decoration: none;
    }
</style>
