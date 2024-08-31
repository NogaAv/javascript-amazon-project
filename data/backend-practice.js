//To send an HTTP message, we will use a built-in class called : XMLHttpRequest()

const xhr = new XMLHttpRequest(); //creates a new HTTP message/request.

//We should define the event-listener at the top - before we trigger the event and call xhr.send()
//'load' - means the response has loaded
xhr.addEventListener('load', () => {
  //here the response was loaded already, so we can call: xhr.response;
  console.log(xhr.response); //the response will be consoled in checkout webpage condole
  //console.log(typeof xhr.response); //string
});

//next, we need to setup this request:
// 1'st param - Type of HTTP message
// 2'nd parameter - Where to send this HTTP message (URL)
xhr.open('GET', 'https://supersimplebackend.dev');

//sending the message on the internet.
//now- we import this file in checkout.js, then open the checkout page with Live-server,
//and- open 'inspect' -> 'Network' tab.
xhr.send(); //async code

//getting the response back.
//if we were to call here (and not inside event-listener):
//  xhr.response;
//That would be problematic, because-
// It takes time for the request to travel across the internet, so the response is not
//available right away, and xhr.response will be undefined at first.
//so- the 'xhr.send()' function is known as:
//'Asynchronous code' - that means that xhr.send() doesn't wait for that code to finish -
//It just sends the request and immidiately goes to the next line.
//The response may come sometime in the futur, but we don't have access to it
//right here in next line
//So - this is why we need to wait for the response to come back first, and only then access the
//response.
//This is why we added addEventListener that waits to an event.
//  xhr.response;  //returns undefined here

//We can send different requests to the backend, using URL paths
//Each URL path will give us a different ersponse.
xhr.open('GET', 'https://supersimplebackend.dev/hello');
xhr.send(); //returns text 'hello'

xhr.open('GET', 'https://supersimplebackend.dev/products/first');
xhr.send(); //returns json

//If we send a request to a URL path that is not spported, the backend will respond with an error:
xhr.open('GET', 'https://supersimplebackend.dev/not-supported');
xhr.send(); //returns error from backend:
/*
First line of red x error is automatic error sent from server. It has the data:
Type of request we sent (which is GET), The URL we sent it to, and a- Status Code (here- 404)

The next is the developer error msg:
{"errorMessage":"Error: this URL path is not supported.}

*/

xhr.open('GET', 'https://supersimplebackend.dev/documentation');
xhr.send();

xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg');
xhr.send();
