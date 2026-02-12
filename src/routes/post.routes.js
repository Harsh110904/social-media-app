const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const createPostController = require('../controllers/post.controller');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (!file.mimetype.match(/image\/(jpeg|jpg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Middleware to handle file upload
const uploadAny = upload.any();

/* POST /posts [protected] */
router.post('/', 
    // Authentication middleware
    (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized access, please login first"
            });
        }
        next();
    },
    
    // File upload middleware
    (req, res, next) => {
        uploadAny(req, res, (err) => {
            if (err) {
                console.error('File upload error:', err);
                return res.status(400).json({
                    message: 'Error uploading file',
                    error: err.message
                });
            }
            
            // Log the uploaded files for debugging
            if (req.files) {
                console.log('Uploaded files:', req.files.map(f => ({
                    fieldname: f.fieldname,
                    originalname: f.originalname,
                    mimetype: f.mimetype,
                    size: f.size
                })));
            }
            
            next();
        });
    },
    
    // Controller
    createPostController
);

module.exports = router;
