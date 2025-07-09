curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
 -H 'Content-Type: application/json' \
 -H 'X-goog-api-key: GEMINI_API_KEY' \
 -X POST \
 -d '{
"contents": [
{
"parts": [
{
"text": "Explain how AI works in a few words"
}
]
}
]
}'

curl -X POST "http://127.0.0.1:8000/gemini-llm/" \
 -H "Content-Type: application/json" \
 -d '{
"contents": [
{ "text": "Explain how AI works in a few words" }
],
"max_tokens": 50,
"temperature": 0.5
}'
