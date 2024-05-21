const express = require('express');
const cors = require('cors');
const fs = require('fs');
const http = require('http')
const {Server} = require('socket.io')
const {cleanHostList, cleanScoresList} = require('./utils/cleanData')
const { insertHotlistItem } = require('./config/mysql');
const dayjs = require('./utils/day');
const cron = require('node-cron')
const {getHotLists,getScoresLists} = require("./api/getDate");
const _redis = require('./config/redis')
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // 允许跨域请求的源
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

let hot = []
let scores = []
app.use(cors());

/*
* 服务器中获取数据
* */
async function fetchList() {
    try {
        getHotLists('69605313209').then((res)=>{
            if (res.ranks) {
                hot = cleanHostList(res.ranks)
                io.emit("updateData", hot);
            }
        })

        getScoresLists().then((res)=>{
            if (res.ranks){
                scores = cleanScoresList(res.ranks)
                io.emit("rankList", scores);
            }
        })

    }catch (error){
        console.error('Error fetching data:', error);
    }

}

/*
* 将数据存入redis
* */
const task = async () => {
    try {
        await _redis.set(`hot:${dayjs().tz('Asia/Shanghai').format("YYYYMMDDHH")}`, hot);
        await _redis.set(`scores:${dayjs().tz('Asia/Shanghai').format("YYYYMMDDHH")}`, scores);
        await insertHotlistItem(new Date().getTime(),`hot:${dayjs().tz('Asia/Shanghai').format("YYYYMMDDHH")}`,hot,scores);
    }catch (e){
        console.log(e)
    }
}

cron.schedule('55 59 * * * *', task);

setInterval(fetchList, 8000)

// app.get('/api/set/:value', async (req, res) => {
//     const key = req.params.value
//     await _redis.set(`hot:${key}`,key)
//     res.send(key)
// })

app.get('/api/hot/:date', async (req, res) => {
    const key = req.params.date
    // console.log(key)
    const data = await _redis.get(`hot:${key}`)
    res.send(data)
})
app.get('/api/scores/:date', async (req, res) => {
    const key = req.params.date
    console.log(key)
    const data = await _redis.get(`scores:${key}`)
    res.send(data)
})
app.get('/api/hostList', async (req, res) => {
    res.send(hot)
});
app.get('/api/scoresList', async (req, res) => {
    res.send(scores)
});


server.listen(3000, () => {
    console.log('running on port 3000...');
})

