const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require('method-override');
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
app.use(methodOverride('_method'));

app.get('/', async (req,res)=>{
    const images = await Image.find()

    res.status(200).render("index",{
        images
    })
})

app.get('/add',async (req,res)=>{
    res.status(200).render("add")
})
app.get('/edit/:id', async (req,res)=>{

    const image = await Image.findOne({_id:req.params.id})

    res.status(200).render("edit",{
        image
    })
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
app.put("/images/:id", async(req,res)=>{
    const image = await Image.findOne({_id:req.params.id});
    
    image.title = req.body.title
    image.description = req.body.description
    image.save()

    res.status(200).redirect(`/`)
})


const port = 3000

app.listen(port,()=>{
    console.log(`Sunucu ${port} başlatıldı.`)
})