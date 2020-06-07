
# Georgy - 2020-06-08
## Installation
Node 12+ and `yarn` are required

`3000` and `3003` ports on localhost should be open to use

### Install dependencies
From project root directory run:
`yarn`

Client and server should be started in parallel to execute the app

Client app will open at http://localhost:3000

### Client
From project root directory run:
`yarn start`
### Server
From project root directory run:
`yarn server`


## Security
List security concerns:
- that have been addressed
  - file upload access rights
  - random file names after upload
  - storing file metadata in db
  - CORS
  - CSP (except `style-src 'unsafe-inline'` due to `create-react-app` dev bundle issue)
  - file validation on client
  - file validation on server
  - detect MIME type & content type of uploaded files
  - throttling of requests to API
- that have *not* been addressed
  - CSP `style-src 'unsafe-inline'` due to `create-react-app` dev bundle issue)
  - captcha
  - CSRF
  - https

## Improvements
- Client
  - implement better error reporting
  - implement better (more beautiful) styling
  - improve unit test coverage
    - api
    - useFiles hook
  - download uploaded files (not specified in requirements)
  - improve snapshots for better structural checks
- Server
  - serve uploaded files through API (not specified in requirements)
  - add better API description in that README
  - refactor `server.ts` file
- common
  - add port configuration instead of hardcoded ports
  - add configuration for production environment

## Libraries
- (server) `body-parser` - to automatic parsing of request bodies in server
- (server) `cors` - to add CORS support to API
- (client) `enzyme enzyme-adapter-react-16 enzyme-to-json` - testing library 
for React
- (server) `express` - to create server for API
- (server) `express-fileupload` - to handle file upload on server
- (server) `file-type` - to validate file content type
- (server) `fs-extra` - to have better `fs` API
- (client) `lodash.throttle` - to throttle network requests to API
- (server) `nedb` - to store data using mongo-like database
- (client) `node-sass` - to write styles
- (server) `ts-node-dev` - to use typescript on server
- (client, server) `typescript` - to be cool
- (server) `uuid` - to randomise file names

## API
API follows basic REST guidelines for `file` entity

### GET /files
- fetches all files sorted by created date
- returns JSON with files data
- accepts optional `search` query param to filter files by original name

### POST /files
- uploads new file
- returns upload status
- accepts `multipart/form-data`
- accepts `files.upload` post param of `File | File[]` type
- max size of each file is 10Mb
- files could be of PNG or JPEG content types

### DELETE /files/:id
- deletes file by internal DB id
- returns upload status
- accepts `:id` url param

---
## Other notes
- file & folder structure is a matter of discussion. For the given scale file 
structure is reasonable and easily improved in future