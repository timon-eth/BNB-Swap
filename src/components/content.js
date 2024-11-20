import { useEffect, useState } from "react";
import { ethers, BigNumber } from 'ethers';
import copy from "copy-to-clipboard";
import { 
    getBNBStakingContract, 
    getBUSDStakingContract, 
    getBUSDContract, 
    getBNBTotalStaked,
    getBUSDTotalStaked,
    getBNBTotalRefPaid,
    getBUSDTotalRefPaid,
    getBNBPrice,
    getBUSDPrice
} from "../utils/interact";
import { busdStakingContractAddress } from "../constants/address";

const Content = (props) => {
    const { walletAddress, setStatus, setIsLoading } = props;
    const [price, setPrice] = useState(0);
    const [depositValue, setDepositValue] = useState(0);
    const [earningValue, setEarningValue] = useState(0);
    const [isBNBStaking, setIsBNBStaking] = useState(true);
    const [totalStaked, setTotalStaked] = useState(0);
    const [totalRefPaid, setTotalRefPaid] = useState(0);
    const [userStaked, setUserStaked] = useState(0);
    const [userBNBAvailable, setUserBNBAvailable] = useState(0);
    const [userTotalStaked, setUserTotalStaked] = useState(0);
    const [userTotalClaim, setUserTotalClaim] = useState(0);
    const [userTotalReferral, setUserTotalReferral] = useState(0);
    const [userTotalReferralWithdrawn, setUserTotalReferralWithdrawn] = useState(0);
    const defaultReferralUrl = 'https://bss.finance?ref=';
    const [referralUrl, setReferralUrl] = useState(defaultReferralUrl);
    const [referrer, setReferrer] = useState();
    const [depositReg, setDepositReg] = useState([]);
    const searchPart = window.location.search;

    const handleChange = e => {
        setDepositValue(e.target.value);
        setEarningValue((e.target.value * 20 * 7 / 100).toFixed(3));
    }
    
    
    
    const convertTimestamp = (timestamp) => {
        var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
            dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2014-03-24, 3:00 PM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
        return time;
    }

    const getBNBStakingInfo = async () => {
        const bnbStakingContract = getBNBStakingContract();
        const newTotalStaked = await bnbStakingContract.totalStaked();
        setTotalStaked(ethers.utils.formatEther(newTotalStaked) * 1);
        const newTotalRefPaid = await bnbStakingContract.totalRefBonus();
        setTotalRefPaid(ethers.utils.formatEther(newTotalRefPaid) * 1);
        const newUserStaked = await bnbStakingContract.getUserTotalDeposits(walletAddress);
        setUserStaked(ethers.utils.formatEther(newUserStaked) * 1);
        const newUserBNBAvailable = await bnbStakingContract.getUserAvailable(walletAddress);
        setUserBNBAvailable(ethers.utils.formatEther(newUserBNBAvailable) * 1);
        const newUserTotalStaked = await bnbStakingContract.getUserTotalStaked(walletAddress);
        setUserTotalStaked(ethers.utils.formatEther(newUserTotalStaked) * 1);
        const newUserTotalClaim = await bnbStakingContract.getUserTotalClaim(walletAddress);
        setUserTotalClaim(ethers.utils.formatEther(newUserTotalClaim) * 1);
        const newUserTotalReferral = await bnbStakingContract.getUserReferralTotalBonus(walletAddress);
        setUserTotalReferral(ethers.utils.formatEther(newUserTotalReferral) * 1);
        const newUserTotalReferralWithdrawn = await bnbStakingContract.getUserReferralWithdrawn(walletAddress);
        setUserTotalReferralWithdrawn(ethers.utils.formatEther(newUserTotalReferralWithdrawn) * 1);
        const depositCounts = await bnbStakingContract.getUserAmountOfDeposits(walletAddress);
        let newDepositReg = [];
        for (let i = 0; i < depositCounts * 1; i++) {
            console.log(i)
            const depositInfo = await bnbStakingContract.getUserDepositInfo(walletAddress, i);
            newDepositReg.push({
                amount: ethers.utils.formatEther(depositInfo.amount) * 1,
                start: convertTimestamp(depositInfo.start),
                finish: convertTimestamp(depositInfo.finish)
            })
        }
        setDepositReg(newDepositReg);
    }

    const getBUSDStakingInfo = async () => {
        const busdStakingContract = getBUSDStakingContract();
        const newTotalStaked = await busdStakingContract.totalStaked();
        setTotalStaked(ethers.utils.formatEther(newTotalStaked) * 1);
        const newTotalRefPaid = await busdStakingContract.totalRefBonus();
        setTotalRefPaid(ethers.utils.formatEther(newTotalRefPaid) * 1);
        const newUserStaked = await busdStakingContract.getUserTotalDeposits(walletAddress);
        setUserStaked(ethers.utils.formatEther(newUserStaked) * 1);
        const newUserBNBAvailable = await busdStakingContract.getUserAvailable(walletAddress);
        setUserBNBAvailable(ethers.utils.formatEther(newUserBNBAvailable) * 1);
        const newUserTotalStaked = await busdStakingContract.getUserTotalStaked(walletAddress);
        setUserTotalStaked(ethers.utils.formatEther(newUserTotalStaked) * 1);
        const newUserTotalClaim = await busdStakingContract.getUserTotalClaim(walletAddress);
        setUserTotalClaim(ethers.utils.formatEther(newUserTotalClaim) * 1);
        const newUserTotalReferral = await busdStakingContract.getUserReferralTotalBonus(walletAddress);
        setUserTotalReferral(ethers.utils.formatEther(newUserTotalReferral) * 1);
        const newUserTotalReferralWithdrawn = await busdStakingContract.getUserReferralWithdrawn(walletAddress);
        setUserTotalReferralWithdrawn(ethers.utils.formatEther(newUserTotalReferralWithdrawn) * 1);
        const depositCounts = await busdStakingContract.getUserAmountOfDeposits(walletAddress);
        let newDepositReg = [];
        for (let i = 0; i < depositCounts; i++) {
            const depositInfo = await busdStakingContract.getUserDepositInfo(walletAddress, i);
            newDepositReg.push({
                amount: ethers.utils.formatEther(depositInfo.amount) * 1,
                start: convertTimestamp(depositInfo.start),
                finish: convertTimestamp(depositInfo.finish)
            })
        }
        setDepositReg(newDepositReg);
    }

    const depositBNB = async () => {
        const bnbStakingContract = getBNBStakingContract();
        try {
            setIsLoading(true)
            let tx = await bnbStakingContract.invest(walletAddress, 0, { value:  BigNumber.from(1e9).mul(BigNumber.from(1e9)).mul(depositValue * 10000).div(10000), from: walletAddress });
            let res = await tx.wait()
            if (res.transactionHash) {
                setStatus(`You staked ${depositValue} BNB Successfully`);
                await getBNBStakingInfo();
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            let status = "Transaction failed";
            setStatus(status);
            setIsLoading(false)
        }
    }

    const depositBUSD = async () => {
        const busdContract = getBUSDContract();
        const busdStakingContract = getBUSDStakingContract();
        try {
            setIsLoading(true)
            const allowance = await busdContract.allowance(walletAddress, busdStakingContractAddress);
            console.log(allowance)
            if (ethers.utils.formatEther(allowance) * 1 < depositValue * 10e18) {
                const approveAmount = '0x' + Math.round(depositValue * 10e18).toString(16);
                const tx = await busdContract.approve(busdStakingContractAddress, approveAmount);
                let res = await tx.wait()
                if (res.transactionHash) {
                    setStatus(`Approve BUSD token Successfully`);
                }
            }
            try {
                let tx = await busdStakingContract.invest(referrer, 0, BigNumber.from(1e9).mul(BigNumber.from(1e9)).mul(depositValue * 10000).div(10000), { value:  BigNumber.from(0), from: walletAddress });
                let res = await tx.wait()
                if (res.transactionHash) {
                    setStatus(`You staked ${depositValue} BUSD Successfully`);
                    await getBUSDStakingInfo();
                }
                setIsLoading(false)
            } catch (error) {
                console.log(error);
                let status = "Transaction failed";
                setStatus(status);
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            let status = "Transaction failed."
            setIsLoading(false)
            setStatus(status)
        }
    }

    const handleDeposit = () => {
        isBNBStaking ? depositBNB() : depositBUSD();
    }

    const withDrawBNB = async () => {
        const bnbStakingContract = getBNBStakingContract();
        try {
            let tx = await bnbStakingContract.withdraw();
            let res = await tx.wait()
            if (res.transactionHash) {
              setStatus(`Withdraw BNB Successfully`);
            }
        } catch (error) {
            console.log(error);
            let status = "Transaction failed";
            setStatus(status);
        }
    }

    const withDrawBUSD = async () => {
        const busdStakingContract = getBUSDStakingContract();
        try {
            let tx = await busdStakingContract.withdraw();
            let res = await tx.wait()
            if (res.transactionHash) {
              setStatus(`Withdraw BUSD Successfully`);
            }
        } catch (error) {
            console.log(error);
            let status = "Transaction failed";
            setStatus(status);
        }
    }

    const withDraw = () => {
        isBNBStaking ? withDrawBNB() : withDrawBUSD();
    }

    const copyToClipboard = () => {
        copy(referralUrl);
        setStatus(`Your Referral Link is "${referralUrl}"`);
    }

    useEffect(async () => {
        if (isBNBStaking) {
            const newTotalStaked = await getBNBTotalStaked();
            const newTotalRefPaid = await getBNBTotalRefPaid();
            const bnbPrice = await getBNBPrice();
            setPrice(bnbPrice * 1);
            setTotalStaked(newTotalStaked);
            setTotalRefPaid(newTotalRefPaid);
        } else {
            const newTotalStaked = await getBUSDTotalStaked();
            const newTotalRefPaid = await getBUSDTotalRefPaid();
            const busdPrice = await getBUSDPrice();
            setPrice(busdPrice * 1);
            setTotalStaked(newTotalStaked);
            setTotalRefPaid(newTotalRefPaid);
        }
        if (walletAddress) {
            setIsLoading(true);
            isBNBStaking ? await getBNBStakingInfo() : await getBUSDStakingInfo();
            setIsLoading(false);
            setReferralUrl(defaultReferralUrl + walletAddress);
            const arr = searchPart.split("=");
            const newReferrerAddr = !arr[1] ? walletAddress : arr[1]
            setReferrer(newReferrerAddr);
        }
    }, [walletAddress, isBNBStaking]);

    return(
        <div className='w-full flex-1 flex flex-col items-center content lg:pt-4 pb-10'>
            <div className='mx-auto w-10/12 flex flex-col items-center'>
                <div className='lg:w-6/12 m-4 text-yellow-500 font-bold w-full'>
                    <div className='text-center text-lg lg:text-2xl py-4'>Stake BNB | BUSD the smart way and earn 20% Daily</div>
                    <div className='flex justify-center lg:justify-between items-center text-center flex-wrap'>
                    <div className='m-2'>
                        <div className='text-md'>Live {isBNBStaking ? "BNB" : "BUSD"} price</div>
                        <div className='text-2xl'>{price.toFixed(2)} USD</div>
                    </div>
                    <div className='m-2'>
                        <div className='text-md'>Total {isBNBStaking ? "BNB" : "BUSD"} staked</div>
                        <div className='text-2xl'>{totalStaked} {isBNBStaking ? "BNB" : "BUSD"}</div>
                    </div>
                    <div className='m-2'>
                        <div className='text-md'>Total referral commissions paid</div>
                        <div className='text-2xl'>{totalRefPaid} {isBNBStaking ? "BNB" : "BUSD"}</div>
                    </div>
                    </div>
                </div>
                <div className='w-full flex flex-wrap lg:flex-nowrap justify-around'>
                    <div className='w-full lg:w-4/12 my-2 lg:m-4 shadow-xl bg-white rounded-xl flex flex-col card'>
                        <div className='p-4 flex justify-between'>
                            <div className='text-2xl font-bold text-violet-900'>STAKE {isBNBStaking ? "BNB" : "BUSD"}</div>
                            <div className="bg-black rounded-xl p-1 flex text-white font-bold">
                                <div className={`p-1 rounded-lg cursor-pointer ${isBNBStaking && 'bg-yellow-500 '}`} onClick={() => setIsBNBStaking(!isBNBStaking)} >BNB</div>
                                <div className={`p-1 rounded-lg cursor-pointer ${!isBNBStaking && 'bg-yellow-500'}`} onClick={() => setIsBNBStaking(!isBNBStaking)} >BUSD</div>
                            </div>
                        </div>
                        <div className='p-4'>
                            <div className='flex justify-between my-2'>
                                <span className='font-bold'>Plan:</span>
                                <span className='font-bold'>7 days</span>
                            </div>
                            <div className='flex justify-between my-2'>
                                <span className='font-bold'>Daily Earnings:</span>
                                <span className='font-bold'>20 %</span>
                            </div>
                            <div className='flex justify-between my-2'>
                                <span className='font-bold'>Total ROI:</span>
                                <span className='font-bold'>140 %</span>
                            </div>
                            <div className='flex flex-col my-4'>
                                <div className='font-bold mb-2'>Deposit {isBNBStaking ? "BNB" : "BUSD"}</div>
                                <div className='font-bold mb-2 flex justify-between'>
                                    <div className="flex">
                                        <span className="">Min:</span>&nbsp;
                                        <span>{isBNBStaking ? "0.05" : "10"}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="">Max:</span>&nbsp;
                                        <span>{isBNBStaking ? "100" : "50000"}</span>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center border-2 p-4 rounded-xl mb-8'>
                                    <div className='font-bold w-3/6'>
                                        <input className="bg-black text-white pl-1 text-xl w-full focus-visible:outline-none" type="number" step={0.01} value={depositValue} onChange={handleChange} />
                                    </div>
                                    <button 
                                        className={`w-2/6 px-4 py-2 rounded-xl border-2 border-transparent bg-cyan-400 text-center font-bold text-white ${walletAddress ? "hover:border-white" : "opacity-40"}`}
                                        onClick={handleDeposit}
                                        disabled={!walletAddress}
                                    >
                                        Deposit
                                    </button>
                                </div>
                                <div className="font-bold">
                                    Total earnings (after 7 days): {earningValue} {isBNBStaking ? "BNB" : "BUSD"}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:w-4/12 my-2 lg:m-4 shadow-xl bg-white rounded-xl flex flex-col card'>
                        <div className='p-4'>
                            <div className=''>
                                <div className='text-2xl font-bold text-violet-900'>YOUR DASHBOARD</div>
                            </div>
                        </div>
                        <div className='p-4 flex flex-col'>
                            <div className='flex flex-col mb-4'>
                                <div className='font-bold mb-2'>{isBNBStaking ? "BNB" : "BUSD"} STAKED</div>
                                <div className='flex flex-col border-2 p-2 rounded-xl mb-4 font-bold'>
                                    <div className='text-lg'>{userStaked.toFixed(3)} {isBNBStaking ? "BNB" : "BUSD"}</div>
                                </div>
                            </div>
                            <div className='flex flex-col mb-4'>
                                <div className='font-bold mb-2'>TOTAL TO CLAIM</div>
                                <div className='flex flex-col border-2 p-2 rounded-xl mb-4 font-bold'>
                                    <div className='text-lg'>{userTotalClaim.toFixed(3)} {isBNBStaking ? "BNB" : "BUSD"}</div>
                                </div>
                            </div>
                            <div className='flex flex-col mb-4'>
                                <div className='font-bold mb-2'>CLAIMED</div>
                                <div className='flex flex-col border-2 p-2 rounded-xl mb-4 font-bold'>
                                    <div className='text-lg'>{userTotalStaked.toFixed(3)} {isBNBStaking ? "BNB" : "BUSD"}</div>
                                </div>
                            </div>
                            <div className='flex flex-col mb-4'>
                                <div className='font-bold mb-2'>AVAILABLE NOW</div>
                                <div className='flex flex-col border-2 p-2 rounded-xl mb-4 font-bold'>
                                    <div className='text-lg'>{userBNBAvailable.toFixed(3)} {isBNBStaking ? "BNB" : "BUSD"}</div>
                                </div>
                            </div>
                            <button className={`w-full py-2 rounded-xl text-center border-2 border-transparent bg-cyan-400 text-white font-bold mb-4 ${walletAddress ? "hover:border-white" : "opacity-40"}`}
                                onClick={withDraw}
                                disabled={!walletAddress}
                            >
                                Withdraw
                            </button>
                        </div>
                    </div>
                    <div className='w-full lg:w-4/12 my-2 lg:m-4 shadow-xl bg-white rounded-xl flex flex-col card'>
                        <div className='p-4'>
                            <div className=''>
                                <div className='text-2xl font-bold text-violet-900'>DEPOSIT HISTORY</div>
                            </div>
                        </div>
                        <div className="flex-1 p-4">
                            <div className="border-2 rounded-lg h-20 lg:h-full p-2 overflow-auto">
                                {
                                    depositReg.map((item, index) => 
                                        <div key={index} className="flex flex-col font-bold border-b-2 border-white pb-2">
                                            <div className="">Amount: {item.amount}</div>
                                            <div className="">Start: {item.start}</div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:p-4">
                    <div className="w-full p-4 rounded-xl flex flex-col mb-8 card">
                        <div className='text-2xl font-bold text-violet-900 mb-4'>REFERRAL BONUSES</div>
                        <div className="flex flex-col-reverse lg:flex-row">
                            <div className="">
                                <div className="font-bold mb-2">Earn BNB | BUSD By Inviting People To BNBsmartswap</div>
                                <div className="font-bold">You Will Receive:</div>
                                <div className="">12% From Each Level 1 Referral Deposits</div>
                                <div className="">8% From Each Level 2 Referral Deposits</div>
                                <div className="mb-2">3% From Each Level 3 Referral Deposits</div>
                                <div className="font-bold">Deposit at least Once To Activate Referral Rewards</div>
                            </div>
                            <div className="flex-1">
                                <div className="mb-4 lg:mx-8 border-2 p-4 h-full rounded-xl">
                                    <div className="p-2 border-2 rounded-xl mb-4 flex justify-between items-center">
                                        <span>{referralUrl}</span>
                                        <div className="cursor-pointer">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 24 24"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={copyToClipboard}>
                                                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-2 mb-2">Total Referral Earned: {userTotalReferral} {isBNBStaking ? "BNB" : "BUSD"}</div>
                                    <div className="ml-2">Total Referrals: {userTotalReferralWithdrawn} {isBNBStaking ? "BNB" : "BUSD"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-between flex-wrap text-lg font-bold text-white">
                    <a href="/" className="m-2 cursor-pointer hover:text-yellow-500">HOME</a>
                    <a href="/" className="m-2 cursor-pointer hover:text-yellow-500">DASHBOARD</a>
                    <a href="/" className="m-2 cursor-pointer hover:text-yellow-500">DEPOSIT</a>
                    <a href="/" className="m-2 cursor-pointer hover:text-yellow-500">TELEGRAM</a>
                    <a href="/" className="m-2 cursor-pointer hover:text-yellow-500">TWITTER</a>
                </div>
            </div>

        </div>
    )
}

export default Content;