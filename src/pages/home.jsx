import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gallerySlice, getPhotos } from "../redux/reducers/gallery";

export default function Home() {
  const dispatch = useDispatch();
  const loadingState = useSelector((state) => state.gallery.isLoading);
  const photosArray = useSelector((state) => state.gallery.photos);
  const currentPage = useSelector((state) => state.gallery.page);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const loadMore = () => {
    dispatch(gallerySlice.actions.increment());
    dispatch(getPhotos());
  };

  console.log({
    currentPage: currentPage,
    photosArray: photosArray,
    loadingState: loadingState,
  });

  return (
    <div className="main-content">
      <div
        className="headerWrapper"
        style={{
          margin: "50px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h3> AWESOME REDUX PHOTO GALLERY </h3>
        <h3>************</h3>
      </div>
      <div
        className="galleryWrapper"
        style={{
          margin: "10px 70px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <div>
          {(() => {
            if (loadingState == true) {
              return (
                <div
                  className="headerWrapper"
                  style={{
                    margin: "50px 20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <h3>.....Loading</h3>
                </div>
              );
            } else {
              return photosArray.map((photo, index) => {
                return (
                  <img
                    key={index}
                    src={photo.download_url}
                    width="400"
                    height="400"
                    style={{ margin: "10px", objectFit: "cover" }}
                  />
                );
              });
            }
          })()}
        </div>
      </div>
      <div
        className="viewmoreWrapper"
        style={{
          margin: "20px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <button
          style={{
            border: "5px solid blue",
            borderRadius: "50px",
            background: "blue",
            color: "white",
            padding: "10px 40px",
            cursor: "pointer",
          }}
          onClick={loadMore}
        >
          View More
        </button>
      </div>
    </div>
  );
}
