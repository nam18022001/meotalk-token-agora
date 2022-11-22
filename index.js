
require("dotenv").config()
const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')

const express = require("express")
const cors = require("cors");

const app = express()
const port = 3001

app.use(cors())

const appId = 'be62961e14ee432ea0edc38b988b6ee3';
const appCertificate = 'b4657d2926204606921c41982b632826';
const channelName = 'abc';
const uid = 1;
const role = RtcRole.PUBLISHER;
const expirationTimeInSeconds = 3600
const currentTimestamp = Math.floor(Date.now() / 1000)
const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
// Build token with uid

express.json()
express.urlencoded({extended: true})

// const generationToken = ()=> {
//     const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);
// }

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
app.get("/token", async(req, res) => {
     const tokenA = await RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);
       return res.status(200).json({rtcToken: tokenA })
    console.log(tokenA)
    
})
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


// console.log("Token with integer number Uid: " + tokenA);
