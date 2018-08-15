var partJS = [
	{
		mainTitle: '1、运行时的页面构建',
		content: [
			{
				title: '1.1生命周期预览',
				content: [
					{
						text: `典型的客户端Web应用的生命周期从用户在浏览器地址栏输入一串URL或者单击一个链接开始。其
						过程为：<br/>1、输入url或者单击链接；<br/>2、生成请求并发送至服务器；<br/>3、服务器执行某些动作或者
						获取某些资源，将响应发送回客户端；<br/>4、处理HTML、CSS和JavaScript并构建页面；<br/>5、监控
						事件队列，一次处理其中的一个事件；<br/>6、用户与页面交互；<br/>7、关闭Web页面（周期结束）。`
					},
					{
						text: `从用户的角度来说，由于客户端Web应用是属于图形用户界面应用（GUI），其生命周期与其他的
						GUI应用相似，执行步骤如下：<br/>1、页面构建——创建用户页面；<br/>2、事件处理——进入
						循环监控事件队列，等待用户交互事件的产生，发生后调用事件处理器。`
					}
				]
			},
			{
				title: '1.2页面构建阶段',
				content: [
					{
						text: `当Web应用能被展示或交互之前，其页面必须根据服务器获取的响应（通常是HTML,CSS,JS代码）
						来构建。<br/>页面构建的目标是建立Web应用的UI，包括两个步骤：<br/>
						1、解析HTML代码并构建文档对象模型（DOM）；
						<br/>2、执行JavaScript代码。<br/>步骤1会在浏览器处理HTML节点的过程中执行，
						步骤2会在HTML解析到特殊节点——脚本节点（包含或引用js代码的节点）时执行。页面构建过程中这两个步骤
						会交替执行多次。`,
						src: require('@/assets/codeJS1.1.png')
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">1.2.1——HTML解析和DOM构建</span>
						<br/>页面构建阶段始于浏览器接收HTML代码时，该阶段为浏览器构建页面UI的基础。
						通过解析收到的HTML代码，构建一个个HTML元素，构建DOM。
						在这种对HTML结构化表示的形式中，每个HTML元素都被当作一个节点。`
					},
					{
						text: `在页面构建阶段，浏览器会遇到特殊类型的HTML元素——脚本元素。每当解析到脚本元素，
						浏览器就会从构建DOM跳转到执行js代码。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">1.2.2——执行JavaScript代码</span>
						<br/>由于代码的目的主要是提供动态页面，故而浏览器通过<span style="color: #ff5400">全局对象
						</span>提供了一个API使执行代码的JavaScript引擎可以与之交互并改变页面内容。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">JavaScript中的全局对象</span><br/>
						浏览器暴露给引擎的主要全局对象是<span style="color: #ff5400;">window对象</span>，
						它代表了包含着一个页面的窗口。window对象是获取其他全局对象、全局变量（甚至包含用户定义对象）
						和浏览器API的访问途径。全局window对象最重要的属性是<span style="color: #ff5400;">document
						</span>，它代表了当前的的DOM。通过使用这个对象，JavaScript代码就能在任何程度上改变DOM。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">JavaScript代码的不同类型</span>
						<br/>分别是<span style="color: #ff5400;">全局代码和函数代码</span>。包含在函数内的代码
						和位于函数之外的代码。他们的执行方式有所不同，全局代码由JavaScript引擎以一种直接的方式自动执行
						，每当遇到这种代码就一行一行执行。而函数代码必须由其他代码来调用，可以是全局代码，也可以是其他
						函数，还可以被浏览器调用。`
					},
					{
						text: `一般来说需要把JavaScript代码放在<span style="color: #ff5400;">页面底部</span>，
						这样一来就不用担心页面会产生阻塞或者因为js执行了还没有加载成为DOM的HTML元素而产生错误。`
					},
					{
						text: `需要重点注意的是：全局window对象会存在于整个页面的生存期之间，在它上面存储着所有的
						JavaScript变量。只要还有没处理完的HTML元素和没执行完的JavaScript代码，下面两个步骤就会交替
						执行：<br/>1.将HTML构建为DOM；<br/>2.执行JavaScript代码。<br/>
						当浏览器处理完所有的HTML对象，页面构建阶段就结束了，进入下一生命周期：事件处理。`
					}
				]
			},
			{
				title: '1.3事件处理',
				content: [
					{
						text: `客户端Web应用是一种GUI应用，也就是说这种应用会对不同类型的事件作响应，如鼠标移动、
						单击和键盘按压等。因此，在页面构建阶段执行的JavaScript 代码，除了会影响全局应用状态和
						修改DOM外，还会注册<span style="color: #ff5400;">事件监听器(或处理器)</span>。
						这类监听器会在事件发生时，由浏览器调用执行。有了这些事件处理器，我们的应用也就有了交互能力。
						在详细探讨注册事件处理器之前，让我们先从头到尾看一遍事件处理器的总体思想。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">1.3.1——事件处理器概括</span><br/>
						浏览器执行环境的核心思想是：同一时刻只能执行一个代码片段，即所谓的
						<span style="color: #ff5400;">单线程执行模型</span>。所有已生成的事件都会放在同一事件队列中，
						以他们被浏览器检测到的顺序排列。`
					},
					{
						text: `事件处理可以简单描述为一个流程图：<br/><span style="font-size: 24px;">·</span>
						浏览器检查事件队列头；<br/><span style="font-size: 24px;">·</span> 如果没有在队列头检查
						到事件，则继续检查；<br/><span style="font-size: 24px;">·</span> 如果检查到了，则取出该事件，
						并执行相应的事件处理器（如果存在）。在这个过程，余下的事件在队列中等待。`,
						src: require('@/assets/codeJS1.2.png')
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">事件是异步的</span><br/>
						我们对事件的处理以及处理函数的调用是异步的。如下类型的事件会在其他类型事件中发生：<br/>
						<span style="font-size: 24px;">·</span> 浏览器事件，例如页面加载完成或者无法加载时；
						<br/><span style="font-size: 24px;">·</span> 网络事件，例如来自服务器的响应（Ajax事件和服务
						器端事件）；<br/><span style="font-size: 24px;">·</span> 用户事件，例如鼠标单击移动或者
						键盘事件；<br/><span style="font-size: 24px;">·</span> 计时器事件，timeout/interval。`
					},
					{
						text: `Web应用中的JavaScript代码，大部分都是对上述事件的处理，代码的提前建立是为了在之后的某个
						时间点执行，除了全局代码，页面中的大部分中代码都将作为某个事件的结果执行。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">1.3.2——注册事件处理器</span><br/>
						在客户端Web应用中，有两种方式注册事件：<br/>1、通过把函数赋给某个特殊属性；<br/>
						2、通过内置addEventListener方法（该方法可以为同一目标注册多个事件）；`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">1.3.3——处理事件</span><br/>
						主要思想：当事件发生时，浏览器调用相应的事件处理器。<br/>
						事件循环检查队列，将队列头的事件取出，执行，这个过程事件循环是暂停的，一旦事件处理完成，
						队列中不再有新的事件，事件循环就会继续循环，等待新的事件到来，这个循环会持续到应用关闭。`
					}
				]
			},
			{
				title: '1.4本章小结',
				content: [
					{
						text: `客户端Web应用的执行分为两个阶段：<br/><span style="font-size: 24px;">·</span>
						<span style="color: #ff5400;">页面构建代码</span>——用于创建DOM的，而全局
						JavaScript代码是遇到script节点时执行的。在这个执行过程中，
						JavaScript代码能够以任意程度改变当前的DOM、还能够注册事件处理器事件处理器（是一种函数），
						当某个特定事件(例如，一次鼠标单击或键盘按压)发生后会被执行。注册事件处理器很容易:
						使用内置的addEventListener方法。<br/><span style="font-size: 24px;">·</span>
						<span style="color: #ff5400;">事件处理</span>——在同一时刻，只能处理多个不同事件中的一个，
						处理顺序是事件生成的顺序。事件处理阶段大量依赖事件队列，所有的事件都以其出现的顺序存储
						在事件队列中。事件循环会检查事件队列的队头，如果检测到了一个事件、那么相应的事件处理器就会被调用。`
					}
				]
			}
		]
	},
	//第二章
	{
		mainTitle: '2、理解函数',
		content: [
			{
				title: '2.1函数式的不同点是什么',
				content: [
					{
						text: `函数及函数式的概念之所以如此重要，其原因之一在于函数是程序执行过程中的主要模块单元，
						我们编写的几乎所有的JavaScript代码都要在函数中执行。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">2.1.1——函数是第一类对象</span><br/>
						JavaScirpt中函数具有对象的所有能力，因此函数可被作为其他任意类型对象来对待。`,
						src: require('@/assets/codeJS2.1.png')
					},
					{
						text: `<span style="color: #ff5400;">函数也是对象</span>，不过他是可调用的，即被调用来完成某一
						项动作。<br/>第一类对象的特点之一是，它能够作为参数传入函数。对于函数而言，这项特性也表明：如果我们
						将某个函数当作参数传入另一个函数，传入函数会在应用程序执行的未来某个时间点来执行，即回调函数。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">2.1.2——回调函数</span><br/>
						每当我们建立了一个将在随后调用的函数，无论在事件处理阶段通过浏览器还是其他代码，我们都是在建立
						一个回调（callback）。例如单机一次按钮，从服务端获取数据还是UI动画的一部分，都使用了回调。`,
						src: require('@/assets/codeJS2.2.png')
					},
					{
						text: `JavaScript的重要特征之一是可以在表达式出现的任意位置创建函数，这种方式不仅可以让代码更
						紧凑和易于理解，当一个代码不会在多处调用的时候，该特性可以避免使用变量名来污染全局命名空间。`
					},
					{
						text: `上述例子是我们自己调用自己的回调函数，浏览器也会调用回到函数，例如给body添加一个点击
						事件，作为click事件的事件处理器，当事件发生的时候，就会被浏览器调用。<br/>
						可能某些人会说回调函数是异步调用的，上述例子并不是回调函数，但我们在上面讲的就是未来某个时间点会
						调用的回调函数。`
					}
				]
			},
			{
				title: '2.2函数作为对象的乐趣',
				content: [
					{
						text: `我们可以给函数添加属性<br/><span style="color: #ff5400;">var ninja = function
						() {};</span><br/><span style="color: #ff5400;">ninja.name = 'xxx';</span>`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">2.2.1——存储函数</span><br/>
						在某些例子中，我们需要管理某个事件发生后需要调用的回调函数集合，我们会存储元素唯一的函数集合。
						当我们向这样的集合中添加函数时，哪个函数对于这个集合来说是新函数，哪个函数对于他来说是已经存在的
						函数成为了两个我们需要考虑的问题。`,
						src: require('@/assets/codeJS2.3.png')
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">2.2.1——自记忆函数</span><br/>
						记忆化是一种构建函数的处理过程，能够记住上次计算结果。当函数计算得到结果时就将结果按参数存储
						起来。，如果另一个调用也使用相同的参数，我们就可以直接返回结果，而不是再计算一次。`,
						src: require('@/assets/codeJS2.4.png')
					},
					{
						text: `上述方法有两个优点：<br/><span style="font-size: 24px;">·</span> 函数调用时会寻找
						之前调用产生的结果，所以用户会有很好的体验；<br/><span style="font-size: 24px;">·</span> 
						它几乎是无缝地发生在后台，最终用户和页面作者都不需要执行任何请求，也不需要做初始化，就能顺利完成。`
					}
				]
			},
			{
				title: '2.3函数定义',
				content: [
					{
						text: `函数的定义方式总共有四类：<br/><span style="color: #ff5400;">函数定义和函数表达式
						</span>——最常用的方式，<br/>function myFun () { return 1; }<br/>
						<span style="color: #ff5400;">箭头函数</span>——ES6新增的JavaScript标准，能让我们尽量以简洁
						的语法定义函数。<br/>myArg => myArg*2<br/><span style="color: #ff5400;">函数构造函数</span>
						——不常使用的函数定义方法,让我们以字符串形式动态构造一个函数，这样的得到的函数是动态生成的<br/>
						new myFun('a', 'b', 'return a + b;')<br/><span style="color: #ff5400;">生成器函数</span>
						——ES6新增功能，能让我们创建不同于普通函数的函数，在应用执行过程中，这种函数能够退出再重新进入，
						在这些再进入之间保留函数内变量的值。我们可以定义生成器版本的函数声明、函数表达式、函数构造函数。
						<br/>function<span style="color: #ff5400;">*</span> myFun () { <span style="color: #ff5400;">
						yield</span> 1; }`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">2.3.1函数声明和函数表达式</span>
						<br/>他们之间有着微妙的区别。`
					},
					{
						text: `<span style="color: #ff5400;">函数声明</span>——独立的JavaScript代码块<br/>
						以强制性的function开头，其后紧跟着强制性的函数名，以及括号和括号内一列以逗号为间隔的可选参数。
						函数体是一列可以为空的表达式，必须包含在花括号内。`
					},
					{
						text: `特殊的在函数中定义函数的形式：`,
						src: require('@/assets/codeJS2.5.png')
					},
					{
						text: `让函数包含在另一个函数内可能会因为忽略作用域的标识符解析而引发一系列问题，我们在第四章
						将会回顾这个问题`
					},
					{
						text: `<span style="color: #ff5400;">函数表达式</span>——总是其他表达式的一部分的函数<br/>
						var a= <span style="color: #ff5400;"></span>function() {}</span>;<br/>
						myFun( <span style="color: #ff5400;"></span>function() {}</span> );`
					},
					{
						text: `如下是函数声明与函数表达式的<span style="color: #ff5400;">不同点</span>：<br/>
						函数声明是作为JavaScript代码中的独立表达式的，但它也能够包含在其他函数体内。而函数表达式
						则是通常作为其他语句的一部分，被放在表达式级别，作为变量声明（赋值）的右值，或者作为
						另一个函数调用的参数或者返回值。<br/>函数声明必须具有函数名，因为它是独立语句，有了名字才能被
						调用而函数表达式不用，它可以被变量调用。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">立即函数</span><br/>
						<span style="color: #ff5400;">(function () {} ) (arg)</span><br/>
						这种函数叫做（立即调用函数表达式IIFE），第十章会重点讨论IIFE，该特性可以模拟JavaScript中的
						模块化。将函数表达式放在括号里可以让JavaScript解析器辨别出他是函数表达式而不是没有名字的
						函数声明而产生错误。<br/>还可以通过一元运算符（+ - ！ ~）来调用IIFE。如<br/>
						+function () {} ()...`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">2.3.1箭头函数</span><br/>
						核心是：<span style="color: #ff5400;">=></span>，我们来看一个简单的箭头函数：`,
						src: require('@/assets/codeJS2.6.png')
					},
					{
						text: `这种写法不会出现function、return等关键字，非常简洁。箭头函数有两种定义方式：<br/>
						<span style="font-size: 24px;">·</span> 当没有参数或者参数个数大于1的时候，=>前的
						()一定要存在，但只有一个参数的时候可以省略括号；<br/>
						<span style="font-size: 24px;">·</span> 当函数体只是一个表达式，可以省略大括号，且该表达式的值
						就是函数返回值，需要时可以添加大括号包裹代码块，此时若没有return，则返回undefined。`
					}
				]
			},
			{
				title: '2.4函数实参和形参',
				content: [
					{
						text: `函数中经常讨论的<span style="color: #ff5400;">实参（argument）</span>和
						<span style="color: #ff5400;">形参（paramter）</span>。形参就是我们定义函数时列举的变量，
						实参就是我们调用函数时传入的变量值。`
					},
					{
						text: `实参与形参是从前往后依次匹配，这样就会存在两种异常情况：<br/>
						<span style="color: #ff5400;">形参数大于实参数</span>：则未被匹配到的形参为undefined；
						<br/><span style="color: #ff5400;">实参数大于形参</span>：额外的实参不会被赋给任何形参，
						在下一章，你将学会如何获取这些多余的实参。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">2.4.1——剩余参数</span><br/>
						我们来看一个例子`,
						src: require('@/assets/codeJS2.7.png')
					},
					{
						text: `上述的remainingNumbers是一个由剩余参数组成的数组，注意，只有最后一个形参才能作为剩余参数。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">2.4.2——默认参数</span><br/>
						再来看一个例子`,
						src: require('@/assets/codeJS2.8.png')
					},
					{
						text: `在ES6中，可以用另一种更简便的方法来实现默认参数<br/>
						<span style="color: #ff5400;">function a(a, b = 'value')</span><br/>
						默认参数b的默认值为value。可以为默认参数赋任何值，可以是数字、字符串、数组、对象甚至是函数，
						后面的默认参数赋值时甚至可以使用前面的参数或者默认参数`,
						src: require('@/assets/codeJS2.9.png')
					}
				]
			},
			{
				title: '2.5本章小结',
				content: [
					{
						text: `<span style="font-size: 24px;">·</span> 作为第一类对象，函数和其他JavaScript
						对象一样，类似于其他对象，函数具有以下功能：<br/>1.通过字面量创建；<br/>
						2.赋值给变量或者属性；<br/>3.作为函数参数传递；<br/>4.作为函数结果返回；<br/>
						5.赋值给属性和方法。`
					},
					{
						text: `<span style="font-size: 24px;">·</span> 回调函数是被代码随后“回来调用”的函数，
						是一种很常见的函数，特别是在事件处理场景下。`
					},
					{
						text: `<span style="font-size: 24px;">·</span> 函数具有属性，而且这些属性能够储存任何信息，
						我们可以利用这个属性做很多事。<br/>可以在函数属性中存储另一个函数用于之后的引用和调用；<br/>
						可以用函数属性创建一个缓存（记忆），用于减少不必要的计算。`
					},
					{
						text: `<span style="font-size: 24px;">·</span> 很多种函数类型：函数声明、函数表达式、
						构造函数、箭头函数和函数生成器。`
					},
					{
						text: `<span style="font-size: 24px;">·</span> 函数的参数：<br/>
						形参（paramter）和实参（argument）。`
					},
					{
						text: `<span style="font-size: 24px;">·</span> 剩余参数和默认参数是JavaScript新特性。`
					}
				]
			}
		]
	},
	//第三章
	{
		mainTitle: '3、函数进阶——理解函数调用',
		content: [
			{
				title: '3.1前言',
				content: [
					{
						text: `本章主要包括以下内容：<br/><span style="font-size: 24px;">·</span>
						函数中两个隐含的参数： <span style="color: #ff5400;">arguments和this</span>；<br/>
						<span style="font-size: 24px;">·</span> <span style="color: #ff5400;">调用函数</span>
						的不同方式；<br/><span style="font-size: 24px;">·</span> 处理函数
						<span style="color: #ff5400;">上下文</span>的问题。`
					},
					{
						text: `JavaScript是一门函数式语言，函数中隐式的参数this和arguments，两者会被默默传递给函数，
						并且可以像函数体内显式声明的参数一样被正常访问。`
					},
					{
						text: `参数this表示被调用函数的上下文对象，而arguments参数表示函数调用过程传递的所有参数。
						这两个参数至关重要，this是面向对象编程的基本要素之一，通过arguments我们可以访问函数
						调用过程中传递的实参。`
					}
				]
			},
			{
				title: '3.2使用隐式函数参数',
				content: [
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">3.2.1——arguments参数</span><br/>
						无论是否有明确对应的形参，我们都可以通过arguments访问到函数调用时的所有参数，借此实现原生JavaScript
						并不支持的函数重载特性，并且可以实现接收参数数量可变的可变函数。`
					},
					{
						text: `arguments对象有一个名为<span style="color: #ff5400;">length</span>的属性，表示实参个数，
						通过数组索引方式可以获取单个参数，尽管如此，arguments并不是JavaScript数组，如果你在arguments上
						使用数组的操作方法，会报错，因此他仅是一个类数组的结构。我们来看个求和的函数例子。`,
						src: require('@/assets/codeJS3.1.png')
					},
					{
						text: `大多数情况下，剩余参数可以替代arguments使用，并且剩余参数是真正的数组，所以建议大家灵活使用。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">arguments对象作为函数参数的别名
						</span><br/>如我们定义了一函数，它只接收一个参数，接着我们调用它，并传入实参。可以同时通过形参名和
						arguments对象访问到这个实参，这时如果改变了arguments对象的值，如arguments[0]='xxx'，则传入的
						函数参数也被修改了，变为xxx。反之，如果我们修改了某个参数值，则arguments对象也被修改了。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">避免使用别名</span><br/>
						这会影响代码的可读性，在JavaScript提供的严格模式（strict）下将无法使用。通过字符串'use strict'
						便启用严格模式。`	
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">3.2.2——this参数：函数上下文</span><br/>
						调用函数时，this参数也默认传递给函数，它是面向对象JavaScript编程的一个重要组成部分，代表函数调用相关
						联的对象，因此被称为函数上下文。此概念在面向对象语言（如Java）中，通常指向定义当前方法的类的实例。`
					},
					{
						text: `但是，在JavaScript中，将一个函数作为方法（method）调用仅仅是函数调用的一种方式。事实上，this
						参数的指向不仅是由定义函数的方式和位置决定的，同时严重受到函数调用的方式的影响。`
					}
				]
			},
			{
				title: '3.3函数调用',
				content: [
					{
						text: `我们通过四种方式调用函数，没种方式都有微妙的区别：<br/>
						<span style="font-size: 24px;">·</span> 作为一个函数（function）——myFun()，直接被调用；
						<span style="font-size: 24px;">·</span> 作为一个方法（method）——ninja.myFun()，关联在一个
						对象上，实现面向对象编程；<span style="font-size: 24px;">·</span> 作为一个构造函数（constructor）
						new Ninja()，实例化一个新的对象；<span style="font-size: 24px;">·</span>
						通过函数的apply或者call方法——myFun.apply(ninja)或myFun.call(ninja)。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">3.3.1——作为函数被直接调用</span><br/>
						这里我所说的作为一个函数来调用函数是为了和其他调用方式区别开来，通过()运算符来调用函数，且被执行的函数表达式
						不是一个对象的属性。看一些简单示例`,
						src: require('@/assets/codeJS3.2.png')
					},
					{
						text: `当以这种方式调用时，this有两种可能性：<br/>
						1.非严格模式下，它将是全局上下文（window对象）；<br/>
						2.严格模式下，它将是undefined。`
					},
					{
						text: `严格模式下，会更容易理解，因为并没有指定函数被调用的对象，所以this应该是undefined。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">3.3.2——作为方法被调用</span><br/>
						当一个函数被赋值给一个对象的属性，并且通过对象属性引用的方式调用函数时，就被作为对象的方法被调用。
						<span style="color: #ff5400;">var ninja = {};<br/>ninja.skulk = function() {};<br/>
						ninja.skulk();</span><br/>调用时，该对象会成为函数上下文，并且在函数内部可通过this访问到。`
					},
					{
						text: `即使两个不同的对象，他们中的属性共享了同一个函数，通过方法调用时返回的this仍然是预期的
						各自对象本身。在第六章我们会讲到有关JavaScript提供的继承机制，会使代码更加简单。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">3.3.3——作为构造函数被调用</span><br/>
						在调用函数之前使用关键字<span style="color: #ff5400;">new</span>，注意不要把函数构造器和构造函数
						混为一谈，虽然差别很小，但是至关重要。通过函数的构造器我们可以将动态创建的字符串创建为函数
						new Function('a', 'b', 'return a + b')，<br/>而构造函数是我们用来<span style="color: #ff5400;">
						初始化对象实例</span>的。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">构造函数的强大功能</span><br/>
						接下来我们使用构造函数实现通用对象：`,
						src: require('@/assets/codeJS3.3.png')
					},
					{
						text: `一般来说，调用构造函数时会发生一系列特殊的操作：<br/>
						<span style="font-size: 24px;">·</span> 创建一个新的对象；<br/>
						<span style="font-size: 24px;">·</span> 该对象的作为this参数传递给构造函数，成为上下文；<br/>
						<span style="font-size: 24px;">·</span> 新构造的对象作为new运算符的返回值（除了一特殊情况）。`,
						src: require('@/assets/codeJS3.4.png')
					},
					{
						text: `构造函数的<span style="color: #ff5400;">目的</span>是创建一个新对象，并将其初始化，
						作为构造函数的返回值。任何有悖于这两点的情况都不适合作为构造函数。`
					},
					{
						text: `<span style="color: #ff5400;">构造函数返回值</span><br/>
						上面我们说了，构造函数会将新构造的对象作为调用结果通过（new）返回，那么当构造函数自身有返回值的时候会怎么样呢`,
						src: require('@/assets/codeJS3.5.png')				
					},
					{
						text: `当作为构造函数调用时，其返回值1会被忽略，真正返回的是新构造出来的ninja对象实例。<br/>
						但是当构造函数返回值是一个<span style="color: #ff5400;">对象</span>时，则该对象会作为整个new表达式
						的返回值，而传入构造函数的this将会被丢弃。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">编写构造函数的注意事项</span><br/>
						构造函数虽然在作为普通函数调用时（即不通过new关键字）也可以正常调用，但是并没有意义，同时还会造成
						不必要的麻烦。所以构造函数的命名通常与其他普通函数不一样，正常的函数会以小写字母开头，并描述一个动作，
						而构造函数通常以大写字母开头，以此来区分。（ function Ninja() {} ）。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">3.2.4——使用apply和call调用</span><br/>
						你应该已经注意到，不同的函数调用方法，主要区别在于最终作为函数上下文传递给执行函数的对象不同。`
					},
					{
						text: `使用apply和call方法可以显式地指定任何对象作为函数上下文。这两种正是函数的方法，作为第一类对象，
						函数可以拥有自己的属性和方法。若想使用<span style="color: #ff5400;">apply</span>调用函数，
						需要传入2个参数：作为函数上下文的对象和一个<span style="color: #ff5400;">数组</span>作为函数调用的参数。
						<span style="color: #ff5400;">call</span>方法不同的是参数直接以<span style="color: #ff5400;">
						参数列表</span>形式传入，而不是数组。`,
						src: require('@/assets/codeJS3.6.png')
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">强制指定回调函数的函数上下文</span><br/>
						在<span style="color: #ff5400;">命令式编程</span>中，常常将数组传给函数，然后使用for循环遍历数组，
						再对数组每个元素执行操作；<br/>而<span style="color: #ff5400;">函数式</span>方法创建的函数只处理
						单个元素。`,
						src: require('@/assets/codeJS3.7.png')
					},
					{
						text: `为了实现更加函数式的风格，所有数组对象均可使用forEach函数，对每个数组元素执行回调。
						<span style="color: #ff5400;">forEach</span>遍历函数将每个数组元素传给回调函数，将当前元素作为
						回调函数的上下文。虽然JavaScript引擎已经提供给我们一个forEach方法，但是在这里我们写一个简化版的迭代函数。`,
						src: require('@/assets/codeJS3.8.png')
					}

				]
			},
			{
				title: '3.4解决函数上下文问题',
				content: [
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">3.4.1——使用箭头函数绕过函数上下文</span><br/>
						箭头函数没有单独的this参数，箭头函数的this与声明所在的上下文的相同。`
					},
					{
						text: `调用箭头函数时，不会隐式传入参数this，而是从定义时的函数继承上下文。若箭头函数存在于对象字面量中，
						箭头函数的this将会指向window对象，在构造函数内部则this指向构造函数本身。具体请看：`,
						src: require('@/assets/codeJS3.9.png')
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">3.4.1——使用bind方法</span><br/>
						函数还可以访问<span style="color: #ff5400;">bind</span>方法创建新函数`,
						src: require('@/assets/codeJS3.10.png')
					},
					{
						text: `函数的上下文总是被绑定的这个对象，bind方法不会修改原始函数，而是创建了一个新的函数。`
					}
				]
			}
		]
	},
	//第四章
	{
		mainTitle: '4、精通函数：闭包和作用域',
		content: [
			{
				title: '4.1理解闭包',
				content: [
					{
						text: `闭包允许函数访问并操作函数外部的变量。只要变量或函数存在于声明函数时的作用域内，闭包即可使函数能够访问
					这些变量和函数。`
					},
					{
						text: `所声明的函数可以在声明之后的任何事件被调用，甚至当该函数声明的作用域消失之后仍可被调用。闭包常用于优雅地
						实现动画、定义私有对象属性。我们看一个简单的闭包：`,
						src: require('@/assets/codeJS4.1.png')
					},
					{
						text: `没错，这就是在创建闭包。外部变量outValue和外部函数outFunction都是在全局作用域中声明的，该作用域
						（实际就是一个闭包）从未消失。但是该例子并没有什么优势，让我们再看一个例子：`,
						src: require('@/assets/codeJS4.2.png')
					},
					{
						text: `当在外部函数中声明内部函数时，不仅定义了函数的声明，还创建了一个闭包。该闭包不仅包含了函数的声明，
						还包含了在函数声明时该作用域内的所有变量。谨记每一个闭包访问变量的函数都具有一个作用域链，其中包含着闭包的
						全部信息。`
					},
					{
						text: `虽然闭包很有用，但是不能过度使用。使用闭包时，所有信息会存在内存里，直到JavaScript引擎确保不会再使用
						这些信息时才会清理。`
					}
				]
			},
			{
				title: '4.2使用闭包',
				content: [
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">4.2.1——封装私有变量</span><br/>
						私有变量是对外部隐藏的对象属性，原生JavaScript并不支持私有变量，但是我们使用闭包可以实现很接近的，可接受的
						私有变量。如下：`,
						src: require('@/assets/codeJS4.3.png')
					},
					{
						text: `通过使用闭包，我们可以通过方法对ninja的状态进行维护，但无法直接访问——这是因为闭包内部变量可以通过
						闭包内部方法进行访问，构造器外部的代码则不能直接访问闭包内部变量。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">4.2.2——回调函数</span><br/>
						处理回调函数是另一种常见的使用闭包的情景，通常在这种回调函数中，我们需要频繁地访问外部数据，我们来看一个
						简单动画计时的例子：`,
						src: require('@/assets/codeJS4.4.png')
					},
					{
						text: `例子中，通过闭包，一个匿名函数来控制三个变量（elem, tick, timer）来控制动画的状态，这三个变量
						必须能够在全局作用域中访问到，并不要把三个变量放到全局作用域，这样会污染全局作用域，使得需要用到这三个变量
						的动画产生冲突。`
					},
					{
						text: `通过在函数内部定义变量，并基于闭包，使得计时器的回调函数中可以访问这些变量，每个动画都能够获得属于
						自己的‘安全气泡’中的私有变量。<br/>如果没有闭包，一次性做许多事情，如（事件绑定、动画甚至是服务端请求）都会
						变得很困难。`
					}
				]
			},
			{
				title: '4.3通过执行上下文来跟踪代码',
				content: [
					{
						text: `在前面我们已经说过，JavaScript代码有两种，全局代码和函数代码，那么就有两种执行上下文：<br/>
						<span style="font-size: 24px;">·</span> 全局执行上下文：只有一个，程序开始运行就已经创建；<br/>
						<span style="font-size: 24px;">·</span> 函数执行上下文：每次调用函数时创建一个新的。`
					},
					{
						text: `<span style="color: #ff5400;font-size:20px;">注意：</span>前面我们说了调用函数时可以通过关键字this访问
						函数上下文，这两个上下文是不一样的概念,执行上下文是内部的JavaScript概念，JavaScript引擎通过执行上下文来追踪函数的
						执行。`
					},
					{
						text: `<strong>由于JavaScript基于单线程的执行模型，所以一旦函数发生调用，当前的执行上下文必须停止执行，
						并创建新的函数执行上下文来执行函数。当函数执行完成后，将函数执行上下文销毁，重新回到发生调用的执行上下文中。
						所以需要跟踪执行上下文——正在执行的上下文和正在等待的上下文，最简单的方式使用<span style="color: #ff5400;">
						执行上下文栈（调用栈）。</span></strong>`
					},
					{
						text: `栈是一种基本的数据结构，只能从栈顶对数据项进行插入和读取。<br/>我们来看一个简单的例子：`,
						src: require('@/assets/codeJS4.5.png')
					},
					{
						text: `<span style="font-size: 24px;">·</span> 程序开始执行的作用域是调用栈中的全局执行作用域；<br/>
						<span style="font-size: 24px;">·</span> 函数skulk被调用后，新的函数作用域进栈，全局作用域暂停；<br/>
						<span style="font-size: 24px;">·</span> report函数调用后，其作用域进栈，skulk作用域暂停；<br/>
						<span style="font-size: 24px;">·</span> report函数执行完毕后，其函数作用域出栈，skulk作用域恢复执行；
						<br/><span style="font-size: 24px;">·</span> skulk函数执行完毕后，其执行作用域出栈，全局作用域恢复执行。`
					},
					{
						text: `执行上下文除了可以跟踪应用程序的执行位置外，对于<span style="color: #ff5400;">标识符</span>
						也是至关重要，在静态环境中通过执行上下文可以准确定位标识符实际指向的变量。`
					}
				]
			},
			{
				title: '4.4使用词法环境跟踪变量的作用域',
				content: [
					{
						text: `词法环境时JavaScript引擎内部用来跟踪标识符与特定变量之间的映射关系。例如：`,
						src: require('@/assets/codeJS4.6.png')
					},
					{
						text: `词法环境是JavaScript作用域的内部实现机制，称为：<span style="color: #ff5400;">作用域（scopes）</span>`
					},
					{
						text: `通常来说，作用域与特定的JavaScript代码结构相关联，可以是一个函数，一个代码片段，也可以是try-catch
						语句。这些代码结构可以具有独立的标识符映射表。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">代码嵌套</span><br/>
						词法环境主要基于代码嵌套，实现代码结构包含另一个代码结构，内部代码结构可以访问外部代码结构中定义的变量。`,
						src: require('@/assets/codeJS4.7.png')
					},
					{
						text: `除了跟踪局部变量，函数声明，函数的参数和词法环境外，还有必要跟踪外部词法环境。如果我们在当前词法环境中
						无法找到某一标识符，就会对外部词法环境进行查找。一旦找到，或是在全局环境中仍然无法找到对应的标识符而返回错误，
						就会停止查找。`
					}
				]
			},
			{
				title: '4.5理解JavaScript的变量类型',
				content: [
					{
						text: `我们可以通过三个关键字来定义变量：<span style="color: #ff5400;">var, let, const</span>。
						他们之间的不同在于：可变性、与词法环境的关系。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">4.5.1——变量可变性</span><br/>
						通过变量可变性来分类的话，可以将const放在一组，var和let放在另一组。通过const定义的变量都不可变，也就是通过
						const声明的变量的值只能设置一次。`
					},
					{
						text: `<span style="color: #ff5400;">const</span>变量常用于两种目的：<br/>
						1、不需要重新复赋值的特殊变量；<br/>
						2、指定一个固定的值，例如球队人数的最大值，通过一个语义化变量来指定，而不是用数字。<br/>
						让我们来看一些简单的例子：`,
						src: require('@/assets/codeJS4.8.png')
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">4.5.2——定义变量的关键字与词法环境</span><br/>
						将三个关键字通过与词法环境的关系进行分类的话，将var分为一组，const let分为另一类。`
					},
					{
						text: `<span style="color: #ff5400;">使用关键字var</span><br/>
						该变量是在距离最近的<span style="color: #ff5400;">函数内部</span>或者是
						<span style="color: #ff5400;">全局词法环境中</span>定义的。<br/>
						在函数环境内定义的变量不可在函数外访问，但在块级环境（即{}内）中定义的变量（例如在for循环中）定义的变量，
						则可以在块级范围外访问到，这是JavaScript的一特性。`
					},
					{
						text: `<span style="color: #ff5400;">使用let const定义具有具有块级作用域的变量</span><br/>
						他们直接在最近的词法环境中定义变量（可以是块级作用域、函数内、循环内或者全局环境中）。我们可以用let const
						定义块级别、函数级别、全局级别的变量。`
					},
					{
						text: `通过他们定义的变量只能在定义时所处的词法环境内访问。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">4.5.3——在词法环境中注册标识符</span><br/>
						JavaScript作为一门编程语言，设计的基本原则是易用性，所以不需要指定返回值类型，函数参数类型，变量类型等。
						而且它对定义函数的位置并不挑剔。`,
						src: require('@/assets/codeJS4.9.png')
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">注册标识符的过程</span><br/>
						JavaScript代码的执行其实分两个阶段：一旦创建了新的词法环境，就会执行第一阶段。在第一阶段，没有执行代码，
						JavaScript引擎会访问并注册在当前词法环境中所声明的变量和函数。<br/>
						JavaScript在第一阶段完成后开始执行第二阶段，具体如何执行取决于变量的类型（let, var, const和函数声明）
						以及环境类型（全局环境，函数环境和块级作用域）。具体如下：<br/>
						1、如果创建的是一个函数环境，那么创建形参及函数参数的默认值，如果是非函数环境，则跳过该步骤；<br/>
						2、如果创建的是全局环境或函数环境，就扫描当前代码进行函数声明（不会扫描其他函数的函数体），但是不会执行
						函数表达式或者箭头函数。对于所找到的函数声明，将创建函数，并绑定到当前环境与函数名相同的标识符上。若
						该标识符已经存在，那么该标识符的值将会被重写，如果是块级作用域则跳过该步骤；<br/>
						3、扫描当前代码进行函数变量声明。在函数或者全局环境中，查找所有当前函数以及其他函数之外通过var声明的变量，
						并查找所有通过let const定义的变量。在块级作用域中，仅查找当前块中通过let或者const定义的变量。对于找到的
						标识符，若该标识符不存在，进行注册并将其初始化为undefined，若已存在，则保留其值。`,
						src: require('@/assets/codeJS4.10.png')
					},
					{
						text: `我们可以在函数声明代码前面调用函数，因为通过函数声明定义的函数在上述过程中，而对于函数表达式或者
						箭头函数定义的函数，则不可以在之前调用。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">函数重载</span><br/>`,
						src: require('@/assets/codeJS4.11.png')
					},
					{
						text: `上述例子中，声明的变量与函数均使用了相同的名字fun，你会发现，前两次typeof检验类型都通过了，
						这种行为是由标识符注册的结果导致的。在处理过程的第2步中，通过函数声明定义的函数在函数代码执行之前进行创建，
						并赋值给对应的标识符，在第3步中，处理变量的声明，那些在当前环境中未声明的变量，并将被赋值为undefined。
						所以上述例子中结果也就不奇怪了。<br/>
						在程序的实际执行过程中，跳过了函数声明部分，所以函数声明不会影响fun的值，换言之，函数声明语句已经被用过了。`
					},
					{
						text: `<span style="color: #ff5400;">变量提升</span><br/>
						例如，变量的声明提升至函数顶部，函数的声明提升至全局代码的顶部。`
					}
				]
			},
			{
				title: '4.5闭包原理',
				content: [
					{
						text: `闭包与作用域密切相关，闭包对JavaScript的作用域规则产生了直接影响。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">4.6.1——回顾闭包模拟私有变量</span><br/>`,
						src: require('@/assets/codeJS4.3.png')
					},
					{
						text: `我们可以用标识符原理来更好地理解这种情况下闭包的工作原理。通过关键字new调用了构造函数，每次调用
						构造函数时，都会创建一个新的词法环境，该词法环境保持构造函数内部局部变量（例子中是number）。`
					},
					{
						text: `在例子中，构造函数Ninja内部我们创建了两个函数，他们均有Ninja环境的引用。<br/>
						getNum和addNum两个函数是新创建的ninja对象的方法，因此，可以通过Ninja构造函数外部访问这两个函数，
						这样实际上就创建了包含number变量的闭包。<br/>
						当再创建一个Ninja的实例即ninja2对象时，将重复整个过程，让我们来看看在调用ninja2.getNum方法时发生了什么。
						由于每次调用函数时均会创建一个新的词法环境，用于保存跟踪函数中定义的变量（number）。另外，getNum词法环境中
						包含了getNum函数创建时所处的词法环境（即Ninja环境）。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">4.6.2——私有变量的警告</span><br/>
						JavaScript从未阻止我们将一个对象中的属性复制给另一个对象，例如：`,
						src: require('@/assets/codeJS4.12.png')
					},
					{
						text: `本例表明了没有真正的“私有变量”，但是可以通过闭包实现一个可接受的“私有”变量的方案，非常有用。`
					}
				]
			}
		]
	},
	//第五章
	{
		mainTitle: '5、未来的函数：生成器和promise',
		content: [
			{
				title: '5.1生成器和promise与异步的关系',
				content: [
					{
						text: `在你需要同时请求很多数据的时候，从服务器请求数据是一个长时间操作，如果不采用回调函数，
						由于单线程执行模型，在长时间操作结束之前，UI的渲染会暂停。随后的应用都会无响应，用户体验极差。我们来看一个
						回调函数获取一些数据的例子：`,
						src: require('@/assets/codeJS5.1.png')
					},
					{
						text: `上述代码虽然可以提升用户体验，但是这种多层次处理错误代码很丑陋，下面我们见识一下生成器函数和promise
						的厉害之处：`,
						src: require('@/assets/codeJS5.2.png')
					},
					{
						text: `可能你还并不了解<span style="color: #ff5400;">function*和yield</span>，没关系，我们一起慢慢来
						探索通往优雅异步代码的道路。`
					}
				]
			},
			{
				title: '5.2使用生成器函数',
				content: [
					{
						text: `它与标准的普通函数不同，生成器函数（generator）能够生成一组值的序列，但每个值的生成基于每次请求，
						并不是想普通函数那样立即生成。我们必须显式地向生成器请求一个新的值，随后生成器要么相应一个新生成的值，要么
						就告诉我们他再也不会生成新值了。<br/>更神奇的是每当生成器生成一个值，它不会像普通函数一样停止执行。相反，
						生成器几乎从不挂起，当对另一个值的请求到来后，生成器就会从上次离开的位置恢复执行。`,
						src: require('@/assets/codeJS5.3.png')
					},
					{
						text: `生成器函数的函数体部分并没有return语句，但还是生成了序列值，它会创建一个叫
						<span style="color: #ff5400;">迭代器</span>的对象。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">5.2.1——通过迭代器控制生成器</span><br/>
						调用函数生成器并不会执行生成器函数体，通过创建迭代器对象，可以与生成器进行通信。我们来通过一个例子
						看一下迭代器控制生成器：`,
						src: require('@/assets/codeJS5.4.png')
					},
					{
						text: `迭代器对象暴露的基本接口是next，通过该方法可以用来向生成器请求一个值。next函数调用以后，
						生成器就开始执行代码，当代码执行到yield关键字时，就会生成一个中间结果（生成值序列中的一项），
						然后返回一个新对象，其中封装了结果值和一个指示完成的指示器。<br/>
						每当生成一个当前值，生成器就会非阻塞地挂起执行，随后等待下一次请求值的到来。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">对迭代器进行迭代</span><br/>`,
						src: require('@/assets/codeJS5.5.png')
					},
					{
						text: `这就是上述的for-of循环的原理，他只是对迭代器进行迭代的语法糖。<br/>
						不同于手动调用next方法，for-of循环同时还要查看生成器是否完成，在后台做了完全相同的工作。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">把执行权交给下一个生成器</span><br/>
						就像在标准函数中调用另一个函数一样，我们需要把生成器的执行委托给另一个生成器，来看个例子：`,
						src: require('@/assets/codeJS5.6.png')
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">5.2.2——使用生成器</span><br/>
						用生成器生成ID序列<br/>在创建某些对象时，我们需要为这些对象赋一个唯一的ID值，这时候我们
						就可以通过一个生成器生成。`,
						src: require('@/assets/codeJS5.7.png')
					},
					{
						text: `该方法不用担心id在其他地方会被修改，因为只能在生成器中访问，另外，如果需要一个新的序列值，
						我们只需要再初始化一个新迭代器就可以了。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">5.2.3——与生成器交互</span><br/>
						不仅能从生成获取它生成的值，我们还可以向生成器发送值，实现双向通信。`
					},
					{
						text: `作为生成器函数参数发送值<br/>这种方式就和普通函数一样，调用函数传入实参：`,
						src: require('@/assets/codeJS5.8.png')
					},
					{
						text: `除了第一次调用生成器的时候，我们传递了一个skulk参数，我们在后面还通过next向生成器传递了参数ninja，
						通过next传递这个过程中，生成器从挂起状态恢复到了执行状态。在当前挂起的生成器中，生成器把传入的值用于整个
						yield表达式。`
					},
					{
						text: `在<span style="color: #ff5400;">第二次</span>调用next方法时，传递的参数ninja作为上一个yield表达式
						（上次挂起的位置）的返回值，所以imposter为ninja。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">5.2.4——探索生成器内部</span><br/>
						调用生成器的时候并不会执行它，其实它的工作状态可以归为以下四个状态：<br/>
						<span style="font-size: 24px;">·</span> 挂起开始——刚创建了生成器，其中任何代码都未执行；<br/>
						<span style="font-size: 24px;">·</span> 执行——要么刚开始，要么从上次挂起的位置开始执行，
						当调用next方法时，只要当前存在可执行的代码，就会跳到这个状态；<br/>
						<span style="font-size: 24px;">·</span> 挂起让渡——遇到yield表达式，它会创建一个包含着返回值的新对象，
						随后挂起执行，暂停并等待着再次执行；<br/>
						<span style="font-size: 24px;">·</span> 完成——若执行到return语句或者是全部代码执行完毕。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">通过执行上下文跟踪生成器函数</span><br/>
						<span style="color: #ff5400;">调用函数生成器之前</span>，由于现在执行的全局代码，所以执行上下文仅仅
						包含全局执行上下文，该上下文引用了当前的标识符所在的全局环境。`
					},
					{
						text: `<span style="color: #ff5400;">调用生成器函数</span>，控制流进入了生成器，当前将会创建一个新的
						函数环境上下文，并将该上下文推进执行上下文栈，生成器并不会执行任何函数代码，取而代之的是生成一个新的迭代器
						再从中返回，通过在代码中用一个变量引用这个迭代器。由于迭代器是用来控制生成器的执行的，故而迭代器保存着一个
						在他创建位置处的执行上下文。<br/>
						当程序从生成器中执行完毕后，普通函数执行完毕后，对应的执行环境上下文会从栈中弹出，并被销毁，
						而生成器函数不是这样：<br/>相对应的生成器会从栈中弹出，而那个迭代器变量还保留着对它的引用，所以它不会被销毁，
						你可以把它看成一种类似闭包的事物。迭代器保存了对当前执行环境的引用。`
					},
					{
						text: `<span style="color: #ff5400;">调用迭代器的next方法</span>：如果只是一个普通函数的调用，这个语句
						会创建一个新的next的执行环境上下文，放进栈中。但生成器不然，next会重新激活对应的上下文（即生成器函数上下文），
						将其放入栈顶，从他上次离开的位置接着执行。`
					}
				]
			},
			{
				title: '5.3使用promise',
				content: [
					{
						text: `使用JavaScript编写代码会大量依赖异步计算，计算那些我们现在不需要，但是将来会用到的值，而promise
						用于更简单的处理异步任务。`
					},
					{
						text: `promise对象是一个占位符，他是对我们最终能够得知异步计算结果的一种保证。如果承诺兑现，那么就会得到一个值。
						如果发生问题，结果就是一个错误，例如我们要从服务器获取数据：`,
						src: require('@/assets/codeJS5.9.png')
					},
					{
						text: `使用内置的构造函数Promise来创建一个promise需要传入一个函数（上例中的箭头函数），该函数被称为执行函数，
						它包括两个参数（<span style="color: #ff5400;">resolve、reject</span>），我们可以手动调用resolve函数让
						承诺兑现，也可以当错误发生时手动调用reject。`
					},
					{
						text: `代码调用Promise对象内置的then方法，我们向这个方法中传入两个回调函数，一个成功的，一个失败的。
						当承诺兑现时（我们调用了resolve方法），第一个回调函数就被调用，而当出现错误就会调用后一个回调函数（
						可以是发生一个未处理的错误，也可以我们手动调用reject）`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">5.3.1——简单回调函数的问题</span><br/>
						1、错误难以处理：一个长时间任务（如从服务器获取数据）很容易发生错误，而调用回调函数的代码和开始任务中的
						这段代码一般不会位于事件循环的同一步骤（12章将会讲到事件循环），导致的结果就是错误会丢失。<br/>
						在Node.js中，回调函数一般具有两个参数：err 和 data。当错误发生在某处时，err将会是一个非空的值。<br/>
						2、执行连续步骤很困难：在我们结束了第一个长时间任务以后，我们需要利用获取到的数据进行某些操作，这样可能
						又进入了一个长时间的过程（各步骤相互依赖），从而进入多层嵌套循环，代码变得难以理解和修改维护。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">5.3.2——深入理解promise</span><br/>
						promise对象在整个生命周期中，会经历多种状态：<br/>
						从等待（<span style="color: #ff5400;">pending</span>）状态开始，因为我们此时对该对象一无所知，
						所以也称为未实现（<span style="color: #ff5400;">unresolved</span>）,执行过程中，如果resolve被调用，
						promise就会进入完成（<span style="color: #ff5400;">fulfilled</span>）状态，该状态下我们能够成功获取
						承诺的值。<br/>另一方面，如果reject被调用，或者未处理的一个异常在调用过程中发生了，promise就会进入
						拒绝状态，虽然我们无法获取承诺值，但是我们知道了其中的原因。<br/>
						<span style="color: #ff5400;">注意：</span>一个promise对象一旦进入了fulfilled状态或者rejected状态，
						就无法再切换了。`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">5.3.3——拒绝promise</span><br/>
						有两种方式：显式拒绝（在promise中调用reject方法）和隐式拒绝（处理一个promise时抛出异常）`
					},
					{
						text: `显式拒绝promise的例子：`,
						src: require('@/assets/codeJS5.10.png')
					},
					{ 
						text: `链式调用catch方法：`,
						src: require('@/assets/codeJS5.11.png')
					},
					{
						text: `异常隐式拒绝promise：`,
						src: require("@/assets/codeJS5.12.png")
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">5.3.4——链式调用promise</span><br/>
						调用then方法以后还会再返回一个新的promise对象。`,
						src: require('@/assets/codeJS5.13.png')
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">5.3.5——等待多个promise</span><br/>
						除了处理相互依赖的异步任务序列外，对于等待多个独立的异步任务，promise能够显著减少代码量，我们
						看一个并行执行的例子（获取一系列独立的东西）：`,
						src: require('@/assets/codeJS5.14.png')
					},
					{
						text: `上述例子中，如果数组中的promise全部被解决，那么返回的promise就会被解决，如果有一个失败了，
						则整个promise对象都会被拒绝。<br/>`
					},
					{
						text: `<span style="font-size: 15px;color: #4d7e84;">5.3.5——个promise竞赛</span><br/>
						下面我们看一个更加独立的promise，数组中的promise对象相互独立：`,
						src: require('@/assets/codeJS5.15.png')
					}
				]
			},
			{
				title: '5.4把生成器和promise结合',
				content: [
					{
						text: `把异步任务放入一个生成器中，执行生成器函数。因为我们没办法知道承诺什么时候哦会兑现，
						所以在生成器执行的时候，我们将让渡给生成器，从而不会阻塞。当承诺被兑现，我们继续通过迭代器的
						next函数执行生成器，有需要就重复这个过程。`,
						src: require('@/assets/codeJS5.16.png')
					},
					{
						text: `<span style="color: #ff5400;">面向未来的async函数</span><br/>
						当前的JavaScript标准增加了两个关键字：<span style="color: #ff5400;">async和await</span>。我们来看个例子：`,
						src: require('@/assets/codeJS5.17.png')
					},
					{
						text: `在function前面使用关键字async,可以表明当前的函数依赖一个异步返回的值。在每个调用异步任务的位置放置一个
						await关键字。现阶段还没有浏览器支持，但你可以通过Babel或者Traceur转译代码来使用。`
					}
				]
			}
		]
	},
	//第六章
	{
		mainTitle: '6、深入研究对象',
		content: [
			{
				title: '',
				content: [
					{
						text: ``
					}
				]
			}
		]
	}
];

export default partJS;