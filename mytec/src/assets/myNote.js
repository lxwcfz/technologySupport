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


 //第五章
 //丑陋的回调函数
 getJSON('ninjas.json', function(err, ninjas) {		
 	if(err) {
 		console.log(err)
 		return;
 	}
 	getJSON(ninjas[0].missionsUrl, function(err, missions) {
 		if(err) {
 			console.log(err);
 			return;
 		}
 		getJSON(missions[0].detailsUrl, function(err, details) {
 			if(err) {
 				console.log(err);
 				return;
 			};
 			//do something
 		})
 	})
 })

 //generator promise
async(function* () {	//function后面使用*号定义生成器
	try {
		const ninjas = yield getJSON('ninjas.json');	//关键字yield
		const missions = yield getJSON(ninjas[0].missionsUrl);
		const details = yield getJSON(missions[0].detailsUrl);
		//do something
	}
	catch(e) {
		console.log(e)
	}
})

function* weaponGenerator() {
	yield 'weapon1';	//yield生成独立的值
	yield 'weapon2';
	yield 'weapon3';
}

for ( let weapon of weaponGenerator() ) {	//使用新型循环方式for-of取出生成的值序列
	console.log(weapon)
}

//
function* WeaponGenerator() {
	yield "weapon1";
	yield "weapon2";
}

const weaponIterator = WeaponGenerator();	//调用生成器函数从而得到一个迭代器

const result1 = weaponIterator.next();	//调用迭代器的next方法，请求一个新值
console.log(typeof result === 'object')	//结果是一个具有value和done属性的对象
console.log(result1.value == "weapon1")	//true
console.log(result1.done == false)	//true,表示还没结束，还可以继续返回新值

const result2 = weaponIterator.next();	//再次调用next方法
console.log(typeof result2)	//'object'
console.log(result2.value)	//'weapon2';
console.log(result2.done)	//true

const result3 = weaponIterator.next();
console.log(typeof result2)	//'object'
console.log(result2.value)	//undefined;
console.log(result2.done)	//false	,不能再生成新值的时候状态就变false了

//对迭代器进行迭代
function* WeaponGenerator() {
	yield "weapon1";
	yield "weapon2";
}

const weaponIterator = WeaponGenerator();
let item;
while(!(item = weaponIterator.next()).done) {
	console.log(item.value)
}

//委托执行权
function* WeaponGenerator() {
	yield 'weapon1';
	yield* NinjaGenerator();
	yield "weapon2"
}

function* NinjaGenerator() {
	yield "ninja1";
	yield "ninja2";
}

for(let item of WeaponGenerator()) {
	console.log(item)	//依次输出weapon1、ninja1、ninja2、weapon2
}

//生成器生成ID序列
function* IdGenerator() {
	let id = 0;
	while(1) {	//在普通函数中不能写无限循环函数，但是在生成器中可以
		yield id ++;
	}
}
const idGenerator = IdGenerator();
const ninja1 = { id: idGenerator.next().value };	//1
const ninja2 = { id: idGenerator.next().value };	//2
const ninja3 = { id: idGenerator.next().value };	//3

//参数与生成器交互
function* NinjaGenerator(action) {
	const imposter = yield ('hasaki' + action);
	console.log(imposter === 'ninja')	//传递回来的值将作为yield表达式的返回值
	yield (`haiya ${imposter} ${action}`)	//反引号``是ES6的新特性，可以直接拼接字符串和变量
}
const ninjaGenerator = NinjaGenerator('skulk');	//传入参数

const result1 = ninjaGenerator.next();
console.log(result1.value)	//hasaki skulk

const result2 = ninjaGenerator.next('ninja');	//imposter为ninja	
console.log(result2.value)	//haiya ninja skulk

//promise
const ninjaPromise = new Promise((resolve, reject) => {
	resolve('status ok');
	//reject('found error')
});

ninjaPromise.then( data => {
	console.log(data === 'status ok')	//承诺兑现后调用
}, e => {
	console.log('error')
})

//显式拒绝promise
const promise = new Promise((resolve, reject) => {
	reject('reject');
});

promise.then( () => {
	console.log('success')
}, error => {
	console.log(error)
})

//链式调用catch方法
const promise = new Promise((resolve, reject) => {
	reject('reject');
});

promise.then(() => {
	console.log('success')
}).catch( error => {
	console.log(error)
})

//异常隐式拒绝
const promise = new Promise((resolve, reject) => {
	a++;	//发生异常错误，a未定义
});

promise.then(() => {
	console.log('success')
}).catch(e => {
	console.log(e)	//调用这个函数
})

//链式调用promise
getJSON('data/ninjas.json').then(ninjas => {
	getJSON(ninjas[0].missionsUrl)
}).then(missions => {
	getJSON(missions.detailsUrl)
}).then(details => {
	console.log(details)
}).catch(err => {		//捕捉任何步骤中出现的错误
	console.log(err)
})

//等待多个promise
Promise.all([
	getJSON('data/ninja1.json'),	//将任务放进数组
	getJSON('data/ninja2.json'),
	getJSON('data/ninja3.json')
]).then(results => {	//获取的结果也是以数组形式展现
	const ninja1 = results[0], ninja2 = results[1], ninja3 = results[2];
	//do something
}).catch(e => {
	console.log(e)
})

//promise竞赛
Promise.race([
	getJSON('data/ninja1.json'),	//将任务放进数组
	getJSON('data/ninja2.json'),
	getJSON('data/ninja3.json')
]).then(result => {
	console.log('which one is' + result)
}).catch(e => {
	console.log(e)
})


//生成器和promise结合
async(function* () {
	try {
		const ninjas = yield getJSON('data/ninjas.json');
		const missions = yield getJSON(ninjas[0].missionsUrl);
		//done
	}
	catch(e) {
		console.log(e)
	}
})

//async  await
(async function() {
	try {
		const ninjas = await getJSON('data/ninjas.json');
		const missions = await getJSON(ninjas[0].missionsUrl);
		console.log(missions)
	}
	catch(e) {
		console.log(e)
	}
})


//第六章

//Object.setPrototypeOf
const objA = { a: true };
const objB = { b: true };
const objC = { c: true };

console.log('a' in objA)	//true
console.log('b' in objA)	//false
Object.setPrototypeOf(objA, objB)	//将objB设置为objA的原型

console.log('b' in objA)	//true
console.log('c' in objB)	//false
Object.setPrototypeOf(objB, objC)	//将C设置为B的原型

console.log('c' in objB)	//true
console.log('c' in objA)	//true

//
function Lxw() {};
Lxw.prototype.ninja = function() {	//为函数LXW设置ninja原型对象
	return true;
}
const lxw1 = Lxw();	//普通函数调用
console.log(lxw1.ninja())	//undefined(无返回值)

const lxw2 = new Lxw();	//构造器调用
console.log(lxw2.ninja())	//true

//实例属性
function Lxw() {
	this.ninja = true;
	this.lxw = function() {
		return this.ninja;
	}
}

Lxw.prototype.lxw = function() {
	return !this.ninja;
}

const tec = new Lxw();
console.log( tec.lxw )	//true

//动态改变原型属性
function Lxw() {
	this.ninja = true;
}

const lxw1 = new Lxw();
Lxw.prototype.tec = function() {
	return this.ninja;
}
console.log(lxw1.tec())	//true

Lxw.prototype = {
	vn: function() {
		return false;
	}
}	//重写Lxw的prototype

const lxw2 = new Lxw();
console.log(lxw1.tec())	//true	保留原来的原型属性
console.log(lxw2.vn())	//false	新的属性

//constructor
function Lxw() {};
const lxw = new Lxw();
lxw.constructor = Lxw;

//用constructor创建新的对象
function Lxw() {};
const lxw1 = new Lxw();
const lxw2 = new lxw1.constructor;


//原型继承
function Person() {};
Person.prototype.dance = function() {};

function Ninja() {};
Ninja.prototype = {
	dance: Person.prototype.dance
};
const ninja = new Ninja();

//真正的继承
function Person() {};
Person.prototype.dance = function() {};

function Ninja() {};
Ninja.prototype = new Person();	//重点
const ninja = new Ninja();
console.log(ninja instanceof Person)	//true


//Object.defineProperty
const ninja = {
	name: 'ninja'
}
Object.defineProperty(ninja, name, {
	configurable: false,
	enumerable: false,
	value: true,
	wrtiable: true
})

function Person() {};
Person.prototype.dance = function() {};
function Ninja() {};
Ninja.prototype = new Person();
Object.defineProperty(Ninja.prototype, 'constructor', {
	enumerable: false,
	value: Ninja,
	wrtiable: true
});
const ninja = new Ninja();
console.log(ninja.constructor === Ninja)	//true


//class
class Ninja {
	constructor(name) {	//定义一个构造函数
		this.name = name;
	}
	swing() {
		return true;
	}
}

const ninja = new Ninja('lxw');
console.log(ninja.name === 'lxw');	//true
console.log(ninja instanceof Ninja)	//true
console.log(ninja.swing())			//true

//还原class
function Ninja(name) {
	this.name = name;
}
Ninja.prototype.swing = function() {
	return true;
}

const ninja = new Ninja('lxw');
console.log(ninja.name === 'lxw');	//true
console.log(ninja instanceof Ninja)	//true
console.log(ninja.swing())			//true


//static静态方法
class Ninja {
	constructor(name, level) {
		this.name = name;
		this.level = level;
	}
	swingSword() {
		return true;
	}
	static compare(ninja1, ninja2) {
		return ninja1.level - ninja2.level;
	}
}

var ninja1 = new Ninja('ninja1', 2);
var ninja2 = new Ninja('ninja2', 3);

console.log('compare' in ninja1 || 'compare' in ninja2)	//false
console.log(Ninja.compare(ninja1, ninja2) == -1)	//true
console.log('swingSword' in Ninja)	//false


//ES6中继承
class Person {
	constructor(name) {
		this.name = name;
	}

	dance() {
		return true;
	}
}

class Ninja extends Person {	//使用关键字extends
	constructor(name, weapon) {
		super(name)				//使用super调用基类构造函数
		this.weapon = weapon;
	}
	wieldWeapon() {
		return true;
	}
}

var person = new Person('Bob');
console.log(person instanceof Person && person.dance() &&
			person.name === 'Bob' && !('wieldWeapon' in person))	//true

var ninja = new Ninja('job', 'gun');
console.log(ninja instanceof Ninja && ninja.wieldWeapon() &&
			ninja.name === 'job' && ninja.dance())					//true

//第七章
//getter和setter保护私有变量属性
function Ninja() {
	let skillLevel;
	this.getLevel = () => skillLevel;

	this.setLevel = value => {
		skillLevel = value;
	}
};

const ninja = new Ninja();
ninja.setLevel(100);
console.log(ninja.getLevel() === 100)	//true

//对象字面量定义getter、setter
const ninjaObj = {
	ninjas: ['ninja1', 'ninja2', 'ninja3'],
	get firstNinja() {
		return this.ninjas[0];
	},
	set firstNinja(newValue) {
		this.ninjas[0] = newValue;
	}
}
console.log(ninjaObj.firstNinja === 'ninja1')	//true
ninjaObj.firstNinja = 'vn';
console.log(ninjaObj.firstNinja === 'vn')	//true


//ES6中class定义getter和setter
class NinjaObj {
	constructor() {
		this.ninjas = ['ninja1', 'ninja2', 'ninja3'];
	}
	get firstNinja() {
		return this.ninjas[0];
	}
	set firstNinja(newValue) {
		this.ninjas[0] = newValue;
	}
}

const ninjaObj = new NinjaObj();
console.log(ninjaObj.firstNinja === 'ninja1')	//true
ninjaObj.firstNinja = 'vn';
console.log(ninjaObj.firstNinja === 'vn');		//true


//Object.defineProperty设置getter、setter
function Ninja() {
	let level = 0;
	Object.defineProperty(this, 'myLevel', {
		get: () => {
			return level;
		},
		set: value => {
			level = value;
		} 
	})
}
const ninja = new Ninja();
console.log(typeof ninja.level === 'undefined')	//true
console.log(ninja.myLevel === 0)	//true
ninja.myLevel = 10;
console.log(ninja.myLevel === 10)	//true

//校验属性值
function Ninja() {
	let level = 0;
	Object.defineProperty(this, 'myLevel', {
		get: () => level,
		set: value => {
			if(!Number.isInteger(value)) {
				throw new TypeError('level should be number');
			}
			level = value
		}
	});
}

const ninja = new Ninja();
ninja.myLevel = 10;
console.log(ninja.myLevel === 10)	//true
try {
	ninja.myLevel = '10';
}
catch(e) {
	console.log(e)
}


//计算属性
const shogun = {
	name: 'ninja',
	clan: 'ask',
	get fullTitle() {
		return this.name + ' ' + this.clan;
	},
	set fullTitle(value) {
		const segments = value.split('');
		this.name = segments[0];
		this.clan = segments[1];
	}
}

//通过Proxy构造器创建代理
const emperor = {name: 'mike'};
const representative = new Proxy(emperor, {
	get: (target, key) => {
		return key in target ? target[key] : 'do not bother emperor';
	},
	set: (target, key, value) => {
		target[key] = value;
	}
})
console.log(emperor.name, representative.name)	//mike mike
console.log(emperor.nickname)	//undefined
console.log(representative.nickname)	//do not bother empreor
representative.nickname = 'bob';	//通过代理添加属性
console.log(empreor.nickname)	//bob
console.log(representative.nickname)	//bob


//代理记录日志
function makeLog(target) {
	return new Proxy(target, {
		get: (target, property) => {
			return target[property];
		},
		set: (target, property, value) => {
			target[property] = value;
		}
	});
}

let ninja = {name: 'vn'};
ninja = makeLog(ninja)
console.log(ninja.name === 'vn')	//true
ninja.weapon = 'sword';

//性能检测
function isPrime(number) {
	if(number < 2) {return false};
	for(let i = 2; i < number; i ++) {
		if(number % i === 0) { return false; }
	}
	return true;
}

isPrime = new Proxy(isPrime, {
	apply: (target, thisArg, args) => {
		console.time('isPrime');
		const result = target.apply(thisArg, args);
		console.timeEnd('isPrime');

		return result;
	}
});

isPrime(1213442);


//自动填充
function Folder() {
	return new Proxy({}, {
		get: (target, property) => {
			if(!(property in target)) {
				target[property] = new Folder();	//如果不具有则创建
			}
			return target[property]
		}
	})
}
const rootFolder = new Folder();
try {
	rootFolder.ninjasDir.firstNinjaDir.ninjaFile = 'ninja1.txt';	//不存在则创建
	pass('pass')
}
catch(e) {
	console.log(e)
}


//数组负索引
function createNegativeArrayProxy(array) {
	if(!Array.isArray(array)) {
		console.log('please input a array');
	}
	return new Proxy(array, {
		get: (target, index) => {
			index = +index;		//将属性名变成数值
			return target[index < 0 ? target.length + index : index]
		},
		set: (target, index, val) => {
			index = +index;
			return target[index < 0 ? target.length + index : index] = val;
		}
	});
}

const ninjas = ['ninja1', 'ninja2', 'ninja3'];
const proxieNinjas = createNegativeArrayProxy(ninjas);