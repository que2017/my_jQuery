// JavaScript Document


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







