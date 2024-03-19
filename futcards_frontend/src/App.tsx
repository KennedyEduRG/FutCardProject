import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { GameMenu } from "./components/GameMenu/GameMenu";
import { UserPlayerInterface } from "./interfaces/UserPlayerInterface";


const defaultUserPlayerFormData: UserPlayerInterface = {
  nickName: "",
};

function App() {
  const [userPlayer, setUserPlayer] = useState<UserPlayerInterface>({ ...defaultUserPlayerFormData });

  function startGame() {
    if(validateGameMenuFields()) {
      console.log("Nick name válido")
    } else {
      console.log("Nick name inválido")
    }
    
    console.log(userPlayer.nickName);
  }

  function validateGameMenuFields(): boolean {
    if(userPlayer.nickName.length > 4) {

      return true;
    }
    return false;
  }

  return (
    <>
      <Navbar />
      <div className="rounded shadow-lg bg-green-500 grid grid-cols-12 gap-4">
        <div className="bg-gray-300 col-span-4">Espaço 1</div>

        <div className="bg-blue-300 col-span-4">
        <GameMenu userPlayerFormData={userPlayer} setUserPlayerFormData={setUserPlayer} startGame={startGame} />
        </div>

        <div className="bg-red-300 col-span-4">Espaço 3</div>
      </div>
    </>
  );
}

export default App;
