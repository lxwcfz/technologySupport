<template>
	<div class="book_list">
		<!--导航栏-->
        <Navigater @toNav="toNav" />
        <!--标题栏-->
        <Aside @changeNowTitle="changeNowTitle" @changeNowMainTitle="changeNowMainTitle" @toNav="toNav"
         :partJS="partContent" :articleNumber="articleNum" />
		<ul class="ul">
			<li v-for="article in articles" :key="article.name">
				<img :src="article.imgurl">
				<p>{{ article.title }}</p>
				<button :class="article.class" :data-address="article.address" @click="toNav($event)">阅读</button>
				<span>{{ article.status }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
import Navigater from '@/components/contentPage/Navigater';
import Aside from '@/components/contentPage/Aside';

export default {
	name: 'IndexPage',
	components: {
		Navigater,
		Aside
	},
	data() {
		return {
			articles: this.$store.state.articles,
			partContent: '',
			articleNum: ''
		}
	},
	methods: {
		 // 导航栏
        toNav(e) {
            if(e.target.getAttribute('data-address').indexOf('http') !== -1) {
                window.location = e.target.getAttribute('data-address');
            }else{
                this.$router.push({path: `${e.target.getAttribute('data-address')}`});
                this.toOffset(0);
            };
        },
        changeNowTitle() {

        },
        changeNowMainTitle() {

        }
	}
}
</script>

<style scoped>
@media screen and (min-width: 800px) {
	.book_list #aside{
		display: none;
	}
	.book_list ul{
		flex-direction: row;
		flex-wrap: wrap;
		padding-left: 166px;
	}
	ul li{
		margin-right: 50px;
		margin-bottom: 30px;
	}
	ul:after{
		content: '';
		flex: auto;
	}
}

@media screen and (min-width: 800px) and (max-width:1300px) {
	.book_list .ul {
		padding-left: 250px;
	}
}

ul{
	width: 100%;
	padding: 80px 5%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

li{
	background: #f7f7f7;
    box-shadow: 0 0 5px #8a7e7e;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    transition: box-shadow .2s ease;
    margin-bottom: 12px;
}

.orange{
	background: #d25910;
}

.blue{
	background: #59a5bb;
}

.green{
	background: #51924f;
}

li img{
	width: 90%;
	height: 240px;
}

li p{
	font-size: 20px;
	margin-top: 10px;
	text-shadow: 5px 3px 5px #988686;
    color: #4e4a47;
}

li button{
    font-size: 14px;
    margin-top: 6px;
    padding: 6px 32px;
    border-radius: 5px;
    color: #fff;
    letter-spacing: 5px;
}

li span{
	font-size: 14px;
	margin-top: 6px;
}

li:hover,li button:hover{
	box-shadow: 0 0 16px #8a7e7e;
}
</style>