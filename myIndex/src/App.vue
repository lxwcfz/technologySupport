<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
*{
	border: none;
	background: none;
	margin: 0;
	padding: 0;
	outline: none;
	box-sizing: border-box;
	list-style: none;
}
button{
	cursor: pointer;
}
body{
	overflow-x: hidden;
}
</style>
