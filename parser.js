var landTypes = {
	a: "affection",
	c: "career",
	e: "entertainment",
	h: "health",
	l: "learning"
};

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
}