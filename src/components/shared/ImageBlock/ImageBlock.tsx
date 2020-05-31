import React from "react";
import {ImageBlockImage} from "./ImageBlockList";

interface ImageBlockProps {
  image: ImageBlockImage;
}

const ImageBlock = ({ image }: ImageBlockProps) => {
  return (
    <>
      <img src={image.url} alt=""/>
      <div className="image-block-item-overlay">
        <h4 className="image-block-item-title">{image.title}</h4>
        {image.subtitle && <h5 className="image-block-item-subtitle">{image.subtitle}</h5>}
      </div>
    </>
  );
};

export default ImageBlock;
