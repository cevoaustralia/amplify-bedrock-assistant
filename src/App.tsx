import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Header from "./custom-components/header";
import Footer from "./custom-components/footer";
import { signOut } from "aws-amplify/auth";
import Landing from "./pages/Landing";

function App() {
  async function handleSignOut() {
    await signOut();
  }

  return (
    <Authenticator>
      <main>
        <Header></Header>
        <Landing></Landing>
        <Footer signOut={handleSignOut}></Footer>
      </main>
    </Authenticator>
  );
}

export default App;
