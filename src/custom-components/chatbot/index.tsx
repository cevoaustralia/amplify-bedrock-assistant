import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ButtonDiv,
  ChatIconMessage,
  ChatMessageDiv,
  ChatbotArea,
  ChatbotTextArea,
  InputAreaDiv,
  LeftMessageDiv,
  LoadingDiv,
  RightMessageDiv,
  StyledButton,
  StyledInput,
  UserMessageDiv,
  Wrapper,
} from "./styled";
import { CircularProgress } from "@mui/material";
import ChatbotImage from "../chatbot-image";
import { getCurrentUser } from "aws-amplify/auth";

import { v4 as uuidv4 } from "uuid";
import { clientSchema } from "../../utils";

const Chatbot: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [chatAreaState, setChatAreaState] = useState<Array<JSX.Element>>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [chatLastMessageId, setChatLastMessageId] = useState<string>("");
  const [chatSessionId, setChatSessionId] = useState<string>("");

  const initialAssistantMessage = "How can I help you today?";

  const assistantRowComponent = (
    assistMessage: string | undefined,
    displayIcon?: boolean
  ) => {
    const newUuid = uuidv4();
    return (
      <LeftMessageDiv key={newUuid}>
        {displayIcon && (
          <ChatIconMessage>
            <ChatbotImage></ChatbotImage>
          </ChatIconMessage>
        )}
        <ChatMessageDiv>
          <b>Assistant: </b>
          {assistMessage ||
            "Sorry, could not get a answer for you. Please try again with a different question."}
        </ChatMessageDiv>
      </LeftMessageDiv>
    );
  };

  const userRowComponent = (userMessage: string) => {
    const newUuid = uuidv4();
    return (
      <RightMessageDiv key={newUuid}>
        <UserMessageDiv>
          <b>
            <i>User: </i>
          </b>
          {userMessage}
        </UserMessageDiv>
      </RightMessageDiv>
    );
  };

  useEffect(() => {
    const initAreaState: Array<JSX.Element> = [
      assistantRowComponent(initialAssistantMessage, true),
    ];
    setChatAreaState(initAreaState);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  async function submitQuery() {
    const { username } = await getCurrentUser();
    const query = {
      prompt: inputValue,
      userId: username,
      messageId: chatLastMessageId || "",
      sessionId: chatSessionId || "",
    };

    const response = await clientSchema.queries.submitPrompt(query);
    return response.data;
  }

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement | HTMLButtonElement>
  ) {
    if (inputValue !== "") {
      // Display user message
      const currentAreaState = chatAreaState;
      currentAreaState.push(userRowComponent(inputValue));
      setChatAreaState(currentAreaState);

      setInputValue("");
      event.preventDefault();

      // Display Result
      try {
        setLoading(true);
        const response = await submitQuery();
        if (response) {
          setChatLastMessageId(response?.systemMessageId || "");
          setChatSessionId(response.sessionId || "");

          currentAreaState.push(
            assistantRowComponent(response.systemMessage || "")
          );
          setChatAreaState(currentAreaState);
        }
      } catch (e) {
        console.error("Request failed: ", e);
        currentAreaState.push(assistantRowComponent(undefined));
      } finally {
        setLoading(false);
        setChatAreaState(currentAreaState);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    }
  }

  return (
    <Wrapper>
      <ChatbotArea id="chatbot-chat">
        <ChatbotTextArea id="chatbot-messages">{chatAreaState}</ChatbotTextArea>
      </ChatbotArea>
      <>
        {loading ? (
          <LoadingDiv>
            <CircularProgress />
          </LoadingDiv>
        ) : (
          <InputAreaDiv>
            <StyledInput
              ref={inputRef}
              id="input-form"
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={handleChange}
            ></StyledInput>
            <ButtonDiv>
              <StyledButton onClick={(event) => handleSubmit(event)}>
                Submit
              </StyledButton>
            </ButtonDiv>
          </InputAreaDiv>
        )}
      </>
    </Wrapper>
  );
};

export default Chatbot;
