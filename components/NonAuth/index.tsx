import React from 'react'
import styles from "./index.module.css";
function NonAuthCard(){
    return (
        <div className={`styles.non_auth_album_card w-full`}>
                        <div className="non_auth_card_thumb w-64 h-64 bg-white"></div>
                        <div className="non_auth_card_footer w-full h-16">
                            <span className="card__title w-16 bg-gray-300 h-6"></span>
                            <div className="card_artist"></div>
                            <div className="card_subtitle_secondary"></div>
                        </div>
                    </div>
    )
}
function NonAuth() {
  return (
    <div className={styles.non_auth_screen}>
        <div className={styles.non_auth_sidebar}>
            <div className="non_auth_sidebar_header px-3 py-3 mt-8">
                <ul className="flex flex-col gap-3 items-start">
                    <li className="flex items-center gap-2"><div className="non_auth_header_icon w-4 h-4 bg-green-300 rounded-full"></div> <span className="non_auth_header_title block w-32 h-2 bg-gray-300 rounded-full"></span></li>
                    <li className="flex items-center gap-2"><div className="non_auth_header_icon w-4 h-4 bg-gray-300 rounded-full"></div> <span className="non_auth_header_title block w-32 h-2 bg-gray-300 rounded-full"></span></li>
                    <li className="flex items-center gap-2"><div className="non_auth_header_icon w-4 h-4 bg-gray-300 rounded-full"></div> <span className="non_auth_header_title block w-32 h-2 bg-gray-300 rounded-full"></span></li>
                </ul>
            </div>

            <ul className="flex flex-col gap-8 items-start mt-16 px-3 py-3 mt-8">
                    <li className="flex items-center gap-2">
                        <span className="non_auth_header_title block w-32 h-2 bg-gray-300 rounded-full"></span></li>
                    <li className="flex items-center gap-2"> <span className="non_auth_header_title block w-32 h-2 bg-gray-300 rounded-full"></span></li>
                    <li className="flex items-center gap-2"> <span className="non_auth_header_title block w-32 h-2 bg-gray-300 rounded-full"></span></li>
                    <li className="flex items-center gap-2">
                        <span className="non_auth_header_title block w-32 h-2 bg-gray-300 rounded-full"></span></li>
                    <li className="flex items-center gap-2"> <span className="non_auth_header_title block w-32 h-2 bg-gray-300 rounded-full"></span></li>
                    <li className="flex items-center gap-2"> <span className="non_auth_header_title block w-32 h-2 bg-gray-300 rounded-full"></span></li>
                    <li className="flex items-center gap-2">
                        <span className="non_auth_header_title block w-32 h-2 bg-gray-300 rounded-full"></span></li>
                    <li className="flex items-center gap-2"> <span className="non_auth_header_title block w-32 h-2 bg-gray-300 rounded-full"></span></li>
                    <li className="flex items-center gap-2"> <span className="non_auth_header_title block w-32 h-2 bg-gray-300 rounded-full"></span></li>
                </ul>
        </div>
        <div className={styles.non_auth_main}>
            <div className="non_auth_header w-full flex justify-end px-5 py-3">
                <div className="non_auth_user flex items-center gap-2">
                    <div className="non_auth_user_avatar w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="non_auth_user_name w-32 h-2 bg-gray-200 rounded-full"></div>
                </div>
            </div>
            <div className="non_auth_body py-3 px-12 mt-12">
                <div className="non_auth_body_greeting w-64 h-3 bg-white overflow-auto"></div>
                <div className="non_auth_albums grid grid-cols-4 gap-6 my-16">
                    <NonAuthCard/>
                    <NonAuthCard/>
                    <NonAuthCard/>
                    <NonAuthCard/>
                </div>
                <div className="non_auth_albums grid grid-cols-4 gap-6 my-16">
                    <NonAuthCard/>
                    <NonAuthCard/>
                    <NonAuthCard/>
                    <NonAuthCard/>
                </div>
            </div>
        </div>

        <div className={styles.non_auth_player}>
        <div className="non_auth_player_track_info flex items-center gap-3">
            <div className="non_auth_track_cover w-12 h-12 bg-white"></div>
            <div className="non_auth_track_meta flex flex-col gap-3 items-start">
                <span className="non_auth_track__title block w-16 h-3 bg-white"></span>
                <span className="non_auth_track__subtitle w-32 h-3 bg-white"></span>
            </div>
        </div>

        <div className="non_auth_player_controls flex flex-col items-center gap-2">
            <div className="non_auth_player_controls_primary flex items-center gap-3">
            <div className="non_auth_back_btn w-6 h-6 bg-white rounded-full"></div>
            <div className="non_auth_play_btn w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="play_icon w-4 h-4 bg-black rounded-full">

                </div>
            </div>
            <div className="non_auth_next_btn w-6 h-6 bg-white rounded-full"></div>
            </div>
            <div className="non_auth_player_progress w-64 bg-gray-300 h-2 rounded-full">
                <div className="non_auth_player_progress_value w-16 h-full bg-green-300 rounded-full"></div>
            </div>
        </div>


        <div className="non_auth_player_right">
            <div className="non_auth_volume_icon"></div>
            <div className="non_auth_volume_progress">
                <div className="non_auth_volume_progress_value"></div>
            </div>
        </div>


        </div>
        <div className={`${styles.non_auth_overlay} w-full h-full fixed top-0 left-0 bottom-0 right-0 bg-gray-400 backdrop-blur-md`}>
            <div className={`${styles.login__box} bg-gray-900 rounded-xl`}>
                <div className="login_box_content text-center text-white px-3 py-12">
                    <div className="brand_logo flex w-full items-center justify-center">
                        <img src="/spotify.svg" alt="brand-logo" className='w-64'/>
                    </div>

                    <h3 className="text-5xl">Millions of Songs.</h3>
                    <h3 className="text-3xl mt-2">Free on Spotify.</h3>
                    <a href="https://spotify-356307.el.r.appspot.com">
                    <button className="login_btn bg-green-600 px-3 w-64 py-3 rounded-full my-3 text-black font-bold">
                        <span>Log in</span>
                    </button>
                    </a>
                    <span className="block text-sm text-gray-200">Don`t have an account? <a href="#" className='uppercase underline text-xl text-white'>SIGNUP</a></span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NonAuth