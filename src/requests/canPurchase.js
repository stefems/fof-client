const checkCode = async (code, amount) => {
	let url = 'https://fof-festival-api.herokuapp.com/api/mongo/canPurchase?'
	if (window.location.href.indexOf('localhost') !== -1) {
		url = 'http://localhost:9000/api/mongo/canPurchase?'
	}
	const res = await fetch(url + new URLSearchParams({
		code: code,
		amount: amount
	}))
	if (res.status === 200) {
		return true
	} else {
		return false
	}
	
}


export default checkCode
