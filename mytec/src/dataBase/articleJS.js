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
		mainTitle: '页面构建2',
		content: [
			{
				title: '生命周期',
				content: [
					{
						text: '什么是生命周期',
						src: require('@/assets/module.png')
					},
					{
						text: '这个是生命周期',
						src: require('@/assets/codeJS1.1.png')
					}
				]
			},
			{
				title: '页面构建',
				content: [
					{
						text: '什么是生命周期',
						src: ''
					}
				]
			},
			{
				title: '事件处理',
				content: [
					{
						text: '什么是生命周期',
						src: ''
					}
				]
			}
		]
	}

];

export default partJS;