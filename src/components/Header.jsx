import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Connection } from '../metamask';

const Header = ({ isLogin, isWalletLogin, setLogin, setWalletLogin }) => {
  const [web3Modal, connectPrompt] = Connection()
  
  return (
    <div className="w-full flex justify-between items-center px-8 py-4 text-red bg-NavbarColor">
      <div className="text-HighlightColor">
        <AcUnitIcon fontSize="large" />
      </div>
      <div>
        {isLogin && isWalletLogin ? (
           <button className="bg-HighlightColor text-NavbarColor rounded-lg px-4 py-2">Logged In</button>
        ) : (
          <button className="bg-HighlightColor text-NavbarColor rounded-lg px-4 py-2" onClick={()=>connectPrompt().then(()=>{
            setLogin(true);
            setWalletLogin(true)
          })}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Header;
