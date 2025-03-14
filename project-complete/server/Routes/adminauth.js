import {Router} from 'express';
import { postmodel } from '../Model/addinspiration.js';
import { authenticate } from '../Middleware/authenticate.js';
import {admincheck} from '../Middleware/admincheck.js';
import {upload} from '../Middleware/upload.js'

const adminauth=Router();

adminauth.post('/addinspiration', authenticate, admincheck, upload.single("InspImage"), async (req, res) => {
    try {
        const { title, description } = req.body;
        
        console.log("Received File:", req.file); 

        if (!title || !description) {
            return res.status(400).json({ message: "Title and Description are required" });
        }

        let imageBase64 = null;
        if (req.file) {
            imageBase64 = req.file.buffer.toString("base64"); 
            console.log("Stored image (Base64):", imageBase64.substring(0, 50)); 
        } else {
            console.log(" No file received!");
        }

        const newInspiration = new postmodel({
            title: title.trim(),
            description: description.trim(),
            image: imageBase64
        });

        await newInspiration.save();

        res.status(201).json({ id: newInspiration._id, message: "Inspiration added successfully" });
    } catch (error) {
        console.error("Error adding inspiration:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});





adminauth.get('/getAllInspiration', authenticate, async (req, res) => {
    try {
        const inspirations = await postmodel.find(); 
        if (!inspirations || inspirations.length === 0) {
            return res.status(404).json({ message: "No inspirations found" });
        }

        res.status(200).json(inspirations);
    } catch (error) {
        console.error("Error fetching inspirations:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


adminauth.patch('/updateinspiration', authenticate, admincheck, upload.single("InspImage"), async (req, res) => {
    try {
        const { title, description } = req.body;
        let imageBase64 = null;

        if (!title) {
            return res.status(400).json({ message: "Title is required for updating." });
        }

        const inspiration = await postmodel.findOne({ title });
        if (!inspiration) {
            return res.status(404).json({ message: "Inspiration not found." });
        }

        if (req.file) {
            imageBase64 = req.file.buffer.toString("base64");
        }

        if (description) {
            inspiration.description = description;
        }
        if (imageBase64) {
            inspiration.image = imageBase64;
        }

        await inspiration.save();
        res.status(200).json({ message: "Inspiration updated successfully" });
    } catch (error) {
        console.error("Error updating inspiration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


adminauth.delete("/deleteInspiration/:id", authenticate, admincheck, async (req, res) => {
    try {
        const deletedPost = await postmodel.findByIdAndDelete(req.params.id);

        if (!deletedPost) return res.status(404).json({ message: "Post not found" });

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting inspiration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



export {adminauth}