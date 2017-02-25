var express = require('express')
var multer = require('multer')
var router = express.Router()
var jsonQuery = require('json-query')
var storage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, './uploads')
  },
  filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now())
    }
})
var upload = multer({storage:storage}).single('userPhoto')
var data = {
  tags:[
    {id: 'coffee', src: 'media/coffee.gif', blurb: 'Be right back! Caffeine replenishment in progress.', bgColor: 'rgb(45, 164, 168)', textColor: 'rgb(255, 184, 90)'},
    {id: 'meeting', src: 'media/meeting.gif', blurb: 'Be right back! Promoting synergy.', bgColor: 'rgb(255, 255, 255)', textColor: 'rgb(172, 207, 223)'},
    {id: 'pizza', src: 'media/pizza.gif', blurb: 'Be right back! Because Pizza.', bgColor: 'rgb(38, 134, 236)', textColor: 'rgb(241, 249, 255)'},
    {id: 'bathroom', src: 'media/bathroom.gif', blurb: 'Be right back! Nature calls.', bgColor: 'rgb(255, 255, 255)', textColor: 'rgb(165, 165, 165)'},
    {id: 'lunch', src: 'media/lunch.gif', blurb: 'Be right back! Grabbing a bite to eat.', bgColor: 'rgb(0, 121, 118)', textColor: 'rgb(233, 183, 84)'},
    {id: 'brb', src: 'media/brb.gif', blurb: 'Be right back!', bgColor: 'rgb(255, 255, 255)', textColor: 'rgb(54, 166, 195)'}
  ]
}
router.get('/', function(req,res){
  res.render('index')
})
router.get('/:tag', function(req, res){
  let tag = req.params.tag
  let tagData = jsonQuery('tags[id='+tag+']',{data:data})
  if(tagData.value){
    res.render('tag', {tag: tagData.value})
    // console.log("exists")
  }
  else{
      res.render('custom')
    // console.log("dne")
  }
})
router.post('/upload', function(req,res){
  upload(req,res,function(err){
    if(err){
      res.status(500).end("Something broke!")
    }
    // console.log(res.req.file.filename)
    res.end("File uploaded successfully.")
  })
})

module.exports = router
