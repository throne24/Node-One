---
title: git核心概念和命令
date: 2026-10-30
description: git实战笔记：环境配置、暂存与提交、分支管理、远程仓库操作与GitHub Flow协作流程
---
# git
##  git核心概念和命令
### 配置
配置命令

```git
git config -l    #查看当前生效的所有配置  ->由很多的键值对组成
git config 键    #查看当前生效的某个配置的值
git config --范围 键"值" #更新配置
```

#### 配置范围
+ worktree：仅对当前工作树生效
+ local：【常见】【默认】仅对<font style="color:#DF2A3F;">当前</font>仓库有效
+ global：【常见】对当前用户的<font style="color:#DF2A3F;">所有</font>仓库有效
+ system：对所有用户有效

优先级从高到低：local > global

#### 常见配置
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781268033315-2e274c50-dcc3-461b-981b-084565ca3441.png" width="491" title="" crop="0,0,1,1" id="u8a6c2ed3" class="ne-image">

#### 初始化
要对一个目录使用git进行版本管理，必须先将该目录设置为git仓库

使用<font style="color:#DF2A3F;">git init</font> 命令初始化一个仓库

该命令会在当前目录下创建一个.git目录，该目录就是git仓库，里面记录了仓库的所有信息。

#### gitignore文件
仓库中某些文件是【个人专属】，不会在团队中共享，可以使用.gitignore 文件将不需要的文件排除

### 暂存和提交
#### 核心概念
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781363794004-04587a2f-2890-4104-bf71-f896dd1e5450.png" width="766" title="" crop="0,0,1,1" id="u01841c3e" class="ne-image">

什么是提交？->每一次快照，称为一次提交

<font style="color:#DF2A3F;">什么时候</font>进行提交？每完成一个子功能点就应该提交->这样记录的功能就非常详细

#### 如何提交
提交分为两步：

1. 【可选】查看<font style="color:#DF2A3F;">当前状态</font>

```git
git status
```

2. 将改动<font style="color:#DF2A3F;">暂存起来</font>

为什么要暂存？正式提交前的准备

```git
git add <file1> <file2>
git add . //暂存当前文件夹所有文件
```

3. 将暂存的内容一起<font style="color:#DF2A3F;">提交</font>

```git
git commit
```

术语：

1. 工作区：包含真实文件
2. 暂存区：包含暂存的文件

#### 提交消息规范
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781520334067-7da68bee-e24f-4eb2-a88a-c37ed362a38b.png" width="685.5" title="" crop="0,0,1,1" id="u17bc5fd1" class="ne-image">

#### 提交消息修改
```git
git commit --amend
```

该命令通常用于修改<font style="color:#DF2A3F;">最新</font>的提交消息

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781524497824-5c7b1b84-b166-4621-99bd-d4e5ff261423.png" width="709" title="" crop="0,0,1,1" id="u484175d3" class="ne-image">

#### 回滚某个提交
```git
git restore --source 提交id  #将指定的提交覆盖到当前工作区根目录
```

使用上述命令时，要确保工作区<font style="color:#DF2A3F;">干净</font>（暂存区没东西，工作区无更改）

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781524828038-7931bb1a-9aff-475a-aa8b-6a66c2127213.png" width="750.5" title="" crop="0,0,1,1" id="uc4e23283" class="ne-image">

### 分支管理
什么是分支？

提交：一次提交相当于给整个目录做一个快照

<font style="color:#DF2A3F;">分支</font>实际上存了快照的地址，找到了某一个分支，实际上是找到了某一个快照

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1781707367694-d25454f5-12db-46ae-a764-a8290246e0d2.png" width="423" title="" crop="0,0,1,1" id="uf019684f" class="ne-image">

HEAD指针：指示当前这个工程，<font style="color:#DF2A3F;">目前</font>在哪个快照里面

HEAD指向一个分支



分支基本操作

1. 查看分支

```git
git branch
```

2. 分支重命名

```git
git branch -m <new-name>          #重命名当前分支
git branch -m <old-name><new-name>#重命名指定分支
```

3. 创建分支

```git
git branch <branch-name>              #创建一个新分支，指针和当前分支相同
git branch <branch-name> <commit-hash>#创建一个新的分支，指针指向指定的提交
```

4. 切换分支

```git
git switch <branch-name>
git switch -

```

5. 删除分支

```git
git branch -d <branch-name>
```

#### 分支基本生命周期
永远<font style="color:#DF2A3F;">不能在主分支</font>上直接改动，主分支永远保证功能完整可用，可部署

1. 新需求
2. 新建分支

```git
git switch -c 分支名
```

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782348464685-39a128e5-57ab-4560-b76d-a50ef8f475bb.png" width="493.5" title="" crop="0,0,1,1" id="u921c0385" class="ne-image">

3. 在分支上开发测试
4. 合并到主分支

```git
git merge 分支名   
```

5. 主分支测试/部署
6. 删除开发分支

```git
git branch -D 分支名
```

##### 分支常见问题
###### 如何保留现场
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782349731782-7fea525d-3fb2-49fc-839f-5c87f261dec9.png" width="702" title="" crop="0,0,1,1" id="u12eb0854" class="ne-image">

###### 如何解决冲突
### 远程仓库
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782446584362-679c70b4-52c0-40c1-8840-29d9c65e9d82.png" width="629.5" title="" crop="0,0,1,1" id="u8e7aa539" class="ne-image">

SSH:是加密的远程登录协议，<font style="color:#DF2A3F;">免密</font>登录

#### SSH连接通道配置
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782447590585-5375462f-8756-4843-a8c3-019b69dc8dfd.png" width="725" title="" crop="0,0,1,1" id="ud20585c8" class="ne-image">

##### 本地生成<font style="color:#DF2A3F;">密钥对</font>
把<font style="color:#DF2A3F;">私钥</font>放在本地，把<font style="color:#DF2A3F;">公钥</font>放在服务器上

##### 配置密钥配对规则
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1782489167305-0d979ab5-0de5-4fb7-b7b1-0054c9646cb0.png" width="569" title="" crop="0,0,1,1" id="u873a6cea" class="ne-image">

问题 -> 本地电脑可能要连各种各样的服务器（远程仓库）

->只需要一个密钥对就能连接不同的服务器（<font style="color:#DF2A3F;">一个公钥</font>放<font style="color:#DF2A3F;">不同服务器</font>）

->但是如果在<font style="color:#DF2A3F;">同一个服务器</font>上，要使用<font style="color:#DF2A3F;">不同的账号</font>，那么需要用到<font style="color:#DF2A3F;">不同的公钥</font>

##### <font style="color:#DF2A3F;">SSH config配置规则</font>
写多少个配置？有多少条连线就写多少个规则

```java
Host a                  //当连接到git@a时，进行的规则匹配,只是一个标识，可以灵活处理
    Hostname github.com //实际上链接发出的主机
    IdentityFile ~/.ssh/throne24_github_key//使用的私钥文件
    User git            //固定写法
```

```java
张三
公司：github(管理员) github(个人)
gitlab

密钥对：pub1 key1 pub2 key2
github(管理员)：pub1
github(个人)：pub2
gitlab:pub2       
```

#### 仓库和别名
要和远程仓库同步，首先得有远程仓库

1. 在github创建远程仓库
2. 在本地仓库中添加远程仓库的别名

别名常见操作

```git
git remote add 远程仓库别名 远程仓库ssh地址 #为远程仓库添加别名
git remote rename 原别名 新别名            #修改别名

#查看当前远程仓库别名
git remote    #简要信息
git remote -v #详细信息
```

#### 分支同步
同步是<font style="color:#DF2A3F;">本地分支</font>和<font style="color:#DF2A3F;">远程分支</font>进行的同步

推送到远程分支后，会在本地建立一个跟踪分支

##### Push命令
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1783824580855-6c58cdb1-cc14-4426-a11a-46b4be4b0dae.png" width="402.5" title="" crop="0,0,1,1" id="ud9911d24" class="ne-image">

```git
git push -u 远程仓库别名 本地分支名
```

<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1783824297080-55c1555b-48f3-41b4-92d5-f4273f695ee6.png" width="500.5" title="" crop="0,0,1,1" id="u3f1c8534" class="ne-image">

##### pull命令
<img src="https://cdn.nlark.com/yuque/0/2026/png/63727762/1783824567175-3a282ca8-222e-458a-8195-6d6b40d1e0c2.png" width="381" title="" crop="0,0,1,1" id="uc4552277" class="ne-image">

1. git fetch

```git
git fetch 远程仓库别名 远程分支名
```

先把远程<font style="color:#DF2A3F;">最新提交</font>，下载到本地跟踪分支上

2. git merge 合并分支

```git
git merge 本地跟踪分支名
```

再手动执行合并

3. 可以使用pull代替上两步

```git
git pull 远程仓库别名 远程分支名
```

拉完分支后，直接合并

##### 克隆操作
当本地没有工程时，可以使用git clone快速拉取远程仓库

```git
git clone [-b 分支名] 远程仓库地址 [想要保存的文件夹]
```

#### 同步的三种情况
1. 远程快进
2. 本地快进
3. 解决冲突

总结

1. 正常推送拉取，没问题什么也不管
2. 推送报错，进入第三步
3. 拉取有冲突，解决冲突重新提交，然后进入第二步

### github flow
开发者规范

1. main分支只读
2. 基于最新提交开发

管理员规范

1. main分支只能通过PR修改
2. PR永远无冲突



PR：pull request

请求管理员拉取<font style="color:#DF2A3F;">新分支</font>的代码到<font style="color:#DF2A3F;">主分支</font>
