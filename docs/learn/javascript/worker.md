# mid

## promise

```txt
var x, y = 2
console.log( x + y ) // NaN <-- 因为x还没有设定
```

把x和y加起来，但如果它们中的任何一个还没有准备好，就等待两者都准备好。一但可以就马上执行加运算。

```javascript
function add(getX, getY, cb) {
    var x, y;
    getX( function(xVal) {
        x = xVal

        if( y != undefined) {
            cb( x + y )
        }
    })
    getY( function(yVal) {
        y = yVal

        if(x != undefined) {
            cb( x + y)
        }
    })
}

add( fetchX, fetchY, function(sum) {
    console.log(sum)
})
```

这样的处理将他们都变成了将来值

### Promise值

```javascript
function add(xPromise, yPromise) {
    return Promise.all([xPromise,yPromise])
    .then((values)=>{
        return values[0] + values[1]
    })
}

add(fetchX, fetchY)
.then((sum)=>{
    console.log( sum )
})
```

## web worker
像浏览器环境，很容易提供多个Javascript引擎实例，各自运行在自己的线程上，这样你可以在每个线程上运行不同的程序。程序中每一个这样的独立的多线程部分被称为一个web workder。这种类型的并行化被称为任务并行，因为器重点在于把程序划分为多个块来并发运行。

Worker之间以及它们和主程序之间，不会共享任何作用域或资源，那会把所有多线程编程的噩梦带到前端领域，而是通过一个基本的事件消息机制互相联系。

Worker wl 对象是一个事件侦听者和触发者，可以通过订阅它来获得这个worker发出的事件以及发送事件给这个worker。

以下是如何侦听事件
wl.addEventListener("message", function(evt){
    // evt.data
})
也可以发送message事件给这个worker
wl.postMessage("something cool to say")
在这个worker内部，收发消息是完全对称的：
// mycoolworker.js
addEventListener("message", function(evt){
    // evt.data
})

postMessage("a really cool reply")


### worker环境
在worker内部是无法访问主程序的任何资源的。这意味着你不能访问它的任何全局变量，也不能访问页面的DOM或者其他资源。记住这是一个完全独立的线程。
但是，你可以执行网络操作（Ajax，WebSockects）以及设定定时器。还有worker可以访问几个重要的全局变量和功能的本地副本，包括navigator、location、JSON和applicationCache。
你还可以通过importScripts(...)向worker加载额外的JavaScript脚本。
// 在worker内部
importScripts('foo.js', 'bar.js');

web worker 通常应用于那些方面呢？
- 处理密集型数据计算
- 大数据集排序
- 数据压缩（压缩、音频分析、图像处理等）
- 高流量网络通信

#### 数据传递

结构化克隆算法,把这个对象复制到另一边。这个算法非常高级，甚至可以处理要复制的对象有循环引用的情况。这样就不用付出to-string和from-string的性能损失，但是这种方案还是要使用双倍内存。

还有一个更好的选择，特别是对于大数据而言，就是使用transferable对象。这时发生的是对象所有权的转移，数据本身本没有移动。一旦你把对象传递到一个worker中，在原来的位置上，它就变为空的或者是不可访问的，这样就消除了多线程编程作用域共享带来的混乱。当然，所有权传递是可以双向进行的。


如果选择Transferable对象的话，其实不需要做什么。任何实现了Transferable接口的数据结构就自动按照这种方式传输。

举例来说，像Uint8Array这样的带类型的数组就是Transferable。

postMessage（foo.buffer, [foo.buffer]）
第一个参数是原始缓冲区，第二个是一个要传输的内容的列表。
不支持Transferable对象的浏览器就降级到结构化克隆，这会带来性能下降而不是彻底的功能失效。

#### 共享worker
如果你的站点或app允许加载同一个页面的多个tab，那你可能非常希望通过防止重复专用worker来降低系统资源的使用。在这一方面最常见的有限资源就是socket网络连接，因为浏览器限制了到同一个主机的同时连接数目。当然，限制来自于同一客户端的连接数也减轻了你的资源压力。

这种情况下，创建一整个站点或app的所有页面实例都可以共享的中心worker就非常有用了。

这称为SharedWorker

var wl = new SharedWorker()

因为共享worker可以与站点的多个程序实例或多个页面连接，所以这个worker需要通过某种方式来得知消息来自于哪个程序。这个唯一标识符称为端口，可以类比网络socket的端口。因此，调用程序必须使用worker的port对象用与通信。
wl.port.addEventListener('message',handleMessage)
wl.port.postMesssage('something cool')

还有端口连接必须要初始化
wl.port.start()

