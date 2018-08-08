<template>
    <footer class="footer">
        <section>
             <button @click="go($event)" :data-next="-1">← {{ prevText }}</button>
            <button @click="go($event)" :data-next="1">→ {{ nextText }}</button>
        </section>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    props: ['partJs','articleNum'],
    created() {
        
    },
    watch: {
        // '$route'(to, from) {
        //     console.log(this.nowMainTitle)
        // }
    },
    computed: {
        partJS() {
            return this.partJs
        },
        nowMainTitle() {
            return parseInt(this.articleNum.nowMainTitle)
        },
        prevText() {
            return this.nowMainTitle - 1 < 0  ? '没有了' : this.partJS[this.prevNum].mainTitle
        },
        nextText() {
            return this.partJS.length - this.nowMainTitle <= 1 ? '没有了' : this.partJS[this.nextNum].mainTitle
        },
        prevNum() {
            return this.nowMainTitle - 1 >= 0 ? this.nowMainTitle - 1 : 'notExist'
        },
        nextNum() {
            return this.partJS.length - this.nowMainTitle > 1 ? this.nowMainTitle + 1 : 'notExist'
        }
    },
    methods: {
        go(e) {
            this.$emit('tz', e, this.prevNum, this.nextNum)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer{
    width: 100%;
    padding: 0 42px 36px 236px;
}
section{
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
button{
    font-size: 14px;
    color: #1190b5;
    max-width: 120px;
}
@media screen and (max-width: 800px) and (min-width: 0) {
    .footer{
        padding: 0 20px 36px 20px;
    }
}
</style>
