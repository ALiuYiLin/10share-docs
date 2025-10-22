---
excerpt: computed缓存
---

什么是computed缓存机制
在vue3中，computed()返回的是一个特殊的ref对象，
它有一个内部的缓存系统：

只有当他的依赖（即getter中访问到的响应式数据）发生变化时，
它才会重新计算；
否则直接返回上一次结果。

核心机制：
1. 当你创建一个computed是，vue会：
- 包装一个lazy effet（惰性副作用函数）
- 内部有一个dirty标志位（是否“脏”）

2. 每当依赖的响应式变量更新时，会把这个标志置为dirty = true

3. 下次访问.value是：
- 如果dirty === true，重新运行计算函数并更新缓存；
- 否则直接返回上次的缓存值。


computed、watch、watchEffect实用场景
|场景|使用特性|说明|
| -- | -- | -- |
|表格分页、搜索|watchEffect|自动侦查依赖发起请求|
|用户权限控制|computed|基于角色动态计算按钮、菜单是否可见|
|实时表单校验|watch|监听字段变化做验证或提示|
|缓存、本地存储同步|watch|数据变化是写入localStorage|
|模态框编辑模式切换|computed|根据模式动态展示字段|
|图表联动|watch|源数据变化自动更新图标数据|

