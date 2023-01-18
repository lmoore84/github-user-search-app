import './App.css';
import moon from './assets/icon-moon.svg';
import sun from './assets/icon-sun.svg';
import location from './assets/icon-location.svg';
import website from './assets/icon-website.svg';
import twitter from './assets/icon-twitter.svg';
import company from './assets/icon-company.svg';
import React, {useState, useEffect} from 'react';

// import './src/css/style.css';
  const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [avatarURL, setAvatarURL] = useState();
    const [githubUsername, setGithubUsername] = useState();
    const [joinDate, setJoinDate] = useState();
    const [publicRepos, setPublicRepos] = useState();
    const [numFollowers, setNumFollowers] = useState();
    const [numFollowing, setNumFollowing] = useState();
    const [companyWorking, setCompanyWorking] = useState("Not Available");
    const [userBio, setuserBio] = useState();
    const [userLocation, setUserLocation] = useState();
    const [userTwitter, setUserTwitter] = useState();
    const [userBlog, setUserBlog] = useState();

    const [searchInput, setSearchInput] = useState("");
    const url = `https://api.github.com/users/`;
    
    const [users, setUsers] = useState([]);


    const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
    };

  useEffect(() =>{
    console.log("Search input inside useEffect", searchInput);
    // fetch(url+searchInput)
    fetch(`https://api.github.com/users/${searchInput}`)
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(result);
        setAvatarURL(result.avatar_url);
        setGithubUsername(result.login);
        setJoinDate(result.created_at);
        setPublicRepos(result.public_repos);
        setNumFollowers(result.followers);
        setNumFollowing(result.following);
        setCompanyWorking(result.company);

        if (result.bio == null || result.bio == ""){
          setuserBio("This profile has no bio")
        } else{
          setuserBio(result.bio);
        }

        if (result.location == null || result.location == ""){
          setUserLocation("Not avaiable")
        } else{
          setUserLocation(result.location);
        }

        if (result.location == null || result.location == ""){
          setUserBlog("Not avaiable")
        } else{
          setUserBlog(result.blog);
        }
        

        if (result.location == null || result.location == ""){
          setUserTwitter("Not avaiable")
        } else{
          setUserTwitter(result.twitter_username);
        }
        
        // update date to correct format
        const date = new Date(Date.parse(result.created_at));
        console.log("DATE IS NOW --" , date);
      },
      (error) => {
        console.log(error)
      }
    )
  },[searchInput]);

    const switchTheme = () => {
       if (darkMode == false) {
        darkModeProperties();
      } else {
        lightModeProperties();
      }
    }


    const darkModeProperties = () => {
      document.documentElement.style.setProperty("--lm-primary", "#141D2F");
      document.documentElement.style.setProperty("--lm-secondary", "#1E2A47");
      document.documentElement.style.setProperty("--lm-text", "#FFFFFF");
      document.getElementById("mode-icon").src=(sun);
      document.getElementById("mode-text").innerText="Light";
      
      setDarkMode(true);
    }
    const lightModeProperties = () => {
      document.documentElement.style.setProperty("--lm-primary", "#F2F2F2");
      document.documentElement.style.setProperty("--lm-secondary", "#FEFEFE");
      document.documentElement.style.setProperty("--lm-text", "#000000");
      document.getElementById("mode-icon").src=(moon);
      document.getElementById("mode-text").innerText="Dark";

      setDarkMode(false);
    }

    const Search = () => {
      console.log("Searching...");
      console.log("Search input--", searchInput);
      
    }

  return (
    <div className="container">
      {/* <link rel="stylesheet" href="/styles/style.css"></link> */}
      <header className="header">
        <h1 className="title">devfinder</h1>
        <div id="btn-mode">
          <p id="mode-text">DARK</p>
          <button className="header-theme-switch-btn" onClick={switchTheme}>
            <div className="icon-container"><img id="mode-icon" src={moon} alt=""></img></div>
          </button>
        </div>
      </header>
    <div className="searchbar-container">
       <input type="search" name="user-input" id="input" value={searchInput} onChange={handleChange} autoComplete="off" placeholder="Search Github username..."></input>
      <button className="btn-search" id="submit" onClick={Search}>Search</button>
    </div>
    
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <img id="avatar" src={avatarURL}></img>
          <div className="profile-info-wrapper">
            <div className="profile-name">
              <h2 id="name">{githubUsername}</h2>
                <p id="user"></p>
            </div>
                <p id="date">{joinDate}</p>
          </div>
      </div>
      <p id="bio">{userBio}</p>
      <div className='profile-stats-container'>
      <div className="profile-stats-wrapper">
        <div className="profile-stat">
            <p className="stat-title">Repos</p>
            <p id="repos"className="stat-value">{publicRepos}</p>
        </div>
        <div className="profile-stat">
          <p className="stat-title">Followers</p>
          <p id="followers" className="stat-value">{numFollowers}</p>
        </div>
        <div className="profile-stat">
          <p className="stat-title">Following</p>
          <p id="following" className="stat-value">{numFollowing}</p>
        </div>
        </div>
        
          <div className="profile-bottom-wrapper">
            <div className="profile-info">
              <div className="bottom-icons"><img src={location} alt=""></img></div>
              <p id="location">{userLocation}</p>
            </div>
            <div className="profile-info">
              <div className="bottom-icons"><img src={website} alt=""></img></div>
              <p id="blog">{userBlog}</p>
            </div>
            <div className="profile-info">
              <div className="bottom-icons"><img src={twitter} alt=""></img></div>
              <p id="twitter">{userTwitter}</p>
            </div>
            <div className="profile-info">
              <div className="bottom-icons"><img src={company} alt=""></img></div>
              <p id="company">{companyWorking}</p>
            </div>
            </div>
            </div>
          </div>
      </div>
    </div>
    
  );
}

export default App;
