import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch()
  const {categoryId, sort} = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;

  const {searchValue} = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  useEffect(() => {
    setIsLoading(true);

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios.get(
      `https://632d6dfe0d7928c7d24ae553.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    .then((res) => {
      setItems(res.data);
      setIsLoading(false);
    });
    
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.filter(obj => {
    if(obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true
    }
    return false
  }).map((obj) => <PizzaBlock key={obj.id} {...obj}/>);
  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index}/>);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage = {(number) => setCurrentPage(number)}/>
    </div>
  );
}

export default Home