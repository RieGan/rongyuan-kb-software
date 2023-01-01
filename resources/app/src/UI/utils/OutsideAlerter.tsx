import React, { useRef, useEffect } from 'react'

// tslint:disable-next-line: only-arrow-functions
function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement>,
  clickOutsidHandle: () => void
) {
  useEffect(() => {
    // tslint:disable-next-line: only-arrow-functions
    function handleClickOutside(event: { target: any }) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target.className.includes('notoutside')
      ) {
        clickOutsidHandle()
      }
    }

    // Bind the event listener
    document.addEventListener('mouseup', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mouseup', handleClickOutside)
    }
  })
}

export const OutsideAlerter = (props: {
  children: any
  clickOutsideHandle: () => void
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  useOutsideAlerter(wrapperRef, props.clickOutsideHandle)

  return (
    <div style={{ width: '100%', height: '100%' }} ref={wrapperRef}>
      {props.children}
    </div>
  )
}
