const express = require("express")
const bodyParser = require("body-parser")

const app = express()
let items = [ 'Buy Food' , 'Cook Food', 'Eat Food']
let workItems = []

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set("view engine", "ejs")

app.get("/", function(req, res){

    let today = new Date()
    let options ={
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let day = today.toLocaleDateString("en-US", options)
    
    res.render("lists", { listTitle: day , kindofItem: items})
})


app.post("/", function(req, res){
   let item = req.body.newItem
   items.push(item)

   res.redirect("/")
})

app.get("/work", function (req, res) {
    res.render("lists", { listTitle: "Work List", kindofItem: workItems })
})

app.post("/work", function (req, res) {
    let item = req.body.newItem
    workItems.push(item)

    res.redirect('/work')
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000")
})