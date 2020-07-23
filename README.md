# photo-uploading

## Resolvers

<pre>
mutation newPhoto($input: PostPhotoInput!) {
  postPhoto(input:$input) {
    id
    name
    url
    description
    category
  }
}

variables:
{
  "input": {
    "name": "sample photo A",
    "description": "A sample photo for our dataset"
 }
}
</pre>

---

<pre>
query retrieve {
  allPhotos{
    description
    name
    id
    url
  }
}
</pre>

---

(TO RECEIVE ACCESS TOKEN)

<pre>
mutation {
    githubAuth(code:"CLIENT CODE") {
       token
       user {
         githubLogin
        name
        avatar
      }
    }
   }
   </pre>

## Once the token is received; we send it back with every request in the authorization header

to post photo (make sure auth token in header)

<pre>


mutation post($input: PostPhotoInput!) {
  postPhoto(input: $input) {
    id
    url
    postedBy {
      name
      avatar
    }
  }
}


(variable)

 {
  "input": {
    "name": "sample photo A",
    "description": "A sample photo for our dataset"
 }
}
</pre>
