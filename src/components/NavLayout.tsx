import  { ReactNode } from 'react';
import AppLogo from "../assets/image_2.png"
import { InboxArrowDownIcon,ArrowUpTrayIcon,ArrowDownTrayIcon, PlayIcon } from '@heroicons/react/24/solid'

interface NavLayoutProps{
    children:ReactNode;
}
const NavLayout=({children}:NavLayoutProps)=>{
return(  
<div>   
<nav className="bg-deepSpace text-platinum border-solid border-1 border-gunmetal shadow-custom">
<div className="container mx-auto px-4 py-2 flex justify-between items-center">
    <div className="brand">
        <img src={AppLogo} alt="SQL Designer Logo" className="w-40 mr-2"/>
    </div>
    <div className="secondary-actions hidden md:flex">
        <div className="mr-4 cursor-pointer hover:text-ceruleanBlue ">
          <InboxArrowDownIcon className="h-6 w-6"/>
        </div>
        <div className="mr-4 cursor-pointer hover:text-ceruleanBlue">
          <ArrowUpTrayIcon className="h-6 w-6"/>
        </div>
        <div className="mr-4 cursor-pointer hover:text-ceruleanBlue">
          <ArrowDownTrayIcon className="h-6 w-6"/>
        </div>
        <div className="mr-4 cursor-pointer hover:text-ceruleanBlue">
          <PlayIcon className="h-6 w-6"/>
        </div>
        <div className="mr-4 cursor-pointer hover:text-ceruleanBlue">
          <span className="text-platinum hover:text-ceruleanBlue">Help/Feedback</span>
        </div>
    </div>
</div>
</nav>
<main>
    {children}
</main>
</div>)
}
export default NavLayout