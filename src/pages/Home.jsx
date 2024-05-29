import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';

export default function Home() {

    
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortTypel, setSortTypel] = useState(0);

  useEffect(() => {
    fetch('https://632d6dfe0d7928c7d24ae553.mockapi.io/items')
    .then((res) => res.json())
    .then((arr) => {
        setItems(arr);
        setIsLoading(false);
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
            <Categories value={categoryId} onClickCategory={setCategoryId}/>
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(10)].map((_, index) => <Skeleton key={index}/>)
              : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
          </div>
    </div>
  )
}
