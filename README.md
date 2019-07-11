# Online Finance Tracker

## Installing Dependencies

Install Node.js version 12 or above.
This should give you the npm command as well.
In the home project directory, run "npm install"


First Time Connecting to MySQL:

$ mysql -u root -p
Enter password: (enter your root password)

Reset your password
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_new_password';
mysql> FLUSH PRIVILEGES;
mysql> quit
Then try connecting using node



## Using the Application

you have to start the SQL server, then you can run main and create the connection
sudo mysql.server start
sudo mysql.server stop

