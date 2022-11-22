require('dotenv').config();
const {
  RtcTokenBuilder,
  RtmTokenBuilder,
  RtcRole,
  RtmRole,
} = require('agora-access-token');

const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());

const appId = process.env.APP_ID;
const appCertificate = process.env.APP_CERTIFICATE;


express.json();
express.urlencoded({ extended: true });


app.get('/rtc/:channelName/:role/:uid/?expiry=expireTime', async (req, res) => {
  const { channelName, role, uid, expireTime } = req.params || req.body;

  // console.log(privilegeExpiredTs);

  const tokenA = await RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    expireTime
  );
  // console.log(tokenA);
  return res.status(200).json({ rtcToken: tokenA });
});

app.listen(port, () => {
  console.log(`Server token listening on port ${port}`);
});
