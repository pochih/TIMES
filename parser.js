var landTypes = {
	a: "affection",
	c: "career",
	e: "entertainment",
	h: "health",
	l: "learning"
};

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

function userHasLand(user, land) {
	if (user.lands[land.longType].indexOf(land.num) > -1)
		return true;
	else
		return false;
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
		if (userHasLand(user, landQuery))
			return {
				success: false,
				message: "Already Owned"
			};
		return {
				success: true,
				message: "Succeed"
			};
	},
	countInterest: function(lands) {
		var interest = 0;
		return interest;
	},
	countTime: function(timeLeft) {
		var timeObj = timeLeft;
		return timeObj;
	}
}