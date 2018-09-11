<template>
    <div class="title">
        <button id="btn_drag" :class="nowTitle == 'drag' ? 'active' : ''" @click="skip($event)">拖拽方格</button>
        <button id="btn_cut" :class="nowTitle == 'cut' ? 'active' : ''" @click="skip($event)">剪切图片</button>
    </div>
</template>

<script>
    export default {
        name: 'Title',
        created() {
            if(this.$route.name == 'CutImg') {
                this.$store.commit('changeTitle', 'cut');
            }
        },
        computed: {
            nowTitle() {
                return this.$store.state.nowTitle
            }
        },
        methods: {
            //跳转
            skip(e) {
                if(e.target.id == 'btn_cut') {
                    this.$router.push('/cutImg');
                    this.$store.commit('changeTitle', 'cut');
                }else{
                    this.$router.push('/');
                    this.$store.commit('changeTitle', 'drag');
                }
            },
        }
    }
</script>

<style scoped>
    .title{
        width: 100%;
        height: 46px;
        font-size: 0;
    }

    .title button {
        width: 50%;
        height: 46px;
        font-size: 24px;
        transition: background .5s ease;
    }

    .title .active{
        background: #fff;
        border: none;
    }
</style>