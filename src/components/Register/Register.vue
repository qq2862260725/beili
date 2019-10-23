<template>
  <div class="register">
      <div class="user">
        <div class="car_wrap">
          <div class="tag">请输入车牌号</div>
          <div class="carnum">
            <div class='single' @click="tapInput(1)">
              <span>{{num1}}</span>
              <div class='action' v-show="step == 1"></div>
            </div>
            <div class='single' @click="tapInput(2)">
              <span>{{num2}}</span>
              <div class='action' v-show="step == 2"></div>
            </div>
            <div class='single' @click="tapInput(3)">
              <span>{{num3}}</span>
              <div class='action' v-show="step == 3"></div>
            </div>
            <div class='single' @click="tapInput(4)">
              <span>{{num4}}</span>
              <div class='action' v-show="step == 4"></div>
            </div>
            <div class='single' @click="tapInput(5)">
              <span>{{num5}}</span>
              <div class='action' v-show="step == 5"></div>
            </div>
            <div class='single' @click="tapInput(6)">
              <span>{{num6}}</span>
              <div class='action' v-show="step == 6"></div>
            </div>
            <div class='single' @click="tapInput(7)">
              <span>{{num7}}</span>
              <div class='action' v-show="step == 7"></div>
            </div>
            <div class='single' @click="tapInput(8)">
              <span>{{num8}}</span>
              <div class='action' v-show="step == 8"></div>
            </div>
          </div>
        </div>
        <div class="input_wrap">
          <div class="type">车主姓名</div>
          <input type="text" placeholder="请输入您的姓名" @focus="hideKeyboard" v-model="userName">
        </div>
        <div class="input_wrap">
          <div class="type">手机号</div>
          <input type="text" placeholder="请输入您的手机号" @focus="hideKeyboard" v-model="userPhone">
        </div>
        <div class="car_type">
          <div class="car_tag">请选择动力类型</div>
          <div class="car_desc">
            <div class="car_typename">{{carType}}</div>
            <div class="chose" @click="showAllType">
              <img src="../../common/img/down.png" alt="">
            </div>
            <div class="all_type" v-show="show">
              <span><em></em></span>
              <div class="single" 
                :class="{ active: currentIndex === index }" 
                v-for="(type, index) in allType" 
                @click="choseType(index)">{{type}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="keyboard_wrap" v-show="showkeyboard">
        <keyboard @writeKey="keyTap" @deleteKey="deleteKey" ref="keyboard"></keyboard>
      </div>
      <div class="note_wrap" v-show="showNote">
        <note :note="notetext"></note>
      </div>
      <div class="note" v-if="note">
        <h5>安全驾驶承诺书</h5>
        <p>为了保证自己和他人身安全，避免给单位造成损失，本人自愿向单位承诺并遵守，认真履行下列......</p>
        <div class="know" @click="closeNote">
          <span v-if="time >= 0">{{time}}s</span>          
          确定
          </div>
      </div>
      <div class="ensure" @click="ensureSubmit">确认注册</div>
  </div>
</template>

<script>
import Keyboard from 'base/keyboard/keyboard'
import Note from 'base/note/note'
import { register } from 'api/register'
import storage from 'good-storage'

export default {
  name: 'Register',
  data () {
    return {
      show: false,
      showkeyboard: true,
      showNote: false,
      note: false,
      currentIndex: '',
      allType: ['燃油车', '新能源车', '油电混合车'],
      carType: '',
      userName: '',
      userPhone: '',
      time: 5,
      num1: "京",
      num2: '',
      num3: '',
      num4: '',
      num5: '',
      num6: '',
      num7: '',
      num8: '',
      step: 1,
      notetext: '',
    }
  },

  computed: {
    carNum() {
      return `${this.num1}${this.num2}${this.num3}${this.num4}${this.num5}${this.num6}${this.num7}${this.num8}`
    }
  },

  methods: {
    //展示所有类别
    showAllType() {
      this.show = !this.show
      if(this.showkeyboard) {
        this.showkeyboard = false
      }
      
    },

    noteFn(text) {
      this.notetext = text
      this.showNote = true
      setTimeout(() => {
        this.showNote = false
      }, 2000)
    },

    //选择类型
    choseType(index) {
      let choseType = this.allType[index]
      if(this.carNum.length == 7) {
        if(choseType == '新能源车') {
          this.noteFn('不能选择新能源车')
        } else {
          this.carType = choseType
          this.currentIndex = index
          this.show = false
        }
      } else if(this.carNum.length == 8) {
        if(choseType == '燃油车') {
          this.noteFn('不能选择燃油车')
        } else {
          this.carType = choseType
          this.currentIndex = index
          this.show = false
        }
      } else {
        this.carType = choseType
        this.currentIndex = index
        this.show = false
      }
    },

    //隐藏键盘
    hideKeyboard() {
      this.showkeyboard = false
    },

    //注册
    ensureSubmit() {
      let phoneReg = /^1[3456789]\d{9}$/
      let carNum = this.carNum
      let carType = this.carType == '燃油车' ? 1 : this.carType == '新能源车' ? 2 : 3
      let name = this.userName
      let phone = this.userPhone
      if(name == '') {
        this.noteFn('请输入姓名')
      } else if(carNum == '' || carNum.length < 7) {
        this.noteFn('请输入正确车牌号')
      } else if(phone == '') {
        this.noteFn('请输入手机号')
      } else if(!phoneReg.test(phone)) {
        this.noteFn('手机号格式不正确')
      } else {
        register(carNum, carType, name, phone).then(res => {
          console.log(res)
          if(res.code == 1) {
            storage.set('userId', res.data.pm_setrent_userinfo_id)
            this.note = true
            this.timer = setInterval(() => {
              if(this.time >= 0) {
                this.time--
              } else {
                clearInterval(this.timer)
                this.$router.push({
                  path: '/Home'
                })
              }
            }, 1000)
          } else {
            this.noteFn(res.msg)
          }
        })
      }
      
    },

    //关闭提示
    closeNote() {
      if(this.time > 0) {

      } else {
        this.note = false
        this.time = 5
      }
    },

    //点击车牌框
    tapInput(key) {
      if(!this.showkeyboard) {
        this.showkeyboard = true
      }
      this.step = key
    },

    //删除键
    deleteKey() {
      let currentStep = this.step
      switch(currentStep) {
        case 2: 
          this.num2 = ''
          this.step--
          break;
        case 3: 
          this.num3 = ''
          this.step--
          break;
        case 4: 
          this.num4 = ''
          this.step--
          break;
        case 5: 
          this.num5 = ''
          this.step--
          break;
        case 6: 
          this.num6 = ''
          this.step--
          break;
        case 7: 
          this.num7 = ''
          this.step--
          break;
        case 8: 
          this.num8 = ''
          this.step--
          break;
        default: 
          
      }
    },

    //键盘点击
    keyTap(key) {
      let currentStep = this.step
      switch(currentStep) {
        case 1: 
          this.num1 = key
          this.step++
          break
        case 2: 
          this.num2 = key
          this.step++
          break
        case 3: 
          this.num3 = key
          this.step++
          break
        case 4: 
          this.num4 = key
          this.step++
          break
        case 5: 
          this.num5 = key
          this.step++
          break
        case 6: 
          this.num6 = key
          this.step++
          break
        case 7: 
          this.num7 = key
          this.step++
          break
        case 8: 
          this.num8 = key
          break
        default: 
          
      }
    },
  },

  watch: {
    step(currentStep) {
      if(currentStep == 1) {
        this.$refs.keyboard.switchKeyboard(2)
      } else {
        this.$refs.keyboard.switchKeyboard(1)
      }
    },

    carNum(value) {
      if(value.length == 7 && this.carType == '新能源车') {
        this.carType = ''
      }
      if(value.length == 8 && this.carType == '燃油车') {
        this.carType = ''
      }
    }

  },

  components: {
    Keyboard,
    Note
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .register 
    position relative
    width 100%
    height auto
    padding 0.22rem 0
    .note_wrap
      position fixed
      top 50%
      left 50%
      transform translate(-50%, -50%)
      display flex
      justify-content center
      align-items center
    .user 
      width 6.9rem
      height auto
      margin 0 auto
      padding 0.12rem 0.3rem
      background-color #ffffff
      border-radius 0.05rem
      .car_wrap
        height auto
        width 100%
        .tag
          color #000000
          font-size 0.3rem
          line-height 0.7rem
        .carnum
          width 100%
          height 0.85rem
          display flex
          background-color #f8f8f8
          border-radius 0.05rem
          .single
            position relative
            height 100%
            flex 1
            color #333333
            font-size 0.3rem
            line-height 0.85rem
            text-align center
          .single:nth-of-type(1):before
            content: ''
            position absolute
            width 1px
            height 0.31rem 
            right 0
            top 50%
            transform translateY(-50%)
            background #222222
          .action
            position absolute
            height 2px
            width 100%
            bottom 0
            background-color #3385EC
            animation myfirst 1.5s infinite
          @keyframes myfirst 
            from 
              background-color: #3385EC
            to 
              background-color: #ffffff
      .input_wrap
        width 100%
        height 0.85rem
        display flex
        color #000000
        font-size 0.3rem
        border-bottom 1px solid #CCCCCC
        .type
          width 1.3rem
          height 100%
          line-height 0.85rem
        input 
          flex 1
          color #666666
          font-size 0.28rem
          text-align right
      .car_type
        width 100%
        height 0.45rem
        margin 0.4rem auto 0.2rem
        display flex
        line-height 0.45rem
        justify-content space-between
        .car_tag
          width 2.5rem
          height 100%
          color #000000
          font-size 0.3rem
        .car_desc 
          position relative
          width 3.3rem
          height 100%
          display flex
          .car_typename 
            flex 1
            color #222222
            font-size 0.3rem
            border 1px solid #999999
            padding 0 0.1rem
            border-right none
          .chose
            width 0.45rem
            height 100%
            display flex
            justify-content center
            align-items center
            background-color #3385EC
            img 
              width 0.15rem
              height 0.1rem
          .all_type
            position absolute
            width 3.28rem
            height auto
            top 0.7rem
            background-color #ffffff 
            border 1px solid #999999
            border-bottom none
            border-radius 0.05rem
            span
              position absolute
              display block
              width: 0
              height: 0
              border-width:0 8px 8px
              border-style solid
              top -8px
              right 0.1rem
              border-color transparent transparent #999999 transparent
              em
                display block
                width 0 
                height 0 
                border-width 0 8px 8px 
                border-style solid 
                border-color transparent transparent #ffffff
                position absolute 
                top 1px 
                left -8px
            .single
              color #222222
              font-size 0.3rem
              line-height 0.45rem
              padding 0 0.4rem
              border-bottom 1px solid #999999
            .active 
              color #3385EC
    .ensure
      width 6.3rem
      height 0.85rem
      margin 4.4rem auto 0
      color #ffffff
      font-size 0.3rem
      line-height 0.85rem
      text-align center
      background-color #3385ec
      box-shadow 0 0 0.2rem #3385ec
    .note 
      position absolute
      width 4.7rem
      height auto
      background-color #ffffff
      top 3.14rem
      left 50%
      transform translate(-50%, 0)
      padding 0.1rem 0.25rem
      h5
        font-size 0.3rem
        color #3385EC
        text-align center
        line-height 0.7rem
      p 
        color #000000
        font-size 0.3rem
        line-height 0.42rem
      .know
        width 1.5rem
        height 0.55rem
        margin 0.33rem auto
        line-height 0.85rem
        color #ffffff
        background #3385EC
        font-size 0.3rem
        text-align center
        line-height 0.55rem
        border-radius 0.05rem
        box-shadow 0 0 0.2rem #3385ec
    .keyboard_wrap 
        position fixed
        bottom 0
        width 100%
        height auto
</style>
