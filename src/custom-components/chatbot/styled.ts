import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  background-color: white;
  border: 1px solid black;
  gap: 1px;
  border-radius: 8px;
  background-color: #a97df9;
  padding: 20px;
`;

export const ChatbotArea = styled.div``;

export const ChatbotTextArea = styled.div`
  background-color: #a97df9;
  border: 2px solid white;
  border-radius: 15px;
  height: 400px;
  resize: none;
  width: 800px;
  overflow-y: scroll;
  display: block;
  flex-direction: column-reverse;
  white-space: pre-line;
  padding: 0.2rem;
`;

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC'
};

export const LeftMessageDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const ChatIconMessage = styled.div`
  margin: 0px;
  width: 3%;
  padding-left: 5px;
  vertical-align: top;
`;

export const ChatMessageDiv = styled.div`
  margin: 0;
  padding-left: 10px;
  padding-right: 10px;
`;

export const RightMessageDiv = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const UserMessageDiv = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  text-align: left;
  border-radius: 8px;
  background-color: ${blue[200]};
`;

export const InputAreaDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled.input`
  font-size: 16px;
  width: 100%;
  border-radius: 5px;
  border: 2px solid #ccc;
  margin-top: 10px;
`;

export const ButtonDiv = styled.div`
  display: flex;
  width: 40px;
  margin-top: 10px;
`;

export const StyledButton = styled('button')(
  () => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${'rgba(45, 45, 60, 0.2)'}, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${blue[300]};
    outline: none;
  }
`
);

export const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
