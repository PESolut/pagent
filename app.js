// DEPENDACIES
const express = require("express");
const affirmationsController = require("./controllers/affirmationsController");
const { createAffirmation } = require("./queries/affirmations");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json())

// CONTROLLERS
app.use('/affirmations', affirmationsController)



// ROUTES
app.get("/", async (req, res) => {
    res.status(200).send('Welcome to P-Agent backend server.')
});

app.get('/affirmations', async (req, res) => {
    res.status
})

app.post("/notion-webhook", (req, res) => {
  console.log("📬 Received webhook from Notion:");
  console.log(req.body.data.properties);
  let sprintProps = {}

  // parsing webhook
  try {
    sprintProps = {
      sprintEndDate: req.body.data?.properties?.['Sprint End Date']?.date?.start ?? "unknown",
      jiraLink: req.body.data?.properties?.['JIRA Link']?.rich_text?.[0]?.plain_text ?? "unknown",
      Goal: req.body.data?.properties?.['Sprint Goal']?.rich_text?.[0]?.plain_text ?? "unknown",
      Id: req.body.data?.properties?.['Sprint ID']?.rich_text?.[0]?.plain_text ?? "unknown",
      StartDate: req.body.data?.properties?.['Sprint Start Date']?.date?.start ?? "unknown",
      Reflection: req.body.data?.properties?.['Sprint Reflection']?.rich_text?.[0]?.plain_text ?? "unknown",
      Status: req.body.data?.properties?.['Sprint Status']?.select?.name ?? "unknown",
      Name: req.body.data?.properties?.['Sprint Name']?.title?.[0]?.plain_text ?? "unknown",
      event_type: 'unknown',
      source_db: 'unknown', 
      payload: req.body.data
    };
    console.log('Parsed sprintProps:', sprintProps);
  } catch (error) {
    console.error('Error parsing webhook data:', error);
    return res.status(400).json({ error: 'Invalid data format from Notion' });
  }
  
  
  // setting affirmation
  try {
    // let { sprintEndDate, jiraLink, Goal, Id, StartDate, Reflection, Name } = req.body
    let newStatus = 'queued';
    let newEvent = createAffirmation(sprintProps);
    newEvent.status = newStatus
    res.status(200).json({ message: 'Saved', data: newEvent })
  } catch (error) {
    console.error('Error saving event:', error)
    res.status(500).json({ error: "Internal server error"})
  }

//   res.status(200).send("Webhook received");
});


// console.log(JSON.stringify(mockReq.data.properties, null, 2));



app.get("/not-found", async (req, res) => {
    res.status(404).json({error: "page not found"})
})

app.get("*", async (req, res)=> {
    res.redirect("/not-found")
})

// EXPORT
module.exports = app