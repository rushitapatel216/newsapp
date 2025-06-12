// utils/BookmarkStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARK_KEY = 'BOOKMARKED_ARTICLES';

export const getBookmarks = async () => {
  const json = await AsyncStorage.getItem(BOOKMARK_KEY);
  return json ? JSON.parse(json) : [];
};

export const addBookmark = async (article) => {
  const bookmarks = await getBookmarks();
  const updated = [article, ...bookmarks];
  await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated));
};

export const removeBookmark = async (article) => {
  const bookmarks = await getBookmarks();
  const filtered = bookmarks.filter((a) => a.url !== article.url);
  await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(filtered));
};

export const isBookmarked = async (article) => {
  const bookmarks = await getBookmarks();
  return bookmarks.some((a) => a.url === article.url);
};
