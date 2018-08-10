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
