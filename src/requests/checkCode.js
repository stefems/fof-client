const checkCode = async (code) => {
	let url = 'https://fof-festival-api.herokuapp.com/api/mongo/checkCode?'
	if (window.location.href.indexOf('localhost') !== -1) {
		url = 'http://localhost:9000/api/mongo/checkCode?'
	}
	const res = await fetch(url + new URLSearchParams({
		code: code,
	}))
	if (res.status === 200) {
		return res.json()
	} else {
		return false
	}
}


export default checkCode
