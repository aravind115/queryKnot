import  { ReactNode } from 'react';
interface NavLayoutProps{
    children:ReactNode;
}
const NavLayout=({children}:NavLayoutProps)=>{
return(  
<div>   
<nav className="topNavContainer">
<div className="topNavInnerContainer">
    <div className="brand">
        <img src={"https://www.techmango.net/wp-content/uploads/2021/06/Techmango-Horizontal-Logo-White.png"} alt="SQL Designer Logo" className="w-32 mr-2"/>
    </div>
    <div className="secondary-actions hidden md:flex">
        {/* <div className="topNavItem">
          <InboxArrowDownIcon className="h-6 w-6"/>
        </div>
        <div className="topNavItem">
          <ArrowUpTrayIcon className="h-6 w-6"/>
        </div>
        <div className="topNavItem">
          <ArrowDownTrayIcon className="h-6 w-6"/>
        </div>
        <div className="topNavItem">
          <PlayIcon className="h-6 w-6"/>
        </div>
        <div className="topNavItem">
          <span className="text-platinum hover:text-ceruleanBlue">Help/Feedback</span>
        </div> */}
    </div>
</div>
</nav>
<main>
    {children}
</main>
</div>)
}
export default NavLayout