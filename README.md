# My Online Finance Tracker!

## What is it?

This app is a finance tracker that allows users to create accounts and log their expenses so that they can see how much they spend over time. It is meant to help people track their finances and be more aware of how much they spend so that they can be more financially conscious. The app uses Node.js and Express to create a web server that actually runs the app and handles HTTP requests. The app also connects to a MySQL database which is where all of the user and expense data is stored. The app has a simple setup: a login portal and a home page. The home page displays all of the user's logged expenses and has simple instructions for adding new expenses, editting them, and deleting them if necessary.

## Setup

Install Node.js version 12 or above and Redis. This should give you the npm command as well. In the home project directory, run "npm install" and that should give you all the node modules that the project relies on. You must first set up a MySQL database with the proper structure by running the databaseSetup.sql file in your SQL development tool (MySQL workbench recommended). You will have to modify the server.js file with your own SQL user data so that the app can connect to the SQL server. Then, you have to start the SQL server using "sudo mysql.server start". Next, start the redis-server using From the root project directory, you can run "node server.js" to have the app run on localhost:2814.(Note that these are the instructions for running the app locally because I only ran it locally in development). Please be sure to stop the MySQL and Redis servers when you are done deploying the app.

## Future Development

One idea that could be used to make this app truly special is incorporating the Twilio API. Using Twilio, the app could be slightly redesigned so that users can log new expense entries into their tracker by texting a phone number. The server could then process this message and modify the databse accordingly. This would make the app something more than just a basic online finance tracker. Additionally, the UI could be redesigned to be more intuitive and interactive. Also, more standard features of login pages could be added, like username and password recovery.  Contact me at sahir.mody@gmail.com if you would like some more ideas on features that could be added or have any questions about the project. Thanks!

