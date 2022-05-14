![Logo](logo.png)

[![Build Status](https://travis-ci.org/Nickersoft/push.js.svg?branch=master)](https://travis-ci.org/Nickersoft/push.js)

### What is Push? ###

Push is the fastest way to get up and running with Javascript desktop notifications. A fairly new addition to the official specification, the Notification API allows modern browsers such as Chrome, Safari, Firefox, and IE 9+ to push notifications to a user's desktop. Push acts as a cross-browser solution to this API, falling back to use  older implementations if the user's browser does not support the new API.

You can quickly install Push via [npm](http://npmjs.com):

```
npm install push.js --save
```

Or, if you want something a little more lightweight, you can give [Bower](http://bower.io) a try:

```
bower install push.js --save
```

For more information regarding the Push NPM package, [see here](https://www.npmjs.com/package/push.js).

#### Creating Notifications ####
So just how easy is it to create a notification using Push? We can do it in just one line, actually:

```javascript
Push.create('Hello World!')
```

No constructors, just a universal API you can access from anywhere. Push is even compatible with AMD as well:

```javascript
define(['pushjs'], function (Push) {
   Push.create('Hello World!');
});
```

If the browser does not have permission to send push notifications, Push will automatically request permission as soon as create() is called. Simple as that.

#### Closing Notifications ####
When it comes to closing notifications, you have a few options. You can either set a timeout (see "Options"), call Push's close() method, or pass around the notification's promise object and then call close() directly. Push's close() method will only work with newer browsers, taking in a notification's unique tag name and closing the first notification it finds with that tag:

```javascript
Push.create('Hello World!', {
    tag: 'foo'
});

// Somewhere later in your code...

Push.close('foo');
```

Alternatively, you can assign the notification promise returned by Push to a variable and close it directly using the promise's then() method:

```javascript
var promise = Push.create('Hello World!');

// Somewhere later in your code...

promise.then(function(notification) {
    notification.close();
});
```

When it comes to clearing all open notifications, that's just as easy as well:

```javascript
Push.clear();
```

**Important:** Although Javascript promises are [decently supported](http://caniuse.com/#search=promises) across browsers, there are still some browsers that lack support. If you find that you are trying to support a browser that doesn't support promises, chances are it won't support notifications either. However, if you are really determined, I encourage you to checkout the lightweight [promise-polyfill](https://github.com/taylorhakes/promise-polyfill) library by Taylor Hakes (or something similar). This library used to be bundled with Push, until it was decided that it'd be better to leave that sort of dependency to the user's discretion.

### Options ###

The only required argument in a Push call is a title. However, that doesn't mean you can't add a little something extra. You can pass in options to Push as well, like so:

```javascript
Push.create('Hello World!', {
    body: 'This is some body content!',
    icon: {
        x16: 'images/icon-x16.png',
        x32: 'images/icon-x32.png'
    },
    timeout: 5000
});
```

#### Available Options ####

* __body__: The body text of the notification.
* __icon__: Can be either the URL to an icon image or an array containing 16x16 and 32x32 pixel icon images (see above).
* __onClick__: Callback to execute when the notification is clicked.
* __onClose__: Callback to execute when the notification is closed (obsolete).
* __onError__: Callback to execute when if the notification throws an error.
* __onShow__: Callback to execute when the notification is shown (obsolete).
* __tag__: Unique tag used to identify the notification. Can be used to later close the notification manually.
* __timeout__: Time in milliseconds until notification closes automatically.
* __vibrate__: An array of durations for a mobile device receiving the notification to vibrate. For example, [200, 100] would vibrate first for 200 milliseconds, pause, then continue for 100 milliseconds. For more information, see below.

#### Mobile Support ####

Push can be used on Android Chrome (apparently Safari on iOS does not have notification support), but the website in which it is running on ***must*** use have a valid SSL certificate (HTTPS only!!) otherwise it will not work. This is due to Google's [decision to drop the Notification constructor](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/BygptYClroM) from mobile Chrome. Sucks but hey, that's life, am I right?

### See It In Action ###

Before you go out and try Push for yourself, you probably want to confirm it actually works in your browser, right?

Lucky for you a demo is available [here](http://nickersoft.github.io/push.js/demo.html).

### Development ###

If you feel like this library is your jam and you want to contribute (or you think I'm an idiot who missed something), check out Push's neat [contributing guidelines](CONTRIBUTING.md) on how you can make your mark.

### Credits ###
Push is based off work the following work:

1. [HTML5-Desktop-Notifications](https://github.com/ttsvetko/HTML5-Desktop-Notifications) by [Tsvetan Tsvetkov](https://github.com/ttsvetko)
2. [notify.js](https://github.com/alexgibson/notify.js) by [Alex Gibson](https://github.com/alexgibson)
