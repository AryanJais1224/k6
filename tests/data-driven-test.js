import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomInt } from '../utils/helpers.js';
import data from '../data/test-data.json';

export let options = {
    vus: 20,
    duration: '30s',
};

export default function () {
    const randomData = data[randomInt(data.length)];

    const payload = JSON.stringify(randomData);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post('https://jsonplaceholder.typicode.com/posts', payload, params);

    check(res, {
        'status is 201': (r) => r.status === 201,
    });

    sleep(1);
}
