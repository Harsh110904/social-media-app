const postModel = require("../models/post.model")

async function createPostController(req, res) {
    try {
        console.log("Request files:", req.files);
        console.log("Request body:", req.body);
        
        if (!req.files || req.files.length === 0) {
            console.log("No files found in request");
            return res.status(400).json({
                message: "Image is required"
            });
        }
        
        // Get the first file (in case multiple were uploaded)
        const file = req.files[0];
        console.log("Processing file:", file);
        
        // TODO: Upload to cloud storage and generate caption
        
        res.status(201).json({
            message: "Post created successfully",
            file: {
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size
            }
        });
    } catch (error) {
        console.error("Error in createPostController:", error);
        res.status(500).json({
            message: "Error creating post",
            error: error.message
        });
    }
}

module.exports = createPostController;
