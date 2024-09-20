import requests

url = "https://app.eraser.io/api/render/prompt"

payload = {
    "text": "p",
    "diagramType": "sequence-diagram",
    "returnFile": True
}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer dfgdgdfgfdgfdgfdgdfgfdgfdgdgdgdf"
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)

#https://docs.eraser.io/reference/generate-diagram-from-prompt