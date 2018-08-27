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


//第八章
//提取数组元素的属性
const ninjas = [
	{
		name: 'ninja1',
		weapon: 'weapon1'
	},
	{
		name: 'ninja2',
		weapon: 'weapon2'
	},
	{
		name: 'ninja3',
		weapon: 'weapon3'
	}
];

const weapons = [];
ninjas.forEach(ninja => {
	weapons.push(ninja.weapon)
});

//every和some
const ninjas = [
	{
		name: 'ninaj1',
		weapon: 'weapon1'
	},
	{
		name: 'ninaj2'
	},
	{
		name: 'ninaj3',
		weapon: 'weapon3'
	}
];
const allNinjaNamed = ninjas.every(ninja => 'name' in ninja);	//false
const someNinjaNamed = ninjas.some(ninja => 'name' in ninja);	//true

//find
const ninjas = [
	{
		name: 'ninaj1',
		weapon: 'weapon1'
	},
	{
		name: 'ninaj2'
	},
	{
		name: 'ninaj3',
		weapon: 'weapon3'
	}
];

const ninjaWithWeapon3 = ninjas.find(ninja => {
	return ninja.weapon === 'weapon3'	//返回具有该条件的数组元素
});

const armedNinjas = ninjas.filter(ninja => 'weapon' in ninja);	
//filter来查找满足条件的多个元素

//字母排序
const ninjas = [{name: 'bbb'}, {name: 'abb'}, {name: 'bbc'}];

ninjas.sort((ninja1, ninja2) => {
	if(ninja1.name < ninja2.name) { return -1 };
	if(ninja1.name > ninja2.name) { return 1 };
	return 0;
});
console.log(ninjas)	//[{name: 'abb'}, {name: 'bbb'}, {name: 'bbc'}]


//reduce
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((total, num) => total + num, 0);


//复用数组方法
const elems = {
	length: 0,
	add: function(elem) {
		Array.prototype.push.call(this, elem);
	},
	gather: function(id) {
		this.add(document.querySlectorAll(`#${id}`));
	},
	find: function(callback) {
		return Array.prototype.find.call(this, callback);
	}
};

elems.gather('idName')

//Map
const dictionary = {
	'japan': {
		'ninja': 'にんじゃ'
	},
	'chinese': {
		'ninja': '忍者'
	},
	'korea': {
		'ninja': '나루터'
	}
};
console.log(dictionary.korea['ninja'] === '나루터')	//true

//创建Map
const ninjaMap = new Map();

const ninja1 = {name: 'ninja1'};
const ninja2 = {name: 'ninja2'};
const ninja3 = {name: 'ninja3'};
ninjaMap.set(ninja1, {home: 'home1'});	//通过Map的set方法建立两个ninja对象的映射关系
ninjaMap.set(ninja2, {home: 'home2'});

console.log(ninjaMap.get(ninja1).home === 'home1')	//true,通过get方法获取ninja对象
console.log(ninjaMap.get(ninja2).home === 'home2')	//true

console.log(ninjaMap.get(ninja3) === undefined)	//true,检测ninja3并未存在映射关系

console.log(ninjaMap.size === 2)	//true,验证map中只存在前两个对象的映射关系

console.log(ninjaMap.has(ninja1) && ninjaMap.has(ninja2))	//true,has方法验证map中是否存在指定的key

ninjaMap.delete(ninja1)	//使用delete从map中删除key
console.log(!ninjaMap.has(ninja1) && ninjaMap.size === 1)	//true

ninjaMap.clear();	//完全清空map
console.log(ninjaMap.size === 0)	//true

//遍历map
const directory = new Map();

directory.set('ninja1', '111');	//分别给他们加上编号
directory.set('ninja2', '222');
directory.set('ninja3', '333');

for(let item of directory) {
	console.log(item[0] !== null)	//每个item有两个值：key(item[0]), value(item[1])
	console.log(item[1] !== null)
};

for(let key of directory.keys()) {
	console.log(key)	//使用内置的keys()方法遍历所有key
}

for(let value of directory.values()) {
	console.log(value)	//使用内置的values()方法遍历所有value
}


//创建Set
const ninjas = new Set(['ninja1', 'ninja2', 'ninja3', 'ninaj2']);	//接收一个数组进行初始化
console.log(ninjas.has('ninja2'), ninjas.size === 3)	//丢弃重复项

ninjas.add('ninja4');	//添加不存在的元素
ninjas.add('ninja1');	//添加已经存在的元素将不起任何作用

for(let ninja of ninjas) {
	console.log(ninja)	//遍历Set集合
}


//并集
const ninjas1 = ['ninja1-1', 'ninaj1-2', 'ninja3'];
const ninjas2 = ['ninja2-1', 'ninaj2-2', 'ninja3'];

const ninjas = new Set([...ninja1, ...ninja2]);

console.log(ninjas.size === 5)	//true,ninja3元素是重复的


//交集
const ninjas1 = ['ninja1-1', 'ninaj1-2', 'ninja3'];
const ninjas2 = ['ninja2-1', 'ninaj2-2', 'ninja3'];

const ninjas = new Set(
	[...ninja1].filter(ninja => ninja2.has(ninja))
);
console.log(ninjas.size === 1)	//只剩下相同的元素ninja3


//差集
const ninjas1 = ['ninja1-1', 'ninaj1-2', 'ninja3'];
const ninjas2 = ['ninja2-1', 'ninaj2-2', 'ninja3'];

const ninjas = new Set(
	[...ninja1].filter(ninja => !ninja2.has(ninja))
);

console.log(ninjas.size === 2)	//只剩下ninja1-1和ninja1-2


//第九章
//验证字符串
function isCandidate(candidate) {
	if(typeof candidate !== 'string' || candidate.length !== 10){
		return false;
	}
	for(let n = 0; n < candidate.length; n ++) {
		let c = candidate[n];
		switch (n) {
			case 0: case 1: case 2: case 3: case 4:
			case 6: case 7: case 8: case 9:
				if(c < '0' || c > '9') { return false };
				break;
			case 5:
				if(c !== '-') return false;
				break;
		}
	}
	return true;
}

//正则匹配字符串
function isCandidate(candidate) {
	return /^\d{5}-\d{4}$/.test(candidate);
}

//编译regexp
const re1 = /test/i;
const re2 = new RegExp('test', 'i');

console.log(re1.toString() === re2.toString())	//true


//运行时编译一个供稍后使用的regexp
<div class="ninja sama"></div>
<div class="sama ninja"></div>
<div></div>
<span class="ninja sama vn"></span>

function findClassInElements(className, type) {
	const elems = document.getElementsByTagName(type || '*');	//根据标签类型查找
	const regexp = new RegExp("(^|\\s)" + className + "(\\s|$)");	//使用传入的class编译正则
	const results = [];		//存储最终结果
	for(let i = 0, length = elems.length; i < length; i ++) {
		if(regexp.test(elems[i].className)) {
			results.push(elems[i]);
		}
	}
	return results;
}

console.log(findClassInElements('ninja', 'div').length === 2)	//true
console.log(findClassInElements('ninja').length === 3)	//true
console.log(findClassInElements('ninja', 'span').length === 1) 	//true

//简单捕获
function getTranslateY(elem) {
	const transformValue = elem.style.transform;
	if(transformValue) {
		const match = transformValue.match(/translateY\(([^\)]+)\)/);
		return match ? match[1] : '';
	}
	return "";
}

const square = document.getElementsByClassName('className');

console.log(getTranslateY(square) === '15px')
//我们在元素的样式中定义15px的偏移量


//全局匹配与局部匹配查找的区别
const html = '<div class="test"><b>Hello</b><i>world</i></div>';
const result = html.match(/<(\/?)(\w+)([^>]*?)>/);	//局部匹配

console.log(result[0] === "<div class='test'>")
console.log(result[1] === "")
console.log(result[2] === "div")
console.log(result[3] === " class='test'")

const all = html.match(/<(\/?)(\w+)([^>]*?)>/g);	//全局匹配

console.log(all[0] === "<div class='test'>")
console.log(all[1] === "<b>")
console.log(all[2] === "</b>")
console.log(all[3] === "<i>")
console.log(all[4] === "</i>")
console.log(all[5] === "</div>")


//exec
const html = '<div class="test"><b>Hello</b><i>world</i></div>';
const tag = /<(\/?)(\w+)([^>]*?)>/g;
let match, num = 0;
while ((match = tag.exec(html)) !== null) {
	console.log(match.length === 4)
	num ++;
}
console.log(num === 6)

//反向引用匹配HTML标记的内容
const html = '<b class="hello">Hello</b> <i>world!</i>';
const pattern = /<(\w+)([^>]*)>(.*?)<\/\1>/g;	//反向引用
let match = pattern.exec(html);	//对字符串执行模式匹配
console.log(match[0] === "<b class='hello'>Hello</b>")
console.log(match[1] === "b")
console.log(match[2] === " class='hello'")
console.log(match[3] === "Hello")

match = pattern.exec(html);
console.log(match[0] === "<i>world!</i>")
console.log(match[1] === "i")
console.log(match[2] === " ")
console.log(match[3] === "world!")


//a-b ==> aB
function upper(all, letter) { return letter.toUpperCase() };
console.log('ninjaa-ninjab-ninjac'.replace(/-(\w)/g, upper))
//ninjaaNinjabNinjac

//查询字符串压缩
function compress(source) {
	const keys = {};	//存储目标key
	source.replace(
		/([^=&]+)=([^&]*)/g,
		function(full, key, value) {
			keys[key] = (keys[key] ? keys[key] + ',' : "") + value;
			return "";
		}
	);
	const result = [];
	for (let key in keys) {
		result.push(key + "=" + keys[key]);
	}
	return result.join('&');	//使用&连接结果
}

//匹配所有字符，包括换行符
const html = "<b>Hello</b>\n<i>world!</i>";
console.log(/.*/.exec(html)[0] === "<b>Hello</b>");	//不匹配换行
console.log(/[\S\s]*/.exec(html)[0] === "<b>Hello</b>\n<i>world!</i>")
//使用空白字符匹配所有字符

console.log(/(?:.|\s)*/.exec(html)[0] === "<b>Hello</b>\n<i>world!</i>")
//也匹配所有字符

//Unicode
const text = "\u5FCD\u8005\u30D1\u30EF\u30FC";
const matchAll = /[\w\u0080-\uFFFF_-]+/;	//匹配所有字符，包括Unicode
console.log(text.match(matchAll))


//CSS选择器中匹配转义字符
const pattern = /^((\w+)|(\\.))+$/;
//允许任意字符序列组成的词，包括一个反斜线紧跟任意字符（包括反斜线本身），或者两者兼有
const tests = [
	'formUpdate',
	'form\\.update\\.whatever',
	'form\\:update',
	'\\f\\o\\r\\m\\u\\p\\d\\a\\t\\e',
	'form:update'
];
for(let  n = 0; n < tests.length; n ++) {
	console.log(pattern.test(tests[n]))
}


//第十章
//统计网页点击数量
(function countClick() {
	let count = 0;
	document.addEventListener('click', () => {
		console.log( ++count );
	})
})()

//模块模式
const MouseCounterModule = function() {	//创建一个全局模块变量，赋值为立即执行函数的执行结果
	let count = 0;				//模块私有变量
	const handleClick = () => {	//模块私有函数
		console.log( ++count );
	};

	return {	//返回一个对象，代表模块接口，通过闭包，访问私有变量和方法
		countClick: () => {
			document.addEventListener('click', handleClick)
		}
	};
}();

//模块扩展
const MouseCounterModule = function() {	//创建一个全局模块变量，赋值为立即执行函数的执行结果
	let count = 0;				//模块私有变量
	const handleClick = () => {	//模块私有函数
		console.log( ++count );
	};

	return {	//返回一个对象，代表模块接口，通过闭包，访问私有变量和方法
		countClick: () => {
			document.addEventListener('click', handleClick)
		}
	};
}();

(function(module) {
	let scroll = 0;
	const handleScroll = () => {
		console.log( ++scroll );
	}

	module.countScroll = () => {	//扩展模块接口
		document.addEventListener('wheel', handleScroll)
	};
})(MouseCounterModule)				//将模块传入作为参数

//使用AMD定义依赖于jQuery
define('MouseCounterModule', ['jQuery'], $ => {
	let count = 0;
	const handleClick = () => {
		console.log( ++count );
	};

	return {
		countClick: () => {
			$(document).on('click', handleClick);
		}
	};
});

//CommonJS
//MouseCounterModule.js
const $ = require('jQuery');	//同步引入jQuery
let count = 0;
const handleClick = () => {
	console.log( ++count );
};

module.exports = {				//定义公共接口
	countClick: () => {
		$(document).on('click', handleClick);
	}
};

//在另一个文件中引用该模块
const MouseCounterModule = require('MouseCounterModule.js');
MouseCounterModule.countClick();	//调用该模块方法


//ES6导出模块
const ninja = "Yoshi";	//顶级变量
export const message = "hello";		//导出变量

export function sayHiToNinja() {	//导出函数
	return message + ' ' + ninja;
}

//最后一行导出
//Ninja.js
const ninja = "Yoshi";
const message = "hello";

function sayHiToNinja() {
	return message + " " + ninja;
}

export { message, sayHiToNinja };

//另一个文件
import { message, sayHiToNinja } from "Ninja.js";

//简便导入标识符
import * as ninjaModule from "Ninja.js";
console.log(ninjaModule.message === "hello");

//默认导出
export default class Ninja {	//默认导出这个类
	constructor(name) {
		this.name = name;
	}
}

export function compareNinjas(ninja1, ninja2) {	//还可以导出其他内容
	return ninja1.name === ninja2.name;
}

//简单导入
import Ninja from "Ninja.js";	//导入模块默认导出的内容，可以任意指定名字
import { compareNinjas } from "Ninja.js";	//导入指定内容

const ninja1 = new Ninja('ninja1');		//创建实例
const ninja2 = new Ninja('ninja2');

console.log(ninja1 !== undefined && ninja2 !== undefined)

//重命名导入导出内容
function sayHi() {
	return "hello";
}

export { sayHi as sayHello };		//导出后者

import { sayHello as sayHelloToYou };	//可以访问后者


//第十一章
//插入HTML元素
$(document.body).append("<div><h1>Greeting</h1><p>Yoshi here</p></div>");
//通过jQuery实现

//通过原生实现
const h1 = document.createElement("h1");
h1.textContent = "Greeting";

const p = document.createElement("p");
p.textContent = "Yoshi here";

const div = document.createElement("div");

div.appendChild(h1);
div.appendChild(p);

document.body.appendChild(div)

//通过DOM方法和属性访问特性值
document.addEventListener('DOMContentLoaded', () => {
	const div = document.querySlector('div');
	div.setAttribute('id', 'ninja-1');
	console.log(div.getAttribute('id') === 'ninja-1')
	div.id = 'ninja-2';
	console.log(div.id === "ninja-2" && div.getAttribute('id'));
})

//获取计算后样式
function fetchComputedStyle(element, property) {
	const computedStyles = getComputedStyle(element);
	if(computedStyles) {
		property = property.replace(/([A-Z])/g, '-$1').toLowerCase();
		return computedStyles.getPropertyValue(property);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const div = document.querySlector('div');
	console.log(fetchComputedStyle(div, 'background-color'))
})

//避免布局抖动
const ninja = document.getElementsByClassName('ninja')[0];
const sama = document.getElementsByClassName('sama')[0];
const Yoshi = document.getElementsByClassName('Yoshi')[0];

const ninjaWidth = ninja.clientWidth;	//批量读取所有布局属性
const samaWidth = sama.clientWidth;
const YoshiWidth = Yoshi.clientWidth;

ninja.style.width = ninjaWidth/2 + 'px';	//批量写入布局属性
sama.style.width = samaWidth/2 + 'px';
Yoshi.style.width = YoshiWidth/2 + 'px';

//第十二章
//单一任务队列示例的伪代码
<button id="firstButton"></button>
<button id="secondButton"></button>

const firstButton = document.getElementById('firstButton');
const secondButton = document.getElementById('secondButton');
firstButton.addEventListener('click', function firstHandle() {
	//
});
secondButton.addEventListener('click', function secondHandle() {
	//
})

//定时器
<button id="button"></button>

const button = document.getElementById('button');
setTimeout(function timeoutHandle() {
	//
},10);

setInterval(function intervalHandle() {
	//
},10);

button.addEventListener('click', function clickHandle() {
	//
})

//延迟执行和间隔执行区别
setTimeout(function repeatMe() {
	//
	setTimeout(repeatMe, 10);
}, 10);

setInterval( () => {
	//
}, 10)

//长时间执行的例子
const tbody = document.querySlector('tbody');	
for(let i = 0; i < 20000; i ++) {
	const tr = document.createElement('tr');
	for(let t = 0; t < 6; t ++) {
		const td = document.createElement('td');
		td.appendChild(document.createTextNode(i + "," + t));
		tr.appendChild(td);
	}
	tbody.appendChild(tr);
}

//计时器中断一个长时间运行的任务
const rowCount = 20000;
const divideInfo = 4;
const chunkSize = rowCount / divideInfo;
let interation = 0;
const table = document.getElementsByTagName('tbody')[0];
setTimeout(function generateRows() {
	const base = chunkSize * interation;	//计算上一次离开的时间
	for(let i = 0; i < chunkSize; i ++) {
		const tr = document.createElement('tr');
		for(let t = 0; t < 6; t ++) {
			const td = document.createElement('td');
			td.appendChild(document.createTextNode((i + bass) + "," + t + "," + interation));
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	interation ++;
	if(interation < divideInfo) { setTimeout(generateRows, 0); }
}, 0);		//将延迟设为0，表示迭代应该尽快执行，但还是会在UI更新以后执行。

//嵌套元素和单机处理器
<div class="out">
	<div class="in"></div>
</div>

const outer = document.getElementsByClassName('out')[0];
const inner = document.getElementsByClassName('in')[0];

outer.addEventListener('click', () => {
	console.log('out')
});

inner.addEventListener('click', () => {
	console.log('in')
});

document.addEventListener('click', () => {
	console.log('document')
});

//祖先元素代理事件
const table = document.getElementsByTagName('table')[0];
table.addEventListener('click', event => {
	if(event.target.tagName.toLowerCase() === 'td')	{//不是随机的后代元素
		event.target.style.backgroundColor = 'yellow';
	}
})

//创建使用自定义事件
<button>start</button>
<img id="img" src="aaa.gif" />

function triggerEvent(target, eventType, eventDetail) {
	const event = new CustomEvent(eventType, {	//使用CustomEvent创建新事件
		detail: eventDetail
	});
	target.dispatchEvent(event);	//内置dispatchEvent解除事件绑定
}

function performAjaxOperation() {
	triggerEvent(document, 'Ajax-start', {url: 'my-url'});
	setTimeout(() => {
		triggerEvent(document, 'Ajax-end')
	}, 5000)
}

const button = document.getElementsByTagName('button')[0];
button.addEventListener('click', () => {
	performAjaxOperation();
});

document.addEventListener('Ajax-start', e => {
	document.getElementById('img').style.display = "inline-block";
	console.log(e.target.url === 'my-url')
});
document.addEventListener('Ajax-end', e => {
	document.getElementById('img').style.display = "none";
})

//第十三章
//Array.prototype.find方法的垫片
if(!Array.prototype.find) {
	Array.prototype.find = function(predicate) {
		if(this === null) {
			throw new TypeError('find null or undefined');
		}
		if(typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		}
	}
	var list = Object(this)
	var length = list.length >>> 0;
	var thisArg = arguments[1];
	var value;

	for(var i = 0; i < length; i++) {
		value = list[i];
		if(predicate.call(thisArg, value, i, list)) {
			return value;
		}
	}
	return undefined;
}