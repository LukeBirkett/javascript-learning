const http = require('http');

const server = http.createServer((req,res) => {
    res.writeHead(200,{'content-type':'text/html'})
    res.write('<h1>home page</h1>')
    res.end()
});

server.listen(4999);

// test

// const express = require('express')
// const path = require('path')
// const app = express()

// app.use(express.static('./public'))

// // app.get('/', (req,res)=>{
// //     res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
// // })

// app.get('*', (req,res)=>{
//     console.log('not found');
//     res.status(404).send('page not found')
// })

// app.listen(2500, () => {
//     console.log('server is listening on 2500');
// })