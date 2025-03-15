import {Router} from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../Model/signup.js';
import { AddLog  } from '../Model/addlog.js';
import { profile } from '../Model/addprofile.js';
import {upload} from '../Middleware/upload.js';
import { authenticate } from '../Middleware/authenticate.js';
import { postmodel } from '../Model/addinspiration.js';
import { usercheck } from '../Middleware/usercheck.js';
 const userauth=Router();


 
 userauth.post('/signup',async(req,res)=>{
    try{
        const {Username,PhoneNumber,Email,password,userrole}=req.body;
        console.log(Username);

        const existingUser=await User.findOne({username:Username});
        if(existingUser)
          {   
            res.status(400).send("Username Already Exist")
            console.log("Username Alredy EXist");
            
          }  
        if(userrole==='admin')
        {
            const existingAdmin=await User.findOne({userrole:'admin'})
            if(existingAdmin){
                return res.status(403).send("Admin already Exist")
            }
        }
          
                const newPassword=await bcrypt.hash(password,10)
                console.log(newPassword);

                const newUser=new User({
                    username:Username,
                    phonenumber:PhoneNumber,
                    email:Email,
                    password:newPassword,
                    userrole:userrole
                });
                await newUser.save();
                res.status(201).send('SignedUp Successfully') 
                console.log("signed Up")
          
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
 });

 userauth.post('/login', async (req, res) => {
    try {
        const { Username, password } = req.body;
        const result = await User.findOne({ username: Username });

        if (!result) {
            return res.status(400).json({ msg: "Enter Valid Username" }); 
        }

        const valid = await bcrypt.compare(password, result.password);
        if (valid) {
            const token = jwt.sign(
                { UserName: result.username, userrole: result.userrole,userId:result._id },
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
            );

            res.cookie('authTok', token, {
                httpOnly: true,
            });

            return res.status(200).json({ 
                message: "Logged in Successfully",
                userrole: result.userrole ,
                userId:result._id
            });
        } else {
            return res.status(401).json({ msg: "Unauthorized Access" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});



userauth.post('/addLog', authenticate, usercheck, async (req, res) => {
    try {
        const { category, title, description, targetdate, image } = req.body; 
        console.log("Title:", title);

        //  Find the user
        const foundUser = await User.findOne({ username: req.UserName });
        if (!foundUser) {
            return res.status(404).json({ error: "User not found" });
        }
        console.log("User:", foundUser);

        // Find user's logs or create a new one
        let userLogs = await AddLog.findOne({ user: foundUser._id });

        if (!userLogs) {
            userLogs = new AddLog({ user: foundUser._id, logs: [] });
        }

        // Push new log entry
        userLogs.logs.push({
            category,
            title,
            description,
            targetdate,
            image  
        });

        // Save the updated log document
        await userLogs.save();
        console.log("Updated Logs:", userLogs);

        res.status(201).json({ message: "Log added successfully" });
        console.log("Log added successfully");
    }  
    catch (error) {
        console.error("Error adding log:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

userauth.get('/getLogImage', async (req, res) => {
    try {
        const { id } = req.query;

        const logEntry = await AddLog.findOne({ "logs._id": id });

        if (!logEntry) {
            return res.status(404).json({ msg: "Log not found" });
        }

        const log = logEntry.logs.find(entry => entry._id.toString() === id);
        if (!log || !log.image) {
            return res.status(404).json({ msg: "Image not found" });
        }

        const imageBuffer = Buffer.from(log.image, "base64");

        res.set("Content-Type", "image/jpeg");
        res.send(imageBuffer);
    } catch (error) {
        console.error("Error fetching log image:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

userauth.get('/getAllLogs',async(req,res)=>{
    try
    {   

        const logs= await AddLog.find()
        res.json(logs)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Internal Server Error'
        });

    }
})








userauth.get("/api/getLog", async (req, res) => { 
    try {
        const { category } = req.query;
        let logs;

        if (category && category !== "All") {
            logs = await AddLog.find({ "logs.category": category });
        } else {
            logs = await AddLog.find();
        }

        if (!logs || logs.length === 0) {
            return res.status(404).json({ message: "No logs found" });
        }

        res.status(200).json({ data: logs });
    } catch (error) {
        console.error("Error fetching logs:", error);
        res.status(500).json({ message: "Server error" });
    }
});



userauth.delete('/deleteLog', authenticate, usercheck, async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const name = req.body.Title;

        if (!name) {
            return res.status(400).json({ msg: "Title is required" });
        }

        console.log("Searching for log with title:", name);

        // Find and remove the specific log entry from the logs array
        const updatedLog = await AddLog.findOneAndUpdate(
            { "logs.title": name }, // Find user document containing the log
            { $pull: { logs: { title: name } } }, // Remove only that log
            { new: true } // Return updated document
        );

        if (!updatedLog) {
            console.log("Log not found");
            return res.status(404).json({ msg: "No such Log" });
        }

        console.log("Log deleted successfully");
        return res.status(200).json({ msg: "Log Removed" });

    } catch (error) {
        console.error("Error deleting log:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});


userauth.post(
    "/addProfile",
    authenticate,
    usercheck,
    upload.single("ProfileImage"), // Ensure it matches frontend field name
    async (req, res) => {
        try {
            const { username, email, bio } = req.body; 
            console.log("Received:", { username, email, bio });

            // Convert uploaded image to Base64
            let imageBase64 = null;
            if (req.file) {
                imageBase64 = req.file.buffer.toString("base64"); // Convert buffer to Base64
                console.log("Stored image (Base64):", imageBase64.substring(0, 50)); // Log only first 50 chars
            }

            // Save new profile
            const newProfile = new profile({
                username,
                email,
                bio,
                image: imageBase64, 
            });

            await newProfile.save();

            res.status(201).json({ message: "Profile added successfully!" });
            console.log("Profile added:", newProfile);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
);







userauth.get("/getProfile", authenticate, usercheck, async (req, res) => {
    try {
        const username = req.UserName; // Extract from auth middleware
        console.log(" Authenticated User:", username);

        const Details = await profile.findOne({ username });

        if (Details) {
            return res.status(200).json({ data: Details });
        } else {
            return res.status(404).json({ msg: "No such profile" });
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

 


userauth.patch('/updateBioAndImage', authenticate, usercheck, upload.single("ProfileImage"), async (req, res) => {
    try {
        const { bio } = req.body;
        const username = req.UserName; // Extract from middleware

        console.log(" Updating profile for:", username);

        // Fetch user from database
        const result = await profile.findOne({ username });

        if (!result) {
            console.log("User not found in database:", username);
            return res.status(404).json({ message: "User not found" });
        }

        // Update bio if provided
        if (bio) {
            result.bio = bio;
        }

        // Update image if provided
        if (req.file) {
            result.image = req.file.buffer.toString("base64");
        }

        await result.save();
        console.log("Bio and Image updated for:", username);
        res.status(200).json({ message: "Bio and Image updated successfully" });

    } catch (error) {
        console.error(" Error updating bio and image:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



userauth.get('/getUserRole', authenticate, (req, res) => {
    console.log("UserRole from Middleware:", req.userrole);
    res.json({ userrole: req.userrole });
});


userauth.post("/bookmark", authenticate, async (req, res) => {
    try {
        const { postId } = req.body;
        console.log(postId);
        
        const foundUser = await User.findById(req.userid); //  Use correct model
        console.log("hi");
        
        console.log(foundUser);
        

        if (!foundUser) return res.status(404).json({ msg: "User not found" });

        const isBookmarked = foundUser.bookmarks.includes(postId);
        console.log(isBookmarked);
        

        if (isBookmarked) {
            foundUser.bookmarks = foundUser.bookmarks.filter(id => id.toString() !== postId);
        } else {
            foundUser.bookmarks.push(postId);
        }

        await foundUser.save();
        res.json({ msg: isBookmarked ? "Bookmark removed" : "Bookmarked successfully" });
    } catch (error) {
        console.error("Error updating bookmark:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});



// Get all bookmarked posts for the logged-in user
userauth.get("/bookmarks", authenticate, async (req, res) => {
    try {
        const foundUser = await User.findById(req.userid).populate("bookmarks");

        if (!foundUser) return res.status(404).json({ msg: "User not found" });

        res.json(foundUser.bookmarks); //  Returns full bookmarked posts
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


userauth.get('/Logout',(req,res)=>{
    res.clearCookie('authTok');
    res.status(200).json({msg:"Successfully Logged Out"})
})


 export {userauth}