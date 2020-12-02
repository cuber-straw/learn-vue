## 安装

从官网 https://cn.vuejs.org/v2/guide/installation.html 下载Vue.js，并在html的`<script>`标签中引入

或在 head 标签中用 script 引入：`    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>` 



## Hello World

### 案例1

```html
<div class='app'>{{message}}</div>

<script src='vue.js'></script>
<script>
  const app = new Vue({
    el: '.app', // 定义要挂载管理的元素
    data: {     // 定义数据
      message: 'hello world',
    }
  });
</script>
```

- el 属性：该属性决定了这个Vue对象挂载到哪个元素上
- data 属性：该属性通常会存储一些数据，这些数据可以是我们直接定义出的，也可能是来自网络，从服务器加载的。Vue实例被创建时，data对象的所有属性将被加载到Vue的响应式系统中。这些属性是“响应式属性”——属性值发生改变时，视图会立即匹配更新的值。

- 打开浏览器开发者工具中的console，可以修改浏览器中显示的内容

```javascript
> app.message
< hello world
> app.message = "hello"
< hello
```

### 案例2：计数器

- methods 属性：用于在Vue对象中定义方法
- v-on:click / @click 指令：用于监听某个元素的点击事件

## Vue中的MVVM

- MVVM：Model View ViewModel

- View层：视图层，在前端开发中，通常就是DOM层。主要的作用是给用户展示各种信息
- Model层：数据层
- ViewModel层：视图模型层，是View和Model沟通的桥梁，一方面它实现了数据绑定，将Model的改变实时反应到View中，另一方面它实现了Dom Listener，当DOM发生一些事件时可以监听到，并在需要的情况下改变data

## Vue的生命周期

- 生命周期：事物从诞生到消亡的过程
- Vue实例在创建时会运行**生命周期钩子**函数
- 生命周期钩子函数不能使用箭头函数，因为箭头函数没有this

##  Vue的插值操作

- Mustache语法，也就是双大括号
- v-once指令：保持{{}}中的内容不被修改
- v-html指令：解析html代码
- v-text指令：直接展示文本，类似{{}}
- v-pre指令：将{{}}原封不动显示，不做任何解析



2020.12.01

### 创建一个 Vue 实例

- 每个 Vue 应用都是通过用 Vue 函数创建一个新的 Vue 实例开始的

    ```javascript
    let vm = new Vue({
      // 选项
    });
    ```

- 所有的 Vue 组件都是 Vue 实例



### 数据

- Vue 实例被创建时，data 对象中的所有 property 加入到 Vue 的相应式系统中



### 生命周期钩子

- 生命周期钩子是 函数
- 生命周期钩子的 `this` 指向调用它的 Vue 实例



### 指令

- 缩写

    - v-bind 的缩写

        ```html
        <!-- 完整写法 -->
        <a v-bind:href="url">...</a>
        
        <!-- 缩写 -->
        <a :href="url">...</a>
        ```

    - v-on 的缩写

        ```html
        <!-- 完整写法 -->
        <a v-on:click="doSomething">...</a>
        
        <!-- 缩写 -->
        <a @click="doSomething">...</a>
        ```



### 计算属性

- 在 computed 中定义计算属性
- 计算属性 vs 方法：
    - 计算属性依赖缓存，相比之下，每当触发重新渲染时，调用方法将**总会**再次执行函数。



### 绑定 HTML Class

- 对象语法：我们可以传给 `v-bind:class` 一个对象。对象就要用大括号括起来
- 数组语法：我们可以传给 `v-bind:class` 一个数组。数组就用中括号括起来



### 条件渲染

- v-if 是真正的条件渲染，是惰性的，如果初始渲染时条件为假，就什么都不做直到条件为真时；v-show 不管条件是什么，元素总是会被渲染，只是简单的基于 CSS 切换
- v-if 有更高的切换开销，v-show 有更高的初始渲染开销
- 不推荐同时使用 v-if 和 v-for



### 列表渲染

- 使用 数组
    - 数组更新检测
        - 变更方法：这些方法变更原始数组
        - 替换数组：这些方法不会变更原始数组，而是返回新的数组
- 使用 对象
- 由于 js 的限制，vue 不能检测数组和对象的变化



### 事件处理

- 可以用 v-on 指令监听 DOM 事件，并在运行时触发一些 js 代码

- 逻辑简单的情况下，`v-on:click` 中可以直接写 js 代码
- 逻辑复杂时，`v-on:click` 中写需要调用的方法的名称



### 表单输入绑定

#### 基础用法

1. 文本
2. 多行文本
3. 复选框
4. 单选按钮
5. 选择框

#### 值绑定

1. 复选框

    ```html
    <input
      type="checkbox"
      v-model="toggle"
      true-value="yes"
      false-value="no"
    >
    ```

    ```js
    // 当选中时
    vm.toggle === 'yes'
    // 当没有选中时
    vm.toggle === 'no'
    ```

2. 单选按钮

    ```html
    <input type="radio" v-model="pick" v-bind:value="a">
    ```

    ```js
    // 当选中时
    vm.pick === vm.a
    ```

3. 选择框的选项

    ```html
    <select v-model="selected">
        <!-- 内联对象字面量 -->
      <option v-bind:value="{ number: 123 }">123</option>
    </select>
    ```

    ```js
    // 当选中时
    typeof vm.selected // => 'object'
    vm.selected.number // => 123
    ```

#### 修饰符

1. .lazy

    在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 `lazy` 修饰符，从而转为在 `change` 事件之后进行同步

2. .number

    如果想自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `number` 修饰符

    ```html
    <input v-model.number="age" type="number">
    ```

3. .trim

    如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符：

    ```html
    <input v-model.trim="msg">
    ```

