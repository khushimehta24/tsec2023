
import openai

def generate_desc(data):
    OPENAI_API_KEY = "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"
    openai.api_key = OPENAI_API_KEY

    response = openai.Completion.create(
    model="text-davinci-003",
    prompt=f"Write a fancy, attractive, tempting description for the following:\n\n    name: {data['name']}\n  \n  posted_on: {data['posted_on']}\n  bhk: {data['bhk']}\n  size: {data['size']}\n  floor: {data['floor']}\n  area_type: {data['area_type']}\n  area_location: {data['area_location']}\n  city: {data['city']}\n  furnishing_status: {data['furnishing_status']}\n  tenant_preferred: {data['tenant_preferred']}\n  bathroom: {data['bathroom']}\n  point_of_contact: {data['point_of_contact']}\n  max_occupants: {data['max_occupants']}\n\n",
    temperature=0.45,
    max_tokens=256,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    print(response.choices[0].text)
    return response.choices[0].text