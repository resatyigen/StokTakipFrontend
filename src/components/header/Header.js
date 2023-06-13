import RacoonPNG from "../../assets/img/racoon.png";
import { AiFillFolderAdd, AiFillFileAdd, AiFillFolder, AiFillFile } from "react-icons/ai";
import { Button } from '@mui/material';
import UserProfileMenu from '../UserProfileMenu/UserProfileMenu';
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className='w-full h-[58px] bg-white drop-shadow-md px-5 py-2 flex flex-row items-center justify-between'>
      <div className='flex flex-row gap-x-4 items-center'>
        <Link className='flex flex-row gap-x-3 items-center' to="/dashboard">
          <img src={RacoonPNG} width={45} height={45} />
          <h1 className='text-center text-amber-900 font-sans font-semibold'>RAKUNFOST</h1>
        </Link>
        <div className='flex flex-row gap-x-5 ml-12'>
          <Button variant="outlined" startIcon={<AiFillFolderAdd size={29} />} href='/dashboard/add-category'>Kategori Ekle</Button>
          <Button variant="outlined" startIcon={<AiFillFileAdd size={29} />} href='/dashboard/add-product'>Ürün Ekle</Button>
          <Button variant="outlined" startIcon={<AiFillFolder size={29} />} href='/dashboard/categories' >Kategori Listesi</Button>
          <Button variant="outlined" startIcon={<AiFillFile size={29} />} href='/dashboard/products'>Ürün Listesi</Button>
        </div>
      </div>
      <div>
        <UserProfileMenu />
        {/* <button className='bg-blue-400 p-4'></button> */}
      </div>
    </div>
  )
}
