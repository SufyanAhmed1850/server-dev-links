import User from "../schema/userSchema.js";
import jwt from "jsonwebtoken";

const update = async (req, res) => {
    try {
        console.log(req.body);
        const { firstName, lastName, email } = req.body;
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken);
        const foundUser = await User.findById(decodedToken.user._id).exec();
        console.log("foundUser", foundUser);
        foundUser.firstName = firstName;
        foundUser.lastName = lastName;
        foundUser.email = email;
        await foundUser.save();
        return res.status(200).json({
            code: 200,
            message: "Updated successfully",
            user: foundUser,
            status: true,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ code: 500, message: error.message, status: false });
    }
};

export { update };
