function(蓝色小标题){
	'<span style="font-size: 15px;color: #4d7e84;"></span><br/>'
}
function(橙色关键字){
	'<span style="color: #ff5400;"></span>'
}
function(圆点){
	'<span style="font-size: 24px;">·</span> '
}

function ninja () {};	//通过字面量来创建

var ninja = function () {};		//为变量赋值一个新函数
ninjaArray.push(function () {}); 	//像数组中增加一个新函数
ninja.data = function () {};	//为某个对象的属性赋值一个函数

function call (ninja) {		//作为函数参数来传递
	ninja();
};
call( function () {} );

function returnFunction () {	//作为函数返回值
	return function () {};
};

//具有动态创建和分配的属性
var ninja = function () {};
ninja.name = 'xxx';


//回调函数
var text = 'xxxx';

function useless (callback) {	//此处传入函数参数
	return callback;		//调用传入的函数（回调）
};

//直接以参数形式定义回调函数
console.log( useless( function () { return text} ) );
//输出xxxx




//存储函数
var store = {
	nextId: 1,	//跟踪下一个要被复制的函数
	cache: {},	//作为缓存，可在其中存储函数
	add: function(fn) {		//当fn函数唯一时，加入缓存
		if(!fn.id) {
			fn.id = this.nextId++;
			this.cache[fn.id] = fn;
			return true;
		}
	}
};

function ninja() {};
store.add(ninja)	//添加成功
store.add(ninja)	//已经存在，添加失败


//自记忆函数（判断是否是素数）
function isPrime(value) {
	if(!isPrime.answers) {
		isPrime.answers = {};	//创建缓存（只会在初次调用发生）
	};
	if(isPrime.answers[value] !== undefined) {
		return isPrime.answers[value];		//若已经缓存，则直接返回
	};
	var prime = value !== 0 && value !== 1;
	for (let i = 2; i < value; i ++) {
		if(value % i === 0) {
			prime = false;
			break;
		}
	}
	return isPrime.answers[value] = prime;	//存储计算的值
}



//函数内定义函数
function a() {
	function b() {
		return 1;
	};
	return b();
}



//箭头函数
function (value1, value2) {
	return value2 - value1;
};
//等同于：
(value1, value2) => value2 - value1;



//剩余参数
function multiMax(first, ...remainingNumbers) {
	var sorted = remainingNumbers.sort(function (a, b) {
		return b - a;		//降序排列剩余参数
	});
	return first * sorted[0];
};

console.log(multiMax(3, 1, 2, 3) == 9) 		//打印出true


//默认参数
function showAction(ninja, action) {
	return ninja + ' ' + action;
};
showAction('ninja1', 'sneaking');
showAction('ninja2', 'sneaking');
showAction('ninja3', 'sneaking');
showAction('ninja4', 'skulking');	//只有ninja4的action与其他不同

function showAction(ninja, action) {
	action = typeof action === 'undefined' ? 'sneaking' : action;
	return ninja + ' ' + action;
};
//前三个调用就可以写成
showAction('ninja')		//action会默认为sneaking

//引用前面的参数
function a(a, b = 'bValue', c = a + b) {
	return c;
}



//第三章
//arguments
function sum() {	//并未声明任何形参
	let sum = 0;
	for(let i = 0; i < arguments.length; i ++) {
		sum += arguments[i];
	};
	return sum;
}
console.log( sum(1, 2, 3, 4) )	//输出10


//作为函数被调用
function ninja () {};
ninja();	//调用

var ninja = function () {};
ninja();		//函数表达式被作为函数调用
( function () {} ) ();	//立即执行的函数表达式被作为函数调用


//构造函数
function Ninja() {
	this.skulk = function() {
		return this;
	};
}
var ninja1 = new Ninja();
var ninja2 = new Ninja();

console.log(ninja1.skulk() === ninja1)	//true
console.log(ninja2.skulk() === ninja2)	//true

function Ninja() {
	this.skulk = function () {
		return this;
	};
	return 1;	//构造函数返回1
};
var ninja = new Ninja();

console.log(typeof ninja === 'object')	//true
console.log(typeof ninja.skulk === 'function')	//true



//apply  call
function juggle() {
	var result = 0;
	for (let i = 0; i < arguments.length; i ++) {
		result += arguments[i];
	};
	this.result = result;
}

var ninja1 = {};
var ninja2 = {};

juggle.apply(ninja1, [1, 2, 3, 4]);		//10
juggle.call(ninja2, 1, 2, 3, 4);		//10

function (collection) {
	for(let i = 0; i < collection.length; i ++) {
		//do something
	}
};

function(item) {
	//dosomething
}

//简化版迭代函数
function forEach(list, callback) {
	for(let i = 0; i < list.length; i ++) {
		callback.call(list[i], i);
	};
}

var weapons = [
	{
		type: 'weapon1'
	},
	{
		type: 'weapon2'
	},
	{
		type: 'weapon3'
	}
];

forEach(weapons, function(index) {
	console.log( this === weapons[index] )	//检测当前函数上下文对象
})

//箭头函数上下文
function Button() {
	this.clicked = false;
	this.click = () => {
		this.clicked = true;
		console.log(button.clicked)
	}
};
var button = new Button();
elem.addEventListener('click', button.click)	//点击以后会输出true

//存在对象字面量中
var button = {
	clicked: false,
	click: () => {
		this.clicked = true;
		console.log(button.clicked)
	}
} 
elem.addEventListener('click', button.click)	//点击以后会输出false

//bind方法
var button = {
	clicked: false,
	click: () => {
		this.clicked = true;
		console.log(button.clicked)
	}
} 
elem.addEventListener('click', button.click.bind(button))	//点击以后会输出true

var buttonFunction = button.click.bind(button);
console.log(buttonFunction != button.click)		//输出true


//第四章
var outValue = 'ninja';		//全局环境定义一个变量
function outFunction() {
	console.log(outValue === 'ninja')
}
outFunction()		//输出true

//闭包
var outValue = 'xxx';
var later;

function outerFunction() {
	var innerValue = 'ninja';
	function innerFunction () {
		console.log(outValue === 'xxx')		//输出true
		console.log(innerValue === 'ninja')	//输出true
	};
	later = innerFunction;
}
outerFunction();
//通过later调用内部函数，不可以直接调用内部函数，因为它的作用域被限制在outer函数之外
later();
//通过later我们可以获取藏在out函数里的innerValue变量

//私有变量
function Ninja() {
	var number = 0;
	this.getNum = function() {
		return number;
	};
	this.addNum = function() {
		number ++
	};
}

var ninja1 = new Ninja();
ninja1.addNum()

console.log( ninja1.number === undefined)	//输出true，因为number是私有变量
console.log( ninja1.getNum() === 1 )		//输出true

var ninja2 = new Ninja();
console.log( ninja2.number === 0 )			//输出true

//回调函数动画计时器
function animateIt(id) {
	var elem = document.querySlectorAll('#id');
	var tick = 0;
	var timer = setInterval(function() {
		if(tick < 100) {
			elem.style.left = elem.style.top = tick + 'px';
			tick ++;
		}else{
			clearInterval(timer);
			console.log(tick === 100)	//true
		}
	}, 10);
	animateIt('idName');
}

//执行上下文
function skulk(ninja) {
	report(ninja + 'skulk');
};

function report(msg) {
	console.log(msg);
};

skulk('name1');		//name1skulk
skulk('name2');		//name2skulk


//词法环境
var ninja = 'ninjaName';
console.log(ninja)
//当访问到ninja变量时，会进行词法环境的查询

//代码嵌套
var ninja = 'ninjaName';
function skulk() {		//skulk函数嵌套在全局代码中
	var action = 'skulking';
	function report() {		//report函数嵌套在skulk函数中
		var reportNum = 3;

		for(let i = 0; i < reportNum; i ++) {	//for循环嵌套在report函数中
			console.log(ninja + ' ' + action + ' ' + i);
		}
	};
	report();
}
skulk();

//const
const ninja = 'ninja';
try{
	ninja = 'anotherNinja';		//妄图对ninja重新赋值
}catch(e){
	console.log('something wrong' + e)	//抛出异常
}
 const ninjaObj = {};	//const定义一个对象
 ninjaObj.name = 'ninja';	//这样是允许的，可以对原有对象进行修改
 const ninjaArray = [];	//数组也是一样，可以修改
 ninjaArray.push('ninja');
 console.log(ninjaArray)		//输出['ninja']


 //注册标识符
 const ninja = 'ninja';
 check(ninja);		//调用函数的位置在函数声明前面，可以正常调用
 function check(name) {
 	console.log(name === 'ninja')	//true
 }

 //函数重载
 console.log(typeof fun === 'function')	//true

 var fun = 3;

 console.log(typeof fun === 'number')	//true

 function fun() {};	//函数声明

 console.log(typeof fun === 'function')	//false

 //通过函数访问私有变量，而不是通过对象
 function Ninja() {
 	var number = 0;
 	this.getNum = function() {
 		return number;
 	};
 	this.addNum = function() {
 		number ++
 	};
 }
 var ninja1 = new Ninja();
 ninja1.addNum();

 var imposter = {};
 imposter.getNum = ninja1.getNum;
 console.log(imposter.getNum === 1)	//true
