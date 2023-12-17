# DOM

## 获取DOM元素、修改属性

### Web API 基本认知

#### 作用和分类

作用：使用JS去操作HTML和浏览器

分类：DOM（文档对象模型）、BOM（浏览器对象模型）

#### 什么是DOM

DOM（Document Object Model——文档对象模型） 是用来呈现以及与任意HTML或XML文档交互的API（DOM是浏览器提供的一套专门用来操作网页内容的功能）

##### DOM作用

开发网页内容特效和实现用户交互

#### DOM树

将HTML以树状结构直观的表现出来，也称之为文档树

##### 作用

文档树直观的体现了标签与标签之间的关系

#### DOM对象

浏览器根据HTML标签生成的JS对象

>所有的标签属性都可以在这个对象上面找到
>
>修改这个对象的属性会自动映射到标签身上

##### DOM的核心思想

把网页内容当做对象来处理

##### document对象

是DOM里提供的一个对象，所以它提供的属性和方法都是用来访问和操作网页内容的

### 获取DOM对象

#### 根据CSS选择器来获取DOM元素（重点）

##### 选择匹配的第一个元素

```javascript
语法
document.querySelector('css选择器')
```

参数：包含一个或多个有效的CSS选择器 字符串

返回值：CSS选择器匹配的第一个元素，一个HTMLElement对象，如果没有匹配到，则返回null

##### 选择匹配的多个元素

```javascript
语法
document.querySelectorAll('css选择器')
```

参数：包含一个或多个有效的CSS选择器  字符串

返回值：CSS选择器匹配的NodeList 对象集合

>得到的是一个伪数组——有长度有索引号的数组
>
>但是没有pop()、push()等数组方法
>
>想要得到里面的每一个对象，则需要遍历（for）的方法获得

#### 其他获取DOM元素方法

```javascript
//根据id获取一个元素
document.getElementById('nav')
//根据标签获取一类元素 	获取页面所以div
document.getElementByTagName('div')
//根据类名获取元素	获取页面所以类名为w的
document.getElementByClassName('w')
```

### 设置/修改DOM元素内容

#### document.write()

只能将文本内容追加到</body>前面的位置

文本中包含的标签会被解析

#### 元素innerText属性

将文本内容添加/更新到任意标签位置

文本中包含的标签不会被解析

#### 元素.innerHTML属性

将文本内容添加/更新到任意标签位置

文本中包含的标签会被解析

### 设置/修改DOM元素属性

#### 设置/修改 元素常用属性

可以通过JS设置/修改标签元素属性，比如通过src更换图片

```javascript
语法
对象.属性 = 值
```

#### 设置/修改 元素样式属性

可以通过JS设置/修改标签样式属性

```javascript
语法

```

>学习路径
>
>通过style属性操作CSS
>
>操作类名（className）操作CSS
>
>通过classList操作类控制CSS

##### 通过style属性操作CSS

```javascript
语法
对象.style.样式属性 = 值
```

> 注意
>
> 如果有-连接符，需要转换为小驼峰命名法
>
> 不要忘了CSS单位

##### 操作类名（className）操作CSS

```javascript
语法
//active是一个CSS类名
元素.className = 'active'
```

>className是使用新值换旧值，如果要添加新类，需要保留旧的

##### 操作classList操作类控制CSS

为了解决className容易覆盖以前的类名，可以通过classList方式追加和删除类名

```javascript
//追加一个类
元素.classList.add('类名')
//删除一个类
元素.classList.remove('类名')
//切换一个类
元素.classList.toggle('类名')
```

#### 设置/修改 表单属性

获取：DOM对象.属性名

设置：DOM对象.属性名 = 新值

```javascript
代码
表单.value = '用户名'
表单.type = 'password'
```

>disabled	 禁用状态
>
>checked	勾选
>
>selected	下拉

### 定时器-间歇函数

#### 定义

使用定时器重复执行代码，定时器函数可以开启和关闭定时器

##### 开启定时器

```javascript
语法
setInterval(函数, 间隔时间)
```

>作用：每隔一段时间调用这个函数，单位是毫秒

##### 结束定时器

```javascript
语法
clearInterval(定时器的名字)
```



## 事件基础

### 事件

事件是在编程时系统内发生的动作或者发生的事情

#### 事件监听

让程序检测是否有事件发生，一旦有事件触发，就立即调用一个函数做出响应，也称之为注册事件

```javascript
语法
元素.addEventListener('事件', 要执行的函数)
```

>事件监听三要素
>
>事件源：那个dom元素被事件触发了，要获取dom元素
>
>事件：用什么方式触发，比如鼠标单机click、鼠标经过mouseover等
>
>事件调用的函数：要做什么事

#### 事件类型

##### 鼠标事件

>鼠标触发：
>
>click	鼠标点击
>
>mouseenter	鼠标经过
>
>mouseleave	鼠标离开

##### 焦点事件

>表单获得光标：
>
>focus	获得焦点
>
>blur	失去焦点

##### 键盘事件

>键盘触发：
>
>Keydown	键盘按下触发
>
>Keyup	键盘抬起触发

##### 文本事件

>表单输入触发：
>
>input	用户输入事件

### 高阶函数

高阶函数可以被简单理解为函数的高级应用，JavaScript 中函数可以被当成【值】来对待，基于这个特性实现函数的高 级应用。

#### 函数表达式

函数表达式和普通函数并无本质上区别

```javascript
例
let counter = function (x, y) {
    return x + y
}
//调用函数
let result = counter(5, 10)
console.log(result)
```

#### 回调函数

如果将函数A作为参数传递给函数B时，我们称函数A为回调函数

```javascript
例
function fn() {
    console.log('我是回调函数')
}
//fn传递给了setInterval，fn就是回调函数
setInterval(fn, 1000)
```

>事件也是回调函数

### 环境对象

环境对象指的是函数内部特殊的变量this，它代表着当前函数运行所处的环境

>作用
>
>弄清楚this的指向，使代码更简洁
>
>谁调用，this就是谁——是判断this指向的粗略规则

### 编程思想

#### 排他思想

当前元素为A状态，其他元素为B状态

>干掉所有人——使用for循环
>
>复活他自己——通过this或者下标找到自己或者对应的元素

## 节点基本操作

### 节点操作

#### DOM节点

DOM树里的每一个内容都称之为节点

##### 节点类型

###### 元素节点（重点）

所有的标签，比如body、div

html是根节点

###### 属性节点

所有的属性，比如href

###### 文本节点

所有的文本

#### 查找节点

##### 父节点查找

parentNode属性——返回最近一级的父节点

```javascript
子元素.parentNode
```

##### 子节点查找

childNodes——获得所有子节点，包括文本节点（空格、换行）、注释节点等

children（重点）——仅获得所有元素节点，返回的还是一个伪数组

```javascript
父元素.children
```

##### 兄弟节点查找

下一个兄弟节点——nextElementSibling属性

上一个兄弟节点——previousElementSibling属性

#### 增加节点

>一般情况下，我们新增节点，操作如下
>
>1.创建一个新的节点
>
>2.把创建的新的节点放入指定的元素内部

##### 创建节点

```javascript
方法
//创造一个新的元素节点
document.createElement('标签名')
```

##### 追加节点

插入到父元素的最后一个子元素

```javascript
父元素.appendChild(要插入的元素)
```

插入到父元素中某个子元素的前面

```javascript
父元素.insertBefore(要插入的元素, 在哪个元素前面)
```

##### 克隆节点

```javascript
元素.cloneNode(布尔值)
```

>cloneNode会克隆出一个跟原标签一样的元素，括号内传入布尔值
>
>如果为true，则代表克隆时会包含后代节点一起克隆
>
>如果为false，则代表克隆时不包含后代节点
>
>默认为false

#### 删除节点

在JavaScript原生DOM操作中，要删除元素必须通过**父元素删除**

```javascript
父元素.removeChild(要删除的元素)
```

>如果不存在父子关系则删除不成功
>
>删除节点和隐藏节点（display:none）有区别：
>
>隐藏节点还是存在的，但是删除，则从HTML中删除节点

### 时间对象

用来表示时间的对象

>作用：可以得到当前系统时间

#### 实例化

在代码中发现了new关键字，一般将这个操作称为实例化

```javascript
//获得当前时间
let date = new Date( )
//获得指定时间
let date = new Date('2002-7-20')
```

>系统时间
>
>new Date().toLocaleString()

#### 时间对象方法

![image-20220529003929379](C:\Users\Sasha\AppData\Roaming\Typora\typora-user-images\image-20220529003929379.png)

#### 时间戳

是指1970年01月01日00时00分00秒起至现在的毫秒数，它是一种特殊的计量时间的方式

##### 使用getTime()

```javascript
//实例化
let date = new Date()
//获取时间戳
console.log(date.getTime())
```

##### 简写 +new Date()

```javascript
console.log(+new Date())
```

#####  使用 Date.now()

```javascript
console.log(Date.now())
```

> 无需实例化，但是只能得到当前的时间戳， 而前面两种可以返回指定时间的时间戳

### 重绘和回流

>重绘不一定引起回流，回流一定会引起重绘

#### 重绘

根据计算和获取的信息进行整个页面的绘制

由于节点（元素）的样式的改变并不影响它在文档流中的位置和文档布局时（比如：color、background-color、outline等）

#### 回流（重排）

根据生成的渲染树，得到节点的几何信息（位置，大小）

当Render Tree中部分或者全部元素的尺寸、结构、布局发生改变时，浏览器就会重新渲染部分或全部文档的过程

![image-20220529141750563](C:\Users\Sasha\AppData\Roaming\Typora\typora-user-images\image-20220529141750563.png)

## 事件高级

### 事件对象

#### 获取事件对象

这个对象里有事件触发时的相关信息

```javascript
//代码
//e就是事件对象
元素.addEventListener('click', function(e) {
    
})
```

>在事件绑定的回调函数的第一个参数就是事件对象
>
>一般命名为event、ev、e

#### 事件对象常用属性

>type——获取当前的事件类型
>
>clientX/cilentY——获取光标相对于浏览器可见窗口左上角的位置
>
>offsetX/offsetY——获取光标相对于当前DOM元素左上角的位置
>
>pageX/pageY——不会受页面窗口控制
>
>key——用户按下键盘键的值——现在不提倡使用keyCode 

### 事件流

事件流指的是事件完整执行过程中的流动路径

#### 事件捕获和事件冒泡

##### 事件冒泡

当一个元素的事件被触发时，同样的事件将会在该元素的所有祖先元素中依次被触发。

>简单理解：当一个元素触发事件后，会依次向上调用所有父级元素的同名事件

![image-20220529224957250](C:\Users\Sasha\AppData\Roaming\Typora\typora-user-images\image-20220529224957250.png)

##### 事件捕获

从DOM的根元素开始去执行对应的事件

```javascript
DOM.addEventListener(事件类型, 事件处理函数, 是否使用捕获机制)
```

>事件捕获需要写对应的代码才能看到效果
>
>addEventListener第三个参数传入true代表是捕获阶段触发（很少使用）
>
>若传入false代表冒泡阶段触发，默认是false

#### 阻止事件流动

>因为默认就有冒泡模式的存在，所以容易导致事件影响到父级元素
>
>若想把事件就限制在当前元素内，就需要阻止事件流动

```javascript
语法
事件对象.stopPropagation()
```

>鼠标经过事件：
>
>mouseover和mouseout会有冒泡效果
>
>mouseenter和mouseleave没有冒泡效果（推荐）

阻止默认行为，比如链接点击不跳转，表单域的跳转

```javascript
语法
e.preventDefault()
```

>两种注册事件的区别：
>
>传统on注册（L0）
>
>同一个对象,后面注册的事件会覆盖前面注册(同一个事件)
>
>直接使用null覆盖偶就可以实现事件的解绑
>
>都是冒泡阶段执行的
>
>事件监听注册（L2）
>
>语法: addEventListener(事件类型, 事件处理函数, 是否使用捕获)
>
>后面注册的事件不会覆盖前面注册的事件(同一个事件)
>
>可以通过第三个参数去确定是在冒泡或者捕获阶段执行
>
>必须使用removeEventListener(事件类型, 事件处理函数, 获取捕获或者冒泡阶段)
>
>匿名函数无法被解绑

### 事件委托

利用事件流的特征解决一些开发需求的知识技巧

>**优点：**给父级元素加事件（可以提高性能）
>
>**原理：**事件委托其实是利用事件冒泡的特点， 给父元素添加事件，子元素可以触发
>
>**实现：**事件对象.target 可以获得真正触发事件的元素

![image-20220529232002122](C:\Users\Sasha\AppData\Roaming\Typora\typora-user-images\image-20220529232002122.png)

## 网页特效

### 滚动事件和加载事件

#### 滚动事件

当页面进行滚动时触发的事件

事件名：scroll

```javascript
//监听整个页面滚动
//页面滚动事件
window.addEventListener('scroll', function () {
    //执行的操作
})
```

>监听某个元素的内部滚动直接给某个元素添加

#### 加载事件

加载外部资源（如图片、外联CSS和JavaScript等）加载完毕时触发的事件

事件名：load

>当初始的HTML文档被完全加载和解析完成后，DOMContentLoaded 事件被触发，而无需等待样式表

事件名：DOMContentLoaded

```javascript
document.addEventListener('DOMContentLoaded', function () {
    //执行操作
})
```

### 元素大小和位置

#### scroll家族

获取宽高：

​	获取元素的内容总宽高（不包含滚动条）返回值不带单位

​	scrollWidth和scrollHeight

获取位置：

​	获取元素内容往左、往上滚出去看不到的距离

​	scrollLeft和scrollTop

​	这两个属性是可以修改的

```javascript
div.addEventListener('scroll', function () {
    console.log(this.scrollTop)
})
```

开发中，检测页面滚动的距离

```javascript
//页面滚动事件
window.addEventListener('scroll', function() {
    //document.documentElement.scrollTop	获得当前页面被卷去的头部
    let num = document.documentElement.scrollTop
    console.log(num)
})
```

#### offset家族

获取宽高：

​	获得元素的自身宽高、包含元素自身设置的宽高、padding、border

​	offsetWidht和offsetHeight

获取位置：

​	获取元素距离自己定级父级元素的左、上距离

​	offsetLeft和offsetTop是只读属性，无法修改

#### client家族

获取宽度：

​	获取元素的可见部分宽高（不包含边框、滚动条等）

​	clientWidth和clientHeight

获取位置：

​	获取左边框和上边框的宽度

​	clientLeft和clientTop	只读属性，不可修改

会在窗口尺寸改变的时候触发事件

​	resize

```javascript
window.addEventListener('resize', function () {
    //执行的代码
})
```

# BOM

## window对象

### BOM（浏览器对象模型）

window 是浏览器内置中的全局对象，我们所学习的所有 Web APIs 的知识内容都是基于 window 对象实现的

window 对象下包含了 navigator、location、document、history、screen 5个属性，即所谓的 BOM （浏览器对象模 型）

> document 是实现 DOM 的基础，它其实是依附于 window 的属性。
>
> 注：依附于 window 对象的所有属性和方法，使用时可以省略 window

### 定时器-延时函数

JavaScript内置的一个用来让代码延迟执行的函数，叫setTimeout

```javascript
语法
setTimeout(回调函数, 等待的毫秒数)
```

>setTimeout仅仅执行一次

结合递归函数可以使用setTimeout实现setInterval一样的功能

```javascript
//利用递归函数 模拟了 setInterval
let div = document.querySelector('div')
function fn() {
    div.innerHTML = new Date().toLocaleString()
    setTimeout(fn, 1000)
}
fn()
```

>setInterval的特征是重复执行，首次执行会延时
>
>setTimeout的特征是延时执行，只执行1次

### JS执行机制

>流程
>
>1.先执行执行栈中的同步任务
>
>2.异步任务放入任务队列中
>
>3.一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取任务队列中的异步任务，于是被读取的异步任务 结束等待
>
>状态，进入执行栈，开始执行。

![image-20220531231703016](C:\Users\Sasha\AppData\Roaming\Typora\typora-user-images\image-20220531231703016.png)

由于主线程不断的重复获得任务、执行任务、再获取任务、再执行，所以这种机制被称为事件循环（ event loop）。

#### JS是单线程

JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。

单线程意味着，所有任务需要排队，前一个任务结束，才会执行下一个任务

#### 同步

前一个任务结束后再执行后一个任务，程序的执行顺序与任务的排列顺序是一致的、同步的。

#### 同步任务

同步任务都在主线程上执行，形成一个执行栈

#### 异步

前一个任务执行的时候正在做其他的任务。

#### 异步任务

JS的异步是通过回调函数实现的

>三种类型：
>
>普通事件，如click、resize等
>
>资源加载，如load、error等
>
>定时器，包括setInterval、setTimeout等

### location对象

location的数据类型是对象，它拆分并保存了URL地址的各个组成部分

>常用属性和方法：
>
>href 属性获取完整的 URL 地址，对其赋值时用于地址的跳转
>
>```javascript
>//可以得到当前文件的URL地址
>console.log(location.href)
>//可以通过js方式跳转到目标地址
>location.href = 'http://www.baidu.com'
>```
>
>search 属性获取地址中携带的参数，符号 ？后面部分
>
>```javascript
>console.log(location.search)
>```
>
>hash 属性获取地址中的啥希值，符号 # 后面部分
>
>```javascript
>console.log(location.hash)
>```
>
>后期vue路由的铺垫，经常用于不刷新页面，显示不同页面，比如网易云音乐
>
>reload 方法用来刷新当前页面，传入参数 true 时表示强制刷新

### navigation对象

navigator的数据类型是对象，该对象下记录了浏览器自身的相关信息

>常用属性和方法：
>
>通过 userAgent 检测浏览器的版本及平台
>
>```javascript
>// 检测 userAgent（浏览器信息）
>!(function () {
>const userAgent = navigator.userAgent
>// 验证是否为Android或iPhone
>const android = userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)
>const iphone = userAgent.match(/(iPhone\sOS)\s([\d_]+)/)
>// 如果是Android或iPhone，则跳转至移动站点
>if (android || iphone) {
>location.href = 'http://m.itcast.cn'
>}
>})()
>```

### history对象

history 的数据类型是对象，该对象与浏览器地址栏的操作相对应，如前进、后退、历史记录等

>back()	可以后退功能
>
>forward()	前进功能
>
>go(参数)	前进后退功能 参数如果是1，就前进1个页面，如果是-1，就后退一个页面

## 本地存储

>容量较大，sessionStorage和localStorage约5M左右
>
>优点：设置、读取方便、甚至页面刷新不丢失数据

### localStorage

>生命周期永久生效，除非手动删除，否则关闭页面也会存在
>
>可以多窗口（页面）共享
>
>以键值对的形式存储使用

```javascript
存储数据：
localStorage.setItem(key, value)
获取数据：
localStorage.getItem(key)
删除数据：
localStorage.removeItem(key)
```

#### 存储复杂数据类型

本地只能存储字符串，无法存储复杂数据类型，需要将复杂数据类型转换成JSON字符串，在存储到本地

#### JSON.stringify(复杂数据类型)

将复杂数据转换成JSON字符串	存储本地存储中

#### JSON.parse(JSON字符串)

将JSON字符串转换成对象	取出时候使用

>先读取，再添加，再存储，最后渲染

### 自定义属性

由程序员自己添加的属性,在DOM对象中找不到, 无法使用点语法操作,必须使用专门的API 

>getAttribute('属性名') // 获取自定义属性 
>
>setAttribute('属性名', '属性值') // 设置自定义属性 
>
>removeAttribute('属性名') // 删除自定义属性
>
>

>data-自定义属性:  
>
>传统的自定义属性没有专门的定义规则,开发者随意定值,不够规范,所以在html5中推出来了专门的data-自定义属性 在 标签上一律以data-开头 
>
>在DOM对象上一律以dataset对象方式获取

>固有属性：
>
>标签天生自带的属性 比如class id title等, 可以直接使用点语法操作

## 正则表达式

正则表达式是用于匹配字符串中字符组合的模式

### 语法

#### 定义表达式

```javascript
let 变量名 = /表达式/
```

>/ /是正则表达式字面量

#### 判断是否有符合规则的字符串

test()方法	用来查看正则表达式与指定的字符串是否匹配

```javascript
regObj.test(被检测的字符串)
```

>如果正则表达式与指定的字符串匹配，则返回true，否则false

#### 检索（查找）符合规则的字符串

exec()方法	在一个指定的字符串中执行一个搜索匹配

```javascript
regObj.exec(被检测的字符串)
```

>如果匹配成功，exec()方法返回一个数组，否则返回null

### 元字符（特殊字符）

是一些具有特殊含义的字符，可以极大提高了灵活性和强大的匹配功能

#### 边界符

用来提示字符所处的位置，主要有两个字符，表示位置，开头和结尾，必须用什么开头，用什么结尾

>^					表示匹配行首的文本（以谁开始）
>
>$					表示匹配行尾的文本（以谁结束）
>
>如果^和$在一起，表示必须是精确匹配（只有两者之间的才为true）

#### 量词

用来设定某个模式出现的次数

![image-20220605230026256](C:\Users\Sasha\AppData\Roaming\Typora\typora-user-images\image-20220605230026256.png)

>逗号左右两侧不能出现空格

#### 字符类

##### [ ]匹配字符集合

后面的字符串只要包含abc中的任意一个字符，都返回true

使用连字符 - 表示一个范围

```javascript
console.log(/^[a-z]$/.test('c')) //true
```

[ ]里面加上^取反符号

>取反，除了括号里面的

.匹配除换行符之外的任何单个字符

##### 预定义

某些常见模式的简写方式

![image-20220606154817214](C:\Users\Sasha\AppData\Roaming\Typora\typora-user-images\image-20220606154817214.png)

### 修饰符

修饰符约束正则执行的某些细节行为，如是否区分大小写，是否支持多行匹配等

```javascript
/表达式/修饰符
```

>i是单词ignore的缩写，正则匹配时字母不区分大小写
>
>g是单词global的缩写，匹配所有满足正则表达式的结果

#### 替换replace替换

 ```javascript
 字符串.replace(/正则表达式/, '替换的文本')
 ```

