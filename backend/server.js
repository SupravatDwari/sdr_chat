import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import express from 'express';
import Pusher from 'pusher';
import cors from 'cors';

// app config
const app = express();
const port = process.env.port || 9000

const pusher = new Pusher({
    appId: "1463994",
    key: "7da666a5395da63c7ffd",
    secret: "579e1c19861e4207d0af",
    cluster: "mt1",
    useTLS: true
  });

// middleware
app.use(express.json());
app.use(cors());
// DB config

const connection_url = "mongodb+srv://supravat:tocopherol@cluster0.lhl8spt.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connection_url,{

    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;

db.once('open', () => {
    console.log("DB connected");


//collection
const msgCollection = db.collection("messagecontents");
const changeStream = msgCollection.watch();

changeStream.on('change',(change)=>{
    // console.log("A change occured", change);

    if (change.operationType === "insert") {
        const messageDetails = change.fullDocument;
        pusher.trigger("messages", "inserted",
        {
            name: messageDetails.name,
            message: messageDetails.message,
            timestamp: messageDetails.timestamp,
            received: messageDetails.received,
        });
    } else {
    //    console.log("Error triggering pusher");          
    }
 });
});

// api routes

app.get("/", (req,res) => res.status(200).send('hello world'));

app.get('/messages/sync', (req,res) =>{
    Messages.find( (err,data) =>{
        if (err) {
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data);
        }
    })
})
app.post('/messages/new', (req,res) =>{
    const dbMessage = req.body

    Messages.create(dbMessage , (err,data) =>{
        if (err) {
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data);
        }
    })
})


// listen
app.listen(port, ()=>{
//    console.log(`Listening on localhost:  ${port}`)
})