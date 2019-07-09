# S.A.M., the Finance Tracker

## Installing Dependencies

Install Node.js version 12 or above.
This should give you the npm command as well. 
In the home project directory, run "npm install"


## Installation Notes

sudo mysql.server start
sudo mysql.server stop
- use mysql workbench to construct database

Full Steps For MySQL 8

Connect to MySQL

$ mysql -u root -p
Enter password: (enter your root password)
Reset your password

(Replace your_new_password with the password you want to use)

mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_new_password';
mysql> FLUSH PRIVILEGES;
mysql> quit
Then try connecting using node



## Using the Application

you have to start the SQL server, then you can run main and create the connection

use MySQL workbench to make overall changes to the database



## DEVELOPMENT NOTES

const twilio = require('twilio');

TWILIO_ACCOUNT_SID = 'AC04427c1f97352f5c3ccda8dee0153eaf'
TWILIO_AUTH_TOKEN = 'cb7d0dac53211c8c15ed7cd2dd07beee'

var client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

client.messages.create({
    to: '+17328501382',
    from: '+12029155210',
    body: 'Ahoy from Twilio!'
  });

