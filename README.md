# Electron Government Application

> Hyperledger Fabric Composer

## Setup
This project assumes:

- You have started the Hyperledger Fabric network
- You have a government employee
- You have a secrey key which the government provided


1. Update your bash profile with the following information (replace the ID and SECRET with your facebook info)
```
export COMPOSER_PROVIDERS='{
"facebook": {
    "provider": "facebook",
    "module": "passport-facebook",
    "clientID": "ID",
    "clientSecret": "SECRET",
    "authPath": "/auth/facebook",
    "callbackURL": "/auth/facebook/callback",
    "successRedirect": "http://localhost:9080?done=true"
    }
}'
```

2. Start the authorization rest API
```
npm run restAuthentication
```

3. Start the application
```
npm run dev
```

4. Provide your BSN and secret key

5. You should now be able to performs operations like viewing medical records which patients gave your organisation permission to.
