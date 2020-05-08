

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

const replaceImageWithDiv = (content) => {
    const imageInList = `<div class="chip">
        <div class="chip-head"><i class="fa fa-file-image-o" aria-hidden="true"></i>
        </div>
        <div class="chip-content">Image</div>
        </div>`;
    return content.replace(/<img[^>]*src=\"?([^\"]*)\"?([^>]*alt=\"?([^\"]*)\"?)?[^>]*>/g, imageInList);
}


export {extractValueFromArrObj, replaceImageWithDiv}