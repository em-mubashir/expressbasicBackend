
const express = require("express");
const body_parser = require("body-parser");
const path = require("path");

const app = express();
app.use(
  body_parser.urlencoded({
    extended: true,
  })
);
app.use(express.json());


let jsonData = {
  DeviceType:"Stool Solarlampv2",
  Serial:"012019:001",
  FirmwareVersion: "v1.1.15",
  LampName:"Stool",
  PoweredOn: false,
  BrightnessLevel: 0,
  Loading: false,
  ChargingLevel: 0,
  BatteryLevel: 0,
}

const port = process.env.PORT || "9000";
app.get("/poweron", (req, res) => {
  jsonData.BrightnessLevel= 50;
  jsonData.PoweredOn = true;
  let configs = {
    "action": "poweron",
    "ack": "true",
    "BrightnessLevel":jsonData.BrightnessLevel,
  }
  res.status(200).json({ configs });
});
app.post("/params", (req, res) => {
Object.keys(req.body).map((item)=>{
  if(item==='LampName'){
     jsonData.LampName = req.body[item]
  }
  if(item==='BrightnessLevel'){
    jsonData.BrightnessLevel = req.body[item]
  }
  if(item==='DeviceType'){
    jsonData.DeviceType = req.body[item]
  }
  if(item==='Serial'){
    jsonData.Serial = req.body[item]
  }
  if(item==='FirmwareVersion'){
    jsonData.FirmwareVersion = req.body[item]
  }
  if(item==='PoweredOn'){
    jsonData.PoweredOn = req.body[item]
  }
  if(item==='ChargingLevel'){
    jsonData.ChargingLevel = req.body[item]
  }
  if(item==='BatteryLevel'){
    jsonData.BatteryLevel = req.body[item]
  }
  // if(req.body[item]==='')
})
  let configs = {
    "action": "setparameter",
    "LampName": jsonData.LampName,
    "DeviceType":jsonData.DeviceType,
    "Serial":jsonData.Serial,
    "FirmwareVersion": jsonData.FirmwareVersion,
    "PoweredOn": jsonData.PoweredOn,
    "BrightnessLevel": jsonData.BrightnessLevel,
    "ChargingLevel": jsonData.ChargingLevel,
    "ack": true,
    "BrightnessLevel":jsonData.BrightnessLevel,
  }
  res.status(200).json({ configs });
});
app.get("/poweroff", (req, res) => {
  if(jsonData.PoweredOn === false){
    res.status(200).json({ message: "Device is already powered off" });
  }else{
  jsonData.PoweredOn= false;
  let configs = {
    "action": "poweron",
    "ack": "true",
    "BrightnessLevel":jsonData.BrightnessLevel,
  }
  res.status(200).json({ configs });
}
});
app.get("/identify", (req, res) => {
  let configs = {
    "action": "identify",
    "DeviceType": jsonData.DeviceType,
    "Serial": jsonData.Serial,
    "FirmwareVersion":jsonData.FirmwareVersion,
    "LampName":jsonData.LampName,
  }
  res.status(200).json({ configs });
});
app.get("/powerstatuschange",(req,res)=>{
  jsonData.PoweredOn = !(jsonData.PoweredOn)
  let configs = {
    "action": "powerstatuschanged",
    "PoweredOn": jsonData.PoweredOn,
  }
  res.status(200).json({configs});
})

app.get("/getpowerstatus", (req, res) => {
  let configs = {
    "action": "getpowerstatus",
    "PoweredOn":jsonData.PoweredOn,
  }
  res.status(200).json({ configs });
});

app.get("/getparameters", (req, res) => {
  let configs = {
    "action": "getparameters",
    "BrightnessLevel": jsonData.BrightnessLevel,
  }
  res.status(200).json({ configs });
});

app.get('/testapi/header_data', (req, res) => {
  let data = {
    'status': '',
    'name': '',
    'value': '',
  };
  console.log(req["headers"])
  // ###############################################
  // req["headers"]=== WILL ALWAYS OUTPUT KEYS IN LOWER CASE 
  // ###############################################
  let All_Headers = req["headers"];

  // for (var key in All_Headers)
  if (All_Headers['x-msisdn']) {


    {
      let Header_Value = All_Headers['x-msisdn']

      data["status"] = true;
      data["name"] = "msisdn";
      data['value'] = Header_Value;
      console.log(All_Headers['x-msisdn']+"-------------------")
      // res.setHeader("Content-Type", "application/json")
      // res.send(data);
      res.send(data);
    }

  }

  else {
    data["status"] = false;
    data["name"] = "msisdn";
    data['value'] = "";
    res.send(data);

  }


  // res.setHeader("Content-Type", "application/json")
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Listening to requests on http://0.0.0.0:${port}`);
});


