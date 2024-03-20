import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <div className="rounded shadow-lg bg-blue-100 grid grid-cols-12 gap-4">
        <div className="col-span-1">
          <Link to="/">
            <button className="button">Início</button>
          </Link>
        </div>

        <div className="col-span-1">
          <Link to="/match">
            <button className="button">Partida</button>
          </Link>
        </div>

        {/*<button className="h-10 border-b-2 border-gray-500 bg-blue-500 text-white font-bold py-2 px-4 rounded">
            Meu botão
  </button>*/}
      </div>
    </>
  );
};
