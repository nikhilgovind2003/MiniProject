import React,{ useEffect,useState } from "react";
import { Product } from "./product";
import "./shop.css";
import axios from 'axios'

export const Shop = () => {
  const [products,setProducts]=useState([])
  const [recommendedProducts,setRecommendedProducts]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;


  useEffect(()=>{
      axios.get('https://fakestoreapi.com/products')
      .then((response)=>{
          setProducts(response.data)
          console.log(response.data)

      })
      
  },[]);


  function recommend(products) {
    const sortedProducts = [...products].sort((a, b) => {
      const ratingComparison = b.rating.rate - a.rating.rate;
  
      if (ratingComparison === 0) {
        return a.price - b.price;
      }
  
      return ratingComparison;
    });
    const limitedRecommendedProducts = sortedProducts.slice(0, 6);
    setRecommendedProducts(limitedRecommendedProducts);
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      recommend(products);
    }
  }, [products, currentPage]);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Online Shopping</h1>
      </div>

      <div className="products">
        {products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((product) => (
          <Product data={product} />
        ))}
      
      </div>
      <div className="pagination">
        <div className="previousButton">

            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        
        </div>
            
            
            {Array.from({ length: totalPages }).map((_, index) => (
              <div className="pageNumbers">

              <button key={index + 1} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>{index + 1}</button>
              </div>
            ))}
            <div className="nextButton">

            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
      {localStorage.getItem('user') && (
       <div className="recommendation">
        <div className="recommendationHeading">
        <h2>Recommendations</h2>
        </div>
        <div className="products">
        {recommendedProducts.map((product) => (
          <Product data={product} />
        ))}
      
      </div>
       </div>
        
      )
      }
    </div>
  );
};
