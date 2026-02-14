const ImageKit = require('@imagekit/nodejs');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file, fileName) {
    try {
        const result = await imagekit.files.upload({
            file: file.buffer.toString('base64'), // base64 encoded file
            fileName: fileName || file.originalname,
            folder: '/posts' // optional folder
        });
        return {
            url: result.url,
            fileId: result.fileId,
            thumbnailUrl: result.thumbnailUrl
        };
    } catch (error) {
        console.error('ImageKit upload error:', error.response?.data || error.message || error);
        throw new Error('Failed to upload file to ImageKit: ' + (error.message || 'Unknown error'));
    }
}

module.exports = { uploadFile };