import React, { useRef, useState } from 'react'
import './style.css'
import { PlayerList } from '../PlayerList'
import { HiMiniSpeakerWave } from 'react-icons/hi2'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa6'
import { IoVolumeMute } from 'react-icons/io5'
import { IoIosSkipBackward, IoIosSkipForward } from 'react-icons/io'

import {
  BiSolidSkipNextCircle,
  BiSolidSkipPreviousCircle
} from 'react-icons/bi'
import { mediaJSON } from '../../data'
import { DndContext, closestCorners } from '@dnd-kit/core'

export const MainVideo = () => {
  const videoRef = useRef(null)
  const [videoData, setVideoData] = useState({
    ...mediaJSON.categories[0].videos[0],
    index: 0
  })
  const [videoObj, setVideoObj] = useState({
    videoPause: true,
    videoMute: true,
    videoProgressBar: 0,
    time: '00:00',
    totleTime: '00:00'
  })
  const [showSpeed, setShowSpeed] = useState(false)
  const handelVidoePause = () => {
    videoRef.current.paused
      ? videoRef.current.play()
      : videoRef.current.pause()
    setVideoObj({ ...videoObj, videoPause: videoRef.current.paused })
  }
  const handleMute = () => {
    videoRef.current.muted = videoObj.videoMute
    setVideoObj({ ...videoObj, videoMute: !videoObj.videoMute })
  }
  const handleProgressBar = e => {
    const { currentTime, duration } = e.target
    const percent = currentTime / duration * 100

    setVideoObj({
      ...videoObj,
      videoProgressBar: percent,
      time: forTimer(currentTime),
      totleTime: forTimer(e.target.duration)
    })
  }
  const handleSkip = stutes => {
    if (stutes) {
      videoRef.current.currentTime -= 5
    } else {
      videoRef.current.currentTime += 5
    }
  }

  const handleValumeChenge = e => {
    // console.log('mkmkmk', e.target.value, e.target.value == 0)
    // if (e.target.value == 0) {
    //   videoRef.current.muted = videoObj.videoMute
    //   setVideoObj({ ...videoObj, videoMute: !videoObj.videoMute })
    // }
  }
  const handlespeed = speed => {
    setShowSpeed(!showSpeed)
    videoRef.current.playbackRate = speed
  }
  // console.log(videoObj)
  const handleminmize = () => {
    videoRef.current.requestPictureInPicture()
  }

  const handleFullScreen = () => {
    videoRef.current.requestFullscreen()
  }

  const handleProgressBartimer = e => {
    console.log(e.offsetX / e.target.clientWidth * videoRef.current.duration)
    // videoRef.current.currentTime = 0
  }

  const forTimer = time => {
    let sec = Math.floor(time % 60),
      min = Math.floor(time / 60) % 60,
      hours = Math.floor(time / 3600)

    sec = sec < 10 ? `0${sec}` : sec
    min = min < 10 ? `0${min}` : min
    hours = hours < 10 ? `0${hours}` : hours

    if (hours == 0) {
      return `${min}:${sec}`
    }
    return `${hours}:${min}:${sec}`
  }

  React.useEffect(
    () => {
      setVideoObj({
        videoPause: true,
        videoMute: true,
        videoProgressBar: 0,
        time: '00:00',
        totleTime: '00:00'
      })
      // console.log(videosData)
    },
    [videoData]
  )

  const videoEndhandle = () => {
    setVideoData({
      ...mediaJSON.categories[0].videos[videoData.index + 1],
      index: videoData.index + 1
    })

    // handelVidoePause()
    let playPromise = videoRef.current.play()

    if (playPromise !== undefined) {
      playPromise
        .then(_ => {
          // Automatic playback started!
          // Show playing UI.
          videoRef.current.play()
          setVideoObj({ ...videoObj, videoPause: videoRef.current.paused })
        })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
          videoRef.current.pause()
          setVideoObj({ ...videoObj, videoPause: videoRef.current.paused })
        })
    }
  }
  return (
    <div className='main-videos'>
      <div className='main-full-videos vt-1'>
        <div className='video-main-play'>
          <video
            src={`${videoData.sources[0]}`}
            className='main-thumb'
            ref={videoRef}
            onTimeUpdate={handleProgressBar}
            onEnded={videoEndhandle}
            autoPlay
          />
          <div className='video-player-control-bar'>
            <div
              className='video-player-progress-bar-main'
              onClick={handleProgressBartimer}
            >
              {' '}<div
                className='video-player-progress-bar-main-b'
                style={{ width: `${videoObj.videoProgressBar}%` }}
              />
            </div>
            <div className='video-player-control'>
              <div className='frist-control-section'>
                <div className='video-player-audio-speaker'>
                  {videoObj.videoMute
                    ? <HiMiniSpeakerWave
                      className='speaker-incon'
                      onClick={handleMute}
                      />
                    : <IoVolumeMute
                      className='speaker-incon'
                      onClick={handleMute}
                      />}
                  <input
                    type='range'
                    min='0'
                    max='1'
                    onChange={handleValumeChenge}
                  />
                </div>
                <div className='timer-video'>
                  {videoObj.time}/{videoObj.totleTime != 'NaN:NaN:NaN'
                    ? videoObj.totleTime
                    : '00:00'}
                </div>
              </div>
              <div className='secont-control-section'>
                <IoIosSkipBackward
                  className='arrow'
                  onClick={() => handleSkip(true)}
                />
                {videoObj.videoPause
                  ? <FaPlay className='play-icon' onClick={handelVidoePause} />
                  : <FaPause
                    className='play-icon'
                    onClick={handelVidoePause}
                    />}

                <IoIosSkipForward
                  className='arrow'
                  onClick={() => handleSkip(false)}
                />
              </div>
              <div className='third-control-section'>
                <div class='dropdown'>
                  <span onClick={() => setShowSpeed(!showSpeed)}>Speed</span>
                  {showSpeed &&
                    <div class='dropdown-content'>
                      <p onClick={() => handlespeed(0.5)}>0.5x</p>
                      <p onClick={() => handlespeed(0.75)}>0.75x</p>
                      <p onClick={() => handlespeed(1)}>1x</p>
                      <p onClick={() => handlespeed(1.5)}>1.5x</p>
                      <p onClick={() => handlespeed(2)}>2x</p>
                    </div>}
                </div>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  onClick={handleminmize}
                >
                  {' '}<path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM6 5H18C18.5523 5 19 5.44772 19 6V12.2676C18.7058 12.0974 18.3643 12 18 12H14C12.8954 12 12 12.8954 12 14V18C12 18.3643 12.0974 18.7058 12.2676 19H6C5.44772 19 5 18.5523 5 18V6C5 5.44772 5.44772 5 6 5Z'
                    fill='currentColor'
                  />{' '}
                </svg>

                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  onClick={handleFullScreen}
                >
                  {' '}<path
                    d='M20 16H18C16.8954 16 16 16.8954 16 18V20'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />{' '}
                  <path
                    d='M4 8H6C7.10457 8 8 7.10457 8 6V4'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />{' '}
                  <path
                    d='M4 16H6C7.10457 16 8 16.8954 8 18V20'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />{' '}
                  <path
                    d='M20 8H18C16.8954 8 16 7.10457 16 6V4'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />{' '}
                </svg>
              </div>
            </div>
          </div>
        </div>
        <h1>
          {videoData.title}
        </h1>
        <p className='descriptions'>
          {videoData.description}
        </p>
      </div>

      <div className='vt-1'>
        <DndContext collisionDetection={closestCorners}>
          {' '}<PlayerList
            mediaJSON={mediaJSON.categories[0].videos}
            setVideoData={setVideoData}
          />
        </DndContext>
      </div>
    </div>
  )
}
