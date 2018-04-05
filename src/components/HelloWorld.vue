<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="select-panel">
      <input type="text" class="select-input" placeholder="请输入"
      v-model="keyword"
      @keyup="get($event)"
      @keydown.down="selectDown()"
      @keydown.up.prevent="selectUp()"
      @keydown.enter="selectItem()">
      <div class="search-select" v-show="searchData.length">
        <transition-group name="itemfade" tag="ul" mode="out-in" v-cloak>
          <li v-for="(value,index) in searchData" :key="value"
              :class="{'select-item':index==now}" class="search-select-option search-select-list"
              @mouseover="selectHover(index)"
              @click="selectClick(index)"
              v-html="value.replace(keyword, `<span style='color: red;'>${keyword}</span>`)">
          </li>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '可输入的下拉框组件',
      keyword: '',
      searchData: [],
      now: -1
    }
  },
  computed: {
  },
  methods: {
    get: function (ev) {
      if (ev.keyCode === 38 || ev.keyCode === 40) {
        return
      }
      this.$http.jsonp('https://sug.so.360.cn/suggest?word=' + this.keyword + '&encodein=utf-8&encodeout=utf-8')
        .then((res) => {
          this.searchData = res.data.s
        })
    },
    selectDown: function () {
      this.now++
      // 到达最后一个时，再按下就回到第一个
      if (this.now === this.searchData.length) {
        this.now = 0
      }
      // this.keyword = this.searchData[this.now]
    },
    selectUp: function () {
      this.now--
      // 同上
      if (this.now === -1) {
        this.now = this.searchData.length - 1
      }
      // this.keyword = this.searchData[this.now]
    },
    selectItem: function () {
      this.keyword = this.searchData[this.now]
    },
    selectHover: function (index) {
      this.now = index
    },
    selectClick: function (index) {
      this.keyword = this.searchData[index]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.select-panel {
  position: relative;
  font-size: 14px;
  .select-input {
    cursor: pointer;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 50%;
  }
  .search-select {
    display: inline-block;
    top: 45px;
    width: 50%;
    box-sizing: border-box;
    z-index: 999;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    li {
      display: list-item;
      font-size: 14px;
      padding: 0 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 34px;
      line-height: 34px;
      text-align: left;
      margin: 0;
      cursor: pointer;
    }
    .select-item {
      background-color: #f5f7fa;
      color: #409eff;
      font-weight: 700;
    }
  }
}
</style>
