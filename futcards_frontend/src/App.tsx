import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { GameMenu } from "./components/GameMenu/GameMenu";
import { UserPlayerInterface } from "./interfaces/UserPlayerInterface";
import { MatchPage } from "./routes/MatchPage";

const defaultUserPlayerFormData: UserPlayerInterface = {
  nickName: "",
};

function App() {
  const [userPlayer, setUserPlayer] = useState<UserPlayerInterface>({
    ...defaultUserPlayerFormData,
  });

  return (
    <>
      {/*<Navbar />*/}
      <div>
        <GameMenu
          userPlayerFormData={userPlayer}
          setUserPlayerFormData={setUserPlayer}
        />
        {/*<MatchPage />*/}
      </div>
    </>
  );
}

export default App;
