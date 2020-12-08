<template>
  <div class="app">
    <a-input placeholder="请输入任务" class="my_input" :value="inputValue" @change="handleInputChange"></a-input>
    <a-button type="primary">添加事项</a-button>
    <a-list bordered :dataSource="list" class="dt-list">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-checkbox>{{ item.info }}</a-checkbox>
        <a slot="actions">删除</a>
      </a-list-item>
      <div slot="footer" class="footer">
        <span>{{list.length}}条剩余</span>
        <a-button-group>
          <a-button type="primary">全部</a-button>
          <a-button>未完成</a-button>
          <a-button>以完成</a-button>
        </a-button-group>
        <a>清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app',

  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['list', 'inputValue'])
  },
  methods: {
    handleInputChange(e) {
      console.log(e)
      this.$store.commit('setInputValue', e.target.value)
    }
  }
}
</script>