import { useState } from "react";

function Categories() {

  const categoriesMass = [
    'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  const onClickCategories = (index) => {
    setActiveIndex(index);
  };

    return (
      <div className="categories">
        <ul>
          {categoriesMass.map((item, index) => (
            <li onClick={() => onClickCategories(index)} className={activeIndex === index ? 'active' : ''}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  export default Categories;