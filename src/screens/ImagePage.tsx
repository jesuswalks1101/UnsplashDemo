import React, { useState, useEffect } from "react";
import { 
  SafeAreaView, 
  StyleSheet,
  View,
  FlatList,
  Alert
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import config from '../config';
import RemoteImage from '../components/RemoteImage';

const SEARCH_KEY = "actor";

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

interface ImageMetadata {
  readonly thumbUrl: string;
}

const ImagePage: React.FC<Props> = props => {
  const { navigation } = props;
  const [imageData, setImageData] = useState<ImageMetadata[] | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get the data from the unsplash api
        const data = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${SEARCH_KEY}&client_id=${config.UNSPLASH_API_KEY}`)
        // convert the data to json
        const json = await data.json();
        let results:ImageMetadata[] = [];
        if (json.results) {
          json.results.map((item: any, index: number) => {
            results.push({
              thumbUrl: item.urls.thumb
            })
          });
        } else {
          Alert.alert('No found image');
        }
        setImageData(results);
      } catch (error) {
        console.log(error);
      }
    }
  
    // call the fetch function
    fetchData();
  }, []);


  return (
    <SafeAreaView style={styles.mainContainer}>
      {imageData ?
        <FlatList
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{
            alignSelf: 'center',
            alignItems: 'center',
          }}
          columnWrapperStyle={styles.tableContainer}
          data={imageData}
          renderItem={({item, index}) =>
            <RemoteImage
              uri={item.thumbUrl}
            />
          }
          numColumns={imageData.length}
        /> :
        <View style={styles.indicatorContainer}>
          <ActivityIndicator animating={true} size={'large'}/>
        </View>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
  },
  tableContainer: {
    flexWrap: 'wrap',
    padding: 20,
  },
  indicatorContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default ImagePage;