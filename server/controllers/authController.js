import authModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  static userRegistration = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      if (username && email && password) {
        const isUser = await authModel.findOne({ email: email });
        if (!isUser) {
          // res.send("Registration successfully")

          //Password Hashing and storing
          const genSalt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password, genSalt);

          //Save a user
          const newUser = authModel({
            username: username,
            email: email,
            password: hashedPassword,
          });
          const savedUser = await newUser.save();

          if (savedUser) {
            return res
              .status(200)
              .json({ message: "User Registration successfully" });
          } else {
            return res.send(400).json({ message: "User Not Registered" });
          }
        } else {
          return res.status(400).json({ message: "EMail already exixst." });
        }
      } else {
        if(!username) return res.status(400).json({ message: "No username." });
        if(!email) return res.status(400).json({ message: "No email." });
        if(!password) return res.status(400).json({ message: "No password." });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
      // console.log("Happy")
    }
  };
  static userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const isEmail = await authModel.findOne({ email: email });
        if (isEmail) {
          if (
            isEmail.email === email &&
            (await bcryptjs.compare(password, isEmail.password))
          ) {
            // return res.status(200).json({message: "Login Successful"})

            //Generate token for protected link access
            const token = jwt.sign({ userID: isEmail._id }, "pleaseSubscribe", {
              expiresIn: "2d",
            });

            return res.status(200).json({
              message: "Login Successfully",
              token,
              name: isEmail.username,
            });
          } else {
            return res.status(400).json({ message: "Password incorrect" });
          }
        } else {
          return res.status(400).json({ message: "Email not registered!" });
        }
      } else {
        return res
          .status(200)
          .json({ message: "Both field are required for login" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default AuthController;
