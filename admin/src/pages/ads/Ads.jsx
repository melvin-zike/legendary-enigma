import "./ads.css";
import { useState, useEffect, useContext } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { createAd } from "../../context/adContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import { AdContext } from "../../context/adContext/AdContext";

export default function Ads() {
  const [ad, setAd] = useState(null);
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AdContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setAd({...ad, [e.target.name]: value});
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file?.name;
      const storage = getStorage(app)
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, item.file)
      uploadTask.on(
        'state_changed', 
        (snapshot) => {
        const progress = 
        (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
        console.log("Upload is" + progress + "% Done.");
      },
      (err) => {console.log(err)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAd((prev) => {
           return { ...prev, [item.label]: downloadURL };
          })
          // console.log(downloadURL);
        });
        setUploaded((prev) => prev + 1)
       });
    });
};

  const handleUpload = async (e) => {
    e.preventDefault();
    upload([
      {file: img, label: "img"},
      {file: video, label: "video"},
    ]);
    
    
  }

  const handleSubmit =(e)=>{
   const userId = user._id;
    const adss = {...ad, userId}
    e.preventDefault();
     createAd(adss, dispatch); 
     console.log(adss);
  }
 
 
  console.log(img)
  console.log(video)


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Ads Center</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" name="img" onChange={(e) => setImg(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="John Wick" name="title" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="description" name="desc" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Link</label>
          <input type="text" placeholder="description" name="link" onChange={handleChange}/>
        </div>
        
        <div className="addProductItem">
          <label>Is Video</label>
          <select name="isVideo" id="isVideo" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" placeholder="limit" name="video" onChange={(e) => setVideo(e.target.files[0])}/>
        </div>
        {uploaded === 2 ? (
          <button className="addProductButton" onClick={handleSubmit}>Create</button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>Upload</button>
        ) 
        }
      </form>
    </div>
  );
}