import { v4 as uuid } from 'uuid';
export default {
	x: "0",
	y: "0",
	width: "600",
	height: "300",
	zIndex:2,
	children: [{
		[`tr_${uuid()}`]: [{
			[`td_${uuid()}`]: "1",
			[`td_${uuid()}`]: "2",
		}]
	}]
}
