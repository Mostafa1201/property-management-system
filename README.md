# Aamar property management system (Assumptions)

* I assumed that there will be 2 steps for the process => the property will be created first, and then multiple units are added to it later.
* Since property can have multiple units, I added the "price per square meter" and "number of rooms" and status in the unit table.
* Property only has the property name and the location. 

# Using the application
* In order to be able to run the application you must specify a .env file that have the mysql credentials. This file should be similar to the .env.example file in the root directory.

# Development
# Installation

```bash
npm install
npm run start:dev
```

# Testing

```bash
npm run test
```