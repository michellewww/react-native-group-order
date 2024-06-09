from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import random
import string
import bcrypt

#Function to check email format
def check_email(email):
    if ("@" not in email) or ("." not in email.split("@")[1]):
        return False
    else:
        forbidden = "(),:;<>[\]{}|`'\"\\ \n\t\r"
        if any(char in forbidden for char in email):
            return False
        return True

#Function to generate random code
def code_generation (length = 6):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

#password hashing
def hash_password(password):
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(password.encode(), salt)
    return hash

def verify_password(stored_hash, password):
    return bcrypt.checkpw(password.encode(), stored_hash)