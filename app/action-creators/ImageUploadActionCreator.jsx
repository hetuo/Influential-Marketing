import axios from 'axios';

export const SAVE_IMAGE = 'SAVE_IMAGE';

export const save = image1 => {
	return {
		type: SAVE_IMAGE,
		image1
	}
}

export const saveImage = (image1) => dispatch =>{
		console.log("tring to save image");
    dispatch(save(image1))
}
