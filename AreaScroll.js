/*
	Name: Javascript AreaScroll Plugin
	Author: ok8008@yeah.net
*/
(function(){
	var AreaScroll = function(params){
		var _this = this;
		_this.params = params || {};
		_this.wrap = _this.params.wrap || document.getElementById('wrap');
		_this.items = _this.wrap.getElementsByTagName('ul');
		_this.length = _this.items.length;
		_this.current = 0;
		_this.newObj = {};
		
		_this.posX = _this._pageX(_this.items[0].getElementsByTagName('li')[0]);
		_this.width = _this.items[0].getElementsByTagName('li')[0].offsetWidth;
		
		_this._setData();
		_this._addEventCheck(_this.wrap,'scroll',function(){_this._scroll()});
	};
	AreaScroll.prototype={
		_scroll:function(){
			var _this = this;
			_this.scrollTop = _this.wrap.scrollTop;
			var next = (_this.current < _this.length)?_this.current + 1 : _this.length;
			var prev = (_this.current < 1)?0: _this.current - 1;
			if(_this.scrollTop > _this.topArray[_this.current] + 38 && _this.scrollTop < _this.topArray[next]){
				_this._showNav(_this.current);
			}else if(_this.scrollTop > _this.topArray[next]){
				_this.newObj[_this.current].style.display = 'none';
				_this._showNav(next);
				_this.current ++ ;
			}else if(_this.scrollTop < _this.topArray[_this.current]){
				_this.newObj[_this.current].style.display = 'none';
				_this._showNav(prev);
				_this.current -- ;
			}
		},
		_showNav:function(current){
			var _this = this;
			if(!_this.newObj[current]){
				_this.newObj[current] = _this.items[current].getElementsByTagName('li')[0].cloneNode(true);
				_this._setStyle(_this.newObj[current],{
					'position':'fixed',
					'left':_this.posX+'px',
					'top':'0px',
					'bottom':'auto',
					'width':_this.width+'px'
				});
				_this.items[current].appendChild(_this.newObj[current]);
			}else{
				_this.newObj[current].style.display ='block';
			};
		},
		_setData:function(){
			var _this = this;
			_this.wrap.scrollTop = 0;
			if(!_this.topArray){
				_this.topArray = []; //建立pageY数组
				for(var i=0;i<_this.length;i++){
					var y = _this._pageY(_this.items[i]);
					_this.topArray.push(y);
					console.log(_this.topArray);
				}
			}
		},
		_setStyle:function(obj,val){
			//设置样式
			for(var attr in val){
				obj.style[attr] = val[attr];
			}
		},
		_pageX:function(elem){
			//获取距离左边的距离
			return elem.offsetParent?(elem.offsetLeft+this._pageX(elem.offsetParent)):elem.offsetLeft;
		},
		_pageY:function(elem){
			//获取距离顶部的距离
			return elem.offsetParent?(elem.offsetTop+this._pageY(elem.offsetParent)):elem.offsetTop;
		},
		_addEventCheck:function(obj,evt,fn){
			//事件监听
			if (obj.addEventListener){
				obj.addEventListener(evt,fn,false);
			}else if(obj.attachEvent){
				obj.attachEvent('on'+evt,fn);
			}
		}
	};
	window.AreaScroll = AreaScroll;
})();