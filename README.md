**Prerequisites:-** <br>
- Node server should install.
  Node Version: v14.16.0
- Vscode should Install 
- Playwright should install.
  PlayWright Version: 1.42.1
 
**Steps for running the program** <br>
Clone the Repository: Clone the repository to your local machine using Git. Open a terminal and execute the following command:


```git clone <repository_url>```

Replace <repository_url> with the URL of the Git repository you want to clone.
Navigate to the Project Directory: Use the cd command to change your current directory to the project directory:


```cd Tryloop/tryLoop```

Install Dependencies: Run npm install to install the necessary dependencies for the project. This command will read the package.json file and install all required packages:


```npm i```

Install Playwright: Playwright can be installed as a development dependency using npm. Run the following command to install Playwright:


```npm install playwright --save-dev```

This command will install Playwright and add it to the list of development dependencies in your package.json file.
Set Up Tests: If you're setting up tests, create test files in the appropriate directory (e.g., tests or __tests__). Write your test scripts using Playwright to automate interactions with your web application.
Run Tests: Depending on your testing framework, you can run your tests using the appropriate command. For example, if you're using Jest, you can run tests using:

```npx playwright test -g "tryloopDataVerification.spec.js" --headed```

*Test case 1 Output*

<img width="1091" alt="Screenshot 2024-03-07 at 9 54 47 PM" src="https://github.com/vipinsonu1/tryLoop/assets/7632569/125fce45-e5a1-417a-a74a-ffe94713edd0">

*report summary* <br/>

<img width="1118" alt="Screenshot 2024-03-08 at 3 00 54 AM" src="https://github.com/vipinsonu1/tryLoop/assets/7632569/7c0a253d-b7c0-4164-8811-5ebe56b74f96">


