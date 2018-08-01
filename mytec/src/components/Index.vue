<template>
    <div id="app">
        <!--导航栏-->
        <Navigater @toNav="toNav" />
        <!--标题栏-->
        <Aside @changeNowTitle="changeNowTitle" @changeNowMainTitle="changeNowMainTitle" @toNav="toNav" :partJS="partContent" :articleNumber="articleNum"/>
        <!-- 正文 -->
        <Content :partJS="partContent" :articleNum="articleNum"/>
        <!--底部-->
        <Footer @tz="go" :partJs="partContent" :articleNum="articleNum"/>
    </div>
</template>

<script>
import Navigater from '@/components/Navigater';
import Aside from '@/components/Aside';
import Content from '@/components/Content';
import Footer from '@/components/Footer';
import commonJS from '../commonJS/commonJS.js';

import partJS from '../dataBase/articleJS.js';
import partHTML from '../dataBase/articleHTML.js';
import partCSS from '../dataBase/articleCSS.js';

export default {
    name: 'Index',
    mixins: [commonJS],
    props: ['nowMainTitle'],
    components: {
        Navigater: Navigater,
        Aside: Aside,
        Content: Content,
        Footer: Footer
    },
    created() {
        // console.log(this.partContent)
    },
    watch: {
        '$route' (to,from) {
            this.mountNowNum();
            this.updateContent();
        }
    },
    computed: {
        articleNum() {
            return {
                nowMainTitle: parseInt(this.nowMainTitle),
                nowTitle: parseInt(this.nowTitle)
            }
        },
        partContent: {
            get() {
                return this.Content.partjs
            },
            set(newValue) {
                return newValue
            }
        }
    },
    data () {
        return {
            Content: {
                partjs: partJS,
                parthtml: partHTML,
                partcss: partCSS
            },
            nowTitle: 0
        }
    },
    methods: {
        changeNowTitle(num) {

        },
        changeNowMainTitle(num) {
            
        },
        // 导航栏
        toNav(e) {
            if(e.target.getAttribute('data-address').indexOf('http') !== -1) {
                window.location = e.target.getAttribute('data-address');
            }else{
                this.$router.push({path: `${e.target.getAttribute('data-address')}`});
            };
        },
        // 上下文章连接按钮
        go(e, prevNum, nextNum) {
            let next = parseInt(e.target.getAttribute('data-next'));
            if(next == -1 && prevNum == 'notExist') {

            }else if(next == 1 && nextNum == 'notExist') {

            }else{
                let res = this.articleNum.nowMainTitle + next;
                this.$router.push({path: `/index/${res}`});
                this.toTop();
            }
        },
        toTop() {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            window.pageYOffset = 0;
        },
        mountNowNum() {
            // console.log(this.articleNum.nowMainTitle)
            this.articleNum.nowMainTitle = parseInt(this.$route.params.nowMainTitle);
            // console.log(this.articleNum.nowMainTitle)
        },
        updateContent() {
            let nowIndex = this.$route.name;
            let nowContent = `part${nowIndex}`;
            this.partContent = this.Content.nowContent;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
