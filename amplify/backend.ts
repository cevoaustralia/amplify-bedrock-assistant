import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { submitPromptFunction } from './functions/submit-prompt/resource';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { BACKEND_CONFIG } from './constants';

const backend = defineBackend({
  auth,
  data,
  submitPromptFunction
});

// Create a new API stack
// const apiStack = backend.createStack('api-stack');

// Create the policy for Lambda to access Bedrock
const bedrockPolicyStatement = new PolicyStatement({
  effect: Effect.ALLOW,
  actions: [
    'bedrock:DescribeKnowledgeBase',
    'bedrock:InvokeModel',
    'bedrock:ListKnowledgeBases',
    'bedrock:Retrieve',
    'bedrock:RetrieveAndGenerate',
    'bedrock:RetrieveAndGenerateCommand',
    'logs:CreateLogGroup',
    'logs:CreateLogStream',
    'logs:PutLogEvents'
  ],
  resources: [
    `arn:aws:bedrock:${BACKEND_CONFIG.REGION}:${BACKEND_CONFIG.AWS_ACCOUNT_ID}:knowledge-base/${BACKEND_CONFIG.BEDROCK_KNOWLEDGE_BASE_ID}`,
    `arn:aws:bedrock:${BACKEND_CONFIG.REGION}::foundation-model/${BACKEND_CONFIG.BEDROCK_FOUNDATION_MODEL_NAME}`
  ]
});

// Add to amplify function the role that grants to invoke to Bedrock
const submitPromptLambda = backend.submitPromptFunction.resources.lambda;
submitPromptLambda.addToRolePolicy(bedrockPolicyStatement);
