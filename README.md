# Electron Government Application

> Hyperledger Fabric Composer

## Setup
This project assumes:

- You have started the Hyperledger Fabric network
- You have a government employee
- You have a secrey key which the government provided



1. Start the authorization rest API
```
npm run restAuthentication
```

2. Start the application
```
npm run dev
```

3. Provide your BSN and secret key

4. You should now be able to performs operations like viewing medical records which patients gave your organisation permission to.
