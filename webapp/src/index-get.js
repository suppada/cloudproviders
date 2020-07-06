console.log('Gets data from DynamoDB table')

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: process.env.REGION});
const htmlResponse = require('./html-response');

// exports.lambdaHandler = async (event, context) => {


exports.lambdaHandler = async (event, context, callback) => {
    console.log("Running index-get.js: " + context.functionName + ":" + context.functionVersion);
    console.log('Version 1526 lambdaHandler processing event: %j', event);

    let scanningParameters = {
        TableName: process.env.TABLE_NAME,
        // TableName: "makeitfail14",
        Limit: 100 //maximum result of 100 items
    };
    
    const thanksHtml = `
      <html>
      <head>
        <meta charset="utf-8"/>
      </head>
      <body>
        <h1>Thanks</h1>
        <p>We received your submission</p>
      </body>
      </html>
    `;
    
    console.log('Version 1543 event.httpmethod: ', event.httpmethod);

    if (event.httpmethod === 'GET') {
        console.log("GET method called in index-get.js!!!!!!!!!");
        return htmlResponse(thanksHtml);
    }    
    
    //In dynamoDB scan looks through your entire table and fetches all data
    docClient.scan(scanningParameters, function(err,data){
        if (err) {
            console.log(err, err.stack);
            callback(null, {
                statusCode: 500,
            });
        }
        else{
            callback(null, data);
        }
    });
}