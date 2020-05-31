import React from 'react';
import {Col, Row} from "rsuite";
import ImageBlock from "./ImageBlock";
import './ImageBlock.scss';

export interface ImageBlockImage {
  url: string;
  title: JSX.Element|string;
  subtitle?: JSX.Element|string;
}

interface ImageBlockProps {
  images: ImageBlockImage[];
}

const ImageBlockList = ({images}: ImageBlockProps) => {
  return (
    <Row>
      {images.map((image, index) => {
        if (index === 0) {
          return (
            <Col md={12} className="image-block-item" key={index}>
              <ImageBlock image={image} />
            </Col>
          );
        } else {
          return (
            <Col xs={12} md={6} className="image-block-item" key={index}>
              <ImageBlock image={image} />
            </Col>
          );
        }
      })}
    </Row>
  );
};

export default ImageBlockList;
