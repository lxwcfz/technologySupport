<template>
    <div class="hello">
        <Title />
        <div class="table">
            <button :id="'btn'+i" draggable="1" v-for="(item, i) in btns" :data-col="item.col" 
            :data-row="item.row" @drag="dragStart($event)" @dragover="allowDrop($event)" 
            @dragenter="enter($event)" @dragleave="leave($event)"
            @drop="drop($event), leave($event)">{{ item.value }}</button>
        </div>
    </div>
</template>

<script>
import Title from '@/components/Title';

    export default {
        name: 'Drag',
        computed: {
            nowTitle() {
                return this.$store.state.nowTitle
            }
        },
        components: {
            Title
        },
        created() {
            let str = 'A-B-C-D-1-4-6-9-2-5-7-10-3-5-8-11';
            let arr = str.split('-');
            console.log(arr);
            const btns = [];
            let i = 1, o = 1;
            for(let item of arr) {
                let obj = {
                    value: item,
                    row: i,
                    col: o
                };
                btns.push(obj);
                o += 1;
                if(o == 5) {
                    i += 1;
                    o = 1;
                }
            };
            this.btns = btns;
        },
        data () {
            return {
                firstTarget: '',
                btns: []
            }
        },
        methods: {
            //记录开始被拖动元素身份信息
            dragStart(e) {
                this.firstTarget = e.target;
            },
            //允许元素被放置
            allowDrop(e) {
                e.preventDefault();
            },
            enter(e) {
                e.preventDefault();
                e.target.style.fontSize = '30px';
                e.target.style.color = 'skyblue';
                e.target.style.background = '#fff';
            },
            leave(e) {
                e.preventDefault();
                e.target.style.color = '#000';
                e.target.style.fontSize = '24px';
                e.target.style.background = '#f2f2f2';
            },
            drop(e) {
                if(e.target !== this.firstTarget) {
                    let nextInfo = {
                        value: e.target.innerHTML,
                        row: e.target.getAttribute('data-row'),
                        col: e.target.getAttribute('data-col')
                    };
                    let lastInfo = {
                        value: this.firstTarget.innerHTML,
                        row: this.firstTarget.getAttribute('data-row'),
                        col: this.firstTarget.getAttribute('data-col')
                    };
                    this.dropEnd(lastInfo, nextInfo);
                };
            },
            //拖放完毕
            dropEnd(lastInfo, nextInfo) {
                let lastValue = lastInfo.value;
                let nextValue = nextInfo.value;
                let lastRow = parseInt(lastInfo.row);
                let lastCol = parseInt(lastInfo.col);
                let nextRow = parseInt(nextInfo.row);
                let nextCol = parseInt(nextInfo.col);
                let lastIndex = (lastRow - 1) * 4 + lastCol - 1;
                let nextIndex = (nextRow - 1) * 4 + nextCol - 1;
                if(lastRow == nextRow && lastCol !== nextCol) {
                    this.exchange(2, lastCol, nextCol);                    
                    this.showToast(lastValue, nextValue, 2)
                }else if(lastCol == nextCol) {
                    this.exchange(1, lastRow, nextRow);
                    this.showToast(lastValue, nextValue, 1)
                }else{
                    this.exchange(3, lastIndex, nextIndex);                    
                    this.showToast(lastValue, nextValue, 3)
                }
            },
            //交换元素（单个、行、列）
            exchange(kind) {
                switch(kind) {
                    //整行交换
                    case 1: {
                        let lastRow = arguments[1].toString();
                        let nextRow = arguments[2].toString();
                        const lastArr = [], nextArr = [];
                        for(let item of this.btns) {
                            if(item.row == lastRow) {
                                lastArr.push(item.value);
                            };
                            if(item.row == nextRow) {
                                nextArr.push(item.value);
                            }
                        };
                        let last = 0, next = 0;
                        for(let ware of this.btns) {
                            if(ware.row == nextRow) {
                                ware.value = lastArr[last];
                                last = last + 1;
                            };
                            if(ware.row == lastRow) {
                                ware.value = nextArr[next];
                                next = next + 1;
                            }
                        }
                    }
                    break;
                    //整列交换
                    case 2: {
                        let lastCol = arguments[1].toString();
                        let nextCol = arguments[2].toString();
                        const lastArr = [], nextArr = [];
                        for(let item of this.btns) {
                            if(item.col == lastCol) {
                                lastArr.push(item.value);
                            };
                            if(item.col == nextCol) {
                                nextArr.push(item.value);
                            }
                        };
                        let last = 0, next = 0;
                        for(let ware of this.btns) {
                            if(ware.col == nextCol) {
                                ware.value = lastArr[last];
                                last = last + 1;
                            };
                            if(ware.col == lastCol) {
                                ware.value = nextArr[next];
                                next = next + 1;
                            }
                        }
                    }
                    break;
                    //单个交换
                    case 3: {
                        let last = arguments[1];
                        let next = arguments[2];
                        let mid = this.btns[last].value;
                        this.btns[last].value = this.btns[next].value;
                        this.btns[next].value = mid;
                    }
                    break;
                }
            },
            //提示元素交换信息
            showToast(btn1, btn2, kind) {
                switch(kind) {
                    //整行交换
                    case 1: {
                        alert(`第${btn1}行与第${btn2}行进行了交换`)
                    }
                    break;
                    //整列交换
                    case 2: {
                        alert(`第${btn1}列与第${btn2}列进行了交换`)
                    }
                    break;
                    //单个交换
                    case 3: {
                        alert(`按钮${btn1}与按钮${btn2}进行了交换`)
                    }
                    break;
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .hello{
        width: 100%
    }

    .table{
        width: 240px;
        height: 240px;
        margin: 60px auto;
    }

    .table button{
        width: 60px;
        height: 60px;
        font-size: 24px;
        border: 1px solid #000;
        background: #f2f2f2;
        transition: background,font-size .3s ease;
    }
</style>
