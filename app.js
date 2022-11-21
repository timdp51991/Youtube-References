
const videosContainer = document.getElementById("videosContainer");
const popUp = document.getElementById("popup");
const videoIframe = document.querySelector("#popup > iframe");
const videoIdInput = document.getElementById("videoId");
//make variable for reusable 'key'; helps w/ typos lol
const IDS_KEY = "youTubeVideoIds";
let youTubeVideoIds = [];

const loadVideos = () => {
  youTubeVideoIds =  JSON.parse(localStorage.getItem(IDS_KEY)) || [];
  console.log(youTubeVideoIds);
};
//['lI1ae4REbFM','rEa99-NQ9Bk']

const displayVideos = () => {
  const videoHTMLStr = youTubeVideoIds.map((id) => `
      <li onclick="clickVideo(event, '${id}')">
        <img class="thumbnail" src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" 
        alt="Cover image for YouTube video with id ${id}">
        <button class="delete-btn" > &times;</button>
      </li>
    `
    )
    .join("");
  videosContainer.innerHTML = videoHTMLStr;
  console.log(videoHTMLStr);
};

const clickVideo = (event, id) => {
    console.log(event,id);
  if (event?.target?.classList?.contains("delete-btn")) {
    youTubeVideoIds = youTubeVideoIds.filter((i) => i !== id);
    localStorage.setItem(IDS_KEY, JSON.stringify(youTubeVideoIds));
    displayVideos();
  } else {
    //TODO:show the popUp
    videoIframe.src = `https://www.youtube.com/embed/${id}`;
    popUp.classList.add("open");
    popUp.classList.remove("closed");
  }
};

const handlePopupClick = () => {
  popUp.classList.add("closed");
  popUp.classList.remove("open");
};

const saveVideo = (e) => {
  e.preventDefault();
  const videoId = videoIdInput.value;
  videoIdInput.value = "";
  youTubeVideoIds.unshift(videoId);
  localStorage.setItem(IDS_KEY, JSON.stringify(youTubeVideoIds));
  displayVideos();
};

loadVideos();
displayVideos();