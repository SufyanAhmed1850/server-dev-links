import linkValidationSchema from "../schema/linkValidationSchema.js";
import Link from "../schema/linkSchema.js";
import jwt from "jsonwebtoken";

const save = async (req, res) => {
    try {
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken);
        req.body.user = decodedToken.user._id;
        await linkValidationSchema.validateAsync(req.body);
        const link = new Link(req.body);
        const saveLink = await link.save();
        return res.status(200).json({
            statusCode: 200,
            message: "Saved Successfully",
            link: saveLink,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ statusCode: 500, message: error.message });
    }
};

export { save };
