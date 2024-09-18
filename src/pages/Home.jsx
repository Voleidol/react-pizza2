import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {categoryId, sort, currentPage} = useSelector((state) => state.filter);
  const {items, status} = useSelector((state) => state.pizza);
  const sortType = sort.sortProperty;

  const {searchValue} = useContext(SearchContext);
  // const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    // setIsLoading(true);

    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // if (window.location.search) {
      getPizzas();
    // }
  }, [categoryId, sortType, searchValue, currentPage]);
  
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>);
  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index}/>);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className='content__error-info'>
          <h2>
            Произошла ошибка <icon>😕</icon>
          </h2>
          <p>
            К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      {/* <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div> */}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home