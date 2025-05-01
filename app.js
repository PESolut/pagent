// DEPENDACIES
const express = require("express");
const affirmationsController = require("./controllers/affirmationsController");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json())

// CONTROLLERS
app.use('/affirmations', affirmationsController)



// ROUTES
app.get("/", (req, res) => {
    res.status(200).send('Welcome to P-Agent backend server.')
});

app.get('/affirmations', (req, res) => {
    res.status
})

app.post("/notion-webhook", (req, res) => {
  console.log("📬 Received webhook from Notion:");
  console.log(req.body.data.properties);
  let sprintProps = {}

  // lets get every property in our parsedProps obj

  try {
    sprintProps = {
        'sprintEndDate': req.body.data.properties['Sprint End Date'].date.start,
        'jiraLink':  req.body.data.properties['JIRA Link'].rich_text[0].plain_text,
        'Goal': req.body.data.properties['Sprint Goal'].rich_text[0].plain_text,
        'Id': req.body.data.properties['Sprint ID'].rich_text[0].plain_text,
        'StartDate': req.body.data.properties['Sprint Start Date'].date.start,
        'Reflection': req.body.data.properties['Sprint Reflection'].rich_text[0].plain_text,
        'Status': req.body.data.properties['Sprint Status'].select.name,
        'Name': req.body.data.properties['Sprint Name'].title[0].plain_text
      };
      console.log('Parsed sprintProps:', sprintProps);
  } catch (error) {
    console.error('Error parsing webhook data:', err);
    return res.status(400).json({ error: 'Invalid data format from Notion' });
  }

  console.log('sprint props:',sprintProps)
  // set into db

  res.status(200).send("Webhook received");
});


// console.log(JSON.stringify(mockReq.data.properties, null, 2));



app.get("/not-found", (req, res) => {
    res.status(404).json({error: "page not found"})
})

app.get("*", (req, res)=> {
    res.redirect("/not-found")
})

// EXPORT
module.exports = app