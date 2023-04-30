import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);
// console.log(openai, "openai")
router.route('/').get((req, res) => {
    res.status(200).json({ message: "Hello from Chat ROUTES" })
})

router.route('/').post(async (req, res) => {
    try {
        const { message } = req.body;
        console.log(message, "message")
        const response = await openai.createChatCompletion({
            messages: [{ "role": "user", "content": message }],
            model: 'gpt-3.5-turbo'

        });

        console.log(response, "res")

        const text = response.data.choices[0]['message']['content'];

        res.status(200).json({ message: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" })
    }
})

export default router;