# my_jQuery
原生JavaScript封装的jQuery类库


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



