const express = require("express")
const mongoose = require("mongoose")
const fileUpload = require('express-fileupload');
const fs=require("fs")
const Image = require("./model/Image")

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/agency');



app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(fileUpload());


app.get('/', async (req,res)=>{
    const images = await Image.find()

    res.status(200).render("index",{
        images
    })
})

app.get('/add',async (req,res)=>{
    res.status(200).render("add")
})
app.get('/edit', async (req,res)=>{
    res.status(200).render("edit")
})

app.post('/images', async(req,res)=>{

    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
  
    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads/' + uploadImage.name;

    uploadImage.mv(uploadPath, async ()=>{
        await Image.create({
            ...req.body,
            image: '/uploads/' + uploadImage.name
        })
    })

    res.redirect("/")
})

const port = 3000

app.listen(port,()=>{
    console.log(`Sunucu ${port} başlatıldı.`)
})