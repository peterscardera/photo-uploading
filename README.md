# photo-uploading

Resolvers
----------------------------------------------------------------
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
----------------------------------------------------------------
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
----------------------------------------------------------------