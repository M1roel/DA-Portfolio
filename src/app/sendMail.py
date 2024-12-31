from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import EMAIL, PASSWORD

app = Flask(__name__)
CORS(app)

@app.route('/send-email', methods=['OPTIONS', 'POST'])
def send_email():
    if request.method == 'OPTIONS':
        response = app.response_class(status=200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
    
    if request.method == 'POST':
        data = request.json
        
        email = data.get('email')
        name = data.get('name')
        message_content = data.get('message')

        recipient = 'kontakt@peterpfautsch.de'  
        subject = f"Contact From <{email}>"
        message = f"From: {name}<br>{message_content}"

        try:
            msg = MIMEMultipart()
            msg['From'] = 'noreply@mywebsite.com'
            msg['To'] = recipient
            msg['Subject'] = subject

            msg.attach(MIMEText(message, 'html'))

            with smtplib.SMTP('smtp.strato.de', 465) as server:
                server.starttls()
                server.login(EMAIL, PASSWORD)
                server.sendmail(msg['From'], msg['To'], msg.as_string())
            
            return jsonify({'status': 'success', 'message': 'Email sent successfully!'}), 200

        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)}), 500

    return jsonify({'status': 'error', 'message': 'Method Not Allowed'}), 405

if __name__ == '__main__':
    app.run(debug=True)
