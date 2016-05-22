var lv1_price = 60;
var lv2_price = 300;
var lv3_price = 600;
var lv4_price = 900;
var lv1_prob = 85;
var lv2_prob = 70;
var lv3_prob = 50;
var lv4_prob = 30;
var lv1_interest = 0.2;
var lv2_interest = 0.5;
var lv3_interest = 1.5;
var lv4_interest = 4;

module.exports = {
	center: {
		players: [100001, 100003, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
		['a13', 'e12', 'e13', 'd13', 'c15', 'e14', 'c16', 'e15', 'b13', 'd14', 'd15', 'e16', 'b14', 'b15', 'd16', 'c17', 'b16', 'a14', 'e17', 'a12'],
		['b17', 'd17', 'c18', 'a15', 'a16', 'a17', 'd18', 'a18', 'e19', 'c19', 'e20', 'b18', 'c20', 'd19', 'd20', 'b19', 'b20', 'a19', 'a20', 'e18'],
		['b8', 'b9', 'b10', 'e9', 'a9', 'b11', 'c9', 'd11', 'c10', 'c14', 'e10', 'c12', 'c13', 'a10', 'b12', 'c11', 'a11', 'e11', 'd12', 'c8'],
		['e2', 'c1', 'a1', 'a2', 'c2', 'b1', 'b2', 'a3', 'a4', 'a5', 'e4', 'd2', 'e3', 'd1', 'b3', 'c3', 'b4', 'c4', 'b5', 'e1'],
		['c6', 'a6', 'c7', 'd3', 'd4', 'b6', 'd5', 'd6', 'e5', 'e6', 'a7', 'd7', 'a8', 'd9', 'd8', 'e8', 'e7', 'd10', 'b7', 'c5']
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
			mins: 60,
			secs: 0,
			milliseconds: 0
		},
		interest: 0,
		stand: -1,
		lands: {
			affection: [-1],
			health: [-1],
			career: [-1],
			learning: [-1], 
			entertainment: [-1]
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
	allUserURL: [
		'https://art-festival.herokuapp.com/user/init?a=3&p=-2&i=-1&name=Brian Huang&id=0&device=0',
  		'https://art-festival.herokuapp.com/user/init?a=0&p=-1&i=1&name=Barack Obama&id=1&device=1',
  		'https://art-festival.herokuapp.com/user/init?a=-1&p=0&i=1&name=Angela Merkle&id=2&device=2',
  		'https://art-festival.herokuapp.com/user/init?a=0&p=1&i=-1&name=VladimirPutin&id=3&device=3',
  		'https://art-festival.herokuapp.com/user/init?a=0&p=-1&i=1&name=Che Guevara&id=4&device=4',
  		'https://art-festival.herokuapp.com/user/init?a=4&p=-2&i=-2&name=Albert Einstein&id=5&device=5',
  		'https://art-festival.herokuapp.com/user/init?a=-1&p=3&i=-2&name=Donald John Trump&id=6&device=6',
  		'https://art-festival.herokuapp.com/user/init?a=-3&p=-3&i=6&name=%E8%94%A1%E8%8B%B1%E6%96%87&id=7&device=7',
  		'https://art-festival.herokuapp.com/user/init?a=-2&p=2&i=0&name=%E5%AD%94%E4%B8%98&id=8&device=8',
  		'https://art-festival.herokuapp.com/user/init?a=0&p=-1&i=1&name=%E5%A7%9A%E6%98%8E&id=9&device=9',
  		'https://art-festival.herokuapp.com/user/init?a=4&p=-2&i=-2&name=%E6%9D%91%E4%B8%8A%E6%98%A5%E6%A8%B9&id=10&device=10',
  		'https://art-festival.herokuapp.com/user/init?a=2&p=-2&i=0&name=Stephen Curry&id=11&device=11',
  		'https://art-festival.herokuapp.com/user/init?a=0&p=-2&i=2&name=Steve Jobs&id=12&device=12',
  		'https://art-festival.herokuapp.com/user/init?a=1&p=1&i=-2&name=R2D2&id=13&device=13',
  		'https://art-festival.herokuapp.com/user/init?a=-2&p=0&i=2&name=King&id=14&device=14',
  		'https://art-festival.herokuapp.com/user/init?a=10&p=10&i=10&name=root&id=100001&device=100001',
  		'https://art-festival.herokuapp.com/user/init?a=2&p=2&i=2&name=How Do You Turn This On&id=100003&device=100003'
	],
	defaultUser: {
		_id: 'default',
		name: 'default',
		deviceId: 'default',
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
			hours: 1,
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
		_id: "b7",
		price: lv1_price,
		probability: lv1_prob,
		category: "learning",
		level: 1,
		owner: {
			name: "Art-festival",
			_id: 100003
		},
		interest: lv1_interest,
		content: "考100分",
		specialties: false
	},
	lands: {
		entertainment: [
			{
				_id: "e1",
				price: lv1_price,
				probability: lv1_prob,
				category: "entertainment",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "分享FB動態抽到iPhone一支",
				specialties: false
			},
			{
				_id: "e2",
				price: lv1_price,
				probability: lv1_prob,
				category: "entertainment",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "每天晚上睡前打一場LOL",
				specialties: false
			},
			{
				_id: "e3",
				price: lv1_price,
				probability: lv1_prob,
				category: "entertainment",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "一場說走就走的微旅行",
				specialties: false
			},
			{
				_id: "e4",
				price: lv1_price,
				probability: lv1_prob,
				category: "entertainment",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "在漫畫店待上一整天",
				specialties: false
			},
			{
				_id: "e5",
				price: lv1_price,
				probability: lv1_prob,
				category: "entertainment",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "幸運搶到偶像歌手的搖滾區門票",
				specialties: false
			},
			{
				_id: "e6",
				price: lv1_price,
				probability: lv1_prob,
				category: "entertainment",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "晚上出門遛夠散步",
				specialties: false
			},
			{
				_id: "e7",
				price: lv1_price,
				probability: lv1_prob,
				category: "entertainment",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "隨揪隨行，和朋友一起看場電影",
				specialties: false
			},
			{
				_id: "e8",
				price: lv1_price,
				probability: lv1_prob,
				category: "entertainment",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "一個酒杯，一點音樂",
				specialties: false
			},
			{
				_id: "e9",
				price: lv2_price,
				probability: lv2_prob,
				category: "entertainment",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "在賭場贏得吃角子老虎",
				specialties: false
			},
			{
				_id: "e10",
				price: lv2_price,
				probability: lv2_prob,
				category: "entertainment",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "公司尾牙抽到一棟房子(車)",
				specialties: false
			},
			{
				_id: "e11",
				price: lv2_price,
				probability: lv2_prob,
				category: "entertainment",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "和同好組成一個業餘樂團，工作之餘滿足興趣",
				specialties: false
			},
			{
				_id: "e12",
				price: lv2_price,
				probability: lv2_prob,
				category: "entertainment",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "在現場觀看最喜歡的球隊贏得總冠軍",
				specialties: false
			},
			{
				_id: "e13",
				price: lv2_price,
				probability: lv2_prob,
				category: "entertainment",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "挑戰自我，完成高空跳傘",
				specialties: false
			},
			{
				_id: "e14",
				price: lv2_price,
				probability: lv2_prob,
				category: "entertainment",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "人生的GAP YEAR，獨自在歐洲旅居一年",
				specialties: false
			},
			{
				_id: "e15",
				price: lv3_price,
				probability: lv3_prob,
				category: "entertainment",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "環遊世界一周",
				specialties: false
			},
			{
				_id: "e16",
				price: lv3_price,
				probability: lv3_prob,
				category: "entertainment",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "下圍棋擊敗AlphaGo",
				specialties: false
			},
			{
				_id: "e17",
				price: lv3_price,
				probability: lv3_prob,
				category: "entertainment",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "擁有一架私人飛機",
				specialties: false
			},
			{
				_id: "e18",
				price: lv3_price,
				probability: lv3_prob,
				category: "entertainment",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "買下一座海上小島",
				specialties: false
			},
			{
				_id: "e19",
				price: lv4_price,
				probability: lv4_prob,
				category: "entertainment",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv4_interest,
				content: "買下一座動物園",
				specialties: false
			},
			{
				_id: "e20",
				price: lv4_price,
				probability: lv4_prob,
				category: "entertainment",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv4_interest,
				content: "在清幽的山上有一間自己的別墅",
				specialties: false
			}
		],
		health: [
			{
				_id: "d1",
				price: lv1_price,
				probability: lv1_prob,
				category: "health",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "一口氣做一百個仰臥起坐",
				specialties: false
			},
			{
				_id: "d2",
				price: lv1_price,
				probability: lv1_prob,
				category: "health",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "施打流感疫苗",
				specialties: false
			},
			{
				_id: "d3",
				price: lv1_price,
				probability: lv1_prob,
				category: "health",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "吃素2個月，但最後放棄了",
				specialties: false
			},
			{
				_id: "d4",
				price: lv1_price,
				probability: lv1_prob,
				category: "health",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "期末考念不完了還是要九點準時上床睡覺",
				specialties: false
			},
			{
				_id: "d5",
				price: lv1_price,
				probability: lv1_prob,
				category: "health",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "和朋友每週末一起跑步健身",
				specialties: false
			},
			{
				_id: "d6",
				price: lv1_price,
				probability: lv1_prob,
				category: "health",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "朝會上司令台表演健康操",
				specialties: false
			},
			{
				_id: "d7",
				price: lv1_price,
				probability: lv1_prob,
				category: "health",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "一個月不喝含糖飲料",
				specialties: false
			},
			{
				_id: "d8",
				price: lv1_price,
				probability: lv1_prob,
				category: "health",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "一整年沒有生病、感冒",
				specialties: false
			},
			{
				_id: "d9",
				price: lv2_price,
				probability: lv2_prob,
				category: "health",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "立志成為健康飲食的營養達人",
				specialties: false
			},
			{
				_id: "d10",
				price: lv2_price,
				probability: lv2_prob,
				category: "health",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "13分鐘輕鬆跑完3000公尺",
				specialties: false
			},
			{
				_id: "d11",
				price: lv2_price,
				probability: lv2_prob,
				category: "health",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "吃中藥調理身體，不再過敏",
				specialties: false
			},
			{
				_id: "d12",
				price: lv2_price,
				probability: lv2_prob,
				category: "health",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "每天都喝3000c.c.的水",
				specialties: false
			},
			{
				_id: "d13",
				price: lv2_price,
				probability: lv2_prob,
				category: "health",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "連續5年健康檢查沒有異狀",
				specialties: false
			},
			{
				_id: "d14",
				price: lv2_price,
				probability: lv2_prob,
				category: "health",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "成為體育校隊選手，為校爭光",
				specialties: false
			},
			{
				_id: "d15",
				price: lv3_price,
				probability: lv3_prob,
				category: "health",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "養成每天晨泳的習慣",
				specialties: false
			},
			{
				_id: "d16",
				price: lv3_price,
				probability: lv3_prob,
				category: "health",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "成功挑戰42.195公里馬拉松",
				specialties: false
			},
			{
				_id: "d17",
				price: lv3_price,
				probability: lv3_prob,
				category: "health",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "因運動傷害休養1年，並順利康復",
				specialties: false
			},
			{
				_id: "d18",
				price: lv3_price,
				probability: lv3_prob,
				category: "health",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "成功挑戰泳渡日月潭",
				specialties: false
			},
			{
				_id: "d19",
				price: lv4_price,
				probability: lv4_prob,
				category: "health",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv4_interest,
				content: "騎腳踏車橫跨歐亞大陸",
				specialties: false
			},
			{
				_id: "d20",
				price: lv4_price,
				probability: lv4_prob,
				category: "health",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv4_interest,
				content: "63歲時，抗癌成功",
				specialties: false
			}
		],
		affection: [
			{
				_id: "a1",
				price: lv1_price,
				probability: lv1_prob,
				category: "affection",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "第一次小鹿亂撞地牽起那個人的手",
				specialties: false
			},
			{
				_id: "a2",
				price: lv1_price,
				probability: lv1_prob,
				category: "affection",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "用拍立得記錄著與死黨們相處的記憶",
				specialties: false
			},
			{
				_id: "a3",
				price: lv1_price,
				probability: lv1_prob,
				category: "affection",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "準備一些點心，與巷口那隻貓談談心",
				specialties: false
			},
			{
				_id: "a4",
				price: lv1_price,
				probability: lv1_prob,
				category: "affection",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "帶著孩子在河濱公園渡過悠閒的週末",
				specialties: false
			},
			{
				_id: "a5",
				price: lv1_price,
				probability: lv1_prob,
				category: "affection",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "和鄰居相處融洽，彼此敦親睦鄰",
				specialties: false
			},
			{
				_id: "a6",
				price: lv1_price,
				probability: lv1_prob,
				category: "affection",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "在FB上找到小學時搬家轉學的同學",
				specialties: false
			},
			{
				_id: "a7",
				price: lv1_price,
				probability: lv1_prob,
				category: "affection",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "和爸媽溝通取得他們的對你的理解",
				specialties: false
			},
			{
				_id: "a8",
				price: lv1_price,
				probability: lv1_prob,
				category: "affection",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "交到一群開心打屁的的朋友",
				specialties: false
			},
			{
				_id: "a9",
				price: lv2_price,
				probability: lv2_prob,
				category: "affection",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "和多年未見的好友相約一頓午茶",
				specialties: false
			},
			{
				_id: "a10",
				price: lv2_price,
				probability: lv2_prob,
				category: "affection",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "在公司有一群相處融洽、相互支持的同事",
				specialties: false
			},
			{
				_id: "a11",
				price: lv2_price,
				probability: lv2_prob,
				category: "affection",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "養一窩聽話的毛小孩",
				specialties: false
			},
			{
				_id: "a12",
				price: lv2_price,
				probability: lv2_prob,
				category: "affection",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "擁有一個無話不談的知心好友",
				specialties: false
			},
			{
				_id: "a13",
				price: lv2_price,
				probability: lv2_prob,
				category: "affection",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "找到一生的信仰，虔誠的相信著",
				specialties: false
			},
			{
				_id: "a14",
				price: lv2_price,
				probability: lv2_prob,
				category: "affection",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "和心愛的人結婚",
				specialties: false
			},
			{
				_id: "a15",
				price: lv3_price,
				probability: lv3_prob,
				category: "affection",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "子孫滿堂",
				specialties: false
			},
			{
				_id: "a16",
				price: lv3_price,
				probability: lv3_prob,
				category: "affection",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "參加兒子的婚禮",
				specialties: false
			},
			{
				_id: "a17",
				price: lv3_price,
				probability: lv3_prob,
				category: "affection",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "擁有一次回到過去道謝的機會",
				specialties: false
			},
			{
				_id: "a18",
				price: lv3_price,
				probability: lv3_prob,
				category: "affection",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "在美麗的海島國家度蜜月",
				specialties: false
			},
			{
				_id: "a19",
				price: lv4_price,
				probability: lv4_prob,
				category: "affection",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv4_interest,
				content: "拍攝浪漫求婚廣告",
				specialties: false
			},
			{
				_id: "a20",
				price: lv4_price,
				probability: lv4_prob,
				category: "affection",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv4_interest,
				content: "認養非洲兒童，資助孩子的成長過程",
				specialties: false
			}
		],
		career: [
			{
				_id: "c1",
				price: lv1_price,
				probability: lv1_prob,
				category: "career",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "認真寫作，成為網路知名美食部落客",
				specialties: false
			},
			{
				_id: "c2",
				price: lv1_price,
				probability: lv1_prob,
				category: "career",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "創業獲得投資人青睞獲得種子投資",
				specialties: false
			},
			{
				_id: "c3",
				price: lv1_price,
				probability: lv1_prob,
				category: "career",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "成為工作安定、有保障的公務員",
				specialties: false
			},
			{
				_id: "c4",
				price: lv1_price,
				probability: lv1_prob,
				category: "career",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "能力獲得上司肯定，升遷加薪",
				specialties: false
			},
			{
				_id: "c5",
				price: lv1_price,
				probability: lv1_prob,
				category: "career",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "擁有人生中的第一張名片",
				specialties: false
			},
			{
				_id: "c6",
				price: lv1_price,
				probability: lv1_prob,
				category: "career",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "存到人生的第一桶金",
				specialties: false
			},
			{
				_id: "c7",
				price: lv1_price,
				probability: lv1_prob,
				category: "career",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "打零工，過輕鬆寫意的生活",
				specialties: false
			},
			{
				_id: "c8",
				price: lv1_price,
				probability: lv1_prob,
				category: "career",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "學會一項傳統的技能，將老一輩的智慧傳承下去",
				specialties: false
			},
			{
				_id: "c9",
				price: lv2_price,
				probability: lv2_prob,
				category: "career",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "認真拉業績，榮獲年度最佳業務員",
				specialties: false
			},
			{
				_id: "c10",
				price: lv2_price,
				probability: lv2_prob,
				category: "career",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "成為一個小學老師，用生命影響著生命",
				specialties: false
			},
			{
				_id: "c11",
				price: lv2_price,
				probability: lv2_prob,
				category: "career",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "達成小時候夢想，開了一間漫畫書店",
				specialties: false
			},
			{
				_id: "c12",
				price: lv2_price,
				probability: lv2_prob,
				category: "career",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "成為行腳節目主持人，玩遍五大洋七大洲",
				specialties: false
			},
			{
				_id: "c13",
				price: lv2_price,
				probability: lv2_prob,
				category: "career",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "參加世界大賞，成為世界第一的麵包師傅",
				specialties: false
			},
			{
				_id: "c14",
				price: lv2_price,
				probability: lv2_prob,
				category: "career",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "放棄年薪百萬，回家鄉務農種水果",
				specialties: false
			},
			{
				_id: "c15",
				price: lv3_price,
				probability: lv3_prob,
				category: "career",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "如願成為一個偏鄉教師，作為一份志業",
				specialties: false
			},
			{
				_id: "c16",
				price: lv3_price,
				probability: lv3_prob,
				category: "career",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "如願成為一個偏鄉教師，作為一份志業",
				specialties: false
			},
			{
				_id: "c17",
				price: lv3_price,
				probability: lv3_prob,
				category: "career",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "樂團登上跨年音樂會表演",
				specialties: false
			},
			{
				_id: "c18",
				price: lv3_price,
				probability: lv3_prob,
				category: "career",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "回饋資金予母校，建造一棟以自己為名的大樓",
				specialties: false
			},
			{
				_id: "c19",
				price: lv4_price,
				probability: lv4_prob,
				category: "career",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv4_interest,
				content: "高價收購自己有興趣的新創公司",
				specialties: false
			},
			{
				_id: "c20",
				price: lv4_price,
				probability: lv4_prob,
				category: "career",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv4_interest,
				content: "成功開發新技術，成為業界先驅",
				specialties: false
			}
		],
		learning: [
			{
				_id: "b1",
				price: lv1_price,
				probability: lv1_prob,
				category: "learning",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "日文小考100分",
				specialties: false
			},
			{
				_id: "b2",
				price: lv1_price,
				probability: lv1_prob,
				category: "learning",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "被老師要求背完出師表",
				specialties: false
			},
			{
				_id: "b3",
				price: lv1_price,
				probability: lv1_prob,
				category: "learning",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "國中畢業獲得市長獎",
				specialties: false
			},
			{
				_id: "b4",
				price: lv1_price,
				probability: lv1_prob,
				category: "learning",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "全國科展獲優等獎",
				specialties: false
			},
			{
				_id: "b5",
				price: lv1_price,
				probability: lv1_prob,
				category: "learning",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "在補習班擔任輔導老師，為學生解惑",
				specialties: false
			},
			{
				_id: "b6",
				price: lv1_price,
				probability: lv1_prob,
				category: "learning",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "高中獲得全校第一名",
				specialties: false
			},
			{
				_id: "b7",
				price: lv1_price,
				probability: lv1_prob,
				category: "learning",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "大四沒上課還是輕鬆歐趴",
				specialties: false
			},
			{
				_id: "b8",
				price: lv1_price,
				probability: lv1_prob,
				category: "learning",
				level: 1,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv1_interest,
				content: "為了第一志願，閉關重考一年",
				specialties: false
			},
			{
				_id: "b9",
				price: lv2_price,
				probability: lv2_prob,
				category: "learning",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "榮獲傑出青年獎",
				specialties: false
			},
			{
				_id: "b10",
				price: lv2_price,
				probability: lv2_prob,
				category: "learning",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "努力一學期，順利得到書卷獎",
				specialties: false
			},
			{
				_id: "b11",
				price: lv2_price,
				probability: lv2_prob,
				category: "learning",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "活到老學到老，參加社區大學課程",
				specialties: false
			},
			{
				_id: "b12",
				price: lv2_price,
				probability: lv2_prob,
				category: "learning",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "黑客松最佳概念獎",
				specialties: false
			},
			{
				_id: "b13",
				price: lv2_price,
				probability: lv2_prob,
				category: "learning",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "和同學組隊參與旅遊企劃比賽，得到第一名",
				specialties: false
			},
			{
				_id: "b14",
				price: lv2_price,
				probability: lv2_prob,
				category: "learning",
				level: 2,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv2_interest,
				content: "獲得雙修學歷",
				specialties: false
			},
			{
				_id: "b15",
				price: lv3_price,
				probability: lv3_prob,
				category: "learning",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "參加論文比賽，成功申請獎學金",
				specialties: false
			},
			{
				_id: "b16",
				price: lv3_price,
				probability: lv3_prob,
				category: "learning",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "離鄉背井遠赴美國攻取博士學歷",
				specialties: false
			},
			{
				_id: "b17",
				price: lv3_price,
				probability: lv3_prob,
				category: "learning",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "考取專業領域執照",
				specialties: false
			},
			{
				_id: "b18",
				price: lv3_price,
				probability: lv3_prob,
				category: "learning",
				level: 3,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv3_interest,
				content: "辛苦的修完一堂獲益良多的好課",
				specialties: false
			},
			{
				_id: "b19",
				price: lv4_price,
				probability: lv4_prob,
				category: "learning",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv4_interest,
				content: "獲得諾貝爾獎",
				specialties: false
			},
			{
				_id: "b20",
				price: lv4_price,
				probability: lv4_prob,
				category: "learning",
				level: 4,
				owner: {
					name: -1,
					_id: -1
				},
				interest: lv4_interest,
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
	price: lv1_price,
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