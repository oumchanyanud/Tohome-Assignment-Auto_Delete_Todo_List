export type Item = {
  type: 'Fruit' | 'Vegetable';
  name: string;
  emoji: string;
};

export const items: Item[] = [
  { type: 'Fruit', name: 'Apple', emoji: '🍎' },
  { type: 'Vegetable', name: 'Broccoli', emoji: '🥦' },
  { type: 'Vegetable', name: 'Mushroom', emoji: '🍄' },
  { type: 'Fruit', name: 'Banana', emoji: '🍌' },
  { type: 'Vegetable', name: 'Tomato', emoji: '🍅' },
  { type: 'Fruit', name: 'Orange', emoji: '🍊' },
  { type: 'Fruit', name: 'Mango', emoji: '🥭' },
  { type: 'Fruit', name: 'Pineapple', emoji: '🍍' },
  { type: 'Vegetable', name: 'Cucumber', emoji: '🥒' },
  { type: 'Fruit', name: 'Watermelon', emoji: '🍉' },
  { type: 'Vegetable', name: 'Carrot', emoji: '🥕' },
];