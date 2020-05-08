

const extractValueFromArrObj = (arr, key, except) => {
    const listEmail = arr.map(item => {
        if(except[key] !== item[key]) {
            return item[key]
        } else {
            return ''
        }
    })
    return listEmail
}


export {extractValueFromArrObj}