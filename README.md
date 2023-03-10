# Practicing CI for next.js project

Here is basically what I did:

1. build a next.js project by create-next-app 

2. add testing-library with this [example](https://github.com/vercel/next.js/tree/canary/examples/with-jest)

3. create a .github/workflows in repo

4. try to make a .yaml file 

note: 
  - should use actions/checkout@v3 actions/setup-node@v3 and use node 16
  - npm run test:ci, be sure to add this one 『:ci』



5. run github-actions steps by steps
  - testing
  - auth of gar
  - docker build and push

note:
  I was stucked in 403 forbidden. turns out in GCP service account does not have enough permission to access gar
  so I go SA to add more roles. 
  in total I add three roles: Artifact registry writer, service account token creator, storage admin
  
