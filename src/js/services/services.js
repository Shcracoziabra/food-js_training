const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: data
    });
    if (!result.ok) {
        throw new Error (`Could not upload data on resourse ${url}, error: ${result.status}`);
    }
    return await result.json();
};

const getRequest = async (url) => {
    const result = await fetch(url);
    return await result.json();
};

export {postData};
export {getRequest};