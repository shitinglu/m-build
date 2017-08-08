# m-build

现在的前端开发因为node的加入，开发模式发生巨大的变化。以前所见即所得，现在大部分的需要编译合并压缩混淆，如何让代码变得可维护，可高效的协同开发？

m-build是面向前端自动化开发工具。主要解决多人开发，目录结构和代码的一致性可维护性，只需要你在config.js里面配置一下就可以选择自己的各种需求,适合安装一次不用多次安装通用型前端自动化脚手架。

##### m-build主要集成以下功能:

1. browser-snyc自动搭建本地开发环境，多端代码同步和刷新调试功能。

2. webpack模块化组件化开发功能。同时也支持rollup.js。

3. bable代码编译功能。ES6转ES5的编译。

4. react,vue的编译功能

5. sass的代码编译功能以后会集成less

6. css,sass的REM的自动换算功能可以根据不同设计稿配置不一样的转换值。

7. art-template模板编译功能


#### 环境安装
请去[node官网](https://nodejs.org/en/) 安装 V6.0.0 以上版本，搭建环境

#### 安装
window安装

``` bash
npm install -g gulp-cli m-build
```
mac 安装

``` bash
sudo npm install -g gulp-cli m-build
```

安装完成以后你的电脑会有 m 命令，命令如下:

```
m -h

	Usage: m [options]

Options:
	-h, --help		output usage information
	-v,--version		output the version number
	--init [h5|m]		创建目录目录结构
	--run        		开启服务
	--compile           编译所有文件
	--pack			    打包到线上环境
```
#### 初始化
进入目录

第一步:初始化目录和配置文件

``` bash
m init
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

``` bash
npm install
```

#### 开启服务

```
m run  或者用 gulp
```

> 开启服务以后会自动启动browser-snyc，sass编译监听，css编译监听，js打包监听，html压缩监听等功能...

#### 项目全部编译
```
 m compile 或者用 gulp cmopile
```
> 对src目录下所有js,sass,css,images,template,vm 进行编译，并输出到dist目录的对应子目录

#### 项目打包

```
 m pack 或者用 gulp pack
```
> 对dist目录下的js,css,html,tempate,vm进行压缩合并输出到build目录


---


#### 单个模块监听功能

- 开启服务

```
gulp  server
```
> 监听dist目录所有目录文件。如果dist目录发生改变会刷新页面。同时开启多端同步和调试服务。

- js文件编译监听

```
gulp  jsWatch
```
> 监听src目录下的js目录的`entry*.js`文件编译打包。编译以后的文件输出到同级目录下的的dist目录下的js目录。

- js文件移动监听

```
gulp  jsLabWatch
```
> 监听src目录下的js-lab目录的`*.js`文件。新增和改动的文件文件输出到同级目录下的的dist目录下的js目录。

- sass编译监听

```
gulp  sassWatch
```
> 监听src目录下的sass目录的`*.scss`文件的编译。编译以后的文件输出到同级目录下的的dist目录下的css目录

- css编译监听

```
gulp  cssWatch
```
> 监听src目录下的css目录的`*.css`文件的编译。编译以后的文件输出到同级目录下的的dist目录下的css目录

- html压缩监听

```
gulp  htmlWatch
```
> 监听src目录的`*.html`文件的压缩。压缩以后的文件输出到同级目录下的的dist目录

- 图片监听

```
gulp  imgWatch
```
> 监听src目录下的i目录的`*.png|jpg|gif`文件。压缩以后的文件输出到同级目录下的的dist目录下的i目录

- 模板编译监听

```
gulp  tempWacth
```
> 监听src目录下的temp目录的`*.html`文件对文件进行编译。编译以后的文件输出到同级目录的dist目录下的js目录



---


#### 单个模块编译功能
- js文件编译

```
gulp  jsCompile
```
> 对src目录下的js目录的`entry*.js`文件编译打包。编译以后的文件输出到同级目录下的的dist目录下的js目录。

- sass编译

```
gulp  sassCompile
```
> 对src目录下的sass目录的`*.scss`文件的编译。编译以后的文件输出到同级目录下的的dist目录下的css目录

- css编译

```
gulp  cssCompile
```
> 对src目录下的css目录的`*.css`文件的编译。编译以后的文件输出到同级目录下的的dist目录下的css目录

- html压缩

```
gulp  htmlCompile
```
> 对src目录的`*.html`文件的压缩。压缩以后的文件输出到同级目录下的的dist目录

- 图片处理

```
gulp  imgCompile
```
> 对src目录下的i目录的`*.png|jpg|gif`文件。压缩以后的文件输出到同级目录下的的dist目录下的i目录

- 模板编译

```
gulp  tempCompile
```
> 对src目录下的temp目录的`*.html`文件对文件进行编译。编译以后的文件输出到同级目录的dist目录下的js目录


---

#### 单个模块打包功能
- js文件打包

```
gulp  jsPack
```
> 对dist目录下的js目录的`*.js`文件压缩混淆打包。编译以后的文件输出到同级目录下的的build目录下的js目录。


- css编译

```
gulp  cssPack
```
> 对src目录下的css目录的`*.css`文件压缩混淆。编译以后的文件输出到同级目录下的的build目录下的css目录

- html压缩

```
gulp  htmlPack
```
> 对dist目录的`*.html`文件的压缩。压缩以后的文件输出到同级目录下的的build目录

- 图片处理

```
gulp  imgPack
```
> 对dist目录下的i目录的`*.png|jpg|gif`文件。压缩以后的文件输出到同级目录下的的build目录下的i目录




##### 未完待续后续功能还在继续开发.........
