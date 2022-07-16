import React from 'react'
import styles from "./Header.module.css";
import {HiStatusOffline} from 'react-icons/hi'
import useNetwork from "../../hooks/useNetwork"
import useAuth from '../../hooks/useAuth';
function Header() {
    const status = useNetwork();
    const [dropdown,setDropdown] = React.useState(false);

    console.log(dropdown)
    const user = useAuth();
    const name = user ? user.display_name:false;
    const url = user && user.images[0].url;
  return (
    <div className={`${styles.header} px-6 py-6 flex items-center justify-between`}>
        <div className="header_left flex items-center gap-6">
            <div className="header_controls flex items-center gap-2">
                <button className="p-3 bg-black w-8 h-8 flex items-center justify-center rounded-full"><img src="/img/spotify_back.svg" alt="back-icon" width={12} height={12}/></button>
                <button className='p-3 bg-black w-8 h-8 flex items-center justify-center rounded-full'><img src="/img/spotify_forward.svg" alt="forward-icon" width={12} height={12}/></button>
            </div>

            <div className={`${styles.header__searchbar} bg-white rounded-full relative`}>
                <div className={`${styles.search__icon} absolute`}>
                    <img src="/img/header_search.svg" alt="search-icon" width={21} height={21} />
                </div>
                <input type="text" placeholder='Artists,songs, or podcasts' className='w-full h-full pl-12 rounded-full'/>
            </div>
        </div>
        <div className="header_right flex items-center gap-5">
           {!status &&  <button className={`${styles.offline_status_btn} bg-blue-600 py-3 px-3 text-white flex items-center justify-center text-sm rounded-full relative`} tabIndex={1}>
                <HiStatusOffline/>
                <div className={`${styles.offline_status_info} absolute rounded-lg text-left`}>
                    <p style={{
                        width:'75%'
                    }} className="text-white/80 text-md">Make sure you`re online.Spotify works best without internet connection.</p>
                </div>
            </button>}
            <div className={`${styles.header_user} px-2 py-2 bg-black flex items-center rounded-full text-white gap-3 cursor-pointer relative`}  onClick={()=>{
                setDropdown(!dropdown)
            }}
            
            >
                <div className="header_user_avatar">
                    <img src={url} alt="user__avatar" width={22} height={22} className="rounded-full"/>
                </div>
                {user && <span>{name}</span>}
                <span style={{
                    transform:`${dropdown ? "rotate(180deg)":"rotate(0deg)"}`
                }}><img src="/img/dropdown.svg" alt="dropdown" /></span>

                {dropdown && <div className={`${styles.user_dropdown} absolute w-full py-3 px-2 bg-black top-12 left-1 rounded-lg`} style={{
                    zIndex:2
                }}>
                <ul>
                    <li className="py-2 hover:bg-green-600 rounded-md px-2"><a href="#">Account</a></li>
                    <li className="py-2 hover:bg-green-600 rounded-md px-2"><a href="#">Profile</a></li>
                    <li className="py-2 hover:bg-green-600 rounded-md px-2"><a href="#">Private session</a></li>
                    <li className="py-2 hover:bg-green-600 rounded-md px-2"><a href="#">Settings</a></li>
                </ul>
                <div className="divider w-full bg-green-600 my-2" style={{
                    height:"3px"
                }}></div>
                <ul>
                    <li className="py-2 hover:bg-green-600 rounded-md px-2"><button onClick={()=>{
                        localStorage.removeItem('access_token')
                        localStorage.removeItem('refresh_token')
                        window.location.reload()
                    }}>Logout</button></li>
                   
                </ul>
                </div>}
            </div>
        </div>
    </div>
  )
}

export default Header