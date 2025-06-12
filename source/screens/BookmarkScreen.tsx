import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getBookmarks, removeBookmark } from '../Common/BookmarkStorage';
import FastImage from 'react-native-fast-image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function BookmarksScreen({ navigation }:any) {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadBookmarkedArticles);
    return unsubscribe;
  }, [navigation]);

  const loadBookmarkedArticles = async () => {
    const bookmarks = await getBookmarks();
    setBookmarkedArticles(bookmarks);
  };

  const handleRemove = async (article:any) => {
    await removeBookmark(article);
    loadBookmarkedArticles();
  };

  const renderItem = ({ item }:any) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('Details', { article: item })}>
      {
          item?.image ? (
            <FastImage
              source={{ uri: item?.image }}
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
        <Text style={styles.title}>{item?.title}</Text>
        <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRemove(item)} style={styles.removeButton}>
        <Image  style={styles.icon} source={require('../Assets/Images/heart_fill.png')}/>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={bookmarkedArticles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: hp(2) }}>No bookmarks added.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: wp(2),
    position: 'relative'
  },
  image: {
    height: hp(30),
    borderRadius: 8
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5
  },
  description: {
    color: '#555'
  },
  icon: {
    height: wp(6),
    width: wp(6),
    position: 'absolute',
    right: wp(2),
    top: hp(1)
   },
   removeButton:{
    position:'absolute',
    right:wp(2),
    top:hp(1)
   },
   noImage: {
    height: hp(30),
    width: "100%",
    borderRadius: 8
  },
});
