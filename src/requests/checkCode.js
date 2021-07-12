const checkCode = async (code) => {
	let url = 'https://fof-festival-api.herokuapp.com/api/mongo/checkCode?'
	if (window.location.href.indexOf('localhost') !== -1) {
		url = 'http://localhost:9000/api/mongo/checkCode?'
	}
	try {
		const res = await fetch(url + new URLSearchParams({
			code: code,
		}))
		if (res.status === 200) {
			return res.json()
		} else if (res.status === 404) {
			return { errors: 'invalid code' }
		} else {
			return { errors: res.statusText}
		}
	} catch (e) {
		return { errors: 'server is down'}
	}
}


export default checkCode
