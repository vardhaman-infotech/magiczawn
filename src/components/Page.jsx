import Web3 from "web3"
import {mintingAbi, mintingAddress, marketPlace, marketAbi, tokenAddress, tokenAbi} from '../config'

const Page = ({isLogin,setLogin}) => {

  const web3 = new Web3(Web3.givenProvider)

  const buy = async() =>{
    const marketContract = new web3.eth.Contract(marketAbi,marketPlace)
    const tokenContract = new web3.eth.Contract(tokenAbi,tokenAddress)
    const address = await web3.eth.getAccounts()
    await  tokenContract.methods.approve(marketPlace, "100000000000000").send({from: address[0]})
    await  marketContract.methods.fillOrder(mintingAddress, 0).send({from: address[0]})
  }

  const mint = async() =>{
    const mintContract = new web3.eth.Contract(mintingAbi, mintingAddress)
    const address = await web3.eth.getAccounts()
    await mintContract.methods.batchMint(["https://abhitest.mypinata.cloud/ipfs/QmTJvAk7u89feVnKkzuRxTk8kH42VRyspqg7RqMJyAQv99"],[10]).send({from:address[0]})
  }

  const sell = async() =>{
    const mintContract = new web3.eth.Contract(mintingAbi, mintingAddress)
    const marketContract = new web3.eth.Contract(marketAbi,marketPlace)
    const address = await web3.eth.getAccounts()
    await mintContract.methods.approve(marketPlace, 0).send({from: address[0]})
    .then(async()=>{
          await  marketContract.methods.placeOrder(mintingAddress, 0, 1000000000).send({from: address[0]})  }  
    )}

  const tranferToken = async() =>{
    const tokenContract = new web3.eth.Contract(tokenAbi,tokenAddress)
    const address = await web3.eth.getAccounts()
    await  tokenContract.methods.transfer("0xc370514f1b2BcE6Cd6943E74cE4FCfcA278ff29C", 1000000000).send({from: address[0]})
  }

  const endSale = async() =>{
    const marketContract = new web3.eth.Contract(marketAbi,marketPlace)
    const address = await web3.eth.getAccounts()
    await  marketContract.methods.cancelOrder(mintingAddress, 0).send({from: address[0]})
  }
  return <div className="justify-evenly p-12 grid gap-x-4 gap-y-4 grid-cols-3">
    <button className="bg-HighlightColor text-NavbarColor rounded-lg px-6 py-4 text-xl" onClick={()=>buy()}>Buy</button>
    <button className="bg-HighlightColor text-NavbarColor rounded-lg px-6 py-4 text-xl" onClick={()=>sell()}>Sell</button>
    <button className="bg-HighlightColor text-NavbarColor rounded-lg px-6 py-4 text-xl" onClick={()=>endSale()}>End Sale</button>
    <button className="bg-HighlightColor text-NavbarColor rounded-lg px-6 py-4 text-xl" onClick={()=>mint()}>Mint</button>
    <button className="bg-HighlightColor text-NavbarColor rounded-lg px-6 py-4 text-xl" onClick={()=>tranferToken()}>Transfer Tokens</button>
    {isLogin ? (
          <button className="bg-HighlightColor text-NavbarColor rounded-lg px-6 py-4 text-xl" onClick={()=>setLogin(false)}>Logout</button>
        ) : (
          <button className="bg-HighlightColor text-NavbarColor rounded-lg px-6 py-4 text-xl" onClick={()=>setLogin(true)}>Login</button>
        )}
  </div>
}

export default Page