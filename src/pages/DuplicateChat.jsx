let data = JSON.stringify({
    "model": "gpt-3.5-turbo-1106",
    "messages": [
        {
            "role": "user",
            "content": "your message here",
        }
    ],
    "max_tokens": 2048,
    "temperature": 0.7
});

const apiKey = "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"

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    },
    data: data
};

// setLoading(true)

axios.request(config)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
}