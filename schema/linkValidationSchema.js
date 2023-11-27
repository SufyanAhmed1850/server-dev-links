import Joi from "joi";

const linkPatterns = {
    GitHub: /^(https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+)\/?$/,
    Twitter: /^(https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_-]+)\/?$/,
    LinkedIn: /^(https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+)\/?$/,
    YouTube: /^(https?:\/\/(www\.)?youtube\.com\/[a-zA-Z0-9_-]+)\/?$/,
    Facebook: /^(https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_-]+)\/?$/,
    Twitch: /^(https?:\/\/(www\.)?twitch\.tv\/[a-zA-Z0-9_-]+)\/?$/,
    DevTo: /^(https?:\/\/(www\.)?dev\.to\/[a-zA-Z0-9_-]+)\/?$/,
    CodeWars: /^(https?:\/\/(www\.)?codewars\.com\/users\/[a-zA-Z0-9_-]+)\/?$/,
    CodePen: /^(https?:\/\/(www\.)?codepen\.io\/[a-zA-Z0-9_-]+)\/?$/,
    FreeCodeCamp: /^(https?:\/\/(www\.)?freecodecamp\.org\/[a-zA-Z0-9_-]+)\/?$/,
    GitLab: /^(https?:\/\/(www\.)?gitlab\.com\/[a-zA-Z0-9_-]+)\/?$/,
    Hashnode: /^(https?:\/\/(www\.)?hashnode\.com\/@([a-zA-Z0-9_-]+)\/?)$/,
    StackOverflow:
        /^(https?:\/\/(www\.)?stackoverflow\.com\/users\/[a-zA-Z0-9_-]+)\/?$/,
    FrontendMentor:
        /^(https?:\/\/(www\.)?frontendmentor\.io\/profile\/[a-zA-Z0-9_-]+)\/?$/,
};

const linkValidationSchema = Joi.object({
    order: Joi.required(),
    platform: Joi.object({
        text: Joi.string(),
        image: Joi.string(),
        placeholder: Joi.string(),
    }).required(),
    link: Joi.string()
        .uri({ scheme: ["http", "https"] })
        .when(Joi.ref("platform.text"), {
            switch: [
                { is: "GitHub", then: Joi.string().regex(linkPatterns.GitHub) },
                {
                    is: "Twitter",
                    then: Joi.string().regex(linkPatterns.Twitter),
                },
                {
                    is: "LinkedIn",
                    then: Joi.string().regex(linkPatterns.LinkedIn),
                },
                {
                    is: "YouTube",
                    then: Joi.string().regex(linkPatterns.YouTube),
                },
                {
                    is: "Facebook",
                    then: Joi.string().regex(linkPatterns.Facebook),
                },
                { is: "Twitch", then: Joi.string().regex(linkPatterns.Twitch) },
                { is: "Dev.to", then: Joi.string().regex(linkPatterns.DevTo) },
                {
                    is: "CodeWars",
                    then: Joi.string().regex(linkPatterns.CodeWars),
                },
                {
                    is: "CodePen",
                    then: Joi.string().regex(linkPatterns.CodePen),
                },
                {
                    is: "freeCodeCamp",
                    then: Joi.string().regex(linkPatterns.FreeCodeCamp),
                },
                { is: "GitLab", then: Joi.string().regex(linkPatterns.GitLab) },
                {
                    is: "Hashnode",
                    then: Joi.string().regex(linkPatterns.Hashnode),
                },
                {
                    is: "Stack Overflow",
                    then: Joi.string().regex(linkPatterns.StackOverflow),
                },
                {
                    is: "Frontend Mentor",
                    then: Joi.string().regex(linkPatterns.FrontendMentor),
                },
                // Add more cases for additional platforms
                { is: Joi.string(), then: Joi.forbidden() },
            ],
        })
        .required(),
    user: Joi.string(),
});

export default linkValidationSchema;
