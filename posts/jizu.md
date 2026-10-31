---
title: 计算机组成原理
date: 2026-10-30
description: 计算机组成原理笔记：涵盖系统概论与性能指标、数据表示与定点/浮点运算（IEEE754）、存储层次与Cache映射、机器指令与寻址方式、CPU结构与微程序、总线、异常与中断
---
# 计算机组成原理
## 计算机系统概论
### 性能指标
+ 时钟周期 基本时间单位 与时钟频率互为倒数
+ 时钟频率     CPU主频 = 1/CPU时钟周期

注意时钟频率单位 40MHz；对应的时钟周期单位为us

+ CPI（clock cycle per instruction）：执行一条指令所需的时钟周期<font style="color:#DF2A3F;">数</font>

对<font style="color:#DF2A3F;">单条</font>指令来说： CPU执行时间 = CPI * 时钟周期 = CPI / 时钟频率

+ MIPS（million instruction per second）：每秒钟执行多少百万条指令

<font style="color:#DF2A3F;">MIPS = 主频 / CPI*10</font><sup><font style="color:#DF2A3F;">6</font></sup>

平均指令周期 = 1 / 平均指令执行速度

## 数据的表示
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778149936091-71d48cac-4db7-44b6-a76b-89fbc01da9d7.png" width="403" title="" crop="0,0,1,1" id="u0e8b21c8" class="ne-image">

### 进制的转换
转换成十六进制：除十六（2）求余法，余数最上的写在最右边

### 定点数与浮点数
#### 定点数
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778150546419-cbe5d858-3043-427c-a525-7149b745409f.png" width="420" title="" crop="0,0,1,1" id="u3e5b3b5b" class="ne-image">

#### 浮点数
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778150740568-00990fae-9406-4bee-b539-cfc1f84614b9.png" width="440" title="" crop="0,0,1,1" id="u03a952ef" class="ne-image">

### 定点数的编码表示
#### 真值与机器码
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778151005948-a477b5c1-ddbf-406e-9b34-4d61d4ba356a.png" width="560" title="" crop="0,0,1,1" id="u5d781f1a" class="ne-image">

#### 原码
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778151453789-9a0339e8-8acd-4eef-8701-3c5b11ac6176.png" width="669" title="" crop="0,0,1,1" id="u6b21ac80" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778151599333-8f13e828-2f57-49a7-ba86-e29a05faffd2.png" width="781.5" title="" crop="0,0,1,1" id="u43003d62" class="ne-image">

##### 原码表示范围
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778152629246-c591d8d9-ef6b-42fe-aebe-56c3f91db79f.png" width="623.5" title="" crop="0,0,1,1" id="ub370c45a" class="ne-image">

#### 反码
+ 表示范围：与原码一样
+ 对于正数：原码与补码相同
+ 对于负数：符号位相同，数值位取反

#### 补码
+ 对于正数：原码与补码相同
+ 对于负数：符号位相同，数值位取反，末尾加一

##### 补码转真值
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778156768929-504c3901-0e24-4e8d-8613-29cbc46f3964.png" width="455.5" title="" crop="0,0,1,1" id="ud5f42eb5" class="ne-image">

+ 整数和小数都可以用这种方法

##### 补码表示范围
+ 100……0 -- 011……1（符号位参与运算）
+ 8位定点整数补码能多表示一个负数：-128
+ 8位定点小数补码能表示多一个负数-1

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778157155857-24a3bcd2-2a39-4e61-82dc-3bb4a3f56e2a.png" width="531" title="" crop="0,0,1,1" id="ueb026e98" class="ne-image">

#### 移码
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778576620086-eacfd285-3ac1-4581-8411-0b6b12bf3825.png" width="358" title="" crop="0,0,1,1" id="u9de12a9e" class="ne-image">

+ 将补码<font style="color:#DF2A3F;">符号位取反</font>，即是移码

##### 移码的本质
+ 在<font style="color:#DF2A3F;">真值的基础</font>上移动一个偏置值

#### 数值的奇偶校验法
+ 在数据的前面加一位校验位

##### 奇校验
+ 加上一位校验位，确保1的总数为奇数

##### 偶校验
+ 确保1的总数为偶数

##### ASCLL码
+ 已知A的ASCII码，求E的ASCII码

A + (4)<sub>2</sub> --> A + 001

## 定点数运算
### 定点数移位操作
#### 左移
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778342295105-729eec0d-e7de-4536-9151-03daaae36219.png" width="493" title="" crop="0,0,1,1" id="uddfe4b81" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778342482668-104a3506-8d2e-4689-88fa-1b05163527e5.png" width="460" title="" crop="0,0,1,1" id="Sjq0F" class="ne-image">

+ 向左移动k位，在最右边补上k个0
+ 左移相当于乘2
+ 若移动后符号位变化，则溢出

#### 右移
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778342695371-2fea319b-184e-4dc4-a9e3-2d530d5db6c7.png" width="495" title="" crop="0,0,1,1" id="uf3013810" class="ne-image">

补码移位,是算术右移(在左边补上符号位的值)

### 补码加法
+ （x+y）<sub>补</sub>=x<sub>补</sub> + y<sub>补</sub>
+ （x-y）<sub>补</sub>=x<sub>补</sub>+（-y）<sub>补</sub>
+ （-y）<sub>补</sub>= （y）<sub>补</sub>全部位取反加一

对于<font style="color:#DF2A3F;">原码</font>加减法，数值位进位<font style="color:#DF2A3F;">不能</font>进到符号位

对于<font style="color:#DF2A3F;">补码</font>加减法，数值位进位<font style="color:#DF2A3F;">可以</font>进到符号位

### 溢出检测
+ 直接检测：两个加数符号位相同，若结果符号位相反，则溢出
+ 单符号位：<font style="color:#DF2A3F;">最高数值位</font>进位与<font style="color:#DF2A3F;">符号位</font>进位相同，则未溢出
+ 双符号位：在加数最高位加上一个与符号位相同的位，若相加后，变为01为正溢出 10为负溢出

### 原码阵列乘法
+ 用乘数绝对值,直接列竖式,计算二进制结果就行了
+ 符号位:对乘数原码符号位进行异或

二进制加法规则：

+ 满2写0进1
+ 满3写1进1
+ 满4写0进2
+ 满5写1进2
+ 满6写0进3

### 补码阵列乘法
1. 先写出乘数的补码
2. 算前求补,如果乘数是负数,则对其补码进行带符号位取反加一
3. 用乘数二进制绝对值进行竖式乘法
4. 异或计算符号位,若符号位为负,则要对结果进行求补,即取反加一,再加上符号位
5. 若符号位为正,加上符号位算出来的数就是补码乘法的答案

### 原码除法 不恢复余数法
+ 计算出x，y的绝对值，与-｜y｜的补码
+ 首先拿被除数x与补码相加(结果作为符号位)
+ 若相加后符号位为0，则商1，将余数左移
+ 左移后继续与补码相加，若符号位为1，商0，加上｜y｜，再左移，再继续与补码相加
+ 得到商的位数与y相同，则结束
+ 最后得到的结果，作为商的尾数部分，左移了几次，就在前面加几个0作为余数
+ 得到的商（不含多个零），加上<font style="color:#DF2A3F;">符号位</font>：(除数与被除数符号异或)，就是除法结果

## 浮点数与IEEE754
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778288481280-3dcee681-3fcb-4659-b782-97b24f72d5f0.png" width="587" title="" crop="0,0,1,1" id="ub7340ee1" class="ne-image">

### 浮点数的表示格式
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778290057811-e213da9c-d89e-4e86-aae7-0c8abb2d3bb5.png" width="494.5" title="" crop="0,0,1,1" id="u903f950d" class="ne-image">

### 浮点数规格化（尾数为原码）
调整一个非规格化浮点数的位尾数和阶码的大小，使尾数<font style="color:#DF2A3F;">最高有效位</font>保证为一个有效值

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778290695199-b31549f8-9b65-4cde-bef0-45d502a59383.png" width="645" title="" crop="0,0,1,1" id="u3067f1dd" class="ne-image">

<font style="color:#DF2A3F;">原码</font>规格化数表示范围：

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778291349765-31e6611b-5c23-4609-a179-45a2fa965e95.png" width="582.5" title="" crop="0,0,1,1" id="u9e14969c" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778291531830-3d581476-e96e-47ef-8b13-81c7d48c3966.png" width="576" title="" crop="0,0,1,1" id="u9539dc53" class="ne-image">

#### 规格化操作
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778291815044-d98ff3d3-46d6-4f0a-93f0-300ceed2610a.png" width="695" title="" crop="0,0,1,1" id="u9059ed49" class="ne-image">

#### 浮点数加减运算（补码表示）
+ 预处理，按照题目所给<font style="color:#DF2A3F;">位数，</font>写出<font style="color:#DF2A3F;">阶码</font>，<font style="color:#DF2A3F;">尾数的补码</font>，表示为浮点数格式[X]<sub>浮</sub>=011；1 .010101
+ 对阶：小阶向大阶对齐，再计算出小阶数的<font style="color:#DF2A3F;">尾数</font>需要右移多少位（注意补码为<font style="color:#DF2A3F;">算术右移</font>，即高位补上符号位的数值）
+ 尾数求和：计算好的X,Y尾数相加
+ 规格化：观察求和后的结果是否符合<font style="color:#DF2A3F;">规格化，</font>若不符合，进行规格化
+ 判断阶码是否溢出
+ 最后得到的阶码加上尾数，注意若尾数是<font style="color:#DF2A3F;">补码负数</font>，需要转换成<font style="color:#DF2A3F;">真值</font>

#### 补码尾数的规格化形式
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778575082317-844f272c-0844-4690-91ef-631303a61499.png" width="642" title="" crop="0,0,1,1" id="u475b57c6" class="ne-image">

符号位与最高数值位<font style="color:#DF2A3F;">相反</font>

### IEEE754
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778576882558-60bd992f-06f6-4020-97f6-ebec11183f56.png" width="646.5" title="" crop="0,0,1,1" id="u0635ba30" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778581568582-bf928162-98c1-4c70-865d-50fdf2c8b834.png" width="444.5" title="" crop="0,0,1,1" id="u671efbcc" class="ne-image">

+ IEEE754的阶码是用移码表示的，但是与普通移码不同，是在移码的基础上减去1
+ 对于短浮点数，8位的移码表示范围原本是0~255 但是IEEE754保留了0，255

#### 移码的本质
+ 移码是在真值的基础上移动一个偏置值
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778581524307-1f4a25ec-2a8b-4225-a730-e87f5bf8d4fc.png" width="571" title="" crop="0,0,1,1" id="u5be4e05d" class="ne-image">
+ 当机器字长为8，移码表示范围为0~127 真值表示范围为-128~127

IEEE754做题规则

+ 首先明确公式与所占位数
+ 把二进制按位划分，求出指数，尾数，填进公式里面
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778593917419-59e4c4ac-b41f-4342-87bd-34561d71c621.png" width="696.5" title="" crop="0,0,1,1" id="ue766552d" class="ne-image">
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778593943099-baff179c-fb66-45a5-b286-2b35fd32c2e8.png" width="210.5" title="" crop="0,0,1,1" id="u4db5f322" class="ne-image">
+ 提取第0位，作为符号位；第一到第八位作为阶码部分；后面为尾数部分
+ 符号位决定决定正负：若s = 1，为负数
+ 得到阶码，化为10进制X，X - 127 = 指数
+ 最后写出结果并化成其他进制

结果用IEEE短浮点数（32位）格式：

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778597750649-7c654fa3-9d6a-4b1c-9ab1-f7e2d92ea567.png" width="331" title="" crop="0,0,1,1" id="u82459e67" class="ne-image">

## 存储系统
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778842231790-0afb9689-b42c-4c0d-9fb6-991e37be3b6a.png" width="382.5" title="" crop="0,0,1,1" id="uaf15ab9b" class="ne-image">

### 存储器分类
#### 按存取方式分类
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778842698091-b4f924f0-d03a-4202-98c4-a5f5d6bf5e2f.png" width="577" title="" crop="0,0,1,1" id="ub51a3c2b" class="ne-image">

随机存取存储器：按<font style="color:#DF2A3F;">地址</font>访问存储单元

顺序存取存储器：按<font style="color:#DF2A3F;">顺序</font>存放和读出，以<font style="color:#DF2A3F;">记录块</font>为单位编址

直接存取存储器：结合两者特点，可以直接选取所需信息所在的区域，然后按顺序存取

相连存储器：按<font style="color:#DF2A3F;">内容</font>检索到存储位置

#### 按信息可更改性分类
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778842775460-3370b762-0073-4aec-a421-fb3aa6cc834e.png" width="617" title="" crop="0,0,1,1" id="u8b2661b0" class="ne-image">

#### 按断电后信息可保存性
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778842896115-6525e859-dbef-462f-924c-a686770fa0b0.png" width="579" title="" crop="0,0,1,1" id="uaa3a4534" class="ne-image">

#### 按功能分类
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778842936005-ca69ec8a-64c3-4928-a5d9-be6eff14557b.png" width="544.5" title="" crop="0,0,1,1" id="uaf08c4c4" class="ne-image">

### 主存储器的组成和基本操作
#### 存储矩阵是主存的核心部件
+ 存储矩阵：由一个个存储单元构成
+ 存储字长：一个存储单元有8个存储元件，对应的<font style="color:#DF2A3F;">存储字长</font>就是8位
+ 如何确定存储字长是多少位：
1. 按<font style="color:#DF2A3F;">字节编址</font>，表示一个存储单元有<font style="color:#DF2A3F;">8个二进制位</font>
2. 按<font style="color:#DF2A3F;">字编址</font>：一个<font style="color:#DF2A3F;">机器字长</font>编一个地址
+ 存储单元地址：一个存储单元对应一个地址
+ 存储单元地址为32位：寻址范围为 0~2<sup>32</sup>-1

64位计算机：指的是<font style="color:#DF2A3F;">机器字长</font>是64位

机器字长：CPU一次能处理的<font style="color:#DF2A3F;">二进制数据的位数</font>

#### 读操作
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778849104203-53bad3be-cbe0-45e4-975c-6972c598443b.png" width="604" title="" crop="0,0,1,1" id="u6d368cab" class="ne-image">

#### 写操作
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778849145361-b7f47034-44e0-4b74-9e1c-935f34ac74ba.png" width="617" title="" crop="0,0,1,1" id="ub90cec30" class="ne-image">

MDR宽度 = 数据线宽度

MAR宽度 = 地址线宽度

### 存储周期
<font style="color:rgb(24, 30, 51);">连续启动两次独立的存储器操作所需间隔的最小时间，通常存取周期大于等于存取时间</font>

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778849697403-bdfa0d94-ccd6-42ee-b0b9-9e1234cb2d26.png" width="592" title="" crop="0,0,1,1" id="uae8b1bce" class="ne-image">

### 存储器的层次化结构
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778895023733-4b6239f6-2fc9-49f4-aa25-f12ca0e01293.png" width="637" title="" crop="0,0,1,1" id="u0b4dff58" class="ne-image">

### 随机存取存储器
#### SRAM静态随机存取存储器
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778895526639-6a2d8285-7c9d-4626-bcae-6de4039139be.png" width="513.5" title="" crop="0,0,1,1" id="udb6fb99b" class="ne-image">

##### 组成
###### 存储矩阵
+ 由多个位平面组成
+ 每个位平面划分坐标轴x，y
+ 不同位平面的（x，y）被选中，组成一个存储单元
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778896440620-6c2cb6b8-f3e2-4f4f-9db8-3316896a80f8.png" width="398.5" title="" crop="0,0,1,1" id="u46857153" class="ne-image">

###### 片选控制信号CS<sup>—</sup>
+ 低电平有效
+ 为什么出现？当多个芯片为了扩展容量，组成一起的时候，如何保证选中特定的芯片
+ 地址选择的时候，片选信号选中要访问的存储器所在芯片

###### 读写控制信号WE<sup>—</sup>
+ 根据CPU的命令，控制存储单元读还是写

#### DRAM动态随机存取存储器
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778898460707-ab663ec7-69f3-4a97-b974-52c59110927c.png" width="511.5" title="" crop="0,0,1,1" id="ucbf0f105" class="ne-image">

### 存储器芯片的扩展
#### 内存条
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778900612609-fbac086c-aeb1-4c45-b79a-8973ec6972a0.png" width="670" title="" crop="0,0,1,1" id="u639d054a" class="ne-image">

#### 存储器芯片的扩展
##### 位扩展
+ 512K*4 =》 512K*8
+ 位扩展确定一组有多少片

##### 字扩展
+ 512K =》 1M
+ 字扩展确定有多少组

##### 字位同时扩展
+ 位扩展确定片数
+ 字扩展确定组数
+ 确定地址线条数：单芯片容量512K -> 2<sup>19 </sup>->19条数据线
+ 确定数据线条数：扩展后16位-> 16条数据线
+ 确定译码器：组数4组 -> 2<sup>2</sup>-> 2/4译码器
1. 如果是1/2译码器，不用画出来，画一个单极管
2. 如果是2/4译码器以上，要画出来并标上前缀编码
+ 确定读写信号：SRAM/DRAM 有读写信号 EEPROM只读存储器，只有RD信号

##### 地址范围
先确定做地址线的n低位 0000~1111 

确定片选信号高位，作为前缀，假设有4组

+ 00 0000~1111
+ 01 0000~1111
+ 10 000~1111
+ 11 0000~1111
+ 最后化为16进制

## Cache
### 局部性原理
时间局部性 空间局部性

### cache的工作原理
#### 块级单位的划分
+ 常用的数据总是占用<font style="color:#DF2A3F;">多个存储单元</font>，因此应该以多个存储单元为<font style="color:#DF2A3F;">单位</font>，将信息复制到Cache中
+ 所以应该划分<font style="color:#DF2A3F;">主存块</font>，一个主存块包含多个存储单元，主存块作为主存和Cache之间的<font style="color:#DF2A3F;">交换单位</font>
+ 在Cache里面，存储方式也是块，称为<font style="color:#DF2A3F;">Cache行</font>

#### <font style="color:#000000;">Cache里面存放什么？</font>
+ <font style="color:#000000;">存放着主存中被频繁访问的数据，以便cpu直接访问</font>
+ <font style="color:#000000;">因为只存有部分副本，所以</font><font style="color:#DF2A3F;">容量</font><font style="color:#000000;">比主存小</font>

#### <font style="color:#000000;">Cache地址和主存地址</font>
##### Cache地址
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1776940839669-86849847-1a8c-4888-ab80-b970a1164365.png" width="747" title="" crop="0,0,1,1" id="u86ae9da6" class="ne-image">

+ 把一串二进制的码作为地址，高位看作是Cache的行号，低位看作是Cache的块内地址
+ 每一个<font style="color:#DF2A3F;">存储单元</font>都是有地址的，可以通过Cache地址去查找具体的存储单元

##### Cache地址和主存地址的比较
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1776941334601-35cac8b5-25f9-4fc2-aacb-bbbe5c076650.png" width="680" title="" crop="0,0,1,1" id="ua374004c" class="ne-image">

+ m > c
+ b = b
+ 地址是一个<font style="color:#DF2A3F;">二进制串</font>，因为主存的块数一定比Cache行数多，所以主存二进制串一定是更长的
+ CPU在访问的时候，一般用的是<font style="color:#DF2A3F;">主存地址</font>

#### Cache的有效位
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1776941642820-c79c1538-0f30-41ca-bbf4-cb29e0344f53.png" width="590.5" title="" crop="0,0,1,1" id="u218217e6" class="ne-image">

+ 因为一个Cache行存储着很多个存储单元，这些存储单元共享<font style="color:#DF2A3F;">一个有效位</font>
+ 系统<font style="color:#DF2A3F;">启动/复位</font>时，每个Cache行都为空，所以<font style="color:#DF2A3F;">有效位为0</font>，直到存储信息后，有效位才变为1
+ 想要<font style="color:#DF2A3F;">淘汰</font>某个Cache行中的信息时，可以修改有效位为0
+ <font style="color:#DF2A3F;">主存块</font>是<font style="color:#DF2A3F;">没有</font> 有效位 的。那是不是Cache和主存的容量不同？ =》 Cache<font style="color:#DF2A3F;">数据区</font>和主存块大小一样

#### CPU在Cache中的访问过程
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1776942314577-744745d2-daee-4189-a676-aec2828e24ed.png" width="686.5" title="" crop="0,0,1,1" id="u05307911" class="ne-image">

##### 缺失代价Tm
+ 当查找一个数据时，cpu根据主存块地址，在cache中查找，如果<font style="color:#DF2A3F;">没找到</font>，会在主存中提取中整个块，在cache中找到对应的空闲行，把主存块的某存储单元送给cpu的同时，把整个块复制到cache行中
+ 缺失代价：主存将块送到cache，和将存储单元送到cpu的时间之和
+ 总时间代价：Tm + Tc
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1776943662702-ae734891-b25c-42af-9fd9-35d431fcb472.png" width="360" title="" crop="0,0,1,1" id="ue757a347" class="ne-image">

##### 命中率P
+ cpu根据主存地址，成功在cache块中获取到信息，称为cache命中
+ 命中率：命中次数/访问总次数

##### cache访问时间Tc
+ cpu在cache中访问成功，所需要的时间开销

##### cache-主存平均访问时间
+ 平均访问时间 = 命中时间 + 缺失率 * 缺失代价
+ AWAT = Tc + （1-p）* Tm

### cache行与主存块之间的映射方式
+ cpu是如何根据<font style="color:#DF2A3F;">主存的地址</font>找到对应的<font style="color:#DF2A3F;">cache行</font>？ =》 <font style="color:#DF2A3F;">映射规则</font>
+ 将主存块复制到cache行的时候，主存块和cache行之间要遵守某个规则；这样，当cpu在访问某个主存单元的时候，可以根据这个<font style="color:#DF2A3F;">映射规则</font>，直接在cache对应行中查找要访问的信息

#### 映射方式
已知主存块的地址，根据映射规则，求cache行号地址

##### 标记位（Tag）
+ 用于标识cache行属于哪个主存块

##### 直接映射
每个主存块映射到cache的<font style="color:#DF2A3F;">固定</font>行中

<font style="color:#DF2A3F;">cache 行号</font> = <font style="color:#DF2A3F;">主存</font>块号mod <font style="color:#DF2A3F;">cache行数（</font><font style="color:#2F4BDA;">模运算</font><font style="color:#DF2A3F;">）</font>

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777082034722-290715e0-acda-4bd7-897b-1092dca22160.png" width="319" title="" crop="0,0,1,1" id="ue37eebe4" class="ne-image"><img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777085409361-bd7e0149-b1b8-4933-87ae-66d0ca817c31.png" width="178" title="" crop="0,0,1,1" id="uf032586e" class="ne-image">

<font style="color:#DF2A3F;"></font>

+ <font style="color:#000000;">对于cache行号来说，它是由</font><font style="color:#DF2A3F;">cache总行数</font><font style="color:#000000;">决定的；而主存块号，是由</font><font style="color:#DF2A3F;">主存块数</font><font style="color:#000000;">决定的</font>
+ <font style="color:#000000;">对</font><font style="color:#DF2A3F;">cache地址</font><font style="color:#000000;">的研究可以发现，它把</font><font style="color:#DF2A3F;">主存块号</font><font style="color:#000000;">的</font><font style="color:#1DC0C9;">高位部分</font><font style="color:#000000;">解析成了</font><font style="color:#117CEE;">tag</font><font style="color:#000000;">位，</font><font style="color:#1DC0C9;">低位部分</font><font style="color:#000000;">解析成了</font><font style="color:#117CEE;">cache行</font><font style="color:#000000;">号（cpu拿到的就是主存地址，再对主存地址进行解析，就得到cache地址）</font>
+ <font style="color:#000000;">在</font><font style="color:#DF2A3F;">cache</font><font style="color:#000000;">中，每一行都由[</font><font style="color:#DF2A3F;">有效</font><font style="color:#000000;">位]+[</font><font style="color:#DF2A3F;">tag</font><font style="color:#000000;">位]+[数据块] 组成</font>

###### <font style="color:#000000;">访存过程</font>
1. CPU给出主存地址
2. 根据主存地址的中间c位找到对应的cache行（模运算）
3. 对比tag位，若<font style="color:#DF2A3F;">tag位相同</font>且cache行<font style="color:#DF2A3F;">有效位为1</font>，则访问cache命中
4. 根据主存地址低位的块内地址，访问存储单元

做题：

+ cache<font style="color:#DF2A3F;">行号</font> = <font style="color:#DF2A3F;">主存块号</font> % cache行数
+ 主存地址为主存块号 + 块内地址 = tag位+cache行号+块内地址（放进cache后的地址） 每一个位都有对应的二进制位数
+ <font style="color:#DF2A3F;">tag</font>位 = lg2 主存容量/cache容量
+ cache<font style="color:#DF2A3F;">行数</font> = 容量/块大小
+ cache行号占的<font style="color:#DF2A3F;">位数</font>：容量/块大小 化成2^n n即为位数
+ <font style="color:#DF2A3F;">块内地址</font>占的位数：单块cache大小，化成2^n n即为位数

##### 全相联映射
每个<font style="color:#DF2A3F;">主存块</font>映射到cache的<font style="color:#DF2A3F;">任意</font>行中

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777170952143-f22e911b-55ae-4db2-b3b2-44d7ab0e460c.png" width="370" title="" crop="0,0,1,1" id="uc27e273b" class="ne-image">

主存块号就是<font style="color:#DF2A3F;">tag</font>位

##### 组相联映射
主存块映射到cache<font style="color:#DF2A3F;">固定组</font>的<font style="color:#DF2A3F;">任意行</font>中（先把cache分组）

cache组号 = 主存块号 % cache组数

只能确定放在哪一个cache组里面

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777171175299-3559ab28-c0d9-4753-bbe2-a31a13661221.png" width="382.5" title="" crop="0,0,1,1" id="u1e8fc4bc" class="ne-image">

四路组相连：一个组有四个行

组相联 = 组间直接映射 + 组内全相联

做题：

+ 先确定cache有多少组
+ 组数 = 行数/n组相联

##### 化简单位
字节是固定存储单位 字是cpu运算单位 一个位就是一个0/1 32位表示能处理32个0/1

位就是bit，8个bit（位）是一个bite（字节）在32位系统中，一个字就是4字节

## 机器指令
### 指令的作用
+ 计算机就是连续执行每一条<font style="color:#DF2A3F;">机器指令</font>实现全自动工作的
+ 机器指令的集合称作机器的指令系统
+ 执行一条条的机器指令，就可以完成想要的操作

### 指令的格式
指令是由<font style="color:#DF2A3F;">操作码</font>和<font style="color:#DF2A3F;">地址码</font>组成的

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777173559307-4b0aa1f1-79b9-42d7-ad33-8aa197de8263.png" width="483.5" title="" crop="0,0,1,1" id="u51f877c9" class="ne-image">

#### 操作码
+ 操作码用来指明该<font style="color:#DF2A3F;">指令</font>要<font style="color:#DF2A3F;">完成的操作</font>
+ 操作码<font style="color:#DF2A3F;">位数</font>反映了 机器允许的指令<font style="color:#DF2A3F;">条数</font>
+ 操作码占n位，表示机器最多包含<font style="color:#DF2A3F;">2</font><sup><font style="color:#DF2A3F;">n</font></sup><font style="color:#DF2A3F;"> 条</font>指令

操作码<font style="color:#DF2A3F;">长度</font>可以固定/变化，就是<font style="color:#DF2A3F;">定长</font>操作码与<font style="color:#DF2A3F;">扩展</font>操作码

#### 地址码
+ 地址码用来指出该指令的<font style="color:#DF2A3F;">源操作数</font>的地址，<font style="color:#DF2A3F;">结果</font>的地址，以及<font style="color:#DF2A3F;">下一条指令</font>的地址
+ 这个地址可能是<font style="color:#DF2A3F;">寄存器</font>地址，也可以是<font style="color:#DF2A3F;">主存</font>地址（与选址方式有关）

#### 格式分类
##### 四地址指令
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777194004366-0e04c931-2a03-416d-86ad-1a49ab30333b.png" width="379" title="" crop="0,0,1,1" id="u380da2d9" class="ne-image"><img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777208445026-c1b88cef-2e07-4e01-a6d6-4162eb514d96.png" width="334.5" title="" crop="0,0,1,1" id="u55b03cc7" class="ne-image">

+ 表示有4个地址字段
+ A1记录了第一个操作数，A2记录了第二个操作数，A3记录结果，A4记录下一条指令的地址（<font style="color:#DF2A3F;">可以省</font>）
+ 括号表示取<font style="color:#DF2A3F;">地址里面</font>的<font style="color:#DF2A3F;">值</font>

##### 三地址指令
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777194096106-6e3c2db0-566a-4216-978c-18e8e0ca4ec3.png" width="361.5" title="" crop="0,0,1,1" id="ud218fb15" class="ne-image"><img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777208709360-8c5cd125-2ea4-48f6-a2cd-43c29f7fe8e2.png" width="347.5" title="" crop="0,0,1,1" id="u12c46aa6" class="ne-image">

+ 省去A4

##### 二地址指令
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777208825936-802a6ee5-efd6-4818-866e-1b522a1f9522.png" width="488.5" title="" crop="0,0,1,1" id="u3258d4f4" class="ne-image">

##### 一地址指令
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777208895289-5b744bab-fa5d-4835-b016-1bfbf5956031.png" width="412.5" title="" crop="0,0,1,1" id="u0cb2ad66" class="ne-image">

##### 零地址指令
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777208982106-96cc30b2-dd66-45ee-9269-20acf3b62957.png" width="450.5" title="" crop="0,0,1,1" id="u286b31fb" class="ne-image">

### 指令字长
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777194550139-3a4d9dae-7231-409d-8b72-2d57536f8b3f.png" width="471" title="" crop="0,0,1,1" id="u88dba6e1" class="ne-image">

+ 如果按字节编址，访问<font style="color:#DF2A3F;">多个</font>存储单元才可取出一条<font style="color:#DF2A3F;">完整的指令</font>

### 定长操作码与扩展操作码
#### 定长操作码
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777209416602-3ae8e1ed-72a8-4e27-982d-0b26d659c9d3.png" width="492" title="" crop="0,0,1,1" id="uf7781c68" class="ne-image">

+ 将指令字的<font style="color:#DF2A3F;">最高位</font>部分 分配固定的<font style="color:#DF2A3F;">若干位</font>表示<font style="color:#DF2A3F;">操作码</font>

#### 扩展操作码
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777209563675-a337c4b3-9e43-434a-9ae5-eda3d6e779fa.png" width="510.5" title="" crop="0,0,1,1" id="u2b7122e7" class="ne-image">

+ <font style="color:#DF2A3F;">扩展操作码</font>字段=<font style="color:#DF2A3F;">缩减地址码</font>字段
+ 若给出一段地址，如何确定哪一些<font style="color:#DF2A3F;">位数</font>是操作码，哪一些是<font style="color:#DF2A3F;">地址</font>码？

##### 对于<font style="color:#DF2A3F;">三地址</font>指令
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777209965235-4c2e071e-2e22-478e-a010-36474e457ae4.png" width="530" title="" crop="0,0,1,1" id="u72516da7" class="ne-image">

+ 前面op为操作码，有<font style="color:#DF2A3F;">4位</font>，能表示2<sup>4</sup>-1条指令（剩下一条1111用于<font style="color:#DF2A3F;">扩展</font>）
+ 一位操作码，三位地址码
+ 1111称为扩展窗口

##### 对于<font style="color:#DF2A3F;">二地址</font>指令
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777210196142-ca157b6e-9375-40b2-87ca-532c63495534.png" width="529" title="" crop="0,0,1,1" id="u3c56cded" class="ne-image">

+ 前四位全一

##### 一地址指令
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777210413025-fe229cb6-7898-46a5-add0-43e7d02e9e34.png" width="505" title="" crop="0,0,1,1" id="ue361bbd1" class="ne-image">

+ 前八位是全一

##### 零地址指令
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777210557773-2b50b467-f262-4f9a-8280-d521ceec529c.png" width="466.5" title="" crop="0,0,1,1" id="u3b236f3c" class="ne-image">

+ 前12位全一
+ 有2<sup>4</sup>条指令

三地址 —》二地址扩展的时候，会留n个扩展窗口，n * 操作码可扩展的位数 等于指令条数

### 数据在存储器中的存放方式
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777260367133-f4e6fea4-6bf8-4ec5-b9bf-bd5bf0b57e97.png" width="578" title="" crop="0,0,1,1" id="ue8553c40" class="ne-image">

## 寻址方式
### 指令的寻址方式
寻找<font style="color:#DF2A3F;">下一条将要执行的指令</font>地址称为指令寻址

+ pc顺势自增

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777286396012-3b67f2f5-c24b-46d1-88fb-3b162b68b827.png" width="521" title="" crop="0,0,1,1" id="u46acdf29" class="ne-image">

+ 跳转指令

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777286719570-8554404e-c7f0-49a9-8c27-942cad4f008b.png" width="527" title="" crop="0,0,1,1" id="ua7e7331e" class="ne-image">

### 数据的寻址方式
+ 寻找指令中的<font style="color:#DF2A3F;">操作数的地址</font>称为数据寻址

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777286932276-0f08f38d-923b-4d17-ad01-ef6738de75b4.png" width="523" title="" crop="0,0,1,1" id="u9a7327ea" class="ne-image">

#### 立即寻址
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777287197536-c1b0d6ad-9b15-451b-98c1-74c1ded3ae61.png" width="522" title="" crop="0,0,1,1" id="u064240b4" class="ne-image">

#### 直接寻址
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777287287227-0b21655b-f1e5-4b11-a906-b2753ef03415.png" width="515" title="" crop="0,0,1,1" id="ucc627001" class="ne-image">

#### 间接寻址
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777287598654-dc93786e-7524-4751-8aa5-ef3303c85a05.png" width="566" title="" crop="0,0,1,1" id="u944c6f1a" class="ne-image">

#### 寄存器寻址
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777287697026-c6493af8-c62f-4d6a-87dc-46556c333a6d.png" width="557" title="" crop="0,0,1,1" id="u908d4466" class="ne-image">

#### 寄存器间接寻址
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777287820769-f6434497-2138-4b9a-b54a-7e4ef1f70184.png" width="543" title="" crop="0,0,1,1" id="uc600ae1f" class="ne-image">

#### 基址寻址
+ 操作数的地址 = 基址寄存器的内容 + 形式地址
+ 基址寄存器中<font style="color:#DF2A3F;">内容</font>只能由<font style="color:#DF2A3F;">管理员</font>修改，<font style="color:#DF2A3F;">不可变</font>
+ <font style="color:#DF2A3F;">A</font>可以变

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777288036784-67cfad2d-058d-4397-9e42-3b958af937d2.png" width="556" title="" crop="0,0,1,1" id="ua7f6296f" class="ne-image">

#### 变址寻址
+ 操作数地址 = 变址寄存器内容 + 形式地址
+ <font style="color:#DF2A3F;">变址寄存器</font>内容<font style="color:#DF2A3F;">可以修改</font>
+ A<font style="color:#DF2A3F;">不能变</font>

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777288321261-75a21c60-7780-4e05-b4d2-e99eb10721ad.png" width="585" title="" crop="0,0,1,1" id="u4d4d6c04" class="ne-image">

#### 相对寻址（常考）
+ 操作数地址 = PC的内容 + 形式地址
+ 注意：PC已经完成自增，内容是<font style="color:#DF2A3F;">下一条指令</font>的地址(pc的内容就是一个地址)
+ A是位移量，用<font style="color:#DF2A3F;">补码</font>表示

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777288715352-9193d426-194b-46c7-8d44-114054dc2726.png" width="592" title="" crop="0,0,1,1" id="u303ef2a1" class="ne-image">

#### 堆栈寻址
##### 寄存器堆栈寻址
不需要堆栈指针

##### 存储器堆栈寻址
+ 需要堆栈指针
+ 出栈入栈伴随着SP值的增减
+ 进栈时
1. SP - 1（移动指针）
2. 再写入数据（写入SP指向的内存单元）
+ 出栈时
1. 先将栈顶数据取出，放到累加器中
2. 再让堆栈指针加一

#### 总结
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777288777357-f48a26ed-fcec-4ff2-8485-edbe4cf3f611.png" width="407.5" title="" crop="0,0,1,1" id="ub5d4f361" class="ne-image">

### CISC RISC
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1777989992157-5e07fa92-dd89-4380-affb-bf8ba449bc2e.png" width="961" title="" crop="0,0,1,1" id="u63c62007" class="ne-image">

## CPU
### cpu的功能和基本结构
#### cpu的组成
##### 程序计数器PC
存放着即将执行指令的<font style="color:#DF2A3F;">地址</font>

PC的<font style="color:#DF2A3F;">位数</font>取决于<font style="color:#DF2A3F;">存储器的容量</font>和<font style="color:#DF2A3F;">指令字长</font>

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778028769157-702a2c4d-4f07-4e1d-8002-e1bdfde451d1.png" width="346" title="" crop="0,0,1,1" id="uf3296378" class="ne-image">

##### 指令寄存器IR
存放<font style="color:#DF2A3F;">当前执行</font>的指令

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778029507601-25645759-9903-46fc-bc66-4cd5be319a2e.png" width="354.5" title="" crop="0,0,1,1" id="u15009e26" class="ne-image">

##### 指令译码器ID
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778029541894-ef689f54-3b48-41f2-a738-705b9564a42d.png" width="357.5" title="" crop="0,0,1,1" id="u0d28c629" class="ne-image">

##### 中断机构
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778029712345-9c0bdbc4-69b2-4120-9a1a-809a7c596b6c.png" width="644" title="" crop="0,0,1,1" id="ub0d29b32" class="ne-image">

##### 操作信号形成的部件
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778029813928-5241eef0-8e78-4f45-8cac-34b7ded52328.png" width="383.5" title="" crop="0,0,1,1" id="ufe5aa099" class="ne-image">

#### CPU的功能
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778030020871-a259ba98-d0c7-4fd6-bf38-eecc8b23a77d.png" width="462.5" title="" crop="0,0,1,1" id="u19fe7ac9" class="ne-image">

### CPU的寄存器
#### 用户可见寄存器
##### 通用寄存器
###### 数据寄存器
###### 地址寄存器
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778030461381-f8be3c93-e36c-4d1e-ae4c-b026f5f2454a.png" width="469" title="" crop="0,0,1,1" id="ud7977ed2" class="ne-image">

##### 程序状态字寄存器（PSW）
#### 用户不可见寄存器
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778114166630-2b06aa14-9f9d-4794-8409-8de467be5ca2.png" width="596" title="" crop="0,0,1,1" id="u6455925c" class="ne-image">

### 指令执行过程
#### 指令周期
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778114587122-adbc913e-c48d-4f56-b027-70ad32945b8f.png" width="601" title="" crop="0,0,1,1" id="ud9a41bec" class="ne-image">

取址：把指令根据PC的指示，取到CPU的IR（指令寄存器）中

间址：各种寻址方式（不一定要做）

执行：执行指令

中断：（不一定要做）

##### 机器周期
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778414524789-618325b9-ccf7-4b69-b78d-61f2b56e989c.png" width="513.5" title="" crop="0,0,1,1" id="ucb6b9073" class="ne-image">

#### 指令执行过程
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778115477165-0ce07961-07e6-40fe-883c-c09e1ce506f5.png" width="617" title="" crop="0,0,1,1" id="udd327aee" class="ne-image">

#### 指令周期流程图
首先明确操作：

STO,寄存器往内存中<font style="color:#DF2A3F;">存数据</font>

+ 往哪里存数据?寄存器<font style="color:#DF2A3F;">间接寻址</font>,<font style="color:#DF2A3F;">指定的地址</font>
+ 从哪里找数据:另一个寄存器里面的数据

LDA,从内存中<font style="color:#DF2A3F;">取出数据</font>,写入寄存器中

SUB:减法操作,要把操作数放到xy,再让ALU进行运算

##### 取址周期：
+ PC>AR
+ M>DR
+ DR>IR
+ 取值周期目的：取到<font style="color:#DF2A3F;">机器指令</font>，存入<font style="color:#DF2A3F;">IR</font>中
+ 从PC中取

##### 执行周期：
+ R2 > AR R2o,G，ARi
+ R1 > DR R1o，G，DRi
+ DR > M R/W:W

##### 控制信号下标
+ o输出，i输入，R／W：读写
+ x，y:进入寄存器x，y
+ G：G门打开，ALU的运算结果才能送到总线上
+ 一定注意:数据传输要不要<font style="color:#DF2A3F;">经过G门</font>
+ 总线A：往寄存器输入数据
+ 总线B：往寄存器输出数据，经过x，y进入ALU，才能进A总线
+ R/W:针对内存,从<font style="color:#DF2A3F;">内存里读</font>还是<font style="color:#DF2A3F;">写入</font>内存

### 数据通路
#### 组成
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778415258943-39178a49-21a1-4be6-be9a-18f122aeb383.png" width="585" title="" crop="0,0,1,1" id="u817c3e05" class="ne-image">

##### 操作元件（组合逻辑元件）
+ 操作元件没有存储功能
+ 组合电路不受时钟信号的控制

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778415611446-21fc2105-cdf0-487f-86fe-4c6b8b835cf0.png" width="590" title="" crop="0,0,1,1" id="u7fe7d8c3" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778415694080-cb27cf3e-c384-4bcf-858f-8db5f117c7e0.png" width="496" title="" crop="0,0,1,1" id="u9ca3ad6b" class="ne-image">

##### 存储元件（时序逻辑元件）
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778415811023-22bce202-0cb0-458d-bcf0-c9485d68a9d8.png" width="648.5" title="" crop="0,0,1,1" id="ud2120dea" class="ne-image">

#### 单总线数据通路
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778417897914-d9b1c79b-9156-4814-b9ae-98fd3fd9a977.png" width="821.5" title="" crop="0,0,1,1" id="ufc3f45b1" class="ne-image">

##### MAR MDR
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778418001626-677e3c15-7986-4474-a9fc-e631acb27e32.png" width="415" title="" crop="0,0,1,1" id="u48df3dd2" class="ne-image">

##### 寄存器组
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778418239328-1cde653e-d0d8-40d7-88ef-53aacb8e2703.png" width="841" title="" crop="0,0,1,1" id="u4bd9ea3c" class="ne-image">

##### ALU
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778419763613-4f528cb9-5886-4fa3-b0a4-99f1bc621bd7.png" width="847" title="" crop="0,0,1,1" id="ude62c2dc" class="ne-image">

数据通路：把PC地址读到MAR里面，根据MAR的指示到主存中寻找这个指令，把指令放到MAR中，最后放到IR中

单总线数据通路

### 微程序
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778633862203-098f4b69-f676-4f24-b8ab-f67cb4006e83.png" width="553" title="" crop="0,0,1,1" id="u78b2191e" class="ne-image">

#### 微程序
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778634080819-efa9cf8e-84d4-46aa-8704-07323984818c.png" width="693" title="" crop="0,0,1,1" id="uc3b8fd74" class="ne-image">

##### 基本概念
+ 微地址：存放微指令的CM的单元地址
+ 微指令：
+ 微操作码：发出操作信号
+ 微地址码：下一条要执行微指令的地址
+ 控制存储器CM：控制器内部存放微程序
+ 微地址寄存器CMAR：存放微指令地址
+ 微指令寄存器：存放

微指令<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778634265999-4e0833b6-0b55-4717-a644-52c780f39aba.png" width="648" title="" crop="0,0,1,1" id="u4e743e4b" class="ne-image">

##### 控制器的组成
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778634836811-49e33a2e-0735-4b93-9821-324083016510.png" width="797.5" title="" crop="0,0,1,1" id="u065fa9f1" class="ne-image">

##### 控制器的工作过程
根据机器指令<font style="color:#DF2A3F;">操作码</font>字段,找到微指令并执行

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778634871476-5704edad-f849-4a57-8400-a8a5935a0dc0.png" width="848.5" title="" crop="0,0,1,1" id="u94b7703a" class="ne-image">

#### 编码方式
问题：存在MDR里面的微指令，是如何根据操作码部分去发出操作信号的?

##### 直接编码
划分为多个位，每一位代表一个微命令，一个微命令控制一个微操作

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778719642795-9b4ff7cb-bb48-4d2f-87a7-e0cb8977c30f.png" width="596.5" title="" crop="0,0,1,1" id="u0a9ef555" class="ne-image">

##### 字段直接编码
划分为<font style="color:#DF2A3F;">多个字段</font>，每个字段代表一个微命令

互斥的微命令在一个字段

字段留出一个编码不表示含义

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778719690484-b02eed8f-6314-4d2a-9b31-232f75e8755c.png" width="620" title="" crop="0,0,1,1" id="uf1176d58" class="ne-image">

##### 字段间接编码
微指令格式

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778719795720-3c73c90e-0acd-4d60-967e-626f5ff4165c.png" width="647" title="" crop="0,0,1,1" id="u699fb30b" class="ne-image">

#### 微指令格式
##### 水平型微指令
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1778719882754-80b736f4-f784-444b-b324-d92ea3938d72.png" width="497.5" title="" crop="0,0,1,1" id="u941d62bc" class="ne-image">



## 总线
### 主从设备
主设备：能发起总线请求，控制总线传输的设备

从设备：响应主设备请求的设备，被主设备访问

### 片内总线
### 系统总线
#### 数据总线
+ 双向传输
+ 位数与机器字长，存储字长有关

#### 地址总线
+ 指出数据在主存中的地址
+ 单向传输，由<font style="color:#DF2A3F;">CPU发出</font>

#### 控制总线
+ 用来发出控制信号
+ 是双向的

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1779620952737-f0817c6e-fbbe-4f8a-868e-cefc890bd079.png" width="895" title="" crop="0,0,1,1" id="ub85284d4" class="ne-image">

### 总线的结构
#### 单总线结构
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1779621118066-ff2052b9-e373-494e-903a-d39ac0a48912.png" width="583" title="" crop="0,0,1,1" id="udb0d71f8" class="ne-image">

#### 双总线结构
+ 主存总线
+ IO总线

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1779621201348-0fe68d58-ecf9-475f-a1bb-827953a83497.png" width="582" title="" crop="0,0,1,1" id="u7c9f1189" class="ne-image">

#### 三总线结构
+ 主存总线：主存和CPU传输信息
+ IO总线：CPU跟和O设备传输信息
+ DMA总线：让主存直接和IO设备进行交互
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1779621685626-fe2ea9d8-c51f-492d-8163-e02d9df85b12.png" width="610" title="" crop="0,0,1,1" id="ua758b496" class="ne-image">

### 总线性能指标
+ 总线宽度：一次能传输的数据位数，或字节数
+ 总线带宽：单位时间能传输的数据总量 总线宽度*（总线时钟频率/N）
+ 总线时钟频率：总线工作的节奏
+ 总线周期 = N * 时钟周期
+ 总线周期：完成一次操作的用时
+ 时钟周期：计算机基本单位，物理层的最小刻度

## 异常和中断处理
### 异常和中断
#### 内部异常
+ 处理器内部异常引起的意外事件

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1779628943233-8b9d1ab2-02b9-477d-8093-50b5af6f321f.png" width="1015.5" title="" crop="0,0,1,1" id="ucaf48723" class="ne-image">

#### 外部中断
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1779629062444-3882fca5-29b2-4adc-a193-5502c833e592.png" width="409.5" title="" crop="0,0,1,1" id="ud3a5336f" class="ne-image">

### 异常的处理过程
#### 保护断点和程序状态
+ 故障的断点通常是发生故障<font style="color:#DF2A3F;">当前指令</font>的地址
+ <font style="color:#DF2A3F;">自陷断点</font>是<font style="color:#DF2A3F;">下一条</font>指令的地址
+ <font style="color:#DF2A3F;">外部中断</font>的断点也是下一条指令的地址
+ 中断处理的时间点：指令周期里面的<font style="color:#DF2A3F;">中断周期</font>，也就是一条<font style="color:#DF2A3F;">指令执行完</font>的时候
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1779630673984-d297d470-817a-4da1-9dad-bcd4932e63b1.png" width="635.5" title="" crop="0,0,1,1" id="ub238b164" class="ne-image">

