export async function imageUpload(file) {
    const data = new FormData();
    data.append('file', file);
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

   return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: 'POST',
        body: data
    }).then(res => res.json())
    .then(data => data.url);
}

export async function imageDelete(id) {
    const deleteParams = {
        public_id: id
    } 
    try {
        fetch(process.env.REACT_APP_CLOUDINARY_URL, {
            method: 'DELETE',
            body: JSON.stringify(deleteParams),
        }).then(res => {
            if(res.ok) {
                console.log('삭제 성공')
            }
        })
    }catch(error) {
        console.log(error)
    }
}