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
	category.affection += (p*position.affection + a*appearance.affection + i*IQ.affection);
	category.career += (p*position.career + a*appearance.career + i*IQ.career);
	category.entertainment += (p*position.entertainment + a*appearance.entertainment + i*IQ.entertainment);
	category.health += (p*position.health + a*appearance.health + i*IQ.health);
	category.learning += (p*position.learning + a*appearance.learning + i*IQ.learning);
	return category;
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
	decideCategory: function(user, a, p, i) {
		user.talent = {
			position: p,
			appearance: a,
			IQ: i
		};
		user.category = countCategory(user.category, a, p, i);
		return user;
	}
}