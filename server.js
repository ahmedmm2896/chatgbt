const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';

app.post('/api/message', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",
            messages: [{ role: "user", content: userMessage }]
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const botMessage = response.data.choices[0].message.content;
        res.json({ response: botMessage });
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ response: 'Sorry, something went wrong.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
