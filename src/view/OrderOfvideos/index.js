import React from 'react'

let sourceElement = null
export const OrderOfvideos = ({ id, item, setVideoData,mediaJSON,setMediaJSON }) => {


    //   remember the source item for the drop later */
  const handleDragStart = (event) => {
    event.target.style.opacity = 0.5
    sourceElement = event.target
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move' 
  }

  const handleDragEnter = (event) => {
    event.target.classList.add('over')    
  }

  const handleDragLeave = (event) => {
    event.target.classList.remove('over')
  }

  const handleDrop = (event) => {
    /* prevent redirect in some browsers*/
    event.stopPropagation()
    if (sourceElement !== event.target) {
        // console.log(sourceElement);
      /* remove dragged item from list */
      const list = mediaJSON.filter((item, i) => 
        i.toString() !== sourceElement.id)
      /* this is the removed item */
      const removed = mediaJSON.filter((item, i) => 
        i.toString() === sourceElement.id)[0]
      /* insert removed item after this number. */
      let insertAt = Number(event.target.id)
      let tempList = []

      /* if dropped at last item, don't increase target id by +1. 
         max-index is arr.length */
      if (insertAt >= list.length) {
        tempList = list.slice(0).concat(removed)
        setMediaJSON(tempList)
        event.target.classList.remove('over')
      } else
      if ((insertAt < list.length)) {
      /* original list without removed item until the index it was removed at */
        tempList = list.slice(0,insertAt).concat(removed)

        // console.log('tempList', tempList)
        // console.log('insert the rest: ', list.slice(insertAt))

        /* add the remaining items to the list */
        const newList = tempList.concat(list.slice(
          insertAt))
        // console.log('newList', newList)

        /* set state to display on page */
        setMediaJSON(newList)
        event.target.classList.remove('over')
      }
    }
    else console.log('nothing happened')
    event.target.classList.remove('over') 
  }

  const handleDragEnd = (event) => {
    event.target.style.opacity = 1
    // console.log('-------------------------------------------------------------')
  }
  const handleChange = (event) => {
    event.preventDefault()
    // console.log('event.target.value', event.target.value)

    /* create new list where everything stays the same except that the current
    item replaces the existing value at this index */
    // const list = mediaJSON.map((item, i) => {
    //   if (i !== Number(event.target.id)) { 
    //     return item }
    //   else return event.target.value   
    // })
    // setMediaJSON(list)
  }
    return (
        <div
            className='player-list-header-map vt-1'
            onClick={() => (setVideoData({ ...item, id }))}
            draggable='true' 
          onDragStart={handleDragStart} 
          onDragOver={handleDragOver} 
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          onChange={handleChange}
          id={id}
        >
            <img
                src={`https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${item?.thumb}`}
                className='player-list-thumb'
                id={id}
            />
            <h4>
                {item?.title}
            </h4>
        </div>)
}
