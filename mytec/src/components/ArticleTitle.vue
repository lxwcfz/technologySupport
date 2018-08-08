<template>
    <div class="article_title">
        <div v-for="(article,index) in articles" :key="article.mainTitle">
            <h1 @click="toNowMainTitle($event)" :data-num="index" :class="index == nowMainTitle ? 'now' : 'notnow'">{{ article.mainTitle }}</h1>
            <button @click="toNowTitle($event)" :data-num="i" v-for="(title,i) in article.content" :class="i == nowTitle && index == nowMainTitle ? 'now' : 'notnow'"  :key="title.title">· {{ title.title }}</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ArticleTitle',
    props: ['partJS', 'articleNum'],
    computed: {
        articles() {
            return this.partJS
        },
        nowTitle() {
            return this.articleNum.nowTitle
        },
        nowMainTitle() {
            return this.articleNum.nowMainTitle
        }
    },
    methods: {
        toNowTitle(e) {
            let num = parseInt(e.target.getAttribute('data-num'));
            this.$emit('toNowTitle', e, num)
        },
        toNowMainTitle(e) {
            let num = e.target.getAttribute('data-num');
            this.$emit('toNowMainTitle', num);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.article_title{
    background: #20232a;
}
.now{
    color: skyblue;
}
h1{
    font-size: 16px;
    width:100%;
    padding: 4px 10px;
    color: #fff;
    cursor: pointer;
}
h1:hover{
    color: skyblue;
}

button{
    padding: 8px 10px 8px 15px;
    text-align: left;
    font-size: 14px;
    width: 100%;
    color: #fff;
    transition: background .5s ease;
}

button:hover{
    background: #4b606f;
}
</style>
