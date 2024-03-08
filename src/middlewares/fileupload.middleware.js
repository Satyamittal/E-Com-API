import multer from "multer";

const storage = multer.diskStorage({
    destination: (req,file,cb) =>
    {
        cb(null,'./uploads/');
    },
    filename: (req,file,cb) =>
    {
        const name = Date.now()+"-"+ file.originalname ;
        // cb(null,name);
        // This is problem which is comes in windows, which says name cant include ':'
        cb(
            null,
            new Date().toISOString().replace(/:/g, '_') +
            file.originalname
            );
            
    }

});

export const upload = multer({storage:storage}) ;