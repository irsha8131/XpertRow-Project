// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import axios from 'axios';

// const Home = () => {

//   const [fetching,setFetching] = useState([])
//   const [rendering,setRendering] = useState()

//   useEffect(() => {
//     axios.get('https://xpertrow.com/api/explore/getAllExperts?language=en&page=1&storyType=stafs')
//       .then(response => {
//         setFetching(response);
//         setRendering(false);
//       })
//       .catch(error => {
//         console.error(error);
//         setRendering(false);
//       });
//   }, []);

//   return (
    
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.iconButton}>
//           <MaterialIcon name="lightbulb" size={30} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconButton}>
//           <FontAwesomeIcon name="paper-plane" size={30} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconButton}>
//           <FontAwesomeIcon name="comment-o" size={30} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconButton}>
//           <MaterialIcon name="chat" size={30} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconButton}>
//           <MaterialIcon name="more-vert" size={30} color="white" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.shortscontainer}>
        
//       <Text style={styles.shorts}>{JSON.stringify(fetching)}</Text>
//         <Text style={styles.shorts}>.....#Shorts</Text>
//       </View>
//       <Text style={styles.text}></Text>
//       <View style={styles.itegritycontainer}>
//         <Text style={styles.itegrity}>@ItegrityPro...</Text>
//       </View>
//       <View style={styles.createstyle}>
//         <TouchableOpacity>
//           <Text style={styles.createtext}>Subscribe</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.iconsettings}>
//         <TouchableOpacity>
//           <FontAwesomeIcon name="user" size={30} color="white" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     flexDirection: 'column',
//     alignItems: 'flex-end',
//     position: 'absolute',
//     bottom: '5%',
//     right: '5%',
//   },
//   iconButton: {
//     marginBottom: 20,
//   },
//   text: {
//     color: 'white',
//     fontSize: 20,
//   },
//   createtext: {
//     borderWidth: 1,
//     borderRadius: 25,
//     borderColor: 'white',
//     width: '100%',
//     height: '100%',
//     textAlign: 'center',
//     backgroundColor: 'transparent',
//     color: 'white',
//     padding: 5,
//   },
//   createstyle: {
//     backgroundColor: 'transparent',
//     position: 'absolute',
//     bottom: '1%',
//     right: '2%',
//   },
//   iconsettings: {
//     position: 'absolute',
//     bottom: '1%',
//     left: '7%',
//   },
//   itegritycontainer: {
//     position: 'absolute',
//     bottom: '2%',
//     left: '15%',
//   },
//   itegrity: {
//     fontSize: 15,
//     color: 'white'
//   },
//   shortscontainer: {
//     position: 'absolute',
//     bottom: '6%',
//     left: '15%',
//   },
//   shorts: {
//     color: 'white',
//     fontSize: 20
//   }
// });

// export default Home;







//// this is correct code version

// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import Video from 'react-native-video'; 
// import axios from 'axios';

// const { width, height } = Dimensions.get('window');

// const Home = () => {
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(null);
//   const [videoDimensions, setVideoDimensions] = useState({});
//   const videoRefs = useRef(new Map());

//   useEffect(() => {
//     axios.get('https://xpertrow.com/api/explore/getAllFreeStories?language=en&page=1')
//       .then(response => {
//         setStories(response.data.body.getStoryModel);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('API Error:', error);
//         setLoading(false);
//       });
//   }, []);

//   const viewabilityConfig = {
//     itemVisiblePercentThreshold: 50,
//   };

//   const onViewableItemsChanged = useCallback(({ viewableItems }) => {
//     const visibleItem = viewableItems[0]?.item;
//     if (visibleItem) {
//       setCurrentIndex(visibleItem._id);
//       videoRefs.current.forEach((ref, key) => {
//         if (key !== visibleItem._id && ref) {
//           ref.seek(0);
//           ref.pause();
//         }
//       });
//     }
//   }, []);

//   const onVideoLoad = (data, itemId) => {
//     const { width: videoWidth, height: videoHeight } = data.naturalSize;
//     const aspectRatio = videoWidth / videoHeight;

//     let newWidth = width;
//     let newHeight = width / aspectRatio;

//     if (newHeight > height) {
//       newHeight = height;
//       newWidth = height * aspectRatio;
//     }

//     setVideoDimensions(prevState => ({
//       ...prevState,
//       [itemId]: { width: newWidth, height: newHeight }
//     }));
//   };

//   const renderItem = ({ item }) => {
//     const { story_type, story_url_quality_versions, thumbnail_url, story_title, category_name, story_text } = item;
//     const videoUrl = story_url_quality_versions?.url_720;
//     const isPlaying = item._id === currentIndex;

//     const dimensions = videoDimensions[item._id] || { width, height };

//     return (
//       <View style={styles.storyContainer}>
//         <TouchableOpacity activeOpacity={1}>
//           {story_type === 'video' && videoUrl ? (
//             <Video 
//               ref={ref => videoRefs.current.set(item._id, ref)}
//               source={{ uri: videoUrl }} 
//               style={[styles.storyMedia, { width: dimensions.width, height: dimensions.height }]}
//               resizeMode="cover"
//               paused={!isPlaying}
//               controls={false}
//               repeat
//               onError={error => console.error('Video Error:', error)}
//               onLoad={(data) => onVideoLoad(data, item._id)}
//             />
//           ) : story_type === 'image' ? (
//             <Image 
//               source={{ uri: thumbnail_url }} 
//               style={styles.storyMedia}
//             />
//           ) : story_type === 'text' ? (
//             <Text style={styles.textContent}>{story_text}</Text>
//           ) : null}
//         </TouchableOpacity>
//         <Text style={styles.storyTitle}>{story_title}</Text>
//         <Text style={styles.categoryName}>{category_name || ""}</Text>
//         <View style={styles.header}>
//           <TouchableOpacity style={styles.iconButton}>
//             <FontAwesomeIcon name="paper-plane" size={30} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.iconButton}>
//             <FontAwesomeIcon name="comment-o" size={30} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.iconButton}>
//             <MaterialIcon name="chat" size={30} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.iconButton}>
//             <MaterialIcon name="more-vert" size={30} color="white" />
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={styles.subscribeButton}>
//           <Text style={styles.subscribeText}>Subscribe</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <Text style={styles.text}>Loading...</Text>
//       ) : (
//         <FlatList
//           data={stories}
//           renderItem={renderItem}
//           keyExtractor={item => item._id}
//           pagingEnabled
//           showsVerticalScrollIndicator={false}
//           decelerationRate="fast"
//           snapToAlignment="start"
//           onViewableItemsChanged={onViewableItemsChanged}
//           viewabilityConfig={viewabilityConfig}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   storyContainer: {
//     width: width,
//     height: height,
//     position: 'relative',
//     justifyContent: 'center',
//   },
//   storyMedia: {
//     justifyContent: 'center',
//     alignContent: 'center',
//     marginBottom:'30%'
//   },
//   storyTitle: {
//     fontSize: 18,
//     color: 'white',
//     fontWeight: 'bold',
//     position: 'absolute',
//     paddingRight: "40%",
//     paddingLeft: '7%',
//     paddingBottom: '1%',
//     bottom: "18%",
//   },
//   categoryName: {
//     fontSize: 13,
//     color: 'white',
//     position: 'absolute',
//     bottom: '18%',
//   },
//   textContent: {
//     fontSize: 16,
//     color: 'white',
//     padding: 20,
//     textAlign: 'center',
//   },
//   header: {
//     flexDirection: 'column',
//     alignItems: 'flex-end',
//     position: 'absolute',
//     bottom: '23%',
//     right: '4%',
//   },
//   iconButton: {
//     marginBottom: 20,
//   },
//   text: {
//     color: 'white',
//     fontSize: 20,
//     textAlign: 'center',
//   },
//   subscribeButton: {
//     position: 'absolute',
//     bottom: '18%',
//     right: '3%',
//     borderColor: 'white',
//     borderWidth: 1,
//     borderRadius: 20,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   subscribeText: {
//     color: 'white',
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });

// export default Home;





import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList, SafeAreaView } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video'; 
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [videoDimensions, setVideoDimensions] = useState({});
  const videoRefs = useRef(new Map());

  useEffect(() => {
    axios.get('https://xpertrow.com/api/explore/getAllFreeStories?language=en&page=1')
      .then(response => {
        setStories(response.data.body.getStoryModel);
        setLoading(false);
      })
      .catch(error => {
        console.error('API Error:', error);
        setLoading(false);
      });
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    const visibleItem = viewableItems[0]?.item;
    if (visibleItem) {
      setCurrentIndex(visibleItem._id);
      videoRefs.current.forEach((ref, key) => {
        if (key !== visibleItem._id && ref) {
          ref.seek(0);
          ref.pause();
        }
      });
    }
  }, []);

  const onVideoLoad = (data, itemId) => {
    const { width: videoWidth, height: videoHeight } = data.naturalSize;
    const aspectRatio = videoWidth / videoHeight;

    let newWidth = width;
    let newHeight = width / aspectRatio;

    if (newHeight > height) {
      newHeight = height;
      newWidth = height * aspectRatio;
    }

    
    if (height > width) { 
      newHeight = height;
      newWidth = height * aspectRatio;
      if (newWidth > width) {
        newWidth = width;
        newHeight = width / aspectRatio;
      }
    }

    setVideoDimensions(prevState => ({
      ...prevState,
      [itemId]: { width: newWidth, height: newHeight }
    }));
  };

  const renderItem = ({ item }) => {
    const { story_type, story_url_quality_versions, thumbnail_url, story_title, category_name, story_text } = item;
    const videoUrl = story_url_quality_versions?.url_720;
    const isPlaying = item._id === currentIndex;

    const dimensions = videoDimensions[item._id] || { width, height };

    return (
      <View style={styles.storyContainer}>
        <TouchableOpacity activeOpacity={1}>
          {story_type === 'video' && videoUrl ? (
            <Video 
              ref={ref => videoRefs.current.set(item._id, ref)}
              source={{ uri: videoUrl }} 
              style={[styles.storyMedia, { width: dimensions.width, height: dimensions.height}]}
              resizeMode="cover"
              paused={!isPlaying}
              controls={false}
              repeat
              onError={error => console.error('Video Error:', error)}
               onLoad={(data) => onVideoLoad(data, item._id)}
            />
          ) : story_type === 'image' ? (
            <Image 
              source={{ uri: thumbnail_url }} 
              style={styles.storyMedia}
            />
          ) : story_type === 'text' ? (
            <Text style={styles.textContent}>{story_text}</Text>
          ) : null}
        </TouchableOpacity>
        <Text style={styles.storyTitle}>{story_title}</Text>
        <Text style={styles.categoryName}>{category_name || ""}</Text>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesomeIcon name="paper-plane" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesomeIcon name="comment-o" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcon name="chat" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcon name="more-vert" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeText}>Subscribe</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        <FlatList
          data={stories}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
          snapToAlignment="start"
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  storyContainer: {
    width: width,
    height: height,
    position: 'relative',
    justifyContent: 'center',
    alignItems:'center'
  },
  storyMedia: {
    width:width,
    height:'auto',
    justifyContent: 'center',
    alignContent: 'center',
  },
  storyTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    paddingRight: width * 0.4,
    paddingLeft: width * 0.07,
    paddingBottom: height * 0.01,
    bottom: height * 0.18,
  },
  categoryName: {
    fontSize: 13,
    color: 'white',
    position: 'absolute',
    bottom: height * 0.18,
  },
  textContent: {
    fontSize: 16,
    color: 'white',
    padding: 20,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: height * 0.23,
    right: width * 0.04,
  },
  iconButton: {
    marginBottom: height * 0.02,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  subscribeButton: {
    position: 'absolute',
    bottom: height * 0.18,
    right: width * 0.03,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  subscribeText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Home;
