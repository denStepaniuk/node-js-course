const express = require('express', 4.18);
const {APP_LOCAL_PORT} = require("./environments");
const axios = require("axios");
const {customError} = require('./errorrs')
const app = express();

app.get('/dad-jokes', async (req, resp) => {
  try {
    const jokeResponse = await axios.get('https://icanhazdadjoke.com/', {
      headers: {
        "Accept": "application/json"
      }
    })

    if (jokeResponse.status === 200) {
      console.log(jokeResponse.data)
      resp.send(jokeResponse.data);
    }

  } catch (err) {
    console.error(Error(err))
    resp.status(err.response.status).send(
        customError(err.response.status, err.code, "Downstream server error!"));
  }
});

app.listen(APP_LOCAL_PORT, () => {
  console.log(`App started on port ${APP_LOCAL_PORT}`)
})
