### apply&call&bind区别

#### 相同点

- 都可以改变this对象指向
- 第一个参数都是this要指向的对象，如果这个参数为null、undefined，则默认this指向全局

#### 不同点

- 三者传递参数的方式不同，applay接受数组形式的参数；call和bind接收参数列表，但bind可以分次多次传入参数。
- apply和call都是调用后立即执行，bind是返回一个修改this指向的函数。

相同点

- 都能改变this的指向
- 如果第一个参数为null、undefined则函数内的this指向window

不同点

- apply接收数组参数、call、bind接收参数列表，bind可以多次传入参数。比如fn = bind(obj,arg1) fn(arg2)。
- apply和call都是调用后立即执行。而bind是调用后返回一个修改了this指向后的函数。