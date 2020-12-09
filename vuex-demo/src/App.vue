<template>
    <div class="app">
        <a-input
            placeholder="请输入任务"
            class="my_input"
            :value="inputValue"
            @change="handleInputChange"
        ></a-input>
        <a-button type="primary" @click="addItemToList">添加事项</a-button>
        <a-list bordered :dataSource="infoList" class="dt-list">
            <a-list-item slot="renderItem" slot-scope="item">
                <a-checkbox
                    :checked="item.done"
                    @change="
                        e => {
                            checkboxStatusChanged(e, item.id)
                        }
                    "
                    >{{ item.info }}</a-checkbox
                >
                <a slot="actions" @click="removeItemById(item.id)">删除</a>
            </a-list-item>
            <div slot="footer" class="footer">
                <span>{{ undoneLength }}条剩余</span>
                <a-button-group>
                    <a-button
                        :type="viewKey === 'all' ? 'primary' : 'default'"
                        @click="changeList('all')"
                        >全部</a-button
                    >
                    <a-button
                        :type="viewKey === 'undone' ? 'primary' : 'default'"
                        @click="changeList('undone')"
                        >未完成</a-button
                    >
                    <a-button
                        :type="viewKey === 'done' ? 'primary' : 'default'"
                        @click="changeList('done')"
                        >已完成</a-button
                    >
                </a-button-group>
                <a @click="clean()">清除已完成</a>
            </div>
        </a-list>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'app',

    created() {
        this.$store.dispatch('getList')
    },
    computed: {
        ...mapState(['list', 'inputValue', 'viewKey']),
        ...mapGetters(['undoneLength', 'infoList'])
    },
    methods: {
        handleInputChange(e) {
            this.$store.commit('setInputValue', e.target.value)
        },
        // 向列表中新增 item
        addItemToList() {
            if (this.inputValue.trim().length <= 0) {
                return this.$message.warning('文本框内容不能为空')
            }
            this.$store.commit('addItem')
        },
        removeItemById(id) {
            this.$store.commit('removeItem', id)
        },
        checkboxStatusChanged(e, id) {
            const param = {
                id: id,
                status: e.target.checked
            }
            this.$store.commit('changeStatus', param)
        },
        // 清除已完成的任务
        clean() {
            this.$store.commit('cleanDone')
        },
        changeList(key) {
            this.$store.commit('changeViewKey', key)
        }
    }
}
</script>
