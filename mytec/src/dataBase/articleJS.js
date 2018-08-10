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
	}

];

export default partJS;