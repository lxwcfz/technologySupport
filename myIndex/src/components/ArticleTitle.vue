<template>
    <div class="article_title">
        <div v-for="(article,index) in articles" :key="article.mainTitle">
            <h1 :class="index == nowMainTitle ? 'now' : 'notnow'">{{ article.mainTitle }}</h1>
            <button v-for="(title,i) in article.content" :class="i == nowTitle && index == nowMainTitle ? 'now' : 'notnow'"  :key="title.title">· {{ title.title }}</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ArticleTitle',
    props: ['partJS', 'articleNum'],
    data () {
        return {
            articles: this.partJS,
            nowMainTitle: this.articleNum.nowMainTitle,
            nowTitle: this.articleNum.nowTitle
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
