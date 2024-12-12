type RowObj = {
	id: number;
	name: string;
	tech: string[];
	date: string;
	progress: number;
	age: string;
};

const tableDataComplex: RowObj[] = [
	{
		id: 10,
		name: 'Keon Lee',
		tech: [ 'apple', 'android', 'windows' ],
		date: '12.Jan.2021',
		progress: 75.5,
		age: '10',
	},
	{
		id: 11,
		name: 'Marketplace',
		tech: [ 'apple', 'android', 'windows' ],
		date: '12.Jan.2021',
		progress: 75.5,
		age: '10',
	},
	{
		id: 12,
		name: 'Venus DB PRO',
		tech: [ 'apple' ],
		date: '21.Feb.2021',
		progress: 35.4,
		age: '10',
	},
	{
		id: 13,
		name: 'Venus DS',
		tech: [ 'apple', 'windows' ],
		date: '13.Mar.2021',
		progress: 25,
		age: '10',
	},
	{
		id: 14,
		name: 'Venus 3D Asset',
		tech: [ 'apple', 'android', 'windows' ],
		date: '24.Jan.2021',
		progress: 100,
		age: '10',
	},
	{
		id: 15,
		name: 'Marketplace',
		tech: [ 'apple', 'windows' ],
		date: 'Oct 24, 2022',
		progress: 75.5,
		age: '10',
	},
];
export default tableDataComplex;
