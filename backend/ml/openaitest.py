
import openai

def generate_desc(prompt):
    OPENAI_API_KEY = "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"
    openai.api_key = OPENAI_API_KEY

    response = openai.Completion.create(
    model="text-davinci-003",
    prompt=prompt,
    temperature=0.45,
    max_tokens=256,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    print(response.choices[0].text)
    return response.choices[0].text
    
def generate_img(prompt):
    OPENAI_API_KEY = "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"
    openai.api_key = OPENAI_API_KEY

    response = openai.Image.create(
    prompt=prompt,
    n=1,
    size="512x512"
    )
    image_url = response['data'][0]['url']
    return image_url