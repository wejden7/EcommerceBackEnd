const multer =require('multer');


const fileStorageIcon = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./storage/icons')
    },
    filename:(req,file,cb)=>{

        cb(null,Date.now()+'--'+ file.originalname)

    }
})
const uploadIcon= multer({storage:fileStorageIcon})

const fileStorageLogo = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./storage/logos')
    },
    filename:(req,file,cb)=>{

        cb(null,Date.now()+'--'+ file.originalname)

    }
})
const uploadLogo= multer({storage:fileStorageLogo})

const fileStorageImage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./storage/images')
    },
    filename:(req,file,cb)=>{
        console.log(file)
        req.body.image=Date.now()+'--'+ file.originalname

        cb(null,Date.now()+'--'+ file.originalname)

    }
})
const uploadImage= multer({storage:fileStorageImage})


module.exports = {uploadIcon,uploadImage,uploadLogo};