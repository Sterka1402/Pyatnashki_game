function shuffle(arr){
	for(var i = arr.length - 1; i > 0; i--){
		let j = Math.floor(Math.random()*(i + 1));
		let temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}
export default shuffle;

