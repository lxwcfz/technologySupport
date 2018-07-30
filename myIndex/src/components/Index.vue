<template>
    <div id="app">
        <!--导航栏-->
        <Navigater/>
        <!--标题栏-->
        <Aside :partJS="partJS" :articleNumber="articleNum"/>
        <!-- 正文 -->
        <Content :partJS="partJS" :articleNum="articleNum"/>
        <!--底部-->
    </div>
</template>

<script>
import Navigater from '@/components/Navigater';
import Aside from '@/components/Aside';
import Content from '@/components/Content';

import partJS from '../dataBase/articleJS.js';

export default {
    name: 'Index',
    components: {
        Navigater: Navigater,
        Aside: Aside,
        Content: Content
    },
    data () {
        return {
            partJS: partJS,
            articleNum: {
                nowMainTitle: 0,
                nowTitle: 0
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
