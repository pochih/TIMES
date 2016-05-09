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

var ownedParameter = 1.5;

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

function enoughMoney(user, money) {
	var timeLeft = user.timeLeft;
	if (timeLeft.mins >= money)
		return true;
	if ((timeLeft.hours*60 + timeLeft.mins) >= money)
		return true;
	else 
		return false;
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
	if (landOwned)
		price *= ownedParameter;
	var probability = land.probability;

	// if user has specialties
	var specialties = ifSpecialties(user, landQuery);
	if (specialties && land.level == 4)
		price /= 2;
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

module.exports = {
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
				message: "您的時間不夠啦 (づ｡◕‿‿◕｡)づ"
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
				success: false,
				message: "沒拿到成就，怒！ ヽ(`Д´)ﾉ ヽ(`Д´)ﾉ ヽ(`Д´)ﾉ"
			}
	},
	countInterest: function(lands) {
		var interest = 0;

		//判斷是否有特殊加成

		return interest;
	},
	countTime: function(timeLeft, money) {
		var timeObj = timeLeft;
		if (timeLeft.mins >= money) {
			timeLeft.mins -= money;
		}
		else if (timeLeft.hours >= 1) {
			timeLeft.hours -= 1;
			timeLeft.mins += 60;
			timeLeft.mins -= money;
		}
		return timeObj;
	}
}