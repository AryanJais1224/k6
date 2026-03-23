import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 50 },
        { duration: '30s', target: 100 },
        { duration: '30s', target: 150 },
        { duration: '30s', target: 0 },
    ],
};

export default function () {
    const res = http.get('https://jsonplaceholder.typicode.com/comments');

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(1);
}
