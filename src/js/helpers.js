import {API_URL, TIME_OUT} from "./config";



const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject (new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const AJAX = async function (url, uploadData = undefined) {
    try {
        const fetchPro = uploadData ?
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(uploadData),
            }) : fetch(url);
        const art = await Promise.race([fetch(url)])
        const data = await art.json();

        if (!art.ok) throw new Error(`${data.message} (${data.status})`);
        return data;

    } catch (err) {
        throw err;

    }
};



/*
export const getJSON = async function (url) {
    try {
        const fetchPro = fetch(url);
        // const art = await fetch(`${API_URL}/${id}`);
        // const art = await Promise.race([fetch(url), timeout(TIME_OUT)]);

        const art = await Promise.race([fetch(url)])
        const data = await art.json();

        if (!art.ok) throw new Error(`${data.message} (${data.status})`);
        return data;
    } catch (err) {
        throw err;
    }
};

export const sendJSON = async function (url, uploadData) {
    try {
        const fetchPro = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploadData),
        });


        const art = await Promise.race([fetch(url)])
        const data = await art.json();

        if (!art.ok) throw new Error(`${data.message} (${data.status})`);
        return data;
    } catch (err) {
        throw err;
    }
};
*/
