from flask import Flask, request, jsonify
from flask_mail import Mail, Message
import firebase_admin
from firebase_admin import credentials, auth, firestore
import backend
import os
from dotenv import load_dotenv

load_dotenv() 

app = Flask(__name__)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS')
app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL')
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')

mail = Mail(app)

# firebase admin SDK (downloaded from firebase console)
cred = credentials.Certificate("/Users/xichen/Downloads/goosecart-ed780-firebase-adminsdk-9ss4w-2d66354853.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
verification = {}


#server-backend
# Verify Email Format
@app.route('/emailverification', methods=['POST'])
def emailChecker():
    email = request.json.get("email")
    is_valid = backend.check_email(email)
    return jsonify({"isValid": is_valid})


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    try:
        user = auth.create_user(
            email=email,
            password=password
        )
        code = backend.code_generation()
        verification[email] = code

        msg = Message('[GooseCart] Verification Code', sender='xichen.sophia@gmail.com', recipients=[email])
        msg.body = f'Your verification code is {code}'

        #testing
        app.logger.info(f'Sending verification email to {email} with code {code}')
        return jsonify({"message": "User created successfully", "uid": user.uid}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/verifyuser', methods=['POST'])
def verify_user():
    data = request.get_json()
    email = data["email"]
    code = data["code"]

    if email in verification and code == verification[email]:
        user = auth.get_user_by_email(email)
        auth.update_user(user.uid, email_verified=True)
        del verification[email]
        return jsonify({"message": "Email verified"}), 200
    else:
        return jsonify({"error": "Invalid verification code"}), 400
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
#http://127.0.0.1:5001
