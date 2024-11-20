import { ethers } from "ethers";
import axios from "axios";
import { chainId } from "../constants/address";
import { bnbStakingContractAddress, busdStakingContractAddress, busdContractAddress } from "../constants/address";
import bnbStakingContractABI from "../constants/bnbstakingcontractabi.json";
import busdStakingContractABI from "../constants/busdstakingcontractabi.json";
import busdContractABI from "../constants/busdcontractabi.json";

const provider = ethers.getDefaultProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
const bnbStakingContract = new ethers.Contract(bnbStakingContractAddress, bnbStakingContractABI, provider);
const busdStakingContract = new ethers.Contract(busdStakingContractAddress, busdStakingContractABI, provider);

export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const chain = await window.ethereum.request({ method: 'eth_chainId' })
        if (chain === chainId) {
          const addressArray = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
          if (addressArray.length > 0) {
            return {
              address: addressArray[0],
              status: "👆🏽 You can stack now.",
            }
          } else {
            return {
              address: "",
              status: "😥 Connect your wallet account to the site.",
            }
          }
        } else {
          window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId:chainId }],
          })
          return {
            address: "",
            status: "😥 Connect your wallet account to the site.",
          }
        }
        
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        }
      }
    } else {
      return {
        address: "",
        status: "🦊 You must install Metamask, a virtual Ethereum wallet, in your browser.(https://metamask.io/download.html)" 
      }
    }
}

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        })
        const chain = await window.ethereum.request({
          method: "eth_chainId",
        })
        if (addressArray.length > 0 && chain === chainId) {
          return {
            address: addressArray[0],
            status: "👆🏽 You can stake now.",
          }
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask and choose the correct chain using the top right button.",
          }
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        }
      }
    } else {
      return {
        address: "",
        status: "🦊 You must install Metamask, a virtual Ethereum wallet, in your browser.(https://metamask.io/download.html)"
      }
    }
}

export const getBNBStakingContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(bnbStakingContractAddress, bnbStakingContractABI, signer);
  return contract;
}

export const getBUSDStakingContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(busdStakingContractAddress, busdStakingContractABI, signer);
  return contract;
}

export const getBUSDContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(busdContractAddress, busdContractABI, signer);
  return contract;
}

export const getBNBTotalStaked = async () => {
  console.log(bnbStakingContract)
  const totalStaked = await bnbStakingContract.totalStaked();
  return ethers.utils.formatEther(totalStaked) * 1;
}

export const getBNBTotalRefPaid = async () => {
  const totalRefPaid = await bnbStakingContract.totalRefBonus();
  return ethers.utils.formatEther(totalRefPaid) * 1;
}

export const getBUSDTotalStaked = async () => {
  const totalStaked = await busdStakingContract.totalStaked();
  return ethers.utils.formatEther(totalStaked) * 1;
}

export const getBUSDTotalRefPaid = async () => {
  const totalRefPaid = await busdStakingContract.totalRefBonus();
  return ethers.utils.formatEther(totalRefPaid) * 1;
}

export const getBNBPrice = async () => {
  const bnbInfo = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
  return bnbInfo.data.price;
}

export const getBUSDPrice = async () => {
  const busdInfo = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BUSDUSDT');
  return busdInfo.data.price;
}