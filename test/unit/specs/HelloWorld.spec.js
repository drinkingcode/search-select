import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'

const Constructor = Vue.extend(HelloWorld)
const vm = new Constructor().$mount()

describe('HelloWorld.vue', () => {
  it('Create', () => {
    expect(vm.$el.querySelector('.hello .select-panel input').getAttribute('placeholder'))
      .toEqual('请输入')
  })
})
