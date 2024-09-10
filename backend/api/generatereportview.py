class GenerateReportView(APIView):
    def get(self, request):
        # 1. Collect all the answers by category
        # 2. Compile all the answers into one text per category
        # 3. Generate a report summary using GPT
        answers = Answer.objects.select_related('question').order_by('category', 'question__question_id')
        answer_compilation = self.create_text_compilation(answers)
        gpt_summary = self.generate_answer(answer_compilation) 
        # summary = self.generate_summary(gpt_summary)
        return Response({"summary": gpt_summary})

    def create_text_compilation(self, answers):
        answers_text = ""
        current_category = None
        for answer in answers:
            if answer.category != current_category:
                answers_text += f"\n Category: {answer.category}\n"
                current_category = answer.category
            q_text = f"• Question: {answer.question.question}: Answer: {answer.input_answer}\n"
            answers_text += q_text
        return answers_text

    def generate_answer(self, answers_text):
        # Prepare the data for the OpenAIView
        data = {
            "text": answers_text,
            "prompt_strategy": """
            Create a report based on the given information, you do not need to rewrite what is already written but focus on the prompt points that were mentioned. The prompt points, put them as headers. General information should also be mentioned only once. This should be very concise:
            
            """,
            "question": "Generate a Report summary",
            "sample_answer": ""
        }

        # Make a POST request to the OpenAIView
        # Make a POST request to the OpenAIView
        response = requests.post('http://localhost:8000/', json=data)  # Use json=data for JSON payload
        print("RESPONSE FOR AI OPEN VIEW", data)
        print("RESPONSE SAMPLE.", response.json())  # Use response.json() to get JSON response

        if response.status_code == 200:
            generated_text = response.json().get('generated_text', "No generated text found")
            print("RESPONSE:", generated_text)
            return generated_text
        else:
            return "Failed to generate summary"