import React from 'react'
import styles from "./Player.module.css"
import {IoMdPause, IoMdPlay} from "react-icons/io";
import {TbMicrophone2} from "react-icons/tb";
import {connect} from "react-redux"
import playSong from "../../utils/play_song"
import playNext from "../../utils/play-next"
import playPrev from "../../utils/play-prev"
import getDevices from "../../utils/get-devices"
import getPlayerState from "../../utils/get-player-state"
import pauseSong from "../../utils/pause-song"
import resumeSong from "../../utils/resume-song"
import changeVolume from "../../utils/change-volume"
import ConnectIcon from "../Icons/ConnectIcon"
import ComputerIcon from "../Icons/ComputerIcon"
import MobileIcon from "../Icons/MobileIcon"
import transferPlayback from "../../utils/transfer-playback"
import FullScreen from "../FullScreen/FullScreen";
function Player({recents,devices,setDevices,player_state,setPlayerState,setFullScreen,fullscreen}) {
    const [play,setPlay] = React.useState(false);
    const [alreadyPlayed,setAlreadyPlayed] = React.useState(false);
    const [coverExpand,setCoverExpand] = React.useState(false);
    const [volume,setVolume] = React.useState(50);
    const [device_toggle,setDeviceToggle] = React.useState(false);
    const tracks = recents && recents.items && recents.items.filter((v,i,a)=>a.findIndex(t=>(t.track.id === v.track.id))===i).map((recent)=>recent.track.uri);
    console.log(tracks)
    console.log("Devices",devices)
    console.log("Player State",player_state)

    const player_device = player_state.device.id; 
    const this_device_id = localStorage.getItem('DEVICE_ID');
    let device_id = this_device_id===player_device.id ? this_device_id : player_device;
    const handlePlay = ()=>{
        !alreadyPlayed?playSong(tracks,device_id).then((feedback)=>{
            console.log(feedback)
            setPlay(true)
            setAlreadyPlayed(true)
        }).catch(e=>console.log(e)):handleResume()
    }


    React.useEffect(()=>{
        if(player_state && player_state.is_playing){
            setPlay(true)
            setAlreadyPlayed(true)
        }
    },[player_state])

    // handle play for artist


    

    const handleNext = ()=>{
        playNext().then((feedback)=>{
            console.log(feedback)
        }).catch((e)=>{
            console.log(e);
        })
    }

    const handlePrevious = ()=>{
        playPrev().then((feedback)=>{
            console.log(feedback)
        }).catch((e)=>{
            console.log(e);
        })
    }

    const refresh_devices = async ()=>{
        let devices = await getDevices();
        setDevices(devices.devices);
        let player_state= await getPlayerState();
        setPlayerState(player_state)
    }

    const handlePause = ()=>{
        pauseSong().then((feedback)=>{
            console.log(feedback)
            setPlay(false)
        }).catch((e)=>{
            console.log(e);
        })
        
    }

    const handleResume = ()=>{
        resumeSong().then((feedback)=>{
            console.log(feedback)
            setPlay(true)
        }).catch((e)=>{
            console.log(e);
        })
    }


    const handleVolume = (e)=>{
        setVolume(e.target.value);
        changeVolume(volume).then((feedback)=>{
            console.log(feedback)
        }).catch((e)=>{
            console.log(e);
        })
    }

    const handleTransferPlayback = (id)=>{
        transferPlayback(id).then((done)=>{
            if(done){
                console.log("Transfer Successful")
            }
            else{
                console.log('There was an error')
            }
        })
    }

    const handleFullScreen = async ()=>{
        let player_state= await getPlayerState();
        setFullScreen(player_state)
    }
  return (

    <div className={`${styles.player} bg-gray-900 flex items-center justify-between px-3 py-6 text-white`} id="player">
        {fullscreen && <FullScreen/>}
        <div className="player__left flex items-center gap-3">
            <div className={`${styles.track_absolute_cover} ${coverExpand && styles.cover_big} w-32 h-32 bg-gray-400 shadow-md rounded-md`} id="absolute_cover" style={{
                backgroundSize:"cover"
            }}>

<button className="cover-expand-icon absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center" onClick={()=>setCoverExpand(false)}>
                    <img src="/img/arrow_expand.svg" alt="expand-icon" className='w-3 h-3' style={{
                        transform:`rotate(0deg)`
                    }}/>
                </button>
            </div>
             <div className={`${coverExpand && styles.cover_small_disabled} relative rounded-sm player__song_cover w-12 h-12 bg-white" id="track_cover`} style={{
                backgroundSize:"cover"
                
            }}
            id="track_cover"
            >
                <button className="cover-expand-icon absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center" onClick={()=>setCoverExpand(true)}>
                    <img src="/img/arrow_expand.svg" alt="expand-icon" className='w-3 h-3' style={{
                        transform:`rotate(180deg)`
                    }}/>
                </button>
            </div>
            <div className="player__song_info">
                <h3 id="track_name">...</h3>
                <p id="artist_name" className='text-sm text-gray-200/60'>...</p>
            </div>
            <button>
                <img src="/img/spotify_heart_filled.svg" alt="heart-icon" />
            </button>
        </div>

        <div className="player__center">
            <div className="player__controls__buttons">
                <ul className="flex items-center gap-3">
                    <li><button><img src="/img/shuffle_active.svg" alt="shuffle_icon" /></button></li>
                    <li><button onClick={handlePrevious}><img src="/img/prev__icon.svg" alt="previous_icon" /></button></li>
                    <li><button className='w-12 h-12 bg-white rounded-full text-black flex items-center justify-center' onClick={!play ?handlePlay:handlePause}>{play ?<IoMdPause/>:<IoMdPlay/>}</button></li>
                    <li><button onClick={handleNext}><img src="/img/next__icon.svg" alt="next_icon" /></button></li>
                    <li><button><img src="/img/repeat_active.svg" alt="repeat_icon" /></button></li>
                </ul>
            </div>
            {/* <div className="player__track__progress">
                <div className="player__track_progress__value"></div>
            </div> */}
        </div>

        <div className="player__right flex items-center gap-3">
            <button className="lyric_btn"><TbMicrophone2/></button>
            <button className="lyric_btn"><img src="/img/queue.svg" alt="queue_icon" /></button>
            <button className="device_btn relative" onClick={()=>{
                setDeviceToggle(!device_toggle)
                refresh_devices();
            }}>
                <img src="/img/devices.svg" alt="device_icon" />
                <div className={`${styles.device_container} ${device_toggle && styles.device_container_enable} absolute bg-green-400 py-6 px-3 rounded-md`}>
                    <div className="device__header flex flex-col items-center">
                        <h3 className="text-2xl mb-5">Connect to a device</h3>
                        <div className="device__image">
                            <img src="/img/devices.png" alt="devices" />
                        </div>
                    </div>
                    {devices && <div className={`${styles.device_list} flex flex-col gap-3 items-start mt-6`}>
                        {devices.map((device,i)=>{
                            return <div key={i} className={`${styles.device_item} flex items-center gap-3 bg-black w-full rounded-md`} id={device.id} onClick={()=>handleTransferPlayback(device.id)}>
                            <div className={`${styles.device_icon} px-3 flex items-center justify-center`}>
                                {device.type!=="Smartphone"?<ComputerIcon/>:<MobileIcon/>}
                            </div>
                            {player_state && <div className="device_meta flex flex-col items-start">
                                <h3 className="text-md">{device.id!==player_state.device.id?device.name:"Listening on"}</h3>
                                <p className={`flex items-center gap-1 text-sm ${device.id===player_state.device.id?"text-green-300":"text-gray-300"}`}><ConnectIcon/>{device.id!==player_state.device.id?"Spotify connect":"on this "+device.type}</p>
                            </div>}
                        </div>
                        })}
                        
                      
                        
                    </div>}
                </div>
                </button>
            <div className="volume__control flex items-center gap-3">
                <button><img src="/img/speaker.svg" alt="speaker_icon" /></button>
                <div className={`${styles.custom_slider} relative`}>
                    <div className={styles.slider_bar}>
                        <div className={styles.volume_fill} style={{
                            width:`${volume}%`
                        }}></div>
                    </div>
                <input type="range" className={styles.volume_slider} min="0" max="100" value={volume} onChange={handleVolume}/>
                </div>
            </div>
            <button onClick={handleFullScreen}><img src="/img/fullscreen.svg" alt="fullscreen_icon" /></button>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
    recents:state.appReducer.recents,
    devices:state.appReducer.devices,
    player_state:state.appReducer.player_state,
    fullscreen:state.appReducer.fullscreen
})

const mapDispatchToProps = (dispatch) => ({
    
    setDevices:(devices)=>dispatch({type:"SET_DEVICES",devices}),
    setPlayerState:(player_state)=>dispatch({type:"SET_PLAYER_STATE",player_state}),
    setFullScreen:(full_screen)=>dispatch({type:"SET_FULL_SCREEN",full_screen}),
  });

export default connect(mapStateToProps,mapDispatchToProps)(Player)