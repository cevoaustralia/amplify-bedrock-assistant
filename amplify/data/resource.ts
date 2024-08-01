import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { submitPromptFunction } from "../functions/submit-prompt/resource";

export const schema = a.schema({
  RetrievalResultLocation: a.customType({
    s3Location: a.customType({
      uri: a.string(),
    }),
    type: a.string(),
    webLocation: a.customType({
      url: a.string(),
    }),
  }),
  RetrievedReferencesResponse: a.customType({
    contenxt: a.customType({
      text: a.string(),
    }),
    location: a.ref("RetrievalResultLocation"),
    metadata: a.string(),
  }),
  GeneratedResponsePart: a.customType({
    textResponsePart: a.customType({
      span: a.customType({
        end: a.integer(),
        start: a.integer(),
      }),
      text: a.string(),
    }),
  }),
  CitationResponse: a.customType({
    generatedResponsePart: a.ref("GeneratedResponsePart"),
    retrievedReferences: a.ref("RetrievedReferencesResponse").array(),
  }),
  PromptResponse: a.customType({
    type: a.string(),
    sessionId: a.string(),
    systemMessageId: a.string(),
    systemMessage: a.string(),
    sourceAttributions: a.ref("CitationResponse").array(),
  }),
  submitPrompt: a
    .query()
    .arguments({
      userId: a.string().required(),
      prompt: a.string(),
      messageId: a.string(),
      sessionId: a.string(),
    })
    .returns(a.ref("PromptResponse"))
    .handler(a.handler.function(submitPromptFunction))
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
  authorizationModes: {
    // This tells the data client in your app (generateClient())
    // to sign API requests with the user authentication token.
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
