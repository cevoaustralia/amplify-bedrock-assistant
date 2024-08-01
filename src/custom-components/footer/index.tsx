import { FooterDiv, TextDiv } from "./styled";


type ComponentProps = {
    signOut: () => void;
};  

const Footer: React.FC<ComponentProps> = ({signOut}) => {
    return (
        <FooterDiv>
           <TextDiv>
            🥳 App successfully hosted.
          </TextDiv>
          <div>
            <button onClick={signOut}>Sign out</button>
          </div>
        </FooterDiv>
    );
}

export default Footer;