import React, {ReactNode} from 'react';
import {Col, Row} from "rsuite";
import './ImageBlock.scss';

export interface ImageBlockImage {
  url: string;
  title: string;
  subtitle?: ReactNode;
}

interface ImageBlockProps {
  images: ImageBlockImage[];
}

const ImageBlock = ({images}: ImageBlockProps) => {
  const imageBlockItemInner = (image: ImageBlockImage) => (
    <>
      <img src={image.url} alt={image.title}/>
      <div className="image-block-item-overlay">
        <h4 className="image-block-item-title">{ image.title }</h4>
        { image.subtitle && <h5 className="image-block-item-subtitle">{ image.subtitle }</h5> }
      </div>
    </>
  );

  return (
    <Row>
      {images.map((image, index) => {
        if (index === 0) {
          return (
            <Col md={12} className="image-block-item" key={index}>
              { imageBlockItemInner(image) }
            </Col>
          );
        } else {
          return (
            <Col xs={12} md={6} className="image-block-item" key={index}>
              { imageBlockItemInner(image) }
            </Col>
          );
        }
      })}
    </Row>
  );
};

export default ImageBlock;
