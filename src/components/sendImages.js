import { refreshAccess } from "../utils/refreshAccess";

export function SendImages({ quality, selectedImages, setView, setLogout, setSelectedImaages, setPreviewImages }) {
  async function sendToServer(e) {
    e.preventDefault();
    setView("loading");

    const result = await fetch("https://shrinkifybackend.vercel.app/shrink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ data: selectedImages, quality, length: [...selectedImages].length }),
    });

    const data = JSON.parse(await result.text());
    

    if (data.message === "not valid access") {
      alert("try again!!!");
      const result = await refreshAccess();

      if (result.message === "not valid refreshtoken") {
        setView("auth");
        setSelectedImaages([]);
        return;
      }
      setLogout(false);
      setView("home");
      setSelectedImaages([]);

      return;
    }
    setSelectedImaages([]);
    setPreviewImages(() => data);
    setTimeout(() => setView("preview"), 3000);
  }
  return (
    <button className="upload-btn" style={{ marginLeft: "50%", transform: "translate(-50%, 0)", marginTop: "10px" }} onClick={sendToServer}>
      Send To Server
    </button>
  );
}
