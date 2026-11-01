---
title: 计算机网络原理
date: 2026-10-30
description: 计算机网络原理笔记：网络概述与组成、物理层、数据链路层、网络层、运输层、应用层的分层体系与核心协议
---
# 计算机网络原理
## 计算机网络概述
### 计算机网络的组成
<font style="color:#DF2A3F;">边缘部分</font>：由连在互连网上的主机组成，可以互相通信

+ 通信：指的是<font style="color:#DF2A3F;">进程</font>间在通信
1. C-S方式：双方应用进程在通信
2. P2P方式：对等关系的用户之间通信

<font style="color:#DF2A3F;">核心部分</font>：网络，路由器

### 三种交换方式
+ 电路交换
+ 报文交换
+ 分组交换

### 性能指标
#### 速率
+ 数据的传输速率，也称比特率，单位：bit/s
+ K=10<sup>3</sup>   M=10<sup>6</sup>   G=10<sup>9</sup>

#### 带宽
单位时间内信道能通过的<font style="color:#DF2A3F;">最高数据率</font>

#### 吞吐量
单位时间内的数据通过量

#### 时延
##### 发送时延
+ <font style="color:#1DC0C9;">主机</font>或<font style="color:#1DC0C9;">路由器</font><font style="color:#DF2A3F;">发送数据帧</font>所需要的时间
+ 从<font style="color:#DF2A3F;">发送第一个</font>比特开始，到最后一个比特<font style="color:#DF2A3F;">发送完</font>所需要的时间
+ 发送时延 = 数据帧长度 / 发送速率

##### 传播时延
+ 电磁波在<font style="color:#DF2A3F;">信道</font>中传播一定的距离需要花费的时间
+ 传播时延 = 信道长度 / 电磁波在信道中的传播速率

##### 处理时延
##### 排队时延
#### 时延带宽积
+ 传播时延 * 带宽
+ 代表了一个链路的体积 表示这样的链路能容纳多少个比特

#### 往返时间RTT
+ 双向交互一次所需要的时间
+ 发送时间 = 数据长度 / 发送速率
+ 有效数据率 = 数据长度 / （发送时间 + RTT）

<img src="https://cdn.nlark.com/yuque/0/2026/jpeg/63727762/1780560966493-4161372f-1e67-48fc-8b70-a91c03634831.jpeg" width="585" title="" crop="0,0,1,1" id="uf078da66" class="ne-image">

## 物理层
### 物理层特性
物理层考虑的是如何在传输媒体上<font style="color:#DF2A3F;">传输比特流</font>。

1. 机械特性
2. 电气特性
3. 功能特性
4. 过程特性

### 数据通信系统的模型
一个数据通信系统可划分为三大部分：源系统，传输系统，目的系统

#### 源系统
+ 源点：产生要传输的数据（如比特流）
+ 发送器：源点产生的数据通过<font style="color:#DF2A3F;">发送器编码</font>后，才能在传输系统上进行传输
+ 接收器：<font style="color:#DF2A3F;">接收</font>传输系统传来的信号，并<font style="color:#DF2A3F;">转换成</font>能被目的设备处理的信息
+ 终点：从接收器获取信息，并输出

通信的目的：传送消息

数据：运送消息的实体

信号：数据的电磁表现

### 信道相关的基本概念
#### 信道
表示向某一个方向传送信息的媒体

从通信双方<font style="color:#DF2A3F;">信息交互</font>的方式来看，有以下三种基本方式

#### 单向通信
#### 双向交替通信
双方都能发送信息，但不能同时发送

#### 双向同时通信
双方可以同时发送和接收信息

#### 基带调制
不归零制

归零制

曼彻斯特编码

差分曼彻斯特

#### 带通调制
调幅：0无载波 1有载波

调频：频率密集/稀疏

调相：初始相位的变化

### 信道的极限容量
码元传输速率/波特率：单位时间内传输的码元数

码元：信息传输的最小单元，一个码元可携带一个或多个比特

二进制码元：一个二进制数字0/1就是一个码元

四进制码元：两个二进制数字是一个码元

信息传输速率/比特率：单位时间内传输的比特数

#### 信道能通过的频率范围
+ 码间串扰：因为信道的频率范围问题，造成接收方收到每一个码元的时间界限不再明确

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780531190869-6467e568-92c9-4d5e-ab1c-78260270c444.png" width="808.5" title="" crop="0,0,1,1" id="ue1ae5f27" class="ne-image">

+ 奈氏准则：码元传输速率（波特率）是有上限的，如果超过了这个上限，就会出现严重的码间串扰问题。使接收端无法识别任何码元

理想低通信道下的极限数据传输速率（比特率） = <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780531556297-8a8e744e-61c4-4b31-ab72-c95b9ee4b0eb.png" width="268.5" title="" crop="0,0,1,1" id="ub584e443" class="ne-image">

+ 带宽为W的的低通信道中，码元传输的最高速率是<font style="color:#DF2A3F;">2W</font>（码元/s）
+ W的单位为赫兹（HZ）

#### 信噪比
噪声随机产生于电子设备，但是噪声的影响是<font style="color:#DF2A3F;">相对</font>的，所以<font style="color:#DF2A3F;">信噪比</font>很重要，记作S/N，用分贝（db）作为单位

+ 信噪比（db）=<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780531974457-30f1d3f6-3275-4533-9354-1aaad706cfed.png" width="215.5" title="" crop="0,0,1,1" id="u415fcca3" class="ne-image">
+ 注意拿到的信噪比（ndb 分贝值）不能直接用，要代入公式上面里面求
+ <font style="color:#DF2A3F;">香农公式</font>：信道极限信息传输速率<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780532068174-c9e6c8e3-552f-4eac-bddb-7f2b8b6614d7.png" width="228" title="" crop="0,0,1,1" id="u0c666561" class="ne-image">

### 信道复用技术
#### 频分复用
将总频带划分为多个子频带，每个子频带作为一个子信道进行通信

#### 时分复用
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780533144026-aaf82dc7-71de-44f5-ab93-3cdb4c794f87.png" width="796.5" title="" crop="0,0,1,1" id="u13bc95a9" class="ne-image">

#### 统计时分复用
#### 波分复用
在光纤中传输不同波长的波信号

#### 码分复用CDM
也叫码分多址CDMA，每一个比特时间再划分为m个短间隔，称码片。

假设m = 8，使用CDMA的每一个站被指派一个唯一的m bit码片序列

一个站如果要发送比特1，就发送自己的码片序列；如果要发送0，就发送码片序列的二进制反码

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780533841003-66194d33-cba1-4ed9-bad1-7259961ea1ac.png" width="768.5" title="" crop="0,0,1,1" id="u3558eccc" class="ne-image">

+ 按习惯来说，会把1写成+1，0写成-1
+ 每个码片序列不相同且相互<font style="color:#DF2A3F;">正交</font>
+ 正交：两组码片序列，每个比特相乘后相加，结果除以8（就是m），若结果为0则正交
+ 任何一个组和自己相乘后相加 除以m必须是1，和自己反码的规格化内积是-1

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780534256982-5b17bc7a-e7c9-4896-9a3a-f78d3bf305cd.png" width="817" title="" crop="0,0,1,1" id="ub38b57a4" class="ne-image">

+ 最后收到的码片序列，是多个序列叠加的结果

### 物理层的传输媒体和设备
#### 传输媒体
##### 双绞线
两根互相绝缘的铜导线并排放在一起

##### 同轴电缆
##### 光缆
##### 非引导型传输媒体
#### 设备
##### 中继器
中继器的主要功能是整形，放大并转发信号，消除信号经过电缆后的失真和衰减，让信号的波形和强度达到所需的要求

##### 集线器
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780755387561-c099dedf-1629-42fe-91f2-b95229a60ddd.png" width="816" title="" crop="0,0,1,1" id="ufa4f7971" class="ne-image">

冲突域：冲突指的是两个或者多个设备同时在同一传输介质发送数据的时候，数据会碰撞导致数据损坏

“域”指的是网络中可能发生冲突的范围。一个冲突域内的所有设备如果<font style="color:#DF2A3F;">同时发送</font>数据，会导致冲突

集线器无法分割冲突域，集线器的所有端口<font style="color:#DF2A3F;">属于一个冲突域</font>

在题目中，若有一个集线器连接多个端口，问有几个冲突域？ -> 只有<font style="color:#DF2A3F;">一个</font>

### 题目2
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780535785981-7cf18780-8a70-4bde-bb4d-22d53ee44479.png" width="1743" title="" crop="0,0,1,1" id="u41995748" class="ne-image">

+ 用最后码片序列分别与ABCD进行规格化内积
+ 若得到结果是1 则该站发送1
+ 若得到结果是-1 则该站发送0

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780537451692-aa056a83-f064-4212-a220-4ca9f5d53a44.png" width="1236.5" title="" crop="0,0,1,1" id="u7ae774a5" class="ne-image">

+ 数据率是 码元速率 * 每个码元携带的比特数
+ 每个码元携带的比特数：log<sub>2</sub> 状态数 -> log<sub>2</sub> 2<sup>4</sup> -> 一个码元携带的比特数为4

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780537915554-d30555ba-8873-464d-a23b-d4a219f13457.png" width="1237" title="" crop="0,0,1,1" id="u9159c9f0" class="ne-image">

+ 香农公式 已知W C 然后求出 S/N 为比值
+ 代入另一个公式求分贝

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780542203512-e485de41-86d6-4502-9841-535e306bb18c.png" width="806.5" title="" crop="0,0,1,1" id="u09d26d43" class="ne-image">

20/0.7 算出工作距离

## 数据链路层
### 概述
#### 封装成帧
在一段数据的前后添加首部尾部，构成一个帧

有什么用 -> 接收方在收到物理层上交的比特流后，就能根据标记，从收到的比特流中<font style="color:#DF2A3F;">识别一个帧的开始和结束</font>

首部和尾部的一个重要作用：<font style="color:#DF2A3F;">帧定界</font>

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780562885611-62b1fede-f8ad-4078-a014-ec7ed05997a6.png" width="822" title="" crop="0,0,1,1" id="ubdf080de" class="ne-image">

SOH：在最前面表示帧的首部开始

EOT：帧的最后面表示帧的结束

字符计数法

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780563409677-b614f527-5086-47c6-ba89-0ce288d4e93d.png" width="821" title="" crop="0,0,1,1" id="ub1999923" class="ne-image">

零比特填充法

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780563620196-f6a3106f-6b34-44f0-ab2c-0e4d2920cf0e.png" width="694" title="" crop="0,0,1,1" id="ua942f293" class="ne-image">

#### 透明传输
传输时，如果要传输的数据中恰好含有SOH或者EOT的数据，那还能正确传输吗？

某些有效数据无故被丢掉 -> 这种行为阻碍了透明传输

解决方法 -> 引入转义字符 ESC

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780563955820-690240f1-8164-42a0-b545-186cac87b4ad.png" width="695" title="" crop="0,0,1,1" id="u7366e906" class="ne-image">

->保证了数据传输的正确性 实现透明传输

#### 差错检测
循环冗余码CRC

+ 双方约定好生成多项式 -> 构成比特串
+ 依据生成式的最高次项 在要发送的数据后面补0
+ 补0后的数据对比特串进行<font style="color:#DF2A3F;">模2除法，</font>得到最后的<font style="color:#DF2A3F;">余数 </font>-> FCS帧检验序列
1. 只要位数够就商1，位数不够商0
2. 计算的时候，进行异或操作，同0异1
+ 把最后的余数<font style="color:#DF2A3F;">加到</font>被除数（补0后的数据），得到要发送的数据
+ 那么接收方如何验证消息的正确与否呢？
1. 用接收到的数据与生成多项式比特串进行模2除法
2. 若得到的<font style="color:#DF2A3F;">余数为0</font>，则无差错

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780572467689-1f83ee14-7c6f-4a60-ac72-063c872406c8.png" width="658" title="" crop="0,0,1,1" id="u2e9c7520" class="ne-image">

##### 题目
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780577035415-cf31407f-2f2b-42cd-ba46-bb75b31223f2.png" width="728" title="" crop="0,0,1,1" id="uab1b53ca" class="ne-image">

### PPP协议
#### PPP协议的特点
用户通过ISP才能连接到互联网 -> PPP协议就是用户<font style="color:#DF2A3F;">计算机</font>与<font style="color:#DF2A3F;">ISP</font>之间的数据链路层通信协议

#### PPP协议的帧格式
+ 标志（Flag）字段：规定为0x7E，标志着一个帧的开始和结束，是PPP的帧定界符
+ 地址（Address）字段：规定为0xFF，预留
+ 控制（control）字段：规定为0x03，预留
+ 协议（protocol）字段：
+ 帧检验序列：CRC计算的出校验位

零比特填充法：遇到<font style="color:#DF2A3F;">5个连续</font>的1，填入一个0

字节填充法：当数据中出现7E 转换为7D 5E；出现7D，转换为7D 5D

接收 还原规则：遇到7D 若后面是5E 转换为7E；后面为5D，转换为7D

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780579082994-d75858a7-bfda-4a0b-9019-572deca8de8c.png" width="236" title="" crop="0,0,1,1" id="ub83a6872" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780577873563-6ff3a9cc-6da0-44ba-a8dd-a183aee67b6f.png" width="681" title="" crop="0,0,1,1" id="u24326319" class="ne-image">

#### 题目
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780577144632-52f9719d-0de0-4352-882b-5c747766c49f.png" width="719" title="" crop="0,0,1,1" id="u8b2140f6" class="ne-image">

### CSMA/CD协议
最初的以太网，是将许多计算机都连接到<font style="color:#DF2A3F;">一根总线上</font>，易于实现<font style="color:#DF2A3F;">广播通信</font>

当初认为这种方法简单可靠 -> 因为总线上没有<font style="color:#DF2A3F;">有源器件</font>

总线的<font style="color:#DF2A3F;">缺点</font>：若多个设备同时发送，会造成彼此干扰 -> 以太网采取了以下两种措施

1. 不建立连接就可以<font style="color:#DF2A3F;">直接发送</font>数据：
+ 对发送的数据帧不进行直接编号，也不要求对方发回确认；

因为局域网信道的质量很好，因信道质量产生差错的概率是很小

即以太网提供的服务尽<font style="color:#DF2A3F;">最大努力的交付</font>，即不可靠的交付

->对有差错帧是否需要重传由高层来决定 -> 重传时以太网并不知道是重传帧，而是当作新的数据帧来发送

在同一时间只能允许一台计算机发送数据，如何进行协调呢？-> 使用CSMA/CD协议

2. 以太网发送的数据采用曼彻斯特编码

-> 缺点：频带宽度比原始的基带信号增加了一倍（每秒传输的码元数加倍）

#### CSMA/CD协议
含义：载波监听多点接入/碰撞检测

载波监听（CS）：称为“边发送边监听”，也就是在发送帧之前先检查总线上是否有其他站点在发送数据

多点接入（MA）：多址接入，多个站连接在一条总线上，竞争使用总线

<font style="color:#DF2A3F;">碰撞检测</font>（CD）：碰撞检测，每一个正在发送帧的站都<font style="color:#DF2A3F;">边发送</font>，<font style="color:#DF2A3F;">边检测</font>是否发生<font style="color:#DF2A3F;">碰撞</font>，，一旦发生碰撞，立刻<font style="color:#DF2A3F;">停止发送</font>，退避<font style="color:#DF2A3F;">随机时间</font>后再发送。

就是让每一个站点在发送前先监听一下公用信道，发现信道空闲之后再发送，这样就可以降低冲突的概率

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780669289846-3517f27b-9c5b-4111-b2c2-c728aca78a3c.png" width="745.9090747419472" title="" crop="0,0,1,1" id="u5d8e2abb" class="ne-image">

先听后发 边听边发 冲突停发 随机重发

总线上单程<font style="color:#DF2A3F;">端到端传播时延</font>记为：τ（最早发生碰撞）

<font style="color:#DF2A3F;">争用期</font>（碰撞窗口）：2τ

争用期是发生碰撞的<font style="color:#DF2A3F;">最迟发生时间</font>，若在争用期内没检测到碰撞，才能肯定这次发送不会发生碰撞。

##### 最短帧长问题
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780708228023-fd7f057c-1acd-45c4-94ae-4f6edf896086.png" width="1075" title="" crop="0,0,1,1" id="u298d2e5a" class="ne-image">

最短帧长 = <font style="color:#DF2A3F;">2τ*数据传输速率</font>

为什么取最小帧长 -> 确保第一个帧发生碰撞且碰撞信号传回去后，最后一个帧还在发送

-> 确保帧一直在发送状态 只有在<font style="color:#DF2A3F;">发送状态</font>才会<font style="color:#DF2A3F;">检测</font>碰撞

-> 以太网最小帧长64B

##### 指数退避算法
有什么用？ -> 停止发送的站，退避一个随机时间后再发送

1. 基本退避时间为争用期2τ，争用期时间51.2μs，在以太网是发送64B（512b）所需时间51.2μs
2. 从整数集合[0，1，.....,2<sup>k</sup> -1]中随机取出一个数，记为r。重传应推后的时间是是<font style="color:#DF2A3F;">r倍</font>的争用期（2τr）

参数K计算方法： k = Min[重传次数，10] 即重传次数和10里面比较小的值

3. 若重传16次还不成功，则丢弃该帧，向高层报告。



#### 题目<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780713354445-42d469d4-b129-45b1-a232-d38aff7f0e80.png" width="1485" title="" crop="0,0,1,1" id="ued5a7311" class="ne-image">
+ 传统以太网采用曼彻斯特编码
+ -> 一个比特数据包含两个码元
+ 码元传输速率 = 数据率 * 每比特需要码元数

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780713333080-46ba92d1-ef34-48ca-a45f-3093286a63b4.png" width="695.5" title="" crop="0,0,1,1" id="ubd9cb9ef" class="ne-image">

+ 最短帧长 = 2τ *数据率
+ τ = 端到端传播时延 = 信道长度 / 信号传播速率

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780714031722-7eb26b00-a8b0-4021-8d76-a29583bc11b6.png" width="685.5" title="" crop="0,0,1,1" id="u3ac39f1e" class="ne-image">

10Mbit/s 以太网：等待时间 = r * 51.2μs

100Mbit/s ：争用期依然表示为发送 512bit的时间 512bit / 数据传输速率

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780714738995-7c9a10fb-c895-4a57-8eb1-8bbe8db56796.png" width="439.5" title="" crop="0,0,1,1" id="u7df8fde7" class="ne-image">

### 局域网与广域网
#### 局域网的数据链路层
##### 局域网与广域网
局域网最主要的特点：网络为一个单位所有，且地理范围和站点数目均有限

按照网络拓扑进行分类

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780735758509-7c160db8-f6ae-45e4-b914-659737601b56.png" width="1015" title="" crop="0,0,1,1" id="ud6464a01" class="ne-image">

##### 以太网的两个标准
为了使数据链路层能够更好地适应不同局域网的标准，把其划分成两个子层

-> 逻辑链路控制（现在没有了）（LLC），媒体接入控制MAC

与接入到传输媒体有关的内容都放在<font style="color:#DF2A3F;">MAC</font>子层

##### 适配器的作用
计算机与外界局域网的连接是通过适配器 -> 俗称<font style="color:#DF2A3F;">网卡</font>

适配器上面装有处理器和存储器（RAM ROM）

适配器与计算机之间的通信是通过IO总线<font style="color:#DF2A3F;">并行</font>

适配器与局域网之间通信是电缆<font style="color:#DF2A3F;">串行</font>

适配器接收发送帧时，不使用计算机的CPU

+ 收到错的帧，直接丢弃；收到正确的帧时，会用中断来通知计算机。
+ 发送IP数据报时，协议站把IP数据报向下交给适配器，组装成帧后发送到局域网

<font style="color:#DF2A3F;">MAC地址</font>放在适配器中的<font style="color:#DF2A3F;">ROM</font>里

IP地址放在计算机的存储器中

#### 以太网的MAC层
##### MAC层的硬件地址
硬件地址又称物理地址或MAC地址 固化在适配器的ROM中

面对并非发往本地的MAC帧，网络适配器直接做丢弃处理

发往本站的帧分为以下三种：

1. 单播帧（一对一）：收到的帧MAC地址与本站MAC地址相同
2. 广播帧（一对全体）：发送给局域网上所有站点的帧
3. 多播帧（一对多）：发送给局域网上一部分站点

##### MAC帧的格式
常用的是V2标准MAC帧格式

目的地址（6B）：目的站的MAC地址

源地址：源站的MAC地址

类型字段（2B）：用来标志上一层用的是什么协议，以便能够把收到的MAC帧的数据上交给上一层的这个协议

数据字段：最小长度46B

帧检验序列（4B）：使用<font style="color:#DF2A3F;">CRC检验</font>整个MAC帧从目的地址开始到FCS为止的五个字段，不包括前导码

前导码：第一个字段是7个字节的前同步码，第二个字段是帧开始定界符

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780747921184-5838c7e0-5358-40af-92f4-49b28f4e7f3a.png" width="604.5" title="" crop="0,0,1,1" id="ub2e698c9" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780748015992-a28b8945-09a0-4d2a-b4af-1e5b6ea977a2.png" width="819" title="" crop="0,0,1,1" id="u673d5ef7" class="ne-image">

### 扩展的以太网
#### 在物理层扩展以太网
现在拓展主机和集线器之间的距离的一种简单方法是使用光纤 -> 可以使主机和几公里以外的集线器连接起来

如果使用多个集线器，就可以连接成能覆盖更大范围的以太网。

例如，一个学院的三个系各有一个以太网，可通过一个主干集线器连接起来，成为一个更大的以太网。

但是带来了一些缺点：

1. 在连起来之前，每一个系的以太网都是一个独立的<font style="color:#DF2A3F;">碰撞域，</font>即在任一时刻，只能有同一个站在发送数据。若每个站最大吞吐量为10M bit/s,则三个系最大吞吐量为30Mbit/s
2. 但是连接起来之后，变成了一个大的碰撞域，此时最大吞吐量还是10Mbit/s
3. 如果一个系使用10Mbit/s，另外两个使用10/100Mbit/s ，那么用集线器连起来之后，大家都只能工作在10Mbit/s的速率。

#### 以太网交换机的特点
早期使用：网桥 -> 一次只能分析转发一个帧

以太网交换机实质上就是<font style="color:#DF2A3F;">多端口的网桥</font>，通常有十几个或更多端口

每个端口都会与单台主机相连，且一般工作在<font style="color:#DF2A3F;">全双工</font>方式

具有并行性，能同时连接多个端口，使多对主机同时通信

相互通信的主机都<font style="color:#DF2A3F;">独占传输媒体</font>，<font style="color:#DF2A3F;">无碰撞</font>地传输数据

每个端口和连接到端口的主机构成了一个碰撞域，若有N个端口，碰撞域有N

#### 以太网交换机的自学习功能
最开始，交换表是空的

假设A向B发送一帧，从接口1进入交换机

交换机收到后，查找交换表，同时把A在1口的信息写入交换表（帧的源地址是A，从接口1发进来）（A，1）

-> 交换表中没有查到应该转发给哪个接口，所以向除了1口的其余接口广播（泛洪）

-> C和D发现目的MAC地址并不是自己，于是把该帧抛弃。只有B收下这个目的地址正确的帧

此时交换表中有项目（A，1），以后只要<font style="color:#DF2A3F;">目的地址</font>是<font style="color:#DF2A3F;">A</font>，就应该把帧从<font style="color:#DF2A3F;">1口</font>转发出去

-> 因为既然A发出的帧从1口进入，那发给A的从1口发出肯定能到达A



为了增加网络可靠性，使用交换机组网时，往往会增加一些冗余的链路，这种情况下，自学习的过程可能导致帧无限地兜圈子。

-> 为了解决这个问题，制定了一个生成树协议STP，不改变网络的实际拓扑，逻辑上切断某些链路，使得一台主机到所有其他主机的路径是<font style="color:#DF2A3F;">无环路的树状结构</font>。

### 虚拟局域网VLAN
当一个以太网的计算机太多的时候，会带来广播风暴和共享局域网带来的安全问题

-> 建立虚拟局域网 把一个大的局域网 分割成较小的局域网

VLAN是由一些局域网网段构成的与物理位置无关的逻辑组

每一个VLAN的帧都有一个明确的标识符，指明发送这个帧的计算机属于哪一个VLAN

虚拟局域网是给用户提供的一种服务，并不是一种新型局域网

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780833732539-dd3600a3-db8b-415e-8cc1-3ed9d47f659f.png" width="696.5" title="" crop="0,0,1,1" id="u07d8d953" class="ne-image">

#### 题目
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780802195401-c2dd1ebb-8a20-4c13-98e2-7c5305ea24f5.png" width="643.5" title="" crop="0,0,1,1" id="u924477c0" class="ne-image">

使用以太网交换机，每个端口都是一个冲突域，独占带宽

9台主机 + 两台服务器能产生的最大吞吐量

-> （9+2）*100Mbit/s = 1100Mbit/s

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780802138442-e785d638-d3b5-49d8-8572-1e4cb9b92eca.png" width="679.5" title="" crop="0,0,1,1" id="ua9795c40" class="ne-image">

交换表的状态：开始为空 记录了 A,1，向所有端口转发帧（泛洪）

第二次找到了D端口，记录下D，4，因为记下了A的地址，所以直接向A对应的端口号转发（单播转发）

## 第四章 网络层
### 网络层概述
#### 网络层提供的两种服务
设计思路：网络层设计得尽量<font style="color:#DF2A3F;">简单</font>，向上层只提供简单灵活的，无连接的，尽最大努力交付IP<font style="color:#DF2A3F;">数据报（IP分组）</font>服务

##### 虚电路
计算机进行通信时，先建立好连接（虚电路），分组只会沿着这个路径转发

##### 数据报
分组独立发送，根据路由器里面的转发表，进行路由选择，而不去建立提前的连接

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780834890080-edd17332-1cf7-4a47-aa77-7649c4a9b234.png" width="660" title="" crop="0,0,1,1" id="ud36857ca" class="ne-image">

#### 网络层的两个层面
不同网络中的两个主机通信，要经过若干个路由器转发分组，分组查找路由器的转发表进行转发

-> 转发表是由路由表导出的  ->路由表是由互联网中许多的路由器，按照共同的路由选择协议，通过许多次的相互交换路由信息而产生的。

路由器之间传送的信息有两大类：

1.  转发源主机和目的主机之间所传送的数据
2. 传送路由信息

##### 数据层面
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780835915162-38c410e4-fa04-4577-86b8-b96a9553e02a.png" width="805.5" title="" crop="0,0,1,1" id="ubc77917a" class="ne-image">

##### 控制层面
### 网际协议IP
#### 虚拟互连网络
统一所有网络标准成为同一类型是不可能完成的任务 没有一种单一的网络能适应所有用户的需求

->让计算机网络都使用相同的<font style="color:#DF2A3F;">网际协议IP </font>构成一个虚拟互联网络

互联网可以由多种异构网络互联组成

分组在传输途中，每一次<font style="color:#DF2A3F;">转发</font>称为一“跳”，路由器转发分组也常使用“下一跳”的说法

->每一跳的两个节点必定直接连在同一个网络上

直接交付：两主机在同一网络上，不用经过路由器

间接交付：两主机不在同一个网络，要把IP数据报经过路由器的转发

#### IP地址
##### IP地址表示方法
+ IP地址就是给每一个主机的每一个接口，分配一个唯一的<font style="color:#DF2A3F;">32位（二进制）</font>标识符
+ 点分十进制记法：每八位转换成十进制数，并且用小数点隔开
+ 采用两级结构：<font style="color:#DF2A3F;">网络号</font> + <font style="color:#DF2A3F;">主机号</font>
1. 网络号：标记主机或路由器连接到的网络，一个网络号在互联网范围内必须是唯一的
2. 主机号：标志该主机或路由器
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780316451516-cc5d822b-b6e0-4cf1-9e89-b54dedee3460.png" width="510" title="" crop="0,0,1,1" id="u1dce232f" class="ne-image">
+ 前n位为网络号，那么怎么知道n的位数为多少？

##### 分类的IP地址
IP地址分为ABCDE类，每一类下面有很多个IP地址

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780317669766-228a4903-e990-4cba-8462-8ea92dd17e71.png" width="672" title="" crop="0,0,1,1" id="uba659a81" class="ne-image">

A类：第一位是0，网络号占8位 

+ 网络号范围：0..0~01..1 -> 1~126
+ 可指派的<font style="color:#DF2A3F;">个数</font>：2<sup>7</sup>-2
+  <font style="color:#DF2A3F;">网络号</font>为什么不能取全0 和 全1？
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780318082955-45c9e0a1-6508-453a-b232-8cbe55371b28.png" width="318.5" title="" crop="0,0,1,1" id="ua04b0105" class="ne-image">
+ 主机号占后24位
+ <font style="color:#DF2A3F;">主机号</font>为什么不能取全0 全1？
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780363094625-98d00717-b9c8-4d7e-bf1d-d827a61a454f.png" width="751.5" title="" crop="0,0,1,1" id="u2840cbd7" class="ne-image">
+ 最大主机个数：2<sup>24</sup>-2

B类：前两位是10，网络号一共占16位

+ 网络号范围：128.0 ~ 191.255（无限制）
+ 可指派个数：2<sup>14</sup>
+ 主机号
1. 全0表示本网络地址
2. 全1表示广播地址
3. 每一个B类地址最大主机数：2<sup>16</sup>-2

C类：前3位固定是110，网络号占前24位

+ 可指派网络号总数：2<sup>24</sup>
+ 每一个C类地址的最大主机数：2<sup>8</sup>-2
+ 主机号全0 全1不能用

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780365277088-1e672989-c35e-46ca-b0ef-2e38ce9fff1f.png" width="750" title="" crop="0,0,1,1" id="u545a7348" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780365328131-6e2a2cd0-21cc-4835-8add-039b39a3c776.png" width="755.5" title="" crop="0,0,1,1" id="ucceb84b7" class="ne-image">

##### 无分类编址CIDR
全名叫做无分类域间路由选择

###### 网络前缀
把网络号改为叫做网络前缀

网络前缀的位数是不固定的,如何去确定网络前缀?

采用斜线记法:

+ 128.14.35.7/20 -> 网络前缀占20位
+ 斜线后面是<font style="color:#DF2A3F;">网络前缀</font>所占的位数

###### 地址块
CIDR把所有<font style="color:#DF2A3F;">网络前缀都相同</font>的所有连续的IP地址组成一个CIDR地址块

一个CIDR地址块包含的<font style="color:#DF2A3F;">IP地址数目</font>，取决于网络前缀的<font style="color:#DF2A3F;">位数</font>

只要知道地址块里任意一个IP地址，就可以知道这个地址块的<font style="color:#DF2A3F;">最小地址</font>和<font style="color:#DF2A3F;">最大地址</font>

对于主机号：全0全1不指派

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780368282348-d2901a67-fe37-473e-b918-8eebc85972c0.png" width="707" title="" crop="0,0,1,1" id="udb30ae6b" class="ne-image">

###### 地址掩码（子网掩码）
计算机不会看到斜线记法，那么它如何去确定网络前缀位数呢？ -> 地址掩码

地址掩码：网络前缀的<font style="color:#DF2A3F;">位数</font>就是掩码中1的<font style="color:#DF2A3F;">个数（高位前n位）</font>

怎么根据IP地址和地址掩码确定<font style="color:#DF2A3F;">网络地址</font>？-> 两者进行按位与运算

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780368767407-5ae8afed-9fa8-4968-bddb-cab39287ec61.png" width="822.5" title="" crop="0,0,1,1" id="u91b4c612" class="ne-image">

做题：若给出地址掩码，直接写成二进制形式，观察高位有多少个0就可以确定网络前缀位数了

###### 子网划分
一个CIDR地址块想要再划分为多个小的地址块，称为子网划分

###### 定长子网划分
+ 划分为两个子网时：
+ 网络号向主机号借一个比特，作为子网号，用来区分两个子网
+ 一个编码为0 一个编码为1

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780369517086-4518a799-8c6f-4b9f-ab48-0468ff082680.png" width="769.5" title="" crop="0,0,1,1" id="ud06a7508" class="ne-image">

+ 划分出来的每一个子网，所占的子网位数相同，所占的主机位数也相同，称作定长子网划分

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780370170166-3ee7fea5-10a4-4ed5-bbb5-6e196a1724c4.png" width="695" title="" crop="0,0,1,1" id="u59f9e60d" class="ne-image">

还要检查一下划分出来的子网的能容纳的主机数，是否满足条件

划分后注意斜线记法的位数也要变

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780370532694-c3d402ca-f854-4e97-bdda-a9caf11e6f13.png" width="773" title="" crop="0,0,1,1" id="u073d6cbc" class="ne-image">

###### 变长子网划分
+ 为什么？ ->解决IP地址浪费严重的问题
+ 从一个网络里面的主机数出发
+ 最大主机数 2<sup>n</sup>-2 = (需要的IP地址数X) -> 反推出能满足条件的主机号位数n -> 剩下的位就是子网号
+ 子网号之间<font style="color:#DF2A3F;">不能互为前缀 </font>（0与01互为前缀）
+ 对于子网掩码：网络前缀 + 子网号 都是全1
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780399907708-e3c40f6a-7abd-4f2b-8542-9339abe9c4e1.png" width="1001" title="" crop="0,0,1,1" id="u36032eea" class="ne-image">
+ 为什么？-> 最长前缀匹配
+ 假设子网号用一样的前缀 转发自动转到更长的前缀，但有可能设备并不属于这个网络
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780923912882-aa78d917-3b2c-4698-a718-a45552dc9a51.png" width="1094" title="" crop="0,0,1,1" id="u23ebb08a" class="ne-image">

###### 路由聚合
一个大的CIDR地址块中往往包含很多小地址块，所以在路由器的转发表中就利用较大的一个CIDR地址块来代替许多较小的地址块，这种方法叫做路由聚合

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780404698235-14e4fa23-ae19-4d9b-8b48-2007cb37892f.png" width="1073" title="" crop="0,0,1,1" id="u0d4afeac" class="ne-image">

化成二进制后，直接比较不同的位数，并把掩码的位数更新

#### IP地址与MAC地址
IP地址：网络层和以上各层使用的地址，是一种逻辑地址

MAC地址：数据链路层使用的地址



<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780406009275-9485d352-cb74-4592-9b8a-3e599800ae47.png" width="561.5" title="" crop="0,0,1,1" id="ufbd7e945" class="ne-image">

假设IP地址是IP1的主机给IP2发数据：

+ 数据前面加上源地址，目的地址和一些其他信息
+ 将这些一起作为<font style="color:#DF2A3F;">IP数据报</font>封装到<font style="color:#DF2A3F;">数据链路层</font>
+ 数据链路层再给IP数据报加上源MAC地址和<font style="color:#DF2A3F;">目的</font>MAC地址（再次加上首部）
+ 这里的目的MAC地址指<font style="color:#DF2A3F;">下一步适配器</font>的MAC地址
+ 每交换一次，MAC源地址，目的地址都会发生改变，但是IP地址始终不变
+ 最后目的主机逐层往上拆开，得到数据
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780407370870-b3e9924a-2eb9-4c2a-a8f5-da429a55b7de.png" width="1050.5" title="" crop="0,0,1,1" id="u43d9f603" class="ne-image">

#### 地址解析协议ARP
在转发过程中，已经知道了一个机器的IP地址，如何得知它的MAC地址？ -> 地址解析协议ARP

ARP是什么？是一个<font style="color:#DF2A3F;">高速缓冲表</font>，存着IP地址到MAC地址的映射表

+ 当主机A要向<font style="color:#DF2A3F;">本局域网</font>上的主机B发送IP数据报时，就先在其ARP高速缓冲表中查看有无主机B的IP地址
+ -> 若有，直接把MAC地址作为目的地址写入MAC帧
+ -> 若没有，A会运行<font style="color:#DF2A3F;">ARP</font>协议，按照一定步骤找到MAC地址
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780885058066-9123fc60-6f69-4d61-81a1-ecf8d79be33b.png" width="652" title="" crop="0,0,1,1" id="udb284cc8" class="ne-image">
+ ARP请求是广播
+ ARP响应是单播
+ B也会把A的IP MAC地址写入自己的ARP高速缓冲 -> 减少网络上的通信量
+ ARP对每一个映射地址项目都设置生存时间，超过就删除

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780477439409-30e6c770-d717-4b53-afd2-df26e3c2febe.png" width="813" title="" crop="0,0,1,1" id="ub7deb527" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780477765606-34a6c355-36f4-490a-bf87-9961b61957d7.png" width="656" title="" crop="0,0,1,1" id="FPrnt" class="ne-image">

使用ARP协议的4种典型情况：

1. 发送方是主机（H1），要把IP数据报发到同一网络另一台主机（H2）；此时H1发送ARP请求（在局域网1中广播），找到目的主机H2的MAC地址
2. 主机H1，发送到另一台网络的另一台主机，发送方会通过ARP去解析路由器的MAC地址，路由器再去解析目的主机的MAC地址

#### IP数据报的格式
<font style="color:#DF2A3F;">固定</font>长度：20字节

最大传送单元MTU

->若数据报总长度超过规定的MTU值时，就必须进行分片处理

->以太网规定的MTU是1500字节

->进行分片时，总长度字段指每一个分片的<font style="color:#DF2A3F;">首部字段与数据字段</font>之和

片偏移:相对于用户数据字段的起点，以8B为偏移单位 出最后一个数据报片，每个分片<font style="color:#DF2A3F;">数据部分长度</font>一定是<font style="color:#DF2A3F;">8的整数倍</font>

#### 题目
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780839786726-c782bb6d-f980-4413-b568-209f24a3cb75.png" width="941" title="" crop="0,0,1,1" id="u47477c03" class="ne-image">

数据部分总长度：3200

分组的数据部分长度：1200 - 160 = 1040

分组后：1040 1040 1040 80（在传输的时候，每一个分组都要加上一个首部）

要传输的数据总数：3200 + 160*4 -> 数据总长+分组个数*首部长度

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780839803468-37df6ca3-a317-46fa-bd9b-907349b08693.png" width="389" title="" crop="0,0,1,1" id="uee30ebec" class="ne-image">

直接写开成二进制，观察最多能相同到哪一位

-> 再化为十进制 并更新掩码个数

### IP转发分组的过程
#### 基于终点的转发
分组在互联网上传送和转发是基于分组首部中的目的地址的 -> 称为<font style="color:#DF2A3F;">基于终点的转发</font>

<font style="color:#000000;">分组每到达一个路由器，路由器就根据分组中的终点查找转发表，得知下一跳的路由器</font>

<font style="color:#000000;">->路由器的转发表根据什么查出下一跳路由器呢？</font>

#### <font style="color:#000000;">->查找目的</font><font style="color:#DF2A3F;">网络前缀</font><font style="color:#000000;">，</font>再把分组在这个网络上直接交付目的主机
分组首部没有指明“下一跳路由器的IP地址”，那么待转发的分组怎样能够找到下一跳路由器呢？

->路由器收到一组分组，从转发表得到下一条路由器的IP地址后

->使用ARP协议，把下一跳路由器的IP地址转换成MAC地址

->把MAC地址放在MAC帧首部

查找转发表 -> 用ARP解析出IP地址对应的MAC地址 -> 把MAC地址写入帧首部->传输

#### 最长前缀匹配
如果一个分组在转发表中可以找到多个匹配的前缀，那么就应当选择<font style="color:#DF2A3F;">前缀最长</font>的一个作为匹配的前缀

-> 越长的前缀越<font style="color:#DF2A3F;">精准</font>

#### 主机路由与默认路由
##### 主机路由
直接把主机的IP地址写在转发表里面 网络前缀->a,b,c,d/32

直接看分组地址是否一致与网络前缀是否一致就行了

##### 默认路由
网络前缀 -> 0.0.0.0/0

不管分组的最终目的在哪里，都由指定的路由器R处理

-> 如果查遍了转发表都没找到，直接使用默认路由

#### 分组转发算法
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780925823404-fbd7af15-16fa-4eb5-ae92-a8de54b7122a.png" width="1063.5" title="" crop="0,0,1,1" id="u74ff1b0c" class="ne-image">

#### 题目
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780922003930-c23f7eb5-ee52-451e-a61c-b0373ebd17ad.png" width="356" title="" crop="0,0,1,1" id="u68c92274" class="ne-image"><img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780922024968-233b1032-3ec5-41f9-acd9-5fabd8f58331.png" width="346.5" title="" crop="0,0,1,1" id="ud2365386" class="ne-image">

从转发表第一行开始，把分组与网络前缀的掩码作与运算，如果得到的结果与网络前缀相同，则下一跳为对应的接口

如果不相同，则下一跳为默认网关

其实就是把分组写成十进制，与网络前缀对比一下 看看是否相同

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781153534869-d0381578-c9e4-463d-ac0a-fab7689777c0.png" width="637" title="" crop="0,0,1,1" id="u19b8d047" class="ne-image">

### 网际控制报文协议ICMP
为了更有效地转发IP数据报和提高交付成功的机会，在网际层使用了ICMP

ICMP是IP层的协议

ICMP报文作为<font style="color:#DF2A3F;">IP数据报</font>的<font style="color:#DF2A3F;">数据</font>，加上数据报的首部，组成IP数据报发送出去

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780974102111-4cc13b67-e694-4087-8262-207cdfbcb31a.png" width="633" title="" crop="0,0,1,1" id="u21f4f9e3" class="ne-image">

ICMP的数据部分 取决于报文类型

#### ICMP报文种类
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780978272992-b48055e3-082f-4f6d-9e0a-c8326bfcecad.png" width="317.5" title="" crop="0,0,1,1" id="u1d0cec6b" class="ne-image">

##### ICMP差错报告报文
###### 终点不可达
类型值为3

当路由器<font style="color:#DF2A3F;">不能交付数据报</font>时就向源点发送终点不可达报文

###### 时间超过
当路由器收到<font style="color:#DF2A3F;">生存时间（TTL）为0</font>的数据报时，除丢弃该数据报外，还要向源点发送时间超过报文

当终点在<font style="color:#DF2A3F;">预先规定的时间</font>内不能收到一个数据报的全部数据报片时，丢弃数据报片，发送时间超过报文

###### 参数问题
当路由器收到的数据报的首部中有的字段的<font style="color:#DF2A3F;">值不正确</font>时，丢弃数据报，向源点发送参数问题报文

###### 改变路由
找到了<font style="color:#DF2A3F;">更好的路由</font>，让主机知道下次应将数据报发送给另外的路由器



##### ICMP差错报告报文的组成
ICMP报文：8字节<font style="color:#DF2A3F;"> 前四字节</font>为统一的格式 <font style="color:#DF2A3F;">后四字节</font>的内容与ICMP的类型有关

再把需要进行差错报告的<font style="color:#DF2A3F;">IP数据报的首部</font>和<font style="color:#DF2A3F;">数据字段前八个字节</font>提取出来，作为ICMP报文的数据字段

再加上ICMP前8字节 就构成了ICMP差错报告报文

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780989965253-87c34458-57de-4a0b-a087-2fb8dbd69af4.png" width="377.5" title="" crop="0,0,1,1" id="ud17606f1" class="ne-image"><img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1780990138055-2e19882e-3db8-4815-8931-dc4f8b75cdd4.png" width="362.5" title="" crop="0,0,1,1" id="u98b11904" class="ne-image">

##### ICMP询问报文
###### 回送请求或回送回答
向一个特定的目的主机发出询问。收到此报文的主机必须给源主机发送ICMP回送回答报文

###### 时间戳请求或时间戳回答报文
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781003150778-edb52b2b-e90d-4458-81ea-087651afea2e.png" width="825" title="" crop="0,0,1,1" id="u4859d810" class="ne-image">

#### ICMP的应用
##### 分组网间探测PING
##### traceroute
### IPV6
2<sup>23</sup> 个IPV4地址 -> 不够用

-> 解决IP地址耗尽的根本措施就是采用更大地址空间的新版本的IP，即<font style="color:#DF2A3F;">IPV6</font>

#### IPV6的基本首部
IPV6数据报由两大部分组成 <font style="color:#DF2A3F;">基本首部 有效载荷</font>

有效载荷允许有零个或多个<font style="color:#DF2A3F;">扩展首部</font>，再后面是<font style="color:#DF2A3F;">数据部分</font>

##### <font style="color:#000000;">基本首部组成</font>
版本：占4位，指明了协议的版本，对IPV6，该字段是6

通信量类：占8位，这是为了区分不同的IPV6的类别或者优先级

流标号：占20位，所谓"流"就是网络上从<font style="color:#DF2A3F;">特定源点</font>到<font style="color:#DF2A3F;">特定终点</font>（单播或多播）的一系列<font style="color:#DF2A3F;">数据报</font>

有效载荷的长度：占16位，指明了IPV6数据报<font style="color:#DF2A3F;">除基本首部之外</font>的<font style="color:#DF2A3F;">字节数</font>（所有扩展首部算在有效载荷内），这个字段最大值是64KB。

下一个首部：占8位，相当于IPV4的协议字段或可选字段

+ 当没有扩展首部时，与IPV4的协议字段一样，它的值指出了基本首部后面的<font style="color:#DF2A3F;">数据</font>应该交付给<font style="color:#DF2A3F;">IP层上面</font>的哪一个<font style="color:#DF2A3F;">高层协议</font>
+ 当有扩展首部时，它的值就标识后面<font style="color:#DF2A3F;">第一个扩展首部</font>的<font style="color:#DF2A3F;">类型</font>

跳数限制：占8位，用来防止数据报在网络中无限制地存在

源地址：占128位，数据报发送端的IP地址

目的地址：占128位，数据报接收端的IP地址

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781007001189-6537b929-aeea-4603-856e-1fc34612a9ad.png" width="978.5" title="" crop="0,0,1,1" id="u69b16ce0" class="ne-image">

###### 六种扩展首部：
逐条选项

路由选择

分片

鉴别

封装安全有效载荷

目的站选项

每一个扩展首部都有若干个字段组成，长度各不相同，但所有的扩展首部的<font style="color:#DF2A3F;">第一个字段</font>都是8位的<font style="color:#DF2A3F;">下一个首部</font>字段，指出该扩展首部后面的扩展首部是什么

##### IPV4对比IPV6
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781007710205-dafcd3b8-160a-4d44-99a2-8102792e8fa2.png" width="1059" title="" crop="0,0,1,1" id="u3e1e370c" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781007723464-2ec6ea06-bfd2-41b4-bd3a-7075db655bd0.png" width="1044.5" title="" crop="0,0,1,1" id="u6756884b" class="ne-image">

##### IPV6的地址
一个IPV6数据报的目的地址可以是以下三种基本类型地址之一：

###### 单播
###### 多播
###### 任播
IPV6增加的一种类型，终点是一组计算机，但数据报只交付其中一个，但数据报只交付按照<font style="color:#DF2A3F;">路由算法</font>得出的<font style="color:#DF2A3F;">距离最近</font>的那一个

###### 冒号十六进制记法
每16位的值用十六进制表示，各值之间用冒号分隔

+ 允许把数字前面的0省略 000 -> 0
+ 0压缩：<font style="color:#DF2A3F;">一连串</font>的0可以不用写，而是用一对冒号 ：: 去代替 -> 但是<font style="color:#DF2A3F;">一个地址</font>只能用<font style="color:#DF2A3F;">一次</font>零压缩

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781008478121-915c72e2-cf3a-453a-90d0-ab92608fc263.png" width="838" title="" crop="0,0,1,1" id="u56763859" class="ne-image">

###### IPV6常用地址分配
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781008806859-be13a0d6-d816-4859-b171-dac09f02677c.png" width="745.5" title="" crop="0,0,1,1" id="u23d9c85b" class="ne-image">
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781012349490-d0ac071d-f6ad-417a-9463-57f508376e18.png" width="1036.5" title="" crop="0,0,1,1" id="u4a0a39ec" class="ne-image">
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781008846432-c2095970-1212-43f2-9793-6e88afed5e71.png" width="737.5" title="" crop="0,0,1,1" id="u9948b7da" class="ne-image">

#### 题目
+ <img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781009960210-8154a39c-71b0-4dc1-8477-1023aa737792.png" width="400.5" title="" crop="0,0,1,1" id="udbfe49a1" class="ne-image">

把一连串的0用::代替

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781009975063-47f2a12b-0909-4c0b-a573-b4d35303b1d8.png" width="349.5" title="" crop="0,0,1,1" id="ub4f555a7" class="ne-image">

+ 不够四位的在前面补0
+ 一共是8大位，把省略的0补上

#### IPV4向IPV6过渡
##### 双协议栈
使一部分主机或路由器同时装有IPV4和IPV6两种协议栈

双协议栈主机使用<font style="color:#DF2A3F;">DNS</font>查询目的主机采用哪一种地址，如果返回的是IPV4地址，则双协议栈的源主机使用IPV4地址

但是付出的代价太大，故建议使用隧道技术

##### 隧道技术
在IPV6数据报要进入IPV4网络时，把IPV6数据报<font style="color:#DF2A3F;">封装成为</font>IPV4数据报

那整个IPV6数据报就会变成IPV4数据报的<font style="color:#DF2A3F;">数据部分</font>

当IPV4数据报离开IPV4网络中的隧道时，再把数据部分交给主机的IPV6协议栈

关键：要把IPV4首部的协议字段的值设置为41

### 路由选择协议
#### 分层次的路由选择协议
可以把整个互联网划分为划分为许多较小的自治系统（AS）。自治系统AS是在单一技术管理下的许多网络，IP地址以及路由器；这些路由器使用同一种路由选择协议。

-> 每一个AS对其他AS表现出的是一个<font style="color:#DF2A3F;">单一的</font>和一致的<font style="color:#DF2A3F;">路由选择策略</font>

<font style="color:#000000;">->互联网把路由选择协议分为两大类</font>

1. <font style="color:#000000;">内部网关协议IGP：在AS内部使用，</font><font style="color:#DF2A3F;">RIP,OSPF</font>
2. <font style="color:#000000;">外部网关协议EGP：不同AS之间，BGP</font>

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781079738863-c26d6e83-2a9e-4d2c-9efa-861bb29b4867.png" width="825.5" title="" crop="0,0,1,1" id="u3290fd51" class="ne-image">

#### 内部网关协议RIP
##### RIP的工作原理
RIP是一种分布式的<font style="color:#DF2A3F;">基于距离向量的路由选择协议</font>

RIP要求网络中的每一个路由器都要维护从它<font style="color:#DF2A3F;">自己</font>到其他每一个<font style="color:#DF2A3F;">目的</font>网络的<font style="color:#DF2A3F;">距离</font>记录

距离的定义：

+ 路由器到直连的网络的距离定义为1
+ 主机到<font style="color:#DF2A3F;">非直连</font>网络的距离为所经过的<font style="color:#DF2A3F;">路由器数</font>加<font style="color:#DF2A3F;">1</font>
+ 距离也称为“<font style="color:#DF2A3F;">跳数</font>”，R每经过一个网络，距离加一，RIP认为好的路由，距离最短
+ RIP允许一条路径最多只能包含15个网络，当距离等于<font style="color:#DF2A3F;">16</font>时，表示<font style="color:#DF2A3F;">不可达</font>

RIP协议和哪些路由器交换信息？交换什么信息？在什么时候交换信息？

###### -> RIP协议的特点
1. 仅和<font style="color:#DF2A3F;">相邻</font>路由器<font style="color:#DF2A3F;">交换信息</font>。若两个路由器之间通信<font style="color:#DF2A3F;">不需要</font>经过另一个路由器，那么这两个路由器就是<font style="color:#DF2A3F;">相邻</font>的
2. 路由器交换的信息是当前<font style="color:#DF2A3F;">本路由器所知道的全部信息</font>，即自己的现在的<font style="color:#DF2A3F;">路由表</font>
3. 按<font style="color:#DF2A3F;">固定的时间间隔</font>交换路由信息

##### 距离向量算法
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781089111327-240ebbdd-4e9e-4068-8e0f-2be5b887867c.png" width="565.272705078125" title="" crop="0,0,1,1" id="u71870519" class="ne-image">

对每一个相邻路由器发送过来的RIP报文，执行以下步骤：

1. 对地址为<font style="color:#DF2A3F;">X</font>的相邻路由器<font style="color:#DF2A3F;">发来</font>的RIP报文，先修改此报文中的<font style="color:#DF2A3F;">所有项目</font>，把“下一跳”字段中的<font style="color:#DF2A3F;">地址</font>都改为<font style="color:#DF2A3F;">X</font>，并把所有的“<font style="color:#DF2A3F;">距离</font>”字段的值加<font style="color:#DF2A3F;">1</font>。每个项目都有三个关键数据：目的网络Net 距离d 下一跳路由器X
2. 对修改后的<font style="color:#DF2A3F;">RIP报文</font>中的每一个<font style="color:#DF2A3F;">项目</font>，进行以下步骤：
+ 若原路由表中<font style="color:#DF2A3F;">没有</font>目的网络Net，则把该项目添加到原路由表中，
+ 对于原路由表：有<font style="color:#DF2A3F;">目的网络</font>Net，且下一跳路由器<font style="color:#DF2A3F;">地址</font>是<font style="color:#DF2A3F;">X</font>，则在原路由表中：把收到的项目替换成<font style="color:#DF2A3F;">原路由表</font>的项目（始终保持收到的信息是<font style="color:#DF2A3F;">最新</font>的）
+ 有目的网络Net，且下一跳的路由器地址<font style="color:#DF2A3F;">不是X</font>，若该项目RIP报文中距离的d<font style="color:#DF2A3F;">小于</font>路由表中的距离，<font style="color:#DF2A3F;">替换</font>跳数及下一跳路由器（因为出现了更佳选择）<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781089941623-3d4a1558-ead6-4004-b7bf-7f4f9ef4a293.png" width="271.81817592668153" title="" crop="0,0,1,1" id="SnNNw" class="ne-image">
3. 若3分钟内还没有收到相邻路由器的RIP报文，则把此相邻路由器记为不可达，距离设置为16

##### 坏消息传得慢
RIP存在的一个问题是，当网络出现故障时，要经过比较<font style="color:#DF2A3F;">长的时间</font>才能将此信息传送到<font style="color:#DF2A3F;">所有的路由器</font>

故障信息没传过来的时候，但此时可能相邻的路由器把信息发了过去，造成信息的错误

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781094305834-b5eef89d-ebba-4008-8316-dbbc984f4439.png" width="740.4545294056257" title="" crop="0,0,1,1" id="u6b132add" class="ne-image">

原因在于：错误的路由表没有立刻发出去，导致信息更新不及时

#### 内部网关OSPF
名字：开放最短路径优先

最主要特征：使用<font style="color:#DF2A3F;">链路状态协议</font>

1. 向所有路由器发送信息。使用<font style="color:#DF2A3F;">泛洪法</font>
2. 发送的信息是与本路由器<font style="color:#DF2A3F;">相邻</font>的所有路由器的<font style="color:#DF2A3F;">链路状态，-></font>也就是说明本路由器和哪些路由器相邻，以及该链路的度量，度量可以是费用，距离，时延,带宽等

各路由器频繁交换信息 -> 所有路由器都能建立一个链路状态数据库 ->其实 就是全网的拓扑结构图

-> 拓扑图在全网范围是一致的

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781095296567-fb636d92-ecad-4bc7-ad08-e063537473f6.png" width="384.54544621065645" title="" crop="0,0,1,1" id="u225ef16d" class="ne-image">

##### OSPF层次结构区域划分
将一个自治系统再划分为若干个更小的区域

##### OSPF五种分组类型
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781095778518-225882b1-6246-41e0-b851-a1a967180026.png" width="758.6363471933637" title="" crop="0,0,1,1" id="u744c6f20" class="ne-image">

#### <font style="color:#DF2A3F;">外</font>部网关协议BGP
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781096050730-00a791f6-817b-4bb4-8e3a-c6d1159fa89c.png" width="734.0908931799174" title="" crop="0,0,1,1" id="uda4adb0d" class="ne-image">

区别于前两个内部协议，这个协议用于连接<font style="color:#DF2A3F;">两个自治系统</font>

BGP只力求选择出一条能<font style="color:#DF2A3F;">到达</font>目的网络且比<font style="color:#DF2A3F;">较好</font>的路由（不能兜圈子），而非要计算出一条最佳路由，采用<font style="color:#DF2A3F;">路径向量路由选择</font>协议

##### BGP路由
两种不同功能的路由器，即<font style="color:#DF2A3F;">边界路由器</font>（网关），<font style="color:#DF2A3F;">内部路由器</font>

-> 一个AS至少要有一个边界路由器和相邻的AS的边界路由器相连，AS之间才能利用协议BGP进行交换信息

->两个边界路由器进行通信时，必须先建立<font style="color:#DF2A3F;">TCP</font>连接

-> 连接好之后称为<font style="color:#DF2A3F;">eBGP连接</font>，e表示外部external

->发送BGP路由“X,AS1,R1”意为：从R1经过AS1可到达网络X

->但是只有边界路由器知道是显然不够的，应当把获得的BGP路由，再转发给<font style="color:#DF2A3F;">AS内部</font>的其他路由器

->因此规定在<font style="color:#DF2A3F;">AS内部</font>，两个路由器之间需要建立<font style="color:#DF2A3F;">iBGP</font>连接，规定iBGP必须<font style="color:#DF2A3F;">全联通，</font>即使两路由器没有物理连接，也会有iBGP

###### BGP路由的一般格式
BGP路由 = “前缀，BGP属性”= “前缀，AS-PATH，NEXT-HOP”

前缀：BGP的路由<font style="color:#DF2A3F;">终点</font>

BGP属性：有好几种类型，但比较重要的就是这里的AS-PATH，NEXT-HOP

AS2中无R1,路由器R4应当如何构建自己的转发表？

->R4会将BGP路由起点改为R1的对等端R2 即R2->R1->X

->R4利用<font style="color:#DF2A3F;">内部网关协议</font>找到去R2的<font style="color:#DF2A3F;">最佳路由</font>的<font style="color:#DF2A3F;">下一跳，</font>然后在转发表中增加前缀X的下一跳是R3这一项目

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781099096081-8520f035-d22f-46f8-a59d-1db802165368.png" width="742.727256629093" title="" crop="0,0,1,1" id="u18cb519c" class="ne-image">

##### BGP的路由选择
假如从一个AS到另外一个AS中的前缀X，有两条或多条BGP路由可以选择，应当按照<font style="color:#DF2A3F;">规则</font>选出比较好的BGP路由

1. <font style="color:#74B602;">本地偏好值</font>最高的路由要首先选择

->BGP路由属性中有一个选项叫本地偏好，记为LOCAL-PREF

->本地：从<font style="color:#DF2A3F;">本AS</font>开始，到<font style="color:#DF2A3F;">同一个前缀</font>的不同BGP路由中，挑选<font style="color:#DF2A3F;">偏好值较高</font>的路由

2. 选择具有<font style="color:#74B602;">AS跳数最少</font>的路由

但是可能出现一种情况->选择的AS内部的路由器更多，分组在AS里面要经过多次的转发，证明了BGP<font style="color:#DF2A3F;">无法</font>选择出一个<font style="color:#DF2A3F;">最佳路由</font>

3. 使用<font style="color:#74B602;">热土豆</font>路由选择算法

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781147555920-9330a3ce-ae75-4f54-991d-9aa5055bb933.png" width="459.5" title="" crop="0,0,1,1" id="u84415ea4" class="ne-image">

两条路由器的本地偏好相同，同时所经过的AS个数也相同，AS中的每一个路由器都要采用热土豆路由选择算法

-> 把分组比喻成热土豆，要<font style="color:#DF2A3F;">尽快转发</font>出去，而不考虑从哪个路由器离开AS1，或者说，要使分组尽快离开AS1

->这是要使用<font style="color:#DF2A3F;">内部网关协议</font>，如OSPF，RIP，对于不同的路由器，得出的选择结果是不同的

->对于R1，应选择R4作为下一跳，因此应选择BGP<font style="color:#DF2A3F;">路由2</font>

->对于R2，应选择R3作为下一跳，因此应选择BGP<font style="color:#DF2A3F;">路由1</font>

4. 选择路由器<font style="color:#74B602;">BGP标识符</font>最小的路由

BGP标识符：在BGP进行交互的报文中，<font style="color:#DF2A3F;">首部字段</font>有一个4字节的字段叫做<font style="color:#DF2A3F;">BGP标识符</font>

->这个字段被赋予一个无符号整数，作为运行BGP的路由器的唯一标识符，记为<font style="color:#DF2A3F;">BGP ID</font>

->具有多个接口的路由器有多个IP地址，BGPID就使用<font style="color:#DF2A3F;">IP地址</font>中<font style="color:#DF2A3F;">数值最大</font>的一个

##### BGP的四种报文
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781152052613-1b2c9625-57d3-487e-8868-37fa738fdba9.png" width="539" title="" crop="0,0,1,1" id="ub6735a6c" class="ne-image">

#### 总结
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781152188901-e06aa467-0acb-469f-8f6f-67228d32235d.png" width="606" title="" crop="0,0,1,1" id="u8bf67bf5" class="ne-image">

#### 题目
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781153190602-3c023d29-fb1e-400f-bc99-181a565415c6.png" width="674.5" title="" crop="0,0,1,1" id="u95f8e559" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781153214802-c6fc447d-ab5f-440d-bfeb-b9c1097262af.png" width="673.5" title="" crop="0,0,1,1" id="u6ad11d1f" class="ne-image">

对收到的路由表：下一跳变为C 距离加一

然后对收到路由表的每一项

若原表中没有该项，添加到原表中

若原表中有且下一跳相同（都为X），更新到原表中

若有但下一跳地址不同：若新表中距离更小，则更新；距离相同或更大，不更新。

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781153171046-daf25ddb-67cd-4714-9795-0220068c6a7a.png" width="585.5" title="" crop="0,0,1,1" id="u72b523c4" class="ne-image">

1. R3C是边界路由器，和AS4之间，使用eBGP进行AS之间通信
2. R3a：R3C使用iBGP，在AS3内部把前缀X的路由信息传给所有的内部路由
3. R1c：AS1与AS3之间使用eBGP
4. R1d：既然R1c已经知道了，那么AS1之间使用iBGP把前缀X的路由信息进行传播

### IP多播
#### IP多播的基本概念
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781177759837-bfe45d18-b5cd-4d0e-9c0b-cfb408c311ec.png" width="622" title="" crop="0,0,1,1" id="u02ae6e46" class="ne-image">

#### 在局域网上进行硬件多播
#### 网际组管理协议IGMP
路由器利用IGMP协议来获得<font style="color:#DF2A3F;">多播组的成员信息</font>

IGMP协议让连接在<font style="color:#DF2A3F;">本地局域网</font>上的多播路由器知道本局域网上是否有主机<font style="color:#DF2A3F;">参加或退出</font>了某个多播组

IGMP使用IP数据报<font style="color:#DF2A3F;">传递报文</font>，也向IP提供服务，一般把他视作IP的一个组成部分

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781178254247-2e8d843f-02f3-49b8-8b10-8e6c4dcb5733.png" width="818" title="" crop="0,0,1,1" id="ua7352770" class="ne-image">

+ 主机和多播路由器之间的所有通信都使用<font style="color:#DF2A3F;">IP多播</font>，携带IGMP报文的数据都使用<font style="color:#DF2A3F;">硬件多播</font>来传送

->因此在支持硬件多播的网络上，没有参加IP多播的主机不会收到IGMP报文

+ 多播路由器在探询组成员关系时，只需要对所有的组发送一个请求信息的询问报文，而不需要对每一个组发送
+ 当同一个网络上连接有几个多播路由器时，它们能够迅速选择其中一个来探询主机的成员关系

#### 多播路由选择协议
多种实用的多播路由选择协议，它们在转发多播数据报时使用了以下的三种办法

1. 泛洪与剪除
2. 隧道技术

适用于多播组的位置在地理上很分散的情况。

### NAT
专用网上的主机本来已分配到了本地IP地址，但想和互联网上的主机通信，需要用到NAT技术

NAT路由器上有一个专用到全球的转换表

发送时:NAT路由器把源地址改为全球IP，再发给互联网

发回来时，把目的IP(全球IP)改为专用IP

必须由专用网上的主机发起通信

NAT路由器有n个全球IP地址时，专用网内有n台主机(一对一)

NAPT:利用上端口号，实现多个主机共享一个全球IP

### 软件定义网络SDN
#### 路由器的构成
##### 路由器的结构
路由器是一种具有多个<font style="color:#DF2A3F;">输入</font>端口和多个<font style="color:#DF2A3F;">输出</font>端口的专用计算机，其任务就是<font style="color:#DF2A3F;">转发分组</font>

路由器结构可划分为两大部分：<font style="color:#DF2A3F;">路由选择</font>部分 <font style="color:#DF2A3F;">分组转发</font>部分

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781314427623-2977ea7b-29cb-44c7-a986-d9bc38ec2a85.png" width="499" title="" crop="0,0,1,1" id="u13af5408" class="ne-image">

控制层面：核心构件：路由选择处理机；根据所选定的路由选择协议构造出路由表

数据层面：由三部分组成：交换结构，输入端口，输出端口

->交换结构的作用：根据转发表，对分组进行转发

##### 广播域和冲突域
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781314911360-08aafc74-e17f-4b58-b1f1-6c5d0f33d011.png" width="1067" title="" crop="0,0,1,1" id="u4c707f3b" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781314933187-e6624bd0-f8ff-4f9a-871b-de272da4647a.png" width="1056" title="" crop="0,0,1,1" id="ua63bd026" class="ne-image">

#### 软件定义网络SDN
SDN的要点：把网络的控制层面和数据层面隔离，让控制层面利用软件来控制数据层面的设备

->OpenFlow协议：看成是在SDN体系结构中控制层面和数据层面之间的<font style="color:#DF2A3F;">通信接口</font>，使得控制层面的控制器可以对数据层面的中的设备进行直接访问。

这种控制在<font style="color:#DF2A3F;">逻辑上是集中式</font>的，是<font style="color:#DF2A3F;">基于流的控制</font>。

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781315732590-2c5aba0b-6f29-46a2-b8e7-b5fd2ba28006.png" width="945" title="" crop="0,0,1,1" id="u0e0497c3" class="ne-image">

->不再使用传统转发表 而用一个<font style="color:#DF2A3F;">流表</font>来代替

流：穿过网络的一种<font style="color:#DF2A3F;">分组序列</font><font style="color:#000000;">，在此序列中的分组都</font><font style="color:#DF2A3F;">共享分组首部某些字段</font><font style="color:#000000;">的值</font>

<font style="color:#000000;">->每个OpenFlow交换机必须有一个或一个以上的流表，每一个流表可以包括很多行，即多个</font><font style="color:#DF2A3F;">流表项</font>

->流表项包括<font style="color:#DF2A3F;">三个字段：</font>首部字段值 计数器 动作

<font style="color:#74B602;">首部字段值</font>：是一组字段，用来使入分组的对应<font style="color:#DF2A3F;">首部</font>与之相匹配，又称为<font style="color:#DF2A3F;">匹配字段，</font><font style="color:#000000;">既可以处理链路层的帧，又可以处理网络层的IP分组和运输层的报文。</font>

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781317223487-cbf5e2d2-7cb6-4bd8-baed-32817c9f2c88.png" width="1004" title="" crop="0,0,1,1" id="uce1a232d" class="ne-image">

<font style="color:#74B602;">计数器</font>：也是一组计数器，可包括已经与该表项匹配的分组数量，以及从该表项上次更新到现在的时间

<font style="color:#74B602;">动作</font>：也是一组动作，例如当分组匹配某个流表项时，把分组<font style="color:#DF2A3F;">转发</font>到指明的端口

##### 简单转发的例子
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781318384151-61a4e792-f385-49c0-9352-6ddd7d71a148.png" width="1069" title="" crop="0,0,1,1" id="u4cc62b7c" class="ne-image">

IP源地址10.3.*.*：表明这样的地址将匹配前16位为10.3的任何地址

转发（3）：表明分组从端口3转发出去

##### 负载均衡
假设有两条路由，代价一样，可以任选一条，但是为了平衡某一条链路上的压力，可以让这个数据分流，让他们的负载均衡一下。

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781320385617-29af5322-8684-41ec-b801-64eec1809c16.png" width="1058" title="" crop="0,0,1,1" id="u58ef042d" class="ne-image">

##### 防火墙
在交换机S2设置防火墙，作用是仅接收来自与S3相连的<font style="color:#DF2A3F;">主机</font>发送来的分组（H5,H6）

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781320931820-fb297f32-e9f3-41ee-bcb7-15c9c8bbafc0.png" width="329" title="" crop="0,0,1,1" id="ub20934f8" class="ne-image">

#### 题目
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781322733667-4fd6e817-2430-478e-b6fa-9f4200ad51ec.png" width="635" title="" crop="0,0,1,1" id="ucd202fd5" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781322803029-c15ec189-9281-4327-b6e9-5df539bc5db4.png" width="688" title="" crop="0,0,1,1" id="u35e8372b" class="ne-image">

## 运输层
### 传输层概述
#### 进程之间的通信
运输层向它上面的<font style="color:#DF2A3F;">应用层</font>提供<font style="color:#DF2A3F;">通信</font>服务

属于面向通信部分的最高层，也是<font style="color:#DF2A3F;">用户</font>功能中的<font style="color:#DF2A3F;">最低</font>层

两台主机进行通信时，都要使用传输层。

IP协议能够把源主机送出的分组，按照首部中的地址，送到目的主机，那为什么还需要传输层？

->IP数据报明确标识了两台主机的IP地址，但是真正进行通信的实体，是主机中的<font style="color:#DF2A3F;">应用进程</font>

->IP协议虽然能把分组送到目的主机，但这个分组还<font style="color:#DF2A3F;">停在网络层</font>没有进行<font style="color:#DF2A3F;">交付给应用进程</font>

->这就需要运输层的参与

->运输层提供<font style="color:#DF2A3F;">应用进程之间</font>的<font style="color:#DF2A3F;">逻辑通信</font>

->运输层向高层用户<font style="color:#DF2A3F;">屏蔽</font>了下面网络核心的细节，它使应用进程看见的就是好像在两个运输层实体之间有一条<font style="color:#DF2A3F;">端到端的逻辑通信信道</font>

->但这条信道对上层的表现却因传输层使用<font style="color:#DF2A3F;">不同的协议</font>而有很大差别

->TCP:全双工可靠信道

->UDP：不可靠信道

#### 传输层的两个主要协议
1. 用户数据报协议<font style="color:#DF2A3F;">UDP</font>
2. 传输控制协议<font style="color:#DF2A3F;">TCP</font>

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782093161759-c0d83a55-87ab-4120-9870-574eaa308df1.png" width="751" title="" crop="0,0,1,1" id="ucffd6a0e" class="ne-image">

通信时传送的数据单位：<font style="color:#DF2A3F;">TCP报文段</font> 或者 <font style="color:#DF2A3F;">UDP用户数据报</font>

一些<font style="color:#DF2A3F;">应用层</font>主要使用的<font style="color:#DF2A3F;">运输层</font>协议

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782093714318-3ee51286-c7d0-40c0-96e7-f48b57f0500e.png" width="538" title="" crop="0,0,1,1" id="u5a05d83c" class="ne-image">

#### 端口
复用和分用

+ <font style="color:#DF2A3F;">应用层</font>所有的应用进程，都可以（向下）通过<font style="color:#DF2A3F;">运输层</font>再传送到<font style="color:#DF2A3F;">IP</font>层，这就是<font style="color:#DF2A3F;">复用</font>
+ <font style="color:#DF2A3F;">运输层</font><font style="color:#000000;">从</font><font style="color:#DF2A3F;">IP</font><font style="color:#000000;">层收到（向上）发送给各应用进程的数据后，必须</font><font style="color:#DF2A3F;">分别交付</font><font style="color:#000000;">指明的各应用进程，这就是</font><font style="color:#DF2A3F;">分用</font>

需要给应用层的每个应用进程都赋予一个非常<font style="color:#DF2A3F;">明确的标志</font>，用一个叫做<font style="color:#DF2A3F;">端口号</font>的正整数来标志不同的进程

->应用层把数据发送到恰当的端口，传输层读取数据并发到目的主机

->目的主机传输层收到数据，再把数据发送到适当端口，应用进程从该端口读取这些数据

注意：端口号只具有<font style="color:#DF2A3F;">本地意义</font>

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782095082548-13ca9a79-647d-45b0-a7c9-de16b3be0fff.png" width="764.9999834190719" title="" crop="0,0,1,1" id="udb2d338b" class="ne-image">

两个计算机中的进程要互相通信，不仅必须知道对方的<font style="color:#DF2A3F;">IP地址</font>，而且要知道对方的<font style="color:#DF2A3F;">端口号</font>

互联网上的计算机通信采用客户--服务器方式

->客户必须知道对方服务器的IP地址（找到目的主机），和端口号（找到目的进程）

因此运输层的端口号分为下面两大类：

1. <font style="color:#DF2A3F;">服务器端</font>使用的端口号
+ 熟知端口号

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782179943486-95af18c4-13bb-4582-9277-418dc5cef3e9.png" width="589" title="" crop="0,0,1,1" id="u109f4020" class="ne-image">

+ 登记端口号 1024~49151

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782179952705-68c8ba72-fae3-47d3-81df-df21fefccb47.png" width="562" title="" crop="0,0,1,1" id="u49fe7722" class="ne-image">

2. <font style="color:#DF2A3F;">客户端</font>使用的端口号

数值为49152~65535

是临时端口号，客户进程临时使用，结束后被系统收回

### 用户数据报协议UDP
#### UDP的概述
UDP只在IP的数据报服务之上增加了<font style="color:#DF2A3F;">复用，分用，以及差错检测</font>的功能

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782174302905-c08a55e3-18c6-42e3-81ba-18d51472bb45.png" width="337" title="" crop="0,0,1,1" id="u6508aa43" class="ne-image">

UDP的主要特点：

1. UDP是<font style="color:#DF2A3F;">无连接的</font>，发送数据之前不需要建立连接
2. UDP使用尽最大努力交付，<font style="color:#DF2A3F;">不保证可靠</font>交付
3. UDP是<font style="color:#DF2A3F;">面向报文</font>的：只添加首部就向下交给IP层，所以要求应用程序选择合适大小的报文
4. 没有<font style="color:#DF2A3F;">拥塞控制</font>，网络拥塞不会使源主机发送速率降低
5. UDP支持一对一，一对多，多对一，多对多的交互通信
6. UDP的首部开销小，只有八字节

##### UDP的复用和分用
复用：发送端的应用进程，把用户数据通过各自的端口传送到了运输层后，共用一个网络层协议，把收到的UDP用户数据报组装成不同的IP数据报，发送到互联网。

分用：接收端的网络层收到IP数据报后，提取出数据部分，再根据端口号传送到相应的端口，以便应用层调用

#### UDP的首部格式
有两个字段：数据字段和<font style="color:#DF2A3F;">首部字段</font>。

->首部字段只有八字节，4个字段，每个字段2字节

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782176658543-4358d980-5d20-410f-8a04-5ba8a00eb17d.png" width="531" title="" crop="0,0,1,1" id="ubca589c5" class="ne-image">

1. <font style="color:#DF2A3F;">源端口</font>：源端口号，在需要对方回信时选用，不需要时可用全0
2. <font style="color:#DF2A3F;">目的端口</font>：目的端口号
3. <font style="color:#DF2A3F;">长度</font>：UDP用户数据报的长度，最小值是8(仅有8字节的首部)
4. <font style="color:#DF2A3F;">校验和</font>：检测UDP用户数据报在传输中是否有错，有错就丢弃

UDP用户数据报首部中校验和的计算方法有些特殊

->计算时，要在UDP用户数据报之前增加12字节的<font style="color:#DF2A3F;">伪首部</font>

<font style="color:#000000;">->得到一个临时的UDP用户数据报，在此基础上计算校验和</font>

<font style="color:#000000;">->UDP的检验和是把首部和数据部分一起都检验</font>

#### <font style="color:#000000;">题目</font>
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782178001936-649989a9-504a-465c-8228-23489f94f95c.png" width="883" title="" crop="0,0,1,1" id="uea68a131" class="ne-image">

知识点：IP数据报的分片 UDP用户数据报的传输

首先明确UDP数据报是如何放在IP数据报中传输的？

->UDP用户数据报字段 加上 首部字段 一起放进IP数据报的数据字段 进行传输

->UDP首部固定8字节

->故IP数据报数据字段为 8192 + 8 = 8200字节

->以太网传送 MTU = 1500字节 其中首部固定20字节

->最大帧长 1500 - 20 = 1480 -> 必须是8的倍数

->8200 / 1480 = 5 余800

->片偏移字段 ：数据部分帧长/8，第一个片偏移为0

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782179333530-adfbd5c1-c5d4-4501-b64b-768ae34e976c.png" width="860" title="" crop="0,0,1,1" id="ua42b56d1" class="ne-image">

首部8字节 分别为源端口 目的端口 用户数据报长度 校验和

源端口：（0632）<sub>16</sub>=2+3*16+6*16<sup>2</sup>=1586 

目的端口：（0045）<sub>16</sub>=5+4*16 = 69 <font style="color:#DF2A3F;">TFTP</font>

用户数据报长度：（001C）<sub>16</sub>=12+16 = 28字节

数据部分长度：总长度-首部（8字节） =  28-8=20字节

源端口为1586，为服务端登记端口，故是服务器发给客户

目的端口是69 使用UDP的服务器程序为TFTP服务器

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782354519909-4b804154-e0c4-4a84-a092-9908d3752c00.png" width="578" title="" crop="0,0,1,1" id="u6f08d8fc" class="ne-image">

### 传输控制协议TCP
#### TCP概述
##### TCP最主要的特点
1. TCP是<font style="color:#DF2A3F;">面向连接的传输层协议</font>

在使用TCP之前必须建立连接，传送后释放连接

2. 每一条TCP连接必须是<font style="color:#DF2A3F;">点对点</font>的
3. TCP提供<font style="color:#DF2A3F;">可靠交付</font>的服务
4. TCP提供<font style="color:#DF2A3F;">全双工通信</font>：通信双方随时能发送数据
5. TCP<font style="color:#DF2A3F;">面向字节流</font>

流：指流入到进程或从进程流出的字节序列

TCP把应用程序交下来的数据看成是一连串的<font style="color:#DF2A3F;">无结构的字节流</font>，TCP并不知道其含义

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782182324835-cffb965a-61af-46de-8a94-b650873e1e41.png" width="742" title="" crop="0,0,1,1" id="u2fb32b70" class="ne-image">

##### TCP的连接
TCP连接的两个端点是套接字（socket）

套接字 = <font style="color:#DF2A3F;">IP地址</font>：<font style="color:#DF2A3F;">端口号</font>

每一条TCP连接<font style="color:#DF2A3F;">唯一</font>地被<font style="color:#DF2A3F;">通信两端</font>的<font style="color:#DF2A3F;">两个套接字</font>所确定

同一个IP地址可以有不同的TCP连接，同一个端口号也可以出现在多个不同的TCP连接中

#### TCP报文段的首部格式
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782287802957-71ad93b4-9ad5-42e6-955f-687b001b2122.png" width="679" title="" crop="0,0,1,1" id="uceffa5c6" class="ne-image">

TCP传送的数据单元是<font style="color:#DF2A3F;">报文段</font>，一个TCP报文段分为<font style="color:#DF2A3F;">首部和数据</font>两部分

->TCP的全部功能体现在它<font style="color:#DF2A3F;">首部中各字段</font>的作用

->前20个字节是<font style="color:#DF2A3F;">固定的</font> 后面4n字节是根据需要增加的

->最小长度是20字节

各字段含义：

1. <font style="color:#74B602;">源端口和目的端口</font>：各占2字节
2. <font style="color:#74B602;">序号</font>：占4字节，序号范围[0，2<sup>32</sup>-1]，共2<sup>32</sup>个

->在一个TCP连接中，传送的字节流，每一个字节都会按顺序编号

->首部中的<font style="color:#DF2A3F;">序号字段</font>，指的是本报文段所<font style="color:#DF2A3F;">发送</font>的数据的<font style="color:#DF2A3F;">第一个字节</font>的序号（不一定是0）

3. <font style="color:#74B602;">确认号</font>：占4字节，是期望收到对方下一个报文段的<font style="color:#DF2A3F;">第一个数据字节</font>的<font style="color:#DF2A3F;">序号</font>

->若确认号 = N，则表明：到序号N-1为止的所有数据都已经正确收到

->若N = 5，表明5之前的数据都正确接收了，下一次要从5开始发数据

4. <font style="color:#74B602;">数据偏移</font>：指出TCP报文段的首部长度，数据偏移的单位是4B，所以数据偏移的最大值是60B，也是TCP首部的最大长度为60
5. URG<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782289809228-e5f3104a-bf0d-4ca0-bd62-f544e2b2e695.png" width="851.5" title="" crop="0,0,1,1" id="u23978d57" class="ne-image">
6. ACK：仅当ACK = 1时，确认号字段才有效；若ACK = 0，确认号无效

TCP规定，<font style="color:#DF2A3F;">连接建立</font>后，所有传送的报文段必须把ACK置1

7. 窗口：窗口值是[0，2<sup>16</sup>-1]之间的整数窗口，指的是发送本报文段一方的<font style="color:#DF2A3F;">接收窗口</font>

窗口值告诉对方：从确认号（指的是对方的序号）算起，接收方（我方）目前允许对方发送的数据量

8. 选项：TCP起初只规定了一种选项，即<font style="color:#DF2A3F;">最大报文长度MSS</font>，MSS是每一个TCP报文中的<font style="color:#DF2A3F;">数据字段的最大长度</font>

->所以MSS并不是整个TCP报文的最大长度，而是“TCP<font style="color:#DF2A3F;">报文段</font>长度减去TCP<font style="color:#DF2A3F;">首部</font>长度”

#### TCP可靠传输的实现
##### 序号
注意对<font style="color:#DF2A3F;">每一个字节</font>编序号

TCP用字节流传送数据，TCP首部中的序号指本报文段发送的第一个字节的序号

##### 确认
指期望对方下一次从确认号开始发送数据

TCP默认使用<font style="color:#DF2A3F;">累计确认</font>，（累计一段报文段之后）也就是TCP只确认数据流中<font style="color:#DF2A3F;">第一个丢失</font>的字节

##### 重传
###### 快重传
对收到的<font style="color:#DF2A3F;">每一个报文段</font>，都回一个确认

收到3个甬余ack，就重传

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782300463596-fca03357-d884-4ddf-8a33-bd878b715419.png" width="685.5" title="" crop="0,0,1,1" id="ucb6e8ff9" class="ne-image">

###### 超时
在<font style="color:#DF2A3F;">一段时间</font>内都没有收到B对该报文段的确认时，就会触发重传

##### 连续ARQ协议
发送方维持一个发送窗口，凡位于发送窗口内的分组，都可连续发送出去，而不需要等待对方的确认。

->接收方采用累计确认，对按序到达的最后一个分组发送确认。

发送窗口：发送方最多能连续发，未收到确认的帧数量

发送窗口下界：<font style="color:#DF2A3F;">最早未被确认</font>的分组序号

->等于 期望序号 - 发送窗口

#### TCP的流量控制
流量控制的含义就是让发送方的<font style="color:#DF2A3F;">发送速率</font>不要太快，要让接收方<font style="color:#DF2A3F;">来得及接收</font>

->利用<font style="color:#DF2A3F;">滑动窗口机制</font>可以很方便地在TCP连接上实现对<font style="color:#DF2A3F;">发送方</font>的流量控制。

TCP接收方利用自己的<font style="color:#DF2A3F;">接收窗口的大小</font>来限制发送方发送窗口的大小

TCP发送方收到接收方的<font style="color:#DF2A3F;">零窗口通知</font>后，应启动<font style="color:#DF2A3F;">持续计时器</font>，持续计时器超时后，向接收方发送<font style="color:#DF2A3F;">零窗口探测</font>报文

#### TCP的拥塞控制
什么是网络的资源？

->带宽，交换节点中的缓存等

在网络中，若对某一资源的需求，超过了它所能提供的可用部分，就叫做<font style="color:#DF2A3F;">拥塞</font>

TCP进行拥塞控制的算法有四种，讨论前先假设：

1. 数据是<font style="color:#DF2A3F;">单方向</font>传输的，对方只传送<font style="color:#DF2A3F;">确认</font>报文
2. 接收方总是有<font style="color:#DF2A3F;">足够大的缓存</font>空间，因而发送窗口的大小由网络的<font style="color:#DF2A3F;">拥塞程度</font>来决定

##### 慢开始和拥塞避免
发送方维持一个叫做<font style="color:#DF2A3F;">拥塞窗口cwnd</font>的状态变量。

拥塞窗口大小取决于网络的拥塞程度。

发送方让自己的<font style="color:#DF2A3F;">发送窗口等于拥塞窗口</font>。

->发送方控制拥塞窗口的原则：只要网络中没有出现拥塞，拥塞窗口就可以大一些

->发送方如何知道网络发生了拥塞？

路由器拥塞时会丢弃分组，只要发送方没有按时收到接收方的确认报文，就可以估计出现网络拥塞

慢开始算法的思路：

当主机在已建立的TCP连接上开始发送数据时，并<font style="color:#DF2A3F;">不清楚</font>网络当前的<font style="color:#DF2A3F;">负荷</font>情况

->如果立即把大量数据注入网络，有可能引起网络拥塞

->应该<font style="color:#DF2A3F;">由小到大</font>逐渐<font style="color:#DF2A3F;">增大拥塞窗口</font>数值

在刚刚开始发送报文时，先把<font style="color:#DF2A3F;">初始拥塞窗口</font>cwnd设置为<font style="color:#DF2A3F;">1个</font>最大报文段<font style="color:#DF2A3F;">MSS</font>的数值

->在每收到一个<font style="color:#DF2A3F;">对新的报文段的确认</font>后，就可以把拥塞窗口<font style="color:#DF2A3F;">增加一个MSS</font>的数值。

为了防止拥塞窗口cwnd增长过大引起1网络拥塞，还需要设置一个<font style="color:#DF2A3F;">慢开始门限（ssthresh）</font>状态变量

+ cwnd<ssthresh,使用慢开始算法
+ cwnd>ssthresh，使用<font style="color:#DF2A3F;">拥塞避免</font>算法
+ cwnd = ssthresh，两个都可以使用

拥塞避免算法：每经过<font style="color:#DF2A3F;">一个RTT</font>，cwnd大小加一

当网络中出现了<font style="color:#DF2A3F;">超时</font>，于是调整门限值<font style="color:#DF2A3F;">ssthresh = cwnd/2</font>，同时设置拥塞窗口cwnd = 1

->但是经过了一个RTT才知道超时，再去修改自己的拥塞窗口

#### 题目
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782523242182-85ec298b-fe60-4887-b2f9-c6b92de639db.png" width="749" title="" crop="0,0,1,1" id="u5cddfeee" class="ne-image">

1.期望序号是5 -> 已经收到2，3，4

->收到三个才确认，那么2，3，4都有可能丢失

->2丢失时：&#123;2，3，4&#125;

->3丢失时：&#123;3，4，5&#125;

->4丢失时：&#123;4，5，6&#125;

->无丢失：&#123;5，6，7&#125;

2. 2，3，4都有可能丢失

ack3：用来确认2的分组

ack4：用来确认3的分组

ack5：用来确认4的分组

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782524040275-ad3c8167-6b80-4fa8-8370-91e3aad1f261.png" width="803.5" title="" crop="0,0,1,1" id="u79f696cf" class="ne-image">

+ 传输的是字节流，一个序号对应一个字节
+ 序号总数为2<sup>32</sup>，所以L字节总数为2<sup>32</sup>

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782524913398-1e720c59-5017-47ea-89ab-734192753958.png" width="842" title="" crop="0,0,1,1" id="uff2dc345" class="ne-image">

1. 70~99 30字节
2. 100
3. 100~179 80字节
4. 重发 70~99 确认号为70

## 第六章 应用层
### 网络应用模型 & 域名系统DNS
#### 网络应用模型
##### 客户/服务器模型 C/S
服务器总是打开，会一直等待请求

客户必须直到服务器的地址才能发起请求；但是服务器只能等客户发请求才能回复

客户机之间不能互相通信（必须经过服务器）

##### 对等通信P2P
任一计算机都是对等方

#### 域名系统DNS
##### 概述
域名<->IP地址相互解析

人好记域名，机器只识别IP，DNS做翻译

使用<font style="color:#DF2A3F;">UDP53</font>端口，数据量大时改用TCP53

##### 域名结构
<font style="color:#DF2A3F;">顶级</font>域名写在最右边

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1783071608927-8fa54b87-8185-4c0e-9ff0-50145e85ecff.png" width="641" title="" crop="0,0,1,1" id="u65381837" class="ne-image">

三级域名 二级域名 顶级域名

##### 域名解析过程


### 文件传输协议FTP
#### 概述
是互联网上使用最广泛的文件传输协议，允许指明文件的类型格式和存取权限

屏蔽了各计算机系统的细节 ->适合于在异构网络中的任意计算机之间传输文件

#### 控制连接和数据连接
FTP工作时使用两个并行的TCP连接

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1783064418116-8faf9f2f-ea5f-4025-ac71-daf57a590907.png" width="469" title="" crop="0,0,1,1" id="u17b5652f" class="ne-image">

+ 一个是<font style="color:#DF2A3F;">控制连接</font>

->服务器一直监听，等待客户连接，建立在这个端口上的连接称为控制连接，用来传输控制信息。

->客户端发出的传送请求，通过控制连接，发给服务器的控制进程。一直<font style="color:#DF2A3F;">保持打开状态</font>

+ 一个是<font style="color:#DF2A3F;">数据连接</font>

->控制进程收到文件传输请求后，就创建“数据传输进程”和“数据连接”，用来连接双方的数据传送进程

->数据传送进程实际完成文件的传送，传送结束后<font style="color:#DF2A3F;">关闭</font>该进程

### 电子邮件
#### 概述
实时通信的电话总是需要双方同时在场，但是邮件不需要

用户代理：就是一个程序，让用户发邮件

邮件服务器：功能是发送和接收邮件，必须同时<font style="color:#DF2A3F;">充当客户和服务器</font>

邮件发送协议：用户代理向邮件服务器发送邮件，如<font style="color:#DF2A3F;">SMTP</font>

邮件读取协议：用户代理读取邮件，如<font style="color:#DF2A3F;">POP3</font>

#### 简单邮件传送协议SMTP
#### 电子邮件信息格式和MIME
#### 邮件读取协议POP3
### 万维网
#### 概述
万维网是一个分布式，联机式的信息存储空间。在这空间中，资源通过“统一资源定位符（<font style="color:#DF2A3F;">URL</font>）”<font style="color:#DF2A3F;">标识</font>。

通过超文本传输协议（HTTP）<font style="color:#DF2A3F;">传送</font>给使用者

#### 统一资源定位符URL
一般形式

<协议>://<主机>:<端口>/<路径>

#### 超文本传输协议HTTP
万维网网点有一服务器进程，不断监听TCP端口80

有浏览器向服务器发送连接建立请求并建立TCP连接后，浏览器就会发出浏览某个页面的请求

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1783066498598-76f498bf-6be1-4cf5-95c5-7c78ee097db7.png" width="617" title="" crop="0,0,1,1" id="u6f5e5185" class="ne-image">

HTTP/1.0的缺点：每请求一个文档，就要2RTT的开销，让万维网服务器负担很重

HTTP1.1：使用“持续连接”：在万维网服务器发送响应后保持连接，不需要重新建立

流水线：可以连续地去申请所有的对象

##### HTTP请求报文中常用的方法
什么是方法？

->是HTTP报文中的一个字段

-><font style="color:#DF2A3F;">请求结构</font>为方法+URL+协议版本

<font style="color:#DF2A3F;">GET</font>：请求读取由URL标识的信息

HEAD：请求读取由URL标识的信息首部

<font style="color:#DF2A3F;">POST</font>：给服务器添加信息

CONNECT：用于代理服务器

## 第七章
### 两类密码体制
#### 对称密钥密码体制
加密与解密 使用<font style="color:#DF2A3F;">相同的密钥的</font>密码体制

传输密钥极易被窃听，不适合远距离分发密钥

#### 公钥密码体制
使用不同的加密与解密密钥

产生的<font style="color:#DF2A3F;">两方面原因</font>：

1. 对称密钥的密钥分配问题
2. 对数字签名的要求

公钥与私钥<font style="color:#DF2A3F;">区别</font>：

1. 公钥向公众公开
2. 私钥在本地存储，永久保密

### 使用场景
#### 加密传输
需求：A发保密消息给B，防止中间人窃听

A持有B的<font style="color:#DF2A3F;">公钥</font>，发送消息

B持有私钥，<font style="color:#DF2A3F;">只有自己</font>才能解密消息

#### 数字签名
需求：A发送文件，保证是A发的，没被篡改

A用<font style="color:#DF2A3F;">私钥加密</font>文件（签名）

接收方用A的公钥<font style="color:#DF2A3F;">解密签名</font>，进行比对
