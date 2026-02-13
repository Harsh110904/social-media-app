const postModel = require("../models/post.model")
const generateCaption = require("../service/ai.service")

async function createPostController(req, res) {
    console.log("req.file:", req.file);
    console.log("req.files:", req.files);
    
    const file = req.file || (req.files && req.files[0]);
    console.log("File selected:", file);
    
    if (!file) {
        return res.status(400).json({
            success: false,
            message: "No image file provided"
        });
    }
    
    try {
        // Convert image buffer to base64
        const base64Image = file.buffer.toString('base64');
        
        // Generate caption using AI
        const caption = await generateCaption(base64Image);
        
        res.status(200).json({
            success: true,
            message: "Caption generated successfully",
            caption: caption,
            filename: file.originalname
        });
    } catch (error) {
        console.error("Error generating caption:", error);
        res.status(500).json({
            success: false,
            message: "Failed to generate caption",
            error: error.message
        });
    }
}

module.exports = createPostController;