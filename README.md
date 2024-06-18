
## Technologies

These are the main technologies that I used. You can check the other dependencies in `package.json`.

1. React Native: A popular JavaScript framework for building native mobile applications.
2. Tailwind CSS: A utility-first CSS framework for rapidly building responsive user interfaces.
3. Flask:  A simple built-in development server and a fast debugger provided.
4. RESTfulAPI: An interface that two computer systems use to exchange information securely over the internet, used to connect frontend and backend server.
5. Firebase: A cloud database management system for storing documents, images, and data. 


## Frontend Setup

1. Clone the project to your local machine.
2. Navigate to your folder and run `npx expo install`
3. Start the development server: `npx expo start`. This command will launch the Expo development server and provide you with options to run the app on an emulator, physical device, or web browser.
<img width="550" alt="image" src="https://github.com/michellewww/react-native-group-order/assets/92122260/a548bd32-186e-46d8-83c2-cf9596b7dc5e">

The frontend port is running on exp://172.16.25.248:19000. If you are running successfully, you will see "Bundling Complete".


### Useful Tips:

- "r" for reloading the whole project 
- "ctrl c" for existing the port (If you are using ios simulator, please make sure you are using ctrl instead of command)
- Go to App.js file. This is the controller of our frontend screens. It uses the stack data structure for storing the screen. If you want to reload the screen without logging again, you can manually move your Stack.screen on the top. As the image shows below, you can see current initial screen is onboarding screen.
<img width="619" alt="image" src="https://github.com/michellewww/react-native-group-order/assets/92122260/58931c02-8c86-4ac8-a98e-3b656d55232b">



### Frontend Architecture and Framework:
Since we are using the RESTfulAPI, we have a general controller to communicate and exchange the message between two servers. 

- client.js as a communication controller
- App.js as a screen controller
- src as a folder storing the UI components, features, screens, and a temporary database (asyncstorage by react-native)
- assets as a folder storing images, icons, and other imported document outside the repo
- tailwind.css as a general css styles controller

### Rules for coding in frontend
1. App.js: Please make sure you have all screens handling there under the following format:
<img width="292" alt="image" src="https://github.com/michellewww/react-native-group-order/assets/92122260/ef2db581-3bfa-4245-af5c-1179068faea5">

- component: the name of exported screen
- name: rename the screen by lowercase the capital letter only
- headershown should be FALSE.

2. Client.js: Please use axios for handling the connection under the following format:
<img width="619" alt="image" src="https://github.com/michellewww/react-native-group-order/assets/92122260/53ca4f8c-873d-460d-8220-c1f9a12575dd">

If you have package dependencies conflict, you can use the fetch under the following format:
<img width="625" alt="image" src="https://github.com/michellewww/react-native-group-order/assets/92122260/eca4c3e6-9e96-41f9-b977-07878047a924">

You should put all connection functions in this client.js file except for handling asyncstorage by react-native

## Backend Setup:
There are several popular backend frameworks such as Node, Flask, Java Springboot, Go, etc. We choose the FLASK because:
- supports multiple types of databases by default because it has no default model
- simplifies the integration of databases into Flask applications
- Support Secure cookies

1. Install the dependencies

`pip install flask`

`npm install axios`

`pip install python-dotenv`

If you are missing anything, please follow the debugger to install lol

2. Start
`python server.py`
You can see the following message in the terminal:
<img width="469" alt="image" src="https://github.com/michellewww/react-native-group-order/assets/92122260/cbb3ba6b-8c23-441b-a5f1-b1ffa87f6d6c">

Notice: the backend is running on the port 5001. 

## Use Online Template Reference

Currently updated from the template Katsura App project. 
