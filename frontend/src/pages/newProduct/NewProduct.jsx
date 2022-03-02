import "./newProduct.scss";
import axios from "axios";
// import Navbar from "../../components/navbar/Navbar";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { MentionsInput, Mention } from "react-mentions";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
// import { ListItemSecondaryAction } from "@material-ui/core";
// import { Done } from "@material-ui/icons";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import { Cancel } from "@material-ui/icons";

export default function NewProduct() {
  const [movies, setMovie] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const { dispatch } = useContext(MovieContext);
  const { user } = useContext(AuthContext);
  const [progressing, setProgressing] = useState(0);

  // newconst [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [users, setUsers] = useState([]);
  // const [tagNames, setTagNames] = useState([]);
  const myInput = useRef();
  const myContainer = useRef(null);
  const history = useHistory();
  let seconds = myContainer[0]?.length;
  
  
  // // Get users and tags
  // useEffect(() => {
  //   getActors();
  // }, []);


  // function addContent(input) {
  //   if (input.length <= 350) {
  //     setContent(input);
  //   }
  // }

  // async function getActors() {
  //   const res = await axios.get(`/users/all`, {
  //     headers: {
  //       token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
  //     },
  //   });
  //   // Transform the users to what react-mentions expects
  //   const usersArr = [];
  //   res.data.map((item) =>
  //     usersArr.push({
  //       id: item._id,
  //       display: item.username,
  //     })
  //   );
  //   setUsers(usersArr);
  // }

  // async function asyncTags(query, callback) {
  //   if (!query) return;

  //   axios.get(`/tags/search?name=${query}`, {
  //     headers: {
  //       token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
  //     },
  //   })
  //     .then((res) => {
  //       if (res.data.length) {
  //         const suggestion = { id: query, display: query };
  //         const tagsArray = res.data.map((tag) => ({
  //           id: tag._id,
  //           display: tag.name,
  //         }));
  //         return [...tagsArray, suggestion];
  //       } else {
  //         return [{ id: query, display: query }];
  //       }
  //     })
  //     .then(callback);
  // }


  const handleChange = (e) => {
    const value = e.target.value;
    // console.log(e.target.value);
    setMovie({...movies, [e.target.name]: value});
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
          setProgressing(Math.floor(progress));
        },
        (err) => {console.log(err)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMovie((prev) => {
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
    if(video.size > 9366938){
      alert("video file too large");
      window.location.reload();
    }else{
      upload([
        {file: video, label: "video"},
        
      ]);
    }
    
    
  }
  // 10485760 
  // 9366938

  const handleSubmit =(e)=>{
    e.preventDefault();

    // let newContent = content;

    // newContent = newContent.split("@@@__").join('<a href="/user/');
    // newContent = newContent.split("^^^__").join(`">@`);
    // newContent = newContent.split("@@@^^^").join("</a>");

    // newContent = newContent.split("$$$__").join('<a href="/tag/');
    // newContent = newContent.split("~~~__").join(`">#`);
    // newContent = newContent.split("$$$~~~").join("</a>");
    // if (newContent !== "") {
    //   let desc = newContent.trim();
    //   //Call to your DataBase like backendModule.savePost(body,  along_with_other_params);
    //   tagNames.map(async (tag) => {
    //     try {
    //      const res = await axios.post("/tags", {
    //         name: tag,
    //       });
    //       console.log(res.data);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   });


      try {
        if(video.size > 9366938 ){
          alert("Video should be less than or 1min")
        }else{
        const moviepost = { ...movies}
        const userId = user._id;
        const moviee = {...moviepost, userId}
        const username = user?.username;
        const movieee = {...moviee, username}
        const userprofile = user?.profilePic
        const movie = {...movieee, userprofile}
        createMovie(movie, dispatch); 
        console.log(movie);
         history.push("/");
        }
        
      } catch (error) {
        console.error(error);
      }
    }

  // }
  



  return (
    <>
    <div className="pruductpage">
   
    <div className="newProduct">
      <h1 className="addProductCaption">Upload A Video</h1>
      <p className="addProductTitle">Upload a nice poster picture and a video(between 0 to 1 minutes long) of your self singing to impress potential sponsors and donor</p>
      
      <div className="progressss">
      {progressing === 0 ? "" : progressing < 100  ? `Uploading... ${progressing}%` : progressing === 100  ? "UPLOAD SUCCESSFUL... Create Your Video" : ""}
      </div>
      
    

     
      <form className="addProductForm">
        {/* <div className="addProductItem">
          <label>Title image</label>
          <input type="file" id="imgTitle" name="imgTitle" onChange={(e) => setImgTitle(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Thumbnail image</label>
          <input type="file" id="imgSm"  name="imgSm" onChange={(e) => setImgSm(e.target.files[0])}/>
        </div> */}
       
        <div className="addProductItem">
  {/* descripion input */}
  
     <div className="description-input">
     
        <div className="addProductItem">
          <label>Description</label>
         <input type="text" placeholder="description" name="desc" onChange={handleChange} />
        </div>
          
       
     
          {/* <MentionsInput
            className="mentions"
            inputRef={myInput}
            spellCheck="false"
            placeholder="Describe everything about this post here"
            value={content}
            onChange={(event) => addContent(event.target.value)}
          >
            <Mention
              trigger="@"
              data={users}
              markup="@@@____id__^^^____display__@@@^^^"
              style={{
                backgroundColor: "#daf4fa",
              }}
              // onAdd={(id) => setActorIds((actorIds) => [...actorIds, id])}
              appendSpaceOnAdd={true}
            />
            <Mention
              trigger="#"
              data={asyncTags}
              markup="$$$____id__~~~____display__$$$~~~"
              style={{
                backgroundColor: "#daf4fa",
              }}
              onAdd={(display) =>
                setTagNames((tagNames) => [...tagNames, display])
              }
              appendSpaceOnAdd={true}
            />
          </MentionsInput> */}
          {/* <div className="">
          <div
            onClick={() => {
              myInput.current.focus();
              setContent((content) => content + "@");
            }}
            className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full py-1 px-6"
          >
           
          </div>
          <div
            onClick={() => {
              myInput.current.focus();
              setContent((content) => content + "#");
            }}
            className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full py-1 px-6"
          >
           
          </div>
          <div className="count ml-auto text-gray-400 text-xs font-semibold">
            {350 - content.length}
          </div>
          </div> */}
        </div>
          {/* <label>Description</label>
          <input type="text" placeholder="description" name="desc" onChange={handleChange}/> */}
        </div>
       
        
        {/* <div className="addProductItem">
          <label>Year</label>
          <input type="text" placeholder="year" name="year" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="genre" name="genre" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" placeholder="duration" name="duration" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" placeholder="limit" name="limit" onChange={handleChange}/>
        </div> */}
        <div className="addProductItem" >
          <label>For A Challenge?</label>
          <select name="isChallenge" id="isChallenge" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        {/* <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" placeholder="limit" name="trailer" onChange={(e) => setTrailer(e.target.files[0])}/>
        </div> */}
        {/* {video?.size > 9366938 ? "" :
        <div className="shareImgContainer">
        <video style={{height: "300px", width: "350px"}} className="shareImg" src={URL.createObjectURL(video)} alt="" />
        <Cancel className="shareCancelImg" onClick={() => setVideo(null)} />
      </div>
        } */}
        <div className="addProductItem">
          <label>Video</label>
          {video?.size > 9366938 ? <div>file too large</div> : 
         <input type="file" placeholder="limit" name="video" onChange={(e) => setVideo(e.target.files[0])}/> 
          }
        
          
        </div>
        {uploaded === 1 ? (
          <button className="addProductButton" onClick={handleSubmit}>Create</button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>Upload</button>
        ) 
        }
      </form>
    </div>
    </div>
    </>
  );
}