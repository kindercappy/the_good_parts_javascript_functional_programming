function add(a,b){
	return a + b;
}
function sub(a , b){
	return a - b;
}
function mul(a,b){
	return a * b;
}
function identityf(a){
	return function(){
		return a;
	};
}
function addf(a){
	return function(b){
		return a + b;
	}
}
function liftf(func){
	return function(a){
		return function(b){
			return func(a,b);
		};
	};
}
function curry(func,a){
	return function(b){
		return func(a,b);
	};
}
// var inc = addf(1);
var inc = curry(add,1);

function twice(func){
	return function(a){
		return func(a,a);
	}
}
var doubl = twice(add);
console.log(doubl(11));
var square = twice(mul);
console.log(square(11));

function reverse(binary){
	return function(first,second){
		return binary(second,first);
	};
}

var bus = reverse(sub);
console.log(bus(3,2));

function composeu(unary1,unary2){
	return function(num){
		return unary2(unary1(num));
	};
}
console.log(composeu(doubl,square)(5));

function composeb(func1, func2){
	return function(a,b,c){
		return func2(func1(a,b),c);
	};
}
console.log(composeb(add,mul)(2,3,7));

function limit(func,times){
	return function(a,b){
		if(times >= 1){
			times -= 1;
			return func(a,b);
		}
		return undefined;
	};
}
var add_ltd = limit(add,1);
console.log(add_ltd(2,3));
console.log(add_ltd(2,3));

function from(num){
	return function(){
		var next = num;
		num += 1;
		return next;
	};
}

function to(generator,upto){
	return function(){
		var start = generator();
		if(start < upto){
			return start;
		}
		return undefined;
	};
}


function fromTo(start,upto){
	return to(from(start),upto);
}

var index = fromTo(0,3);
console.log(index());
console.log(index());
console.log(index());
console.log(index());

function element(arr,generator){
	var start = 0;
		if(generator === undefined){
			generator = fromTo(0,arr.length);
		}
		return function(){
			var index = generator();
			if(index !== undefined){
				return arr[index];
			}
	};
}

var ele = element(['a','b','c','d']);
console.log(ele());
console.log(ele());
console.log(ele());
console.log(ele());
console.log(ele());

function collect(gen,arr){
	return function(){
		var val = gen();
		if(val !== undefined){
			arr.push(val);
		}
		return val;
	};
}

var arr = [], col = collect(fromTo(0,5),arr);

col();
col();
col();
col();
col();

console.log(arr);