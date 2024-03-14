## Node.js course:
> Initial: create and add your own **api_key** into 'project_dir' `.env` file, `port` as well
```shell
npm install
```
> Enumeration of available endpoints represented in [app-requests.http](app-requests.http)

Entry point:
```shell
node ./app
```
 - PROXY 1: Hello world!

```shell
node ./node-js-basics/index
```
- PROXY-2: Connect Express framework [express.js line #235](package-lock.json);
- PROXY-3: Add environment variables [environments.js](app-utils/env-constants/environments.js);
- PROXY-4: Create a [first endpoint](app-requests.http):

```http request
GET http://localhost:4000/dad-jokes
```
- PROXY-5: use a [local API platform to perform requests](app-requests.http) (e.g: Postman);
- PROXY-6: Installed;
- PROXY-7: Added logic to modify response. 
- PROXY-8: Code refactoring, separated by layers:
  - new structure:
    <details><summary>Representation</summary>

    ```
    /node-js-course
    |
    |- app-utils
    |   |- [...]
    |- delivery
    |   |- router
    |   |   |- errors
    |   |   |   |- [...]
    |   |- [...]
    |- use-cases
    |   |- [...]
    |- [...]
    ```
    </details>
- PROXY-9: Add query params to response:
  - ``/meteors`` endpoint supports such params as:
    ```
      count: boolean
      were_dangerous_meteors: boolean
      start_date & end_date = format('YYYY-MM-DD')
    ```
  - returns transformed response bodies based on queryParam:
  ```json lines
  // ?count=true
  {
    "visible": {
      "meteors": 44
    }
  }
  // ?were_dangerous_meteors=true
  {
    "hazardous": {
      "amount": 2,
      "meteors": [
        {
          "id": "3712670",
          "name": "(2015 DN215)",
          "is_potentially_hazard": true
        },
        {
          "id": "2026663",
          "name": "26663 (2000 XK47)",
          "is_potentially_hazard": true
        }
      ]
    }
  }
  // including date, count and hazardous params will return concatenated representation objects from above
  {
    "visible": {
      "meteors": 60
    },
    "hazardous": {
      "amount": 1,
      "meteors": [
        {
          "id": "54429268",
          "name": "(2024 DV1)",
          "is_potentially_hazard": true
        }
      ]
    }
  }
  ```
- PROXY-10: TBD;
- PROXY-11: Add POST endpoint to obtain a photo;
- PROXY-12: Add validation to requests and responses;