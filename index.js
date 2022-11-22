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
// const channelName = 'abc';
// const uid = 1;
// const role = RtcRole.PUBLISHER;
// const expirationTimeInSeconds = 3600;
// const currentTimestamp = Math.floor(Date.now() / 1000);
// const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
// Build token with uid

express.json();
express.urlencoded({ extended: true });

const expirationTimeInSeconds = 3600;
const currentTimestamp = Math.floor(Date.now() / 1000);
const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

app.get('/rtc/:channelName/:role/:uid', async (req, res) => {
  const { channelName, role, uid } = req.params || req.body;

  // console.log(privilegeExpiredTs);

  const tokenA = await RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );
  // console.log(tokenA);
  return res.status(200).json({ rtcToken: tokenA });
});

app.listen(port, () => {
  console.log(`Server token listening on port ${port}`);
});
