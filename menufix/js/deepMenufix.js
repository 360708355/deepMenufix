/**
 * @authors     Li Weidong (https://github.com/onvno)
 * @email       leewei2020@gmail.com
 * @contributer
 * @company     Deep (www.deeping.cn) 
 * @date        2016-05
 * @version     0.1
 * @commit      This is first time to build some components , just want to get a more easy way for working . Before do this, most time work with jQuery, so i'm a worse JSer , please give us more confidence , more time & suggestions , thx !
 * Released under the MIT license.
 */

function menufix ( options ) {

	var defaults = {
		navWrap : '',
		navItem : ''
	};

	var options,navWrap,navItem;

	// change default config
	function inputArguments(source,attribute) {
		var attr;
		for (attr in attribute) {
			if (attribute.hasOwnProperty(attr)) {
				source[attr] = attribute[attr];
			}
		}
		return source;
	}

	// change default
	if(arguments[0] && typeof arguments[0] === 'object') {
		options = inputArguments(defaults,arguments[0]);
	}else if(!arguments[0]){
		options = defaults;
	}

	navWrap = document.getElementById('navwrap');
	navItem = navWrap.querySelectorAll('.navitem');
	var navWrapTop = navWrap.offsetTop;
	var topObj = {};
	var bottomObj = {};
	var concatAry = [];
	var linkObj = {};
	var windowDis,nextTop;
	var nextDiv = navWrap.nextElementSibling;
	var nextDivMtop = parseInt(nextDiv.style.marginTop);
	nextTop = nextDiv.offsetTop;

	// 初始化 - 目前测试，如不给setTimeout,chrome会直接获得body.scrollTop最大值
	function defaultSet() {
		windowDis = document.body.scrollTop + document.documentElement.scrollTop;

		if(windowDis > navWrapTop){
			navWrap.setAttribute('style' , 'position:fixed; left:0; top:0; margin-top:-50px; width:100%;');
			nextDiv.style.marginTop = nextDiv.offsetTop + 'px';
		} else {
			navWrap.setAttribute('style' , '');
			nextDiv.style.marginTop = nextDivMtop + 'px';
		}

		activeSet();
	}
	setTimeout(defaultSet,1);

	function activeSet() {
		var nowTopAry = [];
		var nowBottomAry = [];
		// get element height area
		for(var i=0; i<navItem.length; i++) {

			var nowA = navItem[i].getElementsByTagName('a')[0];
			var nowHref = nowA.getAttribute('href');
			
			linkObj[nowHref] = nowA;
			// console.log(linkObj);
			
			if(nowHref.indexOf('#') == 0){
				var nowCont = document.querySelectorAll(nowHref)[0];
				var nowContTop = nowCont.offsetTop;
				var nowContHeight = nowCont.offsetHeight;
				var nowContBottom = nowContTop + nowContHeight;
				nowTopAry.push(nowContTop);
				nowBottomAry.push(nowContBottom);
				topObj[nowHref] = nowTopAry[nowTopAry.length - 1];
				bottomObj[nowHref] = nowBottomAry[nowTopAry.length - 1];
			}
		}

		concatAry.push(topObj);
		concatAry.push(bottomObj);

		for(key in topObj) {

			var isActive = (windowDis>(topObj[key]-1)) && (windowDis<(bottomObj[key]-1)) ? 'active' : '';
			// console.log(key+ ' a tag is ' + isActive);
			if(isActive) {
				linkObj[key].className = "active";
			} else{
				linkObj[key].className = "";
			}
		}
	}

	// 滚动事件
	window.addEventListener('scroll',function(){
		defaultSet();
		// console.log('windowDis:' + windowDis);
		// console.log(topObj);
		// console.log(bottomObj);
	});








}



