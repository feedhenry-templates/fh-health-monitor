# FeedHenry Health Monitor Service

The FeedHenry Health Monitor service is intended for monitoring back end systems which are accessable to the FeedHenry cloud (via VPN or IP Punchthrough) but may not be exposed publicaly on the Internet.

The Health Monitor service allows you to define back end systems to monitor - via either basic socket connection or via HTTP. Once a back end system has been defined, you can choose how often to monitor it.

Since the monitoring service is running within the FeedHenry Cloud, it runs within and fully supports the full lifecycle management flow FeedHenry offers. This means that connectivity to backend systems in different lifecycle environments (e.g. dev, test, QA, Prod) can be defined within the corresponding environment which the health monitoring service is deployed to. This ensures that the appropriate monitoring checks exist only within the correct environment - ensuring that there is no cross environment calls or leakage of information.

The monitoring service exposes a number of endpoints (defined below) which allow the creation, management and monitoring of back end service checks to be automated and integrated into other tools. For example, the monitoring service exposes endpoints which return both the latest status of individual checks and an amalgamated view of all defined checks. If any of the checks are currently failing, the response from the endpoint will reflect this, allowing notification systems (such as pager duty) to automatically alert on call engineers.

## MongoDB setup

By default, when a new FeedHenry service is created, it is configured to use the $fh.db() API, which provides a light weight data storage solution. However, the health monitoring service requires access to a full MongoDB instance to operate. This means that we must first configure an instance of MongoDB for the service to use.

This is a simple process, which should only take a few moments to complete. However, until it is complete, the Health Monitoring service can not be used.

To enable full MongoDB access, the following steps are required:

 * Navigate to the Data Browser view in the App Studio (Available in the Left Side Nav from within the service).
 * Click the "Upgrade Database" button in the top right corner of the screen.
 * Read the details of the upgrade steps and once satisfied, click the "Upgrade now >>" button.
 * An upgrade progress screen will be displayed showing the current status of the upgrade process.
 * Once the upgrade is complete, you will be prompted to re-deploy you app. Click the "Deploy >>" button to navigate to the deploy screen.
 * Re-deploy the service code to complete the process.

This process must be completed for each environment that the service is to be deployed to.

Until such time as this is complete, the health monitoring service will only display the above instructions. Once complete the service can be used to monitor back end systems.


## Local Development
For local development, the default value for the MongoDB connection string is defined in the Gruntfile.js as `mongodb://127.0.0.1/FH_LOCAL`. This makes use of the standard MongoDB used by $fh.db(). It requires that MongoDB is installed locally and that the FH_LOCAL database is available.


## Grunt Tasks 

### build 
Build client assets into a single index.html

### unit
Runt unit tests 

### accept 
Run acceptance tests 

### serve 
start the node application with local env vars 

## Env vars 

* FH_MONGODB_CONN_URL: mongodb connection string. used by mongo db driver to connec to a valid mongodb instance 
* HTTP(S)
