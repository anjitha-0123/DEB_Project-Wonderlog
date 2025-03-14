import {Router} from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { user } from '../Model/signup.js';
import { AddLog  } from '../Model/addlog.js';
import { profile } from '../Model/addprofile.js';
import {upload} from '../Middleware/upload.js';
import { authenticate } from '../Middleware/authenticate.js';
import { postmodel } from '../Model/addinspiration.js';
import { usercheck } from '../Middleware/usercheck.js';

 const userauth=Router();

 const convertToBase64 = (buffer) => {
    return buffer.toString('base64');
};

 
 userauth.post('/signup',async(req,res)=>{
    try{
        const {Username,PhoneNumber,Email,password,userrole}=req.body;
        console.log(Username);

        const existingUser=await user.findOne({username:Username});
        if(existingUser)
          {   
            res.status(400).send("Username Already Exist")
            console.log("Username Alredy EXist");
            
          }  
        else
          {
                const newPassword=await bcrypt.hash(password,10)
                console.log(newPassword);

                const newUser=new user({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
 });

 userauth.post('/login', async (req, res) => {
    try {
        const { Username, password } = req.body;
        const result = await user.findOne({ username: Username });

        if (!result) {
            return res.status(400).json({ msg: "Enter Valid Username" }); // Use 400 for bad request
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
                userrole: result.userrole ,// Send userrole in response
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

        // Find the user
        let User = await user.findOne({ username: req.UserName });
        if (!User) {
            return res.status(404).json({ error: "User not found" });
        }
        console.log("User:", User);

        // Find or create the user's log document
        let LoggedUser = await AddLog.findOne({ user: User._id });

        if (!LoggedUser) {
            LoggedUser = new AddLog({ user: User._id, logs: [] });
        }

        // Push new log entry
        LoggedUser.logs.push({
            category,
            title,
            description,
            targetdate,
            image  
        });

        // Save
        await LoggedUser.save();

        res.status(201).json({ message: "Log added successfully" });
        console.log("Log added successfully");
    }  
    catch (error) {
        console.error("Error adding log:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});





//  userauth.post('/addLog', authenticate, usercheck, async (req, res) => {
//     try {
//         const { category, title, description, targetdate, image } = req.body; // Accept Base64 directly
//         console.log("Title:", title);

//         // Find the user
//         let User = await user.findOne({ username: req.UserName });
//         if (!User) {
//             return res.status(404).json({ error: "User not found" });
//         }
//         console.log("User:", User);

//         // Find the user's logs
//         let LoggedUser = await AddLog.findOne({ user: User._id });

//         // Create a new log entry if it doesn’t exist
//         if (!LoggedUser) {
//             LoggedUser = new AddLog({ user: User._id, logs: [] });
//         }

//         // Convert Targetdate to Date format (optional)
//         // const targetDate = targetdate ? new Date(targetdate) : null;

//         // Push new log entry
//         LoggedUser.logs.push({
//             category,
//             title,
//             description,
//             targetdate,
//             image  // Already in Base64 format from frontend
//         });

//         // Save the updated log
//         await LoggedUser.save();

//         res.status(201).json({ message: "Log added successfully" });
//         console.log("Log added successfully");
//     }  
//     catch (error) {
//         console.error("Error adding log:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


userauth.get('/getLogImage', async (req, res) => {
    try {
        const { id } = req.query;

        // Find the log entry that contains the specific log ID
        const logEntry = await AddLog.findOne({ "logs._id": id });

        if (!logEntry) {
            return res.status(404).json({ msg: "Log not found" });
        }

        // Find the specific log inside the logs array
        const log = logEntry.logs.find(entry => entry._id.toString() === id);
        if (!log || !log.image) {
            return res.status(404).json({ msg: "Image not found" });
        }

        // Convert base64 image to a buffer
        const imageBuffer = Buffer.from(log.image, "base64");

        res.set("Content-Type", "image/jpeg");
        res.send(imageBuffer);
    } catch (error) {
        console.error("Error fetching log image:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// userauth.get('/getAllLogs', authenticate, async (req, res) => {
//     try {
//         // Fetch only logs belonging to the logged-in user
//         const userLogs = await AddLog.findOne({ user: req.userid });

//         if (!userLogs) {
//             return res.status(200).json([]); // Return empty array if no logs exist
//         }

//         res.status(200).json(userLogs.logs); // Send only the logs array
//     } catch (error) {
//         console.error("Error fetching logs:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

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






userauth.get('/getLogsByCategory/:category', authenticate, async (req, res) => {
    try {
        const { category } = req.params;
        console.log("Fetching logs for category:", category);

        // Find logs inside the logs array using $elemMatch
        const logs = await AddLog.find({ logs: { $elemMatch: { category } } });

        if (!logs.length) {
            return res.status(404).json({ message: "No logs found for this category" });
        }

        // Extract matching logs from nested structure
        const categoryLogs = logs.flatMap(logEntry => logEntry.logs.filter(log => log.category === category));

        res.status(200).json(categoryLogs);
    } catch (error) {
        console.error("Error fetching logs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




// userauth.get('/getLog',authenticate,usercheck,async(req,res)=>{
    

//     try {
//         const { title } = req.query; // Get title from query parameters

//         if (!title) {
//             return res.status(400).json({ message: "Title is required" });
//         }

//         // Find logs where the title matches
//         const logs = await AddLog.find({ "logs.title": title }, { "logs.$": 1 }); // $ operator returns only matching log

//         if (logs.length === 0) {
//             return res.status(404).json({ message: "No logs found with this title" });
//         }

//         res.status(200).json(logs);
//         console.log(logs);
        
//     } catch (error) {
//         console.error("Error fetching log:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });
    
userauth.put('/updateLog', authenticate, usercheck, upload.single("LogImage"), async (req, res) => {
    try {
        const { Title, Description, Targetdate } = req.body;
        const imageBase64 = req.file ? req.file.buffer.toString("base64") : null;

        // Find the document that contains the log
        const logEntry = await AddLog.findOne({ "logs.title": Title });

        if (!logEntry) return res.status(404).send("Log not found");

        // Find the specific log inside the array and update it
        const logToUpdate = logEntry.logs.find(log => log.title === Title);
        if (logToUpdate) {
            logToUpdate.description = Description || logToUpdate.description;
            logToUpdate.targetdate = Targetdate || logToUpdate.targetdate;
            logToUpdate.image = imageBase64 || logToUpdate.image;
        }

        // Save the updated document
        await logEntry.save();

        res.status(200).send("Log updated");
    } catch (error) {
        res.status(500).send("Internal Server Error");
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



// userauth.delete('/deleteLog',authenticate,usercheck,async(req,res)=>{
//     const name=req.body.Title;
//     console.log(name);

//     const Detail=await AddLog.findOne({title:name})
//     console.log(Detail);
//      try
//      {
//        if(Detail)
//         {
//             await loges.findOneAndDelete(Detail)
//         res.status(200).send("Log Removed")
//        }
//        else
//        {
//         res.status(404).json({msg:'No such Log'})
//        }

//      }
//      catch
//      {
//         res.status(500).send("Internal Server Error")
//      }
// });



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




// userauth.post('/addProfile',authenticate,usercheck,upload.single("ProfileImage"),async(req,res)=>{   
//     try{
//         const {UserName,Email,Bio}= req.body;
//         console.log(UserName);
//         const existingProfile=await profile.findOne({username:UserName})
//         if(existingProfile)
//             {
//             res.status(400).send("Bad request");
//             }
//         else
//         {   
//             let imageBase64 = null;
//         if (req.file)
//              {
//                 imageBase64 = convertToBase64(req.file.buffer);
//              }
            
//             const newProfile=new profile({
//                       username:UserName,
//                       email:Email,
//                       bio:Bio,
//                       image:imageBase64
//         });
//         await newProfile.save();

//         res.status(201).send("Profile added")
//         console.log("Profile added");

//         }

//         }  
    
//     catch
//     {
//         res.status(500).send("Internal Server Error")

//     }
// });



userauth.get("/getProfile", authenticate, usercheck, async (req, res) => {
    try {
        const username = req.UserName; // Extract from auth middleware
        console.log("📌 Authenticated User:", username);

        const Details = await profile.findOne({ username });

        if (Details) {
            return res.status(200).json({ data: Details });
        } else {
            return res.status(404).json({ msg: "No such profile" });
        }
    } catch (error) {
        console.error("🚨 Error fetching profile:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

  
  

// userauth.get("/getProfile", authenticate, usercheck, async (req, res) => {
//     try {
//         const name = req.query.username;
//         console.log("Fetching profile for:", name);

//         const Details = await profile.findOne({ username: name });

//         if (Details) {
//             res.status(200).json({ data: Details });
//         } else {
//             res.status(404).json({ msg: "No such Profile" });
//         }
//     } catch (error) {
//         console.error("Error fetching profile:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });



userauth.put('/updateProfile', authenticate, usercheck, upload.single("ProfileImage"), async (req, res) => {
    try {
        const { UserName, Email, Bio } = req.body;
        const result = await profile.findOne({ username: UserName });

        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }

        let imageBase64 = result.image; // Keep existing image if not updated
        if (req.file) {
            imageBase64 = convertToBase64(req.file.buffer);
        }

        result.username = UserName;
        result.email = Email;
        result.bio = Bio;
        result.image = imageBase64;

        await result.save();
        console.log("Profile updated");
        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



// userauth.put('/updateProfile', authenticate,usercheck,upload.single("ProfileImage"),async (req, res) => {
//     try {
//         const { UserName,Email,Bio } = req.body;
//         const result = await profile.findOne({username:UserName})
//         console.log(result);

//         let imageBase64 = null;
//         if (req.file) {
           
//             imageBase64 = convertToBase64(req.file.buffer);
//          }
//         result.username = UserName;
//         result.email = Email;
//         result.bio = Bio;
//         result.image=imageBase64

//         await result.save();
//         console.log("Profile updated");
//         res.status(200).send("Profile updated");
//     } catch (error) {
//         console.error("Error updating log:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });


// userauth.post('/addcomment/:id',async(req,res)=>{
//     const post=await postmodel.find
// })




userauth.post('/addComment', authenticate, usercheck, async (req, res) => {
    try {
        // Username is extracted from authentication (req.UserName)
        const username = req.UserName; // Ensure your auth middleware sets this correctly

        // Find the post
        const Post = await postmodel.findById(req.body.postId);
        if (!Post) return res.status(404).send("Post not found");
console.log(Post);

        // Extract comment content
        const { content } = req.body;

        // Add the comment with username
        const comment = {
            content: content,
            user: username,  // Store username instead of user ID
        };

        Post.comments.push(comment);
        await Post.save();

        res.status(201).json({ message: "Comment posted", comment });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


userauth.get('/getInspiration/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await inspirationModel.findById(postId).populate("comments.user", "username");

        if (!post) return res.status(404).json({ message: "Post not found" });

        res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching inspiration post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


userauth.get("/api/getSingleInspiration/:id", async (req, res) => {
    try {
        const post = await Inspiration.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// userauth.post('/addComment', authenticate, usercheck, async (req, res) => {
//     try {
//         // Find the user
//         const User = await user.findOne({ username: req.UserName });
//         if (!User) return res.status(404).send("User not found");

//         // Find the post
//         const Post = await postmodel.findById(req.body.postId);
//         if (!Post) return res.status(404).send("Post not found");

//         // Extract comment content
//         const { content } = req.body;

//         // Add the comment to the post's comments array
//         Post.comments.push({
//             content: content,
//             user: User._id
//         });

//         await Post.save();

//         res.status(201).send("Comment posted");
//         console.log("Comment posted");
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// });

userauth.get('/getUserRole', authenticate, (req, res) => {
    console.log("UserRole from Middleware:", req.userrole);
    res.json({ userrole: req.userrole });
});




userauth.get('/Logout',(req,res)=>{
    res.clearCookie('authTok');
    res.status(200).json({msg:"Successfully Logged Out"})
})


 export {userauth}