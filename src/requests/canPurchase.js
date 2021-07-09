const canPurchase = async (code) => {
	let url = 'https://fof-festival-api.herokuapp.com/api/mongo/canPurchase?'
	if (window.location.href.indexOf('localhost') !== -1) {
		url = 'http://localhost:9000/api/mongo/canPurchase?'
	}
	const res = await fetch(url + new URLSearchParams({
		code: code
	}))
	if (res.status === 200) {
		const body = await res.json()
		return { status: true }
	} else {
		return { status: false }
	}
}


export default canPurchase
