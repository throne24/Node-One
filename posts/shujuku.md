---
title: 数据库系统概述
date: 2026-10-30
description: 数据库系统笔记：系统概述与数据模型（E-R图）、关系模型与关系代数、SQL数据定义/更新/查询、关系数据理论（函数依赖与规范化）
---
# 数据库系统概述
## 数据库系统概述

### 数据库系统概述
#### 四个基本概念
+ 数据

数据库中存储的<font style="color:#DF2A3F;">基本对象</font>

+ 数据库（DB）

是<font style="color:#DF2A3F;">长期存储</font>在计算机内，<font style="color:#DF2A3F;">有组织</font>的，<font style="color:#DF2A3F;">可共享</font>的大量数据的集合

+ 数据库管理系统（DBMS)

用户与操作系统之间的一层<font style="color:#DF2A3F;">数据管理软件</font>；

组织和存储数据，高效地获取和维护数据；提供数据定义语言（DDL）定义数据库中的数据对象；提供数据操纵语言（DML）实现数据库的基本操作（查询，插入，删除，修改）

+ 数据库系统（DBS）

数据库+数据库管理系统+应用程序+数据库管理员（DBA）

### 数据模型
#### 数据建模
数据模型分为<font style="color:#DF2A3F;">两类</font>

1. <font style="color:#DF2A3F;">概念</font>模型

也称信息模型，它是按<font style="color:#DF2A3F;">用户的观点</font>来对数据和信息建模，用于数据库设计

2. <font style="color:#DF2A3F;">逻辑</font>模型和<font style="color:#DF2A3F;">物理</font>模型

逻辑模型主要包括网状模型，层次模型，关系模型。按<font style="color:#DF2A3F;">计算机系统</font>的观点对数据建模，用于DBMS实现。

物理模型描述数据在<font style="color:#DF2A3F;">系统内部的</font>表示方法和存取方式。

数据建模的<font style="color:#DF2A3F;">两步</font>

1. 把现实世界抽象为信息世界

也就是现实世界中的客观对象抽象为某一种信息结构。

2. 将概念模型转换为数据模型

将信息世界转换为机器世界，即把概念模型转换为计算机上某一数据库管理系统支持的数据模型。

#### 概念模型
##### 概念模型的用途
用于信息世界的<font style="color:#DF2A3F;">建模</font>

是现实世界到机器世界的一个中间层次

##### 信息世界中的基本概念
1. 实体（Entity）

<font style="color:#DF2A3F;">客观存在</font>并可<font style="color:#DF2A3F;">相互区分</font>的事物称为实体。可以是具体的人，事或抽象的概念。

如一个学生

2. 属性（Attribute）

实体具有的<font style="color:#DF2A3F;">某一特性</font>称为属性。一个实体可由若干个属性来刻画。

“学生实体”可由“学号”“性别”来描述

3. 码（Key）

<font style="color:#DF2A3F;">唯一</font>标识实体的<font style="color:#DF2A3F;">属性集</font>称为码。

如“学号”是“学生”实体的码

4. 域（Domain）

<font style="color:#DF2A3F;">属性的取值范围</font>称为该属性的域。

5. 实体类型（Entity Type）

用<font style="color:#DF2A3F;">实体名</font>及其<font style="color:#DF2A3F;">属性名集合</font>来抽象和刻画同类实体称为实体型

如学生(学号，姓名，性别，年龄)

6. 实体集

同型实体的集合称为实体集

如全体学生就是一个实体集

7. 联系

现实世界中事物内部以及事物之间的联系

实体之间的联系有<font style="color:#DF2A3F;">一对一</font>，<font style="color:#DF2A3F;">一对多</font>和<font style="color:#DF2A3F;">多对多</font>等多种类型

##### 概念模型的一种表示方法 实体-联系模型
常用的方法：实体-联系模型，简称<font style="color:#DF2A3F;">E-R模型</font>

该方法用E-R图来描述现实世界的概念模型

实体型：用<font style="color:#DF2A3F;">矩形</font>表示，矩形框内写明实体名

属性：用<font style="color:#DF2A3F;">椭圆型</font>表示

联系：用<font style="color:#DF2A3F;">菱形</font>表示

#### 数据模型的三要素
##### 数据结构
数据结构是描述数据库的<font style="color:#DF2A3F;">组成对象</font>以及<font style="color:#DF2A3F;">对象之间</font>的<font style="color:#DF2A3F;">联系</font>

##### 数据操纵
是指对数据库中各种对象的实例允许执行的操作的集合，包括<font style="color:#DF2A3F;">操作</font>及有关的<font style="color:#DF2A3F;">操作规则</font>

数据库主要有<font style="color:#DF2A3F;">查询和更新</font>两大类操作

##### 完整性约束
完整性约束是一组完整性规则。

#### 层次模型
用<font style="color:#DF2A3F;">树形结构</font>来表示各类实体以及实体间的联系

#### 网状模型
用<font style="color:#DF2A3F;">图结构</font>

#### 关系模型
##### 关系模型的数据结构
从用户观点看，关系模型中数据的<font style="color:#DF2A3F;">逻辑结构</font>是一张<font style="color:#DF2A3F;">二维表</font>，它由行和列组成

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782568153945-2e7f3b84-2c72-44ab-b254-7e4f92568849.png" width="793" title="" crop="0,0,1,1" id="uf4e0d562" class="ne-image">

关系：一个关系对应一张<font style="color:#DF2A3F;">二维表</font>

元组：<font style="color:#DF2A3F;">一行</font>为一个元组

属性：<font style="color:#DF2A3F;">一列</font>为一个属性

主码：<font style="color:#DF2A3F;">唯一</font>确定一个元组，如学号

域：属性的取值范围

分量：元组中的一个属性值

## 第二章 关系模型
### 关系数据结构及其形式化定义
#### 关系
##### 域
是<font style="color:#DF2A3F;">一组</font>具有相同<font style="color:#DF2A3F;">数据类型</font>的值的集合

##### 笛卡尔积
给定一组域D1 D2 Dn，允许某些域是相同的

那么D1 D2 Dn的笛卡尔积为

D1*D2*Dn = &#123;（d1,d2,dn）&#125;

每一个元素（d1,d2,dn）称为一个<font style="color:#DF2A3F;">元组</font>，元组中的每一个值称为一个<font style="color:#DF2A3F;">分量</font>

基数：一个域允许的不同取值个数

笛卡尔积可表示为一个<font style="color:#DF2A3F;">二维表</font>

##### 关系
D1，D2，Dn的笛卡尔积的<font style="color:#DF2A3F;">子集</font>称为这组域上的<font style="color:#DF2A3F;">关系</font>

表示为R（D1，D2，Dn）

->R：关系名 n:关系的<font style="color:#DF2A3F;">目</font>或<font style="color:#DF2A3F;">度</font>

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782613509088-e5e3554f-dc3b-453c-bf32-55f36d6f0b5c.png" width="473" title="" crop="0,0,1,1" id="u14da5c3b" class="ne-image">

###### 关系的表示
关系也是一个二维表

->一<font style="color:#DF2A3F;">行</font>对应一个<font style="color:#DF2A3F;">元组</font>，一<font style="color:#DF2A3F;">列</font>对应一个<font style="color:#DF2A3F;">域</font>

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782613623695-767cd1bc-12bf-4126-a97c-f0ff69079c06.png" width="874.5" title="" crop="0,0,1,1" id="u6e57689f" class="ne-image">

###### 属性
关系中不同列可以对应相同的域，要加以区分

->每一列起一个名字，称为<font style="color:#DF2A3F;">属性</font>

n目关系必有n个属性

###### 码
候选码：若关系中某一属性组的<font style="color:#DF2A3F;">值</font>能<font style="color:#DF2A3F;">唯一</font>地标识一个元组，则称<font style="color:#DF2A3F;">该属性组</font>为候选码

全码->关系模式的所有属性组都是候选码

主码：若一个关系有多个候选码，则选定其中一个为<font style="color:#DF2A3F;">主码</font>

###### 三类关系
基本关系：实际存在的表，是实际存储数据的逻辑表示

查询表：查询结果对应的表

视图表：由基本表导出的表，是虚表，不对应实际存储的数据

##### 关系模式
关系模式是什么？

->关系模式是型，关系是值

->关系模式是对关系的描述

关系模式的表示

-><font style="color:#DF2A3F;">R（U，D，dom，F）</font>

R：关系名

U：组成该关系的属性名集合

D：属性组U中属性所来自的域

dom：属性向域的映象集合（属性的类型 长度）

关系模式可以简记为：

R（U）或R（A1，A2，A3）

### 关系操作
#### 基本的关系操作
常用的关系操作包括<font style="color:#DF2A3F;">查询操</font>作和<font style="color:#DF2A3F;">更新操作</font>两部分

查询操作（主要）：选择，投影，连接，除，并，差，交，笛卡尔积

关系操作的特点：操作的对象和结果都是集合

#### 关系数据语言的分类
##### 关系代数语言
用对关系的运算来表达查询要求

##### 关系演算语言
元组关系演算语言：APLHA

域关系演算语言

##### 结构化查询语言（SQL）
### 关系的完整性
关系模式的<font style="color:#DF2A3F;">完整性约束</font>是对关系的某种<font style="color:#DF2A3F;">约束条件</font>

#### 实体完整性
<font style="color:#DF2A3F;">主键</font>不能取空值，不能重复

表无重复元组

#### 参照完整性
##### 关系间的引用
在关系模型中，实体与实体间的联系都是用关系来描述的，因此可能存在着<font style="color:#DF2A3F;">关系与关系</font>之间的<font style="color:#DF2A3F;">引用</font>

##### 外码
设有两张表，主表，从表

从表中的一个/一组属性，引用主表的主键，这个属性称为外键

说明

+ 主码和对应外码必须定义在同一个域上
+ 外码不一定与主码同名

##### 参照完整性约束
<font style="color:#DF2A3F;">外键</font>的值，要么等于主表<font style="color:#DF2A3F;">主键值</font>，要么为<font style="color:#DF2A3F;">空</font>

### 关系代数
符号约定

R,S：关系

t：元组（一行）

A：属性（一列）

σ：选择

<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">π：投影</font>

#### 传统的集合运算
##### 并
<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">R∪S</font>

<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">由属于R或属于S的元组组成</font>

##### <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">差</font>
<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">R−S</font>

<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">由属于R，不属于S的元组组成</font>

##### <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">交</font>
<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">R∩S = R - (R-S)</font>

<font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">取出既属于R，又属于S的元组</font>

##### <font style="color:rgb(0, 0, 0);background-color:rgba(0, 0, 0, 0);">笛卡尔积</font>
把R的每一行和S的每一行连接起来

若R有n行，S有m行，结果共有n*m行

#### 专门的关系运算
##### 选择（筛选行）
符号：σ

作用：保留满足条件的<font style="color:#DF2A3F;">行</font>

<font style="color:#DF2A3F;">σ</font><sub><font style="color:#DF2A3F;">条件</font></sub><font style="color:#DF2A3F;">（R）</font>

条件：是一个逻辑表达式 基本形式为 X<sub>1</sub>θY<sub>1</sub>

θ是比较运算符<,>等

σ<sub>年龄>18</sub>（Student）->查询所有大于18岁的学生

##### 投影（筛选列）
Π<sub>A</sub>（R）

只提取<font style="color:#DF2A3F;">指定的列</font>，自动删除重复行

##### 连接
###### 等值连接
θ为“=”的连接运算

R⋈ <sub>A=B</sub>S

->R的A列 = S的B列，只保留匹配成功的行

###### 自然连接
R ⋈  S

把重复列去掉

###### 外连接
###### 左外连接
保留R全部行，无匹配S字段填NULL

###### 右外连接
保留S全部行

###### 全外连接
两边所有行都保留

##### 除运算
适用场景：查询“全部满足某条件”

例：查询选修了所有课程的学生

定义：R÷S

结果元组：所有能和S每一行匹配的R左侧属性

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782723025386-a70aaf97-4e2d-4027-a585-6f41ac701ed9.png" width="610" title="" crop="0,0,1,1" id="ueb49d071" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782723038419-a7db7efb-3a06-406b-b53c-a1fd173f052d.png" width="610" title="" crop="0,0,1,1" id="u0af2761f" class="ne-image">

## 第三章 关系数据库标准语言SQL
### SQL概述
#### SQL三层模式对应关系
外模式：视图，部分基本表

模式：基本表

内模式：存储文件

#### SQL四大组成
1. DDL<font style="color:#DF2A3F;">数据定义</font>：用于定义SQL模式，基本表，视图，索引等结构
2. DML<font style="color:#DF2A3F;">数据操纵</font>：查询+插入/删除/修改
3. DCL<font style="color:#DF2A3F;">数据控制</font>：对基本表的和视图的授权，完整性规则的描述，事物控制等
4. 嵌入式SQL

#### SQL五大特点
1. 综合统一
2. 高度非过程化
3. 面向集合操作
4. 语言简洁
5. 以同一种语法结构提供两种使用方法（独立交互式，嵌入式）

### 数据定义
#### 数据库模式创建与删除
创建：CREATE SCHEMA [<模式名>] AUTHORIZATION <用户名>；

删除：DROP SCHEMA <模式名> <CASCADE|RESTRICT>

CASCADE：连带内部所有表，视图一起删

RESTRICT：内部有对象则禁止删除

两者<font style="color:#DF2A3F;">必选其一</font>

#### 基本表的定义，删除与修改
##### 建表
CREATE TABLE <表名>(<列名><数据类型>[列级完整性约束]...[,<表级完整性约束>])；

语法：列级约束+表级约束

+ 数据类型：字符型（CHAR(n),VARCHAR(n)），整形（INT,SAMLLINT,BIGINT）,小数（FLOAT,DECIMAL）,日期（DATE，TIME）
+ 列级约束：NOT NULL（非空值约束）,UNIQUE（唯一性约束）
+ 表级约束：PRIMARY KEY（主码约束）,FOREIGN KEY（外键参照完整性约束）

##### 修改表
ALTER TABLE<表名>

[ADD[COLUMN]<新列名><数据类型>[完整性约束]]

+ ADD：增加新列和新的完整性约束条件
+ MODIFY：用于修改列名和数据类型
+ DROP：删除完整性约束条件
+ RENAME COLUMN：用于修改列名

##### 删除基本表
DROP TABLE <表名>[RESTRICT|CASCADE]

#### 索引
##### 建立索引
CREATE INDEX

+ <次序>:指定索引值的升序（ASC），降序（DESC）
+ UNIQUE：表明此索引的每一个索引值只对应唯一的数据
+ CLUSTER：要建立的索引是聚簇索引

##### 修改索引
ALTER INDEX

##### 删除索引
DROP INDEX

### 数据更新 INSERT
#### 插入数据 INSERT
插入通常有两种形式，一种是插入一个元组，一种是插入子查询结果（可以插入多个元组）。

##### 插入一个元组
INSERT INTO<表名>[(<属性列1>[,<属性列2>])]

+ 指定要插入数据的表明和属性列
+ 若没有指定属性列：插入的元组在每个属性列中都要有值

VALUES（<常量1>[,<常量2>]);

+ 提供的值必须与INTO子句中值的<font style="color:#DF2A3F;">个数</font>和值的<font style="color:#DF2A3F;">类型</font>匹配

##### 插入子查询结果
INSERT INTO<表名>[(<属性列1>[,<属性列2>])]

```sql
INSERT INTO
```

子查询；

SELECT子句目标列必须与INTO子句中值的个数和值的类型匹配

约束校验：插入时自动检查实体，参照，用户定义完整性，违规拒绝插入

#### 修改
UPDATE <表名>

SET<列名>=<表达式>[,<列名>=<表达式>]

[WHERE<条件>]；

+ 其功能是修改表中满足WHERE子句条件的元组。
+ SET子句中<表达式>的值用于取代相应的属性列值

三种修改：修改一个元组；修改多个元组；带子查询的修改

#### 删除数据
DELETE FROM<表名>

[WHERE<条件>];

功能：删除指定表中满足WHERE条件的<font style="color:#DF2A3F;">元组</font>

### 数据查询SELECT
```sql
SELECT [ALL/DISTINCT] 目标列（指定要查询的属性列）
FROM                  表/视图（指定查询对象）
WHERE                 行过滤条件
GROUP BY              分组列（对查询结果按指定列分组）
HAVING                分组过滤条件（筛选出满足条件的组）
ORDER BY 排序列 ASC/DESC              
```

#### 单表查询
仅涉及一个表

##### 选择列
1. 查询指定列

```sql
SELECT Sno,Sname FROM Student;
```

2. 查询全部列 使用*

```sql
SELECT * FROM Student
```

3. 查询经过计算的值

目标可以是：算术表达式，字符串常量，函数，列别<font style="color:#DF2A3F;">名</font>

##### <font style="color:#DF2A3F;">选择若干元组</font>
1. <font style="color:#DF2A3F;">消除取值重复的行</font>

使用DISTINCT，若没有指定DISTINCT，则默认为ALL，即保留重复行

```sql
SELECT DISTINCT Sno FROM SC；
```

2. 查询<font style="color:#DF2A3F;">满足条件</font>的元组

通过<font style="color:#DF2A3F;">WHERE子</font>句实现

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782740063851-15acba14-60b7-4ffd-af38-9a1f6a8ac828.png" width="369.5" title="" crop="0,0,1,1" id="uccfb1a76" class="ne-image">

+ 比较大小：<>=
+ 确定范围：BETWEEN AND;NOT BETWEEN AND
+ 确定集合：IN/NOT IN
+ 字符串匹配：LIKE,%任意长度，_任意单个字符，ECSAPE转义%_
+ 涉及空值的查询：IS NULL/IS NOT NULL
+ 多条件AND,OR,

##### 对查询结果<font style="color:#DF2A3F;">排序</font>
ORDER BY子句：

+ 可以按一个或多个属性列排序
+ ASC为升序 DESC为降序

当排序列含空值：ASC最后显示，DESC最先显示

##### 集函数
为了增强检索功能，sql提供了许多聚集函数

只能用于SELECT HAVING，不能用作WHERE

```sql
COUNT (*)//统计行数
SUM/AVG/MAX/MIN//一列值的总和，平均数，最大数，最小数
```

##### GROUP BY 分组 + HAVING
+ GROUP BY：将查询结果按列分组，值相等的为一组
+ 若未对查询结果分组，集函数作用于整个查询结果
+ 分组后，将作用于每个组

HAVING：过滤分组结果，将满足指定条件的组输出

区分：GROUP BY过滤原始元组，HAVING 过滤分组结果

#### 连接查询
##### 等值/非等值查询
连接查询<font style="color:#DF2A3F;">WHERE</font>子句中用来<font style="color:#DF2A3F;">连接两个表</font>的条件称为<font style="color:#DF2A3F;">连接谓词</font>

在WHERE子句中，比较运算符使用“<font style="color:#DF2A3F;">=</font>”为<font style="color:#DF2A3F;">等值查询</font>，使用其他比较运算符为<font style="color:#DF2A3F;">非等值查询</font>

##### 自然连接
在WHERE子句中：

在等值连接基础上，去除<font style="color:#DF2A3F;">同名重复列</font>

##### 自身连接
一张表起<font style="color:#DF2A3F;">两个别名</font>，进行自关联

##### 外连接
+ 普通连接只输出满足连接条件的元组
+ 外连接以指定的表为连接主体，保留主表全部元组，不匹配字段填null
+ 在表名后面加外连接操作符（*）或（+）指定非主体表

##### 复合条件连接
多表连接+多个筛选条件

```sql
SELECT Student.Sno,Student,Sname,
FROM Student,SC
WHERE Student.Sno = SC.Sno.Sname AND
SC.Cno = '2' AND SC.GRADE > 90
```

#### 嵌套查询
嵌套查询分类

+ 不相关子查询：子查询独立，由内向外执行
+ 相关子查询：子查询的查询条件依赖父查询

四类子查询

1. IN子查询：子查询返回多值集合
2. 比较运算符子查询
3. ANY/ALL谓词
4. EXISTS/NOT EXISTS：返回布尔值，用于“全部，所有，不存在”，对应关系代数除运算

#### 集合查询
要求两个查询结果列数，对应类型一致

+ UNION并集：自动去重；UNION ALL 保留重复
+ INTERSECT 交集；EXCEPT 差集

### 视图
## 第六章 关系数据理论
### 问题的提出
#### 关系模式五元组简化
<font style="color:#DF2A3F;">关系模式</font>由五部分构成，即它是一个五元组：  
R（<font style="color:#DF2A3F;">U</font>，<font style="color:#DF2A3F;">F</font>）

R：关系名

U：组成该关系的<font style="color:#DF2A3F;">属性名</font>集合

F：属性间<font style="color:#DF2A3F;">数据依赖</font>集合

#### 数据依赖
属性间约束关系

分函数依赖FD，多值依赖MVD

Sname=f（sno），Sdept = f（sno）

Sname和Sdept<font style="color:#DF2A3F;">依赖于</font>sno，记为sno->Sname

### 规范化
#### 函数依赖
##### 定义
设R（U）是一个属性集U上的关系模式，X，Y是U的子集。若对于R（U）的任意一个可能关系r，r中不可能存在两个元组在X上的属性值相等，而在Y上的属性值不等，则称“X函数确定Y”，或“Y函数依赖于X”

X -> Y,x相同则y一定相同；x为决定因素

##### 平凡函数依赖与非平凡函数依赖
在关系模式R(U)中，对于U的子集X和Y

若X->Y，但Y<font style="color:#DF2A3F;">不属于</font>X，则X->Y为<font style="color:#DF2A3F;">非平凡的函数依赖</font>

若X->Y，但Y∈X，则X->Y为<font style="color:#DF2A3F;">平凡的函数依赖</font>（必然成立，不讨论）

若X->Y,Y->X，记作X<-->Y

##### 完全函数依赖与部分函数依赖
在关系模式R（U，F）中，如果X->Y，并且对于X的任何一个真子集X'

都有X’-/>Y（X子集不能决定Y），则称Y对X<font style="color:#DF2A3F;">完全函数依赖，</font>记作X<sup>f</sup>->Y

+ 完全函数依赖：对于Y，必须由X的全部子集共同决定，单一的子集不能决定Y
+ 如学生姓名和选修课程同时决定学生的成绩，但是单拿一个出来都不能决定

若X->Y，但Y不完全函数依赖于X，则称Y<font style="color:#DF2A3F;">部分函数依赖</font>于X，记作X<sup>p</sup>->Y

##### 传递函数依赖
在R（U）中，如果X->Y（Y不属于X），Y-/>X,Y->Z，Z不属于Y，则称Z对X传递函数依赖。

记为X-<sup>传递</sup>>Z

##### 多值依赖
在关系模式R（U）中，X,Y,Z是U的子集，并且Z = U-X-Y，当且仅当对R（U）的任何一个关系，给定一对（x，z）值，有一组Y的值，这组值仅仅决定于x值而与z值无关，则称“Y多值依赖于X”

如：参考书目（课程，教师，参考书）

课程->->参考书

#### 码
候选码，主码，外码

<font style="color:#DF2A3F;">候选码K</font>：K能函数决定全部属性U

设K为R（U,F）中的属性的组合，若K->U，且对于K的任何一个真子集K',都有K'不能决定U，则K为R的<font style="color:#DF2A3F;">候选码</font>，

->若有多个候选码，则选一个作为<font style="color:#DF2A3F;">主码</font>

<font style="color:#DF2A3F;">主属性</font>：出现在任意候选码中的属性

<font style="color:#DF2A3F;">非主属性</font>：不在任意候选码里

#### 范式
范式是符合<font style="color:#DF2A3F;">某一种级别</font>的关系模式的集合

##### 第一范式（1NF）
若关系模式R的<font style="color:#DF2A3F;">每一个分量</font>是<font style="color:#DF2A3F;">不可再分</font>的数据项，则关系模式R属于第一范式。

->记为R∈1NF

##### 第二范式（2NF）
若关系模式R∈1NF，并且每一个<font style="color:#DF2A3F;">非主属性</font>都<font style="color:#DF2A3F;">完全依赖</font>于<font style="color:#DF2A3F;">任何一个</font>候选码，则R∈2NF

当1NF<font style="color:#DF2A3F;">消除</font>了非主属性对码的<font style="color:#DF2A3F;">部分函数依赖</font>，称为2NF

即解决部分依赖



候选码：能唯一标识的属性组合，本题为学号，课程号

->非主属性“姓名”，只依赖学号就能确定，不依赖于课程号，没实现第二范式

->拆分为两张表：

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782906065709-afaa0723-69eb-4342-aa67-93344c039ae7.png" width="754.5" title="" crop="0,0,1,1" id="u2c254410" class="ne-image">

##### 第三范式
在满足2NF的条件下，消除<font style="color:#DF2A3F;">非主属性</font>对<font style="color:#DF2A3F;">候选码</font>的<font style="color:#DF2A3F;">传递函数依赖</font>

即解决<font style="color:#DF2A3F;">传递依赖</font>

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782906956050-2242223d-1f91-4709-87b4-e12f0547100b.png" width="535.5" title="" crop="0,0,1,1" id="u24f4f4d5" class="ne-image">

学号->学院编号 学院编号->学院名称

存在函数<font style="color:#DF2A3F;">传递依赖</font>，不满足第三范式

##### BC范式（BCNF）
在满足3NF的前提下，消除<font style="color:#DF2A3F;">主属性</font>对码的部分依赖和传递函数依赖

每一个决定因素<font style="color:#DF2A3F;">X</font>都必须<font style="color:#DF2A3F;">包含候选码</font>

->包含候选码，不是<font style="color:#DF2A3F;">主属性</font>，主属性是候选码里的一部分

只要有X->Y，Y不包含X，<font style="color:#DF2A3F;">X一定是候选码</font>

##### 第四范式
R∈1NF，若对于R的每个非平凡多值依赖X->->Y，X必含有码，则满足第四范式

### 数据依赖的公理系统
逻辑蕴含：对于满足一组函数依赖F的关系模式R<U,F>

## 第七章 数据库设计
### 数据库设计概述
分为6个阶段

### 需求分析
就是分析用户的要求，是设计数据库的起点。

数据字典在需求分析阶段建立

<font style="color:#DF2A3F;">->数据字典</font>是关于数据库中<font style="color:#DF2A3F;">数据的描述</font>，即元数据，非数据本身

数据字典的<font style="color:#DF2A3F;">内容</font>:数据项，数据结构，数据流，数据存储，处理过程

1. 数据项：数据最小组成单位

数据项描述 = &#123;数据项名，数据项含义说明，别名，数据类型，长度，取值范围，取值含义，与其他数据项的逻辑关系，数据项之间的关系&#125;

2. 数据结构：由若干个数据项组成

数据结构描述 = &#123;数据结构名，含义说明，组成：&#123;数据项或数据结构&#125;&#125;

3. 数据流

是数据结构在系统内<font style="color:#DF2A3F;">传输的路径</font>

4. 数据存储

数据存储是数据结构停留或保存的地方

5. 处理过程

### 概念结构设计
将需求分析得到的<font style="color:#DF2A3F;">用户需求</font><font style="color:#ECAA04;">抽象</font>为<font style="color:#DF2A3F;">信息结构</font>，描述概念模型的工具为E-R图

ER图提供了表示实体型，属性和联系的方法

实体型：用矩形表示

属性：用椭圆形

联系：用菱形表示，框内写名联系名，与实体连接起来

### 逻辑结构设计
#### E-R图向关系模型的转换
做题步骤

1. 确定关系名：实体，m:n关系
2. 确定每个关系的属性
+ 实体：自己的属性+1端的主键
+ m:n关系：自己的属性+两边主键



### 物理结构设计
### 数据库实施与维护