var express = require('express');
var router = express.Router();

const Memobird = require('memobird');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: '小朋友的网页打印测试',
  	//numa: 0,
    //sum: 0
    content:'在这输入内容',
    isprint: "准备"
  });
});
 
router.post('/', function (req, res) {
	//console.log("接收:", req.body.num1, req.body.num2);
	//var sum = parseFloat(req.body.num1);
	
  var text = req.body.content;
  var printer = req.body.printers;
  if (printer == "xx")
    var id = '51f5d5fead29900c'
  else
    var id = 'e5929140966fe0dd'
  
  const memobird = new Memobird({
  ak: '3e5267f54d97444dbbbf21f3a76d1172',
  memobirdID: id,
  useridentifying: 'Web',
  });
  var flag = -1;
  memobird.init()
  .then(() => memobird.printText(text))
  .then(printcontentid => memobird.glance(printcontentid, 3000))
  .then(printflag => {console.log('打印状态:', printflag === 1 ? '已打印' : '未打印'); flag = printflag})
  
  console.log(text + " to " + printer + " ID " + id + flag);
  
  if (flag == 1)
    isprint = "已打印";
  else
    isprint = "未打印";

  res.render('index', { 
  	title: '小朋友的网页打印测试',
		content: req.body.content,
		isprint: isprint
  });
});
	
module.exports = router;
