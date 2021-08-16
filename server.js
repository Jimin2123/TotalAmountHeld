const express = require('express');
const http = require('http');
const path = require('path')

const app = new express();
const server = http.createServer(app);
const bodyParser = require('body-parser');

const api_token = require('./API/user');
const {query} = require('./DB');



//템플릿 엔진 설정
app.set('views', path.join(__dirname));
app.set('view engine', 'ejs');

//미들웨어 설정
app.use(express.static(path.join(__dirname, 'public')));
//post body parse
app.use(bodyParser.urlencoded({limit:'1mb',extended:true}));
app.use(bodyParser.json({limit:'1mb'}));

app.get('/', (req, res) => {
  res.render('main');
});

app.post('/upload', (req,res) => {
  const data = req.body;
  api_token(data.data).then(item => {
    res.send(item);
  }).catch(err => console.log(err));
});

app.get('/tid', async (req,res) => {
  const sql = 'SELECT tid FROM userToken GROUP BY tid';
  const tid = await query(sql);

  res.send(tid);
});

app.get('/data', async (req,res) => {
  const data = req.query;
  const sql = 'SELECT tk.userID,ti.tokenID,tk.tokenAddress,tk.amountHeld FROM `userToken` tk, `tokenInfo` ti' 
    + ' WHERE ti.tokenAddress = tk.tokenAddress AND tk.tid = ? ORDER BY tk.userID,ti.tokenID'
  const userToken = await query(sql,[data.tid]);

  res.send(userToken)
});


//새로고침 하였을때 발생되는 오류.
app.get('/*', (req, res) =>{
  res.render('main');
});

server.listen(9090, ()=>{
  console.log("서버가 9090포트에서 구동중입니다.");
});