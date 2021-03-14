'use strict';

const config = require("../config");
const aws = require("aws-sdk");
const ses = new aws.SES({ region: config.region });

module.exports.sendEmail = async (
  emailRecipientAddresses,
  emailSenderAddress,
  messageSubjectData,
  messageBodyHtml,
  messageBodyText
) => {
  const params = {
    Destination: {
      ToAddresses: emailRecipientAddresses,
    },
    Message: {
      Subject: { Data: messageSubjectData },
      // Body: {
      //   Text: { Data: messageBodyData },
      //   Html: { Data: messageBodyData },
      // },
    },
    Source: emailSenderAddress,
  };
  params.Message.Body = messageBodyHtml ? { Html: { Data: messageBodyHtml } } : { Text: { Data: messageBodyText } };
 
  try {
    const result = await ses.sendEmail(params).promise();
    console.log(`email sent - message id: ${result.MessageId}`);
    return { success: true };
  } catch(err) {
    console.error(`email not sent - error: ${err}`);
    return { error: err };
  }
}