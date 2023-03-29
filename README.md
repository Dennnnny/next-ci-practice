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
  

reference:https://gist.github.com/palewire/12c4b2b974ef735d22da7493cf7f4d37



issue:
google-github-actions/auth failed with: retry function failed after 1 attempt: failed to generate Google Cloud access token for ***: (403)
something wrong with wif...

after follow the steps of reference
it works
and now I'm going to compare the difference 
of pool and SA


sa: 
感覺很像是principalSet這一個比較有差， 差別在 repo 前面有沒有放名字 :Dennnnny/next-ci-practice
而這個東西的設定 是在pool裡面

pool:
設定了 grant access : only identities matching the filter
這邊選擇 repository = Dennnnny/next-ci-practice

而這個repository會出現是因為 在 pool設定裡面
有新增一些對應條件：audience mapping
attribue.repository = assertion.repository
看起來也可以設定作者(?) actor(?) 之類的 （？） not sure 



