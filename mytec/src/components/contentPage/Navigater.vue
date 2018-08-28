<template>
    <nav>
        <div class="nav_left">
            <img class="logo" src="../../assets/materialImg/logo.png">
            <span>{{ title }}</span>
            <span class="desc">{{ desc }}</span>
            <button @click="showAside()" class="btn_showAside">
                <img src="../../assets/materialImg/btn_showTab.png">
            </button>
        </div>
        <NavRight @toNav="toNav"/>
    </nav>
</template>

<script>
import NavRight from '@/components/contentPage/NavRight';

export default {
    name: 'Navigater',
    components: {
        NavRight: NavRight
    },
    data() {
        return {
            title: 'lxwTec',
            desc: '做一个有行动力的人！'
        }
    },
    methods: {
        showAside() {
            this.isAsideShow = !this.isAsideShow;
            document.getElementsByTagName("Aside")[0].className = this.isAsideShow == 
            true ? 'hideAside' : 'showAside';
        },
        toNav(e) {
            this.$emit('toNav', e);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*导航栏*/
nav div{
    display: inline-block;
}
nav{
    height: 60px;
    width: 100%;
    background: #20232a;
    z-index: 2;
    padding: 0 10px;
    position: fixed;
    top: 0;
    left: 0;
}
.nav_left{
    padding-left: 24px;
}

.nav_left span{
    margin-left: 36px;
    color: #fff;
    font-size: 16px;
}

.nav_left,.nav_right{
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    background: #20232a;
    height: 60px;
}

.nav_right{
    float: right;
}

.logo{
    width: 50px;
    height: 50px;
}

.btn_showAside{
    display: none;
    width: 50px;
    height: 50px;
}

.btn_showAside img{
    width: 50%;
    height: 50%;
}

@media screen and (min-width: 1200px) {
    .nav_right{
        margin-right: 50px;
    }
}

@media screen and (max-width: 1000px){
    .desc{
        display: none;
    }
}

@media screen and (max-width: 800px) and (min-width: 0px) {
    nav .nav_right,.desc{
        display: none;   
    }
    .logo{
        width: 36px;
        height: 36px;
    }
    .nav_left{
        width: 100%;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-left: 12px;
    }
    .nav_left span{
        margin: 0;
    }
    .btn_showAside{
        display: inline-block;
    }
}

.nav_right ul,.nav_right li{
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
