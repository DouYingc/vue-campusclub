

## 基础选择器+字体文本相关样式

### 基础认知

#### CSS介绍

CSS：层叠样式表

#### CSS语法规则

写在style标签中

### CSS引入方式

#### 内嵌式

CSS写在style标签中

#### 外嵌式

CSS写在单独的.css文件中（需要用link标签引入）

#### 行内式

CSS写在标签的style属性中（配合JS使用）

### 基础选择器

#### 标签选择器

结构：标签名{css属性名:属性值;}

作用：通过标签名，找到页面中所有此类标签，设置样式

注意：无论嵌套多深，都能此类标签并设置样式

#### 类选择器

结构：.类名{css属性名:属性值;}

作用：通过类名，找到页面中所有带这个类名的标签，设置样式

注意：所有标签都有class属性，class属性的属性值为类名

类名不能以数字或者中划线开头

一个标签可有多个类名，类名间用空格隔开

类名可有重复，一个类选择器可以选中多个标签

#### id选择器

结构：#id属性值{css属性名:属性值;}

作用：通过id属性值，找到页面中带有这个id属性值的标签，设置样式

注意：所有标签上都有id属性

id属性值是唯一的

一个标签上只能有一个id属性值

一个id选择器只能选中一个标签

#### 通配符选择器

结构：*{css属性名：属性值;}

作用：找到页面中所有的标签，设置样式

注意：开发中极少使用，特殊情况下才使用

最常用于去除标签默认的margin和padding

## 字体和文本样式

### 字体样式

#### 字体大小

属性名：font-size

取值：数字+px

注意：谷歌浏览器默认文字大小16px

单位要设置，否则无效

#### 字体粗细

属性名：font-weight

取值：关键字：正常：normal	加粗：bold

纯数字：100-900的整百数

正常：400	加粗：700

注意：不是所有字体都提供了9种粗细

#### 字体倾斜

属性名：font-style

取值：正常（默认值）：normal		倾斜：italic

#### 字体系列

属性名：font-family

取值：具体字体名字

注意：如果字体名称种存在多个单词，推荐使用引号包裹

最后一项字体系列不需要引号包裹

尽量使用系统常见自带字体

#### 样式层叠问题

如果给同一个标签设置相同的属性，此时样式会层叠，写在最下面的会生效

#### 字体font相关属性的连写

属性名：font（复合属性）

取值：font:style weight size family;

注意：只能省略前俩个，省略了相当于设置了默认值

如果需要同时设置单独和连写形式

要么把单独的样式写在连写下面

要么把单独的样式写在连写的里面

### 文本样式

#### 文本缩进

属性名：text-indent

取值：数字+px	 数字+em（1em=当前标签的font-size的大小）

#### 文本水平对齐方式

属性名：text-align

取值：left：左对齐	center：居中对齐		right： 右对齐

#### 文本修饰

属性名：text-decoration

取值：underline：下划线	line-through：删除线

​	   overline：上划线	none：无装饰线

注意：text-decoration:none用于清除a标签默认的下划线

#### 行高

属性名：line-height

作用：控制一行的上下行间距

取值：数字+px	倍数（当前font-size的倍数）

应用：让单行文本垂直居中可以设置line-height：文字父元素高度

​	网页精准布局时，会设置line-height:1 可以取消上下间距

>注意：font: style weight size/line-height family;

#### 标签水平居中

```css
margin: 0 auto;
```

## 选择器进阶+背景属性+元素显示模式+三大特性

### 选择器进阶

#### 复合选择器

##### 后代选择器：空格

作用：根据HTML标签的嵌套关系，选择父元素后代中满足条件的元素

选择器语法： 选择器1 选择器2{css}

##### 子代选择器：>

作用：根据HTML标签的嵌套关系，选择父元素子代中满足的元素

选择器语法：选择器1>选择器2{css}

#### 并集选择器

写法：,

作用：同时选中多组标签，设置相同的样式

选择器语法：选择器1,选择器2{css}

#### 交集选择器

写法：紧挨着

作用：选中页面中同时满足多个选择器的标签

选择器语法：选择器1选择器2{css}

注意：如果有标签选择器，标签选择器必须写在最前面

#### hover伪类选择器

 作用：选中鼠标悬停在元素上的状态，设置样式 

选择器语法：选择器:hover{css}

注意：伪类选择器选中的元素的某种状态

#### Emmet语法

作用：简写，快速生成代码 

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207041353109.png)

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207041353110.png)

首字母+具体指的形式生成CSS代码片段

### 背景相关属性

#### 背景颜色

属性名：background-color（bgc）

属性值：颜色取值：关键字，rgb表示法，rgba表示法，十六进制

注意点：背景颜色默认值是透明：rgba(0,0,0,0)，transparent

#### 背景图片

属性名：background-image（bgi）

属性值：background-image:url('图片路径')；

注意：背景图片默认是水平和垂直方向平铺的

#### 背景平铺

属性名：background-repeat（bgr）

属性值：repeat：默认，水平垂直都平铺	no-repeat：不平铺

repeat-x：水平方向（x轴）平铺		repeat-y：垂直方向（y轴）平铺

#### 背景位置

属性名：background-position（bgp）

属性值：background-position:水平方向 垂直方向;

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207041353111.png)

#### 背景相关属性连写

属性名：background（bg）

属性值：单个属性值的合写，之间空格隔开

书写顺序：background：color image repeat position（顺序不限）

>注意：如果需要同时设置单独和连写形式
>
>​	   要么把单独的样式写在连写下面
>
>​	  要么把单独的样式写在连写的里面

### 元素显示模式

####   块级元素

显示特点：独占一行

宽度默认是父元素的宽度，高度默认由内容撑开

可以设置宽高

>代表标签：div 	p	 h系列	 ul 	li 	dl 	dt 	dd 	form 	header     nav	 footer......

#### 行内元素

显示特点：一行可以显示多个

宽度和高度默认由内容撑开

不可以设置宽高

>代表标签：a 	span	 b 	u	 i 	s 	strong	 ins	 em 	del.......

#### 行内块元素

显示特点：一行可以显示多个

可以设置宽高

>代表标签：input	 textarea	 button	 select.....

>特殊情况：img标签由行内块元素特点，但是Chrome调试工具显示inline

### 元素显示模式转换

目的：改变元素默认的显示特点，让元素符号布局要求

语法：display: block			转换成块级元素

​	   display: inline-block		转换成行内块元素

​	   display: inline			转换成行内元素

#### HTML嵌套规范注意点

块级元素嵌套：文本，块级元素，行内元素，行内块元素

但是：p标签中不要嵌套div，p，h等块级元素

a标签内部可以嵌套任意元素

但是：a标签不能嵌套a标签

### CSS特性

#### 继承性

特性：子元素有默认继承父元素样式的特点

可以继承的常见属性

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207041353112.png)

>注意：可以通过调试工具判断样式是否可以继承

>如果元素有浏览器默认样式，此时继承性依然存在，但是a标签的color会继承失效,h系列标签的font-size会继承失效

#### 层叠性

特性：给同一个标签设置不同的样式——此时样式会层叠叠加——会共同作用在标签上

给同一个标签设置相同的样式——此时样式会层叠覆盖——最终写在最后的样式会生效

>注意：当样式冲突时，只有当选择器优先级相同时，才能通过层叠性判断结果

#### 优先级

特性：不同选择器具有不同的优先级，优先级高的覆盖优先级低的选择器样式

优先级公式：继承<通配符选择器<标签选择器<类选择器<id选择器<行内样式<!important

>注意：!important写在属性值后面，分号前面
>
>​!important不能提升继承的优先级，只要是继承优先级最低
>
>​实际开发中不建议!important

##### 权重叠加计算

场景：复合选择器，通过权重叠加计算方法，最终判断哪个选择器优先级最高会生效

## CSS布局

### 盒子模型

#### 盒子模型的介绍

概念：每一个标签，都可看做是一个“盒子”

CSS中规定每个盒子分别由：**内容区域（content）、内边距区域（padding）、边框（border）、外边距区域（margin）**构成

#### 内容的宽度和高度

属性：width / height

取值：数字+px

#### 边框

属性名：border

属性值：border: 10px solid red;   

实线：solid 		虚线：dashed       点线：dotted

快捷键：bd + tab

#### 边框-单方向设置

属性名：border-方向名

#### 内边距

属性名：padding

属性值：padding:10px 10px 20px 20px;

#### CSS盒模型（自动内减）

给盒子设置属性box-sizing: border-box;

会自动计算多余大小，自动在内容中减去

#### 外边距

属性名：margin

属性值：margin:10px 10px 20px 20px;

#### 清楚默认内外边距

*{margin:0;     padding:0;}

####  版心居中

版心：网页的有效内容

属性名：margin: 0 auto;

#### 外边距合并

场景：垂直布局的块级元素，上下的margin会合并

结果：最终两者距离为margin的最大值

解决：只给一个盒子设置margin

#### 外边距塌陷

场景：互相嵌套的块级元素，子元素的margin-top会作用在父元素上

结果：导致父元素一起往下移动

>解决方法：父元素设置border-top或者padding-top
>
>父元素设置overflow: hidden
>
>转换成行内块元素
>
>设置浮动

### 浮动

#### 结构伪类选择器

作用：根据元素在HTML中的结构关系查找元素

优势：减少对于HTML中类的依赖，有利于保持代码整洁

场景：常用语查找某父级选择器中的子元素

![](https://gcore.jsdelivr.net/gh/DouYingc/blogimage/img/202207041353113.png)

#### 伪元素

元素：HTML设置的标签

伪元素：由CSS模拟出的标签效果

种类：

```css
: :before		在父元素内容的最前添加一个伪元素
: :after			 在父元素内容的最后添加一个伪元素
```

>注意：
>
>必须设置content属性才能生效
>
>伪元素默认是行内元素 

#### 标准流

又称文档流，是浏览器在渲染显示页面内容时默认采用的一套排版规则，规定应该以何种方式排列元素

#### 浮动

##### 行内块问题

>注意：浏览器解析行内块或行内元素时，如果标签换行书写会产生一个空隙
>

##### 浮动的作用

早期：图文环绕

现在：网页布局

##### 浮动的特点

浮动元素会脱离标准流，在标准流中不占位置

浮动 元素比标准流高半个级别，可以覆盖标准流中的元素

浮动找浮动，下一个浮动元素会在上一个浮动浓盐酸后面左右浮动

浮动元素有特殊的显示效果：一行可以显示多个 可以设置宽高

>注意：
>
>浮动的元素不能通过text-align: center 或者margin: 0 auto
>
>父级的宽度不够，子级会自动换行

##### CSS书写顺序

>1. 浮动 / display
>2. 盒子模型：margin border padding 宽度高度背景色
>3. 文字样式

##### 清除浮动

含义：清除浮动带来的影响——子元素浮动了，此时子元素不能撑开标准流的块级父元素

原因：子元素浮动后脱标（**父级没有高度**）——不占位置

目的：需要父元素有高度，从而不影响其他网页元素的布局

##### 清除浮动的方法

1.直接设置父元素高度

2.额外标签法

>1.在父元素内容的最后添加一个块级元素
>
>2.给添加的块级元素设置clear : both
>
>缺点：会在页面中添加额外的标签，会让页面的HTML结构变得复杂

3.单伪元素清除法

>操作：用伪元素替代了额外标签
>
>优点：项目中使用，直接给标签加类即可清除浮动

```css
基本写法
.clearfix :: after
{
    content: '' ;
    display: block;
    clear: both;
}
```

```css
补充写法
.clearfix :: after
{
    content: '' ;
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
}
```

4.双伪元素清除法

>优点：项目中使用，直接给标签加类即可清除浮动

```css
.clearfix :: before,
.clearfix :: after
{
    content: '';
    display: table;
}
.clearfix :: after
{
    clear: both;
}
```

5.给父元素设置overflow : hidden

>操作：
>
>直接给父元素设置overflow : hidden
>
>优点：方便

### 定位

#### 定位的基本介绍

可以让元素自由的摆放在网页的任意位置

一般用于盒子之间层叠情况

#### 定位的基本使用

属性名：position

>相对定位：			relative
>
>绝对定位：			absolute
>
>固定定位：			fixed

##### 静态定位

```css
代码：position: static;
```

就是标准流，默认值

##### 相对定位

```css
代码：position: relative;
```

##### 绝对定位

不占位

>绝对定位的盒子显示模式具备行内块特点,加宽高生效，如果没有宽度也没有内容，盒子的尺寸就是0

```css
代码：position: absolute;
```

##### 子绝父相（子级绝对定位，父级相对定位）

>使用子绝父相，水平居中
>
>绝对定位了不能使用margin: 0 auto;
>
>居中：
>
>left: 50%;
>
>margin-left: 盒子宽度的一半;
>
>top: 50%;
>
>margin-top: 盒子高度的一半;

```css
位移：自己宽度高度的一半
transform: translate(-50%, -50%);
```

##### 固定定位

代码：position: fixed;

>特点：
>
>需要配合方位属性实现移动
>
>相对于浏览器可视区域进行移动
>
>在页面不占位置——脱标

##### 元素的层级关系

>不同布局方式元素的层级关系：
>
>标准流<浮动<定位

>不同定位之间的层级关系：
>
>相对、绝对、固定默认层级相同
>
>此时HTML中写在下面的元素层级更高，会覆盖上面的元素
>
>z-index: ;

### 装饰

#### 垂直对齐方式

属性名：vertical-align

先给父级加行高

```css
baseline        默认，基线对齐
top		      顶部对齐
middle	      中部对齐
bottom	     底部对齐
```

#### 光标类型

属性名：cursor

```css
default		默认值，通常是箭头
pointer		小手效果，提示用户可以点击
text		工字型，提示用户可以选择文字
move	     十字光标，提示用户可以移动
```

#### 边框圆角

属性名：border-radius

取值：数字+px、百分比

#### overflow溢出部分显示效果

属性名：overflow

```css
visible		默认值，溢出部分可见
hidden	    溢出部分隐藏
scroll		无论是否溢出，都显示滚动条
auto	     根据是否溢出，自动显示或隐藏滚动条
```

#### 元素本身隐藏

```css
常见属性
visibility: hidden		占位隐藏
display: none
```

#### 元素的整体透明度

属性名：opacity

属性值：0~1之间的数字

#### 边框合并

让相邻表格边框进行合并，得到细边框效果（给table标签）

```css
代码
border-collapse: collapse;
```

#### 三角形

>1.设置一个盒子
>
>2.设置四周不同颜色的边框
>
>3.将盒子宽高设置为0，仅保留边框

#### 焦点伪类选择器

常用于表单控件

```css
input : focus
{
    background-color: skyblue;
}
```

#### 属性选择器

通过元素上的HTML属性来选择元素，常用于选择input标签

```css
E[attr]			选择具有attr属性的E元素
E[attr="val"]	  选择具有attr属性并且属性值等于val的E元素
```

### CSS样式补充

#### 精灵图

将多张小图片，合并成一张大图片

>1.创建一个盒子，设置盒子的尺寸和小图尺寸相同
>
>2.将精灵图设置为盒子的背景图片
>
>3.修改背景图位置（通过PxCook测量小图片左上角左边，分别取负值设置给盒子的background-position: x y）

#### 背景图大小

```css
代码
background-size: 宽度 高度 ;
```

>取值
>
>数字+px				简单方便，常用
>
>百分比				   相对于盒子自身宽高的百分比
>
>contain				 包含，将背景图片等比例缩放，直到不会超出盒子的最大
>
>cover 					覆盖，将背景图片等笔试缩放，直到刚好填满整个盒子没有空白

#### background连写

```css
代码
background: color image repeat position/size ;
```

>注意
>
>background-size和background连写同时设置，注意覆盖问题
>
>解决
>
>1.要么单独的样式写连写的下面
>
>2.要么单独样式写在连写的里面

#### 盒子阴影

属性名：box-shadow

>取值
>
>h-shadow					必须，水平偏移量。允许负值
>
>v-shadow					必须，垂直偏移量。允许负值
>
>blur							可选，模糊度
>
>spread						可选，阴影扩大
>
>color						  可选，阴影颜色
>
>inset						  可选，将阴影改为内部阴影

#### 过渡

属性名：transition

>取值
>
>过渡的属性				all:所有能过渡的属性都过渡、具体属性名：width——只有width过渡
>
>过渡的时长				数字+s（秒）

## 2D&3D 转换与动画

### 字体图标

直接使用iconfont文件夹中的

```html
<i class="iconfont  你想要的字体图标的类名"></i>
```



### 平面转换

使用transform属性实现元素的位移、旋转、缩放等效果

#### 位移

使用translate实现元素位移

```css
代码
父元素:hover  子元素 {
    transform: translate(水平移动距离，垂直移动距离);
}



```

> 取值（正负均可）
>
> 像素单位数值
>
> 百分比（盒子自身尺寸的百分比）

> 注意：X轴正向为右，Y轴正向为下

> 技巧
>
> translate()如果只给出一个值，表示X轴方向移动距离
>
> 单独设置某个方向的移动距离：translateX()  &  translateY()

#### 绝对定位居中

使用translate快速实现绝对定位的元素居中效果

```css
代码
transform : translate(-50%, -50%);
```

#### 旋转

使用rotate实现元素旋转效果

```css
代码
transform : rotate(角度);
```

> 注意：角度单位是deg
>
> 技巧：取值正负均可
>
> 正（顺时针）
>
> 负（逆时针）

#### 转换原点

使用transform-origin

```css
代码
默认圆点是盒子中心点
transform-origin: 原点水平位置    原点垂直位置 ;
```

> 取值
>
> 方位名词（left、top、right、bottom、center）
>
> 像素单位数值
>
> 百分比（盒子自身尺寸）

#### 多重转换

使用transform复合属性实现多形态转换

```css
transform : translate()  rotate() ;
```

> 注意：旋转不能放前面，旋转会改变坐标轴向
>
> 不能分开写，transform有层叠性

#### 缩放

使用scale改变元素的尺寸

```css
代码
transform : scale(X轴缩放倍数, Y轴缩放倍数);
```

> 技巧
>
> 一般情况下，只为scale设置一个值，表示X轴和Y轴等比例缩放
>
> transform: scale(缩放倍数);

#### 渐变

使用background-image属性实现渐变背景效果

> 渐变是多个颜色逐渐变化的视觉效果
>
> 一般用于设置盒子的背景

```css
代码
background-image : linear-gradient (颜色1，颜色2);
```

### 空间转换

使用transform属性实现元素在空间的位移、旋转、缩放等效果

> 空间：是从坐标轴角度定义的。x,y和z三条坐标轴构成了一个立体空间，z轴位置与视线方向相同
>
> 空间转换也叫3D转换

#### 空间位移

使用translate实现元素空间位移效果

```css
代码
transform: translate3d(x, y, z);
transform: translateX(值);
transform: translateY(值);
transform: translateZ(值);
```

> 取值（正负均可）
>
> 像素单位数值
>
> 百分比

#### 透视

使用perspective属性实现透视效果

```css
代码（添加给父级）
perspective: 值 ;
```

> 取值
>
> 像素单位数值，数值一般在800-1200

#### 空间旋转

使用rotate实现元素空间旋转效果

```css
代码
transform: rotateZ(值);
transform: rotateX(值);
transform: rotateY(值);
```

> 左手法则
>
> 判断旋转方向：左手握住旋转轴，拇指指向正直方向，手指弯曲方向为旋转正直方向

```css
transform: rotate3d(x,y,z,角度度数)       用来设置自定义旋转轴的位置及旋转的角度
```

> 注意
>
> x，y，z取值为0-1之间的数字

#### 立体呈现

使用transform-style: preserve-3d呈现立体图形

```css
代码
transform-style: preserve-3d ;			父级元素添加
```

> 给子元素定位（子绝父相）
>
> 子元素设置位置（位移或旋转）

#### 空间缩放

使用scale实现空间缩放效果

```css
代码
transform: scaleX(倍数);
transform: scaleY(倍数);
transform: scaleZ(倍数);
transform: scale3d(x,y,z);
```

### 动画

使用animation添加动画效果

```css
定义动画
@keyframes 动画名称 {
    from {}
    to {}
}

@keyframes 动画名称 {
    0%{}
    10%{}
    15%{}
    100%{}
}
```

```css
使用动画
animation: 动画名称    动画花费时长 ;
```

#### 动画属性

使用animation相关属性控制动画执行过程

```css
代码
animation: 动画名称 动画时长 速度曲线 延迟时间 重复次数 动画方向 执行完毕时状态;
```

> 注意
>
> 动画名称和动画时长必须赋值
>
> 取值不分先后顺序
>
> 如果有2个时间值，第一个时间表示动画时长，第二个时间表示延迟时间
>
> 反向  		alternate
>
> 无限循环 	infinite
>
> 重复3次播放		steps(3)  

```css
属性								作用				取值
animation-name					动画名称
animation-duration				   动画时长
animation-delay					   延迟时间
animation-fill-mode				    动画执行完毕时状态	forwards:最后一帧状态
												      backwards:第一帧状态
animation-timing-function		     速度曲线			 steps(数字):逐帧动画
animation-iteration-count		      重复次数			   infinite为无线循环	
animation-direction				    动画执行方向		    alternate为反向
animation-play-state			    暂停动画			paused暂停，配合hover使用
```

