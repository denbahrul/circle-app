"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_services_1 = __importDefault(require("../services/user.services"));
const user_services_2 = __importDefault(require("../services/user.services"));
const cloudinary_services_1 = __importDefault(require("../services/cloudinary.services"));
class UserController {
    // async create(req: Request, res: Response) {
    //   // #swagger.tags = ['Users']
    //   // #swagger.summary = 'Create new user'
    //   try {
    //     const value = await createUserSchema.validateAsync(req.body);
    //     const user = await UserServices.createUser(value);
    //     res.json(user);
    //   } catch (error) {
    //     res.status(500).json(error);
    //   }
    // }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Users']
            // #swagger.summary = 'Find all users'
            try {
                const userId = req.user.id;
                const users = yield user_services_1.default.getAllUsers(userId);
                res.json(users);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Users']
            // #swagger.summary = 'Find a user by params id'
            try {
                const userId = req.params.id;
                const userLoginId = req.user.id;
                const user = yield user_services_2.default.getUserById(Number(userId));
                const isFollow = yield user_services_2.default.isFollow(Number(userId), userLoginId);
                res.json(Object.assign(Object.assign({}, user), { isFollow }));
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // #swagger.tags = ['Users']
            // #swagger.summary = 'Update existing user'
            /*  #swagger.requestBody = {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: {
                                $ref: "#/components/schemas/profileEditSchema"
                            }
                        }
                    }
                }
            */
            try {
                const id = req.user.id;
                const fileUpload = req.file;
                let imageUrl = null;
                if (fileUpload) {
                    const image = yield cloudinary_services_1.default.upload(req.file);
                    imageUrl = image.secure_url;
                }
                const value = Object.assign(Object.assign({}, req.body), { profilePhoto: imageUrl, id: id });
                const user = yield user_services_1.default.updateUser(value);
                res.json(user);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new UserController();
