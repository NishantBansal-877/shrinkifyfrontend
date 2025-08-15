import { refreshAccess } from "../utils/refreshAccess";

export function SendImages({ quality, selectedImages, setView, setLogout, setSelectedImaages, setPreviewImages, setShowNotif, setNotifyMsg }) {
  async function sendToServer(e) {
  e.preventDefault();
  
  try {
    setView("loading");

    const result = await fetch("https://shrinkifybackend.vercel.app/shrink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        data: selectedImages,
        quality,
        length: selectedImages.length
      }),
    });

    const data = JSON.parse(await result.text());
    console.log(data.message);

    if (data.message === "not valid access") {
      setShowNotif(true);
      setNotifyMsg("Log in first!!!");
      setLogout(false);
      setView("login");
      setSelectedImaages([]); // typo: should be setSelectedImages
      return;
    } 
    
    if (data.message === "send compressed images") {
      setSelectedImaages([]); // typo: should be setSelectedImages
      setPreviewImages(() => data);
      setView("loading");
      setTimeout(() => setView("preview"), 3000);
      return;
    } 
    
    // Default case
    setShowNotif(true);
    setNotifyMsg(data.message);
    setView("home");

  } catch (error) {
    console.error("Error sending data to server:", error);
    setShowNotif(true);
    setNotifyMsg("Something went wrong. Please try again.");
    setView("home");
  }
}

  return (
    <button className="upload-btn" style={{ marginLeft: "50%", transform: "translate(-50%, 0)", marginTop: "10px" }} onClick={sendToServer}>
      Send To Server
    </button>
  );
}

