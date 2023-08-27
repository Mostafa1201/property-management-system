# Aamar property management system (Assumptions)

* I assumed that the property will be created in the dashboard (frontend) first, and then multiple units are added to it later.
* Since property can have multiple units, I added the "price per square meter" and "number of rooms" and status in the unit table.
* Property only has the property name and the location. 

# Using the application
* In order to be able to run the application you must specify a .env file that have the mysql credentials. This file should be similar to the .env.example file in the root directory.

# Development
# Installation

## Linux

```bash
npm install
npm run start:dev
```
