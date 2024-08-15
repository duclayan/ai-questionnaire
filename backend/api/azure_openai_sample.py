import os
from dotenv import load_dotenv
from openai import AzureOpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

# # Add Azure OpenAI package


# def main(): 
        
#     try: 
    
#         # Get configuration settings 
#         load_dotenv()
#         azure_oai_endpoint = os.getenv("AZURE_OAI_ENDPOINT")
#         azure_oai_key = os.getenv("AZURE_OAI_KEY")
#         azure_oai_deployment = os.getenv("AZURE_OAI_DEPLOYMENT")

#         token_provider = get_bearer_token_provider(DefaultAzureCredential(), "https://cognitiveservices.azure.com/.default")
        
#         # Initialize the Azure OpenAI client
#         client = AzureOpenAI(
#                 api_key=azure_oai_key,  
#                 api_version="2024-05-13",
#                 base_url=f"{azure_oai_endpoint}/openai/deployments/{azure_oai_deployment}",
#         )   
#         print("CLIENT CHECK", client.base_url)
#         # # Create a system message
#         # system_message = """I am a hiking enthusiast named Forest who helps people discover hikes in their area. 
#         #     If no area is specified, I will default to near Rainier National Park. 
#         #     I will then provide three suggestions for nearby hikes that vary in length. 
#         #     I will also share an interesting fact about the local nature on the hikes when making a recommendation.
#         #     """        


#         # while True:
#         #     # Get input text
#         #     input_text = input("Enter the prompt (or type 'quit' to exit): ")
#         #     if input_text.lower() == "quit":
#         #         break
#         #     if len(input_text) == 0:
#         #         print("Please enter a prompt.")
#         #         continue

#         #     print("\nSending request for summary to Azure OpenAI endpoint...\n\n")
            
#         #     # Add code to send request...
#         #     # Send request to Azure OpenAI model

#         response = client.chat.completions.create(
#             model=azure_oai_deployment,
#             "Content-Type = "application/json",
#             messages=[
#                 {"role": "system", "content": "system_message"},
#                 {"role": "user", "content": "input_text"}
#             ]
#         )

#         print("RESPONSE", response.messages)
#         generated_text = response.choices[0].message.content
#         print(generated_text)

#         #     # Print the response
#         #     print("Response: " + generated_text + "\n")
                    
                    
            

#     except Exception as ex:
#         print(ex)

# if __name__ == '__main__': 
#     main()

load_dotenv()
azure_oai_endpoint = os.getenv("AZURE_OAI_ENDPOINT")
azure_oai_key = os.getenv("AZURE_OAI_KEY")
azure_oai_deployment = os.getenv("AZURE_OAI_DEPLOYMENT")

client = AzureOpenAI(
        api_key=azure_oai_key,  
        api_version="2024-05-13",
        base_url=f"{azure_oai_endpoint}/openai/deployments/{azure_oai_deployment}",
)   

response = client.ChatCompletion.create(
  model="gpt-4o-mini",
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
  ]
)