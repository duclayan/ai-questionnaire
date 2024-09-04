import os
from dotenv import load_dotenv
from openai import AzureOpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider


def main(): 
        
    try: 
    
        # Get configuration settings 
        load_dotenv()
        AZURE_OPENAI_ENDPOINT= os.getenv("AZURE_OPENAI_ENDPOINT")
        AZURE_OPENAI_API_KEY = os.getenv("AZURE_OPENAI_API_KEY")
        AZURE_OPENAI_DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT")
        
        # Initialize the Azure OpenAI client
        client = AzureOpenAI(
                api_key=AZURE_OPENAI_API_KEY,  
                api_version="2024-02-15-preview",
                base_url=f"{AZURE_OPENAI_ENDPOINT}/openai/deployments/{AZURE_OPENAI_DEPLOYMENT}",
        )   
        text_sample = "tagalog pickup lines"
        response = client.chat.completions.create(
          model="gpt-4o-mini",
          messages=[
            {"role": "system", "content": (text_sample)},
          ]
        )

        generated_text = response.choices[0].message.content
        print(generated_text)

    except Exception as ex:
        print(ex)

if __name__ == '__main__': 
    main()