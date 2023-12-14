require("dotenv").config();
const md5 = require("md5");
const {
  RtcTokenBuilder,
  RtmTokenBuilder,
  RtcRole,
  RtmRole,
} = require("agora-access-token");

const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

const appId = process.env.APP_ID;
const appCertificate = process.env.APP_CERTIFICATE;

express.json();
express.urlencoded({ extended: true });

app.get("/rtc/:channelName/:role/uid/:uid", async (req, res) => {
  const { channelName, role, uid } = req.params || req.body;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  const channel = md5(channelName);

  const tokenA = await RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channel,
    uid,
    role,
    privilegeExpiredTs
  );
  // console.log(tokenA);
  return res.status(200).json({ rtcToken: tokenA, channelCall: channel });
});

app.listen(port, () => {
  console.log(`Server token listening on port ${port}`);
});
