var blue = '<span style="font-size: 15px;color: #4d7e84;">', endBlue = '</span><br/>';
var orange = '<span style="color: #ff5400;">', endOrange = '</span>';
var point = '<span style="font-size: 24px;">·</span> ';
var Nodejs = [
	{
		mainTitle: '1、模块化编程',
		content: [
			{
				title: '1.1初识模块化思想',
				content: [
					{
						text: `从生产角度来看，模块化是一种生产方式，体现了两个特点：<br/>
						1、生产效率高：<br/>${point}灵活架构，焦点分离；<br/>${point}多人协作互不干扰；<br/>
						${point}方便模块间组合、分解。<br/>
						2、维护成本低：<br/>${point}可分单元测试；<br/>${point}方便单个模块功能调试、升级。`
					},
					{
						text: `在JavaScript中我们其实已经遇到很多模块化的例子，如Date模块，Math模块等等。
						当某个模块出现问题时，我们只需要修改当前模块，而不影响其他模块的代码。`
					},
					{
						text: `${blue}非模块化开发${endBlue}
						在非模块化开发中我们可能会遇到以下问题：<br/>
						1.命名冲突（例如全局变量中名称重复报错）；<br/>
						2.文件依赖（如果没有引入或者是没有提前引入依赖文件，部分文件会不可用导致报错）。`
					},
					{
						text: `${orange}注意：在该站JavaScript分类中此单元有详细介绍，该书就不多作说明了。${endOrange}`
					}
				]
			}
		]
	},
	//第二章
	{
		mainTitle: '2、初识Node.js',
		content: [
			{
				title: '2.1Node.js概述',
				content: [
					{
						text: `${blue}2.1.1——学习Node.js的目的${endBlue}
						随着互联网的发展，全栈工程师的概念开始兴起，所谓全栈，即包括用户界面、业务逻辑、数据建模、
						服务器、网络及环境等。意味着全栈工程师要熟练处理各层间的交互。而现在，Node.js的出现，
						用JavaScript语言既可以进行客户端的开发，又可以进行服务器端的开发，还可以与数据库交互。`
					},
					{
						text: `${blue}2.1.2——客户端和服务端${endBlue}
						客户端和服务端是组成Web应用或网站必不可少的部分，客户端将用户请求发送给服务端，服务器端根据用户
						的请求进行逻辑处理、数据处理并将结果响应给客户端。现在我们可以用Node.js代替传统的服务器端语言。`
					},
					{
						text: `${blue}2.1.3——JavaScript在客户端和服务器端的区别${endBlue}
						JavaScript包括ECMAScript、DOM、BOM三个部分，具体如下：<br/>
						${point}ECMAScript是JavaScript的核心语法；<br/>
						${point}DOM是HTML和XML的应用程序接口（API），用于控制文档的内容和结构。<br/>
						${point}BOM（浏览器对象模型）可以对浏览器窗口进行访问和操作。<br/>
						客户端的JavaScript不仅应用核心语法，还会操作DOM和BOM，用于用户交互、动画特效、表单验证、Ajax请求
						等。而在服务器端，由特定的运行环境提供的JavaScript引擎解析执行，不操作DOM和BOM，常用于操作数据库
						、操作文件等。`
					}
				]
			},
			{
				title: '2.2Node.js简介',
				content: [
					{
						text: `${blue}2.2.1——Node.js概念${endBlue}
						Node.js是一个在服务器端可以解析和执行JavaScript代码的运行环境，也可以说是一个平台，
						仍使用JavaScript代码作为开发语言，但是提供了一些功能性的API，例如文件操作和网络通信API等。`
					},
					{
						text: `${blue}2.2.2——Node.js的特点和优势${endBlue}
						Node.js作为一门新兴的后台语言平台，具有以下特点：<br/>
						${point}它是一个JavaScript的运行环境：可以让JavaScript脱离浏览器，在服务端单独执行，
						如果客户端和服务器端使用相同的开发语言，可以在很大程度上达到客户端和服务器端代码的共用；<br/>
						${point}依赖于ChromeV8引擎进行代码解析：ChromeV8引擎负责在非浏览器解析环境下解析JavaScript代码
						；<br/>${point}${orange}事件驱动${endOrange}，对于事件驱动来说，在学习JavaScript的初级阶段，
						都会接触到事件，他们通常被绑定在某个页面元素上，为其指定事件处理函数，当事件被触发时才会执行相应的
						处理函数，这样的事件处理机制就是标准的事件驱动机制；<br/>
						${point}${orange}非阻塞I/O${endOrange}：提到非阻塞I/O，有必要了解一下阻塞I/O，
						阻塞I/O表示输入/输出操作，例如在文件读取过程中，需要等待文件读取完毕后才能继续执行操作，
						Node.js使用事件回调的方式来解决这个问题，避免了阻塞I/O的等待；<br/>
						${point}${orange}轻量、可伸缩，适于实时数据交互应用${endOrange}：在Node.js中，
						Socket可以实现双向通信，例如聊天室这种实时数据交互应用；<br/>
						${point}${orange}单线程、单进程${endOrange}：进程就是一个应用程序的一次执行过程，
						它是一个动态的概念；而线程是进程的一部分，进程包含多个线程在运行。单线程就是一个进程中只包含一个线程，
						阻塞I/O模式下一个线程只能处理一个任务，而非阻塞I/O模式下，一个线程永远在处理任务，CPU利用率是100%。
						${orange}Node.js采用单线程，利用事件驱动的异步编程模式，实现了非阻塞I/O/${endOrange}。`
					}
				]
			},
			{
				title: '2.3Node.js的安装和配置',
				content: [
					{
						text: `${blue}下载与安装${endBlue}
						Node.js的官方网址是<a href="https://nodejs.org">https://nodejs.org</a>，在首页可以看到
						两个版本的安装包，Current版本是最新版，LTS（long time support）长期支持版本，开发中一般选择
						LTS版本，较为稳定。单击下载即可，下载完成后点击安装包根据提示完成安装。`
					},
					{
						text: `安装完成后可以通过在git终端输入node -v字符来查看是否安装成功，此时，我们只能在node安装
						目录下找到node.exe，所以我们需要配置${orange}环境变量${endOrange}，使得在系统的任意目录下都
						可以使用node。具体步骤如下：<br/>
						${point}右击“计算机”，选择“属性”，选择“高级系统设置”；<br/>
						${point}在打开的“系统属性”对话框的“高级”选项卡中单击“环境变量”按钮；<br/>
						${point}在打开的“环境变量”对话框中找到“系统变量”中的“Path”；<br/>
						${point}单击“Path”，在后面可以看到node.exe的路径。`
					},
					{
						text: `${blue}快速体验node.js${endBlue}
						让我们来看看Node.js是如何执行js文件的，打开终端（推荐git），切换到js文件所在目录，
						使用命令“node target.js”，即可执行target.js文件，console.log输出会直接输出在终端界面。
						还可以用于构建一个Web程序，在网页中输出一些信息，我们创建一个main.js文件：`,
						src: require('@/assets/codeNodejs2.1.png')
					},
					{
						text: `我们在终端输入“node main.js”，在浏览器访问http://127.0.0.1:8080，则可以看到hello world
						字样。`
					}
				]
			},
			{
				title: '2.4Node.js基础入门',
				content: [
					{
						text: `${blue}2.4.1——REPL运行环境${endBlue}
						为了方便开发者调试JavaScript代码，Node.js提供了一个名为REPL的可交互运行环境，当输入JavaScript表达式，
						按下ENTER键后，REPL运行环境将显示表达式运行结果，等待继续输入。这种输入和显示结果的形式是循环的。`
					},
					{
						text: `在REPL运行环境中，可以解析JavaScript代码，执行变量和函数的相关操作，例如通过表达式
						对变量赋值、执行函数等。打开git，输入node按下ENTER，即可进入REPL环境，在终端将会显示REPL
						运行环境中命令提示符默认为“>”。<br/>
						输入“temp = itcast”，按下ENTER，REPL将显示结果为“itcast”。他还可以执行一些布尔类型的操作，
						如输入“1<2”，则会显示结果为“true”。下面是一些REPL常用命令的集合：`,
						src: require('@/assets/codeNodejs2.2.png')
					},
					{
						text: `此外，Chrome浏览器控制台的console就是一个REPL环境。`
					},
					{
						text: `${blue}2.4.2——global对象和模块作用域${endBlue}
						在Node.js中，默认就是模块化的，默认声明的变量，函数都属于当前文件模块，都是私有的，只有在当前
						模块作用域内才可使用，如果想在全局范围内定义一个变量，我们可以应用全局对象global。Node.js中的global
						对象类似于浏览器的window对象，用于定义全局命名空间，所有全局变量（除global之外）都是global的属性，
						在实际使用中可以省略global。我们简单看一个创建全局变量的例子：`,
						src: require('@/assets/codeNodejs2.3.png')
					},
					{
						text: `${blue}require(), exports, module.exports${endBlue}
						Node.js中，global对象可以解决文件模块之间的数据共享，但是如果在一个文件中直接给某个全局变量赋值，
						显得很突兀，容易污染全局变量命名空间和容易造成耦合问题。所以Node.js提供了一个简单的${orange}
						模块系统${endOrange}，其中exports是模块公开的接口，require()用于从外部获取一个模块的接口，
						即获取exports或者module.exports的对象。<br/>
						我们要注意require()函数括号内使用的是相对路径（如../module）。既然exports和module.exports
						都可以对外开放变量或者函数，那么它们的区别呢？<br/>
						exports是一个指向的module.exports的引用，module.exports初始值为一个空对象{}，所以exports初始值
						也是一个对象。但module.exports可以单独定义，返回数据类型，而exports只能是返回一个object对象。
						我们可以看一个例子更好理解他们的区别：`,
						src: require('@/assets/codeNodejs2.4.png')
					},
					{
						text: `${blue}2.4.3——全局可用变量、函数和对象${endBlue}
						在Node.js中提供了一些${orange}全局可用${endOrange}的变量、函数和对象，这里所谓的全局可用
						就是不需要进行模块加载就可以直接使用的，其中包括全局作用域的函数和对象。也包括另一种不在全局作用域，
						而是在每个模块作用域中都存在的变量、函数和对象，在全局可用，但不是global属性。例如require函数，
						它在每个模块作用域内都存在，所以不需要加载。`
					},
					{
						text: `_dirname、_filename、exports和module对象与require函数相似，都是存在每个模块作用域内，
						实际上并不是全局对象。`
					},
					{
						text: `Node.js提供了两个与文件操作相关的全局可用变量，${orange}_dirname和_filename${endOrange}
						。_dirname表示当前文件所在目录，_filename表示正在执行的脚本文件名，将输出文件所在绝对路径，
						且和命令行参数所指定的文件名不一定相同。如果在模块中，返回的值是模块文件的路径。`
					},
					{
						text: `要注意，所有要执行的代码中含有中文，都要讲文件编码保存为utf8格式，否则在执行时会出现乱码。
						在记事本中可以选择另存为来设置编码方式。`
					},
					{
						text: `在Node.js中，setTimeout()，clearTimeout()，setInterval()，clearInterval()，
						setImmediate(cb)（用于延迟调用cb函数。cb函数将在I/O事件回调之后，setTimeout和setInterval回调
						之前调用。setImmediate的返回值可以作为clearImmediate的参数。），clearImmediate()（用于停止触发
						回调函数）。都是Node.js中提供的全局函数。`
					},
					{
						text: `console对象，以下是console.log()之外的其他函数：`,
						src: require('@/assets/codeNodejs2.5.png')
					},
					{
						text: `${blue}2.4.5——require加载模块的规则${endBlue}
						Node.js中模块主要分为${orange}文件模块和核心模块${endOrange}。<br/>
						${point}文件模块，加载文件模块时，需要使用两种模块标识：“/”开头的，指向所属盘符根目录，
						“../或./”开头的相对路径。如require("./test.js"),require('../test.js'),require('/test.js')。
						可以省略后缀.js，他会查找后缀为json、js、node的文件。<br/>
						${point}核心模块，他是Node.js的心脏，由一些精简高效的库组成，为Node.js提供了基本的API。
						主要内容包括：<br/>
						1.全局对象；<br/>2.常用工具；<br/>3.事件机制；<br/>4.文件系统访问；<br/>5.HTTP服务器与客户端。
						由于Node.js的模块机制i，这些内置的核心模块被编译成二进制文件，保存在Node.js源码的lib文件夹下，
						本质上也是文件模块，但是加载方式上有所不同。核心模块标识是唯一的，加载时语法为require('模块标识')。
						Node.js核心模块中提供了一个OS核心模块，在该模块中提供了一些与操作系统相关的API，这里以Node.js中的
						OS模块为例来演示核心模块的加载：`,
						src: require('@/assets/codeNodejs2.6.png')
					},
					{
						text: `如果自己建立一个os.js文件，Node.js还是会优先加载os核心模块。`
					},
					{
						text: `${blue}2.4.6——模块的缓存${endBlue}
						在模块加载过程中，对于多次使用同一模块标识加载模块的情况，Node.js只会加载一次，这是由于第一次
						加载某个模块时，Node.js会缓存该模块，再次加载时则会从缓存（require.cache，可手动删除）中获取。
						在某些时候，我们不希望模块被缓存，则可以进行删除缓存操作：<br/>
						在不需要被缓存的模块中加上：${orange}delete require.cache[module.filename]${endOrange}。`
					}
				]
			}
		]
	},
	//第三章
	{
		mainTitle: '3、异步编程和包资源管理',
		content: [
			{
				title: '3.1异步编程',
				content: [
					{
						text: `${blue}3.1.1——同步和异步${endBlue}
						我们先看一个同步的例子：小明每天起床要吃早餐、背单词然后去上学，如果每件事按照顺序依次进行就是同步。
						过程就是：<br/>
						起床->背单词->吃早餐->去上学。<br/>
						同步代码中${orange}每行代码按顺序执行${endOrange}。<br/>
						而异步的过程就是：<br/>
						起床->背单词->边吃早餐边去上学。<br/>我们看下具体步骤：`,
						src: require('@/assets/codeNodejs3.1.png')
					},
					{
						text: `${blue}3.1.2——回调函数${endBlue}
						回调函数是指函数可以作为函数参数传递到另一个函数中去，然后被调用的形式，在Node.js中非常常用，
						典型的应用就是异步函数的异常处理。回调函数的设计中有三个约定：<br/>
						${point}函数名称通常是callback，在封装异步执行代码时，优先吧回调函数作为函数的最后一个参数出现。
						<br/>${point}把代码中的错误作为callback的第一个参数进行传递；<br/>
						${point}把真正返回的结果作为callback的第二个参数。<br/>
						${orange}注意：回调函数在站内JavaScript分栏中也有详细介绍。${endOrange}`
					}
				]
			},
			{
				title: '3.2Node.js的包和NPM',
				content: [
					{
						text: `Node.js中，会将某个独立的功能封装起来，用于发布、更新、依赖管理和进行版本控制。Node.js
						根据CommonJS规范实现了包机制，开发了NPM包管理工具，用来解决包的发布和获取需求。`
					},
					{
						text: `${blue}3.2.1——包的概念${endBlue}
						包和模块并没有本质的区别，包是在模块的基础上更进一步的组织JavaScript代码的目录。下面我们来看一下
						包和模块的关系：`,
						src: require('@/assets/codeNodejs3.2.png')
					},
					{
						text: `一个包中应该有一个出口模块，用于向外部开放接口，使用者只需要拿到出口模块，而不用关心包中
						其他内容。`
					},
					{
						text: `Node.js的包遵循CommonJS规范，目录结构如下：<br/>
						${orange}package.json${endOrange}：在顶层目录的包描述文件，说明文件<br/>
						${orange}bin${endOrange}：存放可执行二进制文件的目录<br/>
						${orange}lib${endOrange}：存放JavaScript文件的目录<br/>
						${orange}doc${endOrange}存放文件的目录<br/>
						${orange}test${endOrange}存放单元测试的目录<br/>`
					},
					{
						text: `${blue}3.2.2——NPM的概念${endBlue}
						在Node.js中有两种含义：一种含义是Node.js的开放模块登记和管理系统，是一个NPM网站，
						网址为：<a href="https://www.npmjs.com">https://www.npmjs.com</a>，该网站是全球最大的模块生态系统，
						所有包都通过Node.js实现，开源免费。<br/>
						另一个概念就是Node.js的包管理工具，一个命令行下的软件，提供一些命令用于快速安装和管理模块。常用命令有：<br/>
						${orange}npm init [-y]${endOrange}：初始化一个package.json文件<br/>
						${orange}npm install 包名${endOrange}：安装一个包<br/>
						${orange}npm install -save 包名${endOrange}：将安装的包添加到package.json的依赖中<br/>
						${orange}npm install -g 包名${endOrange}：安装一个命令行工具<br/>
						${orange}npm docs 包名${endOrange}：查看包的文档（很有用）<br/>
						${orange}npm root -g${endOrange}：查看全局包安装路径<br/>
						${orange}npm config set prefix "路径"${endOrange}：修改全局包安装路径<br/>
						${orange}npm list${endOrange}：查看当前目录下安装的所有包<br/>
						${orange}npm list -g${endOrange}：查看全局包的安装路径下所有的包<br/>
						${orange}npm uninstall 包名${endOrange}：卸载当前目录下的某个包<br/>
						${orange}npm uninstall -g 包名${endOrange}：卸载全局安装路径下的某个包<br/>
						${orange}npm update 包名${endOrange}更新当前目录下的某个包<br/>`
					},
					{
						text: `在Node.js中，node_modules目录是用于专门放置第三方包的，目录名和其中的内容都不可以修改。`
					},
					{
						text: `${blue}3.2.3——包模块加载规则${endBlue}
						在第2章中介绍过require()的加载规则，了解了核心模块和文件模块，在require()的加载规则中还有
						一个特殊的文件模块，叫作包模块。包模块既不是文件模块标识，也不是核心模块标识，也就是说当需要加载的模块名既不是路径，
						也不是内置模块名称时，就是包模块的名称。<br/>
						包模块的加载规则如下：<br/>
						${point}Node.js会默认把它当作核心模块去加载，如果标识不是核心模块，就会在当前目录的node_modules
						目录下寻找。如果没找到，Node.js会从当前目录的父目录的node_modules里面搜索，递归下去直到根目录。<br/>
						${point}如果找到了该标识名的子目录，Node.js将会找到该子目录下的package.json文件，获取该文件的main属性
						的值，根据main属性指定的路径值进行加载。这样做的好处是在用户使用第三方模块的时候，不用关心入口模块是哪个文件。`
					}
				]
			}
		]
	},
	//第四章
	{
		mainTitle: '4、文件操作',
		content: [
			{
				title: '4.1基本文件操作',
				content: [
					{
						text: ``
					}
				]
			}
		]
	}
];

export default Nodejs;