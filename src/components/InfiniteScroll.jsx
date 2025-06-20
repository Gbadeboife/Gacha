
import React, { useCallback, useEffect, useRef, memo, useState } from 'react';

// example below this file

const InfiniteScroll = ( {
  data,
  children,
  height,
  next,
  pageSize,
  nextCursor,
  className,
  setPageSize,
  setNextCursor,
  currentCursor,
  setData
} ) => {
  const [ initialized, setInitialized ] = useState( false )

  const scrollRef = useInfiniteScroll( () => {
    // logic for loading more data here
    if ( nextCursor === 0 ) {
      return
    } else {
      next( true, nextCursor )
    }
  } );

  const onUpdatePageSize = useCallback( ( size ) => {

    setPageSize( size )
    setData( () => [] )

    setNextCursor( () => null )
    setInitialized( true )
  }, [ initialized, pageSize, data, nextCursor ] )

  useEffect( () => {
    if ( !initialized ) {
      next( initialized, null )
      setInitialized( true )
    }
  }, [ initialized ] );

  return (
    <div>

      <div ref={ scrollRef } style={ { overflow: 'auto', maxHeight: height } } className={ `border-2 border-blue-600 ${ className }` }>
        { children }
      </div>
      <div className="mt-2">
        {/* <span>
            Page{" "}
            <strong>
              {+currentPage} of {pageCount}
            </strong>{" "}
          </span> */}
        <select
          className="mt-2"
          value={ pageSize }
          onChange={ ( e ) => {
            onUpdatePageSize( Number( e.target.value ) );
          } }
        >
          { [ 5, 10, 20, 30, 40, 50 ].map( ( pageSize ) => (
            <option key={ pageSize } value={ pageSize }>
              Show { pageSize }
            </option>
          ) ) }
        </select>
      </div>
    </div>
  );
}

export default memo( InfiniteScroll )

function useInfiniteScroll ( callback ) {
  const scrollRef = useRef( null );

  useEffect( () => {
    const handleScroll = () => {
      const scrollElement = scrollRef.current;
      if ( scrollElement.scrollTop + scrollElement.clientHeight >= scrollElement.scrollHeight ) {
        callback();
      }
    };

    const scrollElement = scrollRef.current;
    scrollElement.addEventListener( 'scroll', handleScroll );

    return () => {
      scrollElement.removeEventListener( 'scroll', handleScroll );
    };
  }, [ callback ] );


  return scrollRef;
}


// NEXT Function example
// const next = useCallback( ( initialized, cursor ) => {
//   ( async () => {
//     try {
//       console.log( initialized)
//       sdk.setTable( "user" )
//       const result = await sdk.callRestAPI( { limit: pageSize, cursor: cursor }, "CURSORPAGINATE" )
//       console.log( result )
//       if ( !result.error ) {
//         if ( !initialized ) {
//           setCursorPaginateData( () => [ ...result?.list ] )
//           // setInitialized( true )
//           console.log( "Not initialized" )
//         } else {
//           setCursorPaginateData( ( prev ) => [ ...prev, ...result?.list ] )
//           console.log( " initialized" )
//         }
//         setCurrentCursor( result?.cursor )
//         // setPageSize( result?.limit )
//         setNextCursor( result?.nextCursor )
//       }
//     } catch ( error ) {

//     }
//   } )()
// }, [ nextCursor, currentcursor, pageSize ] )

// Example Usage
{/* <InfiniteScroll
height={ `100px` }
className={ `` }
next={ next }
pageSize={ pageSize }
currentCursor={ currentcursor }
nextCursor={ nextCursor }
setData={ setCursorPaginateData }
data={ cursorPaginateData }
setNextCursor={ setNextCursor }
setPageSize={ setPageSize }
>
<ul>
  { cursorPaginateData.length ? cursorPaginateData.map( ( data, index ) => (
    <li key={ index }>{ index + 1 } { data?.last_name } { data?.first_name }</li>
  ) ) : null }
</ul>
</InfiniteScroll> */}

