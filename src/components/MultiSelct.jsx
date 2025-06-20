
import React, { useCallback } from 'react';
import { memo } from 'react'
import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid'


const MultiSelect = ( { label, options, selected, setSelected } ) => {

  const toggleOption = useCallback( ( option ) => {
    const temp = selected
    const index = temp.findIndex( ( i ) => i === option )
    if ( index > -1 ) {
      temp.splice( index, 1 )
      setSelected( () => [ ...temp ] )
    } else {
      temp.push( option )
      setSelected( () => [ ...temp ] )
    }
  }, [ selected ] )

  return (

    <div className={ `relative w - full group` }>
      <div className={ `border rounded - md border - [ #eeeeee ] text - [ 14px ] p - [ 10px ] flex justify - between items - center` }>
        <div>{ label }</div>
      </div>

      <div className={ `flex flex - wrap gap - 5 z - 10 w - full overflow - auto rounded - b - md bg - white text - base shadow - lg ring - 1 ring - black ring - opacity - 5 focus: outline - none sm: text - sm  left - 0 py - [ 5px ] px - 2 border border - [ #eeeeee ] list - none` }>
        { options.map( ( option, key ) => {
          const isSelected = selected.includes( option );
          return (
            <div key={ key } className={ `flex items - center justify - between py - [ 6px ] px - [ 10px ] cursor - pointer gap - y - 0 gap - x - [ 5px ] hover: bg - [#7d7dfa ] rounded - full w - fit ${ isSelected ? "bg-[#e25679]" : "bg-[#3c5ee1]" } ` } onClick={ () => toggleOption( option ) }>
              <span className={ `text - white` }>{ option }</span>
              { isSelected ?
                <CheckIcon className={ `h - 4 w - 6 text - white font - bold text - lg` } />
                : <PlusIcon className={ `h - 4 w - 6 text - white font - bold text - lg` } /> }
            </div>
          )
        } ) }
      </div>
    </div>
  )
}

export default memo( MultiSelect )
