const func = require('../index');

const output2 = {
  id: 5,
  img: 'https://unsplash.it/300/300?image=868',
  title: '城市幻影2',
  desc: '如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感',
  price: 300,
};

const output3 = [{
  id: 1,
  img: 'https://unsplash.it/300/300?image=946',
  title: '美好時光1',
  desc: '追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律',
  price: 200,
  discount: true,
},
{
  id: 2,
  img: 'https://unsplash.it/300/300?image=944',
  title: '美好時光2',
  desc: '追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律',
  price: 300,
},
{
  id: 3,
  img: 'https://unsplash.it/300/300?image=882',
  title: '美好時光3',
  desc: '追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律',
  price: 400,
}];

const output4 = [{
  id: 1,
  img: 'https://unsplash.it/300/300?image=946',
  title: '美好時光1',
  desc: '追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律',
  price: 200,
  discount: true,
},
{
  id: 2,
  img: 'https://unsplash.it/300/300?image=944',
  title: '美好時光2',
  desc: '追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律',
  price: 300,
},
{
  id: 3,
  img: 'https://unsplash.it/300/300?image=882',
  title: '美好時光3',
  desc: '追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律',
  price: 400,
},
{
  id: 4,
  img: 'https://unsplash.it/300/300?image=874',
  title: '城市幻影1',
  desc: '如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感',
  price: 250,
  discount: true,
},
{
  id: 5,
  img: 'https://unsplash.it/300/300?image=868',
  title: '城市幻影2',
  desc: '如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感',
  price: 300,
},
{
  id: 6,
  img: 'https://unsplash.it/300/300?image=953',
  title: '城市幻影3',
  desc: '如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感',
  price: 350,
},
{
  id: 7,
  img: 'https://unsplash.it/300/300?image=1053',
  title: '香草生活1',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 200,
  discount: true,
},
{
  id: 8,
  img: 'https://unsplash.it/300/300?image=940',
  title: '香草生活1',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 400,
},
{
  id: 9,
  img: 'https://unsplash.it/300/300?image=798',
  title: '香草生活2',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 600,
},
{
  id: 10,
  img: 'https://unsplash.it/300/300?image=1056',
  title: '香草生活3',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 800,
},
{
  id: 99, img: 'xxx', title: 'xxx', desc: 'xxx', price: 100,
},
{
  id: 11,
  img: 'https://unsplash.it/300/300?image=785',
  title: 'Spa Life',
  desc: '精選3000首100％spa音樂, 在人們回歸自然本質的風氣之下，生活更渴望也強調與大自然接近、與花草為伍。「SPA」乃源自於拉丁文的Solus Par Aqua',
  price: 2659,
},
{
  id: 12,
  img: 'https://unsplash.it/300/300?image=786',
  title: 'long travel 長途旅遊',
  desc: '抓緊夏天的尾巴，各大音樂祭也隨著天氣陸續登場。精心挑選 10 首適合長途旅行聆聽的歌曲，不管你開車、坐車、騎腳踏車，就是要讓好音樂陪伴你的好心情。',
  price: 500,
},
{
  id: 13,
  img: 'https://unsplash.it/300/300?image=773',
  title: 'BACK TO THE EARTH',
  desc: '整首歌用烏克麗麗作為基調，讓歌曲蔓延著南洋視覺，讓整顆心都沉澱了下來，若搭配前方的海景，適合一個人的海邊午後下午茶或是夫妻情侶在岸邊泡著腳時聆聽。',
  price: 450,
},
{
  id: 14,
  img: 'https://unsplash.it/300/300?image=662',
  title: '地下樂團',
  desc: '快點來加入台灣獨立樂團的無底坑吧！有著各式各樣不同的曲風、創作模式，但共同點就是這些獨立樂團們可是有著大把大把的好歌等著你來聽',
  price: 300,
  discount: true,
}];

const output5 = [{
  id: 1,
  img: 'https://unsplash.it/300/300?image=946',
  title: '美好時光1',
  desc: '追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律',
  price: 200,
  discount: true,
},
{
  id: 2,
  img: 'https://unsplash.it/300/300?image=944',
  title: '美好時光2',
  desc: '追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律',
  price: 300,
},
{
  id: 3,
  img: 'https://unsplash.it/300/300?image=882',
  title: '修改title',
  desc: '修改desc',
  price: 400,
},
{
  id: 4,
  img: 'https://unsplash.it/300/300?image=874',
  title: '城市幻影1',
  desc: '如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感',
  price: 250,
  discount: true,
},
{
  id: 5,
  img: 'https://unsplash.it/300/300?image=868',
  title: '城市幻影2',
  desc: '如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感',
  price: 300,
},
{
  id: 6,
  img: 'https://unsplash.it/300/300?image=953',
  title: '城市幻影3',
  desc: '如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感',
  price: 350,
},
{
  id: 7,
  img: 'https://unsplash.it/300/300?image=1053',
  title: '香草生活1',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 200,
  discount: true,
},
{
  id: 8,
  img: 'https://unsplash.it/300/300?image=940',
  title: '香草生活1',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 400,
},
{
  id: 9,
  img: 'https://unsplash.it/300/300?image=798',
  title: '香草生活2',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 600,
},
{
  id: 10,
  img: 'https://unsplash.it/300/300?image=1056',
  title: '香草生活3',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 800,
},
{
  id: 11,
  img: 'https://unsplash.it/300/300?image=785',
  title: 'Spa Life',
  desc: '精選3000首100％spa音樂, 在人們回歸自然本質的風氣之下，生活更渴望也強調與大自然接近、與花草為伍。「SPA」乃源自於拉丁文的Solus Par Aqua',
  price: 2659,
},
{
  id: 12,
  img: 'https://unsplash.it/300/300?image=786',
  title: 'long travel 長途旅遊',
  desc: '抓緊夏天的尾巴，各大音樂祭也隨著天氣陸續登場。精心挑選 10 首適合長途旅行聆聽的歌曲，不管你開車、坐車、騎腳踏車，就是要讓好音樂陪伴你的好心情。',
  price: 500,
},
{
  id: 13,
  img: 'https://unsplash.it/300/300?image=773',
  title: 'BACK TO THE EARTH',
  desc: '整首歌用烏克麗麗作為基調，讓歌曲蔓延著南洋視覺，讓整顆心都沉澱了下來，若搭配前方的海景，適合一個人的海邊午後下午茶或是夫妻情侶在岸邊泡著腳時聆聽。',
  price: 450,
},
{
  id: 14,
  img: 'https://unsplash.it/300/300?image=662',
  title: '地下樂團',
  desc: '快點來加入台灣獨立樂團的無底坑吧！有著各式各樣不同的曲風、創作模式，但共同點就是這些獨立樂團們可是有著大把大把的好歌等著你來聽',
  price: 300,
  discount: true,
}];

const output6 = [{
  id: 1,
  img: 'https://unsplash.it/300/300?image=946',
  title: '美好時光1',
  desc: '追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律',
  price: 200,
  discount: true,
},
{
  id: 2,
  img: 'https://unsplash.it/300/300?image=944',
  title: '美好時光2',
  desc: '追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律',
  price: 300,
},
{
  id: 3,
  img: 'https://unsplash.it/300/300?image=882',
  title: '美好時光3',
  desc: '追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律',
  price: 400,
},
{
  id: 4,
  img: 'https://unsplash.it/300/300?image=874',
  title: '城市幻影1',
  desc: '如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感',
  price: 250,
  discount: true,
},
{
  id: 6,
  img: 'https://unsplash.it/300/300?image=953',
  title: '城市幻影3',
  desc: '如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感',
  price: 350,
},
{
  id: 7,
  img: 'https://unsplash.it/300/300?image=1053',
  title: '香草生活1',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 200,
  discount: true,
},
{
  id: 8,
  img: 'https://unsplash.it/300/300?image=940',
  title: '香草生活1',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 400,
},
{
  id: 9,
  img: 'https://unsplash.it/300/300?image=798',
  title: '香草生活2',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 600,
},
{
  id: 10,
  img: 'https://unsplash.it/300/300?image=1056',
  title: '香草生活3',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 800,
},
{
  id: 11,
  img: 'https://unsplash.it/300/300?image=785',
  title: 'Spa Life',
  desc: '精選3000首100％spa音樂, 在人們回歸自然本質的風氣之下，生活更渴望也強調與大自然接近、與花草為伍。「SPA」乃源自於拉丁文的Solus Par Aqua',
  price: 2659,
},
{
  id: 12,
  img: 'https://unsplash.it/300/300?image=786',
  title: 'long travel 長途旅遊',
  desc: '抓緊夏天的尾巴，各大音樂祭也隨著天氣陸續登場。精心挑選 10 首適合長途旅行聆聽的歌曲，不管你開車、坐車、騎腳踏車，就是要讓好音樂陪伴你的好心情。',
  price: 500,
},
{
  id: 13,
  img: 'https://unsplash.it/300/300?image=773',
  title: 'BACK TO THE EARTH',
  desc: '整首歌用烏克麗麗作為基調，讓歌曲蔓延著南洋視覺，讓整顆心都沉澱了下來，若搭配前方的海景，適合一個人的海邊午後下午茶或是夫妻情侶在岸邊泡著腳時聆聽。',
  price: 450,
},
{
  id: 14,
  img: 'https://unsplash.it/300/300?image=662',
  title: '地下樂團',
  desc: '快點來加入台灣獨立樂團的無底坑吧！有著各式各樣不同的曲風、創作模式，但共同點就是這些獨立樂團們可是有著大把大把的好歌等著你來聽',
  price: 300,
  discount: true,
}];

const outputAsc7 = [{
  id: 1,
  img: 'https://unsplash.it/300/300?image=946',
  title: '美好時光1',
  desc: '追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律',
  price: 200,
  discount: true,
},
{
  id: 7,
  img: 'https://unsplash.it/300/300?image=1053',
  title: '香草生活1',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 200,
  discount: true,
},
{
  id: 4,
  img: 'https://unsplash.it/300/300?image=874',
  title: '城市幻影1',
  desc: '如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感',
  price: 250,
  discount: true,
},
{
  id: 2,
  img: 'https://unsplash.it/300/300?image=944',
  title: '美好時光2',
  desc: '追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律',
  price: 300,
},
{
  id: 5,
  img: 'https://unsplash.it/300/300?image=868',
  title: '城市幻影2',
  desc: '如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感',
  price: 300,
},
{
  id: 14,
  img: 'https://unsplash.it/300/300?image=662',
  title: '地下樂團',
  desc: '快點來加入台灣獨立樂團的無底坑吧！有著各式各樣不同的曲風、創作模式，但共同點就是這些獨立樂團們可是有著大把大把的好歌等著你來聽',
  price: 300,
  discount: true,
},
{
  id: 6,
  img: 'https://unsplash.it/300/300?image=953',
  title: '城市幻影3',
  desc: '如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感',
  price: 350,
},
{
  id: 3,
  img: 'https://unsplash.it/300/300?image=882',
  title: '美好時光3',
  desc: '追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律',
  price: 400,
},
{
  id: 8,
  img: 'https://unsplash.it/300/300?image=940',
  title: '香草生活1',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 400,
},
{
  id: 13,
  img: 'https://unsplash.it/300/300?image=773',
  title: 'BACK TO THE EARTH',
  desc: '整首歌用烏克麗麗作為基調，讓歌曲蔓延著南洋視覺，讓整顆心都沉澱了下來，若搭配前方的海景，適合一個人的海邊午後下午茶或是夫妻情侶在岸邊泡著腳時聆聽。',
  price: 450,
},
{
  id: 12,
  img: 'https://unsplash.it/300/300?image=786',
  title: 'long travel 長途旅遊',
  desc: '抓緊夏天的尾巴，各大音樂祭也隨著天氣陸續登場。精心挑選 10 首適合長途旅行聆聽的歌曲，不管你開車、坐車、騎腳踏車，就是要讓好音樂陪伴你的好心情。',
  price: 500,
},
{
  id: 9,
  img: 'https://unsplash.it/300/300?image=798',
  title: '香草生活2',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 600,
},
{
  id: 10,
  img: 'https://unsplash.it/300/300?image=1056',
  title: '香草生活3',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 800,
},
{
  id: 11,
  img: 'https://unsplash.it/300/300?image=785',
  title: 'Spa Life',
  desc: '精選3000首100％spa音樂, 在人們回歸自然本質的風氣之下，生活更渴望也強調與大自然接近、與花草為伍。「SPA」乃源自於拉丁文的Solus Par Aqua',
  price: 2659,
}];

const outputDesc7 = [{
  id: 11,
  img: 'https://unsplash.it/300/300?image=785',
  title: 'Spa Life',
  desc: '精選3000首100％spa音樂, 在人們回歸自然本質的風氣之下，生活更渴望也強調與大自然接近、與花草為伍。「SPA」乃源自於拉丁文的Solus Par Aqua',
  price: 2659,
},
{
  id: 10,
  img: 'https://unsplash.it/300/300?image=1056',
  title: '香草生活3',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 800,
},
{
  id: 9,
  img: 'https://unsplash.it/300/300?image=798',
  title: '香草生活2',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 600,
},
{
  id: 12,
  img: 'https://unsplash.it/300/300?image=786',
  title: 'long travel 長途旅遊',
  desc: '抓緊夏天的尾巴，各大音樂祭也隨著天氣陸續登場。精心挑選 10 首適合長途旅行聆聽的歌曲，不管你開車、坐車、騎腳踏車，就是要讓好音樂陪伴你的好心情。',
  price: 500,
},
{
  id: 13,
  img: 'https://unsplash.it/300/300?image=773',
  title: 'BACK TO THE EARTH',
  desc: '整首歌用烏克麗麗作為基調，讓歌曲蔓延著南洋視覺，讓整顆心都沉澱了下來，若搭配前方的海景，適合一個人的海邊午後下午茶或是夫妻情侶在岸邊泡著腳時聆聽。',
  price: 450,
},
{
  id: 8,
  img: 'https://unsplash.it/300/300?image=940',
  title: '香草生活1',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 400,
},
{
  id: 3,
  img: 'https://unsplash.it/300/300?image=882',
  title: '美好時光3',
  desc: '追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律',
  price: 400,
},
{
  id: 6,
  img: 'https://unsplash.it/300/300?image=953',
  title: '城市幻影3',
  desc: '如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感',
  price: 350,
},
{
  id: 5,
  img: 'https://unsplash.it/300/300?image=868',
  title: '城市幻影2',
  desc: '如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感',
  price: 300,
},
{
  id: 2,
  img: 'https://unsplash.it/300/300?image=944',
  title: '美好時光2',
  desc: '追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律',
  price: 300,
},
{
  id: 14,
  img: 'https://unsplash.it/300/300?image=662',
  title: '地下樂團',
  desc: '快點來加入台灣獨立樂團的無底坑吧！有著各式各樣不同的曲風、創作模式，但共同點就是這些獨立樂團們可是有著大把大把的好歌等著你來聽',
  price: 300,
  discount: true,
},
{
  id: 4,
  img: 'https://unsplash.it/300/300?image=874',
  title: '城市幻影1',
  desc: '如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感',
  price: 250,
  discount: true,
},
{
  id: 7,
  img: 'https://unsplash.it/300/300?image=1053',
  title: '香草生活1',
  desc: '讓生命......自然伸展, 百分之百 純天然創作, 散發玫瑰、薰衣草、甜橙與波斯菊的音樂香氛',
  price: 200,
  discount: true,
},
{
  id: 1,
  img: 'https://unsplash.it/300/300?image=946',
  title: '美好時光1',
  desc: '追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律',
  price: 200,
  discount: true,
}];


/** func1 cloneArray */
test('cloneArray(): input 陣列', () => {
  expect(func.cloneArray([1, 2, 3])).toMatchObject([1, 2, 3]);
});

test('cloneArray(): input 字串', () => {
  expect(func.cloneArray('abc')).toBeNull();
});


/** func2 searchId */
test('searchId(): input 5', async () => {
  expect.assertions(1);
  await expect(func.searchId(5)).resolves.toMatchObject(output2);
});

test('searchId(): input 字串', async () => {
  expect.assertions(1);
  await expect(func.searchId('5')).resolves.toBeNull();
});

test('searchId(): input 0', async () => {
  expect.assertions(1);
  await expect(func.searchId(0)).resolves.toBeNull();
});

test('searchId(): input 100', async () => {
  expect.assertions(1);
  await expect(func.searchId(100)).resolves.toBe(undefined);
});


/** func3 searchTitle */
test('searchTitle(): input 字串', async () => {
  expect.assertions(1);
  await expect(func.searchTitle('美好')).resolves.toMatchObject(output3);
});

test('searchTitle(): input 非字串', async () => {
  expect.assertions(1);
  await expect(func.searchTitle(123)).resolves.toBeNull();
});


/** func4 insertData */
const inputData4 = {
  id: 99, img: 'xxx', title: 'xxx', desc: 'xxx', price: 100,
};
const inputData41 = {
  img: 'xxx', title: 'xxx', desc: 'xxx', price: 100,
};
const inputData42 = {
  id: 99, title: 'xxx', desc: 'xxx', price: 100,
};
const inputData43 = {
  id: 99, img: 'xxx', desc: 'xxx', price: 100,
};
const inputData44 = {
  id: 99, img: 'xxx', title: 'xxx', price: 100,
};
const inputData45 = {
  id: 99, img: 'xxx', title: 'xxx', desc: 'xxx',
};

test('insertData(): input Object', async () => {
  expect.assertions(1);
  await expect(func.insertData(inputData4)).resolves.toMatchObject(output4);
});

test('insertData(): input 非Object', async () => {
  expect.assertions(1);
  await expect(func.insertData('data')).resolves.toBeNull();
});

test('insertData(): input Object少id', async () => {
  expect.assertions(1);
  await expect(func.insertData(inputData41)).resolves.toBeNull();
});

test('insertData(): input Object少img', async () => {
  expect.assertions(1);
  await expect(func.insertData(inputData42)).resolves.toBeNull();
});

test('insertData(): input Object少title', async () => {
  expect.assertions(1);
  await expect(func.insertData(inputData43)).resolves.toBeNull();
});

test('insertData(): input Object少desc', async () => {
  expect.assertions(1);
  await expect(func.insertData(inputData44)).resolves.toBeNull();
});

test('insertData(): input Object少price', async () => {
  expect.assertions(1);
  await expect(func.insertData(inputData45)).resolves.toBeNull();
});


/** func5 updateData */
const inputId5 = 3;
const inputData5 = {
  title: '修改title', desc: '修改desc',
};
const inputData51 = {
  desc: '修改desc',
};
const inputData52 = {
  title: '修改title',
};

test('updateData(): input 數字, Object', async () => {
  expect.assertions(1);
  await expect(func.updateData(inputId5, inputData5)).resolves.toMatchObject(output5);
});

test('updateData(): input 數字, 非Object', async () => {
  expect.assertions(1);
  await expect(func.updateData(inputId5, 'abc')).resolves.toBeNull();
});

test('updateData(): input 非數字, Object', async () => {
  expect.assertions(1);
  await expect(func.updateData('abc', inputData5)).resolves.toBeNull();
});

test('updateData(): input 非數字, Object', async () => {
  expect.assertions(1);
  await expect(func.updateData('3', inputData5)).resolves.toBeNull();
});

test('updateData(): input 數字, Object少title', async () => {
  expect.assertions(1);
  await expect(func.updateData(inputId5, inputData51)).resolves.toBeNull();
});

test('updateData(): input 數字, Object少desc', async () => {
  expect.assertions(1);
  await expect(func.updateData(inputId5, inputData52)).resolves.toBeNull();
});


/** func6 deleteData */
test('deleteData(): input 數字', async () => {
  expect.assertions(1);
  await expect(func.deleteData(5)).resolves.toMatchObject(output6);
});

test('deleteData(): input 非數字', async () => {
  expect.assertions(1);
  await expect(func.deleteData('abc')).resolves.toBeNull();
});

test('deleteData(): input 非數字', async () => {
  expect.assertions(1);
  await expect(func.deleteData('5')).resolves.toBeNull();
});


/** func7 sortByPrice */
test('sortByPrice(): input asc', async () => {
  expect.assertions(1);
  await expect(func.sortByPrice('asc')).resolves.toMatchObject(outputAsc7);
});

test('sortByPrice(): input desc', async () => {
  expect.assertions(1);
  await expect(func.sortByPrice('desc')).resolves.toMatchObject(outputDesc7);
});

test('sortByPrice(): input test', async () => {
  expect.assertions(1);
  await expect(func.sortByPrice('test')).resolves.toBeNull();
});
