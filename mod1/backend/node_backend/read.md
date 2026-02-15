

# api package-1


# this app is crteated by SbhTechHub production

# which is owned by Er. Saurabh Yadav





# Google2OAuth:

        1.  onsucces(res)=  res={credentials,clientId}       => frontend
        2.  token= res.credentials
        3.   client=new OAuth2Client(clientId)
        4.  ticket= client.verifIdToken({idToken:token,audiance:clientId})
        5.   payloade=ticket.getPayloade()

        payloade={
            googleId,
            name,
            email,
            picture
        }