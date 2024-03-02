export async function get({ url }) {

    console.log(url?.pathname); // use this to proxy on to the real image

    return fetch(`https://logowik.com/content/uploads/images/vercel1868.jpg`);
};