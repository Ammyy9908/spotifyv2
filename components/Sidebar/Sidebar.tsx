import React from 'react'
import { connect } from 'react-redux';
import styles from "./Sidebar.module.css";


function SidebarNavItem({image,text}){
    return (<li className='flex items-center text-gray-300 hover:text-white w-full font-semibold text-sm'><a href="#" className='flex items-center gap-6 w-full'>
        <img src={image} alt="nav-item-icon" width="28" height={'28'}/>
        <span className='hidden xl:block'>{text}</span>
        </a></li>)
}
function Sidebar({playlists}) {
  console.log(playlists)
  return (
    <div className={`sidebar bg-black`}>
        
            <ul className="sidebar_header_list flex flex-col gap-6 items-start py-4 px-5 mt-12">
                <SidebarNavItem image={'/img/spotify_home.svg'} text="Home"/>
                <SidebarNavItem image={'/img/spotify_search.svg'} text="Search"/>
                <SidebarNavItem image={'/img/spotify_library.svg'} text="Your Library"/>
                
            </ul>
            <ul className="sidebar_header_list flex flex-col gap-6 items-start py-4 px-5 mt-2">
                <SidebarNavItem image={'/img/spotify_playlist.svg'} text="Create Playlist"/>
                <SidebarNavItem image={'/img/spotify_like.png'} text="Liked Songs"/>
                
            </ul>
            <div className={`${styles.divider} bg-gray-700`}></div>

            {playlists && <div className={`${styles.playlist__list} text-gray-300 px-5  mt-5 overflow-y-scroll`}>
                
                
                {
                  playlists.items.map((playlist,i)=>{
                    return <div className="playlist_item py-1" key={i}><p className='text-sm'>{playlist.name}</p></div>
                  })
                }
            </div>}
        
    </div>
  )
}

const mapStateToProps = (state) => ({
  playlists: state.appReducer.playlists
})
export default connect(mapStateToProps,null)(Sidebar)