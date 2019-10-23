<template>
    <div class="keyboard">
        <div class="keyboard_type" v-if="type">
            <div class="colkey">
                <div class="single_key" v-for="item in provinceKey1" @click="tapKey(item.key)">{{item.key}}</div>
            </div>
            <div class="colkey">
                <div class="single_key" v-for="item in provinceKey2" @click="tapKey(item.key)">{{item.key}}</div>
            </div>
            <div class="colkey">
                <div class="single_key" v-for="item in provinceKey3" @click="tapKey(item.key)">{{item.key}}</div>
            </div>
            <div class="colkey">
                <div class="switch unique" @click="switchKeyboard(1)">ABC</div>
                <div class="single_key" v-for="item in provinceKey4" @click="tapKey(item.key)">{{item.key}}</div>
                <div class="delete" @click="deleteKey">
                    <img src="../../common/img/delete.png" alt="">
                </div>
            </div>
        </div>
        <div class="keyboard_type" v-if="!type">
            <div class="colkey">
                <div class="single_key" v-for="item in number" @click="tapKey(item.key)">{{item.key}}</div>
            </div>
            <div class="colkey unique1">
                <div class="single_key" v-for="item in en1" @click="tapKey(item.key)">{{item.key}}</div>
            </div>
            <div class="colkey unique2">
                <div class="single_key" v-for="item in en2" @click="tapKey(item.key)">{{item.key}}</div>
            </div>
            <div class="colkey">
                <div class="switch" @click="switchKeyboard(2)">省份</div>
                <div class="single_key" v-for="item in en3" @click="tapKey(item.key)">{{item.key}}</div>
                <div class="delete" @click="deleteKey">
                    <img src="../../common/img/delete.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Keyboard',
        data() {
            return {
                type: true,
                provinceKey1: [
                    { key: '京'},
                    { key: '津'},
                    { key: '冀'},
                    { key: '鲁'},
                    { key: '晋'},
                    { key: '蒙'},
                    { key: '辽'},
                    { key: '吉'},
                    { key: '黑'},
                    { key: '沪'}
                ],
                provinceKey2: [
                    { key: '苏' },
                    { key: '浙' },
                    { key: '皖' },
                    { key: '闽' },
                    { key: '赣' },
                    { key: '豫' },
                    { key: '鄂' },
                    { key: '湘' },
                    { key: '粤' },
                    { key: '桂' }
                ],
                provinceKey3: [
                    { key: '琼' },
                    { key: '渝' },
                    { key: '川' },
                    { key: '贵' },
                    { key: '云' },
                    { key: '藏' },
                    { key: '陕' },
                    { key: '甘' },
                    { key: '青' },
                    { key: '宁' },
                ],
                provinceKey4: [
                    { key: '新' },
                    { key: '港' },
                    { key: '澳' },
                    { key: '台' },
                    { key: '警' },
                    { key: '使' },
                    { key: '领' },
                ],
                number: [
                    { key: 1 },
                    { key: 2 },
                    { key: 3 },
                    { key: 4 },
                    { key: 5 },
                    { key: 6 },
                    { key: 7 },
                    { key: 8 },
                    { key: 9 },
                    { key: 0 },
                ],
                en1: [
                    { key: 'Q' },
                    { key: 'W' },
                    { key: 'E' },
                    { key: 'R' },
                    { key: 'T' },
                    { key: 'Y' },
                    { key: 'U' },
                    { key: 'P' },
                ],
                en2: [
                    { key: 'A' },
                    { key: 'S' },
                    { key: 'D' },
                    { key: 'F' },
                    { key: 'G' },
                    { key: 'H' },
                    { key: 'J' },
                    { key: 'K' },
                    { key: 'L' },
                ],
                en3: [
                    { key: 'Z' },
                    { key: 'X' },
                    { key: 'C' },
                    { key: 'V' },
                    { key: 'B' },
                    { key: 'N' },
                    { key: 'M' },
                ],
            }
        },

        methods: {
            tapKey(key) {
                this.$emit('writeKey', key);
            },

            //键盘切换
            switchKeyboard(status) {
                if(status == 1) {
                    this.type = false
                } else {
                    this.type = true
                }
            },

            //删除键点击
            deleteKey() {
                this.$emit('deleteKey');
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .keyboard
        height 3.64rem
        color #121212
        font-size 0.3rem
        background: #e3e4e9
        overflow hidden
        .keyboard_type
            width 100%
            height 100%
            display flex
            flex-direction column
            justify-content space-between
            padding 0.12rem 0
        .colkey
            width 100%
            height 0.76rem
            display flex
            justify-content: space-between
            padding 0 0.05rem
            .single_key
                width 0.64rem
                height 100%
                text-align center
                line-height 0.76rem
                background #ffffff
                border-radius 0.05rem
            .switch
                width 1.1rem
                height 100%
                display flex
                color #ffffff
                align-items center
                justify-content center
                background-color #b7c1d0
                border-radius 0.05rem
            .delete 
                width 0.9rem
                height 100%
                display flex
                align-items center
                justify-content center
                background-color #b7c1d0
        .unique1
            padding 0 0.6rem
        .unique2
            padding 0 0.25rem
</style>