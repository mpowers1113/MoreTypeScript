export const today = new Date();

export let colors: string[] = ['green', 'blue', 'red'];

const logNumber: (i: number) => void = (i: number) =>{
  console.log(i)
}

const json = '{"value":5}'

const parsed: {x: number, y: number} = JSON.parse(json);

let words = ['red', 'blue', 'teal'];

