import { Link, useLocation } from "react-router-dom";
import "./product.css";
// import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";

export default function Product() {
    const location = useLocation();
    const movie = location.movie;
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          {/* <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
          </div> */}
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={movie?.img} alt="" className="productInfoImg" />
                  <span className="productName">{movie?.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{movie?.id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">genre:</span>
                      <span className="productInfoValue">{movie?.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">year:</span>
                      <span className="productInfoValue">{movie?.year}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">limit:</span>
                      <span className="productInfoValue">{movie?.limit}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Movie Title</label>
                  <input type="text" placeholder={movie?.title} />
                  
                  <input type="text" placeholder={movie?.year} />
                  <label>Year</label>
                  <input type="text" placeholder={movie?.genre} />
                  <label>Year</label>
                  <input type="text" placeholder={movie?.limit} />
                  <label>Year</label>
                  <input type="file" placeholder={movie?.trailer} />
                  <label>Year</label>
                  <input type="file" placeholder={movie?.video} />
                  <label>Year</label>
                  {/* <select name="inStock" id="idStock">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select>
                  <label>Active</label>
                  <select name="active" id="active">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select> */}
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={movie?.img} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}