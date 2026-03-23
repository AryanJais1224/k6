import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 30,
    duration: '30s',
};

export default function () {
    const payload = JSON.stringify({
        title: "k6 test",
        body: "performance testing",
        userId: 1,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post('https://jsonplaceholder.typicode.com/posts', payload, params);

    check(res, {
        'status is 201': (r) => r.status === 201,
        'response time < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
}
