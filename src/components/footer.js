import TelegramImg from '../assets/image/telegram.png'
import DappradarImg from '../assets/image/dappradar.png'
import BscscanImg from '../assets/image/bscscan.png'
import DappImg from '../assets/image/dapp.png'
import HazecryptoImg from '../assets/image/hazecrypto.png'
import TechauditImg from '../assets/image/techaudit.png'

const Footer = () => {
    return(
        <div className='w-full flex flex-col items-center py-8 '>
            <div className='flex flex-wrap justify-between w-10/12 mb-8'>
                <a href="/" className='m-2'><img alt='telegram' className='h-10 w-auto duration-200 hover:scale-110' src={TelegramImg} /></a>
                <a href="/" className='m-2'><img alt='dappradar' className='h-10 w-auto duration-200 hover:scale-110' src={DappradarImg} /></a>
                <a href="/" className='m-2'><img alt='bscscan' className='h-10 w-auto duration-200 hover:scale-110' src={BscscanImg} /></a>
                <a href="/" className='m-2'><img alt='dapp' className='h-10 w-auto duration-200 hover:scale-110' src={DappImg} /></a>
                <a href="/" className='m-2'><img alt='hazecrypto' className='h-10 w-auto duration-200 hover:scale-110' src={HazecryptoImg} /></a>
                <a href="/" className='m-2'><img alt='techaudit' className='h-10 w-auto duration-200 hover:scale-110' src={TechauditImg} /></a>
            </div>
            <div className='font-bold text-gray-500'>
                © 2022 BNBSMARTSWAP. ALL RIGHTS RESERVED
            </div>
        </div>
    )
}

export default Footer;