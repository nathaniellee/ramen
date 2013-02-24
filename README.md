Readyable
=========

The Readyable constructor produces an object that invokes supplied callbacks when individual AJAX calls have successfully returned and/or when all specified AJAX calls have successfully returned. I put this together as a way to execute code only after all necessary AJAX calls have been made without having to nest them.

jQuery is currently required for Readyable to work since the object uses jQuery's **ajax** method to handle AJAX requests. I may implement my own simple AJAX request method in the future to eliminate this requirement.

API
---

### #constructor

The Readyable constructor accepts a single argument: a hash of configuration objects that describe the AJAX request(s) to be made. Each such object has the following properties:

* **url**: The url to which this AJAX request will be made (required).
* **ready**: The callback function that should be invoked when this particular AJAX request successfully returns. Defaults to an empty function.
* **crossOrigin**: A boolean that indicates whether this AJAX request should use JSONP to handle cross-origin issues. Defaults to false.

### #onReady

Adds a function to be called when all AJAX requests configured in the constructor have successfully returned. The function uses the **Readyable** instance itself as the value of **this**. Said **Readyable** instance has a property **data** which is a hash using the same keys supplied in the constructor's configuration to reference the response data from each AJAX request.

```javascript
var obj = new Readyable(config);
obj.onReady(function () {
  var data = this.data, key;
  
  console.log("Here's all the data:");
  
  for (key in data) {
    console.log(data[key]);
  }
});
```

Usage
-----

Here's a nice little contrived example.

```javascript
var id, asyncs, obj;

function init() {
  var data = this.data,
    permissions = data["permissions"],
    profile = data["profile"],
    albums = data["albums"];
  
  Application.initialize({
    userName: profile.userName,
    avatar: profile.avatar,
    friends: profile.friends,
    albums: albums,
    permissions: permissions
  });
}
  
id = 12345;

asyncs = {
  "permissions": {
    url: "http://www.mysite.com/permissions/" + id,
    ready: function () {
      console.log("Successfully retrieved permissions data!");
    }
  },
  
  "profile": {
    url: "http://www.mysite.com/profiles/" + id,
    ready: function () {
      console.log("Successfully retrieved profile data!");
    }
  },
  
  "albums": {
    url: "http://www.mysite.com/albums/" + id,
    ready: function () {
      console.log("Successfully retrieved album data!");
    }
  }
};

obj = new Readyable(asyncs);
obj.onReady(init);
```

License
-------

### The MIT License (MIT)

Copyright (c) 2013 Nathaniel Lee

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
