import { isEmpty } from 'lodash-es';
import { CitationResponse, PromptReponse, PromptRequest } from './model';
import {
  BedrockAgentRuntimeClient,
  RetrieveAndGenerateCommand,
  RetrieveAndGenerateCommandInput,
  RetrieveAndGenerateCommandOutput
} from '@aws-sdk/client-bedrock-agent-runtime';

interface PromptServiceProps {
  bedrockKnowledgeBaseId?: string;
  bedrockModelName?: string;
  region: string;
}

export const PromptService = (props: PromptServiceProps) => {
  const bedrockKnowledgeBaseId = props?.bedrockKnowledgeBaseId;
  if (!bedrockKnowledgeBaseId)
    throw new Error('No bedrockKnowledgeBaseId name given or missing BEDROCK_KNOWLEDGE_BASE_ID value');

  const bedrockModelName = props?.bedrockModelName;
  if (!bedrockModelName) throw new Error('No bedrockModelName name given or missing BEDROCK_MODEL_NAME value');

  const { region } = props;
  const bedrockClient = new BedrockAgentRuntimeClient({ region });
  const modelArn = `arn:aws:bedrock:${region}::foundation-model/${bedrockModelName}`;
  const sourceType = 'BEDROCK_KNOWLEDGEBASE';

  const submitPrompt = async (request: PromptRequest) => {
    console.log('Submitting prompt to Bedrock', JSON.stringify(request));

    let input: RetrieveAndGenerateCommandInput = {
      input: {
        text: request.prompt
      },
      retrieveAndGenerateConfiguration: {
        type: 'KNOWLEDGE_BASE',
        knowledgeBaseConfiguration: {
          knowledgeBaseId: bedrockKnowledgeBaseId,
          modelArn,
          retrievalConfiguration: {
            vectorSearchConfiguration: {
              overrideSearchType: 'HYBRID'
            }
          }
        }
      }
    };

    if (request.sessionId !== '') {
      input = {
        ...input,
        sessionId: request.sessionId
      };
    }

    const command = new RetrieveAndGenerateCommand(input);
    const response: RetrieveAndGenerateCommandOutput = await bedrockClient.send(command);
    let serviceResponse: PromptReponse = {
      type: sourceType
    };

    console.log('Response Bedrock', JSON.stringify(response));

    if (response) {
      const { citations, output, sessionId } = response;
      let sourceAttributions: Array<CitationResponse> = [];

      if (!isEmpty(response.citations)) {
        sourceAttributions =
          citations?.map(item => {
            return {
              generatedResponsePart: {
                textResponsePart: { ...item.generatedResponsePart?.textResponsePart }
              },
              retrievedReferences: item.retrievedReferences?.map(rr => {
                return {
                  content: { ...rr.content },
                  location: {
                    s3Location: { ...rr.location?.s3Location },
                    type: rr.location?.type,
                    webLocation: { ...rr.location?.webLocation }
                  },
                  metadata: rr.metadata
                };
              })
            };
          }) || [];
      }

      serviceResponse = {
        type: sourceType,
        sessionId: sessionId,
        systemMessageId: sessionId,
        systemMessage: output?.text,
        sourceAttributions
      };
    }
    return serviceResponse;
  };

  return { submitPrompt };
};
