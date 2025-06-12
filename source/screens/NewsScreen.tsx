import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { addBookmark, isBookmarked, removeBookmark } from '../Common/BookmarkStorage';
import FastImage from 'react-native-fast-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';

export default function NewsScreen({ navigation }: any) {
  const [articles, setArticles] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (articles.length > 0) {
        loadBookmarks();
      }
    }, [articles])
  );

  const fetchNews = async () => {
    try {
      const res = await axios.get(
        'https://api.mediastack.com/v1/news?access_key=de1cc91d435ed234e4c30753d6d43dbd&countries=us,in'
      );
      console.log("res.data.articles", res?.data?.data)
      setArticles(res?.data?.data);
    } catch (err: any) {
      console.error("err", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadBookmarks = async () => {
    const stored: any = await Promise.all(
      articles.map((article) => isBookmarked(article))
    );
    setBookmarks(stored);
  };

  const toggleBookmark = async (article: any, index: number) => {
    const bookmarked = bookmarks[index];
    if (bookmarked) {
      await removeBookmark(article);
    } else {
      await addBookmark(article);
    }
    loadBookmarks();
  };

  const renderItem = ({ item, index }: any) => (
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
      <TouchableOpacity onPress={() => toggleBookmark(item, index)} style={styles.icon}>
        <Image style={styles.icon} source={bookmarks[index] ? require('../Assets/Images/heart_fill.png') : require('../Assets/Images/heart.png')} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator style={{ flex: 1 }} size="large" /> :
        <FlatList
          data={articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(1)
  },
  card: {
    padding: 10,
    position: 'relative'
  },
  image: {
    height: hp(30),
    borderRadius: 8
  },
  noImage: {
    height: hp(30),
    width: "100%",
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
  }
});