import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import defaultPhoto from '../../assets/img/defaultPhoto.png';
import RacoonPNG from "../../assets/img/racoon.png";
import RakunsoftPNG from "../../assets/img/logo.png";
import { AiFillFolderAdd, AiFillFileAdd, AiFillFolder, AiFillFile } from "react-icons/ai";
import { Button } from '@mui/material';
import UserProfileMenu from '../UserProfileMenu/UserProfileMenu';

const navigation = [
  { name: 'Panel', href: '/dashboard', current: true },
  { name: 'Kategoriler', href: '/categories', current: false },
  { name: 'Ürünler', href: '/products', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  return (
    <div className='w-full h-[58px] bg-white drop-shadow-md px-5 py-2 flex flex-row items-center justify-between'>
      <div className='flex flex-row gap-x-4 items-center'>
        <div className='flex flex-row gap-x-3 items-center'>
          <img src={RacoonPNG} width={45} height={45} />
          <h1 className='text-center text-amber-900 font-sans font-semibold'>RAKUNFOST</h1>
        </div>
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
