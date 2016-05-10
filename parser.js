var ownedParameter = 1.5;
var threeLandsBonus = 1.5;
var moneyUpperBound = 2;

var landTypes = {
	a: "affection",
	c: "career",
	e: "entertainment",
	h: "health",
	l: "learning"
};

var specialtiesTable = {
	a: 10,
	b: 19,
	c: 16,
	d: 16,
	e: 12
}

var all_lands = require('./db.js').lands;
var land_a = all_lands[landTypes.a];
var land_c = all_lands[landTypes.c];
var land_e = all_lands[landTypes.e];
var land_h = all_lands[landTypes.h];
var land_l = all_lands[landTypes.l];

function countCategory(category, a, p, i) {
	var db = require('./db.js');
	var position = db.bonus.talentBonus.position;
	var appearance = db.bonus.talentBonus.appearance;
	var IQ = db.bonus.talentBonus.IQ;
	category.affection = 0 + (p*position.affection + a*appearance.affection + i*IQ.affection);
	category.career = 0 + (p*position.career + a*appearance.career + i*IQ.career);
	category.entertainment = 0 + (p*position.entertainment + a*appearance.entertainment + i*IQ.entertainment);
	category.health = 0 + (p*position.health + a*appearance.health + i*IQ.health);
	category.learning = 0 + (p*position.learning + a*appearance.learning + i*IQ.learning);
	return category;
}

function isillegal(landQuery) {
	var type = landQuery.type;
	var num = landQuery.num;
	if (type != 'a' && type != 'c' && type != 'e' && type != 'h' && type != 'l')
		return true;
	if (num <= 0 || num > 20)
		return true;
	return false;
}

function timeTranslate(timeLeft) {
	var time = timeLeft.hours*3600 + timeLeft.mins*60 + timeLeft.secs;
	return time;
}

function timeObjTranslate(time) {
	var obj = {};
	obj.hours = Math.floor(time / 3600);
	obj.mins = Math.floor((time % 3600) / 60);
	obj.secs = Math.floor((time % 3600) % 60);
	obj.milliseconds = 0;
	return obj;
}

function enoughMoney(user, money) {
	var timeLeft = user.timeLeft;
	var time = timeTranslate(timeLeft);
	if (time >= money)
		return true;
	else 
		return false;
}

function illegalMoney(land, money) {
	var price = land.price;
	if (money >= 1 && money <= (price*moneyUpperBound))
		return false;
	else
		return true;
}

function userHasLand(user, land) {
	if (user.lands[land.longType] == null)
		return false;
	if (user.lands[land.longType].indexOf(land.num) > -1)
		return true;
	else
		return false;
}

function isOwned(user, land) {
	if (land.owner._id == -1)
		return false;
	if (land.owner._id != user._id)
		return true;
	return false;
}

function ifSpecialties(user, landQuery) {
	var lands = user.lands[landQuery.longType];
	var specialNum = specialtiesTable[landQuery.type];
	if (lands == null)
		return false;
	if (lands.indexOf(specialNum) > -1)
		return true;
	else
		return false;
}

function countProbability(user, land, money, landQuery, landOwned) {
	var price = land.price;
	var category = land.category;
	if (landOwned)
		price *= ownedParameter;
	var probability = land.probability;

	// if user has specialties
	var specialties = ifSpecialties(user, landQuery);
	if (specialties && land.level == 4)
		price /= 2;

	// if user has >= 6 lands of specific type
	if (user.lands[category].length >= 6)
		probability = 80;

	probability = probability * (money/price) + user.category[landQuery.longType];
	return probability;
}

// generate a int between low to high
function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

// decide win or lose
function gamble(probability) {
	var random = randomInt(0, 100);
	if (random <= probability)
		return true;
	else
		return false;
}

function tryToBuy(user, land, money, landQuery, landOwned) {
	var probability = countProbability(user, land, money, landQuery, landOwned);
	var success = gamble(probability);
	if (success)
		return true;
	else 
		return false
}

function addInterest(a, c, e, h, l) {
	var interest = 0;
	var tmp;
	if (a != null && a[0] != -1) {
		tmp = 0;
		for (var i = 0; i < a.length; i++)
			tmp += land_a[a[i]-1].interest;
		if (a.length >= 3)
			tmp *= threeLandsBonus;
		interest += tmp;
	}
	if (c != null && c[0] != -1) {
		tmp = 0;
		for (var i = 0; i < c.length; i++)
			tmp += land_c[c[i]-1].interest;
		if (c.length >= 3)
			tmp *= threeLandsBonus;
		interest += tmp;
	}
	if (e != null && e[0] != -1) {
		tmp = 0;
		for (var i = 0; i < e.length; i++)
			tmp += land_e[e[i]-1].interest;
		if (e.length >= 3)
			tmp *= threeLandsBonus;
		interest += tmp;
	}
	if (h != null && h[0] != -1) {
		tmp = 0;
		for (var i = 0; i < h.length; i++)
			tmp += land_h[h[i]-1].interest;
		if (h.length >= 3)
			tmp *= threeLandsBonus;
		interest += tmp;
	}
	if (l != null && l[0] != -1) {
		tmp = 0;
		for (var i = 0; i < l.length; i++)
			tmp += land_l[l[i]-1].interest;
		if (l.length >= 3)
			tmp *= threeLandsBonus;
		interest += tmp;
	}
	return interest;
}

function makeHTML(tag, msg, color) {
	var colour = 'black';
	if (color)
		colour = color;
	return '<' + tag + ' style="color:' + colour + ';">' + msg + '</' + tag + '>';
}

module.exports = {
	welcomeMsg: function() {
		var result = '<title>Manual</title><h1 style="color:#6f502c;">Manual';
		result += makeHTML('h3', '(red = high frequency)', '#dfb102');
		result += makeHTML('h4', '/user/dead?user=');
		result += makeHTML('h4', '/user/data?user=', 'red');
		result += makeHTML('h4', '/user/time?user=', 'red');
		result += makeHTML('h4', '/user/init/all');
		result += makeHTML('h4', '/user/init?id=&deviceId=&name=&a=&p=&i=');
		result += makeHTML('h4', '/land/stand?land=&user=');
		result += makeHTML('h4', '/land/importance?land=');
		result += makeHTML('h4', '/land/data?land=', 'red');
		result += makeHTML('h4', '/land/buy?land=&user=&money=', 'red');
		result += makeHTML('h4', '/land/init');
		result += makeHTML('h4', '/board/init?board=&land=');
		result += makeHTML('h4', '/board/occupy?board=');
		result += makeHTML('h4', '/time/start', '#cea300');
		result += makeHTML('h4', '/time/stop', '#cea300');
		result += makeHTML('h4', '/center');
		result += makeHTML('h4', '/center/speed?speed=');
		result += makeHTML('h4', '/bonus');
		result += '</h1>';
		return result;
	},
	parseLands: function(landStr) {
		return landStr.split(",");
	},
	parseLandType: function(landStr) {
		var obj = {};
		obj['type'] = landStr.match(/[A-Za-z]+/)[0];
		obj['longType'] = landTypes[obj['type']];
		obj['num'] = landStr.match(/\d+/)[0] - 0;
		return obj;
	},
	initUser: function(user, query) {
		var appearance = query.a;
  		var position = query.p;
  		var IQ = query.i;
		user._id = query.id;
  		user.name = query.name;
  		user.deviceId = query.device;
		user.talent = {
			position: position,
			appearance: appearance,
			IQ: IQ
		};		
		user.category = countCategory(user.category, appearance, position, IQ);
		return user;
	},
	parseEmptyArr: function(lands) {
		if (lands.affection.length == 1 && lands.affection[0] == -1)
			lands.affection = [];
		if (lands.career.length == 1 && lands.career[0] == -1)
			lands.career = [];
		if (lands.entertainment.length == 1 && lands.entertainment[0] == -1)
			lands.entertainment = [];
		if (lands.health.length == 1 && lands.health[0] == -1)
			lands.health = [];
		if (lands.learning.length == 1 && lands.learning[0] == -1)
			lands.learning = [];
		return lands;
	},
	buyLand: function(user, land, money, landQuery) {
		// if illegal land
		if (isillegal(landQuery))
			return {
				success: false,
				message: "這個土地不存在喔 ༼;´༎ຶ ۝ ༎ຶˋ༽"
			};

		// if enough money
		if (!enoughMoney(user, money))
			return {
				success: false,
				message: "您的時間不夠啦 ╚(ಠ_ಠ)=┐"
			};

		// if illegal money
		if (illegalMoney(land, money))
			return {
				success: false,
				message: "不能出這個價錢啦 (づ｡◕‿‿◕｡)づ"
			};

		// if already owned
		if (userHasLand(user, landQuery))
			return {
				success: false,
				message: "您已擁有此成就囉 ヾ(๑╹◡╹)ﾉ'"
			};

		// 判斷是否收購
		var landOwned = isOwned(user, land);

		// 判斷機率
		if (tryToBuy(user, land, money, landQuery, landOwned)) {
			var obj = {
				success: true,
				message: "獲得成就啦 ✌(-‿-)✌",
				targetID: null
			};
			if (landOwned)
				obj.targetID = land.owner._id;
			return obj;
		}
		else 
			return {
				probability: countProbability(user, land, money, landQuery, landOwned),
				success: false,
				message: "沒拿到成就，怒！ ヽ(`Д´)ﾉ ヽ(`Д´)ﾉ ヽ(`Д´)ﾉ"
			}
	},
	countInterest: function(lands) {
		//判斷是否有特殊加成
		var a = lands[landTypes.a];
		var c = lands[landTypes.c];
		var e = lands[landTypes.e];
		var h = lands[landTypes.h];
		var l = lands[landTypes.l];

		var interest = addInterest(a, c, e, h, l);

		return interest;
	},
	countTime: function(timeLeft, money) {
		var time = timeTranslate(timeLeft);
		time -= money;
		var timeObj = timeObjTranslate(time);
		if (timeLeft.interest != null)
			timeObj.interest = timeLeft.interest;
		return timeObj;
	}
}