export function checkFinishGame(inputArr, outputArr) {
	const inputArrSum = inputArr.flat().reduce((acc, item, index) => {
		if (item) return acc + index + 1;
		return acc;
	}, 0);
	const outputArrSum = outputArr.reduce((acc, item) => acc + +item, 0);

	// console.log('inputArrSum:', inputArrSum);
	// console.log('outputArrSum:', outputArrSum);
	if (inputArrSum === outputArrSum) {
		console.log('finishGame');
		return true;
	}
}
