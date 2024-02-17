import React from 'react'
import './style.css'
import { SortableContext } from '@dnd-kit/sortable'

export const PlayerList = props => {
  const { setVideoData, mediaJSON } = props
  // console.log(mediaJSON)

  return (
    <div className='player-list'>
      <h3 className='player-list-header '>Player List</h3>

      {mediaJSON &&
        mediaJSON.map((item, index) => {
          return (
            <div
              className='player-list-header-map vt-1'
              onClick={() => setVideoData({ ...item, index })}
            >
              <img
                src={`https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${item.thumb}`}
                className='player-list-thumb'
              />
              <h4>
                {item.subtitle}
              </h4>
            </div>
          )
        })}
    </div>
  )
}
