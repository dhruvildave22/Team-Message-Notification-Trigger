var axios = require("axios");

module.exports = async function (context, req) {
  context.log("Executing Webhook endpoint…");
  // Validate the subscription creation
  if (req.query.validationToken) {
    context.log("Validating new subscription…");
    context.log("Validation token:");
    context.log(req.query.validationToken);
    context.res = {
      headers: {
        "Content-Type": "text/plain",
      },
      body: req.query.validationToken,
    };
  } else {
    context.log("Received new notification…");
    context.log("Notification: ");
    context.log(JSON.stringify(req.body));
    var data = JSON.stringify(req.body);
    var config = {
      method: "post",
      url: "https://d365-query.azurewebsites.net/api/Parse_Team_Messages?code=A9zdcm216UIngAdvBfIhMdwWgjaq/7w/Ia4NfV4kqeD318CSi8wy7Q==",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        context.log(JSON.stringify(response.data));
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        context.log(error)
        console.log(error);
      });
    context.res = { body: "" };
  }
};
