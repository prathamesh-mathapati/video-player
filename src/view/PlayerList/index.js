import React from 'react'
import './style.css'
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import { OrderOfvideos } from '../OrderOfvideos';
import { DndContext, closestCorners } from '@dnd-kit/core';
export const PlayerList = props => {
  const { setVideoData, mediaJSON ,setMediaJSON} = props
  // console.log(closestCorners)

  return (
    <div className='player-list'>
      <h3 className='player-list-header '>Player List</h3>

<div className='player-list-main'>
      {mediaJSON &&
        mediaJSON.map((item, index) => {
          return  <OrderOfvideos item={item} id={index} setVideoData={setVideoData} mediaJSON={mediaJSON} key={index} setMediaJSON={setMediaJSON}/>
        })}
      </div>
    </div>
  )
}
