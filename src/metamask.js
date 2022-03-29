// const Web3Modal = require('web3modal')
import Web3Modal from 'web3modal'
// const Web3 = require('web3')
import Web3 from 'web3'

export function Connection() {
    const providerOptions = {}
    const web3Modal = new Web3Modal({
        network: 'testnet',
        cacheProvider: true,
        providerOptions, // required
    })

    async function connectPrompt(isConnected, setOpen, setLoading) {
        if (window.etherium) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            const provider = await web3Modal.connect()
            console.log(provider)
            const web3 = new Web3(provider)
            if (isConnected === true) {
                const address = await web3.eth
                    .getAccounts()
                    .then((data) => data[0])
                // localStorage.setItem('metamaskInfo', JSON.stringify({ address }))
                return address
            } else {
                console.log('NOT CONNECTED')
                const data = await web3Modal.clearCachedProvider()
            }
        } else {
            console.log('NOT CONNECTED')
            setOpen(true)
            if (setLoading) setLoading(false)
        }
    }

    return [web3Modal, connectPrompt]
}

// // export const connectWallet = async () => {
// //     if (window.ethereum) {
// //         try {
// //             const addressArray = await window.ethereum.request({
// //                 method: 'eth_requestAccounts',
// //             })
// //             const obj = {
// //                 address: addressArray[0],
// //             }
// //             // console.log('METAMASK_LOGIN_', obj)
// //             localStorage.setItem('metamaskInfo', JSON.stringify(obj))
// //             return obj
// //         } catch (err) {
// //             return {
// //                 address: '',
// //                 status: '😥 ' + err.message,
// //             }
// //         }
// //     } else {
// //         return {
// //             address: '',
// //             status: (
// //                 <span>
// //                     <p>
// //                         {' '}
// //                         🦊{' '}
// //                         <a
// //                             target='_blank'
// //                             href={`https://metamask.io/download.html`}
// //                             rel='noreferrer'
// //                         >
// //                             You must install Metamask, a virtual Ethereum
// //                             wallet, in your browser.
// //                         </a>
// //                     </p>
// //                 </span>
// //             ),
// //         }
// //     }
// // }

// //getting current wallet
// export const getCurrentWalletConnected = async () => {
//     if (window.ethereum) {
//         try {
//             const addressArray = await window.ethereum.request({
//                 method: 'eth_accounts',
//             })
//             if (addressArray.length > 0) {
//                 return {
//                     address: addressArray[0],
//                     status: '👆🏽 Write a message in the text-field above.',
//                 }
//             } else {
//                 return {
//                     address: '',
//                     status: '🦊 Connect to Metamask using the top right button.',
//                 }
//             }
//         } catch (err) {
//             return {
//                 address: '',
//                 status: '😥 ' + err.message,
//             }
//         }
//     } else {
//         return {
//             address: '',
//             status: (
//                 <span>
//                     <p>
//                         {' '}
//                         🦊{' '}
//                         <a
//                             target='_blank'
//                             href={`https://metamask.io/download.html`}
//                             rel='noreferrer'
//                         >
//                             You must install Metamask, a virtual Ethereum
//                             wallet, in your browser.
//                         </a>
//                     </p>
//                 </span>
//             ),
//         }
//     }
// }
