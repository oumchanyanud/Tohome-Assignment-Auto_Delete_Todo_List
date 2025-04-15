'use client'; 

import { useState } from 'react';
import { items as initialItems, Item } from './data'; 

export default function Home() {
  const [mainList, setMainList] = useState<Item[]>(initialItems);
  const [selected, setSelected] = useState<{ [key: string]: NodeJS.Timeout }>({});

  const [typeList, setTypeList] = useState<{ Fruit: Item[]; Vegetable: Item[] }>({
    Fruit: [],
    Vegetable: [],
  });

  //sound
  const playClickSound = () => {
    const audio = new Audio('/click.mp3');
    audio.play();
  };

  //select
  const moveToType = (item: Item) => {
    if (selected[item.name]) return; //if items selected skip
    playClickSound();
    setMainList((prev) => prev.filter((i) => i.name !== item.name)); //move item out from main list
    setTypeList((prev) => ({ ...prev, [item.type]: [...prev[item.type], item] })); //push to fruit or veget
    
    //Timer
    const timeout = setTimeout(() => {
      //remove item from typelist
      setTypeList((prev) => ({
        ...prev,
        [item.type]: prev[item.type].filter((i) => i.name !== item.name),
      }));
      //push in main list
      setMainList((prev) => [...prev, item]);
      //remove time out of selected
      setSelected((prev) => {
        const { [item.name]: _, ...rest } = prev;
        return rest;
      });
    }, 5000);

    //save timeout in selected(immediately move when click)
    setSelected((prev) => ({ ...prev, [item.name]: timeout }));
  };

  const moveBackToMain = (item: Item) => {
    playClickSound();
    clearTimeout(selected[item.name]);
    //remove from typelist
    setTypeList((prev) => ({
      ...prev,
      [item.type]: prev[item.type].filter((i) => i.name !== item.name),
    }));
    //add to main
    setMainList((prev) => [...prev, item]);
    //romove from selected
    setSelected((prev) => {
      const { [item.name]: _, ...rest } = prev;
      return rest;
    });
  };

  //move with handle
  const handleDrop = (item: Item, type: 'Fruit' | 'Vegetable') => {
    moveToType(item);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="p-6 flex justify-center">
        <h1 className="text-2xl font-bold">Auto Delete Todo List 🍏🥕</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto p-4">
        {['Main', 'Fruit', 'Vegetable'].map((column) => (
          <div
            key={column}
            className="bg-white border rounded-md p-4 shadow-md transition-all"
            onDragOver={(e) => e.preventDefault()} //allow drop item on container
            onDrop={(e) => {
              const item = JSON.parse(e.dataTransfer.getData('item'));
              //only handle drop in fruit and veget columns
              if (column !== 'Main') handleDrop(item, column as 'Fruit' | 'Vegetable');
            }}
          >
            {/* column title */}
            <h2 className="text-lg font-semibold border-b pb-2 text-center mb-4">
              {column === 'Main' ? 'Main List' : column}
            </h2>

            {/* item list in each column */}
            <div className="flex flex-col gap-2">
              {(column === 'Main' ? mainList : typeList[column as 'Fruit' | 'Vegetable']).map(
                (item) => (
                  <button
                    key={item.name}
                    draggable //enable drag & drop
                    //set data to transfer when dragging
                    onDragStart={(e) =>
                      e.dataTransfer.setData('item', JSON.stringify(item))
                    }
                    //if in main list → move to type list; else → move back
                    onClick={() =>
                      column === 'Main' ? moveToType(item) : moveBackToMain(item)
                    }

                    //style
                    className={`flex items-center gap-2 px-4 py-2 border rounded text-left 
                      transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-sm
                      ${
                        column === 'Main'
                          ? 'bg-blue-50'
                          : column === 'Fruit'
                          ? 'bg-green-100'
                          : 'bg-yellow-100'
                      }`}
                  >
                    {/* Emoji & item name */}
                    <span className="text-xl">{item.emoji}</span>
                    <span>{item.name}</span>
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
