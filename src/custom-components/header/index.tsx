import { HeaderDiv, TextDiv } from "./styled";
import amplifyIcon from "../../assets/amplify.png";

const Header: React.FC = () => {
  return (
    <HeaderDiv>
      <>
        <img src={amplifyIcon} style={{ width: "60px", height: "50px" }} />
      </>
      <TextDiv>AWS Bedrock Virtual Assistant</TextDiv>
    </HeaderDiv>
  );
};

export default Header;
