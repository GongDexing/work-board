function test(){
	Promise.resolve()
		.then(() => {
			setTimeout(() => {
				console.log('then1-1');
			}, 0)
			console.log('then1-2');
	//		throw new Error('erro in then 1')
		})
		.catch((e) => {})
		// .then(() => {
		// 	console.log('then2');
		// }, (e) => {
		// 	console.log('catch: ', e);
		// })
		.then(() => {
			console.log('then3');
		})
}
test();
