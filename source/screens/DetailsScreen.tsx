import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function DetailScreen({ route }: any) {
  const { article } = route.params;

  return (
    <View style={styles.container}>
      {
        article?.image ? (
          <FastImage
            source={{ uri: article?.image }}
            style={styles.image}
            resizeMode='cover'
          />
        ) : (
          <Image
            source={require('../Assets/Images/no-image.png')}
            style={styles.noImage}
            resizeMode='cover'
          />
        )
      }
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.content}>{article.content || article.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4)
  },
  image: {
    height: hp(30),
    borderRadius: 8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5
  },
  content: {
    fontSize: 16
  },
  noImage: {
    height: hp(30),
    width: "100%",
    borderRadius: 8
  },
});