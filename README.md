# m-build

现在的前端开发因为node的加入，开发模式发生巨大的变化。以前所见即所得，现在大部分的需要编译合并压缩混淆，如何让代码变得可维护，可高效的协同开发？

m-build是面向前端自动化开发工具。主要解决多人开发，目录结构和代码的一致性可维护性，只需要你在config.js里面配置一下就可以选择自己的各种需求,适合安装一次不用多次安装通用型前端自动化脚手架。

##### m-build主要集成以下功能:

1.browser-snyc自动搭建本地开发环境，多端代码同步和刷新调试功能。

2.webpack模块化组件化开发功能。同时也支持rollup.js。

3.bable代码编译功能。ES6转ES5，react，vue的编译。

4.sass的代码编译功能以后会集成less

5.css,sass的REM的自动换算功能可以根据不同设计稿配置不一样的转换值。

6.art-template模板编译功能(此版本有问题需要后期改源码)


#### 环境安装
请去[node官网](https://nodejs.org/en/) 安装 V6.0.0 以上版本，搭建环境

#### 安装
window安装

```
	npm install -g gulp-cli m-build
```
mac 安装

```
	sudo npm install -g gulp-cli m-build
```

安装完成以后你的电脑会有 m 命令，命令如下:

```
	m -h

		Usage: m [options]

	Options:
		-h, --help		output usage information
		-v,--version		output the version number
		--creat [h5|m]		创建目录目录结构
		--run [value]		开启服务
		--pack			打包
```
#### 初始化
进入目录

第一步:初始化目录和配置文件

```
	m creat
		默认 h5
		可选 m
```
创建的目录结构如下

```

	creat-project
	└── node_modules
		│
		projectName
		├── pageName
		│    ├── src
		│    │   ├── css
		│    │   ├── jss
		│    │   ├── i
		│    │   ├── sass
		│    |   ├── temp
		│    │   └── index.html
		│    ├── build
		│    │   ├── css
		│    │   ├── i
		│    │   ├── js
		│    │   └── index.html
		│    └── config.js
		├── package.json
		└── gulpfile.js

```

第二步：下载项目需要的包依赖

```
	npm install
```

#### 开启服务
 
```
	m run  或者用 gulp
```

开启服务以后会自动启动browser-snyc，sass编译监听，css编译监听，js打包监听，html压缩监听

#### 项目打包

``` 
 	m pack 或者用 gulp pack
```
