
// this is a comment

var foo = 5; // this is a variable

console.log(foo);

foo = foo*10;

console.log(foo);

foo = addshit(foo);

console.log(foo);

function addshit(_v)
{
	for(var i = 0;i<1000;i++)
	{
		_v = _v + i;
	}	
	return(_v);
}

