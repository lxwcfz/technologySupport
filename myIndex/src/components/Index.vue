<template>
    <div id="app">
        <!--导航栏-->
        <Navigater/>
        <!--标题栏-->
        <Aside :partJS="partJS" :articleNumber="articleNum"/>
        <!-- 正文 -->
        <Content :partJS="partJS" :articleNum="articleNum"/>
        <!--底部-->
        <Footer @tz="go" :partJs="partJS" :articleNum="articleNum"/>
    </div>
</template>

<script>
import Navigater from '@/components/Navigater';
import Aside from '@/components/Aside';
import Content from '@/components/Content';
import Footer from '@/components/Footer';
import commonJS from '../commonJS/commonJS.js';

import partJS from '../dataBase/articleJS.js';

export default {
    name: 'Index',
    mixins: [commonJS],
    components: {
        Navigater: Navigater,
        Aside: Aside,
        Content: Content,
        Footer: Footer
    },
    created() {
        // console.log(this.articleNum.nowMainTitle)
    },
    watch: {
        '$route': 'mountNowNum'
    },
    computed: {
        articleNum() {
            return {
                nowMainTitle: parseInt(this.$route.params.nowMainTitle),
                nowTitle: parseInt(this.$route.params.nowTitle)
            }
        }
    },
    data () {
        return {
            partJS: partJS
        }
    },
    methods: {
        changeNowTitle() {

        },
        go(e, prevNum, nextNum) {
            let next = parseInt(e.target.getAttribute('data-next'));
            if(next == -1 && prevNum == 'notExist') {

            }else if(next == 1 && nextNum == 'notExist') {

            }else{
                let res = this.articleNum.nowMainTitle + next;
                this.$router.push({path: `/index/${res}/0`});
                document.documentElement.scrollTop = 0;
            }
        },
        mountNowNum() {
            // console.log(this.articleNum.nowMainTitle)
            this.articleNum.nowMainTitle = parseInt(this.$route.params.nowMainTitle);
            // console.log(this.articleNum.nowMainTitle)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
