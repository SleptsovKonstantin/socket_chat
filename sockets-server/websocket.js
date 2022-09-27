const ws = require('ws')

const wss = new ws.Server({
    port: 5000,
}, () => console.log('Server started on 5000 port'))

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        try{
            console.log('message', message)
            message = JSON.parse(message);
            console.log('message', message)
            switch (message.event) {
                case 'message':
                    broadcastMessage(message)
                    break;
                case 'connection':
                    broadcastMessage(message)
                    break;
            }
        } catch(e) {
           console.log(`errrrroooor:   ${e}`)
        }

    })
})

const broadcastMessage = (message) => {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}
