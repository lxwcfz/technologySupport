<template>
    <aside class="aside" id="aside">
    	<NavRight/>
		<ArticleTitle :partJS="articles" :articleNum="articleNum"/>
	</aside>
</template>

<script>
import NavRight from '@/components/NavRight';
import ArticleTitle from '@/components/ArticleTitle';

export default {
    name: 'Aside',
    props: ['partJS', 'articleNumber'],
    components: {
    	NavRight: NavRight,
    	ArticleTitle: ArticleTitle
    },
    data () {
        return {
            articles: this.partJS
        }
    },
    computed: {
        articleNum() {
            return this.articleNumber
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (min-width: 800px) {
    .nav_right{
        display: none;
    }
    #aside{
    	width: 200px;
        transform: translateX(0);
    	left: 0;
    	border-right: 10px solid skyblue;
    }
}
aside{
	position:fixed;
	background: #20232a;
	width: 120px;
	height: 100%;
	padding-bottom: 70px;
	overflow-y: auto;
	transform: translateX(0);
	right: 0;
	top: 60px;
	transition: transform .2s ease;
	border-bottom-left-radius: 5px;
	box-shadow: -5px 5px 15px #576477;
}
.hideAside{
	transform: translateX(110%);
}
</style>
