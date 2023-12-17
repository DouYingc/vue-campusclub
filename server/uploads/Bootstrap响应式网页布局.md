# Bootstrap响应式网页布局

## 媒体查询

根据设备宽度的变化，设置差异化样式

```css
媒体特性常用写法
max-width（从大到小）
min-width（从小到大）
@media (媒体特性) {
    选择器 {
        样式
    }
}
```

## BootStrap

使用BootStrap框架快速开发响应式网页

### 栅格系统

BootStrap3默认将网页分成12等份

![image-20220511234324438](C:\Users\Sasha\AppData\Roaming\Typora\typora-user-images\image-20220511234324438.png)

>.container是BootStrap中专门提供的类名，所有应用该类名的盒子，默认已被指定宽度且居中
>
>.containe-fluidr也是BootStrap中专门提供的类名，所有应用该类名的盒子，宽度均为100%
>
>分别使用.row类名和.col类名定义栅格布局的行和列

>注意
>
>container类自带间距15px
>
>row类自带间距-15px
>
>可以使用row抵消container的间距

