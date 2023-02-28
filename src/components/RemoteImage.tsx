import React from "react";
import { 
  Image,
  useWindowDimensions
} from 'react-native';
import FastImage from "react-native-fast-image";

interface RemoteImageProps {
  readonly uri: string;
}

const RemoteImage = (props: RemoteImageProps) => {
  const { width } = useWindowDimensions();
  const [desiredWidth, setDesiredWidth] = React.useState(0)
  const [desiredHeight, setDesiredHeight] = React.useState(0)

  Image.getSize(props.uri, (imgWidth, imgHeight) => {
    let ratio = imgWidth/imgHeight;
    let realWidth = width - 40;//remove padding size
    let newWidth = 0;
    if (ratio > 1.4) {
      newWidth = realWidth;
    } else if (ratio > 0.7) {
      newWidth = realWidth/2;
    } else {
      newWidth = realWidth/3;
    }
    setDesiredWidth(newWidth);
    setDesiredHeight(newWidth / imgWidth * imgHeight);
  })

  return (
    <FastImage
      source={{uri: props.uri}}
      style={{
        borderWidth: 2,
        borderColor: 'white',
        width: desiredWidth,
        height: desiredHeight
      }}
    />
  )
}

export default RemoteImage;