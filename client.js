var source = new EventSource('http://127.0.0.1:8844/stream');

source.onopen = function (event) {
    console.log('onopen'.event);
};

source.onerror = function (event) {
    console.log('onerror', event);
};

source.onmessage = function (event) {
    console.log('onmessage', event);
};

source.addEventListener('event1', function (event) {
    console.log('event1', event);
}, false);

source.addEventListener('event2', function (event) {
    console.log('event2', event);
}, false);

