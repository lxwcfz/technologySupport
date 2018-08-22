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
						text: ``
					}
				]
			}
		]
	}
];

export default partJS;
