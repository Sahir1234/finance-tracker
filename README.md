# My Online Finance Tracker!

## Using the App

Install Node.js version 12 or above. This should give you the npm command as well. In the home project directory, run "npm install" and that should give you all the node modules that the project relies on. You must first set up a MySQL database with the proper structure by running the databaseSetup.sql file in your SQL development tool (MySQL workbench recommended). You will have to modify the server.js file with your own SQL user data so that the app can connect to the SQL server and access the data it needs to. Then, you have to start the SQL server using "sudo mysql.server start". From the root project directory, you can run "node server.js" to have the app run on localhost:2814. You can go to this site to run the app in your browser. (Note that these are the instructions for running the app locally because I only ran it locally in development). Once you sign up on the site, you can log into the home page and see a display of all of your previously logged expenses. You can also add expenses, delete them, or edit them as necessary.

## Future Development

One idea that could be used to make this app truly special is incorporating the Twilio API. Using Twilio, the app could be slightly redesigned so that users can log new expense entries into their tracker by texting a phone number. The server could then process this message and modify the databse accordingly. This would make the app something more than just a basic online finance tracker. There are some features related to making sure accounts are secure that could still be developed, like having a recoverty email for forgotten passwords and making the journal more interactive. Contact me at sahir.mody@gmail.com if you would like some more ideas on areas for development or have any questions about the project. Thanks!

