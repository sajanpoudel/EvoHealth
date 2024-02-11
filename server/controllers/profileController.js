// import express from "express";
// // import profileModel from "../models/hospitalModel.js";
// // import
// import profileModel from "../models/profileModel.js";

// class profileController {
//   static getProfileData = async (req, res) => {
//     try {
//       const fetchAllData = await profileModel.find({ user: req.user._id });
//       if (fetchAllData) {
//         return res.status(200).json(fetchAllData);
//       }
//     } catch (error) {
//       return res.status(400).json({ message: error.message });
//     }
//   };

//   static addProfileData = async (req, res) => {
//     const {
//       fullName,
//       phoneNumber,
//       bloodGroup,
//       address,
//       weight,
//       height,
//       insuranceCompany,
//       policyNumber,
//       expiryDate,
//       profile,
//     } = req.body;
//     try {
//       if (
//         (
//         //     fullName,
//         // phoneNumber,
//         // bloodGroup,
//         // address,
//         // weight,
//         // height,
//         // insuranceCompany,
//         // policyNumber,
//         expiryDate
//         )
//       ) {
//         const addData = new profileModel({
//           fullName,
//           phoneNumber,
//           bloodGroup,
//           address,
//           weight,
//           height,
//           insuranceCompany,
//           policyNumber,
//           expiryDate,
//           profile: req.file.filename,
//           user: req.user._id,
//         });

//         const savedData = await addData.save();
//         if (savedData) {
//           return res.status(200).json({ message: "Data Succeddfully added" });
//         } else {
//           return res.status(400).json({ message: "Data not saved" });
//         }
//       } else {
//         // console.log(fullName)
//         return res.status(400).json({ message: `All Fiel+ds are required ${fullName}` });
//       }
//     } catch (error) {
//       return res.status(400).json({ message: error.message });
//     }
//   };
// }
// export default profileController;
