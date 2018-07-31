<template>
    <content id="content">
        <article>
            <h1>{{ content[nowMainTitle].mainTitle }}</h1>
            <div v-for="item in content[nowMainTitle].content" :key="item.title">
                <h2>{{ item.title }}</h2>
                <div v-for="wave in item.content" :key="wave.text">
                    <p v-if="wave.text">{{ wave.text }}</p>
                    <div class="codeImgContainer" v-if="wave.src">
                        <img :src="wave.src">
                    </div>
                </div>
            </div>
        </article>
    </content>
</template>

<script>
export default {
    name: 'Content',
    props: ['partJS', 'articleNum'],
    data () {
        return {
            content: this.partJS
        }
    },
    computed: {
        nowTitle() {
            return this.articleNum.nowTitle
        },
        nowMainTitle() {
            return this.articleNum.nowMainTitle
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
    display: inline-block;
}
content{
    width: 100%;
    padding: 70px 24px 24px 224px; 
}
article{
    box-sizing: content-box;
    background: #f3f3f3;
    border-radius: 12px;
    padding: 12px;
    width: 96%;
}
h1{
    color: #54a2b5;
    font-size: 24px;
}
h2{
    color: #60888a;
    font-size: 20px;
    line-height: 36px;
}
.codeImgContainer{
    width: 100%;
    overflow: auto;
    box-shadow: 0 5px 5px 5px #d9e1e2;
    margin: 12px 0;
}
.codeImgContainer img{
    min-width: 100%;
}
p{
    color: #000;
    font-size: 14px;
    line-height: 24px;
    text-indent: 24px;
}
@media screen and (max-width: 800px) and (min-width: 0px) {
    #content{
        padding: 70px 26px 30px 12px;
    }
    #content h1{
        font-size: 22px;
    }
    #content h2{
        font-size: 18px;
    }
}
content h1,content div,p,h2{
    width: 100%;
}
</style>
