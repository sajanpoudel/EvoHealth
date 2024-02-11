import express from "express";
import AuthController from "../controllers/authController.js";
import checkIsUserAuthenticated from "../middleware/authMiddleware.js";

import multer from "multer";
import healthController from "../controllers/healthController.js";
import hospitalController from "../controllers/hospitalController.js";
// import profileController from "../controllers/profileController.js";
//MULTER
// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}}`);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);



router.get("/get/getdata", checkIsUserAuthenticated, healthController.getAllData);

//Protected Routes
router.get("/get/alldata", checkIsUserAuthenticated, hospitalController.getAllHospitalData);
router.post("/add/adddata", upload.single("thumbnail"),  checkIsUserAuthenticated, hospitalController.addHospitalData);
router.get("/get/data/:id", checkIsUserAuthenticated, hospitalController.getSingleData);

// router.get("/get/profile", checkIsUserAuthenticated, profileController.getProfileData);
// router.post("/add/profile", checkIsUserAuthenticated, profileController.addProfileData);
// router.get("/get/categories", checkIsUserAuthenticated, CategoryController.getAllCategories);
// router.post("/add/category", checkIsUserAuthenticated, CategoryController.addNewCategory);

export default router;