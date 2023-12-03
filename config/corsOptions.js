import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
    // origin: (origin, callback) => {
    //     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
    //         callback(null, true);
    //     } else {
    //         callback(new Error("Not allowed by CORS"));
    //     }
    // },
    origin: ["http://localhost:5173", "https://devvlinks.vercel.app"],
    credentials: true,
    optionsSuccessStatus: 200,
};

export default corsOptions;
