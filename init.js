const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main()
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");

  let chats = [
    {
      from: "Anurag",
      to: "Simran",
      msg: "Hello , Bob bsdk !",
      created_at: new Date()
    },
    {
      from: "Anurag",
      to: "Pratham",
      msg: "Hello Bhai !!",
      created_at: new Date()
    }
  ];

  await Chat.insertMany(chats);
  console.log("Chats inserted");

}
