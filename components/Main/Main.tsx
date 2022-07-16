import React from 'react'
import Header from '../Header/Header';
import styles from "./Main.module.css";
import ShortCutItem from "../ShortCutItem/ShortCutItem";
import ShowCard from "../ShowCard/ShowCard";
import { usePalette } from 'react-palette';
import {connect} from "react-redux"
import { IoMdPlay, IoMdPause } from "react-icons/io";
import PlayListCard from "../PlayListCard/PlayListCard";
import play from "../../utils/play"
import ArtistCard from "../ArtistCard/ArtistCard";
// import getPlayerState from "../../utils/get-player-state"
function Main({recents,favourite_artists,setCurrentSong,current_song,my_shows,open_data}) {
    console.log(recents)
    const [image,setImage] = React.useState('/img/album1.png');
    const [color,setColor] = React.useState('#262626')
    const { data, loading, error } = usePalette(image);

    
        React.useEffect(()=>{
            if(!loading){
                console.log(data);
            const {lightVibrant} = data;
           
            setColor(lightVibrant);
            return;
            }
        },[loading,data])
        
    
    const date = new Date();
    const h = date.getHours();
    

    const handlePlayArtist = async (uri)=>{
        play(uri).then(async (feedback)=>{
            console.log(feedback)
            setCurrentSong(uri)
        })
    }
  return (
    <div className={`${styles.main} relative`}>
        <div className={`${styles.main__content} `}>
        <Header/>
        <div className={`${styles.container} px-6 mt-6`}>
        <h1 className="text-white text-3xl font-semibold">Good {h<12 && "Morning"} {h>=12  && h<17 && "afternoon"} {h>=17 && "evening"}</h1>
        {recents && recents.items && <div className={`${styles.home_shortcuts} grid `}>
          

            {
                [
                    ...new Map(recents.items.map((shortcut) => [shortcut.track.name, shortcut])).values(),
                  ].slice(0,6).map(shortcut => {
                    return <ShortCutItem key={shortcut.id} image={shortcut.track.album.images[0].url} text={shortcut.track.name} id={shortcut.id} setImage={setImage} uri={shortcut.track.uri}/>
                })
            }
            
        </div>}

        <div className="grid_sections mt-32 mb-64">
            {favourite_artists && <div className="grid_section w-full mb-12">
                <div className="grid_section_header w-full flex items-center justify-between text-white mb-8">
                    <h3 className="text-2xl font-bold">Your favourite artists</h3>
                    <button className='uppercase text-sm text-gray-300'>see all</button>
                </div>
                <div className="grid_section_col grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                    
                    {
                        favourite_artists.artists.items.slice(0,10).map((artist,i)=>{
                            return <ArtistCard key={i} artist={artist} current_song={current_song} handlePlayArtist={handlePlayArtist}/>
                        })
                    }
                    
                    
                    
                   
                    
                </div>


            </div>}

            {my_shows && <div className="grid_section w-full  mb-12">
                <div className="grid_section_header w-full flex items-center justify-between text-white mb-8">
                    <h3 className="text-2xl font-bold">Your shows</h3>
                    <button className='uppercase text-sm text-gray-300'>see all</button>
                    </div>
                    <div className="grid_section_col grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                        {
                            my_shows.items.length>0 && my_shows.items.map((my_show,i)=>{
                                return <ShowCard my_show={my_show} key={i}/>
                            })
                        }
                    </div>


            </div>}


            {open_data && <div className="grid_section w-full mb-12">
                <div className="grid_section_header w-full flex items-center justify-between text-white mb-8">
                    <h3 className="text-2xl font-bold">{open_data.views[1].name}</h3>
                    <button className='uppercase text-sm text-gray-300'>see all</button>
                    </div>
                    <div className="grid_section_col grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                        {
                            open_data.views[1].content.items.length>0 && open_data.views[1].content.items.slice(0,5).map((view,i)=>{
                                return <PlayListCard view={view} key={i}/>
                            })
                        }
                    </div>


            </div>}

            {open_data && <div className="grid_section w-full mb-12">
                <div className="grid_section_header w-full flex items-center justify-between text-white mb-8">
                    <h3 className="text-2xl font-bold">{open_data.views[2].name}</h3>
                    </div>
                    <div className="grid_section_col grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                        {
                            open_data.views[2].content.items.length>0 && open_data.views[2].content.items.map((view,i)=>{
                                return <PlayListCard view={view} key={i}/>
                            })
                        }
                    </div>


            </div>}


            {open_data && <div className="grid_section w-full">
                <div className="grid_section_header w-full flex items-center justify-between text-white mb-8">
                    <h3 className="text-2xl font-bold">{open_data.views[3].name}</h3>
                    </div>
                    <div className="grid_section_col grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                        {
                            open_data.views[3].content.items.length>0 && open_data.views[3].content.items.map((view,i)=>{
                                return <PlayListCard view={view} key={i}/>
                            })
                        }
                    </div>


            </div>}

            {open_data && <div className="grid_section w-full mt-12">
                <div className="grid_section_header w-full flex items-center justify-between text-white mb-8">
                    <h3 className="text-2xl font-bold">{open_data.views[4].name}</h3>
                    </div>
                    <div className="grid_section_col grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                        {
                            open_data.views[4].content.items.length>0 && open_data.views[4].content.items.map((view,i)=>{
                                return <PlayListCard view={view} key={i}/>
                            })
                        }
                    </div>


            </div>}



            {open_data && <div className="grid_section w-full mt-12">
                <div className="grid_section_header w-full flex items-center justify-between text-white mb-8">
                    <h3 className="text-2xl font-bold">{open_data.views[5].name}</h3>
                    </div>
                    <div className="grid_section_col grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                        {
                            open_data.views[5].content.items.length>0 && open_data.views[5].content.items.map((view,i)=>{
                                return <PlayListCard view={view} key={i}/>
                            })
                        }
                    </div>


            </div>}


            {open_data && <div className="grid_section w-full mt-12">
                <div className="grid_section_header w-full flex items-center justify-between text-white mb-8">
                    <h3 className="text-2xl font-bold">{open_data.views[6].name}</h3>
                    </div>
                    <div className="grid_section_col grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                        {
                            open_data.views[6].content.items.length>0 && open_data.views[6].content.items.map((view,i)=>{
                                return <PlayListCard view={view} key={i}/>
                            })
                        }
                    </div>


            </div>}

            {open_data && <div className="grid_section w-full mt-12">
                <div className="grid_section_header w-full flex items-center justify-between text-white mb-8">
                    <h3 className="text-2xl font-bold">{open_data.views[7].name}</h3>
                    </div>
                    <div className="grid_section_col grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                        {
                            open_data.views[7].content.items.length>0 && open_data.views[7].content.items.map((view,i)=>{
                                return <PlayListCard view={view} key={i}/>
                            })
                        }
                    </div>


            </div>}
            {open_data && <div className="grid_section w-full mt-12">
                <div className="grid_section_header w-full flex items-center justify-between text-white mb-8">
                    <h3 className="text-2xl font-bold">{open_data.views[8].name}</h3>
                    </div>
                    <div className="grid_section_col grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                        {
                            open_data.views[8].content.items.length>0 && open_data.views[8].content.items.map((view,i)=>{
                                return <PlayListCard view={view} key={i}/>
                            })
                        }
                    </div>


            </div>}
            {open_data && <div className="grid_section w-full mt-12">
                <div className="grid_section_header w-full flex items-center justify-between text-white mb-8">
                    <h3 className="text-2xl font-bold">{open_data.views[9].name}</h3>
                    </div>
                    <div className="grid_section_col grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                        {
                            open_data.views[9].content.items.length>0 && open_data.views[9].content.items.map((view,i)=>{
                                return <PlayListCard view={view} key={i}/>
                            })
                        }
                    </div>


            </div>}

            {open_data && <div className="grid_section w-full mt-12">
                <div className="grid_section_header w-full flex items-center justify-between text-white mb-8">
                    <h3 className="text-2xl font-bold">{open_data.views[10].name}</h3>
                    </div>
                    <div className="grid_section_col grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                        {
                            open_data.views[10].content.items.length>0 && open_data.views[10].content.items.map((view,i)=>{
                                return <PlayListCard view={view} key={i}/>
                            })
                        }
                    </div>


            </div>}

            {open_data && <div className="grid_section w-full mt-12">
                <div className="grid_section_header w-full flex items-center justify-between text-white mb-8">
                    <h3 className="text-2xl font-bold">{open_data.views[11].name}</h3>
                    </div>
                    <div className="grid_section_col grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                        {
                            open_data.views[11].content.items.length>0 && open_data.views[11].content.items.map((view,i)=>{
                                return <PlayListCard view={view} key={i}/>
                            })
                        }
                    </div>


            </div>}
            {open_data && <div className="grid_section w-full mt-12">
                <div className="grid_section_header w-full flex items-center justify-between text-white mb-8">
                    <h3 className="text-2xl font-bold">{open_data.views[12].name}</h3>
                    </div>
                    <div className="grid_section_col grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                        {
                            open_data.views[12].content.items.length>0 && open_data.views[12].content.items.map((view,i)=>{
                                return <PlayListCard view={view} key={i}/>
                            })
                        }
                    </div>


            </div>}
            {open_data && <div className="grid_section w-full mt-12">
                <div className="grid_section_header w-full flex items-center justify-between text-white mb-8">
                    <h3 className="text-2xl font-bold">{open_data.views[13].name}</h3>
                    </div>
                    <div className="grid_section_col grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                        {
                            open_data.views[13].content.items.length>0 && open_data.views[13].content.items.map((view,i)=>{
                                return <PlayListCard view={view} key={i}/>
                            })
                        }
                    </div>


            </div>}
        </div>
        </div>
        </div>
        <div className={`${styles.home_gradient} w-full bg-black`} style={{
            backgroundColor:color
        }}></div>
    </div>
  )


}

const mapStateToProps  = (state)=>({
    recents: state.appReducer.recents,
    current_song: state.appReducer.current_song,
    favourite_artists: state.appReducer.favourite_artists,
    my_shows:state.appReducer.my_shows,
    open_data:state.appReducer.open_data,
})

const mapDispatchToProps = (dispatch) => ({
    
    setDevices:(devices)=>dispatch({type:"SET_DEVICES",devices}),
    setPlayerState:(player_state)=>dispatch({type:"SET_PLAYER_STATE",player_state}),
    setCurrentSong: (current_song) =>
    dispatch({ type: "SET_CURRENT_SONG", current_song })
  });
export default connect(mapStateToProps,mapDispatchToProps)(Main)