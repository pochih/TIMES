module.exports = {
	center: {
		players: [100001, 100003, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		timeLeft: {
			hours: 0,
			mins: 45,
			secs: 0,
			milliseconds: 0
		},
		speed: 1,
		status: "pause"
	},
	bonus: {
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
	},
	boards: [
		['a1', 'a2', 'a9', 'a20', 'c1', 'c2', 'c9', 'c20', 'e1', 'e2', 'e9', 'e20', 'h1', 'h2', 'h9', 'h20', 'l1', 'l2', 'l9', 'l20'],
		['a3', 'a4', 'a10', 'a19', 'c3', 'c4', 'c10', 'c19', 'e3', 'e4', 'e10', 'e19', 'h3', 'h4', 'h10', 'h19', 'l3', 'l4', 'l10', 'l19'],
		['a5', 'a6', 'a17', 'a18', 'c5', 'c6', 'c17', 'c18', 'e5', 'e6', 'e17', 'e18', 'h5', 'h6', 'h17', 'h18', 'l5', 'l6', 'l17', 'l18'],
		['a7', 'a11', 'a12', 'a16', 'c7', 'c11', 'c12', 'c16', 'e7', 'e11', 'e12', 'e16', 'h7', 'h11', 'h12', 'h16', 'l7', 'l11', 'l12', 'l16'],
		['a8', 'a13', 'a14', 'a15', 'c8', 'c13', 'c14', 'c15', 'e8', 'e13', 'e14', 'e15', 'h8', 'h13', 'h14', 'h15', 'l8', 'l13', 'l14', 'l15']
	],
	user: {
		_id: -1,
		name: "",
		deviceId: -1,
		talent: {
			position: 0,
			appearance: 0,
			IQ: 0
		},
		category: {
			affection: 0,
			health: 0,
			career: 0,
			learning: 0,
			entertainment: 0
		},
		isAlive: true,
		timeLeft: {
			hours: 0,
			mins: 45,
			secs: 0,
			milliseconds: 0
		},
		interest: 0,
		lands: {
			affection: [],
			health: [],
			career: [],
			learning: [], 
			entertainment: []
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
				affection: false,
				health: false,
				career: false,
				learning: false,
				entertainment: false
    		},
    		thirdStage: {
				affection: false,
				health: false,
				career: false,
				learning: false,
				entertainment: false
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
	defaultUser: {
		_id: null,
		name: null,
		deviceId: null,
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
			affection: [4, 5, 6],
			health: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			career: [],
			learning: [20], 
			entertainment: [1, 6, 11, 16]
		},
		dead: {
    		firstStage:{
				affection: false,
				health: true,
				career: false,
				learning: false,
				entertainment: false
    		},
			secondStage:{
				affection: false,
				health: false,
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
				affection: true,
				health: false,
				career: true,
				learning: false,
				entertainment: false
    		}
		}
	},
	defaultLand: {
		_id: "l7",
		price: 60,
		probability: 20,
		category: "learning",
		level: 4,
		owner: {
			name: "Art-festival",
			_id: 100003
		},
		interest: 2,
		content: "考100分",
		specialties: false
	},
	lands: {
		entertainment: [
			{
				_id: "e1",
				price: 1,
				probability: 70,
				category: "entertainment",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "分享FB動態抽到iPhone一支",
				specialties: false
			},
			{
				_id: "e2",
				price: 1,
				probability: 70,
				category: "entertainment",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "每天晚上睡前打一場LOL",
				specialties: false
			},
			{
				_id: "e3",
				price: 1,
				probability: 70,
				category: "entertainment",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "一場說走就走的微旅行",
				specialties: false
			},
			{
				_id: "e4",
				price: 1,
				probability: 70,
				category: "entertainment",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "在漫畫店待上一整天",
				specialties: false
			},
			{
				_id: "e5",
				price: 1,
				probability: 70,
				category: "entertainment",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "幸運搶到偶像歌手的搖滾區門票",
				specialties: false
			},
			{
				_id: "e6",
				price: 1,
				probability: 70,
				category: "entertainment",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "晚上出門遛夠散步",
				specialties: false
			},
			{
				_id: "e7",
				price: 1,
				probability: 70,
				category: "entertainment",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "隨揪隨行，和朋友一起看場電影",
				specialties: false
			},
			{
				_id: "e8",
				price: 1,
				probability: 70,
				category: "entertainment",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "一個酒杯，一點音樂",
				specialties: false
			},
			{
				_id: "e9",
				price: 5,
				probability: 50,
				category: "entertainment",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "在賭場贏得吃角子老虎",
				specialties: false
			},
			{
				_id: "e10",
				price: 5,
				probability: 50,
				category: "entertainment",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "公司尾牙抽到一棟房子(車)",
				specialties: false
			},
			{
				_id: "e11",
				price: 5,
				probability: 50,
				category: "entertainment",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "和同好組成一個業餘樂團，工作之餘滿足興趣",
				specialties: false
			},
			{
				_id: "e12",
				price: 5,
				probability: 50,
				category: "entertainment",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "在現場觀看最喜歡的球隊贏得總冠軍",
				specialties: false
			},
			{
				_id: "e13",
				price: 5,
				probability: 50,
				category: "entertainment",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "挑戰自我，完成高空跳傘",
				specialties: false
			},
			{
				_id: "e14",
				price: 5,
				probability: 50,
				category: "entertainment",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "人生的GAP YEAR，獨自在歐洲旅居一年",
				specialties: false
			},
			{
				_id: "e15",
				price: 15,
				probability: 30,
				category: "entertainment",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "環遊世界一周",
				specialties: false
			},
			{
				_id: "e16",
				price: 15,
				probability: 30,
				category: "entertainment",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "下圍棋擊敗AlphaGo",
				specialties: false
			},
			{
				_id: "e17",
				price: 15,
				probability: 30,
				category: "entertainment",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "擁有一架私人飛機",
				specialties: false
			},
			{
				_id: "e18",
				price: 15,
				probability: 30,
				category: "entertainment",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "買下一座海上小島",
				specialties: false
			},
			{
				_id: "e19",
				price: 30,
				probability: 15,
				category: "entertainment",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 2,
				content: "買下一座動物園",
				specialties: false
			},
			{
				_id: "e20",
				price: 30,
				probability: 15,
				category: "entertainment",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 2,
				content: "在清幽的山上有一間自己的別墅",
				specialties: false
			}
		],
		health: [
			{
				_id: "h1",
				price: 1,
				probability: 70,
				category: "health",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "一口氣做一百個仰臥起坐",
				specialties: false
			},
			{
				_id: "h2",
				price: 1,
				probability: 70,
				category: "health",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "施打流感疫苗",
				specialties: false
			},
			{
				_id: "h3",
				price: 1,
				probability: 70,
				category: "health",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "吃素2個月，但最後放棄了",
				specialties: false
			},
			{
				_id: "h4",
				price: 1,
				probability: 70,
				category: "health",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "期末考念不完了還是要九點準時上床睡覺",
				specialties: false
			},
			{
				_id: "h5",
				price: 1,
				probability: 70,
				category: "health",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "和朋友每週末一起跑步健身",
				specialties: false
			},
			{
				_id: "h6",
				price: 1,
				probability: 70,
				category: "health",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "朝會上司令台表演健康操",
				specialties: false
			},
			{
				_id: "h7",
				price: 1,
				probability: 70,
				category: "health",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "一個月不喝含糖飲料",
				specialties: false
			},
			{
				_id: "h8",
				price: 1,
				probability: 70,
				category: "health",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "一整年沒有生病、感冒",
				specialties: false
			},
			{
				_id: "h9",
				price: 5,
				probability: 50,
				category: "health",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "立志成為健康飲食的營養達人",
				specialties: false
			},
			{
				_id: "h10",
				price: 5,
				probability: 50,
				category: "health",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "13分鐘輕鬆跑完3000公尺",
				specialties: false
			},
			{
				_id: "h11",
				price: 5,
				probability: 50,
				category: "health",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "吃中藥調理身體，不再過敏",
				specialties: false
			},
			{
				_id: "h12",
				price: 5,
				probability: 50,
				category: "health",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "每天都喝3000c.c.的水",
				specialties: false
			},
			{
				_id: "h13",
				price: 5,
				probability: 50,
				category: "health",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "連續5年健康檢查沒有異狀",
				specialties: false
			},
			{
				_id: "h14",
				price: 5,
				probability: 50,
				category: "health",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "成為體育校隊選手，為校爭光",
				specialties: false
			},
			{
				_id: "h15",
				price: 15,
				probability: 30,
				category: "health",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "養成每天晨泳的習慣",
				specialties: false
			},
			{
				_id: "h16",
				price: 15,
				probability: 30,
				category: "health",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "成功挑戰42.195公里馬拉松",
				specialties: false
			},
			{
				_id: "h17",
				price: 15,
				probability: 30,
				category: "health",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "因運動傷害休養1年，並順利康復",
				specialties: false
			},
			{
				_id: "h18",
				price: 15,
				probability: 30,
				category: "health",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "成功挑戰泳渡日月潭",
				specialties: false
			},
			{
				_id: "h19",
				price: 30,
				probability: 15,
				category: "health",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 2,
				content: "騎腳踏車橫跨歐亞大陸",
				specialties: false
			},
			{
				_id: "h20",
				price: 30,
				probability: 15,
				category: "health",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 2,
				content: "63歲時，抗癌成功",
				specialties: false
			}
		],
		affection: [
			{
				_id: "a1",
				price: 1,
				probability: 70,
				category: "affection",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "第一次小鹿亂撞地牽起那個人的手",
				specialties: false
			},
			{
				_id: "a2",
				price: 1,
				probability: 70,
				category: "affection",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "用拍立得記錄著與死黨們相處的記憶",
				specialties: false
			},
			{
				_id: "a3",
				price: 1,
				probability: 70,
				category: "affection",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "準備一些點心，與巷口那隻貓談談心",
				specialties: false
			},
			{
				_id: "a4",
				price: 1,
				probability: 70,
				category: "affection",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "帶著孩子在河濱公園渡過悠閒的週末",
				specialties: false
			},
			{
				_id: "a5",
				price: 1,
				probability: 70,
				category: "affection",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "和鄰居相處融洽，彼此敦親睦鄰",
				specialties: false
			},
			{
				_id: "a6",
				price: 1,
				probability: 70,
				category: "affection",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "在FB上找到小學時搬家轉學的同學",
				specialties: false
			},
			{
				_id: "a7",
				price: 1,
				probability: 70,
				category: "affection",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "和爸媽溝通取得他們的對你的理解",
				specialties: false
			},
			{
				_id: "a8",
				price: 1,
				probability: 70,
				category: "affection",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "交到一群開心打屁的的朋友",
				specialties: false
			},
			{
				_id: "a9",
				price: 5,
				probability: 50,
				category: "affection",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "和多年未見的好友相約一頓午茶",
				specialties: false
			},
			{
				_id: "a10",
				price: 5,
				probability: 50,
				category: "affection",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "在公司有一群相處融洽、相互支持的同事",
				specialties: false
			},
			{
				_id: "a11",
				price: 5,
				probability: 50,
				category: "affection",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "養一窩聽話的毛小孩",
				specialties: false
			},
			{
				_id: "a12",
				price: 5,
				probability: 50,
				category: "affection",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "擁有一個無話不談的知心好友",
				specialties: false
			},
			{
				_id: "a13",
				price: 5,
				probability: 50,
				category: "affection",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "找到一生的信仰，虔誠的相信著",
				specialties: false
			},
			{
				_id: "a14",
				price: 5,
				probability: 50,
				category: "affection",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "和心愛的人結婚",
				specialties: false
			},
			{
				_id: "a15",
				price: 15,
				probability: 30,
				category: "affection",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "子孫滿堂",
				specialties: false
			},
			{
				_id: "a16",
				price: 15,
				probability: 30,
				category: "affection",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "參加兒子的婚禮",
				specialties: false
			},
			{
				_id: "a17",
				price: 15,
				probability: 30,
				category: "affection",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "擁有一次回到過去道謝的機會",
				specialties: false
			},
			{
				_id: "a18",
				price: 15,
				probability: 30,
				category: "affection",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "在美麗的海島國家度蜜月",
				specialties: false
			},
			{
				_id: "a19",
				price: 30,
				probability: 15,
				category: "affection",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 2,
				content: "拍攝浪漫求婚廣告",
				specialties: false
			},
			{
				_id: "a20",
				price: 30,
				probability: 15,
				category: "affection",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 2,
				content: "認養非洲兒童，資助孩子的成長過程",
				specialties: false
			}
		],
		career: [
			{
				_id: "c1",
				price: 1,
				probability: 70,
				category: "career",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "認真寫作，成為網路知名美食部落客",
				specialties: false
			},
			{
				_id: "c2",
				price: 1,
				probability: 70,
				category: "career",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "創業獲得投資人青睞獲得種子投資",
				specialties: false
			},
			{
				_id: "c3",
				price: 1,
				probability: 70,
				category: "career",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "成為工作安定、有保障的公務員",
				specialties: false
			},
			{
				_id: "c4",
				price: 1,
				probability: 70,
				category: "career",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "能力獲得上司肯定，升遷加薪",
				specialties: false
			},
			{
				_id: "c5",
				price: 1,
				probability: 70,
				category: "career",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "擁有人生中的第一張名片",
				specialties: false
			},
			{
				_id: "c6",
				price: 1,
				probability: 70,
				category: "career",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "存到人生的第一桶金",
				specialties: false
			},
			{
				_id: "c7",
				price: 1,
				probability: 70,
				category: "career",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "打零工，過輕鬆寫意的生活",
				specialties: false
			},
			{
				_id: "c8",
				price: 1,
				probability: 70,
				category: "career",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "學會一項傳統的技能，將老一輩的智慧傳承下去",
				specialties: false
			},
			{
				_id: "c9",
				price: 5,
				probability: 50,
				category: "career",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "認真拉業績，榮獲年度最佳業務員",
				specialties: false
			},
			{
				_id: "c10",
				price: 5,
				probability: 50,
				category: "career",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "成為一個小學老師，用生命影響著生命",
				specialties: false
			},
			{
				_id: "c11",
				price: 5,
				probability: 50,
				category: "career",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "達成小時候夢想，開了一間漫畫書店",
				specialties: false
			},
			{
				_id: "c12",
				price: 5,
				probability: 50,
				category: "career",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "成為行腳節目主持人，玩遍五大洋七大洲",
				specialties: false
			},
			{
				_id: "c13",
				price: 5,
				probability: 50,
				category: "career",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "參加世界大賞，成為世界第一的麵包師傅",
				specialties: false
			},
			{
				_id: "c14",
				price: 5,
				probability: 50,
				category: "career",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "放棄年薪百萬，回家鄉務農種水果",
				specialties: false
			},
			{
				_id: "c15",
				price: 15,
				probability: 30,
				category: "career",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "如願成為一個偏鄉教師，作為一份志業",
				specialties: false
			},
			{
				_id: "c16",
				price: 15,
				probability: 30,
				category: "career",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "如願成為一個偏鄉教師，作為一份志業",
				specialties: false
			},
			{
				_id: "c17",
				price: 15,
				probability: 30,
				category: "career",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "樂團登上跨年音樂會表演",
				specialties: false
			},
			{
				_id: "c18",
				price: 15,
				probability: 30,
				category: "career",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "回饋資金予母校，建造一棟以自己為名的大樓",
				specialties: false
			},
			{
				_id: "c19",
				price: 30,
				probability: 15,
				category: "career",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 2,
				content: "高價收購自己有興趣的新創公司",
				specialties: false
			},
			{
				_id: "c20",
				price: 30,
				probability: 15,
				category: "career",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 2,
				content: "成功開發新技術，成為業界先驅",
				specialties: false
			}
		],
		learning: [
			{
				_id: "l1",
				price: 1,
				probability: 70,
				category: "learning",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "日文小考100分",
				specialties: false
			},
			{
				_id: "l2",
				price: 1,
				probability: 70,
				category: "learning",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "被老師要求背完出師表",
				specialties: false
			},
			{
				_id: "l3",
				price: 1,
				probability: 70,
				category: "learning",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "國中畢業獲得市長獎",
				specialties: false
			},
			{
				_id: "l4",
				price: 1,
				probability: 70,
				category: "learning",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "全國科展獲優等獎",
				specialties: false
			},
			{
				_id: "l5",
				price: 1,
				probability: 70,
				category: "learning",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "在補習班擔任輔導老師，為學生解惑",
				specialties: false
			},
			{
				_id: "l6",
				price: 1,
				probability: 70,
				category: "learning",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "高中獲得全校第一名",
				specialties: false
			},
			{
				_id: "l7",
				price: 1,
				probability: 70,
				category: "learning",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "大四沒上課還是輕鬆歐趴",
				specialties: false
			},
			{
				_id: "l8",
				price: 1,
				probability: 70,
				category: "learning",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.1,
				content: "為了第一志願，閉關重考一年",
				specialties: false
			},
			{
				_id: "l9",
				price: 5,
				probability: 50,
				category: "learning",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "榮獲傑出青年獎",
				specialties: false
			},
			{
				_id: "l10",
				price: 5,
				probability: 50,
				category: "learning",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "努力一學期，順利得到書卷獎",
				specialties: false
			},
			{
				_id: "l11",
				price: 5,
				probability: 50,
				category: "learning",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "活到老學到老，參加社區大學課程",
				specialties: false
			},
			{
				_id: "l12",
				price: 5,
				probability: 50,
				category: "learning",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "黑客松最佳概念獎",
				specialties: false
			},
			{
				_id: "l13",
				price: 5,
				probability: 50,
				category: "learning",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "和同學組隊參與旅遊企劃比賽，得到第一名",
				specialties: false
			},
			{
				_id: "l14",
				price: 5,
				probability: 50,
				category: "learning",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.2,
				content: "獲得雙修學歷",
				specialties: false
			},
			{
				_id: "l15",
				price: 15,
				probability: 30,
				category: "learning",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "參加論文比賽，成功申請獎學金",
				specialties: false
			},
			{
				_id: "l16",
				price: 15,
				probability: 30,
				category: "learning",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "離鄉背井遠赴美國攻取博士學歷",
				specialties: false
			},
			{
				_id: "l17",
				price: 15,
				probability: 30,
				category: "learning",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "考取專業領域執照",
				specialties: false
			},
			{
				_id: "l18",
				price: 15,
				probability: 30,
				category: "learning",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 0.5,
				content: "辛苦的修完一堂獲益良多的好課",
				specialties: false
			},
			{
				_id: "l19",
				price: 30,
				probability: 15,
				category: "learning",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 2,
				content: "獲得諾貝爾獎",
				specialties: false
			},
			{
				_id: "l20",
				price: 30,
				probability: 15,
				category: "learning",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: 2,
				content: "獲得哈佛榮譽博士",
				specialties: false
			}
		]
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
    firstStage: {
		affection: false,
		health: false,
		career: false,
		learning: false,
		entertainment: false
    },
	secondStage: {
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

console.log("require db.js");