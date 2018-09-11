<template>
    <div class="world">
        <Title />
        <div class="auto">
            <div class="img_container" >
                <img draggable="false" :src="url">
                <span class="mark" @drag="dragging($event)" draggable="1" @dragstart="dragstart($event)"
                @dragend="dragend($event)"></span>
            </div>
            <div class="right">
                <div class="final_img">
                    <img :src="url" class="target">
                </div>
                <button onclick="alert('保存成功！')">保存</button>
            </div>
        </div>
    </div>
</template>

<script>
import Title from '@/components/Title';

    export default {
        name: 'CutImg',
        data () {
            return {
                url: require('@/assets/bg3.png'),
                oldX: 0,
                oldY: 0,
                newX: 0,
                newY: 0,
                arr: []
            }
        },
        components: {
            Title
        },
        methods: {
            dragstart(e) {
                var e = e || window.event;
                let mark = document.querySelector('.mark');
                this.oldY = e.clientY - mark.offsetTop;
                this.oldX = e.clientX - mark.offsetLeft;
                this.flag = 1;
                console.log(this.oldX, this.oldY)
            },
            dragging(e) {
                var e = e || window.event;
                if(this.flag == 1) {
                    let mark = document.querySelector('.mark');
                    let target = document.querySelector('.target');
                    let x = e.clientX - this.oldX;
                    let y = e.clientY - this.oldY;
                    mark.style.left = x + 'px';
                    mark.style.top = y + 'px';
                    target.style.transform = `translateX(${-x}px) translateY(${-y}px)`;
                    this.newX = x;
                    this.newY = y;
                    this.arr.push({x: x, y: y});
                }
            },
            dragend(e) {
                let mark = document.querySelector('.mark');
                let target = document.querySelector('.target');
                let left = this.arr[this.arr.length - 2].x;
                let top = this.arr[this.arr.length - 2].y;
                left = left >= 180 ? 180 : left;
                left = left <= 0 ? 0 : left;
                top = top >= 180 ? 180 : top;
                top = top <= 0 ? 0 : top;
                mark.style.left = left + 'px';
                mark.style.top = top + 'px';
                target.style.transform = `translateX(${-left}px) translateY(${-top}px)`;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .world{
        width: 100%;
    }

    .auto{
        margin: 0 auto;
        width: 730px;
        height: 360px;
        display: block;
    }

    div{
        display: inline-block;
    }

    .img_container{
        width: 300px;
        height: 300px;
        margin: 30px;
        position: relative;
        overflow: hidden;
        vertical-align: top;
    }

    .img_container img{
        width: 100%;
        height: 100%;
    }

    .img_container span{
        display: inline-block;
        width: 120px;
        height: 120px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
        border: 3px dashed red;
        box-sizing: border-box;
    }

    .right{
        width: 300px;
        height: 300px;
        margin: 30px;
        vertical-align: top;
    }

    .final_img{
        width: 120px;
        height: 120px;
        overflow: hidden;
        margin: 20px;
    }

    .final_img img{
        width: 300px;
        height: 300px;
    }

    button{
        font-size: 24px;
        padding: 10px 30px;
        margin: 20px;
    }
</style>
