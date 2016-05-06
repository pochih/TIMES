module.exports = {
	a: {
		_id: 100003,
		name: "BrianHuang",
		deviceId: 100003,
		talent: {
			position: -2,
			appearance: 3,
			IQ: -1
		},
		category: {
			affection: 6,
			health: 16,
			career: 6,
			learning: -24,
			entertainment: 6
		},
		isAlive: true,
		timeLeft: {
			hours: 0,
			mins: 38,
			secs: 55,
			milliseconds: 933
		},
		interest: 12.5,
		lands: {
			affection: [4, 5],
			health: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			career: [],
			learning: [], 
			entertainment: [1, 6]
		},
		dead: {
    		firstStage:{
				affection: false,
				health: false,
				career: false,
				learning: false,
				entertainment: false
    		},
			secondStage:{
				affection: true,
				health: true,
				career: true,
				learning: true,
				entertainment: true
    		},
    		thirdStage: {
				affection: true,
				health: true,
				career: true,
				learning: true,
				entertainment: true
    		},
    		fourthStage: {
				affection: false,
				health: false,
				career: false,
				learning: false,
				entertainment: false
    		}
		}
	},
	b: {
		_id: "l7",
		price: 60,
		probability: 20,
		category: "learning",
		level: 4,
		owner: {
			name: "Art-festival",
			_id: 100003
		},
		reward: 2,
		content: "考100分",
		specialties: false
	},
	c: {
		players: [100001, 100002, 131420],
		timeLeft: {
			hours: 0,
			mins: 22,
			secs: 10,
			milliseconds: 567
		},
		speed: 2,
		status: "pause"
	},
	d: {
		talentBonus: {
			position: {
				affection: 7,
				health: 7,
				career: 7,
				learning: 7,
				entertainment: 7
			},
			appearance: {
				affection: 10,
				health: 10,
				career: 10,
				learning: 0,
				entertainment: 10
			},
			IQ: {
				affection: 10,
				health: 0,
				career: 10,
				learning: 10,
				entertainment: 10
			}
		},
		levelBonus: {
			lv1: 0.1,
			lv2: 0.2,
			lv3: 0.5,
			lv4: 2
		}
	}
}

var a = 
{
	_id: 100001,
	name: "BrianHuang",
	deviceId: 100001,
	talent: {
		position: -2,
		appearance: 3,
		IQ: -1
	},
	category: {
		affection: 6,
		health: 16,
		career: 6,
		learning: -24,
		entertainment: 6
	},
	isAlive: true,
	timeLeft: {
		hours: 0,
		mins: 38,
		secs: 55,
		milliseconds: 933
	},
	interest: 12.5,
	lands: {
		affection: [4, 5],
		health: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		career: [],
		learning: [], 
		entertainment: [1, 6]
	}
}

var b = 
{
	_id: "A10",
	price: 60,
	probability: 20,
	category: "affection",
	level: 4,
	owner: {
		name: "Lulala",
		_id: 100002
	},
	reward: 2,
	content: "含飴弄孫",
	specialties: false
}

var c = 
{
	players: [100001, 100002, 131420],
	timeLeft: {
		hours: 0,
		mins: 22,
		secs: 10,
		milliseconds: 567
	},
	speed: 2,
	status: "pause"
}

var d = 
{
	talentBonus: {
		position: {
			affection: 7,
			health: 7,
			career: 7,
			learning: 7,
			entertainment: 7
		},
		appearance: {
			affection: 10,
			health: 10,
			career: 10,
			learning: 0,
			entertainment: 10
		},
		IQ: {
			affection: 10,
			health: 0,
			career: 10,
			learning: 10,
			entertainment: 10
		}
	},
	levelBonus: {
		lv1: 0.1,
		lv2: 0.2,
		lv3: 0.5,
		lv4: 2
	}
}

var dead = {
    firstStage:{
		affection: false,
		health: false,
		career: false,
		learning: false,
		entertainment: false
    },
	secondStage:{
		affection: true,
		health: true,
		career: true,
		learning: true,
		entertainment: true
    },
    thirdStage: {
		affection: true,
		health: true,
		career: true,
		learning: true,
		entertainment: true
    },
    fourthStage: {
		affection: false,
		health: false,
		career: false,
		learning: false,
		entertainment: false
    }
}

console.log(a, b, c, d, dead);