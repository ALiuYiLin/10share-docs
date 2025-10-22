---
excerpt: reactive 和ref的区别
---

|特性|ref()|reactive()|
| -- | -- | -- |
|类型|包装基本类型或对象为响应式引用|将对象整体转换为响应式|
|访问方式|值通过.value访问|直接访问属性即可|
|内部实现|通过Object.defineProperty包装一个对象{value:xxx}|通过Proxy深度代理整个对象|
|适用场景|适合处理基本类型、独立变量、DOM引用|适合处理复杂对象（如表单、列表、配置）|

