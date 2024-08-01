import { Image, useTheme } from '@aws-amplify/ui-react';
import chatbotIcon from '../../assets/chatbot_icon.png';

const ChatbotImage: React.FC = () => {
  const { tokens } = useTheme();

  return (
    <Image
      src={chatbotIcon}
      alt='Chatbot image'
      alignSelf='stretch'
      objectFit='initial'
      objectPosition='50% 50%'
      backgroundColor={tokens.colors.purple[40]}
      height='100%'
      width='100%'
      opacity='100%'
      borderRadius={tokens.radii.sq}></Image>
  );
};

export default ChatbotImage;
