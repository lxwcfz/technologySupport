<template>
    <div class="nav_right">
        <ul>
            <li v-for="nav in navList" :key="nav.id">
                <button @click="goTo($event)" :data-address="nav.address">{{ nav.text }}</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'NavRight',
    data() {
        return {
            navList: [
                {
                    id: 'indexPage',
                    address: '/',
                    text: '首页'
                },
                {
                    id: 'htmlPage',
                    address: '/index/html/0',
                    text: 'HTML'
                },
                {
                    id: 'cssPage',
                    address: '/index/css/0',
                    text: 'CSS'
                },
                {
                    id: 'jsPage',
                    address: '/index/js/0',
                    text: 'JavaScript'
                },
                {
                    id: 'nodejsPage',
                    address: '/index/nodejs/0',
                    text: 'Node.js'
                },
                {
                    id: 'questionPage',
                    address: '/index/question/0',
                    text: '常见问题'
                },
                {
                    id: 'myGithub',
                    address: 'https://www.github.com/lxwcfz',
                    text: 'github'
                }
            ]
        }
    },
    methods: {
        // 导航栏导航函数
        goTo(e) {
            this.$emit('toNav', e);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*导航栏*/
.nav_right{
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    background: #20232a;
    height: 60px;
}

.nav_right{
    float: right;
}

@media screen and (max-width: 800px) and (min-width: 0px) {
    .nav_right{
        float: none;
        flex-direction: column;
        width: 120px;
        height: auto;
    }
    .nav_right li{
        height:50px;
        width: 100%;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .nav_right button{
        padding: 0;
        margin: 0;
        width: 90%;
        height: 90%;
        // background: linear-gradient(to bottom, #484545, #141417);
    }
}

ul,li{
    display: inline-block;
}

li button{
    padding: 3px 5px;
    margin: 0 16px;
    cursor: pointer;
    transition: color,transform .2s ease;
    font-size: 14px;
    color: #fff;
}

li button:hover{
    color: #61d9fa;
    transform: scale(1.1,1.1);
}
</style>
