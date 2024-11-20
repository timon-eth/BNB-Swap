import { useState, useEffect } from 'react';

import { chainId } from '../constants/address';
import { connectWallet, getCurrentWalletConnected } from "../utils/interact";


const Header = (props) => {
    const { setCurrentWalletAddress, setStatus } = props;
    const [walletAddress, setWalletAddress] = useState(null);

    const addWalletListener = () => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                    setCurrentWalletAddress(accounts[0]);
                    setStatus("👆🏽 You can stake now.");
                } else {
                    setWalletAddress(null);
                    setCurrentWalletAddress(null);
                    setStatus("🦊 Connect to Metamask using the top right button.");
                }
            });
            window.ethereum.on("chainChanged", (chain) => {
                connectWalletPressed()
                if (chain !== chainId) {
                }
            });
        } else {
            setStatus(
                <p>
                    {" "}
                    🦊{" "}
                    {/* <a target="_blank" href={`https://metamask.io/download.html`}> */}
                        You must install Metamask, a virtual Ethereum wallet, in your
                        browser.(https://metamask.io/download.html)
                    {/* </a> */}
                </p>
            );
        }
    }

    useEffect (async () => {
        const { address, status } = await getCurrentWalletConnected();
        setWalletAddress(address);
        setCurrentWalletAddress(address);
        setStatus(status);
        addWalletListener();
    }, []);

    const handleConnectWallet = async () => {
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setWalletAddress(walletResponse.address);
        setCurrentWalletAddress(walletResponse.address)
    }
    
    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setWalletAddress(walletResponse.address);
        setCurrentWalletAddress(walletResponse.address)
    };

    return(
        <div className='w-full'>
            <div className='mx-auto w-10/12 h-full flex flex-col lg:flex-row justify-between items-center py-4'>
                <div className='font-bold text-2xl text-white flex mb-4 lg:m-none'><span className='text-3xl text-yellow-500'>BNB</span>smartswap</div>
                {
                    walletAddress
                        ? <div className='text-base lg:text-xl px-8 py-2 bg-yellow-500 rounded-xl text-white font-bold cursor-pointer' >
                            {walletAddress.slice(0, 5) + "..." + walletAddress.slice(38, 42)}
                        </div>
                        : <div 
                            className='text-base lg:text-xl px-8 py-2 bg-yellow-500 rounded-xl text-white font-bold cursor-pointer'
                            onClick={handleConnectWallet}
                            >
                            Connect Wallet
                        </div>
                }
            </div>
        </div>
    )
}

export default Header;