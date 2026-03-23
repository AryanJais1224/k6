import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '10s', target: 200 },
        { duration: '10s', target: 10 },
    ],
};

export default function () {
    const res = http.get('https://jsonplaceholder.typicode.com/albums');

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(1);
}
