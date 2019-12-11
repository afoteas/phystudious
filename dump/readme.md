First you need to spin up meteor.

Then if you run

meteor mongo
you will get an output something like this:

MongoDB shell version: 2.2.1

connecting to: 127.0.0.1:3001/meteor

Meteor db host is at 127.0.0.1 with a port of 3001. Exit the mongo shell and use mongodump from your terminal.

mongodump -h 127.0.0.1 --port 3001 -d meteor
Dumps will be located under the dumps folder in the folder you executed the above command.

You can import your db back to meteor with

mongorestore -h 127.0.0.1 --port 3001 -d meteor dump/meteor
