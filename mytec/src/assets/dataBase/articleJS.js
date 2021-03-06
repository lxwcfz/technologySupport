var blue = '<span style="font-size: 15px;color: #4d7e84;">', endBlue = '</span><br/>';
var orange = '<span style="color: #ff5400;">', endOrange = '</span>';
var point = '<span style="font-size: 24px;">·</span> ';
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
						text: `${blue}1.2.1——HTML解析和DOM构建${endOrange}
						<br/>页面构建阶段始于浏览器接收HTML代码时，该阶段为浏览器构建页面UI的基础。
						通过解析收到的HTML代码，构建一个个HTML元素，构建DOM。
						在这种对HTML结构化表示的形式中，每个HTML元素都被当作一个节点。`
					},
					{
						text: `在页面构建阶段，浏览器会遇到特殊类型的HTML元素——脚本元素。每当解析到脚本元素，
						浏览器就会从构建DOM跳转到执行js代码。`
					},
					{
						text: `${blue}1.2.2——执行JavaScript代码${endOrange}
						<br/>由于代码的目的主要是提供动态页面，故而浏览器通过<span style="color: #ff5400">全局对象
						${endOrange}提供了一个API使执行代码的JavaScript引擎可以与之交互并改变页面内容。`
					},
					{
						text: `${blue}JavaScript中的全局对象${endBlue}
						浏览器暴露给引擎的主要全局对象是${orange}window对象${endOrange}，
						它代表了包含着一个页面的窗口。window对象是获取其他全局对象、全局变量（甚至包含用户定义对象）
						和浏览器API的访问途径。全局window对象最重要的属性是${orange}document
						${endOrange}，它代表了当前的的DOM。通过使用这个对象，JavaScript代码就能在任何程度上改变DOM。`
					},
					{
						text: `${blue}JavaScript代码的不同类型${endOrange}
						<br/>分别是${orange}全局代码和函数代码${endOrange}。包含在函数内的代码
						和位于函数之外的代码。他们的执行方式有所不同，全局代码由JavaScript引擎以一种直接的方式自动执行
						，每当遇到这种代码就一行一行执行。而函数代码必须由其他代码来调用，可以是全局代码，也可以是其他
						函数，还可以被浏览器调用。`
					},
					{
						text: `一般来说需要把JavaScript代码放在${orange}页面底部${endOrange}，
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
						修改DOM外，还会注册${orange}事件监听器(或处理器)${endOrange}。
						这类监听器会在事件发生时，由浏览器调用执行。有了这些事件处理器，我们的应用也就有了交互能力。
						在详细探讨注册事件处理器之前，让我们先从头到尾看一遍事件处理器的总体思想。`
					},
					{
						text: `${blue}1.3.1——事件处理器概括${endBlue}
						浏览器执行环境的核心思想是：同一时刻只能执行一个代码片段，即所谓的
						${orange}单线程执行模型${endOrange}。所有已生成的事件都会放在同一事件队列中，
						以他们被浏览器检测到的顺序排列。`
					},
					{
						text: `事件处理可以简单描述为一个流程图：<br/><span style="font-size: 24px;">·${endOrange}
						浏览器检查事件队列头；<br/>${point}如果没有在队列头检查
						到事件，则继续检查；<br/>${point}如果检查到了，则取出该事件，
						并执行相应的事件处理器（如果存在）。在这个过程，余下的事件在队列中等待。`,
						src: require('@/assets/codeJS1.2.png')
					},
					{
						text: `${blue}事件是异步的${endBlue}
						我们对事件的处理以及处理函数的调用是异步的。如下类型的事件会在其他类型事件中发生：<br/>
						${point}浏览器事件，例如页面加载完成或者无法加载时；
						<br/>${point}网络事件，例如来自服务器的响应（Ajax事件和服务
						器端事件）；<br/>${point}用户事件，例如鼠标单击移动或者
						键盘事件；<br/>${point}计时器事件，timeout/interval。`
					},
					{
						text: `Web应用中的JavaScript代码，大部分都是对上述事件的处理，代码的提前建立是为了在之后的某个
						时间点执行，除了全局代码，页面中的大部分中代码都将作为某个事件的结果执行。`
					},
					{
						text: `${blue}1.3.2——注册事件处理器${endBlue}
						在客户端Web应用中，有两种方式注册事件：<br/>1、通过把函数赋给某个特殊属性；<br/>
						2、通过内置addEventListener方法（该方法可以为同一目标注册多个事件）；`
					},
					{
						text: `${blue}1.3.3——处理事件${endBlue}
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
						text: `客户端Web应用的执行分为两个阶段：<br/><span style="font-size: 24px;">·${endOrange}
						${orange}页面构建代码${endOrange}——用于创建DOM的，而全局
						JavaScript代码是遇到script节点时执行的。在这个执行过程中，
						JavaScript代码能够以任意程度改变当前的DOM、还能够注册事件处理器事件处理器（是一种函数），
						当某个特定事件(例如，一次鼠标单击或键盘按压)发生后会被执行。注册事件处理器很容易:
						使用内置的addEventListener方法。<br/><span style="font-size: 24px;">·${endOrange}
						${orange}事件处理${endOrange}——在同一时刻，只能处理多个不同事件中的一个，
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
						text: `${blue}2.1.1——函数是第一类对象${endBlue}
						JavaScirpt中函数具有对象的所有能力，因此函数可被作为其他任意类型对象来对待。`,
						src: require('@/assets/codeJS2.1.png')
					},
					{
						text: `${orange}函数也是对象${endOrange}，不过他是可调用的，即被调用来完成某一
						项动作。<br/>第一类对象的特点之一是，它能够作为参数传入函数。对于函数而言，这项特性也表明：如果我们
						将某个函数当作参数传入另一个函数，传入函数会在应用程序执行的未来某个时间点来执行，即回调函数。`
					},
					{
						text: `${blue}2.1.2——回调函数${endBlue}
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
						text: `我们可以给函数添加属性<br/>${orange}var ninja = function
						() {};${endBlue}${orange}ninja.name = 'xxx';${endOrange}`
					},
					{
						text: `${blue}2.2.1——存储函数${endBlue}
						在某些例子中，我们需要管理某个事件发生后需要调用的回调函数集合，我们会存储元素唯一的函数集合。
						当我们向这样的集合中添加函数时，哪个函数对于这个集合来说是新函数，哪个函数对于他来说是已经存在的
						函数成为了两个我们需要考虑的问题。`,
						src: require('@/assets/codeJS2.3.png')
					},
					{
						text: `${blue}2.2.1——自记忆函数${endBlue}
						记忆化是一种构建函数的处理过程，能够记住上次计算结果。当函数计算得到结果时就将结果按参数存储
						起来。，如果另一个调用也使用相同的参数，我们就可以直接返回结果，而不是再计算一次。`,
						src: require('@/assets/codeJS2.4.png')
					},
					{
						text: `上述方法有两个优点：<br/>${point}函数调用时会寻找
						之前调用产生的结果，所以用户会有很好的体验；<br/>${point}
						它几乎是无缝地发生在后台，最终用户和页面作者都不需要执行任何请求，也不需要做初始化，就能顺利完成。`
					}
				]
			},
			{
				title: '2.3函数定义',
				content: [
					{
						text: `函数的定义方式总共有四类：<br/>${orange}函数定义和函数表达式
						${endOrange}——最常用的方式，<br/>function myFun () { return 1; }<br/>
						${orange}箭头函数${endOrange}——ES6新增的JavaScript标准，能让我们尽量以简洁
						的语法定义函数。<br/>myArg => myArg*2<br/>${orange}函数构造函数${endOrange}
						——不常使用的函数定义方法,让我们以字符串形式动态构造一个函数，这样的得到的函数是动态生成的<br/>
						new myFun('a', 'b', 'return a + b;')<br/>${orange}生成器函数${endOrange}
						——ES6新增功能，能让我们创建不同于普通函数的函数，在应用执行过程中，这种函数能够退出再重新进入，
						在这些再进入之间保留函数内变量的值。我们可以定义生成器版本的函数声明、函数表达式、函数构造函数。
						<br/>function${orange}*${endOrange} myFun () { ${orange}
						yield${endOrange} 1; }`
					},
					{
						text: `${blue}2.3.1函数声明和函数表达式${endOrange}
						<br/>他们之间有着微妙的区别。`
					},
					{
						text: `${orange}函数声明${endOrange}——独立的JavaScript代码块<br/>
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
						text: `${orange}函数表达式${endOrange}——总是其他表达式的一部分的函数<br/>
						var a= ${orange}${endOrange}function() {}${endOrange};<br/>
						myFun( ${orange}${endOrange}function() {}${endOrange} );`
					},
					{
						text: `如下是函数声明与函数表达式的${orange}不同点${endOrange}：<br/>
						函数声明是作为JavaScript代码中的独立表达式的，但它也能够包含在其他函数体内。而函数表达式
						则是通常作为其他语句的一部分，被放在表达式级别，作为变量声明（赋值）的右值，或者作为
						另一个函数调用的参数或者返回值。<br/>函数声明必须具有函数名，因为它是独立语句，有了名字才能被
						调用而函数表达式不用，它可以被变量调用。`
					},
					{
						text: `${blue}立即函数${endBlue}
						${orange}(function () {} ) (arg)${endBlue}
						这种函数叫做（立即调用函数表达式IIFE），第十章会重点讨论IIFE，该特性可以模拟JavaScript中的
						模块化。将函数表达式放在括号里可以让JavaScript解析器辨别出他是函数表达式而不是没有名字的
						函数声明而产生错误。<br/>还可以通过一元运算符（+ - ！ ~）来调用IIFE。如<br/>
						+function () {} ()...`
					},
					{
						text: `${blue}2.3.1箭头函数${endBlue}
						核心是：${orange}=>${endOrange}，我们来看一个简单的箭头函数：`,
						src: require('@/assets/codeJS2.6.png')
					},
					{
						text: `这种写法不会出现function、return等关键字，非常简洁。箭头函数有两种定义方式：<br/>
						${point}当没有参数或者参数个数大于1的时候，=>前的
						()一定要存在，但只有一个参数的时候可以省略括号；<br/>
						${point}当函数体只是一个表达式，可以省略大括号，且该表达式的值
						就是函数返回值，需要时可以添加大括号包裹代码块，此时若没有return，则返回undefined。`
					}
				]
			},
			{
				title: '2.4函数实参和形参',
				content: [
					{
						text: `函数中经常讨论的${orange}实参（argument）${endOrange}和
						${orange}形参（paramter）${endOrange}。形参就是我们定义函数时列举的变量，
						实参就是我们调用函数时传入的变量值。`
					},
					{
						text: `实参与形参是从前往后依次匹配，这样就会存在两种异常情况：<br/>
						${orange}形参数大于实参数${endOrange}：则未被匹配到的形参为undefined；
						<br/>${orange}实参数大于形参${endOrange}：额外的实参不会被赋给任何形参，
						在下一章，你将学会如何获取这些多余的实参。`
					},
					{
						text: `${blue}2.4.1——剩余参数${endBlue}
						我们来看一个例子`,
						src: require('@/assets/codeJS2.7.png')
					},
					{
						text: `上述的remainingNumbers是一个由剩余参数组成的数组，注意，只有最后一个形参才能作为剩余参数。`
					},
					{
						text: `${blue}2.4.2——默认参数${endBlue}
						再来看一个例子`,
						src: require('@/assets/codeJS2.8.png')
					},
					{
						text: `在ES6中，可以用另一种更简便的方法来实现默认参数<br/>
						${orange}function a(a, b = 'value')${endBlue}
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
						text: `${point}作为第一类对象，函数和其他JavaScript
						对象一样，类似于其他对象，函数具有以下功能：<br/>1.通过字面量创建；<br/>
						2.赋值给变量或者属性；<br/>3.作为函数参数传递；<br/>4.作为函数结果返回；<br/>
						5.赋值给属性和方法。`
					},
					{
						text: `${point}回调函数是被代码随后“回来调用”的函数，
						是一种很常见的函数，特别是在事件处理场景下。`
					},
					{
						text: `${point}函数具有属性，而且这些属性能够储存任何信息，
						我们可以利用这个属性做很多事。<br/>可以在函数属性中存储另一个函数用于之后的引用和调用；<br/>
						可以用函数属性创建一个缓存（记忆），用于减少不必要的计算。`
					},
					{
						text: `${point}很多种函数类型：函数声明、函数表达式、
						构造函数、箭头函数和函数生成器。`
					},
					{
						text: `${point}函数的参数：<br/>
						形参（paramter）和实参（argument）。`
					},
					{
						text: `${point}剩余参数和默认参数是JavaScript新特性。`
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
						text: `本章主要包括以下内容：<br/><span style="font-size: 24px;">·${endOrange}
						函数中两个隐含的参数： ${orange}arguments和this${endOrange}；<br/>
						${point}${orange}调用函数${endOrange}
						的不同方式；<br/>${point}处理函数
						${orange}上下文${endOrange}的问题。`
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
						text: `${blue}3.2.1——arguments参数${endBlue}
						无论是否有明确对应的形参，我们都可以通过arguments访问到函数调用时的所有参数，借此实现原生JavaScript
						并不支持的函数重载特性，并且可以实现接收参数数量可变的可变函数。`
					},
					{
						text: `arguments对象有一个名为${orange}length${endOrange}的属性，表示实参个数，
						通过数组索引方式可以获取单个参数，尽管如此，arguments并不是JavaScript数组，如果你在arguments上
						使用数组的操作方法，会报错，因此他仅是一个类数组的结构。我们来看个求和的函数例子。`,
						src: require('@/assets/codeJS3.1.png')
					},
					{
						text: `大多数情况下，剩余参数可以替代arguments使用，并且剩余参数是真正的数组，所以建议大家灵活使用。`
					},
					{
						text: `${blue}arguments对象作为函数参数的别名
						${endBlue}如我们定义了一函数，它只接收一个参数，接着我们调用它，并传入实参。可以同时通过形参名和
						arguments对象访问到这个实参，这时如果改变了arguments对象的值，如arguments[0]='xxx'，则传入的
						函数参数也被修改了，变为xxx。反之，如果我们修改了某个参数值，则arguments对象也被修改了。`
					},
					{
						text: `${blue}避免使用别名${endBlue}
						这会影响代码的可读性，在JavaScript提供的严格模式（strict）下将无法使用。通过字符串'use strict'
						便启用严格模式。`	
					},
					{
						text: `${blue}3.2.2——this参数：函数上下文${endBlue}
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
						${point}作为一个函数（function）——myFun()，直接被调用；
						${point}作为一个方法（method）——ninja.myFun()，关联在一个
						对象上，实现面向对象编程；${point}作为一个构造函数（constructor）
						new Ninja()，实例化一个新的对象；<span style="font-size: 24px;">·${endOrange}
						通过函数的apply或者call方法——myFun.apply(ninja)或myFun.call(ninja)。`
					},
					{
						text: `${blue}3.3.1——作为函数被直接调用${endBlue}
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
						text: `${blue}3.3.2——作为方法被调用${endBlue}
						当一个函数被赋值给一个对象的属性，并且通过对象属性引用的方式调用函数时，就被作为对象的方法被调用。
						${orange}var ninja = {};<br/>ninja.skulk = function() {};<br/>
						ninja.skulk();${endBlue}调用时，该对象会成为函数上下文，并且在函数内部可通过this访问到。`
					},
					{
						text: `即使两个不同的对象，他们中的属性共享了同一个函数，通过方法调用时返回的this仍然是预期的
						各自对象本身。在第六章我们会讲到有关JavaScript提供的继承机制，会使代码更加简单。`
					},
					{
						text: `${blue}3.3.3——作为构造函数被调用${endBlue}
						在调用函数之前使用关键字${orange}new${endOrange}，注意不要把函数构造器和构造函数
						混为一谈，虽然差别很小，但是至关重要。通过函数的构造器我们可以将动态创建的字符串创建为函数
						new Function('a', 'b', 'return a + b')，<br/>而构造函数是我们用来${orange}
						初始化对象实例${endOrange}的。`
					},
					{
						text: `${blue}构造函数的强大功能${endBlue}
						接下来我们使用构造函数实现通用对象：`,
						src: require('@/assets/codeJS3.3.png')
					},
					{
						text: `一般来说，调用构造函数时会发生一系列特殊的操作：<br/>
						${point}创建一个新的对象；<br/>
						${point}该对象的作为this参数传递给构造函数，成为上下文；<br/>
						${point}新构造的对象作为new运算符的返回值（除了一特殊情况）。`,
						src: require('@/assets/codeJS3.4.png')
					},
					{
						text: `构造函数的${orange}目的${endOrange}是创建一个新对象，并将其初始化，
						作为构造函数的返回值。任何有悖于这两点的情况都不适合作为构造函数。`
					},
					{
						text: `${orange}构造函数返回值${endBlue}
						上面我们说了，构造函数会将新构造的对象作为调用结果通过（new）返回，那么当构造函数自身有返回值的时候会怎么样呢`,
						src: require('@/assets/codeJS3.5.png')				
					},
					{
						text: `当作为构造函数调用时，其返回值1会被忽略，真正返回的是新构造出来的ninja对象实例。<br/>
						但是当构造函数返回值是一个${orange}对象${endOrange}时，则该对象会作为整个new表达式
						的返回值，而传入构造函数的this将会被丢弃。`
					},
					{
						text: `${blue}编写构造函数的注意事项${endBlue}
						构造函数虽然在作为普通函数调用时（即不通过new关键字）也可以正常调用，但是并没有意义，同时还会造成
						不必要的麻烦。所以构造函数的命名通常与其他普通函数不一样，正常的函数会以小写字母开头，并描述一个动作，
						而构造函数通常以大写字母开头，以此来区分。（ function Ninja() {} ）。`
					},
					{
						text: `${blue}3.2.4——使用apply和call调用${endBlue}
						你应该已经注意到，不同的函数调用方法，主要区别在于最终作为函数上下文传递给执行函数的对象不同。`
					},
					{
						text: `使用apply和call方法可以显式地指定任何对象作为函数上下文。这两种正是函数的方法，作为第一类对象，
						函数可以拥有自己的属性和方法。若想使用${orange}apply${endOrange}调用函数，
						需要传入2个参数：作为函数上下文的对象和一个${orange}数组${endOrange}作为函数调用的参数。
						${orange}call${endOrange}方法不同的是参数直接以${orange}
						参数列表${endOrange}形式传入，而不是数组。`,
						src: require('@/assets/codeJS3.6.png')
					},
					{
						text: `${blue}强制指定回调函数的函数上下文${endBlue}
						在${orange}命令式编程${endOrange}中，常常将数组传给函数，然后使用for循环遍历数组，
						再对数组每个元素执行操作；<br/>而${orange}函数式${endOrange}方法创建的函数只处理
						单个元素。`,
						src: require('@/assets/codeJS3.7.png')
					},
					{
						text: `为了实现更加函数式的风格，所有数组对象均可使用forEach函数，对每个数组元素执行回调。
						${orange}forEach${endOrange}遍历函数将每个数组元素传给回调函数，将当前元素作为
						回调函数的上下文。虽然JavaScript引擎已经提供给我们一个forEach方法，但是在这里我们写一个简化版的迭代函数。`,
						src: require('@/assets/codeJS3.8.png')
					}

				]
			},
			{
				title: '3.4解决函数上下文问题',
				content: [
					{
						text: `${blue}3.4.1——使用箭头函数绕过函数上下文${endBlue}
						箭头函数没有单独的this参数，箭头函数的this与声明所在的上下文的相同。`
					},
					{
						text: `调用箭头函数时，不会隐式传入参数this，而是从定义时的函数继承上下文。若箭头函数存在于对象字面量中，
						箭头函数的this将会指向window对象，在构造函数内部则this指向构造函数本身。具体请看：`,
						src: require('@/assets/codeJS3.9.png')
					},
					{
						text: `${blue}3.4.1——使用bind方法${endBlue}
						函数还可以访问${orange}bind${endOrange}方法创建新函数`,
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
						text: `${blue}4.2.1——封装私有变量${endBlue}
						私有变量是对外部隐藏的对象属性，原生JavaScript并不支持私有变量，但是我们使用闭包可以实现很接近的，可接受的
						私有变量。如下：`,
						src: require('@/assets/codeJS4.3.png')
					},
					{
						text: `通过使用闭包，我们可以通过方法对ninja的状态进行维护，但无法直接访问——这是因为闭包内部变量可以通过
						闭包内部方法进行访问，构造器外部的代码则不能直接访问闭包内部变量。`
					},
					{
						text: `${blue}4.2.2——回调函数${endBlue}
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
						${point}全局执行上下文：只有一个，程序开始运行就已经创建；<br/>
						${point}函数执行上下文：每次调用函数时创建一个新的。`
					},
					{
						text: `<span style="color: #ff5400;font-size:20px;">注意：${endOrange}前面我们说了调用函数时可以通过关键字this访问
						函数上下文，这两个上下文是不一样的概念,执行上下文是内部的JavaScript概念，JavaScript引擎通过执行上下文来追踪函数的
						执行。`
					},
					{
						text: `<strong>由于JavaScript基于单线程的执行模型，所以一旦函数发生调用，当前的执行上下文必须停止执行，
						并创建新的函数执行上下文来执行函数。当函数执行完成后，将函数执行上下文销毁，重新回到发生调用的执行上下文中。
						所以需要跟踪执行上下文——正在执行的上下文和正在等待的上下文，最简单的方式使用${orange}
						执行上下文栈（调用栈）。${endOrange}</strong>`
					},
					{
						text: `栈是一种基本的数据结构，只能从栈顶对数据项进行插入和读取。<br/>我们来看一个简单的例子：`,
						src: require('@/assets/codeJS4.5.png')
					},
					{
						text: `${point}程序开始执行的作用域是调用栈中的全局执行作用域；<br/>
						${point}函数skulk被调用后，新的函数作用域进栈，全局作用域暂停；<br/>
						${point}report函数调用后，其作用域进栈，skulk作用域暂停；<br/>
						${point}report函数执行完毕后，其函数作用域出栈，skulk作用域恢复执行；
						<br/>${point}skulk函数执行完毕后，其执行作用域出栈，全局作用域恢复执行。`
					},
					{
						text: `执行上下文除了可以跟踪应用程序的执行位置外，对于${orange}标识符${endOrange}
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
						text: `词法环境是JavaScript作用域的内部实现机制，称为：${orange}作用域（scopes）${endOrange}`
					},
					{
						text: `通常来说，作用域与特定的JavaScript代码结构相关联，可以是一个函数，一个代码片段，也可以是try-catch
						语句。这些代码结构可以具有独立的标识符映射表。`
					},
					{
						text: `${blue}代码嵌套${endBlue}
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
						text: `我们可以通过三个关键字来定义变量：${orange}var, let, const${endOrange}。
						他们之间的不同在于：可变性、与词法环境的关系。`
					},
					{
						text: `${blue}4.5.1——变量可变性${endBlue}
						通过变量可变性来分类的话，可以将const放在一组，var和let放在另一组。通过const定义的变量都不可变，也就是通过
						const声明的变量的值只能设置一次。`
					},
					{
						text: `${orange}const${endOrange}变量常用于两种目的：<br/>
						1、不需要重新复赋值的特殊变量；<br/>
						2、指定一个固定的值，例如球队人数的最大值，通过一个语义化变量来指定，而不是用数字。<br/>
						让我们来看一些简单的例子：`,
						src: require('@/assets/codeJS4.8.png')
					},
					{
						text: `${blue}4.5.2——定义变量的关键字与词法环境${endBlue}
						将三个关键字通过与词法环境的关系进行分类的话，将var分为一组，const let分为另一类。`
					},
					{
						text: `${orange}使用关键字var${endBlue}
						该变量是在距离最近的${orange}函数内部${endOrange}或者是
						${orange}全局词法环境中${endOrange}定义的。<br/>
						在函数环境内定义的变量不可在函数外访问，但在块级环境（即{}内）中定义的变量（例如在for循环中）定义的变量，
						则可以在块级范围外访问到，这是JavaScript的一特性。`
					},
					{
						text: `${orange}使用let const定义具有具有块级作用域的变量${endBlue}
						他们直接在最近的词法环境中定义变量（可以是块级作用域、函数内、循环内或者全局环境中）。我们可以用let const
						定义块级别、函数级别、全局级别的变量。`
					},
					{
						text: `通过他们定义的变量只能在定义时所处的词法环境内访问。`
					},
					{
						text: `${blue}4.5.3——在词法环境中注册标识符${endBlue}
						JavaScript作为一门编程语言，设计的基本原则是易用性，所以不需要指定返回值类型，函数参数类型，变量类型等。
						而且它对定义函数的位置并不挑剔。`,
						src: require('@/assets/codeJS4.9.png')
					},
					{
						text: `${blue}注册标识符的过程${endBlue}
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
						text: `${blue}函数重载${endBlue}`,
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
						text: `${orange}变量提升${endBlue}
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
						text: `${blue}4.6.1——回顾闭包模拟私有变量${endBlue}`,
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
						text: `${blue}4.6.2——私有变量的警告${endBlue}
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
						text: `可能你还并不了解${orange}function*和yield${endOrange}，没关系，我们一起慢慢来
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
						${orange}迭代器${endOrange}的对象。`
					},
					{
						text: `${blue}5.2.1——通过迭代器控制生成器${endBlue}
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
						text: `${blue}对迭代器进行迭代${endBlue}`,
						src: require('@/assets/codeJS5.5.png')
					},
					{
						text: `这就是上述的for-of循环的原理，他只是对迭代器进行迭代的语法糖。<br/>
						不同于手动调用next方法，for-of循环同时还要查看生成器是否完成，在后台做了完全相同的工作。`
					},
					{
						text: `${blue}把执行权交给下一个生成器${endBlue}
						就像在标准函数中调用另一个函数一样，我们需要把生成器的执行委托给另一个生成器，来看个例子：`,
						src: require('@/assets/codeJS5.6.png')
					},
					{
						text: `${blue}5.2.2——使用生成器${endBlue}
						用生成器生成ID序列<br/>在创建某些对象时，我们需要为这些对象赋一个唯一的ID值，这时候我们
						就可以通过一个生成器生成。`,
						src: require('@/assets/codeJS5.7.png')
					},
					{
						text: `该方法不用担心id在其他地方会被修改，因为只能在生成器中访问，另外，如果需要一个新的序列值，
						我们只需要再初始化一个新迭代器就可以了。`
					},
					{
						text: `${blue}5.2.3——与生成器交互${endBlue}
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
						text: `在${orange}第二次${endOrange}调用next方法时，传递的参数ninja作为上一个yield表达式
						（上次挂起的位置）的返回值，所以imposter为ninja。`
					},
					{
						text: `${blue}5.2.4——探索生成器内部${endBlue}
						调用生成器的时候并不会执行它，其实它的工作状态可以归为以下四个状态：<br/>
						${point}挂起开始——刚创建了生成器，其中任何代码都未执行；<br/>
						${point}执行——要么刚开始，要么从上次挂起的位置开始执行，
						当调用next方法时，只要当前存在可执行的代码，就会跳到这个状态；<br/>
						${point}挂起让渡——遇到yield表达式，它会创建一个包含着返回值的新对象，
						随后挂起执行，暂停并等待着再次执行；<br/>
						${point}完成——若执行到return语句或者是全部代码执行完毕。`
					},
					{
						text: `${blue}通过执行上下文跟踪生成器函数${endBlue}
						${orange}调用函数生成器之前${endOrange}，由于现在执行的全局代码，所以执行上下文仅仅
						包含全局执行上下文，该上下文引用了当前的标识符所在的全局环境。`
					},
					{
						text: `${orange}调用生成器函数${endOrange}，控制流进入了生成器，当前将会创建一个新的
						函数环境上下文，并将该上下文推进执行上下文栈，生成器并不会执行任何函数代码，取而代之的是生成一个新的迭代器
						再从中返回，通过在代码中用一个变量引用这个迭代器。由于迭代器是用来控制生成器的执行的，故而迭代器保存着一个
						在他创建位置处的执行上下文。<br/>
						当程序从生成器中执行完毕后，普通函数执行完毕后，对应的执行环境上下文会从栈中弹出，并被销毁，
						而生成器函数不是这样：<br/>相对应的生成器会从栈中弹出，而那个迭代器变量还保留着对它的引用，所以它不会被销毁，
						你可以把它看成一种类似闭包的事物。迭代器保存了对当前执行环境的引用。`
					},
					{
						text: `${orange}调用迭代器的next方法${endOrange}：如果只是一个普通函数的调用，这个语句
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
						它包括两个参数（${orange}resolve、reject${endOrange}），我们可以手动调用resolve函数让
						承诺兑现，也可以当错误发生时手动调用reject。`
					},
					{
						text: `代码调用Promise对象内置的then方法，我们向这个方法中传入两个回调函数，一个成功的，一个失败的。
						当承诺兑现时（我们调用了resolve方法），第一个回调函数就被调用，而当出现错误就会调用后一个回调函数（
						可以是发生一个未处理的错误，也可以我们手动调用reject）`
					},
					{
						text: `${blue}5.3.1——简单回调函数的问题${endBlue}
						1、错误难以处理：一个长时间任务（如从服务器获取数据）很容易发生错误，而调用回调函数的代码和开始任务中的
						这段代码一般不会位于事件循环的同一步骤（12章将会讲到事件循环），导致的结果就是错误会丢失。<br/>
						在Node.js中，回调函数一般具有两个参数：err 和 data。当错误发生在某处时，err将会是一个非空的值。<br/>
						2、执行连续步骤很困难：在我们结束了第一个长时间任务以后，我们需要利用获取到的数据进行某些操作，这样可能
						又进入了一个长时间的过程（各步骤相互依赖），从而进入多层嵌套循环，代码变得难以理解和修改维护。`
					},
					{
						text: `${blue}5.3.2——深入理解promise${endBlue}
						promise对象在整个生命周期中，会经历多种状态：<br/>
						从等待（${orange}pending${endOrange}）状态开始，因为我们此时对该对象一无所知，
						所以也称为未实现（${orange}unresolved${endOrange}）,执行过程中，如果resolve被调用，
						promise就会进入完成（${orange}fulfilled${endOrange}）状态，该状态下我们能够成功获取
						承诺的值。<br/>另一方面，如果reject被调用，或者未处理的一个异常在调用过程中发生了，promise就会进入
						拒绝状态，虽然我们无法获取承诺值，但是我们知道了其中的原因。<br/>
						${orange}注意：${endOrange}一个promise对象一旦进入了fulfilled状态或者rejected状态，
						就无法再切换了。`
					},
					{
						text: `${blue}5.3.3——拒绝promise${endBlue}
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
						text: `${blue}5.3.4——链式调用promise${endBlue}
						调用then方法以后还会再返回一个新的promise对象。`,
						src: require('@/assets/codeJS5.13.png')
					},
					{
						text: `${blue}5.3.5——等待多个promise${endBlue}
						除了处理相互依赖的异步任务序列外，对于等待多个独立的异步任务，promise能够显著减少代码量，我们
						看一个并行执行的例子（获取一系列独立的东西）：`,
						src: require('@/assets/codeJS5.14.png')
					},
					{
						text: `上述例子中，如果数组中的promise全部被解决，那么返回的promise就会被解决，如果有一个失败了，
						则整个promise对象都会被拒绝。<br/>`
					},
					{
						text: `${blue}5.3.5——个promise竞赛${endBlue}
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
						text: `${orange}面向未来的async函数${endBlue}
						当前的JavaScript标准增加了两个关键字：${orange}async和await${endOrange}。我们来看个例子：`,
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
				title: '6.1理解原型',
				content: [
					{
						text: `可在原型对象上添加特定属性<br/>
						原型是定义属性和功能的便捷方式，${orange}对象可以访问原型上的属性和方法${endOrange}。
						原型类似于面向对象语言中的类（class）。其主要用途是使用一种类风格的面向对象和继承的方式进行编码。
						JavaScript也引入了新特性，关键字${orange}class${endOrange}，已经可以很容易模拟类与继承
						（我们后面会讲到）`
					},
					{
						text: `${orange}对象${endOrange}是属性名和属性的集合。<br/>
						属性可以是简单值（数字、字符串）、函数或者其他对象，同时可以修改（obj.a = b）、删除（delete obj.a）、
						增加对象属性（obj.b = ''）。`
					},
					{
						text: `为了避免重复造轮子，尽可能复用代码，${orange}继承${endOrange}是复用代码的一种方式，
						有助于合理组织程序代码，将一个对象的属性扩展到另一个对象，JavaScript中可通过原型实现继承。`
					},
					{
						text: `每个对象都含有原型的引用，当查找属性时，如对象本身找不到该属性，则会查找其原型上是否具有该属性。`,
						src: require('@/assets/codeJS6.1.png')
					},
					{
						text: `对象可以具有本身的原型的属性，同时也可以具有其原型的原型的属性，以此类推,形成原型链。
						查找特定属性将会被委托在整个原型链上，只有当没有更多的原型可以查找时，才会停止。`
					}
				]
			},
			{
				title: '6.2对象构造器与原型',
				content: [
					{
						text: `在创建对象的时候，我们希望能将这些属性和方法整合为一个类。<br/>
						JavaScript使用关键字${orange}new${endOrange}，通过构造函数初始化新对象，但没有真正的类定义，
						通过new应用于构造函数之前，触发一个新对象的分配。`
					},
					{
						text: `每个函数都有一个原型对象，该原型对象指向创建对象的函数。我们来看一个简单的例子：`,
						src: require('@/assets/codeJS6.2.png')
					},
					{
						text: `将函数作为构造器调用，创建了新分配的对象，并将其设置为函数的上下文（this）访问。`
					},
					{
						text: `每一个函数都具有一个原型对象，每一个函数的原型都具有一个${orange}constructor${endOrange}属性，
						其值指向那个函数，constructor对象的原型设置为新创建的对象的原型。`
					},
					{
						text: `lxw2对象创建时，其原型被设置为Lxw的原型，所以lxw2可以访问到Lxw的原型的属性和方法。
						（所有通过构造器Lxw创建的对象，都可调用ninja方法，实现复用）`
					},
					{
						text: `实例属性：`,
						src: require('@/assets/codeJS6.3.png')
					},
					{
						text: `实例属性会覆盖原型同名属性，因为在示例中找到属性后，就不会再沿着原型链去查找属性。`
					},
					{
						text: `${blue}JavaScript动态特性的副作用${endBlue}
						通过原型，一切都可以在运行时修改。`,
						src: require('@/assets/codeJS6.4.png')
					},
					{
						text: `${orange}对象与函数原型的引用关系是在对象创建时建立的。${endOrange}`
					},
					{
						text: `${blue}通过构造函数实现对象类型${endBlue}每个函数的原型对象都有一个constructor属性，指向函数本身，
						通过使用constructor属性，我们可以访问创建该对象时所用的函数，可用于类型校验。`,
						src: require('@/assets/codeJS6.5.png')
					},
					{
						text: `上述的lxw2也是Lxw的实例，但lxw1与lxw2完全不同。`
					}
				]
			},
			{
				title: '6.3实现继承',
				content: [
					{
						text: `继承是在新对象上复用现有对象的属性的形式，我们来看一个例子：`,
						src: require('@/assets/codeJS6.6.png')
					},
					{
						text: `真正实现完整的原型链，最佳技术方案是：<br/>
						${orange}※将一个对象的原型直接设置为另一个对象的实例※${endOrange}：`,
						src: require('@/assets/codeJS6.7.png')
					},
					{
						text: `新创建的Ninja对象将设置为Ninja的原型属性所指向的对象，即Person实例（instanceof可以判断前者是否
						继承原型链上的对象功能）`
					},
					{
						text: `${blue}※继承原理※${endBlue}
						通过Ninja对象访问一个方法，首先查找对象本身，再搜索对象原型即Person对象，再查找到Person的原型上。`
					},
					{
						text: `刚刚这种方式会让我们失去Ninja和Ninja初始原型的联系。constructor属性可以用于检测一个对象是否由
						另一个函数创建。现在（ninja.constructor === Ninja）是不会通过的`
					},
					{
						text: `在JavaScript中，对象是通过${orange}属性描述${endOrange}进行描述的，可配置以下关键字<br/>
						${point}configurable——（true/false），是否可修改或者删除；<br/>
						${point}enumerable——（true），是否可在for in 循环中遍历；<br/>
						${point}value——指定属性的值（默认为undefined）；<br/>
						${point}writable——（true/false），是否可以通过赋值语句修改<br/>
						${point}get——定义getter函数，不能与value、writable同时用；<br/>
						${point}set——定义setter函数，不能与value、writable同时用；<br/>`
					},
					{
						text: `例如通过ninja.name = 'name'创建的属性就是可被修改、删除、可遍历、可写的，此时set和get函数均为
						undefined。`
					},
					{
						text: `我们可以通过${orange}Object.defineProperty${endOrange}方法配置对象属性的信息：`,
						src: require('@/assets/codeJS6.8.png')
					},
					{
						text: `为什么要把${orange}enumerable${endOrange}设置为false，是为了重新建立（ninja）实例与（Ninja）
						构造器之间的联系。具体请看:`,
						src: require('@/assets/codeJS6.9.png')
					},
					{
						text: `首先检查Ninja函数的原型new Person(),由于ninja是new Person()的实例，所以<br/>
						ninja instanceof Ninja ==> true<br/>
						由于Person是new Person()的原型。所以处于原型链，即<br/>
						ninja instanceof Person ==> true;`
					}
				]
			},
			{
				title: '6.4使用ES6的class',
				content: [
					{
						text: `${blue}使用关键字class${endBlue}话不多说，先上一个简单明了的例子：`,
						src: require('@/assets/codeJS6.10.png')
					},
					{
						text: `class其实是语法糖，模拟类的用法，基于原型，所以上面例子中的代码可以还原为：`,
						src: require('@/assets/codeJS6.11.png')
					},
					{
						text: `${orange}静态方法${endOrange}（在class中用关键字static创建）<br/>`,
						src: require('@/assets/codeJS6.12.png')
					},
					{
						text: `上述例子中compare方法比较了两个实例的原型属性level，并不是实例属性，而我们发现实例ninja无法访问
						静态方法compare，只有类Ninja可以访问。`
					},
					{
						text: `${blue}实现继承${endBlue}
						我们需要记住：对所有实例可以访问的方法要直接绑定在构造函数的原型上，如Person构造函数上的dance方法。
						为了实现继承，我们必须将实例对象衍生的原型设置成“基类”。在ES6中，继承变得简单多了：`,
						src: require('@/assets/codeJS6.13.png')
					}
				]
			}
		]
	},
	//第七章
	{
		mainTitle: '7、控制对象的访问',
		content: [
			{
				title: '7.1使用getter与setter控制属性访问',
				content: [
					{
						text: `我们在修改对象的属性时，可以通过${orange}obj.value = 'value'${endOrange}，这样很方便，但是
						会出现以下问题或者需求：<br/>
						${point}错误赋值：如一个number类型的属性被赋值为字符串或者其他类型；<br/>
						${point}需要记录属性值的变化；<br/>
						${point}需要显示属性的更新值（如在UI中显示属性值）。<br/>
						我们可以通过${orange}getter和setter来实现上述要求${endOrange}`
					},
					{
						text: `我们在前面其实已经接触过getter和setter，闭包中实现模拟私有变量：`,
						src: require('@/assets/codeJS7.1.png')
					},
					{
						text: `上述例子中实例的属性skillLevel只能通过两个方法访问和修改，如果想记录属性的访问、修改记录，
						只需在getLevel和setLevel中添加一个记录语句，此时我们只能通过显式调用两种方法来与属性交互。`
					},
					{
						text: `${blue}7.1.1——定义getter和setter${endBlue}在JavaScript中，可以通过两种方法来定义getter和setter
						：<br/>${point}通过对象字面量定义，或在ES6中通过class定义；<br/>
						${point}使用内置的Object.defineProperty方法。我们来看一下具体的示例：`,
						src: require('@/assets/codeJS7.2.png')
					},
					{
						text: `可以直接通过字面量obj.value调用get方法获取属性，使用obj.name = value调用set方法来修改属性值。
						接下来我们看看在ES6中使用class来定义getter和setter：`,
						src: require('@/assets/codeJS7.3.png')
					},
					{
						text: `上述两种方法不可以让属性变成类似于私有变量的属性，但是我们可以通过Object.defineProperty方法实现：`,
						src: require('@/assets/codeJS7.4.png')
					},
					{
						text: `正如我们所说，Object.defineProperty可以创造模拟私有变量的具有getter、setter的属性。`
					},
					{
						text: `${blue}7.1.2——使用getter与setter校验属性值${endBlue}
						当对属性赋值的时候，就会调用setter方法，我们可以利用这一特点进行值的校验：`,
						src: require('@/assets/codeJS7.5.png')
					},
					{
						text: `${blue}7.1.3——定义计算属性${endBlue}
						getter、setter还可以用于定义属性值的计算方法，及每次访问都会计算属性值。计算方法不会存储具体的值，他们提供
						get和（或）set方法，用于直接提取和设置属性。`,
						src: require('@/assets/codeJS7.6.png')
					}
				]
			},
			{
				title: '7.2使用代理访问',
				content: [
					{
						text: `${orange}代理（proxy）${endOrange}是我们通过代理控制对另一个对象的访问。通过代理可以定义当对象发生
						交互时可执行的自定义行为——如读取或者设置属性值，或调用方法。可以将代理理解为通用化的getter、setter，
						${orange}区别是${endOrange}每个getter和setter仅能控制单个对象属性，而代理可用于对象交互的通用处理，也包括
						调用对象的方法。代理是ES6提出的，可通过内置的Proxy构造器创建代理：`,
						src: require('@/assets/codeJS7.7.png')
					},
					{
						text: `使用代理的要点：通过Proxy构造器创建代理对象，代理对象访问目标对象时，执行相应的操作。`
					},
					{
						text: `${blue}7.2.1——使用代理记录日志${endBlue}
						例如我们可能想知道调用了哪个函数，执行了多久，读取或者写入了哪些属性。`,
						src: require('@/assets/codeJS7.8.png')
					},
					{
						text: `我们创建了带有name属性的对象ninja，将该对象传进makeLog函数，作为新创建的代理对象的目标函数。
						将代理对象重新赋值给ninja标识符（我们最初的ninja对象作为代理对象的目标对象仍然活跃）<br/>
						每当读取属性（如ninja.name）时，程序将调用get方法，记录相应的日志，当写入属性（如ninja.weapon = sword）,
						也会记录日志。`
					},
					{
						text: `${blue}7.2.2——使用代理检测性能${endBlue}`,
						src: require('@/assets/codeJS7.9.png')
					},
					{
						text: `我们要评估isPrime函数的性能，我们可以使用代理包装函数，并且添加一个调用该函数就会触发的方法（apply)
						，程序代码的其余部分完全可以无视这些变化。`
					},
					{
						text: `${blue}7.2.3——使用代理自动填充属性${endBlue}
						例如，假如需要抽象计算机的文件结构模型，一个文件夹对象既可以有属性，也可以有文件夹。我们在以前可能会一层一层
						地设计代码，但是现在我们不需要：`,
						src: require('@/assets/codeJS7.10.png')
					},
					{
						text: `${blue}7.2.4——使用代理实现数组负索引${endBlue}
						${orange}负索引${endOrange}即arr[-1] = arr[arr.length - 1]，但是JavaScript并不支持负索引，我们可以通过
						代理进行模拟。`,
						src: require('@/assets/codeJS7.11.png')
					},
					{
						text: `${blue}代理效率并不高，我们不建议在多次重复执行代码的过程中使用代理，这会大大降低性能${endBlue}`
					}
				]
			}
		]
	},
	//第八章
	{
		mainTitle: '8、处理集合',
		content: [
			{
				title: '8.1数组',
				content: [
					{
						text: `${blue}8.1.1——创建数组${endBlue}
						创建数组有两种方法：<br/>
						${point}使用内置的Array构造函数；<br/>
						${point}使用数组字面量 []。<br/>
						通过array.length可以获取数组的长度，通过索引值可以获取数组元素，若是索引值超出数组长度
						（length-1），获取到的元素为undefined。若一个数组只有三个元素，通过array[3] = 'array4'
						可以给数组添加第四个元素，同时也扩展了数组长度。还可以通过array.length = 2来切割数组，
						保留前两个数组元素。`
					},
					{
						text: `使用数组字面量创建数组优于使用内置Array构造函数创建，因为数组字面量不仅简洁，
						而且由于JavaScript的高度动态特性，无法阻止修改内置的Array构造函数，也就意味着new Array()
						创建的不一定是数组，所以推荐坚持使用字面量来创建。`
					},
					{
						text: `访问超出数组长度的元素会返回undefined，则说明了${orange}JavaScript的数组是对象
						${endOrange}`
					},
					{
						text: `我们可以手动修改length属性，将length改为比原来大的值，数组会被扩展，新扩展的元素为
						undefined，比原来小的值则会裁减数组。`
					},
					{
						text: `${blue}8.1.2——数组添加、删除元素${endBlue}
						${point}${orange}push${endOrange}:在数组末尾添加元素；<br/>
						${point}${orange}unshift${endOrange}:在数组头部添加元素；<br/>
						${point}${orange}shift${endOrange}:从数组头部删除元素；<br/>
						${point}${orange}pop${endOrange}:从数组末尾删除元素。<br/>`
					},
					{
						text: `性能考虑：pop和push都只影响数组最后一个元素，而shift和unshift是修改第一个元素，
						之后的所有元素都会进行调整，因此push和pop速度更快。`
					},
					{
						text: `${blue}8.1.3——任意位置添加删除元素${endBlue}
						我们可以使用${orange}delete操作符${endOrange}来删除数组任意位置的元素，如delete array[2]；
						可以删除数组的第三个元素，但是此时数组的长度并没有改变，第三个元素只是变成了undefined，
						所以该方法并没有真正删除了数组元素。`
					},
					{
						text: `要想真正实现删除、添加数组元素，JavaScript提供了一个${orange}splice方法${endOrange},
						${orange}使用splice${endOrange}：<br/>
						array.splice(start, howmany, item...);起始索引值start（必需）规定了从什么位置开始删除
						或者添加元素，howmany规定了删除多少个元素（必须是数字，可以是0），如果没有传入，则会一直删除
						到数组末尾，item则是需要添加的数组元素，用,分隔开依次传入。`
					},
					{
						text: `${blue}8.1.4——数组常用操作${endBlue}
						${point}遍历数组;<br/>
						${point}基于现有的数组元素映射创建新数组;<br/>
						${point}验证数组元素是否匹配指定的条件;<br/>
						${point}查找数组特定元素;<br/>
						${point}聚合数组，基于数组元素计算（如计算数组元素之和）;<br/>`
					},
					{
						text: `${blue}数组遍历${endBlue}
						我们最开始是使用for循环索引值递增的方式进行遍历，该过程需要考虑起始索引、数组长度、计步器，
						确保不超出数组长度前提下能够遍历所有元素，为了简化该过程我们可以采用内置的
						${orange}forEach方法${endOrange}：<br/>
						array.forEach(item => { console.log(item) })。`
					},
					{
						text: `${blue}映射数组${endBlue}
						假设一个数组对象ninjas，每个ninja都有name和weapon属性，需要从这个数组中提取全部的weapon，
						我们可能会想到这种方法：`,
						src: require('@/assets/codeJS8.1.png')
					},
					{
						text: `${orange}采用映射数组的方式map方法${endOrange}<br/>
						只需要一条语句便可实现上例中的要求：<br/>
						const weapons = ninjas.map( ninja => ninja.weapon)`
					},
					{
						text: `${blue}测试数组元素${endBlue}
						处理某些集合的元素时，我们需要知道数组的全部元素或者部分元素是否满足某些特定的条件，
						JavaScript给我们提供了内置的${orange}every和some${endOrange}。`,
						src: require('@/assets/codeJS8.2.png')
					},
					{
						text: `使用every方法，只有全部元素都返回true，才能返回true，而some方法，只要有一个元素满足
						条件返回true，就能返回true。`
					},
					{
						text: `${blue}数组查找${endBlue}
						我们可以使用内置的${orange}find${endOrange}方法查找指定的元素。`,
						src: require('@/assets/codeJS8.3.png')
					},
					{
						text: `find返回单个数组元素，filter返回一个新的数组，元素为满足条件的所有原数组元素。`
					},
					{
						text: `查找数组索引：可以使用${orange}array.indexOf('item')${endOrange}查找指定元素的索引值，
						${orange}array.lastIndexOf('item')${endOrange}查找多个元素最后出现的位置，
						${orange}array.findIndex(item => item === 'item')${endOrange}查找元素的位置。`
					},
					{
						text: `${blue}数组排序${endBlue}
						首先，数组具有${orange}sort方法${endOrange}：给其传入一个回调函数<br/>
						array.sort((a, b) => a - b );该方法会产生以下几种结果：<br/>
						${point}结果<0，则a元素出现在b元素之前<br/>
						${point}结果=0，则元素a和元素b出现在相同位置（位置不变）<br/>
						${point}结果<0，则a元素出现在b元素之后<br/>`
					},
					{
						text: `我们也可以通过sort来将字母进行排序：`,
						src: require('@/assets/codeJS8.4.png')
					},
					{
						text: `${blue}合计数组元素${endBlue}
						使用${endOrange}reduce${endOrange}方法进行数组求和：`,
						src: require('@/assets/codeJS8.5.png')
					},
					{
						text: `${blue}8.1.5——复用内置的数组函数${endBlue}
						有时，我们想要创建一个对象，该对象包含一组数据。如果仅仅是集合，我们可以使用数组，但有时我们需要
						存储更多状态，就需要存储更多集合有关的元数据。让我们看看如何使用简单对象，并加上我们需要的方法。
						处理集合的方法在Array对象上，如何引入到我们自己的对象上呢？`,
						src: require('@/assets/codeJS8.6.png')
					},
					{
						text: `上例中，我们创建对象，并模拟一些数组的行为，首相定义length属性用于存放元素的数量，
						与数组类似。然后定义在末尾添加元素的add方法（类似于数组的push）。通常，Array.prototype.push
						方法通过自身函数的上下文执行数组。但是我们使用call方法，将上下文改成我们定义的对象。
						push方法添加length属性，为所添加的元素增加编号。add方法接收一个待添加到对象中的元素作为参数，
						有时可能没有类似的元素，因此我们又添加了gather方法，通过ID查找元素并添加到对象中。最后，
						利用内置的find实现自定义的find方法啊，用于查找对象中的任意元素。`
					}
				]
			},
			{
				title: '8.2Map',
				content: [
					{
						text: `假设你需要为一个网站创建多种语言，这种集合，将key映射到指定位置上，成为
						${orange}字典或者Map${endOrange}。在JavaScript中可以利用对象是属性名和属性值的特性，
						创建如下字典：`,
						src: require('@/assets/codeJS8.7.png')
					},
					{
						text: `上述例子看似很不错，但是通常来说并不可靠。`
					},
					{
						text: `${blue}8.2.1——别把对象当作Map${endBlue}
						由于可以通过原型访问未显式定义的对象属性，所以对象并非是最佳的Map，同时，对象的key只能是字符串，
						如果想映射成其他类型，它会默默转换为字符串。所以对象并不应该作为Map。`
					},
					{
						text: `${blue}8.2.2——创建Map${endBlue}
						使用内置的Map构造函数：`,
						src: require('@/assets/codeJS8.8.png')
					},
					{
						text: `map是键值对的集合，key可以是任意类型的值，甚至可以是对象。<br/>
						有时候，虽然两个有映射关系的key其值是相同的（如firstLink = window.location.href;
						secondLink = window.location.href），即两个对象的值相同，但这两个对象并不相等。`
					},
					{
						text: `${blue}8.2.3——遍历map${endBlue}
						因为map是集合，所以可以使用forof循环遍历map，也可以保证遍历的顺序与插入顺序一致，
						而在对象上使用forof循环则不能保证。`,
						src: require('@/assets/codeJS8.9.png')
					}
				]
			},
			{
				title: '8.3Set',
				content: [
					{
						text: `在许多实际问题中，我们必须处理一种集合，集合中每个元素都是唯一的，这种集合成为set。
						ES6中引入了一中全新的集合类型：Set。`
					},
					{
						text: `${blue}8.3.1——创建Set${endBlue}
						我们使用构造函数创建Set：`,
						src: require('@/assets/codeJS8.10.png')
					},
					{
						text: `Set具有多个可访问的方法：${orange}has, add${endOrange}以及属性
						${orange}size${endOrange}。`
					},
					{
						text: `${blue}8.3.2——并集${endBlue}
						两个集合的并集指的是创建一个新的集合，同时包含两个集合中的所有元素，当然，
						也不允许存在相同的元素两次。我们来看一个例子：`,
						src: require('@/assets/codeJS8.11.png')
					},
					{
						text: `${blue}8.3.3——交集${endBlue}
						交集是新创建一个集合只包含两个集合中重复出现的元素：`,
						src: require('@/assets/codeJS8.12.png')
					},
					{
						text: `${blue}8.3.4——差集${endBlue}
						差集是创建一个新的集合，只包含存在集合A中而不存在与集合B的元素。`,
						src: require('@/assets/codeJS8.13.png')
					}
				]
			}
		]
	},
	//第九章
	{
		mainTitle: '9、正则表达式',
		content: [
			{
				title: '9.1为什么需要正则表达式',
				content: [
					{
						text: `假设我们需要验证一个字符串，可能是网页中表单输入的字符串，它遵循邮编格式，长度为9位数字，
						中间需要有-字符连接前五个和后四个数字。
						我们可以对每个字符进行比较，但是这种很多不必要的重复不仅很不优雅还对性能有影响，看一下：`,
						src: require('@/assets/codeJS9.1.png')
					},
					{
						text: `这段代码利用字符在字符串中的位置，只需要比较检查两种值。执行时，仍然需要比较9次，但是
						每种比较只需要编写一次代码。让我们来看一下正则表达式的方法：虽然函数内部的正则表达式有点难以理解，
						但是非常简洁不是吗？`,
						src: require('@/assets/codeJS9.2.png')
					}
				]
			},
			{
				title: '9.2正则表达式进阶',
				content: [
					{
						text: `${blue}9.2.1——正则表达式说明${endBlue}
						我们可以简单地将正则表达式理解为使用模式匹配文本字符串的表达式，表达式本身具有用于定义模式的
						术语和操作符。`
					},
					{
						text: `在JavaScript中，与其他对象类似，创建正则表达式有两种方式：<br/>
						${point}使用正则表达式字面量；<br/>
						${point}通过创建RegExp对象的实例。<br/>
						例如，可以使用字面量创建一个简单的正则表达式（简称regexp），用于精确匹配字符串test：<br/>
						const pattern = /test/;<br/>
						与字符串通过引号分隔类似，regexp通过斜线进行分隔。另一种方式创建RegExp实例，传入regexp字符串：
						<br/>const pattern = new RegExp('test');<br/>${orange}注意：${endOrange}
						当正则表达式在开发环境中是明确的，推荐使用字面量语法，当需要在运行中动态创建字符串来构建regexp
						时，推荐使用构造函数创建实例。`
					},
					{
						text: `优先使用字面量语法的原因之一是反斜线在正则表达式中发挥了重要的作用，但是反斜线也用于转义
						字符，因此，对于反斜线本身则需要使用双反斜线来标识\\。这使得本来就很奇怪的正则表达式表示字符串时
						更加诡异。除了表达式本身，还有五个修饰符：<br/>
						${point}${orange}i: 对大小写不敏感，例如/test/i 不仅可以匹配test，还可以匹配TEST,teSt,
						TEst等等；${endOrange}<br/>
						${point}${orange}g: 查找所有匹配项，在查找到第一个匹配时不会停止，会继续查找；
						${endOrange}<br/>
						${point}${orange}m: 允许多行匹配，对获取textarea元素的值很有用；${endOrange}<br/>
						${point}${orange}y: 开启粘连匹配，regexp执行粘连匹配时试图从最后一个匹配的位置开始；
						${endOrange}<br/>
						${point}${orange}u: 允许使用Unicode点转义符(（此处为反斜杠）u{...})${endOrange}<br/>
						在字面量末尾添加修饰符（可以单个或者多个，多个时直接连写），或者作为第二个参数传给new RegExp()。`
					},
					{
						text: `${blue}9.2.2——术语和操作符${endBlue}
						<strong>精确匹配</strong><br/>
						除了非特殊字符或者操作符之外，字符必须准确出现在表达式中，例如，正则/test/中的四个字符，
						必须完全出现在所匹配的字符串中。一个接一个的字符直接连在一起，省略了操作符连接。<br/>
						<strong>匹配字符集</strong><br/>
						更多时候我们不需要匹配指定的字符串，而是需要匹配一组有限的字符集中的字符。我们可以将我们希望
						匹配的字符集放在[]中，指定字符集操作符：[abc]。这表示匹配abc中任意一个字符。有时，我们希望匹配
						一组有限字符集以外的任意字符，我们可以在左括号后添加一个尖角号^：[^abc]表示匹配除了abc以外的
						任意字符。字符集还有一个最重要的操作：限定范围。例如，匹配a-m之间的小写字母，虽然可以用
						[abcdefghijklm]来表示，但是更简洁的写法为：[a-m]。<br/>
						<strong>转义</strong><br/>
						并不是所有的字符和字符字面量都是等价的。毫无意外，字母与数字表示其本身，但是特殊字符如$、(.)
						匹配的是他们本身以外的内容，或者表示操作符。事实上，我们已经看到字符[、]、-、^表示他们本身
						以外的内容。<br/>在regexp中，反斜线\对其后面的字符进行转义，使其匹配本身的含义，所以
						\[ 匹配 [ 字符，而不再表示分组的括号，双反斜线\\匹配一个反斜线。<br/>
						<strong>起止符号</strong><br/>
						我们经常要确保匹配字符串的开始或者字符串结束。尖角号^用于匹配字符串的开始，如/^test/匹配的是
						test出现在字符串的开头。（这只是字符的重载，^还可以表示非），类似的，$表示字符串的结束。
						同时使用如/^test$/则是匹配整个字符串。<br/>
						<strong>重复出现</strong><br/>
						如果需要匹配四个连续的字符a，你可以使用/aaaa/完成，但是如果想要匹配任意数量的相同字符呢，
						有以下几种方式：<br/>
						${point}指定可选字符（可以出现0次或者1次），在字符后添加 ? ，例如：/t?est/可以同时匹配
						test和est。<br/>
						${point}指定字符必须出现1次或者多次，使用 + ，如/t+est/可匹配test、ttest、tttest等。<br/>
						${point}指定字符出现0次、1次或者多次，使用 * ，如/t*est/可匹配est、test、ttest等。<br/>
						${point}指定重复次数，使用括号指定重复次数，如/a{4}/,匹配4个连续的字符a。<br/>
						${point}指定循环次数的范围，使用逗号分隔，例如/a{4,10}/匹配4-10的连续的字符a。<br/>
						${point}指定开放区间，省略第2个值，保留逗号，如/a{4,}/匹配4个或者更多的连续a字符。<br/>
						这些运算符都可以是贪婪的或者非贪婪的。默认是贪婪模式，可以匹配所有可能的字符串。在运算符后面加上?
						例如/a+?/，使得运算符变成非贪婪模式，只进行最小限度的匹配。例如，对于字符串aaa，正则表达式
						/a+/会匹配全部3个字符，而非贪婪模式/a+?/则匹配一个字符a,因为一个a字符已经满足a+术语。<br/> 
						<strong>预定义字符集</strong><br/>
						有些希望匹配的内容可能无法通过字符字面量来表示（如回车符），有时我们还希望匹配字符集，
						例如一组十进制数字或一组空格，正则表达式可以预定义表示这些字符或者常用集合的元字符，这样我们
						就可以匹配控制字符，也不需要对常用的字符集做特殊处理。有个对应表在后面（稍后给出）。<br/>
						<strong>分组</strong><br/>
						目前，你已经看到操作符（如+和*）只影响前面的术语，如果对一组术语使用操作符，可以使用圆括号
						对其进行分组，这与数学表达式相似，如/(ab)+/匹配一个或多个连续的ab。<br/>
						<strong>或操作符（OR）</strong><br/>
						使用竖线|表示或，如/a|b/可以匹配a或者b，/(ab)|(cd)+/匹配一个或者多个ab或cd。<br/>
						<strong>反向引用</strong><br/>
						这是regexp中最复杂的术语，反向引用可以引用正则中定义的获取。后面详细介绍，现在只需把捕获
						看作待匹配的字符串，也就是前面匹配的字符串。反向引用分组中捕获的内容，使用反斜线加上数字表示引用，
						该数字从1开始，第一个分组捕获的为（此处为反斜杠）1，第二个分组捕获的为（此处为反斜杠）2，以此类推。<br/>
						例如/^([dtn])a（此处为反斜杠）1/匹配任意从d或者t或者n开始的，连续有a的字符串，连续匹配第一个分组中捕获的内容。
						后面这一点很重要，这与/[dtn] a[dtn]/不同，a字符之前不能是d或t或n，必须是之前匹配时的字母，
						因此，字符（此处为反斜杠）1表示直到相等才匹配。在匹配XML类型的标记元素时，反向引用很有用：<br/>
						/<(\w+)>(.+)<\/（此处为反斜杠）1>/，这可以匹配简单的元素如<strong>whatever</strong>。如果没有反向引用，
						也许无法做到，因为无法预先知道与起始标记相匹配的结束标记是什么。<br/>
						如果想从头开始学习正则表达式，可以去查阅regexp相关书籍。`
					}
				]
			},
			{
				title: '9.3编译正则表达式',
				content: [
					{
						text: `处理正则表达式主要有两个阶段：编译和执行。编译阶段发生在正则表达式被创建的时期，
						执行阶段则发生在使用编译之后的正则表达式进行匹配字符串的时期。<br/>
						编译过程中，表达式经过JavaScript引擎的解析，转换为内部代码。解析和转换的过程发生在正则表达式
						创建时期，通常来说，浏览器会智能判断使用哪条正则表达式，并缓存该表达式的编译结果，对于复杂的
						表达式，我们可以通过预定义（预编译）正则表达式，使得性能得到显著提升。`,
						src: require('@/assets/codeJS9.3.png')
					},
					{
						text: `上例中，两个regexp在创建后都处于编译后的状态。可以使用任何标识符来代替re1指向字面量
						/test/i/，每次都会编译相同的regexp，因此，编译一次regexp并将其保存在变量中，是一个很重要的
						优化过程。<br/>
						请注意，每个正则表达式都有一个独特的对象表示：每次创建一个正则表达式（也被编译）都会创建一个
						新的正则表达式对象。这与原始类型（number、string等）不同，因为每个正则对象是独一无二的。
						特别重要的是，通过使用构造函数创建regexp(new RegExp(...))，我们可以在运行时使用字符串创建
						正则表达式。这对于构建可以重复使用的复杂regexp非常有用。<br/>
						例如，假设我们需要确定文档中哪些元素具有指定的class名，而具体的class值在运行时才能确定。
						由于元素可以绑定多个class，这是运行时regexp编译的有趣示例。`,
						src: require('@/assets/codeJS9.4.png')
					},
					{
						text: `使用构造函数new RegExp()是基于传入的class名称进行编译的regexp的，这是
						${orange}无法使用字面量的场景，因为无法提前知道所需查找的class名称${endOrange}。
						我们立即创建（然后编译）正则表达式，是为了避免不必要的、频繁地重复编译。由于表达式是动态生成的
						（基于传入的class），这种方式可以很大程度地节省性能开销。该regexp匹配字符串以字符串或空格
						开始，接着是指定的class，最后以空格或者字符串结束。注意在正则\\s中双斜线\\的使用。
						当使用反斜线创建regexp字面量时，只需要使用一个反斜线。但由于在字符串中写反斜线，必须使用
						双反斜线进行转义，这很繁琐，但是，需要意识到我们使用字符串构建regexp，而不是直接使用字面量。<br/>
						一旦regexp被编译以后，就可以通过该regexp的test方法手机匹配的元素。`
					}
				]
			},
			{
				title: '9.4捕获匹配的片段',
				content: [
					{
						text: `当发现可以捕获正则匹配的结果，并可以对该结果进行处理时，regexp的实用性得到了重视。
						第一步首先是需要判断字符串是否匹配模式，在很多情况下确定匹配到的内容也很有用。`
					},
					{
						text: `${blue}9.4.1——执行简单捕获${endBlue}
						假设我们需要提取嵌在复杂字符串中的数值，一个很好的例子就是CSS的transform属性，通过
						transform可以修改HTML元素的视觉位置：`,
						src: require('@/assets/codeJS9.5.png')
					},
					{
						text: `${orange}match${endOrange}方法匹配结果通过第一个索引返回，然后每次捕获结果索引递增。
						所以第0个结果匹配的是整个translateY(15px)，第2个位置是15px。<br/>
						在regexp中，使用圆括号定义捕获，因为我们仅定义了一个捕获即在translateY之后的圆括号中定义
						了一个捕获，因此，当匹配变换值时，其值储存在[1]中。该示例使用局部regexp和match方法，当使用
						全局表达式时，有些不同。`
					},
					{
						text: `${blue}9.4.2——使用全局表达式进行匹配${endBlue}
						使用全局表达式（添加g修饰符），会返回不同的结果。虽然返回的仍然是数组，但是全局表达式不仅
						返回第一个匹配的结果，还返回全部的匹配结果，但不会返回捕获结果。`,
						src: require('@/assets/codeJS9.6.png')
					},
					{
						text: `当使用局部匹配时，只有一个实例被匹配，并返回匹配中的捕获结果。但是当全局匹配的时候，
						返回的是索匹配内容的全部列表。<br/>
						如果捕获结果对我们来说很重要，我们可以采用${orange}exec方法${endOrange}。可多次对一个
						regexp调用exec方法，每次调用都可以返回下一个匹配结果。`,
						src: require('@/assets/codeJS9.7.png')
					},
					{
						text: `反复调用exec方法，该方法保留前一次调用的结果，这样后续调用都可以使用全局匹配，
						每次调用返回的都是下一次的匹配及捕获结果。`
					},
					{
						text: `${blue}9.4.3——捕获的应用${endBlue}
						对捕获的结果进行引用有两种方式：一种是在自身匹配，另一种是替换字符串。我们修改上述例子：`,
						src: require('@/assets/codeJS9.8.png')
					},
					{
						text: `使用（此处为反斜杠）1指向表达式中的第1个捕获，在本例中捕获的是标记的名称。使用第一个捕获的内容匹配
						对应的结束标记。<br/>
						此外，我们可以调用字符串的${orange}replace${endOrange}方法，对替代字符串内进行捕获。
						不使用反向引用，我们可以使用$1,$2,$3等标记捕获序号，如:<br/>
						${orange}'fontFamily'.replace(/([A-Z])/g, "-$1").toLowerCase()  ==> 'font-family'
						${endOrange}`
					},
					{
						text: `在这段代码中，第1个捕获的值（大写字母F）通过替代字符串进行引用（通过$1）。通过
						这种方式可以实现在不知道替代值时定义替代规则，直到匹配运行之前还不知道需要替代的值。<br/>
						由于捕获和引用都使用圆括号来表示，对于正则表达式处理器来说，无法区分所添加的是捕获
						还是分组。处理器会将所有的圆括号同时当作分组和捕获，这将导致捕获会返回比预期更多的内容。`
					},
					{
						text: `${blue}9.4.4——未捕获的分组${endBlue}
						圆括号的作用：不仅定义分组，还可以指定捕获。这通常不是问题，但是对于大量存在分组的regexp来说，
						可能会产生太多不必要的捕获，会导致处理捕获变得繁琐。`
					},
					{
						text: `regexp语法可以在${orange}用于分组${endOrange}起始圆括号之后添加符号
						${orange}?:${endOrange}。这就是${orange}被动子表达式${endOrange}，如<br/>
						const pattern = /((?:ninja-)+)sword/;表示只有一个捕获。在不需要捕获的情况下，
						使用非捕获分组来减轻JavaScript引擎的压力。`
					}
				]
			},
			{
				title: '9.5利用函数进行替换',
				content: [
					{
						text: `String对象的replace方法非常强大而且灵活，当regexp作为replace方法的第一个参数时，
						对匹配到的值会进行一次替换，返回的不再是固定值。例如将字符串中的全部的大写字母替换成X，
						可以这样实现：<br/>
						${orange}"ADCdefg".replace(/[A-Z]/g, 'X')${endOrange}，但是replace最重要的特性不是
						替换字符，而是支持${orange}替换函数作为参数${endOrange}。<br/>
						当第二个参数是函数时，对每一个匹配到的值都会调用一遍（全局匹配会返回匹配到的全部内容）<br/>
						${point}全文匹配；<br/>
						${point}匹配时的捕获；<br/>
						${point}在原始字符串匹配的索引；<br/>
						${point}源字符串；<br/>
						${point}从函数返回的值作为替换值。<br/>
						这将在运行时候=提供巨大的回旋余地来确定应该替换的字符串，包括匹配的信息。例如：使用函数提供
						动态的替换值，用于将中横线-连接的字符串替换为驼峰式字符串。`,
						src: require('@/assets/codeJS9.9.png')
					},
					{
						text: `我们在调用upper函数（捕获一次调用一次，上例调用了两次）时，传入的第一个参数是
						${orange}匹配的字符串${endOrange}，第二个参数是${orange}捕获${endOrange}。通过这种方式，
						我们不需要在while中使用exec方法。<br/>
						当我们需要将查询字符串转换为符合我们所需格式的字符串，需要将查询字符串
						foo=1&foo=2&blah=a&blah=b&foo=3转换为foo=1,2,3&blah=a,b。我们使用replace和regexp
						可以实现很简洁的代码。`,
						src: require('@/assets/codeJS9.10.png')
					}
				]
			},
			{
				title: '9.6使用regexp解决常见问题',
				content: [
					{
						text: `${blue}9.6.1——匹配换行${endBlue}
						执行查询时，常常使用.匹配除换行符外的任意字符不包括换行符本身，其他语言通常使用标识符来
						解决这个问题，我们来看看JavaScript如何解决：`,
						src: require('@/assets/codeJS9.11.png')
					},
					{
						text: `上述例子中的第三种方法，用.匹配除换行符以外的任意字符，通过\s匹配空白字符，包括
						换行符。集合的结果是所有字符。`
					},
					{
						text: `${blue}9.6.2——匹配Unicode字符${endBlue}
						使用regexp，我们常常想匹配字母数字字符，例如CSS中的ID选择器。但字母字符只有英语ASCII字符
						是远远不够的。需要将集合扩大到Unicode字符，它支持多种非传统字母数字字符集`,
						src: require('@/assets/codeJS9.12.png')
					},
					{
						text: `通过创建\w术语，匹配正常的字符，同时支持从U+0080起的全部Unicode字符，高ASCII字符
						以及所有的Unicode字符的基本语言。`
					},
					{
						text: `${blue}9.6.3——匹配转义字符${endBlue}
						页面作者使用符合程序标识符的名称赋值给页面元素的ID属性，但这只是一个惯例，通常ID值可以
						包含字符“单词”以外的字符，包括标点符号，如form:update。<br/>
						一个库的开发人员当实现CSS选择器引擎时，需要它支持转义字符。这样用户可以使用复杂的名称，
						我们来看一个例子可以匹配转义字符：`,
						src: require('@/assets/codeJS9.13.png')
					}
				]
			}
		]
	},
	//第十章
	{
		mainTitle: '10、代码模块化',
		content: [
			{
				title: '10.1ES6之前模块化代码',
				content: [
					{
						text: `在JavaScriptES6之前，只有两种作用域：全局作用域和函数作用域。没有介于之间的作用域，
						没有命名空间或模块可以将功能进行分组。为了编写模块化代码，开发者们不得不创造性使用现有的语法特性。
						<br/>当决定使用哪个功能时，我们需要记住，每个模块系统至少应该可以执行以下操作：<br/>
						${point}定义模块接口，通过接口可以调用模块功能；<br/>
						${point}隐藏模块的内部实现，让使用者无需关注模块内部的实现细节，同时避免有可能产生的副作用和对bug
						的不必要修改。`
					},
					{
						text: `${blue}10.1.1对象、闭包和立即执行函数实现模块${endBlue}
						我们可以利用JavaScript的哪些特性来实现上述模块的两个基本特点呢？<br/>
						${point}隐藏模块内部实现——我们知道，调用函数创建新的作用域，我们可以在该作用域内定义变量，
						此时定义的变量只在当前函数内可见。因此，隐藏模块内部实现的一个选择是${orange}使用函数作为模块
						${endOrange}。<br/>
						${point}定义模块接口——使用函数实现模块意味着只能在模块内部访问变量。但是，如果使用其他代码
						调用该模块，我们必须定义简洁的接口，通过接口暴露模块提供的功能。一种实现的方法是：
						${orange}对象和闭包${endOrange}。通过函数模块返回代表模块公共接口的对象，该对象必须包含
						模块提供的方法，而这些方法通过闭包保持模块内部变量，甚至在函数执行完成后仍然保持。`
					},
					{
						text: `${blue}使用函数作为模块${endBlue}
						我们来看一个实现统计网页点击次数的例子：`,
						src: require('@/assets/codeJS10.1.png')
					},
					{
						text: `上述代码很容易理解，但是我们需要注意以下几点：<br/>
						${point}变量count处于函数内部，在单击事件函数的闭包内活跃，该变量只能通过事件处理器调用，
						这样就屏蔽了从函数外部访问count变量，同时我们没有污染全局变量空间；<br/>
						${point}只有一处调用countClick函数，因此，与其定义函数再单独编写调用语句，不如使用
						${orange}立即执行函数${endOrange}，或者使用IIFE(第2章讲过)，定义并立即执行该函数；<br/>
						${point}事件处理器创建的闭包保持局部变量；<br/>
						${point}浏览器具有单击事件处理器的引用。`
					},
					{
						text: `${blue}模块模式：使用函数扩展模块，使用对象实现接口${endBlue}
						模块接口通常包括一组变量和函数，创建接口最简单的方式是使用JavaScript对象，例如，
						为统计页面点击次数模块创建接口：`,
						src: require('@/assets/codeJS10.2.png')
					},
					{
						text: `我们可以很容易的使用模块的功能：MouseCounterModule.countClick()。<br/>
						这种通过立即执行函数、对象和闭包来创建模块的方式称为${orange}模块模式${endOrange}。
						一旦我们有能力定义模块，就能够将模块拆分为多个文件（更容易管理），
						或在已有模块上不修改原有代码就可以定义更多功能。`
					},
					{
						text: `${blue}模块扩展${endBlue}
						让我们在前面计算页面点击次数的示例模块MouseCounterModule中增加附加特性，
						但是不能修改MouseCounterModule代码：`,
						src: require('@/assets/codeJS10.3.png')
					},
					{
						text: `现在模块上就有两个功能接口了：<br/>
						MouseCouterModule.conutClick()<br/>
						MouseCouterModule.countScroll()。`
					},
					{
						text: `但是上述模块也有一些明显的缺点：通过模块扩展无法共享模块的私有变量：scroll、handleScroll,
						countScroll函数创建的闭包无法访问click和handleClick。这个确定并不致命，仍然可以用模块模式
						保持JavaScript的应用模块化。`
					},
					{
						text: `在模块模式中，模块就像对象一样，我们采用任何合适的方式进行扩展，例如添加新属性：<br/>
						module.newMethod = () => {...};<br/>
						我们也可以使用相同的原则轻松创建子模块：<br/>
						module.newSubmodule = () => { return {...}; }();<br/>
						但同样的还是那个缺点，无法共享内部属性。糟糕的是，模块模式还有其他缺点：我们创建模块应用时，
						模块本身常常依赖其他模块的功能，然而模块模式无法实现这些依赖关系，导致我们不得不考虑正确的
						依赖顺序。`
					},
					{
						text: `${blue}10.1.2——使用AMD和CommonJS模块化${endBlue}
						为了解决上述问题，出现了两个相互竞争的标准：AMD和CommonJS，均可定义JavaScript模块。
						除了原理和语法的区别之外，主要的区别是：${orange}AMD的设计理念是明确基于浏览器${endOrange},
						而${orange}CommonJS的设计是面向通用JavaScript环境（如Node.js服务端）${endOrange}，
						不局限于浏览器。`
					},
					{
						text: `${blue}AMD${endBlue}
						它很容易指定模块及依赖关系，同时它支持浏览器。目前AMD最流行的实现是${orange}RequireJS
						${endOrange}。我们来看看如何定义依赖于jQuery的小模块`,
						src: require('@/assets/codeJS10.4.png')
					},
					{
						text: `AMD提供名为define的函数，它接收以下参数：<br/>
						${point}新创建的模块ID，使用该ID，可以在其他部分引用该模块；<br/>
						${point}当前模块依赖的模块ID列表；<br/>
						${point}初始化模块的工厂函数，该工厂函数接收依赖的模块列表作为参数。<br/>
						因为依赖于jQuery，所以AMD会先请求jQuery模块，如果从服务端请求，这个过程将会花费一些时间。
						这个过程是异步执行的，避免发生阻塞。所有依赖的模块下载并解析以后，调用模块的工厂函数，
						并传入依赖的模块，在工厂函数内部，和标准模块模式类似的创建模块的过程：创建暴露模块公共接口的对象。
						可以看出AMD有以下几个优点：<br/>
						${point}自动处理依赖，我们无需考虑模块引入的顺序；<br/>
						${point}异步加载模块，避免阻塞；<br/>
						${point}在同一个文件可以定义多个模块。`
					},
					{
						text: `${blue}CommonJS${endBlue}
						CommonJS的设计是面向通用JavaScript环境，它使用${orange}基于文件的模块${endOrange}，
						所以每个文件中${orange}只能定义一个模块${endOrange}。CommonJS提供变量${orange}module
						${endOrange},该变量具有属性${orange}exports${endOrange},通过expoers可以很容易扩展额外属性。
						最后${orange}module.exports${endOrange}作为模块的公共接口。<br/>
						如果希望在其他部分使用模块，那么可以引用模块。文件同步加载，可以访问模块公共接口。这是CommonJS
						在服务端更流行的原因，${orange}模块加载更快${endOrange}，只需要读取文件系统，
						而在客户端则必须从远程服务器下载文件，同步加载通常意味着阻塞。`,
						src: require('@/assets/codeJS10.5.png')
					},
					{
						text: `CommonJS要求一个文件就是一个模块，文件中代码就是模块的一部分。因此，
						不需要使用立即执行函数来包装变量。在模块中定义的变量都是安全地包含在当前模块中，不会泄露到全局。
						CommonJS具有两个${orange}优势${endOrange}：<br/>
						${point}语法简单——只需定义module.exports属性，剩下的模块代码与标准JavaScript无差异，
						引用模块也只需要用require函数；<br/>
						${point}CommonJS是Node.js默认的模块格式——我们可以使用npm上成千上万的包。<br/>
						CommonJS最大的缺点是不显式支持浏览器，浏览器端的JavaScript不支持module变量以及exports属性，
						我们不得不采用浏览器支持的格式打包代码，可以通过${orange}Browserify或者RequireJS${endOrange}
						来实现。`
					}
				]
			},
			{
				title: '10.2ES6模块',
				content: [
					{
						text: `ES6模块结合了AMD与CommonJS的优点，具体如下：<br/>
						${point} 与CommonJS类似，ES6模块语法简单，并且基于文件（每个文件就是一个模块）；<br/>
						${point} 与AMD类似，ES6模块支持异步加载模块。`
					},
					{
						text: `注意：内置模块是ES6的标准的一部分，目前浏览器尚未支持ES6，我们需要对代码进行编译，使用
						Traceur(<a href="https://github.com/google/traceur-compiler">
						https://github.com/google/traceur-compiler</a>),Babel(<a href="http://babeljs.io">
						http://babeljs.io</a>)或TypeScript(<a href="www.typescriptlang.org/">
						www.typescriptlang.org/</a>)。`
					},
					{
						text: `ES6模块的主要思想是必须显式地使用标识符导出模块，才能从外部访问模块。其他标识符，
						甚至是最顶级作用域中定义地（可能是标准JavaScript中的全局作用域）标识符，只能在模块使用。
						为了提供这个功能，ES6引入以下两个关键字：<br/>
						${orange}export${endOrange}——从模块外部指定标识符；<br/>
						${orange}import${endOrange}——导入模块标识符。`
					},
					{
						text: `${blue}导出和导入功能${endBlue}`,
						src: require('@/assets/codeJS10.6.png')
					},
					{
						text: `我们一般在最后一行列出所有我们想要导出的内容，这种导出模块标识符的方式与模块模式有点相似，
						直接函数地返回对象代表模块的公共接口，尤其是与CommonJS相似，我们通过公共模块接口扩展了
						module.exports对象。无论我们如何导出模块，如果我们需要在另一个模块中导入，我们就必须使用关键字
						import。`,
						src: require('@/assets/codeJS10.7.png')
					},
					{
						text: `我们可以使用export从一个模块导出多个标识符，但是在导入语句中依次罗列标识符显得冗余，
						所以我们选择使用简化符号导入全部标识符，使用 * 符号导入全部标识符（导出的）并指明别名：`,
						src: require('@/assets/codeJS10.8.png')
					},
					{
						text: `${blue}默认导出${endBlue}
						通常我们不需要从一个模块中导出一组相关的标识符，只需要一个标识符来代表整个模块的导出。
						常见的情况是，模块中包含一个类：`,
						src: require('@/assets/codeJS10.9.png')
					},
					{
						text: `我们可以使用简单的语法导入模块的功能：`,
						src: require('@/assets/codeJS10.10.png')
					},
					{
						text: `导入默认导出的内容不需要花括号，导入已命名的导出内容必须要花括号，同时，
						ES6还可以只使用一个import语句导入内容（用逗号连接）。`
					},
					{
						text: `${blue}export 和 import使用重命名${endBlue}
						可以通过${orange}as${endOrange}设置导出（或导入）别名，而另一个文件中只能导入该别名
						（或只能访问导入的内容的别名）`,
						src: require('@/assets/codeJS10.11.png')
					}
				]
			}
		]
	},
	//第十一章
	{
		mainTitle: '11、DOM操作',
		content: [
			{
				title: '11.1向DOM中注入HTML',
				content: [
					{
						text: `这一张我们来看一下如何高效地将一段HTML字符串插入到文档中的任意位置，该技术经常被用来开发
						高度动态的网页，或是根据用户操作或者服务端返回数据，来修改UI展现，主要出现在以下场景：<br/>
						${point}在页面中插入任意HTML时以及操作并插入客户端模板时；<br/>
						${point}拉取并注入从服务器返回的HTML时。<br/>
						我们来看一个例子：`,
						src: require('@/assets/codeJS11.1.png')
					},
					{
						text: `我们要从头实现一套简洁的DOM操作方式，具体步骤如下：<br/>
						${point}将任意有效的HTML字符串转换为DOM结构；<br/>
						${point}尽可能高效地将DOM结构注入到任意位置。`
					},
					{
						text: `${blue}将HTML字符串转换为DOM${endBlue}
						它主要用到一个大家都很熟悉的工具：${orange}innerHTML属性${endOrange}。转换步骤如下:<br/>
						${point}确保HTML字符串合法有效；<br/>
						${point}将它包裹在任意符合浏览器规则要求的闭合标签内；<br/>
						${point}使用innerHTML将这串HTML插入到一个需求DOM中；<br/>
						${point}提取该DOM节点。<br/>
						我们插入节点一般采用的方法有${orange}append和insertBefore${endOrange}。`
					}
				]
			},
			{
				title: '11.2DOM的特性属性',
				content: [
					{
						text: `当访问元素的特性值时，我们有两种选择，使用传统的DOM方法${orange}getAttribute和
						setAttribute${endOrange}，或使用DOM对象上与之相对应的属性。举例来说，一个元素储存在变量e中，
						要获取其id值，我们可以使用：<br/>
						${point}e.getAttribute('id');<br/>
						${point}e.id。<br/>
						无论采用哪种方式，我们都能获取到元素id值，让我们继续理解特性值和属性之间的行为：`,
						src: require('@/assets/codeJS11.2.png')
					},
					{
						text: `我们很容易会认为属性和特性值共享一个相同的值，其实并没有。请注意：
						${orange}并非所有的元素特性都能被属性表示${endOrange}。虽然HTML DOM的原生特性，通常都能被
						属性表示，但是我们放置的自定义特性（建议标签内使用‘data-’作为前缀添加）并不能被属性表示。
						这个时候我们就需要用getAttribute来获取。`
					}
				]
			},
			{
				title: "11.3令人头疼的样式特性",
				content: [
					{
						text: `我们采用两种方式来处理style值：特性值，以及从特性值中创建的元素属性。<br/>
						最常用的是style元素属性，它不是字符串，而是一个对象，该对象的属性与元素标签内指定的样式对应。
						此外，我们介绍一下可以访问元素所有计算后的样式信息的API。该计算样式是对所有集成样式和
						应用样式求值以后，在该元素上应用的实际样式。`
					},
					{
						text: `${blue}11.3.1——样式在何处${endBlue}
						元素的样式信息位于DOM元素中的style属性上，初始值是在元素的style特性上设置的，如（
						style = "color: red;"），将会把该样式信息保存在样式对象中。在页面执行期间，
						脚本可以设置或修改样式对象中的值。但是在JavaScript中获取元素样式对象的时候，无法获取到
						页面上style元素之外的样式值（css文件中的），但是我们可以通过一种方式来获取完整的样式属性。
						元素的style属性中的任何值，都优先于样式表中设置的值（即便是添加了!important的注释）`
					},
					{
						text: `${blue}11.3.2——样式属性命名${endBlue}
						用CSS特性跨浏览器访问样式时，出现的兼容问题很少，但是CSS样式名称和脚本中使用的名称之间的差异
						确实是存在的，并且有些样式名称在不同的浏览器中还不一样。`
					},
					{
						text: `CSS特性将多余一个单词的样式用-连接，如font-size、font-weight。在JavaScript中，
						可以使用带有连字符的样式名称（element.style['font-size']），如果需要用点运算符来获取，
						则要使用驼峰格式名称（element.style.fontSize）。`
					},
					{
						text: `${blue}11.3.3——获取计算后样式${endBlue}
						在任何时候，一个元素的计算后样式都是应用在该元素上的所有样式的组合，这些样式包括CSS文件、
						元素的style特性，以及脚本对style做的各种操作。所有现代浏览器实现的标准方法是
						${orange}getComputedStyle${endOrange}。该方法接收要计算其样式的元素，并返回一个接口，
						通过该接口可进行属性查询。返回的接口提供一个名为${orange}getPropertyValue${endOrange}方法，
						用于检索特定样式属性的计算风格。与元素样式对象不同，getPropertyValue方法接收CSS属性名称，
						而不是驼峰版本。我们来看一个例子：`,
						src: require('@/assets/codeJS11.3.png')
					},
					{
						text: `上述例子考虑了样式格式，驼峰和连字符组成的都可以，创建了一个可复用的获取样式属性的接口。`
					},
					{
						text: `${blue}11.3.4——转换像素值${endBlue}
						设置样式时，需要考虑另外一个问题，如何给表示像素的结果赋值。为样式属性设置数值时，
						我们必须指定单位，以其在所有的浏览器中可以有效的运行。在尝试获取style特性的像素值时，应该使用
						parseFloat方法进行转换操作。`
					},
					{
						text: `${blue}11.3.5——测量元素的高度和宽度${endBlue}
						height和width这样的属性值造成了另一种特殊问题，在不指定值的情况下，他们的默认值是auto，
						让元素大小自适应，因此，除非显式提供特性字符串，我们是不可能使用width和height获取到准取值的。
						但是${orange}offsetWidth和offsetheight${endOrange}提供了这样的功能：<br/>
						可以相当可靠地获取实际元素的宽高，（这两个属性都包含了元素的${orange}padding${endOrange}）。
						如果我们想将一个元素相对于另一个元素定位，这些信息是有用的，但有些时候，我们想要获取元素尺寸，
						可能不包括border和padding。`
					},
					{
						text: `<strong>注意：</strong>在高度交互的网站中，元素隐藏（display设置为none）以后，
						它就没有尺寸，在非显式元素上尝试获取offsetHeight或offsetWidth都是0。
						对于这样的隐藏元素，如果非要获取它的尺寸，我们可以将其先显示再获取值，再隐藏，这样要不出现
						破绽的话，应该这样来实现：<br/>
						${point}display: block;<br/>
						${point}visibility: hidden;<br/>
						${point}position: absolute;<br/>
						${point}获取元素尺寸；<br/>
						${point}恢复先前更改的属性。`
					}
				]
			},
			{
				title: '11.4避免布局抖动',
				content: [
					{
						text: `修改DOM是实现高度动态web应用的基础工具之一，但是这个工具有一定的副作用，最重要的一个
						就是布局抖动。当我们对DOM进行一系列读写操作时，布局就会抖动，而此过程浏览器是无法进行优化的。
						核心问题在于，每当我们修改DOM，浏览器就必须在读取任何布局信息之前先重新计算布局，
						这种对性能的损耗十分巨大。避免布局抖动的一种方法是不使用会导致浏览器${orange}重排${endOrange}
						的方式进行编码。`,
						src: require('@/assets/codeJS11.4.png')
					},
					{
						text: `这里我们批量读取和写入，因为我们知道元素的尺寸之间不存在依赖关系（设置ninja的高度，
						不会影响sama的高度），这样可以让浏览器进行批量修改DOM的操作。`
					},
					{
						text: `我们在一些复杂的页面应用或者是移动端设备上，一定要特别注意会引起布局抖动的方法和属性。`,
						src: require('@/assets/codeJS11.5.png')
					},
					{
						text: `已经有很多第三方库会尽量减少布局抖动，最受欢迎的是FastDom
						(<a href="https://github.com/wilsonpage/fastdom">
						https://github.com/wilsonpage/fastdom</a>)。感兴趣的同学可以去看一下。`
					}
				]
			}
		]
	},
	//第十二章
	{
		mainTitle: '12、历久弥新的事件',
		content: [
			{
				title: '12.1深入事件循环',
				content: [
					{
						text: `对于初学者来说，事件循环不仅仅包括事件队列，而是至少具有两个队列，除了事件，
						还要保持浏览器执行的其他操作。这些操作被称为${orange}任务${endOrange}，并且分为两类：
						宏任务和微任务。`
					},
					{
						text: `宏任务的例子很多，包括创建主文档对象，解析HTML，执行主线（或全局）JavaScript代码，
						更改当前URL以及各种事件，例如页面加载，输入，网络事件和定时器事件。从浏览器的角度来看，
						宏任务代表一个个离散的、独立工作的单元。运行完任务后，浏览器可以继续其他调度，如重新渲染
						页面的UI或执行垃圾回收。`
					},
					{
						text: `而微任务是更小的任务，更新应用程序的状态，但必须在浏览器任务继续执行其他任务之前执行，
						浏览器任务包括重新渲染页面UI。微任务的案例包括promise回调函数、DOM发生变化等，微任务需要
						尽可能快地、通过异步方式执行，同时不能产生全新的微任务。微任务使我们能够在重新渲染UI之前
						执行指定的行为，避免不必要的UI重绘，UI重绘会使应用程序的状态不连续。`
					},
					{
						text: `事件循环的实现至少有一个用于宏任务的队列和至少一个用于微任务的队列。大部分的实现通常
						会更多用于不同类型的宏任务和微任务的队列。这使得事件循环能够根据任务类型进行优先处理。
						例如：优先考虑对性能敏感的任务，如用户输入。另一方面，由于在市面上的浏览器和JavaScript
						执行环境多如牛毛，如果发现所有任务都在一个队列的事件循环，也不要太惊讶。`
					},
					{
						text: `事件循环基于两个${orange}基本原则${endOrange}
						${point}一次处理一个任务；<br/>
						${point}一个任务开始后直到运行完成，不会被其他任务中断。`,
						src: require('@/assets/codeJS12.1.png')
					},
					{
						text: `在一次迭代中，时间循环会先检查宏任务队列，如果宏任务等待，则立即开始宏任务。
						直到该任务完成（或队列为空），事件循环将移动去处理微任务队列。如果有任务在该队列等待，
						则事件循环将依次开始执行，完成一个后执行余下的微任务，直到队列中微任务执行完毕。
						注意处理宏任务和微任务队列间的区别：<br/>
						单次循环迭代中，最多处理一个宏任务（其余在队列中等待），而队列中的微任务全都会被处理。`
					},
					{
						text: `我们来具体分析一下上面图片的流程：<br/>
						${point}两类任务队列都是独立于事件循环的，这意味着任务队列的添加行为也发生在事件循环之外。如果不这样设计
						则会导致在执行JavaScript代码时，发生的任何事件都被忽略，所以检测和添加任务的行为，
						是独立于事件循环完成的。<br/>
						${point}因为JavaScript基于单线程执行模型，所以这两类任务都是逐个执行的。当一个任务开始执行，在完成前，
						中间不会被任何其他任务打断，除非浏览器决定中止执行该任务（执行时间过长或占用内存较大）<br/>
						${point}所有的微任务会在下一次渲染之前执行完成，因为他们的目标是在渲染之前更新应用程序的状态。<br/>
						${point}浏览器通常会尝试每秒渲染60次页面，以达到每秒60帧（60fps）的速度。60fps通常是检验体验是否
						平滑流畅的标准，理想情况下，单个任务和该任务附属的所有任务都应该在16ms内完成。`
					},
					{
						text: `${blue}12.1.1——仅含宏任务的示例${endBlue}
						单线程执行模型一种不可避免地结果是，同一时刻只能执行一个任务，这意味着所有任务都必须在队列中排队等待执行。`
					},
					{
						text: `我们来看一个简单的页面，包括：全局JavaScript代码、两个按钮以及对应的两个单击事件处理器。`,
						src: require('@/assets/codeJS12.2.png')
					},
					{
						text: `我们可以想象一下：<br/>
						${point}主线程JavaScritpt代码执行时间需要15ms;<br/>
						${point}第一个事件处理器需要运行8ms;<br/>
						${point}第二个事件处理器需要运行5ms。<br/>
						要是用户在代码执行5ms之后单机第一个按钮，随后在12ms时单机第二个按钮。具体会发生什么呢？<br/>
						程序从执行主线程JavaScript代码开始。立即从DOM获取两个按钮元素，并注册两个事件处理器；<br/>
						主线程执行15ms，在主线程执行过程中，用户在第5ms点击了第一个按钮，第12ms点击了第二个按钮。
						由于单线程执行模型，${orange}单击第一个按钮并不会立即执行对应的事件处理器，该事件处理器会
						进入任务队列，等待执行。${endOrange}，第二个事件处理器也是类似等待，<strong>注意</strong>：
						事件监测和添加任务是独立于事件循环的，尽管主线程仍在执行，仍然可以向队列中添加任务。
						在第12ms时，队列中一共有三个任务，一个是执行主线程JavaScript代码，另外两个是按钮单击事件处理器。
						在第15ms时，主线程执行代码完成，事件循环转向处理微任务，但是微任务不存在，则跳过该步骤直接
						更新UI（我们为了方便，不考虑），这样事件循环就完成第一层交互，通过任务队列进入第二层。<br/>
						接着第一个点击任务开始执行，运行8ms且不被中断，第23ms时，该任务完成，对应的任务从队列中移除。
						浏览器又一次检查微任务队列，还是为空。最后，在第三次循环迭代中，第二个单击事件开始执行，执行5ms，
						第28ms时，${orange}任务队列为空${endOrange}。`
					},
					{
						text: `${blue}12.1.2——同时含有宏任务和微任务的示例${endBlue}
						添加微任务的最简单方式是在第一个按钮的单击处理器中加入promise，添加promise兑现时的处理。
						promise是一个占位符，它的处理通过then方法添加回调，总是异步执行的。<br/>
						与之前的示例唯一不同的是，在第一个事件firstHandle中创建了立即兑现的promise，并需要4ms传入回调函数。
						此时，JavaScript引擎为了连续性，他会在第一个事件运行8ms之后再异步调用回调函数。通过创建微任务，
						将回调放入微任务队列。由于${orange}微任务具有优先执行权${endOrange}，所以每当执行一个任务时，
						事件循环总是先检查微任务队列，在处理其他任务之前将微任务全部处理完毕。`
					}
				]
			},
			{
				title: '12.2玩转计时器',
				content: [
					{
						text: `计时器常常被误用，它是一种疏于理解的JavaScript特性，但若使用得当，有助于开发复杂应用。
						我们将使用这种能力，将长时间运行的任务分解为不阻塞事件循环的小任务，以阻止浏览器渲染，
						浏览器渲染过程会使应用程序运行缓慢，没有反应。`
					},
					{
						text: `浏览器提供了两种创建计时器的方法：setTimeout和setInterval，同时提供了清除定时器的方法：
						clearTimeout和clearInterval。这些方法都是挂载在window对象上（全局上下文）的方法。与事件循环
						不同，这些方法不是JavaScript本身定义的，而是由宿主环境提供的（浏览器或Node.js）。`
					},
					{
						text: `${blue}12.2.1——在事件循环中执行计时器${endBlue}
						我们看个具有延迟执行和间隔执行的例子：`,
						src: require('@/assets/codeJS12.3.png')
					},
					{
						text: `首先，注册延迟执行计时器，延迟10ms，延迟执行回调函数需要执行6ms。接着，我们也注册了
						一个间隔执行计时器，每隔10ms执行一次，间隔执行回调函数需要执行8ms。我们继续注册一个单击事件处理器，
						需要执行10ms。上例中，代码块需要执行18ms。若一个用户在第6ms点击了按钮，会发生什么？<br/>
						队列中第一个任务是执行主线程代码，运行18ms，在执行过程中，发生三个重要事件：<br/>
						1${point}在0ms时，延迟计时器延迟10ms执行，间隔计时器也是间隔10ms，计时器的引用保存在浏览器；<br/>
						2${point}在第6ms时，点击了按钮；<br/>
						3${point}在第10ms时，延迟计时器到期，间隔计时器的第一个时间触发。<br/>
						由于单线程模型，所以第6ms时，该任务被添加到队列中。类似的情况在第10ms时发生，此时计时器到期，
						间隔计时器发生。都被添加到队列中，注意：延迟计时器和间隔计时器都是在10ms后添加对应的任务到队列中。
						运行到第18ms，初始化代码结束执行，由于微任务队列中没有任务，所以进入下一个事件循环迭代。
						此时单击事件开始执行（假设执行需要10ms），在第20ms时，setInterval又一次被触发，但是此时间隔计时器
						的实例已经在队列中等待执行，${orange}该触发被终止${endOrange}。浏览器不会创建两个相同的间隔计时器。
						单击事件在第28ms结束，事件循环进入到下一次迭代中，开始执行延迟计时器的任务。本来我们期待该任务在
						10ms开始执行，但是现在在第28ms才开始执行，${orange}由于单线程，
						我们只能控制该任务在一定时间后进入任务队列，而无法直接控制执行的时间。${endOrange}
						我们继续，延迟计时器将执行6ms，在第34ms结束，这期间内，另一个间隔计时器到期，但
						${orange}仍然不会触发${endOrange}，因为已经存在于任务队列中了，第34ms，进入下一次事件循环迭代中，
						间隔计时器开始执行，他需要执行8ms，这期间又一个间隔计时器到期（第40ms），此时，由于前一个间隔计时器
						正在执行中（并未在队列中等待），所以一个新的间隔计时器被添加到队列中。我们可以得出：<br/>
						${orange}计时器所控制的时间间隔只是将任务添加到队列中，具体执行的时间间隔并不一定和所设置的
						时间间隔相同${endOrange}（如本例的第42ms和第50ms，只间隔了8ms就执行了两次任务，而设置的是10ms）。`
					},
					{
						text: `${blue}延迟执行和间隔执行的区别${endBlue}
						乍一看，间隔执行看起来像一个延迟执行的重复，但二者差异不止于此。`,
						src: require('@/assets/codeJS12.4.png')
					},
					{
						text: `两段代码看起来是等价的，但实际未必，很明显，setTimeout内的代码在前一个回调函数执行完成后，
						至少延迟10ms执行（取决于 事件队列的状态，等待时间只会大于10ms）；而setInterval会尝试每10ms执行
						回调函数，不关心前一个回调函数是否执行，所以间隔执行函数可以一个接一个执行。简言之：<br/>
						延迟执行是等待前一次任务执行完毕后才将任务添加到队列中，而间隔执行是，每过一定时间间隔后就将
						任务添加到队列中（只要前一个任务不在队列中）。`
					},
					{
						text: `${blue}12.2.2——处理计算复杂度高的任务${endBlue}
						JavaScript单线程特性是开发复杂应用中最大的问题，很容易出现用户交互迟钝，甚至无响应。
						我们看一个长时间运行的任务的例子：`,
						src: require('@/assets/codeJS12.5.png')
					},
					{
						text: `我们创建了240000个DOM节点，创建一个2000行每行6列的表格，每个单元格中都有文本内容。
						这会导致浏览器挂起一段时间，用户无法正常操作。我们要让其定时中断，允许进行其他操作：`,
						src: require('@/assets/codeJS12.6.png')
					},
					{
						text: `在这个例子中，我们将冗长的操作分解为4个小操作（每次60000），每个操作分别创建DOM节点。
						这些较小的操作不太可能打断浏览器的运行流。setTimeout设置的延迟0是为了让操作尽快完成，
						同时oms会允许浏览器进行UI更新渲染，提高交互性。大多数情况下用户不会察觉到差异。`
					}
				]
			},
			{
				title: '12.3处理事件',
				content: [
					{
						text: `我们可以通过addEventListener来注册事件处理器，可以传入一个event参数，它含有target属性，
						指向发生事件的元素的引用。`
					},
					{
						text: `${blue}12.3.1——通过DOM代理事件${endBlue}
						一个元素可以有若干子元素，每个元素都有一个父元素 （除根元素HTML之外）。现在，假设我们要处理
						页面中的一个元素，该元素处在另一个元素中，这两个元素都分别具有单击处理器：`,
						src: require('@/assets/codeJS12.7.png')
					},
					{
						text: `我们将三个元素都注册了单击处理器，假设用户单击了内部元素，由于它被包含在文档和外部元素中，
						所以会触发三个处理器，但三条信息无法判断先后顺序。是遵循注册顺序还是从事件发生的元素往上推移呢？
						还是从顶部向下移动呢？`
					},
					{
						text: `${orange}事件捕获${endOrange}：在NetScape（浏览器厂商）的事件模型中，事件处理器
						从顶部元素开始，向下移动直到事件目标元素，上例则是document->outer->inner。`
					},
					{
						text: `${orange}事件冒泡${endOrange}：在Microsoft（浏览器厂商）的事件模型中，则是相反，
						从目标元素开始，按DOM树向上冒泡。inner->outer->document。`
					},
					{
						text: `W3设立标准，它同时包含两种方式：捕获和冒泡。我们可以很容易选择希望的事件处理顺序，
						addEventListener()中第三个参数如果传入true，则是事件捕获顺序，如果是false，则是冒泡，
						所以也能得出默认为事件冒泡。`
					},
					{
						text: `所以事件处理的元素并不一定是事件发生的元素，事件处理器中还有一个${orange}this
						${endOrange}关键字，指向事件处理器注册的元素，并不一定是发生事件的元素，点击内部元素时，
						在outer事件处理器中，this指向注册的元素即outer，而${orange}event.target${endOrange}
						则指向发生事件的元素inner。`
					},
					{
						text: `${blue}在祖先元素上代理事件${endBlue}
						假设我们需要指出用户在表格中点击了哪个单元格，并将其背景颜色设为黄色，我们如何高效优雅地做到呢？`,
						src: require('@/assets/codeJS12.8.png')
					},
					{
						text: `我们仅创建了一个处理器，通过冒泡传递到注册事件处理器的元素上进行处理。`
					},
					{
						text: `${blue}12.3.2——自定义事件${endBlue}
						假设某些场景下，你希望执行某些行为，但你又希望在一系列条件下才能被触发。这些条件位于不同的代码片段，
						甚至在不同的脚本文件中，或许你会重复编写代码，或者创建全局函数，需要时调用，而我们将采用
						自定义事件。`
					},
					{
						text: `${orange}松耦合${endOrange}
						当代码触发匹配条件时，不需要指定关于条件的细节代码。事件处理器的优点之一是，我们可以创建任意数量的事件处理器，
						并且它们之间是完全独立的。所以事件处理是松耦合的很好的例子。`
					},
					{
						text: `假设我们写好了一个共享的代码，用于执行Ajax请求，当在Ajax请求的开始和结束时，
						使用这段代码的页面希望得到通知，当这些事件发生时，每一个页面有自己的事情要做。例如：
						在一个页面上使用这个包，我们想要展示一个旋转的风车，当Ajax请求开始时，将风车隐藏，
						当请求结束时，给用户一些视觉反馈，告知用户请求被处理。如果我们将开始条件作为事件，名为Ajax-start，
						结束为Ajax-end，如果在页面上为这些事件创建事件处理器，我们就可以实现效果，但是这些事件并不存在。`
					},
					{
						text: `${blue}创建自定义事件${endBlue}
						自定义事件是模拟真实事件，但是在应用程序上下文中自定义的事件才有意义。`,
						src: require('@/assets/codeJS12.9.png')
					},
					{
						text: `这个例子是高度解耦的，当事件触发，共享的Ajax操作代码不知道页面将要做的事，甚至不知道
						页面是否触发代码。页面代码模块化为小的处理程序，彼此之间不知道。而且，页面代码不知道共享代码所做的事，
						页面只响应可能触发、也可能不触发的事件。使用自定义事件的基本优势是解耦，使应用更加灵活。`
					}
				]
			}
		]
	},
	//第十三章
	{
		mainTitle: '13、跨浏览器开发技巧',
		content: [
			{
				title: '13.1跨浏览器注意事项',
				content: [
					{
						text: `现在的JavaScript已经不限于浏览器的领域，还通过Node.js适用于服务端。但是，
						当开发基于浏览器的JavaScript应用时，迟早都要面对多种浏览器的各种问题和不一致性。
						当我们选择支持浏览器时，通常应该做出以下承诺：<br/>
						${point}我们将使用测试套件积极测试浏览器；<br/>
						${point}我们将修复bug并回归有关浏览器；<br/>
						${point}浏览器执行代码的性能水平合理。<br/>
						由于基于平台/浏览器组合进行开发非常重要，因此，我们必须权衡支持多种浏览器的付出与收益：<br/>
						${point}目标受众的期望和需要；<br/>
						${point}浏览器的市场份额；<br/>
						${point}浏览器支持所需工作量。<br/>
						原则上是贪多嚼不烂，不应以牺牲质量赢取覆盖率。`
					}
				]
			},
			{
				title: '13.2五大开发问题',
				content: [
					{
						text: `对可复用JavaScript代码挑战最大的五大开发问题如下：<br/>
						${point}浏览器缺陷；<br/>
						${point}浏览器的缺陷修复；<br/>
						${point}外部代码；<br/>
						${point}浏览器回归；<br/>
						${point}浏览器缺失功能。<br/>
						我们应该尽可能考虑所有浏览器，保证代码在不那么流行的浏览器中能够优雅降级，例如，
						如果一个浏览器不支持某API，我们应该小心我们的代码不会抛出任何异常，剩下的代码能够顺利执行。`
					},
					{
						text: `${blue}13.2.1——浏览器的bug和差异${endBlue}
						当我们开发可复用的JavaScript代码时，需要考虑解决的问题之一是处理我们确定需要兼容的多种浏览器bug
						和API的差异。尽管浏览器越来越标准化，但是代码还是得完全符合浏览器提供的特性。<br/>
						实现这一目标的方式很直接，我们需要完整的开发测试工具，足以覆盖代码常用的和不常用的用例。
						充分测试之后，在知道开发的代码将在支持的浏览器中工作后，我们就可以放心了，假设浏览器后续没有变化，
						不会打破兼容性。`
					},
					{
						text: `${blue}浏览器的bug修复${endBlue}
						在编写一个可重用的JavaScript代码时，我们希望他可以持续运行很长时间，编写任何方面的网站（CSS、
						HTML等），浏览器发布新版本后，我们不希望再回去修改代码。假设浏览器bug会引起常见的网站问题，
						为解决浏览器bug使用特殊技巧，将来浏览器修复了这些bug，就会出现问题。处理这些浏览器漏洞的问题是
						双重的：<br/>
						${point}当bug最终被修复，我们的代码容易损坏；<br/>
						${point}我们无法为了避免网站损坏而说服浏览器厂商不修复bug。`
					},
					{
						text: `例如scrollTop属性，在各个浏览器中是不同的：在IE11和Firefox上对HTML元素使用scrollTop，
						而在safari、chrome、opera上则对body元素使用scrollTop。`
					},
					{
						text: `${blue}13.2.3——外部代码和标记${endBlue}
						任何可重用的代码必须与围绕它的代码共存，我们希望代码运行在自己编写的网站或是他人开发的网站，
						我们都需要确保代码可以与其他代码共存。`
					},
					{
						text: `${blue}代码封装${endBlue}
						为了避免我们的代码影响页面上其他代码，最佳实践是使用封装。通常来说，封装指代码存放在容器中。
						是一种限制访问其他对象组件的语言机制。在页面上引入我们的代码时，尽可能少地影响全局代码，
						尽可能少地使用全局变量，甚至是最好限制一个，这是不难做到的。jQuery是一个很棒的例子，
						他引入一个名为jQuery的全局变量（一个函数），别名为$，他甚至允许其他网页为$设置别名避免冲突。
						其中的所有操作几乎都可以通过$完成。<br/>
						创建空对象，随后该对象上定义方法和属性即可。为了保证代码的封装，需要避免其他操作，
						如修改已经存在的变量、函数原型甚至是DOM元素。`
					},
					{
						text: `${blue}13.2.4——回归${endBlue}
						回归（传统来说，过去使用的特性不再使用了）是编写可复用、可维护的JavaScript代码时，
						遇到的最难问题之一。因为浏览器的bug或不向后兼容的API发生变化导致代码不可预期的中断了。`
					},
					{
						text: `${blue}预期的变化${endBlue}
						一些API发生可预见的变化，我们可以提前检测并处理，即使用条件判断语句，判断是否支持或存在该特性，
						要是存在则使用，不存在则使用其他API。`
					}
				]
			},
			{
				title: '13.3实现策略',
				content: [
					{
						text: `${blue}13.3.1——安全的跨浏览器修复方法${endBlue}
						最简单最安全的跨浏览器修复方法有以下两个重要特点：<br/>
						${point}在其他浏览器上没有副作用；<br/>
						${point}不使用浏览器或特性检测。<br/>
						例如，将height和width样式属性设置为负数，在IE的某些版本中会抛出异常，其他浏览器则会忽略。
						所以我们需要一段代码来适应IE，判断是否为负数，是的话则进行一些操作。总之我们需要提供在浏览器上无缝运行的代码。
						不需要浏览器或特性检测，有效避免代码被修改。`
					},
					{
						text: `${blue}13.3.2——特性检测和垫片${endBlue}
						特性检测是跨浏览器开发很普遍的方法，检测某一对象或对象属性是否存在，如果存在，则假设提供了内置方法。
						通常，特性检测用于在多种API中做出选择，这些API提供相同的功能。如数组的find方法，只在支持ES6的浏览器
						中可访问，那么在其他浏览器中我们该怎么办呢？<br/>
						答案是使用${orange}垫片${endOrange}。他是浏览器备用模式。如果浏览器不支持某一特定的功能，
						我们可以提供自己的实现。`,
						src: require('@/assets/codeJS13.1.png')
					},
					{
						text: `>>>是补零右移运算符，将第一个操作数向右移动指定位数，丢弃多余部分。
						特性检测的一个重要用途是发现执行代码的浏览器提供的功能。这样我们可以使用这些功能或是提供备用方法。`
					},
					{
						text: `${blue}13.3.3——不可测试的浏览器问题${endBlue}
						遗憾的是JavaScript和DOM一些问题，要么是无法测试，要么是很难测试。幸运的是这些情况很少。`
					},
					{
						text: `${blue}绑定事件处理器${endBlue}
						我们无法以编程的形式确定一个事件处理器是否被绑定。浏览器不提供任何方式用以确定函数
						是否被绑定到元素事件监听器上。我们无法删除一个元素上绑定的所有事件处理器，除非我们维护所有创建的事件处理器的引用。`
					},
					{
						text: `${blue}事件触发${endBlue}
						我们无法检测事件是否触发。虽然可以确定浏览器是否支持事件绑定，但是不可能知道浏览器是否会触发一个事件，
						如在页面加载完成时，会动态加载脚本，脚本试图将一个侦听器绑定到等待窗口加载，而事实上，这一事件已经发生了，
						那段要执行的代码就会永远处于等待状态。`
					},
					{
						text: `${blue}CSS属性影响${endBlue}
						我们无法判断一些不影响不改变周围元素的CSS属性值（color等）是否能达到预期的效果，只能去检查浏览器上的外观。`
					},
					{
						text: `${blue}API性能${endBlue}
						某些API在有的浏览器上运行很快，在有的上面则很慢，在编写可重用的代码时，重要的是尝试使用提供良好性能的
						API。但是良好性能的API不是显而易见的。会花费大量时间去测试。`
					},
					{
						text: `<p style="color:red;width=100%;text-align:center;">--完结--</p>`
					}
				]
			}
		]
	}
];

export default partJS;
