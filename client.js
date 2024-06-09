//client.js -> receive from backend
import axios from 'axios';

//check if there is any forbidden character
export async function checkEmailValidity(email){
    try {
        let response = await fetch ("http://127.0.0.1:5001/emailverification", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({email: email}),
        });
        let responseJson = await response.json();
        return responseJson.isValid;
    } catch (error) {
        return false;
    }
}

export const signup = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:5001/signup", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to sign up.');
    }
};

export const verifyuser = async (email, code) => {
    try {
        if (await axios.post(`http://127.0.0.1:5001/verifyuser`, {
          email,
          code,
        })) {
            return True;
        }
    } catch (error) {
        throw new Error(error.response?.data?.error);
    }
}

export const selectRole = async(uid, role, password) => {
    try {
        const response = await axios.post("http://127.0.0.1:5001/selectrole",{
            uid: uid,
            role: role,
            password: password
        });
        return response.data;
    } catch (error) {
        console.error('Error selecting role:', error);
        throw error;
    }
}

export const signin = async(email, password) => {
    try{
        const response = await axios.post("http://127.0.0.1:5001/signin",{
            email:email,
            password:password
        });
        return response.data
    } catch (error) {
        throw error.response.data; 
    }
}

export const getToken = async(email) => {
    try {
        const response = await axios.post("http://127.0.0.1:5001/tokencheck",{
            email:email
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const signout =async(email) => {
    try {
        const response = await axios.post("http://127.0.0.1:5001/signout",{
            email:email
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
