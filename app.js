const express = require("express")

const app = express()


app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', async (req,res)=>{
    res.status(200).render("index")
})

const port = 3000

app.listen(port,()=>{
    console.log(`Sunucu ${port} başlatıldı.`)
})