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
						src: require('@/assets/code1.png')
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
						浏览器暴露给引擎的主要全局对象是window对象，它代表了包含着一个页面的窗口。window对象是获取其他
						全局对象、全局变量（甚至包含用户定义对象）和浏览器API的访问途径。全局window对象最重要的属性是
						<span style="color: #ff5400;">document</span>，它代表了当前的的DOM。通过使用这个对象，
						JavaScript代码就能在任何程度上改变DOM。`
					}
				]
			},
			{
				title: '事件处理',
				content: [
					{
						text: '什么是生命周期',
						src: require('@/assets/code1.png')
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
						src: require('@/assets/code1.png')
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