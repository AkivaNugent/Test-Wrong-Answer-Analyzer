from flask import Flask, request, jsonify
from flask_cors import CORS
from anthropic import Anthropic
import os
from dotenv import load_dotenv
from prompt_config import create_full_prompt

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        test_type = data.get('testType')
        form_data = data.get('formData')
        conversation_history = data.get('conversationHistory', [])
        
        system_prompt, user_prompt = create_full_prompt(test_type, form_data)
        
        if len(conversation_history) == 0:
            messages = [{'role': 'user', 'content': user_prompt}]
        else:
            messages = conversation_history
        
        message = client.messages.create(
            model='claude-sonnet-4-20250514',
            max_tokens=1024,
            system=system_prompt,
            messages=messages
        )
        
        analysis = message.content[0].text
        updated_history = messages + [{'role': 'assistant', 'content': analysis}]
        
        return jsonify({
            'success': True,
            'analysis': analysis,
            'conversationHistory': updated_history
        })
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)