
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp"); // Specify the directory to store uploaded files
  },
  filename: (req, file, cb) => {    
    cb(null, file.originalname);
  }
});

export const upload = multer({
  storage,
})
