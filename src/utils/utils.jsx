
  export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  
  export const getNonNullValue = (value) => {
    if (value != "") {
      return value;
    } else {
      return undefined;
    }
  };
  
  export function filterEmptyFields(object) {
    Object.keys(object).forEach((key) => {
      if (empty(object[key])) {
        delete object[key];
      }
    });
    return object;
  }
  
  export function empty(value) {
    return value === "" || value === null || value === undefined || value === "undefined";
  }
  
  export const isImage = (file) => {
    const validImageTypes = ["image/gif", "image/jpeg", "image/jpg", "image/png"];
    if (validImageTypes.includes(file.file.type)) return true;
    return false;
  };
  
  export const isVideo = (file) => {
    const validVideoTypes = ["video/webm", "video/mp4"];
    if (validVideoTypes.includes(file.file.type)) return true;
    return false;
  };
  
  export const isPdf = (file) => {
    const validVideoTypes = ["application/pdf"];
    if (validVideoTypes.includes(file.file.type)) return true;
    return false;
  };
  
  export const randomString = (length) => {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  
  export const capitalize = ( string ) => {
    const removedSpecialCharacters = string.replace( /[^a-zA-Z0-9]/g, " " )
  
    const splitWords = removedSpecialCharacters.split( ' ' )
    const capitalized = splitWords.map( ( dt ) => `${ dt[ 0 ].toUpperCase() }${ dt.substring( 1 ) }` )
  
    return capitalized.join( " " )
  }

  export const dateHandle = (date) => {
    const newDate = date
      ? new Date(date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];
    return newDate;
  };

  export const ghrapDate = ( date ) => {
    const newDate = new Date( date );
    var mS = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    console.log( newDate.getDate(), mS[ newDate.getMonth() ] );
  
    return `${ newDate.getDate() } ${ mS[ newDate.getMonth() ] }`;
  };

  