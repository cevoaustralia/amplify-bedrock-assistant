import { z } from 'zod';

export const PromptRequest = z.object({
  prompt: z.string().optional(),
  userId: z.string(),
  messageId: z.string().optional(),
  sessionId: z.string().optional()
});

export type PromptRequest = z.infer<typeof PromptRequest>;

export interface RetrievalResultLocation {
  s3Location?: {
    uri?: string;
  };
  type?: string;
  webLocation?: {
    url?: string;
  };
}

export interface RetrievedReferencesResponse {
  content?: {
    text?: string;
  };
  location?: RetrievalResultLocation;
  metadata?: any;
}

export interface GeneratedResponsePart {
  textResponsePart?: {
    span?: {
      end?: number;
      start?: number;
    };
    text?: string;
  };
}

export interface CitationResponse {
  generatedResponsePart?: GeneratedResponsePart;
  retrievedReferences?: Array<RetrievedReferencesResponse>;
}

export interface PromptReponse {
  type: string;
  sessionId?: string;
  systemMessageId?: string;
  systemMessage?: string;
  sourceAttributions?: Array<CitationResponse>;
}
