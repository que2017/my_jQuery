// JavaScript Document

/*

jquery插件封装思路
	1.利用闭包将插件的$赋值给window.$
	2.$()函数传入一个string或object类型的参数，返回一个对象，这个对象由构造函数Init()给出，私有属性设为jsObj，用来存放所有获取到的节点（源）
	3.构造函数Init()的公有方法有3个，分别为init(),css(),eq()
	4.init()方法传入一个string或object类型的参数，返回一个数组，数组存放所获取到的节点
	5.css()方法采用不定参来处理，可以设置和获取属性，在实际应用中传一个属性表示读取该属性，传两个参数表示设置某个属性，传一个json对象表示设置多个属性
	6.eq()方法传入一个number类型参数，返回所选择到的对应下标的节点
	
	7.html()方法传入参数时为设置html内容，不传参数时为读取jq对象的第一个js对象的html内容
	8.text()方法传入参数时为设置文本内容，不传参数时为读取jq对象下所有js对象的文本内容并且拼接成字符串
	9.each()方法传入一个参数，这个参数为一个函数，该函数的第一个参数代表序列号，并且this指向对应的js对象
	10.size()方法和length属性，获取jq对象里面的js对象的个数
	11.attr()方法采用不定参来处理，和css()方法类似，用于获取标签属性，可以对js对象的所有属性有效，一般自定义属性用此方法
	12.prop()方法采用不定参来处理，和css()方法类似，用于获取标签属性，只对HTML认可标签的属性有效
	13.get()方法传入一个number类型参数，返回对应下标的js对象
	
	14.removeAttr()和removeProp()方法传入一个参数，移除对应的属性
	15.addClass()方法传入要添加的类名，如果存在该类名则不添加
	16.removeClass()方法传入要删除的类名
	17.toggleClass()方法传入要修改的类名，如果对应的js对象存在该类名则删除，如果不存在则添加
	18.val()方法传参时用于设置js对象的value属性值，不传参表示读取js对象的value属性值
	19.width()和height()方法传参时用于设置js对象的width/height属性值，不传参表示读取js对象的width/height数值
	20.innerwidth()和innerheight()方法传参时用于设置js对象的clientWidth/clientHeight属性值，不传参表示读取js对象的clientWidth/clientHeight数值
	21.outerwidth()和outerheight()方法传参时用于设置js对象的offsetWidth/offsetHeight属性值，不传参表示读取js对象的offsetWidth/offsetHeight数值

*/



(function()
{
	//插件接口函数 $
	function $(para)
	{
		var typeP=(typeof para).toLowerCase();
		if(typeP=='string'||typeP=='object')
		{
			return new Init(para);
		}
	}
	
	function Init(para)
	{
		this.init(para);
	}
	
	Init.prototype=
	{
		init : function(para)
		{
			var typeP=(typeof para).toLowerCase();
			var arr=[];
			if(typeP=='string')
			{
				var first=para.charAt(0);
				switch(first)
				{
					case '#':
						arr.push(document.getElementById(para.replace(/#/,'')));
						break;
					case '.':
						var cName=para.replace(/\./,'');
						if(document.getElementsByClassName)
						{
							var aClass=document.getElementsByClassName(cName);
							var aClassLen=aClass.length;
							for(var i=0;i<aClassLen;i++)
							{
								arr.push(aClass[i]);
							}
						}
						else
						{
							var a=document.getElementsByTagName('*');
							var aLen=a.length;
							for(var i=0;i<aLen;i++)
							{
								var arrClass=a[i].className.splice(' ');
								var arrClassLen=arrClass.length;
								for(var j=0;j<arrClassLen;j++)
								{
									if(arrClass[j]==cName)
									{
										arr.push();
									}
								}
							}
						}
						break;
					default:
					{
						var tar=document.getElementsByTagName(para);
						var tarLen=tar.length;
						for(var i=0;i<tarLen;i++)
						{
							arr.push(tar[i]);
						}
					}
				}
			}
			else if(typeP=='object')
			{
				if(para.length!=undefined)
				{
					var paraLen=para.length;
					for(var i=0;i<paraLen;i++)
					{
						arr.push(para[i]);
					}
				}
				else
				{
					arr.push(para);
				}
			}
			this.length=arr.length;//添加length属性
			for(var i=0;i<this.length;i++)
			{
				this[i]=arr[i];
			}
		},
		//each
		each : function(fn)
		{
			for(var i=0;i<this.length;i++)
			{
				fn.call(this[i],i);
			}
		},
		//size
		size : function()
		{
			return this.length;
		},
		//get
		get : function(n)
		{
			return this[n];
		},
		//eq
		eq : function(n)
		{
			return $(this[n]);
		},
		//css
		css : function()
		{
			var arg=arguments;
			if(arg.length==2)
			{
				this.each(function(i)
				{
					this.style[arg[0]]=arg[1];
				});
				return this;
			}
			else if(arg.length==1)
			{
				var typeArg=(typeof arg[0]).toLowerCase();
				if(typeArg=='object')
				{
					for(var key in arg[0])
					{
						this.each(function(i)
						{
							this.style[key]=arg[0][key];
						});
					}
					return this;
				}
				else if(typeArg=='string')
				{
					return this[0].currentStyle?this[0].currentStyle[arg[0]]:getComputedStyle(this[0])[arg[0]];
				}
			}
		},
		//html
		html : function(a)
		{
			if(a!=undefined)
			{
				this.each(function(i)
				{
					this.innerHTML=a;
				});
				return this;
			}
			else
			{
				return this[0].innerHTML;
			}
		},
		//text
		text : function(a)
		{
			if(a!=undefined)
			{
				this.each(function(i)
				{
					this.innerText=a;
				});
				return this;
			}
			else
			{
				var str='';
				this.each(function(i)
				{
					str+=this.innerText;
				});
				return str;
			}
		},
		//attr
		attr : function()
		{
			var arg=arguments;
			if(arg.length==2)
			{
				this.each(function(i)
				{
					this.setAttribute(arg[0],arg[1]);
				});
				return this;
			}
			else if(arg.length==1)
			{
				var typeArg=(typeof arg[0]).toLowerCase();
				if(typeArg=='object')
				{
					for(var key in arg[0])
					{
						this.each(function(i)
						{
							this.setAttribute(key,arg[0][key]);
						});
					}
					return this;
				}
				else if(typeArg=='string')
				{
					return this[0].getAttribute(arg[0]);
				}
			}
		},
		//prop
		prop : function()
		{
			var arg=arguments;
			if(arg.length==2)
			{
				this.each(function(i)
				{
					if(arg[0].toLowerCase()=='class')
					{
						arg[0]='className';
					}
					this[arg[0]]=arg[1];
				});
				return this;
			}
			else if(arg.length==1)
			{
				var typeArg=(typeof arg[0]).toLowerCase();
				if(typeArg=='object')
				{
					for(var key in arg[0])
					{
						this.each(function(i)
						{
							if(key.toLowerCase()=='class')
							{
								this.className=arg[0][key];
							}
							else
							{
								this[key]=arg[0][key];
							}
						});
					}
					return this;
				}
				else if(typeArg=='string')
				{
					if(arg[0].toLowerCase()=='class')
					{
						arg[0]='className';
					}
					return this[0][arg[0]];
				}
			}
		},
		//removeAttr & removeProp
		removeAttr : function(attr)
		{
			if( ( typeof(attr).toLowerCase()=='string' ) && (attr.length!=0) )
			{
				this.each(function(i)
				{
					this.removeAttribute(attr);
				});
			}
			return this;
		},
		removeProp : function(attr)
		{
			return this.removeAttr(attr);
		},
		//addClass
		addClass : function(className)
		{
			if( ( typeof(className).toLowerCase()=='string' ) && (className.length!=0) )
			{
				var arrClass=className.split(' ');
				var len=arrClass.length;
				this.each(function(i)
				{
					for(var i=0;i<len;i++)
					{
						if(this.className=='')
						{
							this.className=arrClass[i];
						}
						else
						{
							var onOff=true;
							var arrThis=this.className.split(' ');
							var thisLen=arrThis.length;
							for(var j=0;j<thisLen;j++)
							{
								if(arrThis[j]==arrClass[i])
								{
									onOff=false;
									break;
								}
							}
							if(onOff)
							{
								this.className+=' '+arrClass[i];
							}
						}
					}
				});
			}
			return this;
		},
		//removeClass
		removeClass : function(className)
		{
			if( ( typeof(className).toLowerCase()=='string' ) && (className.length!=0) )
			{
				var arrClass=className.split(' ');
				var len=arrClass.length;
				this.each(function(i)
				{
					var arrThis=this.className.split(' ');
					var thisLen=arrThis.length;
					for(var i=0;i<len;i++)
					{
						for(var j=thisLen-1;j>=0;j--)
						{
							if(arrThis[j]==arrClass[i])
							{
								arrThis.splice(j,1);
							}
						}
					}
					this.className=arrThis.join(' ');
				});
			}
			return this;
		},
		//toggleClass
		toggleClass : function(className)
		{
			if( ( typeof(className).toLowerCase()=='string' ) && (className.length!=0) )
			{
				var arrClass=className.split(' ');
				var len=arrClass.length;
				for(var i=0;i<len;i++)
				{
					this.each(function(j)
					{
						var reg=new RegExp('(^|\\s)'+arrClass[i]+'(\\s|$)');
						var thisClass=this.className;
						reg.test(thisClass)?$(this).removeClass(arrClass[i]):$(this).addClass(arrClass[i]);
					});
				}
			}
			return this;
		},
	}
	window.$=$;
})();







