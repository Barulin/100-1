export interface IRound {
  name: string;
  shortName: string;
  index: number;
  pointsStrict: boolean;
  pointsCoef: number;
}

export const ROUNDS: IRound[] = [{
  name: 'Простая игра',
  shortName: '1',
  index: 1,
  pointsStrict: false,
  pointsCoef: 1
}, {
  name: 'Двойная игра',
  shortName: '2',
  index: 2,
  pointsStrict: false,
  pointsCoef: 2
},{
  name: 'Тройная игра',
  shortName: '3',
  index: 3,
  pointsStrict: false,
  pointsCoef: 3
},{
  name: 'Игра наоборот',
  shortName: 'Н',
  index: 4,
  pointsStrict: true,
  pointsCoef: 1
}];

export const STRICT_POINTS = {
  1: 15,
  2: 30,
  3: 60,
  4: 120,
  5: 180,
  6: 240
};