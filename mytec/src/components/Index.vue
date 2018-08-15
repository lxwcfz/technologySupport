<template>
    <div id="app">
        <!--导航栏-->
        <Navigater @toNav="toNav" />
        <!--标题栏-->
        <Aside @changeNowTitle="changeNowTitle" @changeNowMainTitle="changeNowMainTitle" @toNav="toNav"
         :partJS="partContent" :articleNumber="articleNum"/>
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
        // console.log(this.$store.state)
    },
    mounted() {
        window.addEventListener('scroll', this.windowScroll);
        window.addEventListener('reload', this.toOffset(0));
        this.windowScroll();
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
        nowTitle() {
            return this.$store.state.nowTitle
        },
        partContent() {
            return this.$store.state.partContent
        }
    },
    methods: {
        windowScroll() {
            let titles = document.querySelectorAll('.titleArr');
            let now = document.querySelectorAll('.now')[0];
            let container = document.getElementById('aside');
            let offsetBottom = this.nowTitle > 0 ? titles[this.nowTitle - 1].getBoundingClientRect().bottom - 320 : 'x';
            if(container.className !== 'hideAside') {container.scrollTop = now.offsetTop - 240};
            for(let title of titles) {
                let offsetTop = title.getBoundingClientRect().top;
                if(offsetTop > 0 && offsetTop < 160) {
                    this.$store.commit('changeNowTitle', parseInt(title.getAttribute('data-num')));
                };
            };
            if(offsetBottom > 0 && offsetBottom < 160) {
                this.$store.commit('changeNowTitle', this.nowTitle - 1);
            }
            // console.log(this.$store.state.nowTitle)
        },
        changeNowTitle(e, num) {
            let nowMainTitle = parseInt(e.target.parentNode.childNodes[0].getAttribute('data-num'));
            if(this.nowMainTitle !== nowMainTitle) {
                this.changeNowMainTitle(nowMainTitle)
                if(this.nowMainTitle == nowMainTitle) {this.changeNowTitleStep2(num)}
            }else{
                this.changeNowTitleStep2(num);
            }
            // console.log(this.$store.state.nowTitle)
        },
        changeNowTitleStep2(num) {
            this.$store.commit('changeNowTitle', num);
            let titleArr = document.querySelectorAll('.titleArr');
            let nowTop;
            nowTop = titleArr[num].offsetTop - 60;
            this.toOffset(nowTop);
        },
        changeNowMainTitle(num) {
            this.$store.commit('changeNowTitle', 0);
            this.skipToTop(num);
        },
        skipToTop(num) {
             let name = this.$route.name;
            if(name && name !== 'Index') {
                this.$router.push({path: `/index/${name}/${num}`});
            }else{
                this.$router.push({path: `/index/${num}`});
            };
            this.toOffset(0);
        },
        // 导航栏
        toNav(e) {
            if(e.target.getAttribute('data-address').indexOf('http') !== -1) {
                window.location = e.target.getAttribute('data-address');
            }else{
                this.$router.push({path: `${e.target.getAttribute('data-address')}`});
                this.toOffset(0);
            };
        },
        // 上下文章连接按钮
        go(e, prevNum, nextNum) {
            let next = parseInt(e.target.getAttribute('data-next'));
            if(next == -1 && prevNum == 'notExist') {

            }else if(next == 1 && nextNum == 'notExist') {

            }else{
                let res = this.articleNum.nowMainTitle + next;
                this.skipToTop(res)
            }
        },
        toOffset(num) {
            let i = 0;
            let maxTop = document.body.offsetHeight - window.screen.height;
            let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
            num = num > maxTop ? maxTop : num;
            let step = (num - top)/50;
            let timer = setInterval(function(){
                top += step;
                document.documentElement.scrollTop = top;
                document.body.scrollTop = top;
                document.pageYOffset = top;
                i += 1;
                if(i == 50) clearInterval(timer);
            },10)
        },
        mountNowNum() {
            // console.log(this.articleNum.nowMainTitle)
            this.articleNum.nowMainTitle = parseInt(this.$route.params.nowMainTitle);
            // console.log(this.articleNum.nowMainTitle)
        },
        updateContent() {
            let nowIndex = this.$route.name;
            let nowContent = `part${nowIndex.toUpperCase()}`;
            this.$store.commit('changePartContent', nowContent);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
