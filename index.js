const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

main()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB :', err);
    });

async function main(){

    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}


app.get('/chats' , async (req, res) => {
    
    let allChats = await Chat.find();
    console.log(allChats);
    
    res.render("display.ejs" , {chats : allChats});

});

app.get('/chats/new', (req, res) => {
    
    res.render("add.ejs");
    
});

app.post('/chats', async (req, res) => {
    const { from , to , msg } = req.body;

    const newChat = new Chat({
        from,
        to,
        msg,
        created_at: new Date()
    });

    await newChat.save();
    console.log("Saved Chat:", newChat);

    res.redirect('/chats');
});

app.get('/chats/:id/edit', async (req, res) => {

    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs" , {chat});
    
});

app.put('/chats/:id', async (req, res) => {

    let {id} = req.params;
    const {msg} = req.body;
    
    let updatedChat = await Chat.findByIdAndUpdate(id , {msg}, {new: true});
    res.redirect('/chats');
    
});

app.delete('/chats/:id', async (req, res) => {

    let {id} = req.params;
    await Chat.findByIdAndDelete(id);

    res.redirect('/chats');

});

app.get('/', (req, res) => {

  res.render("home.ejs");

});

app.listen(8080, () => {
    
    console.log('Server is running on http://localhost:8080');
    
});